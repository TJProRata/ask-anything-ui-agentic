# Feature: Onboarding Widget Migration

## Feature Description
Migrate the complete OnboardingWidget component system from the `onboardingwidget_october16` project to the `ask-anything-ui` codebase. This widget provides a multi-phase interactive onboarding experience with AI-powered assistance, progress tracking, readiness scoring, and rich UI elements including carousels, animations, and voice testing capabilities.

The migration must adapt the Vite-based source widget to work seamlessly within the existing Next.js 15 architecture while maintaining all functionality and visual design. All components will be integrated into the existing component structure following the project's conventions for embeddable widgets with Shadow DOM isolation.

## User Story
As a developer integrating the Ask Anything widget system
I want to migrate the OnboardingWidget from the previous project to the new codebase
So that I can leverage the existing onboarding flow within the updated Next.js architecture and widget deployment pipeline

## Problem Statement
The OnboardingWidget was built in a separate Vite-based project (`onboardingwidget_october16`) with 27+ components including specialized AI elements, animations, and UI primitives. The current `ask-anything-ui` codebase has a different architecture:
- Uses Next.js 15 with App Router (vs Vite)
- Uses React 19 (vs React 18)
- Uses Tailwind CSS v4 (vs v3)
- Has an established widget bundling system with Shadow DOM isolation
- Uses different path resolution and build configuration

The source widget relies on:
- Framer Motion for animations (not currently in ask-anything-ui)
- Vite environment variables (`VITE_CDN_BASE_URL`)
- Custom Tailwind config with extensive CSS variables
- Embla carousel for multi-phase navigation
- 7 custom AI element components
- Custom icons (BlueStar, Wand)
- GIF assets for celebration and preview animations

## Solution Statement
Perform a structured migration that:

1. **Adapts dependencies** - Update framer-motion to latest compatible version, ensure all Radix UI components align with existing versions
2. **Restructures components** - Place components in appropriate directories following ask-anything-ui conventions:
   - `components/widgets/onboarding-widget/` - Main widget and sub-components
   - `components/ai-elements/` - Reusable AI-specific UI elements
   - `components/animations/` - Animation components
   - `components/icons/` - Custom icon components
3. **Updates configuration** - Merge Tailwind config extensions, convert Vite env vars to Next.js env vars
4. **Adapts build system** - Ensure widget can be bundled via existing `build.widget.ts` script
5. **Maintains isolation** - Keep widget self-contained for potential IIFE embedding
6. **Validates functionality** - Test all 15+ onboarding phases, carousel navigation, voice testing, API integration

**Tech Stack Compliance**: This solution uses only approved technologies:
- **Runtime**: Bun (all commands)
- **Framework**: Next.js 15.4.5 (existing, no changes)
- **UI Library**: React 19.1.0 (components will be updated from React 18 patterns)
- **Language**: TypeScript with strict mode (existing)
- **Styling**: Tailwind CSS v4 with Lightning CSS (config will be extended, not replaced)
- **Components**: shadcn/ui based on Radix UI (carousel already exists, other Radix components align)

**New Dependencies Required**:
- `framer-motion@^12.23.24` - Required for complex layout animations in OnboardingWidget phases. This is the library used in source widget and provides essential animation capabilities not available in CSS alone (layout animations, gesture handling, AnimatePresence for exit animations).
- `nanoid@^5.1.6` - Used for generating unique IDs in widget state management (already present in source, minimal footprint)

All other dependencies (embla-carousel-react, lucide-react, Radix UI components) are already present or compatible with existing versions.

## Relevant Files

### Existing Files (Reference & Extension)
- **`README.md`** - Project overview and architecture reference
- **`CLAUDE.md`** - Development guidelines and widget architecture patterns
- **`package.json`** - Dependency management (will add framer-motion, nanoid)
- **`tsconfig.json`** - Path aliases already configured with `@/*` pattern
- **`app/globals.css`** - Global styles (will extend with onboarding-specific CSS variables)
- **`components/ui/button.tsx`** - shadcn button component (reference for consistency)
- **`components/ui/carousel.tsx`** - Existing embla carousel implementation
- **`components/ui/separator.tsx`** - Existing separator component
- **`components/widgets/floating-widget/floating-widget.tsx`** - Reference widget implementation pattern
- **`widgets/types.ts`** - Widget TypeScript interfaces (may extend for onboarding state)
- **`scripts/build.widget.ts`** - Widget bundler (reference for potential onboarding widget bundle)
- **`lib/utils.ts`** - cn() utility function (already exists, identical to source)

