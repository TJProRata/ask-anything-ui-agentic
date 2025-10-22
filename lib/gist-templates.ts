/**
 * Template generation utilities for gist creation
 * Provides dynamic content templates based on user inputs
 */

import { TileData } from "./generator";

/**
 * Generate hero headline based on gist type, title, and audience
 * @param type - Type of gist (person, product, place)
 * @param title - User-provided title
 * @param audience - Target audience
 * @returns Dynamic headline string
 */
export function generateHeroHeadline(
  type: "person" | "product" | "place",
  title: string,
  audience: "prospects" | "fans" | "investors"
): string {
  const audienceMap = {
    prospects: "Professionals",
    fans: "Enthusiasts",
    investors: "Partners",
  };

  const templates = {
    person: `${title} - ${audienceMap[audience]} Expert`,
    product: `Introducing ${title} for ${audienceMap[audience]}`,
    place: `Visit ${title} - Perfect for ${audienceMap[audience]}`,
  };

  return templates[type];
}

/**
 * Generate hero subhead based on goal and vibe
 * @param goal - Primary goal (book, buy, waitlist)
 * @param vibe - Tone preference (friendly, professional, bold)
 * @returns Subhead copy
 */
export function generateHeroSubhead(
  goal: "book" | "buy" | "waitlist",
  vibe: "friendly" | "professional" | "bold"
): string {
  const templates = {
    book: {
      friendly: "Let's connect! Schedule a time that works for you.",
      professional: "Schedule a consultation to discuss your needs.",
      bold: "Ready to take the next step? Book your session now.",
    },
    buy: {
      friendly: "Get yours today and join our community!",
      professional: "Secure your purchase with confidence.",
      bold: "Don't wait. Get it now while supplies last.",
    },
    waitlist: {
      friendly: "Be the first to know! Join our exclusive list.",
      professional: "Register your interest for early access.",
      bold: "Join the waitlist and get ahead of the curve.",
    },
  };

  return templates[goal][vibe];
}

/**
 * Generate tiles based on gist type
 * @param type - Type of gist
 * @returns Array of tile configurations
 */
export function generateTilesForType(
  type: "person" | "product" | "place"
): TileData[] {
  const templates = {
    person: [
      {
        id: "bio",
        kind: "text",
        title: "About Me",
        content:
          "Learn more about my background, experience, and what drives me.",
      },
      {
        id: "highlights",
        kind: "list",
        title: "Key Highlights",
        content:
          "Notable achievements, credentials, and areas of expertise.",
      },
      {
        id: "contact",
        kind: "link",
        title: "Get in Touch",
        content: "Let's connect and explore how we can work together.",
      },
      {
        id: "faq",
        kind: "text",
        title: "FAQ",
        content: "Answers to commonly asked questions about my services.",
      },
    ],
    product: [
      {
        id: "features",
        kind: "list",
        title: "Key Features",
        content: "Everything you need to know about what makes this special.",
      },
      {
        id: "benefits",
        kind: "text",
        title: "Benefits",
        content: "How this product will improve your life or workflow.",
      },
      {
        id: "pricing",
        kind: "link",
        title: "Pricing",
        content: "Simple, transparent pricing that fits your budget.",
      },
      {
        id: "reviews",
        kind: "text",
        title: "What People Say",
        content: "Real testimonials from satisfied customers.",
      },
      {
        id: "faq",
        kind: "text",
        title: "FAQ",
        content: "Common questions about features, pricing, and support.",
      },
    ],
    place: [
      {
        id: "about",
        kind: "text",
        title: "About This Place",
        content: "Discover the story and unique character of this location.",
      },
      {
        id: "visit",
        kind: "link",
        title: "Plan Your Visit",
        content: "Hours, location, and everything you need to know.",
      },
      {
        id: "gallery",
        kind: "image",
        title: "Photo Gallery",
        content: "See stunning images and virtual tours.",
      },
      {
        id: "reviews",
        kind: "text",
        title: "Visitor Reviews",
        content: "What others are saying about their experience.",
      },
      {
        id: "faq",
        kind: "text",
        title: "FAQ",
        content: "Answers to frequently asked questions about visiting.",
      },
    ],
  };

  return templates[type];
}

/**
 * Apply vibe styling preferences
 * @param vibe - Tone preference
 * @returns Style configuration object
 */
export function applyVibeStyling(
  vibe: "friendly" | "professional" | "bold"
): {
  primaryColor: string;
  typography: string;
  tone: string;
} {
  const styles = {
    friendly: {
      primaryColor: "#FF6B6B", // Warm coral
      typography: "rounded",
      tone: "casual",
    },
    professional: {
      primaryColor: "#4A5568", // Cool slate
      typography: "serif",
      tone: "formal",
    },
    bold: {
      primaryColor: "#9333EA", // Vibrant purple
      typography: "sans-serif-bold",
      tone: "energetic",
    },
  };

  return styles[vibe];
}
