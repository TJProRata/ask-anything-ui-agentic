# Feature: Gist Creation Onboarding Flow with API Integration

## Feature Description
Implement a streamlined 10-step onboarding flow that collects user input for creating shareable mini-sites (gists), integrates with the `/api/create-preview` endpoint to generate mock content, and redirects users to a preview page. This feature transforms the existing generic `OnboardingWidget` into a specialized gist creation workflow by using a **variant/mode pattern** via props, avoiding code duplication while maintaining flexibility.

The onboarding flow guides users through defining their gist's purpose, identity, goals, audience, aesthetic, and source material. Upon completion (after Step 6), it POSTs data to the API which generates a mock hero section and 3-5 content tiles, saves to Convex, and returns a preview URL for immediate editing.

**Key Value Proposition**:
- **Golden Path UX**: 10 focused questions with 3-tap choices per step
- **Progressive Disclosure**: Only ask what's needed when it's needed
- **Instant Gratification**: Preview URL generated within seconds of completion
- **Smart Defaults**: Auto-configure sections based on gist type (Person → Bio, Highlights, FAQ)

## User Story
As a **content creator or small business owner**
I want to **answer 10 simple questions about my purpose, audience, and content**
So that **I can get a shareable mini-site with a custom URL and editable preview in under 2 minutes**

## Problem Statement
Currently, the `OnboardingWidget` at `/onboarding` is a generic 18-phase demo that showcases various UI patterns but doesn't collect structured data or integrate with backend services. We need:

1. **Data Collection**: Structured input gathering for gist creation (type, title, slug, goal, audience, vibe, source URL, hero preferences, CTA style)
2. **API Integration**: Submit collected data to `/api/create-preview` after Step 6
3. **Preview Generation**: Trigger mock content creation (hero + tiles) and database save
4. **User Redirection**: Navigate to `/preview/[slug]` with newly created gist
5. **Reusable Architecture**: Avoid duplicating the widget - use variant/mode patterns

**Current Gaps**:
- No data capture or state management for gist-specific inputs
- No API submission logic
- No variant pattern to support different use cases (demo vs. gist creation)
- `/api/create-preview` returns 501 stub

## Solution Statement
Transform the onboarding experience into a dual-mode widget system:

**Architecture Approach: Variant Pattern via Props**
- **Base Component**: `OnboardingWidget` remains the foundation
- **Variant Prop**: `variant?: "demo" | "gist-creation"` controls behavior and content
- **Phase Configuration**: Each variant has its own phase definitions (microcopy, options, handlers)
- **Conditional Rendering**: Phases render different content based on variant
- **State Management**: `gist-creation` variant maintains form state and submission logic
- **API Integration**: Only `gist-creation` variant calls `/api/create-preview`

**Implementation Pattern**:
```tsx
<OnboardingWidget
  variant="gist-creation"  // Activates gist creation mode
  onComplete={(data) => handleGistCreation(data)}  // Submission callback
/>
```

**10-Step Gist Creation Flow**:
1. **Type Selection**: Person / Product / Place (sets default sections)
2. **Identity**: Name/title + slug generation (URL preview)
3. **Goal**: Book a call / Buy now / Join waitlist (configures CTA)
4. **Audience**: Prospects / Fans / Investors (tunes tone)
5. **Vibe**: Friendly / Professional / Bold (sets typography/colors)
6. **Source**: Paste URL / Connect socials / Upload files → **API Call Point**
7. **Hero Style**: Image / Video / Gradient (media preference)
8. **CTA Placement**: "Ask me anything" / "Book now" / "Get access" (floating CTA config)
9. **Preview Choice**: Preview now / Tighten headline / Change colors
10. **Publish Decision**: Get private link / Publish public / Finish later

**API Integration Flow** (Step 6 → 7 transition):
1. User completes Step 6 (source URL entry)
2. Widget POSTs to `/api/create-preview` with:
   ```json
   {
     "type": "product",
     "title": "My Cool Product",
     "slug": "my-cool-product",
     "goal": "buy",
     "audience": "prospects",
     "vibe": "professional",
     "source_url": "https://example.com",
     "userId": "temp-anonymous-user"
   }
   ```
