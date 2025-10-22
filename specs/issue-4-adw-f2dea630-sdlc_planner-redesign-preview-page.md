# Feature: Redesign Preview Page - Gizmo-Style Mobile Editor Interface

## Feature Description
Transform the current basic preview page (`/preview/{slug}`) into a mobile-first editing experience with live preview, matching the Gizmo app aesthetic. The redesign features a centered mobile device frame container showing the user's microsite preview, with bottom editing controls including a rounded input field and navigation tabs for future customization features. The interface prioritizes visual appeal and user experience while using the existing component library and maintaining responsive design principles.

## User Story
As a gist creator who has completed the onboarding flow
I want to see my generated microsite displayed in a realistic mobile preview with editing controls
So that I can visualize how my content looks on mobile devices and prepare for future customization features

## Problem Statement
The current preview page at `/preview/{slug}` is a basic placeholder with static content and no visual preview capabilities. Users who complete onboarding are directed to this page but encounter:
1. No realistic mobile preview of their generated microsite
2. No visual representation of how their widget will appear
3. Basic placeholder UI that doesn't match the expected Gizmo-style interface
4. Missing bottom control interface for future editing functionality
5. No device frame context to understand mobile presentation

This creates a disappointing user experience where the preview page feels incomplete and doesn't provide the expected professional mobile editing interface.

## Solution Statement
Build a complete visual redesign of the preview page that:
1. **Mobile Device Frame**: Center a rounded iPhone-style container (40px border-radius) representing a mobile device viewport
2. **Responsive Preview Container**: Scale appropriately across screen sizes while maintaining mobile aspect ratio
3. **Demo Content**: Display placeholder microsite content (similar to Rolex Explorer II example) inside the device frame
4. **Bottom Control Bar**: Fixed bottom interface with rounded input field and navigation tabs
5. **Navigation Tabs**: Row of icon buttons (Colors, Tweaks, Images, Sounds, Text, Arrow) styled as placeholders
6. **Professional Styling**: Dark theme with elevated shadows and clean typography matching Gizmo aesthetic
7. **Existing Components**: Leverage current brand components like `prompt-input.tsx` and button systems

**Tech Stack Compliance**: This solution uses only approved technologies (Bun, Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui). No new dependencies required - all functionality can be achieved with existing components and CSS.

## Relevant Files
Use these files to implement the feature:

**Existing Files to Modify:**

- **`app/preview/[slug]/page.tsx`** - Current placeholder preview page that needs complete redesign to implement mobile-first interface with device frame and bottom controls
- **`components/ai-elements/prompt-input.tsx`** - Existing input component mentioned in requirements; will be adapted for the "Make an edit..." input field in bottom control bar  
- **`components/ui/button.tsx`** - shadcn/ui Button component for navigation tabs and controls
- **`app/globals.css`** - Contains design tokens including gradients, colors, shadows, and border radius values needed for styling

**Files for Reference:**

- **`components/ui/input.tsx`** - shadcn/ui Input component for reference if prompt-input.tsx needs modifications
- **`app/layout.tsx`** - Main app layout to understand theme provider and font setup
- **`CLAUDE.md`** - Project guidelines and component patterns to follow

### New Files

**`components/preview/mobile-device-frame.tsx`**
- Mobile device frame component with iPhone-style appearance
- Rounded container (40px border-radius) with subtle shadow/glow
- Responsive scaling for different screen sizes
- Props for children content and device variant

**`components/preview/demo-microsite.tsx`** 
- Placeholder microsite content component
- Product card layout similar to Rolex Explorer II example
- Header, hero image, product title, CTA button structure
- Clearly marked as temporary demo content

**`components/preview/bottom-control-bar.tsx`**
- Fixed bottom control interface container
- Houses input section and navigation tabs
- Proper z-index and responsive positioning

