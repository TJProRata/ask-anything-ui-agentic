# Bug: Fix Preview Page - Match Onboarding Widget Style

## Bug Description
The preview page was redesigned in issue #4 but doesn't match the onboarding widget aesthetic and has incorrect scroll behavior. The current implementation:
- Uses custom components instead of reusing onboarding widget components
- Has entire page scrolling behavior instead of fixed preview window with internal scrolling
- Missing the glassmorphism styling, gradient borders, and color scheme from onboarding widget
- Input bar styling doesn't match the "Make an edit..." field from onboarding widget
- Layout and spacing patterns differ from the reference onboarding widget

## Problem Statement
The preview page needs to be an extension of the onboarding widget, using identical components, colors, input styling, and layout patterns. Currently it has a custom implementation that creates visual inconsistency and poor scroll behavior where the entire viewport moves instead of having a fixed-height preview container with internal scrolling.

## Solution Statement
Refactor the preview page to reuse components from `components/widgets/onboarding-widget/onboarding-widget.tsx` and fix the scroll behavior by implementing a fixed-height (475px) preview window where only the microsite content scrolls internally while the UI controls remain static.

## Steps to Reproduce
1. Navigate to `/preview/[slug]` page
2. Observe the current dark-themed custom implementation
3. Compare with onboarding widget styling patterns
4. Scroll down to view more microsite content
5. Notice entire page viewport scrolls instead of content scrolling within preview frame

## Root Cause Analysis
1. **Component Independence**: Preview components were built independently instead of importing/reusing onboarding widget components
2. **Missing Glassmorphism**: Preview page uses dark theme styling instead of glassmorphism containers from onboarding widget
3. **Scroll Container Error**: The `DemoMicrosite` component has `overflow-y-auto` on root div instead of having a fixed-height container with internal scrolling
4. **Input Component Mismatch**: Uses custom `EditInputSection` instead of `PromptInput` components with gradient borders from onboarding widget
5. **Color System Disconnect**: Uses gray-900 background instead of onboarding widget's gradient/glassmorphism theme

## Relevant Files
Use these files to fix the bug:

**Primary Reference File:**
- **`components/widgets/onboarding-widget/onboarding-widget.tsx`** - Source of truth for styling patterns, components, colors, and layout that preview page must match

**Files to Modify:**
- **`components/preview/preview-page-client.tsx`** - Main preview client component; needs complete rework to use onboarding widget patterns and fix layout structure
- **`components/preview/mobile-device-frame.tsx`** - Device frame component; needs fixed height implementation (475px) and glassmorphism styling
- **`components/preview/demo-microsite.tsx`** - Microsite content; scroll behavior needs to be contained within fixed frame
- **`components/preview/edit-input-section.tsx`** - Replace with PromptInput components from onboarding widget with gradient borders
- **`app/preview/[slug]/page.tsx`** - Update to use glassmorphism background instead of gray-950

**Components to Import/Reuse:**
- **`components/ai-elements/glass_widget_container.tsx`** - GlassWidgetContainer, GlassWidgetContent, GlassWidgetFooter for consistent styling
- **`components/ai-elements/prompt-input.tsx`** - PromptInput, GradientBorderContainer, GradientPlaceholderInput for input styling
- **`components/ui/powered-by-button.tsx`** - PoweredByButton component for footer branding consistency

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Update Preview Page Background and Layout
- Modify `app/preview/[slug]/page.tsx` to use glassmorphism background instead of gray-950
- Import and apply background patterns from onboarding widget implementation  
- Remove dark theme classes and replace with onboarding widget's gradient/glassmorphism approach
- Update layout container to support glassmorphism widget positioning

### Step 2: Import Reusable Components from Onboarding Widget
- Add imports to preview components for GlassWidgetContainer, GlassWidgetContent, GlassWidgetFooter
- Add imports for PromptInput, GradientBorderContainer, GradientPlaceholderInput, IconButton components
- Add import for PoweredByButton component for consistent branding
- Verify all component imports resolve correctly and TypeScript types match

### Step 3: Replace Custom Edit Input with Onboarding Widget Input
- Remove current `EditInputSection` custom implementation
- Replace with `PromptInput` component using glassmorphism variant
- Implement `GradientBorderContainer` with `GradientPlaceholderInput` for "Make an edit..." field
- Add IconButton components (plus, mic, user) to match onboarding widget input structure
- Ensure placeholder text matches: "Make an edit..." instead of current text

