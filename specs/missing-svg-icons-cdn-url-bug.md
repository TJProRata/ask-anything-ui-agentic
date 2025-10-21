# Bug: Missing SVG Icons Due to Undefined CDN Base URL

## Bug Description
Several SVG icons and images in the onboarding widget are not rendering, appearing as broken image placeholders. Based on the screenshots provided, the following assets are failing to load:

1. **Image #1 (Phase 0)**: "Powered by GistAnswers" footer SVG at bottom of widget (small broken image icon visible)
2. **Image #2 (Phase 10+)**: Widget preview GIF in content area (broken image placeholder visible)
3. **Image #3 (Success Phase)**: Celebration GIF background (shows "Celebration background" alt text with broken image)

**Expected Behavior**:
- "Powered by GistAnswers" SVG logo displays at bottom of widget
- Widget preview GIF displays in recommendation phase
- Celebration GIF displays as background in success screen
- All images load successfully from configured CDN or local paths

**Actual Behavior**:
- All CDN-based images show broken image placeholders
- Browser attempts to load from `undefined/assets/...` (malformed URL)
- Images fail with 404 or network errors
- Alt text displays instead of images

## Problem Statement
The `NEXT_PUBLIC_CDN_BASE_URL` environment variable is not defined, causing template literals in image `src` attributes to resolve to `undefined/assets/...`, resulting in broken image URLs and failed asset loading.

## Solution Statement
Create a `.env.local` file with the `NEXT_PUBLIC_CDN_BASE_URL` environment variable configured. For local development, this should point to the Next.js application's base URL (empty string or `/`). For production, this can be configured to point to a CDN. Additionally, add fallback logic to handle missing environment variables gracefully.

## Steps to Reproduce
1. Start the development server: `bun run dev`
2. Navigate to http://localhost:3000/onboarding
3. Observe Phase 0 - scroll to bottom of widget
4. Notice "Powered by GistAnswers" SVG is broken (small placeholder icon)
5. Progress through phases to Phase 10+ (recommendation phase)
6. Notice widget preview GIF shows broken image placeholder
7. Complete onboarding to reach success screen (Phase 12)
8. Notice celebration GIF background is missing (shows alt text)
9. Open browser DevTools Network tab
10. See failed requests to `undefined/assets/celebration.gif`, `undefined/assets/svgs/poweredbyfooter.svg`, etc.

## Root Cause Analysis

**Location 1**: `components/ui/powered-by-button.tsx:11`
```tsx
src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/assets/svgs/poweredbyfooter.svg`}
```

**Location 2**: `components/ai-elements/success-phase.tsx:14` (approx)
```tsx
src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/assets/celebration.gif`}
```

