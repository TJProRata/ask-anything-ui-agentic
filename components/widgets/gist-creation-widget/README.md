# GistCreationWidget

Production-ready 10-step onboarding widget for creating shareable mini-sites (gists) with API integration and Convex database persistence.

## Features

- 🎯 10-step gist creation flow with 3-tap choices
- 📝 Form state management with validation
- 🔗 API integration with `/api/create-preview`
- 💾 Convex database persistence
- ✨ Smooth animations and transitions
- 🎨 Glass morphism UI with gradient accents
- 📱 Fully responsive design
- ⚡ Real-time slug generation from title
- 🔄 Loading and error states

## Usage

### Basic Setup

```tsx
import { GistCreationWidget } from "@/components/widgets/gist-creation-widget/gist-creation-widget";
import { useState } from "react";
import { useRouter } from "next/navigation";

function GistPlatformPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGistCreated = (data) => {
    // Redirect to preview page
    router.push(data.previewUrl);
  };

  return (
    <GistCreationWidget
      isExpanded={isExpanded}
      onExpandChange={setIsExpanded}
      onComplete={handleGistCreated}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isExpanded` | `boolean` | Yes | Controls widget expand/collapse state |
| `onExpandChange` | `(expanded: boolean) => void` | Yes | Callback when state changes |
| `onComplete` | `(data: CreatePreviewResponse) => void` | No | Callback when gist is created successfully |
| `onStepChange` | `(step: number) => void` | No | Callback for step transitions (analytics) |

## 10-Step Flow

1. **Type Selection** - Person / Product / Place
2. **Identity** - Name/title + auto-generated slug
3. **Goal** - Book a call / Buy now / Join waitlist
4. **Audience** - Prospects / Fans / Investors
5. **Vibe** - Friendly / Professional / Bold
6. **Source URL** - Content source (triggers API call)
7. **Hero Style** - Image / Video / Gradient
8. **CTA Placement** - Floating / Inline / Sidebar
9. **Preview Choice** - Preview now / Edit headline / Change colors
10. **Publish Decision** - Private link / Public / Finish later

## API Integration

After Step 6 (Source URL), the widget:
1. Collects all form data via `use-gist-form` hook
2. POSTs to `/api/create-preview` with user inputs
3. Shows validation transition animation (spinner → checkmark)
4. Receives preview URL from API response
5. Calls `onComplete` callback with response data

### API Response Format

```typescript
interface CreatePreviewResponse {
  success: boolean;
  previewUrl: string;  // e.g., "/preview/my-cool-product"
  slug: string;        // e.g., "my-cool-product"
  gistId: string;      // Convex document ID
}
```

## Form State Management

Uses `use-gist-form` hook for state management:

```typescript
const { state, dispatch, canSubmit, errors, toGistCreationData } = useGistForm();
```

### Form State

```typescript
interface GistFormState {
  type: "person" | "product" | "place" | null;
  title: string;
  slug: string;  // Auto-generated from title
  goal: "book" | "buy" | "waitlist" | null;
  audience: "prospects" | "fans" | "investors" | null;
  vibe: "friendly" | "professional" | "bold" | null;
  source_url: string;
  hero_style: "image" | "video" | "gradient" | null;
  cta_placement: string;
  preview_choice: string;
  publish_decision: string;
}
```

## Architecture

### Components Structure

```
gist-creation-widget/
├── gist-creation-widget.tsx  # Main component
└── README.md                  # This file
```

### Dependencies

- `hooks/use-gist-form` - Form state management hook
- `lib/generator` - Content generation utilities
- `lib/gist-templates` - Template generation functions
- `lib/logger` - Logging utility
- `ai-elements/glass-widget-container` - Glass morphism UI
- `ai-elements/prompt-input` - Gradient input components
- `animations/searching-animation` - Loading animation

## Validation

Form validation includes:
- Required fields: type, title, slug, goal, audience, vibe, source_url
- URL format validation for source_url
- Slug format validation (lowercase, alphanumeric, hyphens only)
- Auto-sanitization of title to slug

## Error Handling

- Network errors show user-friendly message
- API errors display retry option
- Validation errors prevent form submission
- Loading states during API calls

## Styling

Uses CSS variables from `app/globals.css`:
- Brand colors: `--color-brand-purple`, `--color-brand-orange`, `--color-brand-teal`
- Typography: Work Sans font family
- Gradients: `--gradient-brand`, `--gradient-brand-reverse`

## Live Example

Visit `/gistplatform` to see the widget in action.

## Related Documentation

- [use-gist-form Hook](../../../hooks/use-gist-form.ts) - Form state management
- [API Route](../../../app/api/create-preview/route.ts) - Backend integration
- [Generator](../../../lib/generator.ts) - Content generation
- [Templates](../../../lib/gist-templates.ts) - Template utilities

## Differences from OnboardingWidget

| Feature | OnboardingWidget | GistCreationWidget |
|---------|------------------|-------------------|
| **Purpose** | Demo/showcase | Production gist creation |
| **Steps** | 15 phases | 10 steps |
| **API Integration** | None | Yes (`/api/create-preview`) |
| **Database** | None | Convex persistence |
| **Form State** | None | `use-gist-form` hook |
| **Validation** | None | Full validation |
| **Content Generation** | Mock | Template-based |
| **Output** | Demo only | Preview URL + gist ID |
