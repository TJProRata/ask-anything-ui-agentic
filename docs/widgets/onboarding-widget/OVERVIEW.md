# OnboardingWidget Overview

Complete documentation for the OnboardingWidget component system.

## Architecture

The OnboardingWidget is a complex multi-phase interactive experience that guides users through setup and configuration. It's built with Next.js 15, React 19, and Framer Motion animations.

### Component Hierarchy

```
OnboardingWidget (Main Orchestrator)
├── GlassWidgetContainer (Glass morphism UI)
│   ├── GlassWidgetHeader (Title + Close)
│   ├── GlassWidgetContent (Phase content)
│   └── GlassWidgetFooter (Navigation)
├── Carousel (Phase navigation)
│   └── CarouselItem (Individual phases)
├── DualPhaseProgress (Progress indicator)
├── ReadinessScoreGauge (Circular gauge)
├── SimpleProgressBar (Linear progress)
├── PromptInput (User input fields)
├── SuccessPhase (Completion state)
└── PhaseNavigation (Prev/Next controls)
```

## State Management

### Primary State

```typescript
interface OnboardingWidgetProps {
  isExpanded: boolean;        // Widget visibility
  onExpandChange: (expanded: boolean) => void;
}
```

### Internal State

- `currentPhase` (1-15) - Active phase number
- `carouselApi` - Embla carousel instance
- `userResponses` - User input and selections
- `animationStates` - Animation completion tracking

## Phase System

The widget consists of 15 distinct phases:

1. **Welcome & Setup** (Phases 1-4)
2. **AI Integration** (Phases 5-7)
3. **Preview & Testing** (Phases 8-10)
4. **Advanced Features** (Phases 11-14)
5. **Voice Testing & Completion** (Phase 15)

Each phase can have:
- Custom UI components
- User input fields
- Progress indicators
- Navigation controls

## Animation System

Uses Framer Motion for:
- **Layout animations** - Phase transitions
- **Stagger animations** - Text streaming effects
- **Exit animations** - Smooth unmounting
- **Gesture handling** - Carousel swipes

Key animation patterns:
```typescript
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};
```

## Asset Management

### GIF Assets

Required assets in `public/assets/`:
- `celebration.gif` (23MB) - Success celebration
- `preview.gif` (520KB) - Feature preview

### CDN Strategy

```typescript
// Development: Uses /assets/ from public/
const assetUrl = `${process.env.NEXT_PUBLIC_CDN_BASE_URL || ''}/assets/celebration.gif`;

// Production: Set NEXT_PUBLIC_CDN_BASE_URL
// e.g., https://cdn.yourdomain.com
```

## Styling System

### CSS Variables

All colors and typography use CSS variables from `app/globals.css`:

```css
/* Brand Colors */
--color-brand-purple: #6F61EF;
--color-brand-orange: #E19736;
--color-brand-teal: #36E1AE;

/* Typography */
--font-size-heading: 1.375rem;
--line-height-heading: 1.4;
--letter-spacing-heading: 0.02em;

/* Gradients */
--gradient-brand: linear-gradient(90deg, #6F61EF 0%, #E19736 100%);
```

### Responsive Design

The widget adapts to:
- **Mobile** (320px+) - Stacked layout, touch gestures
- **Tablet** (768px+) - Optimized spacing
- **Desktop** (1024px+) - Full experience

## Integration Patterns

### Next.js Page

```tsx
"use client";

import { OnboardingWidget } from "@/components/widgets/onboarding-widget/onboarding-widget";
import { useState } from "react";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <OnboardingWidget
      isExpanded={isExpanded}
      onExpandChange={setIsExpanded}
    />
  );
}
```

### Widget Bundle (Future)

The component is structured to support IIFE bundling via `scripts/build.widget.ts`:

1. Add OnboardingWidget to bundle entry
2. Configure Shadow DOM styles
3. Test animations within Shadow root
4. Deploy to CDN

## Performance Considerations

### Bundle Size

Current component size:
- Main component: ~1100 lines
- Dependencies: framer-motion (~60KB gzipped), embla-carousel
- Assets: GIFs loaded on-demand

### Optimization Strategies

1. **Lazy loading** - Load GIFs only when phase is active
2. **Animation cleanup** - Remove motion components after animation
3. **Code splitting** - Potential to split phases into separate chunks
4. **Asset optimization** - Consider WebP/AVIF formats for smaller sizes

## Accessibility

- **Keyboard navigation** - Tab through phases, Escape to close
- **ARIA labels** - All interactive elements labeled
- **Focus management** - Proper focus trapping within widget
- **Screen readers** - Semantic HTML and ARIA live regions

## Browser Support

Tested and supported:
- Chrome 80+
- Firefox 80+
- Safari 13+
- Edge 80+

Requires:
- CSS custom properties
- Flexbox/Grid
- ES2017+ JavaScript

## Testing

See test files in `tests/`:
- Unit tests for individual components
- Integration tests for phase navigation
- E2E tests for complete flow (future)

## Future Enhancements

1. **API Integration** - Connect to backend for data persistence
2. **Analytics** - Track phase completion and drop-off
3. **A/B Testing** - Test different phase flows
4. **Internationalization** - Multi-language support
5. **Theme System** - Light/dark mode integration
6. **Widget Bundle** - IIFE export for third-party embedding
