import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

/**
 * Query: List all gists
 * Returns all gists ordered by creation date (newest first)
 */
export const listGists = query({
  args: {},
  handler: async (ctx) => {
    const gists = await ctx.db.query("gists").order("desc").collect();
    return gists;
  },
});

/**
 * Query: Get gist by slug
 * Fetches a single gist by its unique slug identifier
 */
export const getGistBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const gist = await ctx.db
      .query("gists")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return gist;
  },
});

/**
 * Query: Get gists by user
 * Fetches all gists created by a specific user
 */
export const getGistsByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const gists = await ctx.db
      .query("gists")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
    return gists;
  },
});

/**
 * Query: Get gists by status
 * Fetches all gists with a specific status (preview or public)
 */
export const getGistsByStatus = query({
  args: { status: v.union(v.literal("preview"), v.literal("public")) },
  handler: async (ctx, args) => {
    const gists = await ctx.db
      .query("gists")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .collect();
    return gists;
  },
});

/**
 * Mutation: Create a new gist
 * Validates required fields and creates a gist in preview status
 */
export const createGist = mutation({
  args: {
    slug: v.string(),
    type: v.union(v.literal("person"), v.literal("product"), v.literal("place")),
    title: v.string(),
    goal: v.union(v.literal("book"), v.literal("buy"), v.literal("waitlist")),
    audience: v.string(),
    vibe: v.string(),
    source_url: v.string(),
    userId: v.string(),
    hero: v.object({
      headline: v.string(),
      subhead: v.string(),
      style: v.string(),
      media_url: v.optional(v.string()),
      cta: v.string(),
    }),
    tiles: v.array(
      v.object({
        id: v.string(),
        kind: v.string(),
        title: v.string(),
        content: v.string(),
      })
    ),
    scraped_data: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      og_image: v.optional(v.string()),
      primary_color: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    // Check if slug already exists
    const existing = await ctx.db
      .query("gists")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error(`Gist with slug "${args.slug}" already exists`);
    }

    // Create the gist
    const gistId = await ctx.db.insert("gists", {
      slug: args.slug,
      status: "preview", // New gists start in preview mode
      type: args.type,
      title: args.title,
      goal: args.goal,
      audience: args.audience,
      vibe: args.vibe,
      source_url: args.source_url,
      userId: args.userId,
      hero: args.hero,
      tiles: args.tiles,
      scraped_data: args.scraped_data,
      created_at: Date.now(),
    });

    return gistId;
  },
});

/**
 * Mutation: Update an existing gist
 * Allows updating any field except slug (which is immutable)
 */
export const updateGist = mutation({
  args: {
    id: v.id("gists"),
    updates: v.object({
      status: v.optional(v.union(v.literal("preview"), v.literal("public"))),
      type: v.optional(
        v.union(v.literal("person"), v.literal("product"), v.literal("place"))
      ),
      title: v.optional(v.string()),
      goal: v.optional(
        v.union(v.literal("book"), v.literal("buy"), v.literal("waitlist"))
      ),
      audience: v.optional(v.string()),
      vibe: v.optional(v.string()),
      source_url: v.optional(v.string()),
      hero: v.optional(
        v.object({
          headline: v.string(),
          subhead: v.string(),
          style: v.string(),
          media_url: v.optional(v.string()),
          cta: v.string(),
        })
      ),
      tiles: v.optional(
        v.array(
          v.object({
            id: v.string(),
            kind: v.string(),
            title: v.string(),
            content: v.string(),
          })
        )
      ),
      scraped_data: v.optional(
        v.object({
          title: v.optional(v.string()),
          description: v.optional(v.string()),
          og_image: v.optional(v.string()),
          primary_color: v.optional(v.string()),
        })
      ),
    }),
  },
  handler: async (ctx, args) => {
    const { id, updates } = args;

    // Verify gist exists
    const gist = await ctx.db.get(id);
    if (!gist) {
      throw new Error(`Gist with id "${id}" not found`);
    }

    // Update the gist
    await ctx.db.patch(id, updates);

    return id;
  },
});

/**
 * Mutation: Delete a gist
 * Permanently removes a gist from the database
 */
export const deleteGist = mutation({
  args: { id: v.id("gists") },
  handler: async (ctx, args) => {
    // Verify gist exists
    const gist = await ctx.db.get(args.id);
    if (!gist) {
      throw new Error(`Gist with id "${args.id}" not found`);
    }

    // Delete the gist
    await ctx.db.delete(args.id);

    return args.id;
  },
});
