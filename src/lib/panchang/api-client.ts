/**
 * Panchang API Client
 * This module handles fetching data from the Panchang API and normalizing it
 *
 * Supported APIs:
 * - Prokerala Panchang API (recommended)
 * - Or adapt this to other Panchang APIs
 *
 * To use Prokerala API:
 * 1. Sign up at https://www.prokerala.com/api/
 * 2. Get your API key
 * 3. Add PANCHANG_API_KEY to .env.local
 */

import {
  DayPanchang,
  DayPanchangResponse,
  Festival,
  Tithi,
  TEMPLE_CONFIG,
} from "./types";

// Token cache to avoid requesting new tokens for every API call
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get OAuth2 access token using client credentials flow
 * Token URL: https://api.prokerala.com/token
 */
async function getAccessToken(): Promise<string> {
  const clientId = process.env.PANCHANG_CLIENT_ID;
  const clientSecret = process.env.PANCHANG_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PANCHANG_CLIENT_ID and PANCHANG_CLIENT_SECRET are required for OAuth2");
  }

  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 300000) {
    return cachedToken.token;
  }

  console.log("Fetching new OAuth2 access token from Prokerala...");

  try {
    const tokenUrl = "https://api.prokerala.com/token";
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Token request failed:", response.status, errorText);
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as { access_token: string; expires_in: number };

    if (!data.access_token) {
      throw new Error("No access token in response");
    }

    // Cache the token (expires_in is in seconds)
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000),
    };

    console.log("Successfully obtained OAuth2 access token");
    return data.access_token;
  } catch (error) {
    console.error("Error getting OAuth2 token:", error);
    throw error;
  }
}

/**
 * Fetch Panchang data for a single day
 */
