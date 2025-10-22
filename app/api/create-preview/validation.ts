/**
 * Validation schemas for /api/create-preview endpoint
 */

import { z } from "zod";

/**
 * Zod schema for create-preview POST request body
 */
export const createPreviewSchema = z.object({
  type: z.enum(["person", "product", "place"]),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be 100 characters or less")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  goal: z.enum(["book", "buy", "waitlist"]),
  audience: z.enum(["prospects", "fans", "investors"]),
  vibe: z.enum(["friendly", "professional", "bold"]),
  source_url: z
    .string()
    .url("Source URL must be a valid URL")
    .max(500, "URL must be 500 characters or less"),
  userId: z.string().min(1, "User ID is required"),
  hero_style: z.enum(["image", "video", "gradient"]).optional(),
  cta_placement: z.string().optional(),
});

/**
 * Inferred TypeScript type from validation schema
 */
export type CreatePreviewRequest = z.infer<typeof createPreviewSchema>;

/**
 * Format validation errors into user-friendly messages
 * @param error - Zod validation error
 * @returns Formatted error message
 */
export function formatValidationError(error: z.ZodError): string {
  const issues = error.issues.map((issue) => {
    const path = issue.path.join(".");
    return `${path}: ${issue.message}`;
  });
  return issues.join(", ");
}

/**
 * Validate and parse request body
 * @param body - Unknown request body
 * @returns Validated CreatePreviewRequest or throws ZodError
 */
export function validateCreatePreviewRequest(
  body: unknown
): CreatePreviewRequest {
  return createPreviewSchema.parse(body);
}
