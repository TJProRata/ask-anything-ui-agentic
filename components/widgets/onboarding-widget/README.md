# OnboardingWidget

Interactive multi-phase onboarding experience with AI-powered assistance, progress tracking, and voice testing capabilities. This widget serves as a **demo/showcase component** to demonstrate UI patterns and animations.

> **Note**: For production gist creation workflows, use the **[GistCreationWidget](../gist-creation-widget/)** component instead, which provides a specialized 10-step flow with API integration and Convex database persistence.

## Features

- 🎯 15-phase guided onboarding flow
- 🎨 Glass morphism UI with gradient accents
- 📊 Progress tracking and readiness scoring
- 🎤 Voice mode testing (Phase 15)
- 🎠 Carousel-based phase navigation
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design

## Usage

### Demo Mode (Default)

```tsx
import { OnboardingWidget } from "@/components/widgets/onboarding-widget/onboarding-widget";
import { useState } from "react";

function MyPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <OnboardingWidget
      isExpanded={isExpanded}
      onExpandChange={setIsExpanded}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isExpanded` | `boolean` | Yes | Controls widget expand/collapse state |
| `onExpandChange` | `(expanded: boolean) => void` | Yes | Callback when state changes |

## Environment Variables

```bash
# Optional CDN base URL for GIF assets
NEXT_PUBLIC_CDN_BASE_URL=https://your-cdn.vercel.app
```

If not set, assets load from `/assets/` in the public directory.

## Required Assets

Place these GIFs in `public/assets/`:
- `celebration.gif` - Success animation (Phase 15)
- `preview.gif` - Preview animation (Phases 8-10)

## Architecture

### Components Structure

```
onboarding-widget/
├── onboarding-widget.tsx  # Main component
├── types.ts               # TypeScript definitions
└── README.md             # This file
```

### Dependencies

The widget uses these AI-specific components:
- `ai-elements/glass-widget-container` - Glass morphism container
- `ai-elements/dual-phase-progress` - Dual progress indicator
- `ai-elements/prompt-input` - Gradient input field
- `ai-elements/readiness-score-gauge` - Circular gauge
- `ai-elements/simple-progress-bar` - Linear progress
- `ai-elements/success-phase` - Success state
- `ai-elements/gif-housing` - GIF container
- `animations/searching-animation` - Loading state
- `icons/blue-star` - Custom star icon
- `icons/wand` - Custom wand icon

## Phase Flow

1. **Phase 1-4**: Initial setup and configuration
2. **Phase 5-7**: AI assistant integration
3. **Phase 8-10**: Preview and testing
4. **Phase 11-14**: Advanced features
5. **Phase 15**: Voice mode testing and completion

See [PHASES.md](../../../docs/widgets/onboarding-widget/PHASES.md) for detailed phase documentation.

## Styling

The widget uses CSS variables defined in `app/globals.css`:
- Brand colors: `--color-brand-purple`, `--color-brand-orange`, `--color-brand-teal`
- Typography: Work Sans font family
- Gradients: `--gradient-brand`, `--gradient-brand-reverse`

## Demo

Visit `/onboarding` to see the widget in action.
