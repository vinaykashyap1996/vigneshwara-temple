// Panchang API Integration
// Using AstrologyAPI or similar service for Hindu calendar data

export interface PanchangData {
  tithi: string;
  nakshatra: string;
  paksha: string;
  masa: string;
  samvatsara: string;
  day: string;
  sunrise: string;
  sunset: string;
}

export interface SankalpaData {
  date: string;
  panchangData: PanchangData;
  sankalpa: {
    sanskrit: string;
    transliteration: string;
    english: string;
  };
}

// Free Panchang API endpoint (example - you'll need to sign up for API key)
// const PANCHANG_API_URL = 'https://api.vedicastroapi.com/v3-json/panchang/panchang';

// Fallback data when API is not available
const fallbackPanchangData: PanchangData = {
  tithi: 'Shukla Pratipada',
  nakshatra: 'Ashwini',
  paksha: 'Shukla',
  masa: 'Margashirsha',
  samvatsara: 'Shrimukha',
  day: 'Sunday',
  sunrise: '6:30 AM',
  sunset: '6:00 PM'
};

export async function getPanchangData(_date?: Date): Promise<PanchangData> {
  // const targetDate = _date || new Date();
  
  // For demo purposes, using fallback data
  // To use real API, uncomment and configure below:
  
  /*
  try {
    const response = await fetch(PANCHANG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.NEXT_PUBLIC_ASTROLOGY_API_KEY,
        date: targetDate.getDate(),
        month: targetDate.getMonth() + 1,
        year: targetDate.getFullYear(),
        hour: targetDate.getHours(),
        min: targetDate.getMinutes(),
        lat: 28.6139, // Replace with your temple location
        lon: 77.2090,
        tzone: 5.5
      })
    });
    
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    
    return {
      tithi: data.tithi.name,
      nakshatra: data.nakshatra.name,
      paksha: data.paksha,
      masa: data.hindu_maas.name,
      samvatsara: data.samvatsara.name,
      day: data.day,
      sunrise: data.sunrise,
      sunset: data.sunset
    };
  } catch (error) {
    console.error('Error fetching Panchang data:', error);
    return fallbackPanchangData;
  }
  */
  
  // Return fallback data for now
  return fallbackPanchangData;
}

export function generateSankalpa(panchangData: PanchangData): SankalpaData['sankalpa'] {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Generate Sankalpa based on Panchang data
  const sanskrit = `श्री भगवन्नामना, अद्य ${panchangData.samvatsara} नाम संवत्सरे, ${panchangData.paksha} पक्षे, ${panchangData.tithi} तिथौ, ${panchangData.nakshatra} नक्षत्रे, ${panchangData.masa} मासे, शुभ दिने शुभ मुहूर्ते, श्री गणेश प्रीत्यर्थं पूजां करिष्ये।`;

  const transliteration = `Śrī Bhagavannāmnā, adya ${panchangData.samvatsara} nāma saṃvatsare, ${panchangData.paksha} pakṣe, ${panchangData.tithi} tithau, ${panchangData.nakshatra} nakṣatre, ${panchangData.masa} māse, śubha dine śubha muhūrte, Śrī Gaṇeśa prītyarthaṃ pūjāṃ kariṣye.`;

  const english = `In the name of the Supreme Lord, on this auspicious day of ${dateStr}, in the ${panchangData.samvatsara} year, during ${panchangData.paksha} Paksha, on ${panchangData.tithi} Tithi, under ${panchangData.nakshatra} Nakshatra, in the month of ${panchangData.masa}, at this auspicious time, I shall perform this puja for the pleasure of Lord Ganesha.`;

  return {
    sanskrit,
    transliteration,
    english
  };
}

export async function getTodaySankalpa(): Promise<SankalpaData> {
  const today = new Date();
  const panchangData = await getPanchangData(today);
  const sankalpa = generateSankalpa(panchangData);

  return {
    date: today.toISOString(),
    panchangData,
    sankalpa
  };
}
