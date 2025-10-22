# Bug: Slug Preview Box Causes Vertical Layout Shift When Typing

## Bug Description
When the user types in the title input field on Step 2, the slug preview box (`Your gist URL: gist.link/a`) appears below the input field. This causes the heading "Give it a name" and subheading "This will be your gist's title and URL" to shift vertically upward, creating a jarring and unprofessional user experience.

**Symptoms:**
- Heading and subheading shift upward when slug preview appears
- Content above the input box is not stable during typing
- Layout jumps as the slug preview box is added to the DOM
- Unprofessional, non-smooth user experience
- Motion content wrapper doesn't reserve space for the appearing element

**Expected Behavior:**
- Heading and subheading should remain in a fixed position while typing
- Slug preview should appear smoothly without causing layout shifts above it
- Content should feel stable and professional during all interactions
- Space for slug preview should be reserved or animated smoothly

**Actual Behavior:**
- Slug preview appears conditionally based on whether `state.slug` exists
- Framer Motion's AnimatePresence doesn't prevent layout shift of siblings
- Content above the form shifts upward when slug preview is added to DOM
- Heading/subheading position is not stable during user input

## Problem Statement
The slug preview box (lines 458-465) is conditionally rendered inside the form's `space-y-4` flex container. When it appears after the user types, it adds height to the form, pushing content upward. The motion wrapper (lines 410-420) uses `key={currentStep}` which causes it to re-render the entire content block when state changes, but doesn't reserve space for dynamically appearing elements within the same step.

**Key Issues:**
1. **Conditional rendering without space reservation**: Lines 458-465 render slug preview only when `state.slug` exists
2. **No AnimatePresence for slug preview**: Element appears/disappears without smooth animation
3. **Flex container spacing**: `space-y-4` on line 425 adds gap when slug preview appears, pushing content up
4. **No minimum height**: Content wrapper doesn't reserve space for the dynamic element
5. **Layout shift not prevented**: No mechanism to keep heading/subheading stable

## Solution Statement
Use Framer Motion's `AnimatePresence` with `layout` animations to smoothly animate the slug preview box in/out while preventing layout shifts of sibling elements. Additionally, wrap the slug preview in a `motion.div` with height animations to reserve space and transition smoothly.

**Implementation Approach:**
1. Wrap slug preview in `<AnimatePresence mode="wait">`
2. Use `<motion.div>` with `layout` prop for slug preview
3. Add `initial`, `animate`, and `exit` animations for smooth height transitions
4. Use `overflow: hidden` during animation to prevent content jumping
5. Consider using `layoutId` to maintain layout position

**Alternative Approach** (simpler):
1. Always render the slug preview container with fixed minimum height
2. Show/hide content with opacity transitions instead of conditional mounting
3. Prevents layout shift by always reserving the space

## Steps to Reproduce
1. Navigate to http://localhost:3000/gistplatform
2. Click the collapsed widget button twice to fully expand
3. Click "A person" to advance to Step 2
4. Observe the position of "Give it a name" heading and subheading
5. **Type a single character** (e.g., "a") in the input field
6. **BUG**: Heading and subheading immediately shift upward
7. Slug preview box appears: "Your gist URL: gist.link/a"
8. Content above is no longer in its original position

## Root Cause Analysis

**The Layout Shift Mechanism:**

**Motion Content Wrapper** (lines 410-420):
```tsx
<motion.div
  key={currentStep}
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  className="space-y-6"
>
  <div className="text-center space-y-2">
    <h3>Give it a name</h3>
    <p>This will be your gist's title and URL</p>
  </div>
  {/* Form with conditional slug preview */}
</motion.div>
```
- Uses `key={currentStep}` so content is re-mounted on step changes
- `space-y-6` adds vertical spacing between children
- Heading/subheading are in first child div
- Form is second child, containing input + conditional slug preview

**Form Container** (line 425):
```tsx
<form className="space-y-4">
  <GradientBorderContainer>
    {/* Input field */}
  </GradientBorderContainer>

  {/* CONDITIONAL - only renders when state.slug exists */}
  {currentPhase.field === "title" && state.slug && (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
      <p>Your gist URL:</p>
      <p>gist.link/{state.slug}</p>
    </div>
  )}
</form>
```
- `space-y-4` adds 16px gap between form children
- Slug preview is conditionally rendered
- When it appears, form height increases by ~60-80px
- This pushes the entire form down, which pushes heading/subheading UP due to flex container

**What Happens:**

1. **Initial State (no slug)**:
   ```
   [Heading "Give it a name"]         ← Position A
   [Subheading]

   [Input field]
   [Empty space where slug preview will go]
   ```

2. **User Types → slug generated**:
   ```
   [Heading "Give it a name"]         ← Shifts UP to Position B
   [Subheading]

   [Input field]
   [Slug preview box appears HERE]    ← Adds height
   ```