### Source Files (To Be Migrated)
From `../onboardingwidget_october16/app/client/src/`:

**Main Widget Component (1 file)**:
- `components/OnboardingWidget.tsx` - 1100+ line main orchestrator with 15 phases

**AI Elements (7 files)**:
- `components/ai-elements/dual-phase-progress.tsx` - Progress indicator with dual phases
- `components/ai-elements/gif-housing.tsx` - GIF container for celebration/preview animations
- `components/ai-elements/glass_widget_container.tsx` - Glass morphism container with header/content/footer
- `components/ai-elements/prompt-input.tsx` - Gradient-bordered input with submit button
- `components/ai-elements/readiness-score-gauge.tsx` - Circular gauge for readiness percentage
- `components/ai-elements/simple-progress-bar.tsx` - Linear progress bar with percentage
- `components/ai-elements/success-phase.tsx` - Success state with confetti animation

**Animations (1 file)**:
- `components/animations/searching-animation.tsx` - Animated searching/loading state

**Icons (2 files)**:
- `components/icons/blue-star.tsx` - Custom SVG star icon
- `components/icons/wand.tsx` - Custom SVG wand icon

**UI Components (8 files)** - Note: Most overlap with existing shadcn components:
- `components/ui/button.tsx` - ✅ Already exists in ask-anything-ui, use existing
- `components/ui/carousel.tsx` - ✅ Already exists, use existing
- `components/ui/separator.tsx` - ✅ Already exists, use existing
- `components/ui/dropdown-menu.tsx` - ✅ Already exists, use existing
- `components/ui/select.tsx` - ✅ Already exists, use existing
- `components/ui/textarea.tsx` - ✅ Already exists, use existing
- `components/ui/phase-navigation.tsx` - ⚠️ Custom component, needs migration
- `components/ui/powered-by-button.tsx` - ⚠️ Custom component, needs migration

**Ask Anything UI (1 file)**:
- `components/ask-anything/ui/pricing-card.tsx` - Pricing display card component

**Other Chat Components (5 files)** - May be redundant with existing ask-anything components:
- `components/ChatButton.tsx` - ⚠️ Evaluate against existing `components/ask-anything/ask-button.tsx`
- `components/ChatHeader.tsx` - ⚠️ May be redundant with glass widget header
- `components/ChatInput.tsx` - ⚠️ Evaluate against existing input components
- `components/ChatMessage.tsx` - ⚠️ Evaluate against existing message components
- `components/ChatWindow.tsx` - ⚠️ Evaluate against existing card components
- `components/LoadingIndicator.tsx` - ⚠️ May be redundant with SearchingAnimation

**Configuration Files**:
- `tailwind.config.ts` - Extensive CSS variable customizations (merge into existing)
- `src/styles.css` - CSS variables and custom properties (merge into globals.css)

**Assets**:
- `public/assets/celebration.gif` - Success animation GIF
- `public/assets/preview.gif` - Preview phase GIF

### New Files

**Primary Widget Structure**:
- `components/widgets/onboarding-widget/onboarding-widget.tsx` - Migrated main component
- `components/widgets/onboarding-widget/types.ts` - OnboardingWidget-specific TypeScript types
- `components/widgets/onboarding-widget/README.md` - Component documentation

**AI Elements** (new directory):
- `components/ai-elements/dual-phase-progress.tsx`
- `components/ai-elements/gif-housing.tsx`
- `components/ai-elements/glass-widget-container.tsx`
- `components/ai-elements/prompt-input.tsx`
- `components/ai-elements/readiness-score-gauge.tsx`
- `components/ai-elements/simple-progress-bar.tsx`
- `components/ai-elements/success-phase.tsx`

**Animations** (new directory):
- `components/animations/searching-animation.tsx`

**Icons** (new directory):
- `components/icons/blue-star.tsx`
- `components/icons/wand.tsx`

**Custom UI Components** (only non-overlapping):
- `components/ui/phase-navigation.tsx`
- `components/ui/powered-by-button.tsx`

**Ask Anything Components**:
- `components/ask-anything/pricing-card.tsx` (move from ui subdirectory)

