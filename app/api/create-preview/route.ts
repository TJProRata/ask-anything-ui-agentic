import { NextRequest, NextResponse } from "next/server";
import { log } from "@/lib/logger";
import {
  validateCreatePreviewRequest,
  formatValidationError,
} from "./validation";
import { scrapeUrl } from "@/lib/scraper";
import { generateGistContent } from "@/lib/generator";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { z } from "zod";

// Initialize Convex client
const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL || ""
);

/**
 * POST /api/create-preview
 * Receives widget data after step 6 and creates a preview gist
 *
 * Workflow:
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
    // 1. Parse and validate request body
    const body = await request.json();
    log.api("Request body parsed");

    let validated;
    try {
      validated = validateCreatePreviewRequest(body);
      log.api(`Validated request for slug: ${validated.slug}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = formatValidationError(error);
        log.error("Validation error", new Error(errorMessage));
        return NextResponse.json(
          { error: "Validation failed", details: errorMessage },
          { status: 400 }
        );
      }
      throw error;
    }

    // 2. Scrape URL metadata
    log.api(`Scraping URL: ${validated.source_url}`);
    const scrapedData = await scrapeUrl(validated.source_url);
    log.api("URL scraped successfully");

    // 3. Generate content using templates
    log.api(
      `Generating content for ${validated.type} with ${validated.goal} goal`
    );
    const content = generateGistContent(
      scrapedData,
      validated.type,
      validated.goal,
      validated.title,
      validated.audience,
      validated.vibe
    );
    log.api(`Generated hero and ${content.tiles.length} tiles`);

    // 4. Save to Convex
    log.api("Saving gist to Convex");
    const gistId = await convex.mutation(api.gists.createGist, {
      slug: validated.slug,
      type: validated.type,
      title: validated.title,
      goal: validated.goal,
      audience: validated.audience,
      vibe: validated.vibe,
      source_url: validated.source_url,
      userId: validated.userId,
      hero: content.hero,
      tiles: content.tiles,
      scraped_data: scrapedData,
    });
    log.api(`Gist created with ID: ${gistId}`);

    // 5. Return preview URL
    const previewUrl = `/preview/${validated.slug}`;
    log.api(`Preview URL generated: ${previewUrl}`);

    return NextResponse.json({
      success: true,
      previewUrl,
      slug: validated.slug,
      gistId: gistId.toString(),
    });
  } catch (error) {
    log.error("Error in /api/create-preview", error as Error);

    // Handle specific errors
    if (
      error instanceof Error &&
      error.message.includes("already exists")
    ) {
      return NextResponse.json(
        { error: "Slug already exists", details: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
