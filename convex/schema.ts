import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Convex schema for the Gist Platform
 * Defines the structure of data stored in the database
 */
export default defineSchema({
  /**
   * Gists table - stores shareable mini-site data
   * Each gist represents a user's personalized landing page
   */
  gists: defineTable({
    // Unique identifier for the gist URL (e.g., "yourname")
    slug: v.string(),

    // Publication status: "preview" (editable) or "public" (live)
    status: v.union(v.literal("preview"), v.literal("public")),

    // Type of gist content
    type: v.union(
      v.literal("person"),
      v.literal("product"),
      v.literal("place")
    ),

    // Main title of the gist
    title: v.string(),

    // Primary call-to-action goal
    goal: v.union(
      v.literal("book"),
      v.literal("buy"),
      v.literal("waitlist")
    ),

    // Target audience description
    audience: v.string(),

    // Desired vibe/tone
    vibe: v.string(),

    // Source URL to scrape content from
    source_url: v.string(),

    // User ID who created this gist
    userId: v.string(),

    // Hero section data
    hero: v.object({
      headline: v.string(),
      subhead: v.string(),
      style: v.string(),
      media_url: v.optional(v.string()),
      cta: v.string(),
    }),

    // Content tiles (flexible array of content blocks)
    tiles: v.array(
      v.object({
        id: v.string(),
        kind: v.string(), // "text", "image", "link", etc.
        title: v.string(),
        content: v.string(),
      })
    ),

    // Data scraped from source URL
    scraped_data: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      og_image: v.optional(v.string()),
      primary_color: v.optional(v.string()),
    }),

    // Timestamp of creation
    created_at: v.number(),
  })
    // Index on slug for fast lookups by URL
    .index("by_slug", ["slug"])
    // Index on userId for fetching user's gists
    .index("by_user", ["userId"])
    // Index on status for filtering published vs preview gists
    .index("by_status", ["status"]),
});