**Demo/Test Pages**:
- `app/onboarding/page.tsx` - Demo page for OnboardingWidget
- `public/assets/celebration.gif` - Migrated GIF asset
- `public/assets/preview.gif` - Migrated GIF asset

**Environment Configuration**:
- `.env.local.example` - Example environment variables for CDN base URL

**Documentation**:
- `docs/widgets/onboarding-widget/OVERVIEW.md` - Architecture and usage guide
- `docs/widgets/onboarding-widget/PHASES.md` - Detailed phase documentation

## Implementation Plan
**IMPORTANT**: All implementation must strictly follow the Tech Stack Requirements (Bun, Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui).

### Phase 1: Foundation
**Goal**: Prepare the codebase to receive the OnboardingWidget components without conflicts.

1. **Install dependencies** using Bun (NOT npm/yarn/pnpm):
   - Add framer-motion for animations
   - Add nanoid for ID generation (if not present)
   - Verify all Radix UI components align with existing versions

2. **Create directory structure**:
   - `components/widgets/onboarding-widget/`
   - `components/ai-elements/`
   - `components/animations/`
   - `components/icons/` (if not exists)
   - `docs/widgets/onboarding-widget/`

3. **Extend Tailwind configuration**:
   - Merge custom CSS variables from source `tailwind.config.ts`
   - Add custom animations (bounce, slideUp keyframes)
   - Add custom color tokens (brand purple, orange, teal)
   - Add custom font size/weight/lineHeight tokens
   - Preserve existing Tailwind CSS v4 configuration

4. **Update global styles**:
   - Merge source `styles.css` CSS variables into `app/globals.css`
   - Add gradient definitions (gradient-brand, gradient-brand-reverse, gradient-brand-teal)
   - Add widget-specific shadows and border radius tokens
   - Ensure compatibility with existing theme system

5. **Configure environment variables**:
   - Create `.env.local.example` with `NEXT_PUBLIC_CDN_BASE_URL`
   - Document asset CDN configuration
   - Update references from `VITE_CDN_BASE_URL` to `NEXT_PUBLIC_CDN_BASE_URL`

### Phase 2: Core Implementation
**Goal**: Migrate all components from source to target, adapting for Next.js 15 and React 19.

1. **Migrate utility components first** (lowest dependencies):
   - Copy `lib/utils.ts` (already exists, verify match)
   - Migrate custom icons: `blue-star.tsx`, `wand.tsx` to `components/icons/`
   - Update import paths to use `@/` alias

2. **Migrate UI primitives** (non-overlapping only):
   - Copy `phase-navigation.tsx` to `components/ui/`
   - Copy `powered-by-button.tsx` to `components/ui/`
   - Update imports to reference existing shadcn components
   - Ensure compatibility with existing button variants

3. **Migrate animation components**:
   - Copy `searching-animation.tsx` to `components/animations/`
   - Verify framer-motion AnimatePresence usage
   - Update imports and ensure proper motion component usage

4. **Migrate AI elements**:
   - Copy all 7 files from `ai-elements/` to `components/ai-elements/`
   - Update imports to reference `@/components/ui/*` for shadcn components
   - Update imports to reference `@/lib/utils` for cn() utility
   - Ensure proper TypeScript types with strict mode
   - Update any React 18 patterns to React 19 (useEffect, ref handling)

5. **Migrate pricing card**:
   - Copy `pricing-card.tsx` to `components/ask-anything/`
   - Update imports for consistency with ask-anything component structure

6. **Migrate main OnboardingWidget**:
   - Copy `OnboardingWidget.tsx` to `components/widgets/onboarding-widget/onboarding-widget.tsx`
   - Update all import paths to use `@/` alias and new locations
   - Replace `VITE_CDN_BASE_URL` with `NEXT_PUBLIC_CDN_BASE_URL`
   - Update environment variable access from `import.meta.env` to `process.env`
   - Add `"use client"` directive at top for Next.js App Router
   - Update any React 18 patterns to React 19 compatibility
   - Ensure all Radix UI component usage matches existing versions

7. **Create TypeScript types**:
   - Extract OnboardingWidget types to `components/widgets/onboarding-widget/types.ts`
   - Ensure compatibility with existing `widgets/types.ts`
   - Export all necessary interfaces (OnboardingWidgetProps, PhaseState, etc.)