3. **Layout Calculation**:
   - Slug preview adds ~70px height to form
   - Form is in `space-y-6` container with heading
   - Container maintains spacing, but content reflows
   - Heading shifts up because form grew downward
   - GlassWidgetContent centers content vertically

**Why Heading Shifts Up:**
- Content is vertically centered in the widget
- When form gets taller (slug preview appears), the entire content block reflows
- To maintain centering, the top content (heading) moves up
- No space was reserved for the appearing element

## Relevant Files
Use these files to fix the bug:

**`components/widgets/gist-creation-widget/gist-creation-widget.tsx`** (560 lines)
- Lines 410-420: Motion content wrapper with `space-y-6` container
- Lines 415-425: Form container with `space-y-4`
- Lines 458-465: Conditional slug preview rendering ← PRIMARY ISSUE
- Need to add AnimatePresence and motion animations for smooth appearance
- Or always render container with min-height to reserve space

**`hooks/use-gist-form.ts`** (reference only - no changes needed)
- Lines 41-44: SET_TITLE action that generates slug
- This triggers the slug preview to appear
- Hook logic is correct, issue is in rendering

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Wrap Slug Preview in AnimatePresence with Motion Animation
- Open `components/widgets/gist-creation-widget/gist-creation-widget.tsx`
- Import AnimatePresence if not already imported (it's already imported on line 4)
- Find lines 458-465 (slug preview conditional rendering)
- Replace with AnimatePresence wrapper:
  ```tsx
  <AnimatePresence initial={false}>
    {currentPhase.field === "title" && state.slug && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Your gist URL:</p>
          <p className="text-sm text-gray-700 font-mono">
            gist.link/{state.slug}
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
  ```
- The `overflow-hidden` prevents content from showing during height animation
- `initial={false}` prevents animation on mount
- `height: "auto"` allows smooth height transition

### Step 2: Add Layout Prop to Prevent Sibling Shifts
- On the motion.div wrapper (line 410), add `layout` prop:
  ```tsx
  <motion.div
    key={currentStep}
    layout  // ← Add this
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
  ```
- This tells Framer Motion to animate layout changes smoothly
- Siblings will animate to new positions instead of jumping

### Step 3: Test Slug Preview Animation
- Start dev server: `bun run dev`
- Navigate to http://localhost:3000/gistplatform
- Click widget twice to expand fully
- Click "A person" to go to Step 2
- Type a character in the input
- **Verify**: Heading and subheading remain stable (no upward shift)
- **Verify**: Slug preview fades and slides in smoothly from height 0
- **Verify**: Overall experience feels professional and smooth

### Step 4: Test Edge Cases
- **Type then delete**: Verify slug preview fades out smoothly
- **Type multiple chars quickly**: Verify no layout jumps
- **Back navigation**: Go back to step 1, then return to step 2 with existing title
- **Verify**: Slug preview appears immediately on step load if title exists

### Step 5: Run Validation Commands
- Execute all validation commands to ensure bug is fixed with zero regressions

## Validation Commands
Execute every command to validate the bug is fixed with zero regressions.

- `bun run lint` - Ensure code meets linting standards
- `bun run dev` - Start dev server at http://localhost:3000
- **Manual Test - Initial State**: Navigate to step 2, verify heading position before typing
- **Manual Test - First Character**: Type ONE character, verify heading doesn't shift up ← PRIMARY BUG TEST
- **Manual Test - Smooth Animation**: Verify slug preview animates in smoothly with fade + height transition
- **Manual Test - Continued Typing**: Type full title "test project", verify layout remains stable
- **Manual Test - Delete Text**: Clear input, verify slug preview fades out smoothly
- **Manual Test - Fast Typing**: Type quickly, verify no layout glitches or jumps
- **Manual Test - Step Navigation**: Go back to step 1, return to step 2, verify behavior with existing title
- **Manual Test - Overall Feel**: Verify the entire interaction feels smooth and professional
- **Regression Test**: Test other steps to ensure AnimatePresence doesn't break anything
- **Regression Test**: Test widget collapse/expand to ensure layout prop doesn't cause issues

## Notes
- **Framer Motion AnimatePresence**: Automatically handles enter/exit animations for conditional elements
- **layout prop**: Tells Framer Motion to animate layout changes instead of jumping
- **height: "auto"**: Allows smooth height transitions without knowing exact height
- **overflow-hidden**: Prevents content from showing outside container during animation
- **initial={false}**: Prevents animation on initial mount, only on subsequent changes
- **Duration 0.2s**: Short enough to feel snappy, long enough to be smooth
- **Alternative approach**: Could use fixed min-height instead of animations, but less elegant
- **Performance**: AnimatePresence is optimized and shouldn't cause performance issues
- **Accessibility**: Ensure animations respect `prefers-reduced-motion` if needed
