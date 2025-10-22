# Feature: Gist Creation Widget Suggestion Buttons

## Feature Description
Add onboarding widget-style suggestion buttons to the gist-creation-widget. This includes replacing the current plain option buttons with styled suggestion buttons that match the onboarding widget's design, adding the "More" button with Wand icon, using proper typography (Work Sans font with specific sizing), and implementing the same visual hierarchy and interaction patterns.

## User Story
As a user creating a gist
I want to see visually consistent and engaging suggestion buttons
So that I have a familiar, polished experience matching the onboarding flow

## Problem Statement
The gist-creation-widget currently uses basic outline buttons for option selection (steps 1, 3, 4, 5, 7, 8, 9, 10), which don't match the polished suggestion button pattern from the onboarding widget. The onboarding widget uses:
- Left-aligned text buttons with BlueStar icons
- Dashed separators between suggestions
- Specific typography (Work Sans font family, text-base sizing)
- A centered "More" button with Wand icon below suggestions
- Proper hover states and disabled states during streaming/loading

This inconsistency creates a disjointed user experience between widgets.

## Solution Statement
Refactor the gist-creation-widget to use the same suggestion button pattern as onboarding-widget. This involves:

1. Replace plain `Button` components in option rendering with the BlueStar-icon left-aligned button pattern
2. Add dashed `Separator` components between suggestion buttons
3. Add the "More" button component with Wand icon and proper styling
4. Match typography specifications from onboarding widget
5. Ensure proper state management (disabled during submission)

**Tech Stack Compliance**: This solution uses only approved technologies:
- Bun runtime
- Next.js 15 with React 19
- TypeScript with strict mode
- Tailwind CSS v4 (utility classes for styling)
- shadcn/ui Button and Separator components (Radix-based)
- Lucide React icons (BlueStar custom icon already exists)
- No new dependencies required

## Relevant Files
Use these files to implement the feature:

### Existing Files to Modify

**`components/widgets/gist-creation-widget/gist-creation-widget.tsx`** (500 lines)
- Main widget component that needs suggestion button refactoring
- Currently renders options with plain outline buttons (lines 460-473)
- Needs: Replace option rendering, add More button, match onboarding typography

**`components/icons/blue-star.tsx`**
- Custom BlueStar icon component already exists
- Used in onboarding widget for suggestion buttons
- Will be imported and used for gist-creation suggestion buttons

**`components/icons/wand.tsx`**
- Custom Wand icon component already exists
- Used in onboarding widget for "More" button
- Will be imported and used for gist-creation More button

### Reference Files (Read-only)

**`components/widgets/onboarding-widget/onboarding-widget.tsx`** (lines 876-930)
- Reference implementation of suggestion buttons pattern
- Lines 881-902: Suggestion button rendering with BlueStar icons
- Lines 904-928: More button implementation with Wand icon
- Provides exact styling specifications to match

## Implementation Plan
**IMPORTANT**: All implementation must strictly follow the Tech Stack Requirements (Bun, Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui).

### Phase 1: Foundation
Review existing onboarding widget suggestion button implementation to extract:
- Typography specifications (font family, size, weight, line height, letter spacing)
- Button styling patterns (height, padding, colors, hover states)
- Separator styling (dashed border pattern)
- More button specifications (border radius, padding, icon size)
- State management patterns (disabled states, streaming awareness)

### Phase 2: Core Implementation
Update gist-creation-widget component to render options as suggestion buttons:
- Import BlueStar and Wand icons from components/icons
- Replace current option button rendering with onboarding-style suggestion pattern
- Add Fragment wrapper for suggestions with separators
- Implement More button below suggestions
- Match all typography and styling specifications exactly

### Phase 3: Integration
Ensure proper integration with existing gist-creation-widget functionality:
- Maintain existing handleOptionClick behavior
- Preserve isSubmitting disabled state logic
- Test all 8 option-based steps (steps 1, 3, 4, 5, 7, 8, 9, 10)
- Verify no regression in input steps (steps 2, 6)
- Ensure proper spacing and layout in GlassWidgetContent

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Import Required Components
- Add BlueStar import: `import { BlueStar } from "@/components/icons/blue-star"`
- Add Wand import: `import { Wand } from "@/components/icons/wand"`
- Add Fragment import if not already present: `import { Fragment } from "react"`
- Verify Separator is already imported from "@/components/ui/separator"

### Step 2: Add handleMoreClick Function
- Add handleMoreClick function to component (before return statement)
- Function signature: `const handleMoreClick = () => { /* Handle more button click */ };`
- Leave implementation empty for now (future enhancement)

