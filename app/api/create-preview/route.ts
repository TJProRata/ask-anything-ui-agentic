import { NextRequest, NextResponse } from "next/server";
import { log } from "@/lib/logger";

/**
 * POST /api/create-preview
 * Receives widget data after question 6 and creates a preview gist
 *
 * TODO: Implement full preview creation workflow:
 * 1. Validate incoming data
 * 2. Call scraper to get URL metadata
 * 3. Call generator to create hero + tiles
 * 4. Save to Convex database
 * 5. Return preview URL
 *
 * @param request - Next.js request object
 * @returns NextResponse with preview URL or error
 */
export async function POST(request: NextRequest) {
  log.api("POST /api/create-preview received");

  try {
    // TODO: Parse and validate request body
    // const body = await request.json();

    // TODO: Implement preview creation logic

    return NextResponse.json(
      {
        message: "Not implemented",
        note: "This endpoint will create a preview gist from widget data",
      },
      { status: 501 }
    );
  } catch (error) {
    log.error("Error in /api/create-preview", error as Error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