8. **Migrate assets**:
   - Copy `celebration.gif` and `preview.gif` to `public/assets/`
   - Update references in OnboardingWidget to use `/assets/` path with Next.js public directory
   - Verify CDN fallback logic for production deployments

### Phase 3: Integration
**Goal**: Integrate the OnboardingWidget into the existing Next.js app with proper routing and documentation.

1. **Create demo page**:
   - Create `app/onboarding/page.tsx` for testing/demonstration
   - Implement OnboardingWidget with expand/collapse state management
   - Add proper metadata and layout integration
   - Test widget in Next.js App Router context

2. **Update widget manager (if needed)**:
   - Evaluate if `widgets/widget-manager.tsx` needs updates for OnboardingWidget
   - Add OnboardingWidget to potential IIFE bundle targets
   - Document Shadow DOM considerations for complex animations

3. **Create documentation**:
   - Write `docs/widgets/onboarding-widget/OVERVIEW.md` covering:
     - Architecture and component structure
     - Props and configuration options
     - Phase flow and state management
     - Integration examples
   - Write `docs/widgets/onboarding-widget/PHASES.md` covering:
     - All 15 onboarding phases
     - Phase transitions and navigation
     - Voice testing functionality
     - Success states and completion flow

4. **Add to main navigation** (optional):
   - Add link to `/onboarding` in `components/app/app-header-nav.tsx`
   - Update homepage to showcase OnboardingWidget capabilities

5. **Environment setup**:
   - Document required environment variables in main README
   - Provide example `.env.local` configuration
   - Test with and without CDN_BASE_URL for local development

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Install Dependencies
- Run `bun add framer-motion@^12.23.24` to add animation library
- Run `bun add nanoid@^5.1.6` to add ID generation utility
- Verify installation completes without conflicts
- Run `bun install` to ensure lock file is updated

### Step 2: Create Directory Structure
- Create `components/ai-elements/` directory
- Create `components/animations/` directory
- Create `components/icons/` directory (if not exists)
- Create `components/widgets/onboarding-widget/` directory
- Create `docs/widgets/onboarding-widget/` directory
- Verify all directories created successfully

### Step 3: Extend Tailwind Configuration
- Read source `../onboardingwidget_october16/app/client/tailwind.config.ts`
- Identify custom theme extensions (colors, fonts, animations, keyframes)
- Update `app/globals.css` to add custom CSS variables from source
- Add custom color definitions (brand purple/orange/teal, accent amber/blue/green)
- Add custom font tokens (size, weight, lineHeight)
- Add custom animations (bounce, slideUp keyframes)
- Add custom gradients (gradient-brand, gradient-brand-reverse, gradient-brand-teal)
- Add custom shadows (shadow-widget)
- Add custom border radius tokens (pill, circle)
- Preserve all existing Tailwind CSS v4 configuration
- Test that Tailwind CSS v4 still compiles without errors

### Step 4: Configure Environment Variables
- Create `.env.local.example` with `NEXT_PUBLIC_CDN_BASE_URL=https://your-cdn.vercel.app`
- Document environment variables in comments
- Add `.env.local` to `.gitignore` (verify it exists)

### Step 5: Migrate Custom Icons
- Copy `../onboardingwidget_october16/app/client/src/components/icons/blue-star.tsx` to `components/icons/blue-star.tsx`
- Copy `../onboardingwidget_october16/app/client/src/components/icons/wand.tsx` to `components/icons/wand.tsx`
- Update import paths from `@/` to match new structure
- Ensure TypeScript compiles without errors
- Create basic unit test for icon components in `tests/icons.test.tsx`

### Step 6: Migrate Custom UI Components
- Copy `../onboardingwidget_october16/app/client/src/components/ui/phase-navigation.tsx` to `components/ui/phase-navigation.tsx`
- Update imports to reference existing shadcn components
- Ensure proper Radix UI component usage
- Copy `../onboardingwidget_october16/app/client/src/components/ui/powered-by-button.tsx` to `components/ui/powered-by-button.tsx`
- Update imports and ensure proper button variant usage
- Verify TypeScript strict mode compliance
- Create unit tests in `tests/ui/phase-navigation.test.tsx` and `tests/ui/powered-by-button.test.tsx`