3. API endpoint:
   - Calls `scrapeUrl()` to get metadata (mock for now)
   - Calls `generateGistContent()` to create hero + tiles (template-based)
   - Calls Convex `createGist` mutation to save
   - Returns: `{ success: true, previewUrl: "/preview/my-cool-product", slug: "my-cool-product" }`
4. Widget navigates to preview URL or continues to Steps 7-10 for customization

**Tech Stack Compliance**:
- **Bun**: All package operations
- **Next.js 15.4.5**: App Router, API routes, client components
- **React 19.1.0**: Client-side state management with `useState`, `useReducer`
- **TypeScript**: Strict mode with proper interfaces for gist data
- **Tailwind CSS v4**: Consistent styling with existing widget patterns
- **shadcn/ui**: Reuse Button, Separator, Carousel components
- **Convex**: Real-time database integration (already configured)

**New Dependencies**: None - all infrastructure already in place.

## Relevant Files

### Existing Files to Modify

**`components/widgets/onboarding-widget/onboarding-widget.tsx`** (1,088 lines)
- Add `variant` prop with "demo" | "gist-creation" union type
- Add `onComplete` callback prop for gist data submission
- Implement `useReducer` for gist form state management
- Add conditional phase rendering based on variant
- Integrate API submission logic in Step 6 completion handler
- Maintain backward compatibility with existing demo mode

**`components/widgets/onboarding-widget/types.ts`** (33 lines)
- Add `GistCreationData` interface for collected inputs
- Add `OnboardingVariant` type: "demo" | "gist-creation"
- Add `GistFormState` interface for reducer state
- Add `GistFormAction` type for reducer actions
- Extend `OnboardingWidgetProps` with variant and callbacks

**`app/api/create-preview/route.ts`** (42 lines)
- Implement full POST handler logic
- Add request body validation with Zod schema
- Integrate scraper and generator functions
- Call Convex `createGist` mutation
- Return preview URL and metadata
- Add comprehensive error handling

**`app/gistplatform/page.tsx`** (80 lines)
- Update to use `variant="gist-creation"` prop
- Implement `onComplete` handler for API submission
- Add loading/error states for submission process
- Add success redirection to preview URL
- Keep existing page header and layout

**`lib/generator.ts`** (127 lines)
- Enhance mock content generation with user inputs
- Implement template-based hero generation: "Your [TYPE] for [AUDIENCE]!"
- Create dynamic tile generation based on gist type:
  - Person → Bio, Highlights, FAQ
  - Product → Features, Pricing, Reviews
  - Place → About, Visit, Gallery
- Add audience tone adaptation (Prospects = formal, Fans = casual, Investors = professional)

### New Files

**`lib/gist-templates.ts`** - Template generation utilities
- `generateHeroHeadline(type, title, audience)` - Dynamic headline templates
- `generateHeroSubhead(goal, vibe)` - Subhead based on goal + vibe
- `generateTilesForType(type)` - Type-specific tile configurations
- `applyVibeStyling(vibe)` - Typography and color seed presets

**`app/api/create-preview/validation.ts`** - Request validation schemas
- Zod schema for create-preview POST body
- Type guards for gist creation data
- Validation error formatters

**`hooks/use-gist-form.ts`** - Gist form state management hook
- `useReducer` implementation for form state
- Action creators for updating form fields
- Validation helpers for required fields
- Computed properties (e.g., auto-slug from title)

## Implementation Plan
**IMPORTANT**: All implementation must strictly follow the Tech Stack Requirements (Bun, Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui).

### Phase 1: Foundation (Type Definitions & State Management)
**Goal**: Establish TypeScript interfaces, validation schemas, and state management patterns.

1. Create Zod validation schemas for API request/response
2. Define TypeScript interfaces for gist creation flow
3. Implement `use-gist-form` hook with useReducer pattern
4. Create template generation utilities in `gist-templates.ts`
5. Add unit tests for state management and validation

### Phase 2: Core Implementation (Widget Variant & API Integration)
**Goal**: Implement variant pattern in widget and complete API endpoint.

