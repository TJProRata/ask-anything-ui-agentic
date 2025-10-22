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
 * Current implementation returns mock data for development
 *
 * @param scrapedData - Metadata scraped from source URL
 * @param type - Type of gist (person, product, place)
 * @param goal - Primary goal (book, buy, waitlist)
 * @returns GeneratedContent - Hero and tiles for the mini-site
 *
 * @example
 * const content = generateGistContent(scrapedData, "person", "book");
 * console.log(content.hero.headline); // "Welcome to My Site"
 */
export function generateGistContent(
  scrapedData: ScrapedData,
  type: "person" | "product" | "place",
  goal: "book" | "buy" | "waitlist"
): GeneratedContent {
  log.gen(`Generating content for ${type} gist with ${goal} goal`);

  // TODO: Implement real AI-powered content generation
  // For now, return mock data based on scraped input

  const hero: HeroData = {
    headline: scrapedData.title || "Welcome to My Gist",
    subhead:
      scrapedData.description ||
      "Discover everything you need to know in one place",
    style: "gradient", // Could be: gradient, image, solid
    media_url: scrapedData.og_image,
    cta: getCtaText(goal),
  };

  const tiles: TileData[] = [
    {
      id: "1",
      kind: "text",
      title: "About",
      content:
        "This is a generated content tile. In production, this would contain actual content from the source URL.",
    },
    {
      id: "2",
      kind: "link",
      title: "Learn More",
      content: "Visit our website for more information",
    },
    {
      id: "3",
      kind: "text",
      title: "Contact",
      content: "Get in touch with us for inquiries",
    },
  ];

  log.gen(`Generated ${tiles.length} content tiles`);

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
