/**
 * Content generator for gist mini-sites
 * Generates hero sections and content tiles from scraped data
 */

import { log } from "@/lib/logger";
import { ScrapedData } from "@/lib/scraper";

/**
 * Hero section data structure
 */
export interface HeroData {
  headline: string;
  subhead: string;
  style: string;
  media_url?: string;
  cta: string;
}

/**
 * Content tile data structure
 */
export interface TileData {
  id: string;
  kind: string;
  title: string;
  content: string;
}

/**
 * Complete generated content structure
 */
export interface GeneratedContent {
  hero: HeroData;
  tiles: TileData[];
}

/**
 * Generate gist content from scraped data
 *
 * TODO: Implement AI-powered content generation
 * Current implementation uses template-based mock data
 *
 * @param scrapedData - Metadata scraped from source URL
 * @param type - Type of gist (person, product, place)
 * @param goal - Primary goal (book, buy, waitlist)
 * @param title - User-provided title
 * @param audience - Target audience
 * @param vibe - Tone preference
 * @returns GeneratedContent - Hero and tiles for the mini-site
 *
 * @example
 * const content = generateGistContent(scrapedData, "person", "book", "John Doe", "prospects", "professional");
 * console.log(content.hero.headline); // "John Doe - Professionals Expert"
 */
export function generateGistContent(
  scrapedData: ScrapedData,
  type: "person" | "product" | "place",
  goal: "book" | "buy" | "waitlist",
  title: string,
  audience: "prospects" | "fans" | "investors",
  vibe: "friendly" | "professional" | "bold"
): GeneratedContent {
  log.gen(`Generating content for ${type} gist with ${goal} goal`);

  // Import template utilities
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const templates = require("./gist-templates");
  const {
    generateHeroHeadline,
    generateHeroSubhead,
    generateTilesForType,
    applyVibeStyling,
  } = templates;

  const styling = applyVibeStyling(vibe);

  const hero: HeroData = {
    headline: generateHeroHeadline(type, title, audience),
    subhead: generateHeroSubhead(goal, vibe),
    style: styling.tone, // Use vibe-based styling
    media_url: scrapedData.og_image,
    cta: getCtaText(goal),
  };

  const tiles: TileData[] = generateTilesForType(type);

  log.gen(`Generated ${tiles.length} content tiles for ${type}`);

  return { hero, tiles };
}

/**
 * Get appropriate CTA text based on goal
 */
function getCtaText(goal: "book" | "buy" | "waitlist"): string {
  switch (goal) {
    case "book":
      return "Book Now";
    case "buy":
      return "Buy Now";
    case "waitlist":
      return "Join Waitlist";
    default:
      return "Get Started";
  }
}

/**
 * Generate a unique slug from a title
 * @param title - The title to convert to a slug
 * @returns string - URL-safe slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