1. Add variant prop system to `OnboardingWidget`
2. Implement gist-creation phase configurations (10 steps)
3. Integrate form state management with widget phases
4. Implement `/api/create-preview` POST handler with full workflow
5. Enhance generator with template-based content creation
6. Add API integration tests

### Phase 3: Integration (Page Updates & User Flow)
**Goal**: Wire up Gist Builder page and end-to-end user journey.

1. Update `/gistplatform` page with gist-creation variant
2. Implement submission handlers and redirect logic
3. Add loading/error states to UI
4. Implement Step 6 → API call transition
5. Add Steps 7-10 for post-API customization
6. Create end-to-end integration tests

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create API Validation Schema
- Create `app/api/create-preview/validation.ts` file
- Define Zod schema for create-preview request body:
  - Required: type, title, slug, goal, audience, vibe, source_url, userId
  - Optional: hero preferences, tile preferences
- Add validation error formatter function
- Export validated request type for use in route handler
- Write unit tests for validation schema edge cases

### 2. Define Gist Creation TypeScript Interfaces
- Update `components/widgets/onboarding-widget/types.ts`
- Add `GistCreationData` interface with all 10 steps' fields
- Add `OnboardingVariant` type: "demo" | "gist-creation"
- Add `GistFormState` interface for reducer state
- Add `GistFormAction` discriminated union for reducer actions
- Extend `OnboardingWidgetProps` with:
  - `variant?: OnboardingVariant` (defaults to "demo")
  - `onComplete?: (data: GistCreationData) => void`
  - `onStepChange?: (step: number) => void`
- Export all new types

### 3. Create Template Generation Utilities
- Create `lib/gist-templates.ts` file
- Implement `generateHeroHeadline()`:
  - Person: "[Title] - [Audience] Expert"
  - Product: "Introducing [Title] for [Audience]"
  - Place: "Visit [Title] - Perfect for [Audience]"
- Implement `generateHeroSubhead()`:
  - Book goal: "Schedule time with me"
  - Buy goal: "Get yours today"
  - Waitlist goal: "Join the exclusive list"
- Implement `generateTilesForType()`:
  - Person: Bio, Highlights, Contact, FAQ
  - Product: Features, Benefits, Pricing, Reviews, FAQ
  - Place: About, Visit Info, Gallery, Reviews, FAQ
- Implement `applyVibeStyling()`:
  - Friendly: warm colors, casual typography
  - Professional: cool colors, formal typography
  - Bold: vibrant colors, strong typography
- Add JSDoc comments and TypeScript types for all functions
- Write unit tests for template generation

### 4. Create Gist Form State Hook
- Create `hooks/use-gist-form.ts` file
- Define `GistFormState` initial state with all 10 fields
- Implement reducer function with actions:
  - `SET_TYPE`, `SET_TITLE`, `SET_SLUG`, `SET_GOAL`, `SET_AUDIENCE`
  - `SET_VIBE`, `SET_SOURCE_URL`, `SET_HERO_STYLE`, `SET_CTA_PLACEMENT`
  - `SET_PREVIEW_CHOICE`, `RESET_FORM`
- Implement `useGistForm()` custom hook:
  - Returns `[state, dispatch, { isValid, errors, canSubmit }]`
  - Auto-generate slug from title when title changes
  - Validate required fields (type, title, slug, goal, audience, vibe, source_url)
- Add TypeScript types and JSDoc comments
- Write unit tests for reducer logic

### 5. Enhance Content Generator with Templates
- Update `lib/generator.ts`
- Import template utilities from `gist-templates.ts`
- Modify `generateGistContent()` to accept full user inputs:
  - Add parameters: `title, type, goal, audience, vibe`
  - Use `generateHeroHeadline()` for hero.headline
  - Use `generateHeroSubhead()` for hero.subhead
  - Use `generateTilesForType()` for tiles array
  - Apply vibe styling to hero.style
- Update mock data to reflect user inputs instead of generic placeholders
- Add detailed logging for generation steps
- Update existing unit tests to match new signature

