import { NextRequest, NextResponse } from "next/server";
import { fetchMonthPanchang } from "@/lib/panchang/api-client";
import { MonthPanchangResponse, TEMPLE_CONFIG } from "@/lib/panchang/types";

/**
 * GET /api/panchang/month
 *
 * Query params:
 * - year: YYYY (required)
 * - month: 1-12 (required)
 *
 * Returns: MonthPanchangResponse with all days in the month
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const yearParam = searchParams.get("year");
    const monthParam = searchParams.get("month");

    // Validate parameters
    if (!yearParam || !monthParam) {
      return NextResponse.json(
        { error: "Missing required parameters: year and month" },
        { status: 400 }
      );
    }

    const year = parseInt(yearParam, 10);
    const month = parseInt(monthParam, 10);

    // Validate year and month
    if (isNaN(year) || year < 1900 || year > 2100) {
      return NextResponse.json(
        { error: "Invalid year. Must be between 1900 and 2100" },
        { status: 400 }
      );
    }

    if (isNaN(month) || month < 1 || month > 12) {
      return NextResponse.json(
        { error: "Invalid month. Must be between 1 and 12" },
        { status: 400 }
      );
    }

    // Fetch month data
    const days = await fetchMonthPanchang(year, month);

    const response: MonthPanchangResponse = {
      year,
      month,
      timezone: TEMPLE_CONFIG.TIMEZONE,
      lat: TEMPLE_CONFIG.LAT,
      lng: TEMPLE_CONFIG.LNG,
      days,
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Error in /api/panchang/month:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch month panchang data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