### Step 7: Migrate Animation Components
- Copy `../onboardingwidget_october16/app/client/src/components/animations/searching-animation.tsx` to `components/animations/searching-animation.tsx`
- Update imports to use `@/` path alias
- Verify framer-motion AnimatePresence and motion component usage
- Ensure proper TypeScript types
- Test animation renders without errors
- Create unit test in `tests/animations/searching-animation.test.tsx`

### Step 8: Migrate AI Elements (Part 1 - Simple Components)
- Copy `dual-phase-progress.tsx` to `components/ai-elements/`
- Copy `simple-progress-bar.tsx` to `components/ai-elements/`
- Copy `readiness-score-gauge.tsx` to `components/ai-elements/`
- Update all imports to use `@/components/ui/*` for shadcn components
- Update all imports to use `@/lib/utils` for cn() utility
- Update any React 18 patterns to React 19 (if applicable)
- Ensure TypeScript strict mode compliance
- Create unit tests in `tests/ai-elements/` for each component

### Step 9: Migrate AI Elements (Part 2 - Complex Components)
- Copy `glass-widget-container.tsx` to `components/ai-elements/`
- Copy `prompt-input.tsx` to `components/ai-elements/`
- Copy `gif-housing.tsx` to `components/ai-elements/`
- Copy `success-phase.tsx` to `components/ai-elements/`
- Update all imports to use new paths
- Verify proper framer-motion layout animation usage
- Update TypeScript types for strict mode
- Create unit tests in `tests/ai-elements/` for each component

### Step 10: Migrate Pricing Card
- Copy `../onboardingwidget_october16/app/client/src/components/ask-anything/ui/pricing-card.tsx` to `components/ask-anything/pricing-card.tsx`
- Update imports to reference `@/components/ui/*`
- Ensure proper card component usage from shadcn
- Verify TypeScript compliance
- Create unit test in `tests/ask-anything/pricing-card.test.tsx`

### Step 11: Migrate Assets
- Copy `../onboardingwidget_october16/app/client/public/assets/celebration.gif` to `public/assets/celebration.gif`
- Copy `../onboardingwidget_october16/app/client/public/assets/preview.gif` to `public/assets/preview.gif`
- Verify files copied successfully
- Verify file sizes are reasonable (<2MB each)

### Step 12: Migrate Main OnboardingWidget Component
- Copy `../onboardingwidget_october16/app/client/src/components/OnboardingWidget.tsx` to `components/widgets/onboarding-widget/onboarding-widget.tsx`
- Add `"use client"` directive at the top of the file
- Update all import paths to use `@/` alias and new component locations
- Replace all `import.meta.env.VITE_CDN_BASE_URL` with `process.env.NEXT_PUBLIC_CDN_BASE_URL`
- Update environment variable access pattern for Next.js
- Update any React 18 patterns to React 19 (useEffect dependencies, ref handling)
- Ensure all Radix UI components match existing versions
- Verify Carousel API usage matches existing carousel implementation
- Ensure proper TypeScript strict mode compliance
- Fix any import errors or type errors
- Test component compiles without errors

### Step 13: Create TypeScript Types
- Create `components/widgets/onboarding-widget/types.ts`
- Extract OnboardingWidgetProps interface from main component
- Extract PhaseState, Phase, and other internal types
- Export all necessary interfaces
- Ensure compatibility with `widgets/types.ts`
- Update main component to import from types file
- Verify TypeScript compilation succeeds

### Step 14: Create Demo Page
- Create `app/onboarding/page.tsx`
- Import OnboardingWidget component
- Implement expand/collapse state management with useState
- Add proper page metadata (title, description)
- Add basic layout structure
- Test page renders without errors in development mode
- Verify widget expands and collapses correctly

### Step 15: Write Component Documentation
- Create `docs/widgets/onboarding-widget/OVERVIEW.md`
- Document component architecture and structure
- Document all props and configuration options
- Document state management and phase system
- Provide integration examples (Next.js page, widget bundle)
- Create `docs/widgets/onboarding-widget/PHASES.md`
- Document all 15 onboarding phases in detail
- Document phase transitions and navigation
- Document voice testing functionality
- Document success states and completion flow

### Step 16: Create README for Widget
- Create `components/widgets/onboarding-widget/README.md`
- Document component usage and API
- Provide quick start example
- Link to full documentation in docs/
- Document required environment variables
- Document asset requirements (GIFs)