### 6. Implement Widget Variant Prop System
- Update `components/widgets/onboarding-widget/onboarding-widget.tsx`
- Add `variant` and `onComplete` props to component signature:
  ```tsx
  interface OnboardingWidgetProps {
    isExpanded: boolean;
    onExpandChange: (expanded: boolean) => void;
    variant?: "demo" | "gist-creation";
    onComplete?: (data: GistCreationData) => void;
    onStepChange?: (step: number) => void;
  }
  ```
- Set default variant to "demo" for backward compatibility
- Import `useGistForm` hook (only used in gist-creation mode)
- Add conditional initialization:
  ```tsx
  const [formState, dispatch] = variant === "gist-creation"
    ? useGistForm()
    : [null, null];
  ```

### 7. Create Gist Creation Phase Configurations
- In `onboarding-widget.tsx`, create separate phase configs:
  - Keep existing `phases` array as `demoPhasesConfig`
  - Create new `gistCreationPhasesConfig` array (10 phases)
- Define Phase 1 (Type Selection):
  - heading: "What's this gist about?"
  - suggestions: ["A person", "A product", "A place"]
  - onSelect: dispatch SET_TYPE action
- Define Phase 2 (Identity):
  - heading: "Give it a name."
  - suggestions: ["Use my Google name", "Paste website", "Type it"]
  - Input field for title, auto-generate slug
  - onSubmit: dispatch SET_TITLE, SET_SLUG actions
- Define Phase 3 (Goal):
  - heading: "What's the main goal?"
  - suggestions: ["Book a call", "Buy now", "Join waitlist"]
  - onSelect: dispatch SET_GOAL action
- Define Phase 4 (Audience):
  - heading: "Who's it for?"
  - suggestions: ["Prospects", "Fans", "Investors"]
  - onSelect: dispatch SET_AUDIENCE action
- Define Phase 5 (Vibe):
  - heading: "Pick a vibe."
  - suggestions: ["Friendly", "Professional", "Bold"]
  - onSelect: dispatch SET_VIBE action
- Define Phase 6 (Source URL):
  - heading: "Add one source?"
  - suggestions: ["Paste a link", "Connect socials", "Upload files"]
  - Input field for URL
  - onSubmit: dispatch SET_SOURCE_URL + trigger API call
- Define Phases 7-10 (Hero Style, CTA, Preview, Publish)
  - Similar structure with appropriate copy and handlers
- Use conditional rendering: `const activePhases = variant === "gist-creation" ? gistCreationPhasesConfig : demoPhasesConfig`

### 8. Integrate Form State with Widget Phases
- Update suggestion click handlers to dispatch form actions:
  ```tsx
  const handleSuggestionClick = (suggestion: string, phaseIndex: number) => {
    if (variant === "gist-creation") {
      // Dispatch appropriate action based on phase
      switch(phaseIndex) {
        case 0: dispatch({ type: "SET_TYPE", payload: suggestion }); break;
        case 2: dispatch({ type: "SET_GOAL", payload: suggestion }); break;
        // ... etc
      }
    }
    // Move to next phase
    setCurrentPhase(prev => prev + 1);
  };
  ```
- Add input field components for text entry phases (title, slug, source URL)
- Display validation errors inline when fields are invalid
- Disable "Next" button when required fields are missing
- Show loading state during API submission

### 9. Implement API Submission in Step 6
- In `onboarding-widget.tsx`, add `handleApiSubmission` function:
  ```tsx
  const handleApiSubmission = async () => {
    if (variant !== "gist-creation" || !formState) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/create-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });

      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();
      onComplete?.(data);

      // Optionally continue to Steps 7-10 or redirect immediately
      setCurrentPhase(7);
    } catch (error) {
      log.error("Failed to create preview", error);
      setError("Failed to create preview. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  ```
- Call `handleApiSubmission()` when user completes Step 6
- Show validation transition animation during API call
- Handle success/error states