export async function fetchDayPanchang(
  date: string // YYYY-MM-DD
): Promise<DayPanchangResponse> {
  const clientId = process.env.PANCHANG_CLIENT_ID;
  const clientSecret = process.env.PANCHANG_CLIENT_SECRET;
  const [year, month, day] = date.split("-").map(Number);

  // Check if we have OAuth credentials
  if (!clientId || !clientSecret) {
    console.warn(
      "PANCHANG_CLIENT_ID or PANCHANG_CLIENT_SECRET not set. Using fallback data. Please add to .env.local"
    );
    return getFallbackDayData(date, year, month, day);
  }

  // Prokerala API endpoint
  const baseUrl = "https://api.prokerala.com/v2/astrology/panchang";
  const url = new URL(baseUrl);

  url.searchParams.append("ayanamsa", "1"); // Lahiri ayanamsa
  url.searchParams.append("datetime", `${date}T06:00:00`);
  url.searchParams.append("coordinates", `${TEMPLE_CONFIG.LAT},${TEMPLE_CONFIG.LNG}`);
  url.searchParams.append("la", "en"); // Language

  try {
    // Get OAuth2 access token
    const accessToken = await getAccessToken();

    const response = await fetch(url.toString(), {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 21600, // Cache for 6 hours
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API request failed: ${response.status} ${response.statusText}`, errorData);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Check for API error response
    if (data.status === 'error') {
      console.error('API returned error:', data.errors);
      throw new Error(`API error: ${data.errors?.[0]?.detail || 'Unknown error'}`);
    }

    // Normalize the API response to our DayPanchangResponse format
    return normalizeDayResponse(data, date, year, month, day);
  } catch (error) {
    console.error("Error fetching day panchang:", error);

    // Fallback to basic data if API fails
    return getFallbackDayData(date, year, month, day);
  }
}

/**
 * Fetch Panchang data for an entire month
 * 
 * Rate limit handling:
 * - Batch size of 5 concurrent requests to avoid overwhelming the Prokerala API
 * - 200ms delay between batches to stay within rate limits
 * - Uses Promise.allSettled to handle transient failures gracefully
 */
export async function fetchMonthPanchang(
  year: number,
  month: number // 1-12
): Promise<DayPanchang[]> {
  const daysInMonth = new Date(year, month, 0).getDate();
  const BATCH_SIZE = 5; // Limit concurrent requests to avoid rate limits
  const BATCH_DELAY = 200; // 200ms delay between batches
  const allResults: DayPanchang[] = [];

  // Build all date strings
  const dates: string[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
  }

  // Process in batches
  for (let i = 0; i < dates.length; i += BATCH_SIZE) {
    const batch = dates.slice(i, i + BATCH_SIZE);
    const batchPromises = batch.map(dateStr => fetchDayPanchang(dateStr));

    const results = await Promise.allSettled(batchPromises);

    // Extract successful results and log failures
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        allResults.push(result.value);
      } else {
        console.error(`Failed to fetch panchang for ${batch[index]}:`, result.reason);
      }
    });

    // Add delay between batches (except for the last batch)
    if (i + BATCH_SIZE < dates.length) {
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
    }
  }

  return allResults;
}

/**
 * Normalize API response to our DayPanchangResponse format
 * Handles Prokerala API v2 response structure
 */
function normalizeDayResponse(
  apiData: unknown,
  dateISO: string,
  year: number,
  month: number,
  day: number
): DayPanchangResponse {
  // Type guard to ensure we have an object
  if (!apiData || typeof apiData !== 'object') {
    throw new Error('Invalid API response format');
  }

  const response = apiData as Record<string, unknown>;

  // Prokerala API wraps data in a 'data' property
  const data = response.data as Record<string, unknown>;
  if (!data) {
    throw new Error('No data property in API response');
  }

  // Extract weekday
  const date = new Date(dateISO);
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekday = weekdays[date.getDay()];

  // Normalize sunrise/sunset - Prokerala returns time objects
  const extractTime = (timeObj: unknown, defaultValue?: string): string | undefined => {
    if (!timeObj) return defaultValue;
    if (typeof timeObj === 'string') return timeObj;
    if (typeof timeObj === 'object' && timeObj !== null) {
      const obj = timeObj as Record<string, unknown>;
      if (obj.time && typeof obj.time === 'string') return obj.time;
      if (typeof obj.hour === 'number' && typeof obj.minute === 'number') {
        return `${String(obj.hour).padStart(2, '0')}:${String(obj.minute).padStart(2, '0')}`;
      }
    }
    return defaultValue;
  };

  const sunrise = extractTime(data.sunrise || data.sun_rise, "06:00") || "06:00";
  const sunset = extractTime(data.sunset || data.sun_set, "18:00") || "18:00";

  // Normalize tithi - Prokerala structure
  const nakshatraDetailsObj = data.nakshatra_details as Record<string, unknown> | undefined;
  const tithiData = data.tithi || nakshatraDetailsObj?.tithi;
  const tithiObj = tithiData as Record<string, unknown> | undefined;
  const pakshaValue = tithiObj?.paksha as string | undefined;
  const tithi: Tithi = {
    name: tithiObj?.name as string || tithiObj?.tithi_name as string || "Unknown",
    paksha: (pakshaValue === "Shukla" || pakshaValue === "Krishna") ? pakshaValue as "Shukla" | "Krishna" : undefined,
    start: extractTime(tithiObj?.start || tithiObj?.start_time),
    end: extractTime(tithiObj?.end || tithiObj?.end_time),
  };

  // Normalize nakshatra
  const nakshatraData = data.nakshatra || data.nakshatra_details;
  const nakshatraObj = nakshatraData as Record<string, unknown> | undefined;
  const nakshatra = {
    name: nakshatraObj?.name as string || nakshatraObj?.nakshatra_name as string || "Unknown",
    start: extractTime(nakshatraObj?.start || nakshatraObj?.start_time),
    end: extractTime(nakshatraObj?.end || nakshatraObj?.end_time),
  };

  // Normalize yoga
  const yogaData = data.yoga;
  const yogaObj = yogaData as Record<string, unknown> | undefined;
  const yoga = {
    name: yogaObj?.name as string || yogaObj?.yoga_name as string || "Unknown",
    start: extractTime(yogaObj?.start || yogaObj?.start_time),
    end: extractTime(yogaObj?.end || yogaObj?.end_time),
  };

  // Normalize karana
  const karanaData = data.karana;
  const karanaObj = karanaData as Record<string, unknown> | undefined;
  const karana = {
    name: karanaObj?.name as string || karanaObj?.karana_name as string || "Unknown",
    start: extractTime(karanaObj?.start || karanaObj?.start_time),
    end: extractTime(karanaObj?.end || karanaObj?.end_time),
  };

  // Normalize festivals
  const festivals: Festival[] = [];
  const auspiciousPeriodObj = data.auspicious_period as Record<string, unknown> | undefined;
  // Normalize each source to array before flattening
  const festivalSources = [
    auspiciousPeriodObj?.festivals,
    data.festivals,
    data.hindu_festivals,
  ]
    .filter(Boolean)
    .map(source => Array.isArray(source) ? source : [source])
    .flat();

  festivalSources.forEach((f: unknown) => {
    if (f && typeof f === 'object') {
      const festival = f as Record<string, unknown>;
      const festivalName = festival.name || festival.title;
      if (festivalName && typeof festivalName === 'string') {
        festivals.push({
          name: festivalName,
          kind: determineFestivalKind(festivalName),
          importance: festival.importance === 'high' || festival.importance === 'major' ? 'major' : 'normal',
          allDay: true,
        });
      }
    }
  });

  // Compute if date is in current month
  const dateObj = new Date(dateISO);
  const now = new Date();
  const isCurrentMonth = dateObj.getMonth() === now.getMonth() && dateObj.getFullYear() === now.getFullYear();

  return {
    dateISO,
    weekday,
    sunrise,
    sunset,
    tithi,
    nakshatra,
    yoga,
    karana,
    festivals,
    day,
    month,
    year,
    isCurrentMonth,
    // Extended fields - extract from Prokerala response
    moonPhase: typeof data.moon_phase === 'object' && data.moon_phase !== null
      ? (data.moon_phase as Record<string, unknown>).phase_name as string | undefined
      : data.moon_phase as string | undefined,
    rahu: extractTime((data as Record<string, unknown>).rahu_kala || (data as Record<string, unknown>).rahu),
    gulika: extractTime((data as Record<string, unknown>).gulika),
    yamaghanda: extractTime((data as Record<string, unknown>).yamaghanda || (data as Record<string, unknown>).yamakanda),
    abhijit: extractTime((data as Record<string, unknown>).abhijit_muhurta || (data as Record<string, unknown>).abhijit),
    amritakala: extractTime((data as Record<string, unknown>).amrita_kala || (data as Record<string, unknown>).amritakala),
    durmuhurta: extractTime((data as Record<string, unknown>).durmuhurta),
    varjyam: extractTime((data as Record<string, unknown>).varjyam),
  };
}

/**
 * Determine festival kind from name
 */
function determineFestivalKind(name: string): Festival["kind"] {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("jayanthi") || lowerName.includes("jayanti")) {
    return "jayanthi";
  }
  if (lowerName.includes("vrata") || lowerName.includes("vratam")) {
    return "vrata";
  }
  if (lowerName.includes("amavasya") || lowerName.includes("amavasai")) {
    return "amavasya";
  }
  if (lowerName.includes("pournami") || lowerName.includes("purnima")) {
    return "pournami";
  }
  if (
    lowerName.includes("chaturthi") ||
    lowerName.includes("diwali") ||
    lowerName.includes("navratri") ||
    lowerName.includes("ugadi") ||
    lowerName.includes("shivaratri")
  ) {
    return "festival";
  }

  return "special";
}

/**
 * Fallback data when API is unavailable
 * Provides basic calendar information
 */
function getFallbackDayData(
  dateISO: string,
  year: number,
  month: number,
  day: number
): DayPanchangResponse {
  const date = new Date(dateISO);
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return {
    dateISO,
    weekday: weekdays[date.getDay()],
    sunrise: "06:15",
    sunset: "18:30",
    tithi: { name: "Panchang data unavailable" },
    nakshatra: { name: "Please check API configuration" },
    yoga: { name: "-" },
    karana: { name: "-" },
    festivals: [],
    day,
    month,
    year,
    isCurrentMonth: true,
    notes: "API key not configured or service unavailable. Please add PANCHANG_API_KEY to .env.local",
  };
}