**Location 3**: `components/widgets/onboarding-widget/onboarding-widget.tsx:563` (approx)
```tsx
src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/assets/celebration.gif`}
gifSrc={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/assets/preview.gif`}
```

**Root Cause**:
The `NEXT_PUBLIC_CDN_BASE_URL` environment variable is used throughout the codebase to construct asset URLs, but it's not defined in any `.env` file. When `process.env.NEXT_PUBLIC_CDN_BASE_URL` is `undefined`, template literals like `${undefined}/assets/file.svg` resolve to `"undefined/assets/file.svg"`, which is an invalid URL.

**Why This Happens**:
1. Next.js requires environment variables prefixed with `NEXT_PUBLIC_` to be exposed to the browser
2. No `.env.local` or `.env` file exists with this variable defined
3. The `.env.local.example` shows commented-out examples but no active configuration
4. Without the variable, JavaScript converts `undefined` to string `"undefined"` in template literals
5. Browser attempts to fetch from malformed URLs like `http://localhost:3000/undefined/assets/...`

**Asset Locations**:
- GIF files exist at: `public/assets/celebration.gif`, `public/assets/preview.gif` ✅
- SVG file missing: `public/assets/svgs/poweredbyfooter.svg` ❌
- SVG should be created or CDN URL configured

## Relevant Files

### Files to Modify

**`.env.local`** (NEW FILE)
- Purpose: Define environment variables for local development
- Create file with `NEXT_PUBLIC_CDN_BASE_URL` configuration
- For local development, use empty string or root path

**`components/ui/powered-by-button.tsx`**
- Line 11: Uses `NEXT_PUBLIC_CDN_BASE_URL` for SVG src
- Needs fallback logic for undefined env var
- SVG file doesn't exist in public directory - needs creation or CDN hosting

**`components/ai-elements/success-phase.tsx`**
- Uses `NEXT_PUBLIC_CDN_BASE_URL` for celebration.gif
- Needs fallback logic for undefined env var
- GIF file exists at `public/assets/celebration.gif` ✅

**`components/widgets/onboarding-widget/onboarding-widget.tsx`**
- Line ~563: Uses `NEXT_PUBLIC_CDN_BASE_URL` for celebration.gif
- Uses `NEXT_PUBLIC_CDN_BASE_URL` for preview.gif
- Needs fallback logic for undefined env var
- Both GIF files exist in `public/assets/` ✅

**`.env.local.example`**
- Currently has commented examples
- Update with clear guidance on local development configuration

### New Files

**`public/assets/svgs/poweredbyfooter.svg`**
- Required SVG file for "Powered by GistAnswers" logo
- Currently missing from repository
- Needs to be created or obtained from design team

## Step by Step Tasks

### Step 1: Create .env.local for Local Development
- Create `.env.local` file in project root
- Add `NEXT_PUBLIC_CDN_BASE_URL=""` for local development (empty string resolves to relative paths)
- Add comment explaining the configuration:
  ```bash
  # CDN Base URL for assets
  # Local development: Use empty string for relative paths from /public
  # Production: Set to your CDN URL (e.g., https://cdn.yourdomain.com)
  NEXT_PUBLIC_CDN_BASE_URL=""
  ```

### Step 2: Create Missing SVG Directory and Placeholder
- Create directory: `public/assets/svgs/`
- Create placeholder SVG file: `public/assets/svgs/poweredbyfooter.svg`
- Add temporary "Powered by GistAnswers" SVG content (simple text-based SVG)
- Note: Replace with actual design asset when available

### Step 3: Add Fallback Logic to Components
- Update `components/ui/powered-by-button.tsx`:
  - Add fallback: `const cdnUrl = process.env.NEXT_PUBLIC_CDN_BASE_URL || ''`
  - Use `cdnUrl` in template literal instead of direct env var
- Update `components/ai-elements/success-phase.tsx`:
  - Add same fallback pattern
  - Use `cdnUrl` in src attribute
- Update `components/widgets/onboarding-widget/onboarding-widget.tsx`:
  - Add same fallback pattern at top of component
  - Use `cdnUrl` variable for both celebration.gif and preview.gif

### Step 4: Update .env.local.example
- Update `.env.local.example` with clearer guidance
- Uncomment example and add better documentation
- Explain difference between local (empty string) and production (CDN URL) configurations

### Step 5: Verify Asset Paths
- Confirm `public/assets/celebration.gif` exists ✅
- Confirm `public/assets/preview.gif` exists ✅
- Confirm `public/assets/svgs/poweredbyfooter.svg` created ✅ (after Step 2)
- All paths should be relative to `public/` directory

### Step 6: Test Image Loading
- Restart development server to load new environment variables
- Navigate to http://localhost:3000/onboarding
- Verify "Powered by GistAnswers" SVG loads at bottom of widget
- Progress through phases and verify preview.gif loads
- Complete onboarding and verify celebration.gif loads as background
- Check browser DevTools Network tab - all image requests should return 200 OK

### Step 7: Run Validation Commands
- Execute all validation commands to ensure fix works with zero regressions
- Verify all images load successfully across all phases

## Validation Commands
Execute every command to validate the bug is fixed with zero regressions.

- `cat .env.local` - Verify environment file exists with correct NEXT_PUBLIC_CDN_BASE_URL value
- `ls -la public/assets/` - Verify celebration.gif and preview.gif exist
- `ls -la public/assets/svgs/` - Verify poweredbyfooter.svg exists
- `bun run dev` - Start development server with new environment variables
- Navigate to http://localhost:3000/onboarding and verify:
  - Phase 0: "Powered by GistAnswers" SVG loads at bottom (no broken image icon)
  - Phase 10+: Widget preview GIF loads in content area (no broken placeholder)
  - Phase 12: Celebration GIF loads as background (no alt text visible)
  - Open DevTools Network tab: All asset requests return 200 OK
  - Check URLs in Network tab: Should be `/assets/...` not `undefined/assets/...`
- `bun run build` - Verify production build succeeds without errors
- `bun run lint` - Verify no linting errors introduced

## Notes

### Next.js Environment Variables
Next.js requires `NEXT_PUBLIC_` prefix for environment variables that need to be exposed to the browser. These variables are:
- Embedded at build time
- Available in both client and server components
- Must be defined before `next build` for production
- Loaded from `.env.local` (gitignored), `.env.development`, or `.env.production`

**Best Practice**: Use `.env.local` for local development secrets and environment-specific values. Never commit `.env.local` to version control.

### Asset Hosting Strategy

**Local Development** (recommended):
```bash
NEXT_PUBLIC_CDN_BASE_URL=""
```
- Empty string resolves to relative paths
- Assets served from `public/` directory via Next.js
- Fast, no network requests, no CORS issues

**Production with CDN**:
```bash
NEXT_PUBLIC_CDN_BASE_URL="https://cdn.yourdomain.com"
```
- Assets served from CDN
- Faster global distribution
- Reduced Next.js server load
- Requires assets to be uploaded to CDN

### Missing poweredbyfooter.svg
The `poweredbyfooter.svg` file doesn't exist in the repository. Two options:

**Option A - Create Placeholder** (recommended for immediate fix):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 14">
  <text x="0" y="12" font-family="Arial" font-size="12" fill="#666">
    Powered by GistAnswers
  </text>
</svg>
```

**Option B - Obtain From Design Team**:
- Request official "Powered by GistAnswers" logo from design team
- Ensure SVG is optimized (minified, no unnecessary metadata)
- Place in `public/assets/svgs/poweredbyfooter.svg`

### Environment Variable Naming
The variable name `NEXT_PUBLIC_CDN_BASE_URL` suggests a CDN-first approach, but for local development, an empty string works perfectly. Consider adding a comment in `.env.local` explaining this dual usage.

### Restart Required
After creating or modifying `.env.local`, the Next.js development server must be restarted to pick up the new environment variables. The `bun run dev` command will automatically load values from `.env.local`.

### Alternative: Nullish Coalescing
Instead of `|| ''`, could use `?? ''` for more precise undefined/null handling, but `||` is simpler and handles both `undefined` and empty string cases.

### Production Deployment
For production deployment (Vercel, Netlify, etc.), set `NEXT_PUBLIC_CDN_BASE_URL` in the deployment platform's environment variable settings. Don't rely on `.env.local` in production - that file is gitignored and won't be deployed.
