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
 * 2. Get your OAuth2 credentials
 * 3. Add PANCHANG_CLIENT_ID and PANCHANG_CLIENT_SECRET to .env.local
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
  const isSandbox = process.env.PANCHANG_SANDBOX === 'true';
  const [year, month, day] = date.split("-").map(Number);

  // Check if we have OAuth credentials
  if (!clientId || !clientSecret) {
    console.warn(
      "❌ PANCHANG_CLIENT_ID or PANCHANG_CLIENT_SECRET not set. Using fallback data. Please add to .env.local"
    );
    return getFallbackDayData(date, year, month, day);
  }

  // Prokerala API endpoint
  const baseUrl = "https://api.prokerala.com/v2/astrology/panchang";
  const url = new URL(baseUrl);

  // In sandbox mode, Prokerala only allows January 1st (any year, any time)
  // In production, use the actual date
  const apiDate = isSandbox ? `${year}-01-01` : date;

  if (isSandbox) {
    console.log(`Sandbox mode: Using ${apiDate} instead of ${date} for API call`);
  }
  url.searchParams.append("ayanamsa", "1"); // Lahiri ayanamsa
  url.searchParams.append("datetime", `${apiDate}T06:00:00+05:30`); // ISO 8601 with timezone
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
 * - Prokerala free tier: 5 requests per 60 seconds
 * - Batch size of 4 requests with 15 second delay between batches
 * - Uses Promise.allSettled to handle transient failures gracefully
 * 
 * Note: Fetching a full month will take ~2 minutes (31 days = 8 batches)
 */
export async function fetchMonthPanchang(
  year: number,
  month: number // 1-12
): Promise<DayPanchang[]> {
  const daysInMonth = new Date(year, month, 0).getDate();
  const BATCH_SIZE = 4; // Stay under 5 req/min limit
  const BATCH_DELAY = 15000; // 15 seconds between batches (safer than 12s)
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

  // Helper: Extract time from ISO 8601 string or time object
  const extractTime = (timeObj: unknown, defaultValue?: string): string | undefined => {
    if (!timeObj) return defaultValue;
    if (typeof timeObj === 'string') {
      // Extract time from ISO 8601: "2026-01-09T06:47:53+05:30" -> "06:47"
      const match = timeObj.match(/T(\d{2}):(\d{2})/);
      return match ? `${match[1]}:${match[2]}` : timeObj;
    }
    if (typeof timeObj === 'object' && timeObj !== null) {
      const obj = timeObj as Record<string, unknown>;
      if (typeof obj.hour === 'number' && typeof obj.minute === 'number') {
        return `${String(obj.hour).padStart(2, '0')}:${String(obj.minute).padStart(2, '0')}`;
      }
    }
    return defaultValue;
  };

  // Sunrise/Sunset - extract from ISO 8601 strings
  const sunrise = extractTime(data.sunrise, "06:00") || "06:00";
  const sunset = extractTime(data.sunset, "18:00") || "18:00";

  // Tithi - Prokerala returns array, use first item
  const tithiArray = data.tithi as Array<Record<string, unknown>> | undefined;
  const tithiObj = Array.isArray(tithiArray) && tithiArray.length > 0 ? tithiArray[0] : undefined;
  const pakshaValue = tithiObj?.paksha as string | undefined;
  const tithi: Tithi = {
    name: tithiObj?.name as string || "Unknown",
    paksha: pakshaValue?.includes("Krishna") ? "Krishna" : pakshaValue?.includes("Shukla") ? "Shukla" : undefined,
    start: extractTime(tithiObj?.start),
    end: extractTime(tithiObj?.end),
  };

  // Nakshatra - Prokerala returns array, use first item
  const nakshatraArray = data.nakshatra as Array<Record<string, unknown>> | undefined;
  const nakshatraObj = Array.isArray(nakshatraArray) && nakshatraArray.length > 0 ? nakshatraArray[0] : undefined;
  const nakshatra = {
    name: nakshatraObj?.name as string || "Unknown",
    start: extractTime(nakshatraObj?.start),
    end: extractTime(nakshatraObj?.end),
  };

  // Yoga - Prokerala returns array, use first item
  const yogaArray = data.yoga as Array<Record<string, unknown>> | undefined;
  const yogaObj = Array.isArray(yogaArray) && yogaArray.length > 0 ? yogaArray[0] : undefined;
  const yoga = {
    name: yogaObj?.name as string || "Unknown",
    start: extractTime(yogaObj?.start),
    end: extractTime(yogaObj?.end),
  };

  // Karana - Prokerala returns array, use first item
  const karanaArray = data.karana as Array<Record<string, unknown>> | undefined;
  const karanaObj = Array.isArray(karanaArray) && karanaArray.length > 0 ? karanaArray[0] : undefined;
  const karana = {
    name: karanaObj?.name as string || "Unknown",
    start: extractTime(karanaObj?.start),
    end: extractTime(karanaObj?.end),
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
    notes: "API credentials not configured or service unavailable. Please add PANCHANG_CLIENT_ID and PANCHANG_CLIENT_SECRET to .env.local",
  };
}
