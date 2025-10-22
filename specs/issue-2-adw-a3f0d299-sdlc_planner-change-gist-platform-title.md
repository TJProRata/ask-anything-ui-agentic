# Chore: Change title of product from "gist platform" to "gist builder"

## Chore Description
Update all references to the 10-stage onboarding product from "gist platform" or "Create Your Gist" to "Gist Builder" throughout the codebase. This includes user-facing text in components, documentation, comments, and log messages to ensure consistent branding and naming.

## Relevant Files
Use these files to resolve the chore:

- `lib/logger.ts` - Contains comment "Structured logging utility for the Gist Platform" that needs to be updated to reference "Gist Builder"
- `specs/gist-creation-onboarding-flow.md` - Documentation file with multiple references to "gist platform" in goals and page descriptions
- `app/page.tsx` - Homepage with comment "Gist Platform" and button text "Create Your Gist →" that need to be updated
- `app/gistplatform/page.tsx` - Main gist platform entry page with comment, log message, and heading text that need updating
- `specs/gist-platform-infrastructure-setup.md` - Extensive documentation with title and multiple references to "Gist Platform" throughout
- `convex/schema.ts` - Contains comment "Convex schema for the Gist Platform" that should reference "Gist Builder"
- `components/widgets/gist-creation-widget/gist-creation-widget.tsx` - Widget component with button text "Create Your Gist" that needs updating
- `app_docs/feature-gist-001-gist-creation-onboarding.md` - Feature documentation with reference to "Gist Platform Page"

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Update Core Application Files
Update the main application files that contain user-facing text and functional code:

- Update `lib/logger.ts` comment from "Structured logging utility for the Gist Platform" to "Structured logging utility for the Gist Builder"
- Update `app/page.tsx` comment from "Gist Platform" to "Gist Builder" and button text from "Create Your Gist →" to "Gist Builder →"
- Update `app/gistplatform/page.tsx` comment from "Gist Platform Entry Page" to "Gist Builder Entry Page", log message from "Gist Platform page loaded" to "Gist Builder page loaded", and heading from "Create Your Gist" to "Gist Builder"
- Update `convex/schema.ts` comment from "Convex schema for the Gist Platform" to "Convex schema for the Gist Builder"

### Step 2: Update Widget Components
Update the widget components that contain user-facing text:

- Update `components/widgets/gist-creation-widget/gist-creation-widget.tsx` button text from "Create Your Gist" to "Gist Builder"

### Step 3: Update Documentation Files
Update all documentation files to use consistent naming:

- Update `specs/gist-creation-onboarding-flow.md` references from "gist platform" to "Gist Builder" and "Gist Platform Page" to "Gist Builder Page"
- Update `specs/gist-platform-infrastructure-setup.md` title from "Feature: Gist Platform Infrastructure Setup" to "Feature: Gist Builder Infrastructure Setup" and all references throughout the document from "Gist Platform" to "Gist Builder" and "Create Your Gist" to "Gist Builder"
- Update `app_docs/feature-gist-001-gist-creation-onboarding.md` reference from "Gist Platform Page" to "Gist Builder Page"

### Step 4: Run Validation Commands
Execute all validation commands to ensure the chore is complete with zero regressions.

## Validation Commands
Execute every command to validate the chore is complete with zero regressions.

- `bun run lint` - Ensure code meets linting standards
- `bun run build` - Verify Next.js application builds successfully
- `bun run build:widget` - Verify widget bundle builds successfully (if widget changes made)
- `grep -r "gist platform" .` - Verify no remaining "gist platform" references exist (should return no results or only in irrelevant files)
- `grep -r "Create Your Gist" .` - Verify no remaining "Create Your Gist" references exist (should return no results or only in irrelevant files)

## Notes
- The chore focuses on user-facing text and documentation - technical file names and URLs may not need to change
- Pay special attention to maintaining consistent capitalization: "Gist Builder" should be used for headings and titles
- Log messages should use "Gist Builder" to maintain consistency across the application
- All documentation files should be updated to reflect the new product naming for consistency