### 10. Implement Create Preview API Endpoint
- Update `app/api/create-preview/route.ts`
- Import validation schema, scraper, generator, Convex client
- Implement POST handler:
  ```tsx
  export async function POST(request: NextRequest) {
    log.api("POST /api/create-preview received");

    try {
      // 1. Parse and validate request body
      const body = await request.json();
      const validated = createPreviewSchema.parse(body);

      // 2. Scrape URL metadata
      const scrapedData = await scrapeUrl(validated.source_url);

      // 3. Generate content
      const content = generateGistContent(
        scrapedData,
        validated.type,
        validated.goal,
        validated.title,
        validated.audience,
        validated.vibe
      );

      // 4. Save to Convex
      const gistId = await convex.mutation(api.gists.createGist, {
        slug: validated.slug,
        type: validated.type,
        title: validated.title,
        goal: validated.goal,
        audience: validated.audience,
        vibe: validated.vibe,
        source_url: validated.source_url,
        userId: validated.userId,
        hero: content.hero,
        tiles: content.tiles,
        scraped_data: scrapedData
      });

      // 5. Return preview URL
      return NextResponse.json({
        success: true,
        previewUrl: `/preview/${validated.slug}`,
        slug: validated.slug,
        gistId
      });
    } catch (error) {
      log.error("Error in /api/create-preview", error);
      return NextResponse.json({ error: "Failed to create preview" }, { status: 500 });
    }
  }
  ```
- Add request body validation with try/catch
- Add comprehensive error handling and logging
- Return proper HTTP status codes

### 11. Update Gist Builder Page
- Update `app/gistplatform/page.tsx`
- Change widget to use gist-creation variant:
  ```tsx
  <OnboardingWidget
    variant="gist-creation"
    isExpanded={isExpanded}
    onExpandChange={setIsExpanded}
    onComplete={handleGistCreated}
  />
  ```
- Implement `handleGistCreated` callback:
  ```tsx
  const handleGistCreated = (data: { previewUrl: string }) => {
    // Option 1: Immediate redirect
    router.push(data.previewUrl);

    // Option 2: Show success message then redirect
    setShowSuccess(true);
    setTimeout(() => router.push(data.previewUrl), 2000);
  };
  ```
- Add loading state while API processes
- Add error handling UI
- Keep existing page header and features grid

### 12. Add Loading and Error States
- In `onboarding-widget.tsx`, add state variables:
  ```tsx
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  ```
- Show loading spinner during API call (reuse existing validation transition UI)
- Display error message if API call fails
- Add retry button in error state
- Ensure error messages are user-friendly

### 13. Implement Steps 7-10 for Post-API Customization
- Add phases for hero style selection (Phase 7)
- Add phases for CTA placement (Phase 8)
- Add preview choice phase (Phase 9):
  - "Preview now" → Navigate to `/preview/[slug]`
  - "Tighten headline" → Show inline editor
  - "Change colors" → Show color picker
- Add publish decision phase (Phase 10):
  - "Get private link" → Copy preview URL
  - "Publish public" → Update Convex status to "public"
  - "Finish later" → Save and redirect to dashboard

### 14. Write Unit Tests for Form State Hook
- Create `tests/hooks/use-gist-form.test.ts`
- Test initial state has correct defaults
- Test each reducer action updates state correctly
- Test slug auto-generation from title
- Test validation logic (isValid, errors)
- Test canSubmit computed property
- Use Bun test runner with React Testing Library

### 15. Write Unit Tests for Template Generator
- Create `tests/lib/gist-templates.test.ts`
- Test `generateHeroHeadline` for each type
- Test `generateHeroSubhead` for each goal
- Test `generateTilesForType` returns correct tile count and types
- Test `applyVibeStyling` returns expected style objects
- Verify template strings interpolate user inputs correctly

### 16. Write API Route Tests
- Create `tests/api/create-preview.test.ts`
- Test successful gist creation flow
- Test validation errors for missing required fields
- Test invalid URL format handling
- Test duplicate slug error handling
- Test Convex mutation integration
- Mock scraper and generator functions

### 17. Write Integration Tests for Widget Variant
- Create `tests/components/onboarding-widget-gist.test.ts`
- Test variant prop switches phase configs
- Test form state updates on user interactions
- Test API submission triggered at Step 6
- Test loading/error states render correctly
- Test onComplete callback receives correct data
- Use happy-dom and Testing Library

