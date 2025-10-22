import { NextRequest, NextResponse } from "next/server";
import { log } from "@/lib/logger";

/**
 * POST /api/scrape
 * Scrapes metadata from a provided URL
 *
 * TODO: Implement URL scraping workflow:
 * 1. Validate URL from request
 * 2. Call scraper.scrapeUrl()
 * 3. Return scraped metadata
 *
 * @param request - Next.js request object with { url: string }
 * @returns NextResponse with scraped data or error
 */
export async function POST(request: NextRequest) {
  log.api("POST /api/scrape received");

  try {
    // TODO: Parse and validate request body
    // const body = await request.json();
    // const { url } = body;

    // TODO: Validate URL format
    // TODO: Call scraper
    // const scrapedData = await scrapeUrl(url);

    return NextResponse.json(
      {
        message: "Not implemented",
        note: "This endpoint will scrape metadata from URLs",
      },
      { status: 501 }
    );
  } catch (error) {
    log.error("Error in /api/scrape", error as Error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