### Step 17: Update Environment Documentation
- Update main `README.md` to document `NEXT_PUBLIC_CDN_BASE_URL`
- Add OnboardingWidget to "Current Status" section
- Add `/onboarding` to "Key URLs" section
- Document framer-motion dependency addition

### Step 18: Run Validation Commands
- Run `bun test` to ensure all tests pass
- Run `bun run lint` to ensure code meets standards
- Run `bun run build` to verify Next.js builds successfully
- Run `bun run dev` and test `/onboarding` page manually
- Verify all 15 phases work correctly
- Verify carousel navigation works
- Verify animations render smoothly
- Verify GIF assets load correctly
- Verify responsive behavior on mobile/desktop
- Verify keyboard navigation works
- Verify voice testing phase (if API available)

## Testing Strategy

### Unit Tests
**Component Rendering**:
- Test all AI elements render without errors
- Test animation components animate correctly
- Test icon components render SVGs properly
- Test custom UI components (phase-navigation, powered-by-button)
- Test pricing card displays correct content

**Props and State**:
- Test OnboardingWidget accepts all configuration props
- Test expand/collapse state management
- Test phase navigation (next, previous, jump to phase)
- Test progress tracking updates correctly
- Test readiness score calculation

**TypeScript Types**:
- Verify all components have proper TypeScript interfaces
- Test type safety for OnboardingWidgetProps
- Test type safety for phase state management

### Integration Tests
**Next.js Integration**:
- Test OnboardingWidget renders in Next.js App Router page
- Test `"use client"` directive works correctly
- Test environment variable access (NEXT_PUBLIC_CDN_BASE_URL)
- Test asset loading from Next.js public directory

**Component Integration**:
- Test OnboardingWidget with all child components
- Test carousel integration with embla-carousel-react
- Test framer-motion animations work in Next.js
- Test glass widget container with header/content/footer
- Test prompt input with gradient borders and submit button

**API Integration** (if backend available):
- Test chat API calls from widget
- Test message streaming and display
- Test error handling for API failures
- Test loading states during API calls

### Edge Cases
**Environment Variables**:
- Test widget behavior when CDN_BASE_URL is not set (fallback to local assets)
- Test widget with invalid CDN_BASE_URL
- Test widget with relative vs absolute asset paths

**State Management**:
- Test rapid phase navigation (forward and backward)
- Test phase navigation while animations are in progress
- Test expand/collapse during different phases
- Test widget with initialExpanded=true vs false

**Responsive Behavior**:
- Test widget on mobile viewport (320px width)
- Test widget on tablet viewport (768px width)
- Test widget on desktop viewport (1920px width)
- Test carousel swipe gestures on touch devices

**Animation Performance**:
- Test widget with AnimatePresence exit animations
- Test widget with layout animations during phase transitions
- Test widget with simultaneous animations (progress + content)
- Test widget performance with 60fps target

**Asset Loading**:
- Test widget when GIF assets fail to load
- Test widget with slow network (asset loading delay)
- Test widget with missing assets (graceful degradation)

**Accessibility**:
- Test keyboard navigation through all phases
- Test screen reader compatibility (ARIA labels)
- Test focus management during expand/collapse
- Test color contrast in all phases

## Acceptance Criteria
- ✅ All dependencies installed via Bun without conflicts
- ✅ All 27 source component files migrated to appropriate directories
- ✅ All imports updated to use `@/` path alias
- ✅ All environment variables converted from Vite to Next.js pattern
- ✅ All React 18 patterns updated to React 19 compatibility
- ✅ All components compile without TypeScript errors (strict mode)
- ✅ Tailwind CSS v4 configuration extended without breaking existing styles
- ✅ Global CSS variables merged into `app/globals.css`
- ✅ OnboardingWidget renders correctly on `/onboarding` page
- ✅ All 15 onboarding phases display and transition correctly
- ✅ Carousel navigation works (next, previous, swipe)
- ✅ All animations render smoothly (framer-motion)
- ✅ GIF assets load from public directory
- ✅ Progress tracking updates correctly through phases
- ✅ Readiness score gauge displays and animates
- ✅ Voice testing phase renders (even if API not connected)
- ✅ Success phase displays with celebration animation
- ✅ All unit tests pass (`bun test`)
- ✅ Linting passes without errors (`bun run lint`)
- ✅ Production build succeeds (`bun run build`)
- ✅ Widget is responsive on mobile/tablet/desktop
- ✅ Keyboard navigation works throughout widget
- ✅ Documentation created (OVERVIEW.md, PHASES.md, README.md)
- ✅ No console errors or warnings in browser
- ✅ Widget can potentially be bundled as IIFE (architecture supports it)

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `bun install` - Ensure all dependencies installed correctly
- `bun run lint` - Ensure code meets linting standards
- `bun run build` - Verify Next.js application builds successfully
- `bun test` - Run all tests to validate feature works with zero regressions
- `bun run dev` - Start development server and manually test:
  - Navigate to `http://localhost:3000/onboarding`
  - Click to expand OnboardingWidget
  - Navigate through all 15 phases using carousel
  - Test keyboard navigation (arrow keys, escape)
  - Test responsive behavior (resize browser window)
  - Verify all animations render smoothly
  - Verify GIF assets load correctly
  - Check browser console for errors (should be zero)
  - Test collapse and re-expand functionality
  - Verify progress indicators update correctly
  - Test phase navigation component

