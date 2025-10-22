# Gist Creation Onboarding Flow

**ADW ID:** gist-001
**Date:** 2025-01-22
**Specification:** [specs/gist-creation-onboarding-flow.md](../specs/gist-creation-onboarding-flow.md)

## Overview

Implemented a production-ready 10-step onboarding widget for creating shareable mini-sites (gists). The widget collects user input through a streamlined flow, integrates with the `/api/create-preview` endpoint to generate template-based content, persists data to Convex, and redirects users to a preview page for editing.

## What Was Built

- **GistCreationWidget Component** - 10-step onboarding flow with form state management and API integration
- **use-gist-form Hook** - Custom React hook for form state management with validation
- **gist-templates Module** - Template generation utilities for dynamic hero and tile content
- **Content Generator** - Enhanced generator with template-based content creation
- **API Endpoint** - `/api/create-preview` route with full request handling and Convex integration
- **Gist Platform Page** - Entry page at `/gistplatform` for users to create gists
- **Preview Pages** - Dynamic routes for viewing generated gists at `/preview/[slug]`
- **Convex Schema** - Database schema for storing gists with hero and tile data

## Technical Implementation

### Files Created

- `components/widgets/gist-creation-widget/gist-creation-widget.tsx` (577 lines) - Main widget component with 10-step flow
- `components/widgets/gist-creation-widget/README.md` - Component documentation
- `hooks/use-gist-form.ts` (143 lines) - Form state management hook with validation
- `lib/gist-templates.ts` (180 lines) - Template generation utilities for headlines, subheads, and tiles
- `app/gistplatform/page.tsx` (114 lines) - Entry page for gist creation
- `app/preview/[slug]/page.tsx` (81 lines) - Preview page for viewing created gists
- `convex/gists.ts` (213 lines) - Convex mutations and queries for gist persistence
- `convex/schema.ts` (85 lines) - Convex schema definition

### Files Modified

- `components/widgets/onboarding-widget/types.ts` - Added GistCreationData, CreatePreviewResponse interfaces
- `app/api/create-preview/route.ts` - Implemented full POST handler with validation and Convex integration
- `lib/generator.ts` (119 lines) - Enhanced with template-based content generation
- `lib/logger.ts` - Added logging utilities for API, generation, and scraping
- `package.json` - Added convex dependency

### Key Changes

1. **Form State Management** - Implemented `useReducer` pattern with 11 action types for managing gist creation form state, including auto-slug generation from title
2. **API Integration** - Complete request/response flow from widget → API → Convex → preview URL with comprehensive error handling
3. **Template System** - Dynamic content generation based on gist type (person/product/place), goal (book/buy/waitlist), audience (prospects/fans/investors), and vibe (friendly/professional/bold)
4. **Validation** - Multi-layer validation including required fields, URL format, slug format, and form completeness checks
5. **Convex Integration** - Real-time database persistence with schema for hero sections, content tiles, and metadata

## How to Use

### For Users

1. Navigate to `/gistplatform`
2. Complete the 10-step onboarding flow:
   - **Step 1**: Select gist type (Person / Product / Place)
   - **Step 2**: Enter title (slug auto-generates)
   - **Step 3**: Choose goal (Book / Buy / Waitlist)
   - **Step 4**: Select audience (Prospects / Fans / Investors)
   - **Step 5**: Pick vibe (Friendly / Professional / Bold)
   - **Step 6**: Enter source URL (triggers API call)
   - **Step 7-10**: Customize hero, CTA, and preview options
3. After Step 6, widget submits to API and shows validation animation
4. Redirected to `/preview/[slug]` with generated content

### For Developers

```tsx
import { GistCreationWidget } from "@/components/widgets/gist-creation-widget/gist-creation-widget";
import { useRouter } from "next/navigation";

function MyPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGistCreated = (data: CreatePreviewResponse) => {
    // Redirect or show success message
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

## Configuration

### Environment Variables

```bash
# Convex deployment URL (required)
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Optional CDN for assets
NEXT_PUBLIC_CDN_BASE_URL=https://cdn.example.com
```

### Convex Setup

```bash
# Initialize Convex (if not already done)
bunx convex dev

# Database will auto-create tables on first mutation
```

## Testing

### Manual Testing

1. **Complete Flow**:
   ```bash
   bun run dev
   # Open http://localhost:3000/gistplatform
   # Complete all 10 steps
   # Verify redirect to /preview/[slug]
   ```

2. **API Testing**:
   ```bash
   # POST to /api/create-preview with test data
   curl -X POST http://localhost:3000/api/create-preview \
     -H "Content-Type: application/json" \
     -d '{"type":"product","title":"Test Product","slug":"test-product","goal":"buy","audience":"prospects","vibe":"professional","source_url":"https://example.com","userId":"test-user"}'
   ```

3. **Convex Data Verification**:
   - Visit Convex dashboard
   - Check `gists` table for new entries
   - Verify hero and tiles data structure

### Unit Tests (Future)

- Form state reducer logic
- Template generation functions
- Slug generation and sanitization
- Validation logic

## Related Documentation

- [GistCreationWidget Component](../components/widgets/gist-creation-widget/README.md)
- [use-gist-form Hook](../hooks/use-gist-form.ts)
- [Gist Templates](../lib/gist-templates.ts)
- [Generator](../lib/generator.ts)
- [API Route](../app/api/create-preview/route.ts)
- [Convex Schema](../convex/schema.ts)

## Notes

### Current Implementation

- **Template-Based Generation**: Uses predefined templates for hero headlines, subheads, and tiles based on user selections
- **Mock Scraping**: Source URL scraping returns mock metadata (real scraping planned for future)
- **Private Preview**: All gists created with status "preview" (public publishing planned for future)
- **Temporary User ID**: Uses "temp-anonymous-user" (authentication planned for future)

### Future Enhancements

1. **AI-Powered Generation**: Replace templates with Anthropic API for personalized content
2. **Real Scraping**: Use Cheerio/Puppeteer to scrape actual content from source URLs
3. **Authentication**: Integrate Convex Auth or Clerk for user accounts
4. **Public Publishing**: Implement publish workflow (status change from "preview" to "public")
5. **Slug Collision**: Auto-append numbers to duplicate slugs (e.g., my-product-2)
6. **Inline Editing**: Allow headline and color editing in Steps 7-9
7. **Analytics**: Track step completion rates and drop-off points

### Known Limitations

- Steps 7-10 show UI but don't persist preferences yet
- No duplicate slug handling (Convex mutation fails if slug exists)
- No user authentication (all gists belong to "temp-anonymous-user")
- Template-based content lacks personalization
- Source URL scraping returns mock data