### 18. Add End-to-End Flow Test
- Create `tests/e2e/gist-creation-flow.test.ts`
- Test complete user journey from `/gistplatform` to `/preview/[slug]`
- Mock API responses for predictable testing
- Verify each phase transition works
- Verify data persists across phases
- Verify final redirect to preview page
- Use Bun test runner

### 19. Update Documentation
- Update `docs/widgets/onboarding-widget/OVERVIEW.md`
- Document variant prop usage
- Add gist-creation flow diagram
- Document API integration points
- Add code examples for both variants
- Document form state management approach

### 20. Run All Validation Commands
- Execute every validation command listed below
- Fix any errors or warnings
- Verify zero regressions
- Document any issues encountered

## Testing Strategy

### Unit Tests
**Framework**: Bun's built-in test runner with happy-dom and Testing Library

- **`use-gist-form` Hook** (`tests/hooks/use-gist-form.test.ts`):
  - Test reducer state transitions for all 10 form actions
  - Test slug auto-generation from title input
  - Test validation logic for required fields
  - Test computed properties (isValid, canSubmit)
  - Test initial state defaults

- **Template Generator** (`tests/lib/gist-templates.test.ts`):
  - Test headline generation for each type (person, product, place)
  - Test subhead generation for each goal (book, buy, waitlist)
  - Test tile generation for each type
  - Test vibe styling application
  - Test template interpolation with edge case inputs (empty, special chars)

- **Content Generator** (`tests/lib/generator.test.ts`):
  - Test integration with template utilities
  - Test output structure matches TypeScript interfaces
  - Test mock data reflects user inputs correctly

- **Validation Schema** (`tests/api/create-preview/validation.test.ts`):
  - Test successful validation with complete data
  - Test validation failures for missing required fields
  - Test validation failures for invalid data types
  - Test error message formatting

### Integration Tests
- **API Route** (`tests/api/create-preview.test.ts`):
  - Test successful POST request with valid data
  - Test 400 response for invalid request body
  - Test 500 response for Convex mutation failures
  - Test response includes correct previewUrl
  - Mock scraper, generator, and Convex client

- **Widget Variant Integration** (`tests/components/onboarding-widget-gist.test.ts`):
  - Test variant prop switches between demo and gist-creation modes
  - Test form state updates when user interacts with phases
  - Test API call triggered at Step 6 completion
  - Test onComplete callback invoked with correct data
  - Test loading/error states render appropriately

- **Gist Builder Page** (`tests/app/gistplatform.test.ts`):
  - Test page renders with gist-creation variant widget
  - Test redirect to preview URL after successful submission
  - Test error message display on API failure
  - Mock router and API fetch

### Edge Cases
- **Empty or Invalid Inputs**:
  - Test empty title generates fallback slug
  - Test invalid URL format shows validation error
  - Test special characters in title are sanitized in slug

- **Duplicate Slugs**:
  - Test Convex mutation throws error for duplicate slug
  - Test API returns 409 Conflict status
  - Test user sees "slug already taken" message

- **Network Failures**:
  - Test API timeout handling (mock slow response)
  - Test offline mode behavior
  - Test retry mechanism works correctly

- **Race Conditions**:
  - Test rapid phase transitions don't break state
  - Test double-click on submit button doesn't create duplicate gists

- **Large Inputs**:
  - Test long titles (>100 chars) are truncated
  - Test long URLs (>500 chars) are validated
  - Test scraped data with missing fields doesn't crash generator

## Acceptance Criteria
All criteria must be met for feature to be considered complete:

