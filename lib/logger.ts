/**
 * Structured logging utility for the Gist Platform
 * Provides consistent logging with prefixes and timestamps
 */

/**
 * Format timestamp in ISO format with milliseconds
 */
function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Core logging function with prefix
 */
function logWithPrefix(prefix: string, message: string): void {
  console.log(`[${prefix}] ${getTimestamp()} ${message}`);
}

/**
 * Logger object with specialized logging functions
 */
export const log = {
  /**
   * Log initialization events
   * Usage: log.init("App started on http://localhost:3000")
   */
  init: (message: string): void => {
    logWithPrefix("INIT", message);
  },

  /**
   * Log API route calls
   * Usage: log.api("POST /api/create-preview received")
   */
  api: (message: string): void => {
    logWithPrefix("API", message);
  },

  /**
   * Log Convex database operations
   * Usage: log.convex("Connected to Convex")
   */
  convex: (message: string): void => {
    logWithPrefix("CONVEX", message);
  },

  /**
   * Log URL scraping operations
   * Usage: log.scrape("Scraping https://example.com")
   */
  scrape: (message: string): void => {
    logWithPrefix("SCRAPE", message);
  },

  /**
   * Log content generation operations
   * Usage: log.gen("Generated hero section")
   */
  gen: (message: string): void => {
    logWithPrefix("GEN", message);
  },

  /**
   * Log errors with optional error object
   * Usage: log.error("Failed to create gist", error)
   */
  error: (message: string, error?: Error): void => {
    const errorMessage = error
      ? `${message}\n${error.stack || error.message}`
      : message;
    logWithPrefix("ERROR", errorMessage);
  },
};