## Notes

### Dependency Justification: framer-motion
Framer Motion is essential for this migration because:
1. **Layout Animations**: The OnboardingWidget uses `layout` prop on motion components for smooth phase transitions - this cannot be replicated with CSS alone
2. **AnimatePresence**: Complex exit animations when phases unmount require AnimatePresence for proper cleanup
3. **Gesture Handling**: Carousel and swipe interactions rely on framer-motion's gesture system
4. **Shared Layout Animations**: Progress indicators and readiness gauge use shared layout animations
5. **Performance**: Framer Motion uses WAAPI (Web Animations API) under the hood for better performance than CSS transitions in complex scenarios

The library is production-ready (12M+ weekly downloads), well-maintained, and adds ~60KB gzipped to the bundle - acceptable for the animation capabilities it provides.

### Migration Considerations
1. **React 19 Compatibility**: Framer Motion 12.23.24 is compatible with React 19. Verify no deprecation warnings.
2. **Tailwind v4 vs v3**: Source uses Tailwind v3, target uses v4. CSS variable patterns should be compatible, but test all custom classes.
3. **Build System**: Source uses Vite, target uses Next.js/Bun. Environment variables and asset loading patterns differ - updated in migration.
4. **Shadow DOM**: If OnboardingWidget is eventually bundled as IIFE widget, framer-motion animations should work within Shadow DOM (test this later).

### Future Enhancements
1. **Widget Bundle**: Add OnboardingWidget to IIFE bundle build for third-party embedding
2. **API Integration**: Connect voice testing and chat phases to backend API
3. **Analytics**: Add event tracking for phase completion, drop-off analysis
4. **A/B Testing**: Implement variant testing for phase content and flow
5. **Internationalization**: Add i18n support for multi-language onboarding
6. **Theming**: Integrate with existing theme system for light/dark mode support
7. **Accessibility Audit**: Conduct full WCAG 2.1 AA compliance audit
8. **Performance Optimization**: Analyze bundle size impact and optimize if needed (code splitting, lazy loading)

### Component Analysis: Redundancy Check
Source includes several chat components that may overlap with existing ask-anything components:
- `ChatButton.tsx` - Likely redundant with `components/ask-anything/ask-button.tsx`
- `ChatHeader.tsx` - Functionality covered by glass-widget-container header
- `ChatInput.tsx` - Functionality covered by prompt-input component
- `ChatMessage.tsx` - Not currently used in ask-anything-ui, may need for future chat features
- `ChatWindow.tsx` - Functionality covered by glass-widget-container
- `LoadingIndicator.tsx` - Functionality covered by SearchingAnimation

**Decision**: Initially migrate only components directly used by OnboardingWidget. Evaluate chat components later if needed for expanded functionality.

### CDN Strategy
For production deployments:
1. Upload GIF assets to CDN (Vercel Blob, Cloudflare R2, etc.)
2. Set `NEXT_PUBLIC_CDN_BASE_URL` environment variable
3. Widget will use CDN URLs for better performance globally
4. Local development falls back to `/assets/` in public directory

### Shadow DOM Considerations
If bundling OnboardingWidget as IIFE:
- Framer Motion should work within Shadow DOM
- CSS variables need to be injected into Shadow root
- Event handlers need to be scoped to Shadow DOM
- Test thoroughly before production IIFE bundle