### Step 4: Fix Mobile Device Frame Height and Scroll Container
- Modify `MobileDeviceFrame` component to have fixed height of 475px
- Remove aspect-ratio classes that make frame dynamic height
- Add fixed positioning classes to prevent frame from moving during scroll
- Ensure frame stays centered and static while content scrolls internally
- Update frame styling to use glassmorphism effects instead of black background

### Step 5: Fix Demo Microsite Scroll Behavior  
- Remove `overflow-y-auto` from root div in `DemoMicrosite` component
- Wrap content in a fixed-height scrollable container (375px height to fit in 475px frame)
- Add proper scroll styling with glassmorphism scrollbar design
- Ensure only microsite content scrolls while device frame chrome remains static
- Test scroll behavior to ensure page viewport doesn't move

### Step 6: Update Bottom Control Bar Styling
- Replace dark theme styling (gray-900/95) with glassmorphism styling from onboarding widget
- Update backdrop blur and border styling to match onboarding widget footer
- Ensure control bar uses same color variables and design tokens as onboarding widget
- Replace navigation tabs styling to match onboarding widget button patterns

### Step 7: Replace Navigation Tabs with Onboarding Widget Button Style
- Update navigation tab buttons to use same styling as onboarding widget suggestion buttons
- Apply glassmorphism styling, color schemes, and hover states from onboarding widget
- Ensure tab badges (like "2" on Tweaks) use same styling patterns as onboarding widget badges
- Update icon styling to match onboarding widget icon treatment

### Step 8: Apply Onboarding Widget Color System
- Replace all custom color references with CSS custom properties from onboarding widget
- Update gradients to use `var(--gradient-brand)` and other onboarding widget variables
- Ensure text colors, backgrounds, and borders match onboarding widget color palette
- Verify glassmorphism effects use same opacity and blur values

### Step 9: Update Preview Client Layout Structure
- Refactor `PreviewPageClient` to use GlassWidgetContainer as the main wrapper
- Structure layout with GlassWidgetContent for the device frame area
- Add GlassWidgetFooter for the bottom control bar
- Ensure layout hierarchy matches onboarding widget component structure
- Remove custom layout classes that conflict with glassmorphism container

### Step 10: Fix Container Positioning and Dimensions
- Set preview window container to fixed dimensions (width: 392px to match onboarding widget)
- Center container in viewport with same positioning as onboarding widget
- Ensure device frame is properly contained within fixed-height glassmorphism container
- Test that no content exceeds container boundaries or causes layout shifts

### Step 11: Add PoweredByButton Footer
- Import and add PoweredByButton component to footer area
- Position it identically to onboarding widget footer placement
- Ensure branding consistency between preview page and onboarding flow
- Match spacing and alignment with onboarding widget footer implementation

### Step 12: Update CSS Variables and Design Tokens
- Ensure all components use design tokens from `app/globals.css`  
- Verify gradient variables, border radius, shadows match onboarding widget
- Update any hardcoded values to use CSS custom properties
- Test that theme switching (if applicable) works consistently

## Validation Commands
Execute every command to validate the bug is fixed with zero regressions.

- `bun test` - Run all tests to validate the bug is fixed with zero regressions
- `bun run lint` - Ensure code meets linting standards
- `bun run build` - Verify Next.js application builds successfully
- `bun run dev` - Start development server and test preview page at `/preview/test-slug`
- Manual test: Verify preview page now uses glassmorphism styling identical to onboarding widget
- Manual test: Confirm device frame has fixed 475px height and stays in place when scrolling  
- Manual test: Verify only microsite content scrolls within the device frame
- Manual test: Check that input field matches onboarding widget "Make an edit..." style with gradient border
- Manual test: Ensure navigation tabs use onboarding widget button styling and colors
- Manual test: Verify PoweredByButton appears in footer with consistent branding
- Manual test: Test responsive behavior maintains fixed preview window approach
- Manual test: Compare side-by-side with onboarding widget to ensure visual consistency

## Notes
- The key insight is that the preview page should be a compositional extension of the onboarding widget, not a separate dark-themed implementation
- Fixed height (475px) is critical - the preview window must not expand or move with content
- All styling should come from existing onboarding widget components rather than custom implementations  
- The scroll behavior fix requires both container height constraints and proper overflow handling
- Component reuse ensures long-term maintainability and visual consistency across the application