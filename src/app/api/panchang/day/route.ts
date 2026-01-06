import { NextRequest, NextResponse } from "next/server";
import { fetchDayPanchang } from "@/lib/panchang/api-client";

/**
 * GET /api/panchang/day
 *
 * Query params:
 * - date: YYYY-MM-DD (required)
 *
 * Returns: DayPanchangResponse with detailed info for that day
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");

    // Validate parameter
    if (!date) {
      return NextResponse.json(
        { error: "Missing required parameter: date (format: YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Must be YYYY-MM-DD" },
        { status: 400 }
      );
    }

    // Validate date is valid
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        { error: "Invalid date value" },
        { status: 400 }
      );
    }

    // Fetch day data
    const dayData = await fetchDayPanchang(date);
    console.log("🚀 ~ GET ~ dayData:", dayData)

    return NextResponse.json(dayData, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Error in /api/panchang/day:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch day panchang data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