**`components/preview/edit-input-section.tsx`**
- Rounded input field with "Make an edit..." placeholder
- Lightbulb icon on right side
- Dark gray background (#2C2C2E) styling
- Integrates with existing prompt-input component

**`components/preview/navigation-tabs.tsx`**
- Row of icon buttons with labels
- Colors (palette), Tweaks (sliders with "2" badge), Images, Sounds, Text, Arrow
- Icons positioned above labels
- Hover and active states for better UX
- All tabs are placeholders (no functionality)

## Implementation Plan
**IMPORTANT**: All implementation must strictly follow the Tech Stack Requirements (Bun, Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui).

### Phase 1: Foundation
Create the core components and establish the visual design system for the mobile preview interface. This includes setting up the device frame component and demo content structure that will form the foundation for all other elements.

### Phase 2: Core Implementation  
Build the main preview page layout integrating the device frame with demo content, implement the bottom control bar with input section and navigation tabs, and ensure responsive behavior across different screen sizes.

### Phase 3: Integration
Polish the user interface with proper styling, shadows, animations, and responsive behavior. Connect all components into the main preview page and ensure the design matches the Gizmo aesthetic requirements while maintaining accessibility and performance standards.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Create Mobile Device Frame Component
- Create `components/preview/mobile-device-frame.tsx`
- Build iPhone-style frame container with 40px border-radius
- Add subtle shadow and elevated appearance using CSS custom properties from globals.css
- Implement responsive scaling: full mobile on small screens, proportional scaling on desktop
- Add device chrome elements: status bar, home indicator, camera notch
- Export component with TypeScript interface for props (children, variant)
- Test component in isolation to ensure proper scaling and appearance

### Step 2: Create Demo Microsite Content Component
- Create `components/preview/demo-microsite.tsx` 
- Build placeholder product card layout inspired by Rolex Explorer II example
- Include header navigation bar, hero image placeholder, product title, description, CTA button
- Use existing design tokens from globals.css for colors and typography
- Make content clearly identifiable as temporary demo content
- Implement proper semantic HTML structure with accessibility considerations
- Export component with clear JSDoc documentation marking it as placeholder

### Step 3: Create Bottom Control Bar Container
- Create `components/preview/bottom-control-bar.tsx`
- Implement fixed positioning at viewport bottom with proper z-index
- Create container for input section and navigation tabs
- Ensure bar stays visible during scrolling and maintains position
- Add dark theme styling consistent with Gizmo interface
- Handle responsive layout for mobile and desktop
- Export component with slots for input and navigation children

### Step 4: Build Edit Input Section Component
- Create `components/preview/edit-input-section.tsx`
- Integrate existing `prompt-input.tsx` component for consistent styling
- Customize appearance: dark gray background (#2C2C2E), rounded corners
- Add lightbulb icon on right side using lucide-react icons
- Implement "Make an edit..." placeholder text
- Handle input focus states and accessibility requirements
- Export component with proper event handling props (onChange, onSubmit)

### Step 5: Create Navigation Tabs Component
- Create `components/preview/navigation-tabs.tsx`
- Build row of icon buttons using shadcn/ui Button component
- Implement all required tabs: Colors (palette), Tweaks (sliders), Images, Sounds, Text, Arrow
- Add "2" badge to Tweaks tab using CSS positioning and yellow styling
- Position icons above labels with consistent spacing
- Create hover and active states for better user experience
- Make Arrow button slightly larger with circular gray background
- Export component with tab configuration and click handlers

### Step 6: Implement Navigation Tab Icons
- Install lucide-react icons if not already available
- Map each tab to appropriate icon: Palette, Settings/Sliders, Image, Music, Type, ArrowRight
- Ensure consistent icon sizing (16px or 20px) across all tabs
- Implement badge overlay for Tweaks tab with yellow circle and "2" text
- Add proper aria-labels for accessibility
- Test icon rendering and ensure they match Gizmo design reference

### Step 7: Redesign Main Preview Page Layout
- Update `app/preview/[slug]/page.tsx` completely
- Remove existing placeholder content and implement new layout structure
- Add dark theme background and container styling
- Structure layout hierarchy: device frame in center, bottom controls fixed
- Implement responsive grid/flexbox layout for proper positioning
- Add loading state handling for when page first renders
- Export updated page component with proper TypeScript types

### Step 8: Integrate Device Frame with Demo Content
- Import and render MobileDeviceFrame component in preview page
- Pass DemoMicrosite component as children to device frame
- Ensure demo content renders properly within device boundaries  
- Test scrollable behavior if content exceeds viewport height
- Verify responsive scaling works across different screen sizes
- Add proper spacing and alignment within device frame

### Step 9: Integrate Bottom Control Bar
- Import and render BottomControlBar component in preview page
- Add EditInputSection and NavigationTabs as children
- Ensure fixed positioning works correctly with device frame layout
- Test z-index stacking to ensure controls appear above other content
- Verify responsive behavior on mobile and desktop
- Add smooth animations for any state changes

### Step 10: Apply Gizmo-Style Theme and Styling
- Implement dark theme styling using existing CSS custom properties
- Add subtle shadows and glows for elevated appearance
- Apply consistent border radius (40px) to device frame and input elements
- Use design tokens from globals.css for colors, gradients, and spacing
- Ensure typography matches Work Sans font family and sizing scale
- Test visual consistency against Gizmo reference screenshots

### Step 11: Implement Responsive Behavior
- Test layout on mobile devices (320px to 768px width)
- Test layout on tablet devices (768px to 1024px width)  
- Test layout on desktop (1024px and above)
- Ensure device frame scales proportionally while maintaining aspect ratio
- Verify bottom controls remain accessible and properly sized
- Add CSS media queries as needed for optimal responsive behavior

### Step 12: Add Interactive States and Accessibility
- Implement hover states for all interactive elements (buttons, input)
- Add focus states with proper focus ring styling for keyboard navigation
- Include aria-labels and semantic HTML for screen reader accessibility
- Test keyboard navigation through all interactive elements
- Ensure color contrast meets WCAG 2.1 AA standards
- Add touch-friendly sizing for mobile interactions (44px minimum)

### Step 13: Polish Visual Details and Animations
- Add subtle animations for hover states using CSS transitions
- Implement smooth scaling animations for responsive breakpoints
- Add loading animations or skeletons for initial page load
- Polish spacing, alignment, and visual hierarchy
- Test animation performance on mobile devices
- Ensure animations respect user's reduced motion preferences

### Step 14: Cross-Browser and Device Testing
- Test in Chrome, Firefox, Safari, and Edge browsers
- Test on iOS Safari and Android Chrome for mobile compatibility
- Verify device frame appearance across different browsers
- Test responsive behavior and touch interactions on real devices  
- Check for any layout shifts or rendering issues
- Validate CSS custom property support and fallbacks

### Step 15: Validation Commands
Execute every command to validate the feature works correctly with zero regressions:

- `bun test` - Run all tests to validate feature works with zero regressions
- `bun run lint` - Ensure code meets linting standards  
- `bun run build` - Verify Next.js application builds successfully
- `bun run dev` - Start development server and test preview page
- Manual test: Navigate to `/preview/test-slug` and verify new mobile interface loads
- Manual test: Verify device frame displays with demo content properly scaled
- Manual test: Test bottom control bar positioning and input functionality
- Manual test: Verify navigation tabs render with icons and hover states
- Manual test: Test responsive behavior across mobile, tablet, and desktop
- Manual test: Verify accessibility with keyboard navigation and screen readers

## Testing Strategy

### Unit Tests
**Mobile Device Frame Component** (`components/preview/mobile-device-frame.test.tsx`):
- Test component renders children correctly within device frame
- Test responsive scaling props and CSS classes applied
- Test device chrome elements (status bar, notch) render correctly
- Test TypeScript interfaces and prop validation

**Demo Microsite Component** (`components/preview/demo-microsite.test.tsx`):
- Test placeholder content renders with proper semantic structure
- Test styling classes applied correctly
- Test accessibility attributes present (alt text, headings, labels)

**Bottom Control Bar Component** (`components/preview/bottom-control-bar.test.tsx`):
- Test fixed positioning classes applied correctly
- Test z-index and responsive behavior
- Test children slots render properly

### Integration Tests
**Edit Input Section** (`components/preview/edit-input-section.test.tsx`):
- Test integration with prompt-input.tsx component
- Test placeholder text and icon rendering
- Test event handling (onChange, onSubmit)
- Test focus and accessibility states

**Navigation Tabs Component** (`components/preview/navigation-tabs.test.tsx`):
- Test all tabs render with correct icons and labels
- Test badge appearance on Tweaks tab
- Test hover and active states
- Test click event handling and accessibility

**Preview Page Integration** (`app/preview/[slug]/page.test.tsx`):
- Test page renders without errors
- Test all components integrate correctly
- Test responsive layout behavior
- Test dark theme styling applied

### Edge Cases
1. **Small Screen Sizes**:
   - Device frame scales properly on very small mobile screens (320px width)
   - Bottom controls remain accessible and don't overlap content
   - Typography remains readable at small sizes

2. **Large Screen Sizes**:
   - Device frame maintains aspect ratio and doesn't become too large
   - Layout remains centered and visually balanced
   - All interactive elements maintain proper sizing

3. **Content Overflow**:
   - Demo content that exceeds device frame height scrolls properly
   - Bottom controls remain fixed and don't interfere with scrolling
   - No layout shifts or content clipping

4. **Accessibility**:
   - Screen readers can navigate through all elements
   - Keyboard navigation works for all interactive elements  
   - High contrast mode preserves visual hierarchy
   - Focus indicators are clearly visible

5. **Performance**:
   - Large device frame images or complex styling don't impact load times
   - Animations perform smoothly on mobile devices
   - Component renders efficiently without unnecessary re-renders

## Acceptance Criteria
1. ✅ Preview page displays with mobile device frame container centered on screen
2. ✅ Device frame has 40px border-radius and subtle shadow for elevated appearance
3. ✅ Demo microsite content renders inside device frame with product card layout
4. ✅ Bottom control bar appears fixed at bottom with dark theme styling
5. ✅ Edit input section shows "Make an edit..." placeholder with lightbulb icon
6. ✅ Navigation tabs display all required icons (Colors, Tweaks, Images, Sounds, Text, Arrow)
7. ✅ Tweaks tab shows yellow "2" badge positioned top-right of icon
8. ✅ Arrow button appears larger with circular gray background
9. ✅ All navigation tabs are placeholders (no functionality, just visual)
10. ✅ Interface is fully responsive across mobile, tablet, and desktop screen sizes
11. ✅ Device frame scales proportionally while maintaining mobile aspect ratio
12. ✅ Hover states work on all interactive elements
13. ✅ Dark theme colors and styling match Gizmo aesthetic reference
14. ✅ Typography uses Work Sans font family and consistent sizing scale
15. ✅ All components integrate with existing shadcn/ui design system
16. ✅ Accessibility standards met (WCAG 2.1 AA compliance)
17. ✅ Cross-browser compatibility verified in major browsers
18. ✅ Touch interactions work properly on mobile devices
19. ✅ Layout maintains visual hierarchy and professional appearance
20. ✅ Zero regressions: all existing functionality continues to work

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `bun test` - Run all tests to validate feature works with zero regressions
- `bun run lint` - Ensure code meets linting standards
- `bun run build` - Verify Next.js application builds successfully  
- `bun run dev` - Start development server for manual testing
- Manual test: Navigate to `/preview/test-slug` and verify mobile interface loads correctly
- Manual test: Verify device frame displays with proper dimensions and styling
- Manual test: Test demo content appears correctly within device frame
- Manual test: Verify bottom control bar is fixed and positioned correctly
- Manual test: Test edit input field with placeholder text and lightbulb icon
- Manual test: Verify all navigation tabs display with correct icons and labels
- Manual test: Test responsive behavior by resizing browser window
- Manual test: Test on mobile device using localhost tunnel or deployed version
- Manual test: Verify accessibility with keyboard navigation
- Manual test: Test hover states on desktop and touch interactions on mobile

## Notes

### Design Reference Consistency
- The implementation follows the uploaded Gizmo screenshot reference showing the Rolex microsite example
- Mobile device frame mimics iPhone dimensions (roughly 375px × 812px aspect ratio)
- Bottom control interface matches the dark theme with rounded input and icon tabs layout
- All visual elements maintain the clean, professional aesthetic shown in reference

### Component Reusability
- Mobile device frame component can be reused for other preview contexts
- Navigation tabs component is designed for easy extension when functionality is added
- Demo microsite component can be replaced with actual gist content in future iterations
- Bottom control bar architecture supports adding new control types

### Future Enhancement Preparation  
- Navigation tabs are structured to easily add click handlers and functionality
- Input section is ready for integration with AI editing capabilities
- Device frame supports different device types (iPhone, Android) through variant prop
- State management hooks can be added without changing component interfaces

### Performance Considerations
- All components use React.memo where appropriate to prevent unnecessary re-renders
- CSS custom properties are used instead of inline styles for better performance
- Images and assets are optimized for quick loading
- Animations use CSS transforms for hardware acceleration on mobile devices

### Accessibility Features
- All interactive elements have proper ARIA labels and roles
- Color contrast ratios meet WCAG 2.1 AA standards
- Keyboard navigation works through all interface elements
- Screen reader compatibility verified with semantic HTML structure
- Focus indicators are clearly visible for all interactive elements