# Bug: Onboarding Widget Text and Button Gradient Not Rendering

## Bug Description
The onboarding widget at http://localhost:3001/onboarding has two remaining visual styling issues after the initial gradient border fix:

1. **Text appears white on purple background**: The heading "How do I get one?" and description text "Setup takes minutes..." are rendering with white text color on a purple background instead of showing as dark text on light background
2. **Gradient submit button not rendering**: The arrow submit button at the bottom right of the input field is not displaying the gradient background - appears as gray/default styling instead of purple-to-orange gradient

**Expected Behavior**:
- Heading and description text should display as dark text (#151022) on light background
- Submit button (arrow icon) should have gradient background (purple to orange)
- Text should be clearly readable without purple background overlay

**Actual Behavior**:
- Text appears white/light colored on purple background, making it look highlighted
- Submit button appears without gradient background styling
- Visual design does not match intended clean, readable aesthetic

## Problem Statement
The Tailwind CSS utility classes `text-text-primary` and `bg-gradient-brand` are not being recognized or compiled by Tailwind CSS v4's new architecture, causing fallback to default/missing styles.

## Solution Statement
Add custom Tailwind utility classes to `app/globals.css` for the custom design tokens defined in the :root CSS variables. Replace Tailwind class usage with inline styles or properly registered Tailwind utilities that Tailwind CSS v4 can recognize and compile.

## Steps to Reproduce
1. Start the development server: `bun run dev`
2. Navigate to http://localhost:3001/onboarding (or http://localhost:3000/onboarding)
3. Observe Phase 0: "How do I get one?" heading and description text
4. Notice text appears white/light on purple background (should be dark on light)
5. Look at the input field at bottom - arrow submit button should have gradient bg

## Root Cause Analysis

### Issue 1: White Text on Purple Background
**Location**: `components/widgets/onboarding-widget/onboarding-widget.tsx:469, 479`

The heading and description text use Tailwind class `text-text-primary`:
- Line 469: `className="text-heading font-heading font-medium leading-heading tracking-heading text-text-primary break-words"`
- Line 479: `className="text-sm text-text-primary leading-description break-words"`

The CSS variable `--color-text-primary: #151022` is defined in `app/globals.css:159`, but Tailwind CSS v4's `@theme inline` configuration (lines 5-50) does NOT include mappings for these custom color tokens.

**Root Cause**: Tailwind CSS v4 requires explicit color mappings in the `@theme inline` block. The `text-text-primary` class is not recognized because `--color-text-primary` is not mapped in the theme configuration, causing Tailwind to ignore the class and apply default/fallback styling.

### Issue 2: Gradient Submit Button Not Rendering
**Location**: `components/ai-elements/prompt-input.tsx:942`

The GradientSubmitButton component uses Tailwind class `bg-gradient-brand`:
- Line 942: `className="bg-gradient-brand"`

The CSS variable `--gradient-brand` is defined in `app/globals.css:183` as `linear-gradient(90deg, #6F61EF 0%, #E19736 100%)`, but Tailwind CSS v4 does not support arbitrary gradient backgrounds via utility classes like v3 did.

**Root Cause**: Tailwind CSS v4's architecture does not automatically generate utility classes for CSS custom properties. The `bg-gradient-brand` class is never compiled/generated, so the button has no background styling applied. Tailwind v4 requires explicit background color/gradient definitions in the theme or inline styles.

## Relevant Files

### Files to Modify

**`app/globals.css`**
- Lines 5-50: `@theme inline` block
- Issue: Missing color token mappings for custom design tokens
- Fix: Add `--color-text-primary`, `--color-text-secondary`, etc. to theme configuration
- Also add gradient background utilities or confirm inline style approach

**`components/ai-elements/prompt-input.tsx`**
- Lines 936-950: GradientSubmitButton component
- Issue: Uses `bg-gradient-brand` Tailwind class that doesn't exist in v4
- Fix: Replace with inline style using `background: var(--gradient-brand)` CSS variable
- Already done similar fix for GradientPlaceholderInput - apply same pattern

**`components/widgets/onboarding-widget/onboarding-widget.tsx`**
- Lines 469, 479: Text elements using `text-text-primary` class
- Issue: Tailwind class not recognized, falls back to default
- Fix: After adding theme mappings, class should work OR use inline styles
- Verify all 12 occurrences of `text-text-primary` render correctly

### New Files
None required - all fixes can be made to existing files.

## Step by Step Tasks

### Step 1: Fix Gradient Submit Button Background
- Read `components/ai-elements/prompt-input.tsx` lines 930-965
- Locate GradientSubmitButton component (line 930)
- Replace `bg-gradient-brand` Tailwind class with inline style
- Add `style={{ background: 'var(--gradient-brand)' }}` to button element (line 936)
- Keep all other className styles intact
- Test submit button renders with gradient background

### Step 2: Add Custom Color Tokens to Tailwind Theme
- Read `app/globals.css` lines 5-50 (@theme inline block)
- Add custom text color mappings to theme configuration:
  ```css
  --color-text-primary: #151022;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  ```
- Add any other missing color tokens needed for the design system
- Verify theme configuration includes all custom tokens used in components

### Step 3: Test Text Color Rendering
- Navigate to http://localhost:3001/onboarding
- Verify "How do I get one?" heading renders as dark text (#151022)
- Verify description text renders as dark text
- Confirm NO purple background overlay on text
- Check all 12 occurrences of `text-text-primary` class render correctly

### Step 4: Verify Gradient Button Renders
- Check submit button (arrow icon) at bottom right of input
- Confirm gradient background (purple to orange) is visible
- Test hover states work correctly
- Verify button maintains circular shape and icon visibility

### Step 5: Run Validation Commands
- Execute all validation commands to ensure zero regressions
- Verify visual rendering matches design specifications
- Check all widget phases (0-17) render correctly

## Validation Commands
Execute every command to validate the bug is fixed with zero regressions.

- `bun run dev` - Start development server
- Navigate to http://localhost:3001/onboarding (or :3000) and visually verify:
  - Text "How do I get one?" displays as dark text on light background (NO purple overlay)
  - Description text displays as dark text on light background
  - Submit button (arrow) shows purple-to-orange gradient background
  - All text throughout widget phases is readable with proper colors
  - Gradient placeholder text still works (previous fix)
  - Gradient border still works on collapsed widget (previous fix)
- `bun run build` - Verify production build succeeds without errors
- `bun run lint` - Verify no linting errors introduced

## Notes

### Tailwind CSS v4 Theme System
Tailwind CSS v4 uses a new `@theme inline` directive instead of `tailwind.config.js`. All custom tokens must be explicitly mapped in this block for Tailwind to generate utility classes.

**Theme Structure**:
```css
@theme inline {
  --color-custom-name: var(--css-variable-name);
}
```

This makes `text-custom-name` and `bg-custom-name` utilities available.

### Gradient Background in Tailwind v4
Tailwind v4 does not support arbitrary gradient backgrounds via utility classes like `bg-gradient-brand`. There are two solutions:

**Option A**: Inline styles (recommended for complex gradients)
```tsx
style={{ background: 'var(--gradient-brand)' }}
```

**Option B**: Register as custom utility in @theme
```css
@theme inline {
  --color-gradient-brand: linear-gradient(90deg, #6F61EF 0%, #E19736 100%);
}
```
Then use: `className="bg-gradient-brand"`

For this fix, we'll use **Option A** (inline styles) for consistency with the GradientPlaceholderInput fix.

### Design Token Consistency
The custom design tokens are defined in `:root` (lines 52-193) but need to be mapped in `@theme inline` (lines 5-50) for Tailwind to recognize them. This is a one-time setup that will benefit all future component development.

### Alternative Investigation
If adding theme mappings doesn't resolve the text color issue, the purple background might be coming from:
1. StreamingText component's motion.span styling
2. Parent container background bleeding through
3. CSS specificity issues with framer-motion

Check `components/widgets/onboarding-widget/onboarding-widget.tsx:83-99` for any background styling in the StreamingText motion variants.
