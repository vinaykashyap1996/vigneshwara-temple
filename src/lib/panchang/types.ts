/**
 * Normalized Panchang data types
 * These types represent the data structure we use throughout the app
 */

export interface Tithi {
  name: string;
  paksha?: "Shukla" | "Krishna"; // Bright half or Dark half
  start?: string; // Time when tithi starts
  end?: string; // Time when tithi ends
}

export interface Nakshatra {
  name: string;
  start?: string;
  end?: string;
}

export interface Yoga {
  name: string;
  start?: string;
  end?: string;
}

export interface Karana {
  name: string;
  start?: string;
  end?: string;
}

export interface Festival {
  name: string;
  kind?:
    | "festival"
    | "vrata"
    | "jayanthi"
    | "amavasya"
    | "pournami"
    | "special";
  allDay?: boolean;
  start?: string; // ISO time string
  end?: string; // ISO time string
  importance?: "major" | "normal";
  description?: string;
}

export interface DayPanchang {
  dateISO: string; // YYYY-MM-DD
  weekday: string; // Monday, Tuesday, etc.
  sunrise: string; // HH:mm
  sunset: string; // HH:mm
  tithi: Tithi;
  nakshatra: Nakshatra;
  yoga: Yoga;
  karana: Karana;
  festivals: Festival[];
  notes?: string;
  // Additional fields for calendar display
  day: number; // Day of month
  month: number; // 1-12
  year: number;
  isCurrentMonth?: boolean;
}

export interface MonthPanchangResponse {
  year: number;
  month: number; // 1-12
  timezone: string;
  lat: number;
  lng: number;
  days: DayPanchang[];
}

export interface DayPanchangResponse extends DayPanchang {
  // Extended details for single-day view
  moonPhase?: string;
  rahu?: string;
  gulika?: string;
  yamaghanda?: string;
  abhijit?: string;
  amritakala?: string;
  durmuhurta?: string;
  varjyam?: string;
}

// Temple location constants
export const TEMPLE_CONFIG = {
  TIMEZONE: "Asia/Kolkata",
  LAT: 12.912277012308614,
  LNG: 77.61337152143297,
  CITY: "Bengaluru",
} as const;