### Step 3: Refactor Option Button Rendering
- Locate option button rendering in gist-creation-widget.tsx (currently lines 460-473)
- Replace the entire `<div className="space-y-3">` section with onboarding-style pattern
- Wrap each option button in Fragment with key
- Add BlueStar icon with `className="w-5 h-5 mr-3"` before button text
- Update Button props to match onboarding widget:
  - `variant="ghost"`
  - `size="lg"` (remove if lg not supported, use default)
  - `className="justify-start text-left h-[30px] px-0 leading-[140%] hover:bg-transparent"`
  - Add disabled state with opacity: `isSubmitting && "opacity-50 cursor-not-allowed"`
- Add inline style for typography:
  ```tsx
  style={{
    color: 'var(--content-default, #151022)',
    fontFamily: 'var(--font-family-accent, "Work Sans")'
  }}
  ```
- Add dashed Separator between buttons (not after last):
  ```tsx
  {index < currentPhase.options.length - 1 && (
    <Separator className="border-t border-dashed border-gray-300 bg-transparent my-1" />
  )}
  ```

### Step 4: Add More Button Component
- Add More button section after suggestion buttons, before closing div
- Structure:
  ```tsx
  <div className="flex justify-center pt-2">
    <Button
      variant="ghost"
      size="sm"
      onClick={handleMoreClick}
      disabled={isSubmitting}
      className={cn(
        "rounded-[20px] px-2.5 py-1 gap-1 border border-black hover:bg-transparent",
        isSubmitting && "opacity-50 cursor-not-allowed"
      )}
      style={{
        background: 'var(--background-action-secondary, rgba(255, 255, 255, 0.10))',
        color: 'var(--content-default, #151022)',
        fontSize: '16px',
        fontFamily: 'Work Sans',
        fontWeight: 500,
        lineHeight: '22.40px',
        letterSpacing: '0.32px'
      }}
    >
      <Wand className="w-3.5 h-3.5" />
      More
    </Button>
  </div>
  ```

### Step 5: Update Container Wrapper
- Change wrapping div from `<div className="space-y-3">` to maintain proper spacing
- Use flexbox column layout to accommodate suggestions and More button
- Ensure proper spacing between suggestion list and More button

### Step 6: Run Validation Commands
- Execute all validation commands to ensure feature works correctly with zero regressions

## Testing Strategy
### Unit Tests
No unit tests required for this UI-only feature. Visual testing via dev server sufficient.

### Integration Tests
Manual integration testing:
- Navigate through all 10 steps of gist creation flow
- Verify suggestion buttons appear on steps 1, 3, 4, 5, 7, 8, 9, 10
- Verify input fields appear on steps 2, 6
- Click each suggestion button and verify correct navigation
- Verify More button appears and is clickable
- Verify disabled states work during isSubmitting

### Edge Cases
- Test with different numbers of options (2, 3, 4 options per step)
- Verify separator doesn't appear after last suggestion
- Test button disabled states during submission
- Verify typography renders correctly across browsers
- Test hover states on all buttons

## Acceptance Criteria
- ✅ Suggestion buttons match onboarding widget visual design exactly
- ✅ BlueStar icons appear on left side of each suggestion button
- ✅ Dashed separators appear between (not after) suggestions
- ✅ More button appears below suggestions with Wand icon
- ✅ Typography matches Work Sans font family with specified sizing
- ✅ Button states (hover, disabled) work correctly
- ✅ All 10 gist creation steps function without regression
- ✅ No TypeScript or ESLint errors
- ✅ Application builds successfully

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `bun run lint` - Ensure code meets linting standards
- `bun run dev` - Start dev server and visually test at http://localhost:3000/gistplatform
- Navigate through all 10 gist creation steps - Verify suggestion buttons work correctly
- Test suggestion button clicks - Verify proper navigation between steps
- Test More button - Verify button appears and is clickable
- Verify typography - Check Work Sans font renders correctly
- Test disabled states - Submit form and verify buttons disable properly
- `bun run build` - Verify Next.js application builds successfully (if dev testing passes)

## Notes
- The More button currently has no functional implementation (handleMoreClick is empty). This is intentional and matches the onboarding widget pattern. Future enhancement can add functionality.
- Work Sans font family is already configured in the project via CSS variables (`--font-family-accent`)
- The suggestion button pattern uses ghost variant to avoid background color, relying on hover states for interaction feedback
- Dashed separators use Tailwind utility classes for consistent styling
- The 30px button height matches Figma specifications from onboarding widget
- This feature focuses purely on visual/UX consistency. No data model or API changes required.