- [ ] Widget supports both "demo" and "gist-creation" variants without code duplication
- [ ] Gist creation flow has 10 distinct phases with correct microcopy
- [ ] Each phase presents 3 tap choices matching specification
- [ ] Form state updates correctly for all user interactions
- [ ] Slug auto-generates from title with proper sanitization
- [ ] API submission triggers at Step 6 completion
- [ ] `/api/create-preview` validates request body and returns 400 for invalid data
- [ ] API calls scraper and generator with user inputs
- [ ] API saves gist to Convex with status "preview"
- [ ] API returns preview URL in response: `/preview/[slug]`
- [ ] Loading state shows during API call (validation transition animation)
- [ ] Error state shows user-friendly message on failure
- [ ] Success redirects to preview page
- [ ] Template generator creates dynamic content based on type/goal/audience/vibe
- [ ] Hero headline reflects user's title and type
- [ ] Hero subhead reflects goal and vibe
- [ ] Tiles array has 3-5 items based on gist type
- [ ] All unit tests pass with >80% coverage
- [ ] All integration tests pass
- [ ] No TypeScript errors (`bunx tsc --noEmit`)
- [ ] ESLint passes (`bun run lint`)
- [ ] Next.js builds successfully (`bun run build`)
- [ ] Demo variant still works (backward compatibility confirmed)

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

```bash
# 1. Install dependencies (if any new)
bun install
# → Should complete without errors

# 2. TypeScript type checking
bunx tsc --noEmit
# → Should show 0 errors

# 3. Run linting
bun run lint
# → Should pass with no errors

# 4. Run all unit tests
bun test tests/hooks/use-gist-form.test.ts
bun test tests/lib/gist-templates.test.ts
bun test tests/lib/generator.test.ts
bun test tests/api/create-preview/validation.test.ts
# → All tests should pass

# 5. Run integration tests
bun test tests/api/create-preview.test.ts
bun test tests/components/onboarding-widget-gist.test.ts
bun test tests/app/gistplatform.test.ts
# → All tests should pass

# 6. Run all tests together
bun test
# → All tests should pass with coverage report

# 7. Start Convex dev server (separate terminal)
bunx convex dev
# → Should connect to Convex deployment

# 8. Start Next.js dev server
bun run dev
# → Should start on http://localhost:3000
# → Terminal should show [INIT] and [API] logs

# 9. Test demo variant (backward compatibility)
open http://localhost:3000/onboarding
# → Should render existing 18-phase demo
# → Should not show gist creation UI
# → Should not call API

# 10. Test gist creation variant
open http://localhost:3000/gistplatform
# → Should render 10-phase gist creation flow
# → Should show Phase 1: "What's this gist about?"

# 11. Test Phase 1 (Type Selection)
# → Click "A product"
# → Should advance to Phase 2

# 12. Test Phase 2 (Identity)
# → Click "Type it"
# → Enter "My Cool Product" in title field
# → Should auto-generate slug "my-cool-product"
# → Should show URL preview: gist.link/my-cool-product

# 13. Test Phase 3-5 (Goal, Audience, Vibe)
# → Select "Buy now"
# → Select "Prospects"
# → Select "Professional"
# → Should advance through phases

# 14. Test Phase 6 (Source URL + API Call)
# → Click "Paste a link"
# → Enter "https://example.com"
# → Submit
# → Should show validation transition animation (spinner → checkmark)
# → Terminal should show [API] POST /api/create-preview received
# → Terminal should show [SCRAPE] and [GEN] logs
# → Terminal should show [CONVEX] mutation logs
# → Should advance to Phase 7 OR redirect to preview

# 15. Test API response in browser DevTools
# → Open Network tab
# → Complete Step 6
# → Verify POST to /api/create-preview
# → Verify response: { success: true, previewUrl: "/preview/my-cool-product", ... }

# 16. Test error handling
# → Modify API to throw error (temporarily)
# → Complete Step 6
# → Should show error message: "Failed to create preview. Please try again."
# → Should show retry button

# 17. Test validation
# → Leave title field empty in Phase 2
# → Try to advance
# → Should show validation error
# → Should disable "Next" button

# 18. Test Convex data
open https://dashboard.convex.dev
# → Navigate to gists table
# → Should see new gist entry
# → Verify slug: "my-cool-product"
# → Verify status: "preview"
# → Verify hero.headline: "Introducing My Cool Product for Prospects"
# → Verify tiles array has 5 items (product type default)

# 19. Test preview redirect (Steps 7-10 implementation)
# → Complete Phase 6
# → Should navigate to /preview/my-cool-product
# → (Note: Preview page rendering is Feature 2, will show stub for now)

# 20. Build application
bun run build
# → Should complete successfully
# → No TypeScript errors
# → No build warnings

# 21. Test production build
bun run start
# → Should start production server
# → Visit http://localhost:3000/gistplatform
# → Complete flow to verify production build works
```

