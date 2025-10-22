/**
 * Convex client configuration
 * Exports a configured ConvexReactClient for use in React components
 */

import { ConvexReactClient } from "convex/react";
import { log } from "@/lib/logger";

/**
 * Get Convex URL from environment variables
 * Throws error if NEXT_PUBLIC_CONVEX_URL is not set
 */
function getConvexUrl(): string {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!url) {
    const errorMsg =
      "Missing NEXT_PUBLIC_CONVEX_URL environment variable. Run 'bunx convex dev' to get your URL.";
    log.error(errorMsg);
    throw new Error(errorMsg);
  }

  return url;
}

/**
 * Convex React Client instance
 * Use this in ConvexProvider or for manual queries/mutations
 *
 * @example
 * import { convexClient } from "@/lib/convex";
 *
 * // In a component:
 * <ConvexProvider client={convexClient}>
 *   <App />
 * </ConvexProvider>
 */
export const convexClient = new ConvexReactClient(getConvexUrl());

log.convex(`Convex client initialized with URL: ${getConvexUrl()}`);
