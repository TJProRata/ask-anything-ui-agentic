# Bug: Missing Collapsed State in Onboarding Widget

## Bug Description

The migrated OnboardingWidget is missing the initial collapsed state that existed in the source `onboardingwidget_october16` project.

**Expected Behavior (Source Project)**:
1. Widget starts in collapsed state showing "Ask" button
2. User clicks "Ask" → widget animates to show "How do I get one?"
3. User clicks again → widget fully expands to show all onboarding phases

**Actual Behavior (Current Migration)**:
1. Widget starts fully expanded, bypassing the collapsed states
2. User immediately sees the "How do I get one?" phase (first phase)
3. No way to collapse back to minimal "Ask" button state

**Impact**:
- Poor UX - widget takes up too much screen space immediately
- Breaks expected interaction flow
- Users don't get the gradual progressive disclosure experience

## Problem Statement

The OnboardingWidget component was migrated with `isExpanded` controlled from the parent (`app/onboarding/page.tsx`) which defaults to `true`, completely bypassing the GlassWidgetContainer's built-in collapsed state management. The GlassWidgetContainer supports both collapsed and intermediate states, but the OnboardingWidget is not utilizing this functionality.

## Solution Statement

Modify the demo page (`app/onboarding/page.tsx`) to initialize the widget in collapsed state (`isExpanded={false}`) instead of expanded state. This is a minimal fix that restores the expected user flow without changing the OnboardingWidget component itself.

The GlassWidgetContainer already handles the state transitions:
- Collapsed → Intermediate ("How do I get one?") → Fully Expanded (phases)
- The intermediate state is managed internally via `showIntermediateExpansion`
- All animation logic is already in place

## Steps to Reproduce

1. Start the development server: `bun run dev`
2. Navigate to `http://localhost:3000/onboarding`
3. **Observe**: Widget is immediately fully expanded showing phases
4. **Expected**: Widget should show collapsed "Ask" button initially

## Root Cause Analysis

**File**: `app/onboarding/page.tsx` (Line 7)

```typescript
const [isExpanded, setIsExpanded] = useState(true); // ❌ BUG: Starts expanded
```

**Analysis**:
- The demo page was created during migration with `useState(true)` to immediately showcase the widget
- This overrides the GlassWidgetContainer's default collapsed behavior
- The source project uses `defaultExpanded={false}` or controlled `isExpanded={false}` initially
- GlassWidgetContainer has proper animation logic for collapsed → intermediate → expanded transitions
- The intermediate state (showing "How do I get one?") is controlled by internal `showIntermediateExpansion` state
- When collapsed, clicking shows "How do I get one?" briefly before expanding

**Supporting Evidence**:
- `glass_widget_container.tsx:104` - DefaultCollapsedButton shows "Ask" when not animating
- `glass_widget_container.tsx:104` - Shows "How do I get one?" during intermediate animation
- `glass_widget_container.tsx:44` - `collapsedContent` prop allows custom collapsed state
- `glass_widget_container.tsx:54` - `defaultExpanded` defaults to `false`

## Relevant Files

### Files to Modify

**`app/onboarding/page.tsx`**
- Currently initializes widget as expanded (`useState(true)`)
- Needs to be changed to collapsed (`useState(false)`)
- This is the ONLY file that needs modification
- Line 7: `const [isExpanded, setIsExpanded] = useState(true);`

### Files for Reference (No Changes Needed)

**`components/ai-elements/glass_widget_container.tsx`**
- Already implements collapsed/intermediate/expanded state logic
- DefaultCollapsedButton (lines 90-108) handles "Ask" → "How do I get one?" transition
- No changes needed - working correctly

**`components/widgets/onboarding-widget/onboarding-widget.tsx`**
- Passes through `isExpanded` and `onExpandChange` props correctly
- Uses GlassWidgetContainer properly
- No changes needed - working correctly

## Step by Step Tasks

### Step 1: Fix Initial State
- Open `app/onboarding/page.tsx`
- Change line 7 from `const [isExpanded, setIsExpanded] = useState(true);`
- To: `const [isExpanded, setIsExpanded] = useState(false);`
- This single line change restores the expected collapsed → intermediate → expanded flow

### Step 2: Verify the Fix
- Start dev server: `bun run dev`
- Navigate to `/onboarding`
- Verify widget shows "Ask" button in collapsed state
- Click "Ask" → should briefly show "How do I get one?" then expand
- Click close (X) → should collapse back to "Ask"
- Verify all animations work smoothly

### Step 3: Test Edge Cases
- Multiple expand/collapse cycles
- Fast clicking (animation interruption)
- Browser resize while collapsed/expanded
- Keyboard navigation (if applicable)

### Step 4: Run Validation Commands
- Execute all validation commands listed below
- Ensure zero regressions
- Verify build still succeeds

## Validation Commands

Execute every command to validate the bug is fixed with zero regressions.

**Before Fix (Reproduce Bug)**:
- `bun run dev` - Start server
- Navigate to `http://localhost:3000/onboarding`
- **Observe**: Widget is fully expanded immediately (BUG)

**After Fix (Verify Fix)**:
- `bun run dev` - Start server
- Navigate to `http://localhost:3000/onboarding`
- **Verify**: Widget shows "Ask" button in collapsed state ✅
- Click "Ask" → Widget shows "How do I get one?" briefly then expands ✅
- Click X to close → Widget collapses back to "Ask" ✅

**Regression Testing**:
- `bun run lint` - Ensure no linting errors introduced
- `bun run build` - Verify production build succeeds
- Test all 15 onboarding phases still work correctly when expanded
- Verify carousel navigation still functions
- Verify all animations are smooth

**Manual Test Checklist**:
- [ ] Widget starts collapsed showing "Ask"
- [ ] Clicking "Ask" shows intermediate "How do I get one?" state
- [ ] Widget expands to show full phase content
- [ ] All 15 phases are accessible and functional
- [ ] Closing widget returns to collapsed "Ask" state
- [ ] Multiple expand/collapse cycles work without issues
- [ ] No console errors
- [ ] Animations are smooth and performant

## Notes

### Why This is the Minimal Fix

This is a **one-line change** that fixes the root cause without modifying any component logic:
- GlassWidgetContainer already has all the necessary state management
- OnboardingWidget already passes props correctly
- Only the demo page initialization was wrong

### Alternative Solutions Considered

**❌ Modify OnboardingWidget Component**:
- Would require adding internal state management
- More complex and error-prone
- Breaks the controlled component pattern
- Not the root cause

**❌ Modify GlassWidgetContainer**:
- Already works correctly
- Would break other potential use cases
- Not the root cause

**✅ Fix Demo Page State (CHOSEN)**:
- Minimal change (1 line)
- Fixes root cause directly
- Preserves component flexibility
- No risk to existing functionality

### Future Enhancements

After this fix, consider:
1. Add documentation about initial state expectations
2. Create additional demo pages showing different initial states
3. Add prop validation/warnings for common mistakes
4. Consider adding a `defaultCollapsed` convenience prop to OnboardingWidget wrapper

### Preserved Functionality

This fix preserves all existing features:
- All 15 onboarding phases work identically
- Carousel navigation unchanged
- Progress tracking unchanged
- All animations work as designed
- GlassWidgetContainer's intermediate state works correctly
- Controlled component pattern maintained