## Notes

### Implementation Philosophy: Variant Pattern Over Duplication
We're using a **variant prop pattern** instead of creating a separate `GistCreationWidget` component because:
1. **DRY Principle**: Avoid duplicating 1000+ lines of UI logic
2. **Maintainability**: Bug fixes and UI improvements apply to both modes
3. **Flexibility**: Easy to add more variants later (e.g., "survey", "feedback")
4. **Code Organization**: Single source of truth for widget behavior

**Pattern Structure**:
```tsx
// Phase configuration varies by variant
const phaseConfig = variant === "gist-creation"
  ? gistCreationPhases
  : demoPhases;

// State management varies by variant
const formState = variant === "gist-creation"
  ? useGistForm()
  : null;

// Callbacks vary by variant
const handleComplete = () => {
  if (variant === "gist-creation") {
    onComplete?.(formState);
  } else {
    // Demo mode does nothing
  }
};
```

### Mock vs. Real Content Generation
**Current Feature (Feature 1)**: Template-based mock generation
- Hero headline: "Introducing [Title] for [Audience]"
- Hero subhead: Goal-based static text
- Tiles: Type-specific placeholders (5 for product, 4 for person, etc.)

**Future Features (4-5)**: AI-powered generation
- Use Anthropic API or similar to generate custom copy
- Scrape actual content from source URL with Cheerio/Puppeteer
- Generate personalized tiles based on scraped content
- Apply brand voice and tone from vibe selection

**Why Mock First?**:
1. Proves data flow works end-to-end without AI dependencies
2. Faster iteration and testing (no API rate limits)
3. Predictable output for E2E tests
4. Lower cost during development

### Steps 7-10 Implementation Strategy
**This Feature (Feature 1)**: Minimal implementation
- Phase 7-8: Show UI but don't persist preferences (future feature)
- Phase 9: "Preview now" redirects immediately, other options TBD
- Phase 10: Only "Get private link" works, publish/finish later TBD

**Future Features**: Full customization
- Phase 7: Actually update hero media_url in Convex
- Phase 8: Configure floating CTA behavior
- Phase 9: Inline headline editor, color picker integration
- Phase 10: Publish workflow (status change to "public"), dashboard integration

### Slug Collision Handling
**Current**: Convex mutation throws error if slug exists
**Future Enhancement**: Auto-append number suffix (my-product-2, my-product-3)
```tsx
const generateUniqueSlug = async (baseSlug: string): Promise<string> => {
  let slug = baseSlug;
  let counter = 2;

  while (await slugExists(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};
```

### User Authentication (Future)
**Current**: Use temporary userId: "temp-anonymous-user"
**Future**: Integrate with Convex Auth or Clerk
- Replace userId with authenticated user ID
- Associate gists with user accounts
- Enable "My Gists" dashboard

### Performance Considerations
- **API Call Timing**: Step 6 completion triggers API call - keep it fast (<2s)
- **Scraper Performance**: Mock scraper is instant, real scraper may take 3-5s
- **UX During Wait**: Use validation transition animation to show progress
- **Optimistic Updates**: Consider showing preview immediately with "Generating..." placeholders

### Accessibility (Future Enhancement)
- Add ARIA labels to all phase navigation buttons
- Ensure keyboard navigation works (Tab, Enter)
- Add screen reader announcements for phase transitions
- Test with VoiceOver/NVDA

### Analytics (Future)
Track these events for funnel optimization:
- Phase completion rates (identify drop-off points)
- Average time per phase
- Most common type/goal/audience selections
- Error rates and retry counts
- Successful preview creations

### Migration Path for Existing Demo
The demo variant preserves existing behavior:
- `/onboarding` page uses `variant="demo"` (default)
- No API calls, no data persistence
- Showcases UI patterns and animations
- Can be deprecated later or kept as component showcase
