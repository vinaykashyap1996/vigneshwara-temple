/**
 * Server-side utilities for fetching Panchang data
 * 
 * These functions must be called from Next.js server components or API routes.
 * They rely on Next.js server-only fetch options (next.revalidate) and should
 * not be used in client components.
 */

import { DayPanchangResponse, MonthPanchangResponse } from "./types";

/**
 * Fetch month panchang data from our API
 * Use this in server components
 */
export async function getMonthPanchang(
  year: number,
  month: number
): Promise<MonthPanchangResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/panchang/month?year=${year}&month=${month}`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 21600, // 6 hours
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch month data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching month panchang:", error);
    throw error;
  }
}

/**
 * Fetch single day panchang data from our API
 * Use this in server components
 */
export async function getDayPanchang(
  date: string // YYYY-MM-DD
): Promise<DayPanchangResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/panchang/day?date=${date}`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 21600, // 6 hours
      },
    });
    console.log("🚀 ~ getDayPanchang ~ response:", response)

    if (!response.ok) {
      throw new Error(`Failed to fetch day data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching day panchang:", error);
    throw error;
  }
}

/**
 * Generate Google Calendar event link for a festival
 */
export function generateGoogleCalendarLink(params: {
  title: string;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  description?: string;
  location?: string;
}): string {
  const { title, date, startTime, endTime, description, location } = params;

  // Format dates for Google Calendar
  const formatDateTime = (date: string, time?: string) => {
    const [year, month, day] = date.split("-");
    if (time) {
      const [hours, minutes] = time.split(":");
      return `${year}${month}${day}T${hours}${minutes}00`;
    }
    return `${year}${month}${day}`;
  };

  const start = formatDateTime(date, startTime);
  const end = formatDateTime(date, endTime);

  // For all-day events (no startTime), end date should be the next day
  let dateRange: string;
  if (startTime) {
    dateRange = `${start}/${end}`;
  } else {
    // Compute next day for all-day events
    const [year, month, day] = date.split("-").map(Number);
    const nextDay = new Date(year, month - 1, day + 1);
    const nextDayStr = `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, "0")}-${String(nextDay.getDate()).padStart(2, "0")}`;
    const endDate = formatDateTime(nextDayStr);
    dateRange = `${start}/${endDate}`;
  }

  const params_obj: Record<string, string> = {
    action: "TEMPLATE",
    text: title,
    dates: dateRange,
  };

  if (description) {
    params_obj.details = description;
  }

  if (location) {
    params_obj.location = location;
  }

  const queryString = new URLSearchParams(params_obj).toString();
  return `https://calendar.google.com/calendar/render?${queryString}`;
}

/**
 * Get upcoming festivals from month data
 */
export function getUpcomingFestivals(
  monthData: MonthPanchangResponse,
  limit: number = 5
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const festivals = monthData.days
    .filter((day) => {
      const dayDate = new Date(day.dateISO);
      return dayDate >= today && day.festivals.length > 0;
    })
    .flatMap((day) =>
      day.festivals.map((festival) => ({
        ...festival,
        date: day.dateISO,
        dateObj: new Date(day.dateISO),
      }))
    )
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .slice(0, limit);

  return festivals;
}

/**
 * Get major festivals (importance: major) from month data
 */
export function getMajorFestivals(monthData: MonthPanchangResponse) {
  return monthData.days
    .filter((day) =>
      day.festivals.some((f) => f.importance === "major")
    )
    .flatMap((day) =>
      day.festivals
        .filter((f) => f.importance === "major")
        .map((festival) => ({
          ...festival,
          date: day.dateISO,
          day: day.day,
          weekday: day.weekday,
        }))
    );
}
