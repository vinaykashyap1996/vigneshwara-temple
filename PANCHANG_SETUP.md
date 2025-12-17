# Panchang API Setup Guide

This guide explains how to integrate a real Panchang API for accurate Tithi-based Sankalpas.

## Current Setup

The Sankalpa feature is currently using **fallback data** (demo mode). To get real-time Hindu calendar data, you need to integrate a Panchang API.

## Recommended Panchang API Services

### 1. **Vedic Astro API** (Recommended)
- Website: https://vedicastroapi.com/
- Features: Panchang, Tithi, Nakshatra, Muhurta
- Pricing: Free tier available (limited calls)
- Documentation: https://vedicastroapi.com/docs

### 2. **AstrologyAPI**
- Website: https://astrologyapi.com/
- Features: Comprehensive Hindu calendar data
- Pricing: Free trial, then paid plans
- Documentation: https://astrologyapi.com/docs

### 3. **DrikPanchang API**
- Website: https://www.drikpanchang.com/
- Features: Most accurate Indian Panchang
- Note: May require custom integration

## Setup Instructions

### Step 1: Choose and Sign Up for API Service

1. Visit your chosen API provider (e.g., VedicAstroAPI)
2. Create an account
3. Get your API key from the dashboard
4. Note the API endpoint URL

### Step 2: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_ASTROLOGY_API_KEY=your_api_key_here
NEXT_PUBLIC_TEMPLE_LATITUDE=28.6139
NEXT_PUBLIC_TEMPLE_LONGITUDE=77.2090
NEXT_PUBLIC_TEMPLE_TIMEZONE=5.5
```

Replace the coordinates with your temple's actual location.

### Step 3: Update the Panchang Integration

Edit `/src/lib/panchang.ts` and uncomment the API integration code:

1. Uncomment the `PANCHANG_API_URL` constant
2. Uncomment the API fetch logic in `getPanchangData()`
3. Update the API endpoint and request format per your provider's documentation
4. Test the integration

### Step 4: API Integration Example

Here's the basic structure (already in the code, just uncomment):

```typescript
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
    lat: parseFloat(process.env.NEXT_PUBLIC_TEMPLE_LATITUDE || '28.6139'),
    lon: parseFloat(process.env.NEXT_PUBLIC_TEMPLE_LONGITUDE || '77.2090'),
    tzone: parseFloat(process.env.NEXT_PUBLIC_TEMPLE_TIMEZONE || '5.5')
  })
});
```

### Step 5: Handle API Responses

Map the API response to our `PanchangData` interface:

```typescript
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
```

Adjust field names based on your API's response structure.

### Step 6: Test the Integration

1. Restart your development server: `npm run dev`
2. Visit http://localhost:3000/sankalpa
3. Check browser console for any errors
4. Verify Panchang data is accurate

## Alternative: Manual Data Entry

If you don't want to use an API, you can:

1. Subscribe to a Panchang calendar service
2. Manually update the fallback data daily/weekly
3. Create a simple admin interface to update values

## Caching Strategy (Recommended)

To reduce API calls and costs:

1. Cache today's Panchang data in localStorage
2. Refresh only once per day
3. Use server-side caching for multiple users

Add this to `SankalpaSection.tsx`:

```typescript
useEffect(() => {
  const cachedData = localStorage.getItem('sankalpaData');
  const cachedDate = localStorage.getItem('sankalpaDate');
  const today = new Date().toDateString();
  
  if (cachedData && cachedDate === today) {
    setSankalpaData(JSON.parse(cachedData));
    setLoading(false);
  } else {
    loadSankalpa().then(data => {
      localStorage.setItem('sankalpaData', JSON.stringify(data));
      localStorage.setItem('sankalpaDate', today);
    });
  }
}, []);
```

## Troubleshooting

### API Key Issues
- Verify the API key is correct
- Check if you've exceeded free tier limits
- Ensure environment variables are loaded

### CORS Errors
- Some APIs may require server-side calls
- Create a Next.js API route: `/app/api/panchang/route.ts`

### Incorrect Data
- Verify temple coordinates are accurate
- Check timezone offset is correct for your location
- Ensure date/time format matches API requirements

## Free Alternative

If you want to avoid API costs, you can:
1. Use a static Panchang calendar and update monthly
2. Calculate Tithi locally using astronomical algorithms (complex)
3. Partner with a local Pandit who can provide accurate data

## Support

For API-specific questions, contact your chosen provider's support team.
For code issues, check the project's GitHub issues or contact temple admin.
