# Unified UI/UX Platform Concepts

> This document outlines initial concepts for a unified ProRata AI UI/UX platform and development pipeline

*08-04-2025*

## Project Overview

Building a unified UI/UX platform that facilitates a product development pipeline with three key stages:

1. **Import**: Takes designs and exported code assets from Figma
2. **Transform**: Implements well-crafted and composed React components
3. **Deploy**: Bundles, packages, and ships components as embeddable widgets

## Tech Stack

- **Runtime & Package Manager**: Bun
- **Framework**: React with Next.js
- **Language**: TypeScript
- **Component Library**: shadcn/ui (built on Radix UI)
- **Hosting**: Vercel
- **Database**: Convex
- **Authentication**: Clerk
- **Styling**: Tailwind CSS

## Initial Focus: AI-Powered Widget

### Widget Specification
- **Initial State**: "Ask" button
- **Interaction**: On click, expands to a larger panel
- **Components**:
  - Text input component
  - List of AI-generated suggestions
  - Smooth transition animations

### Architecture Approach
Using shadcn/ui components as base primitives, then composing them to build the actual widget components.

## Figma Design System Evaluation Framework

### 1. Design Audit Checklist

#### Component Consistency
- Verify similar elements (buttons, inputs, cards) maintain consistent styling across screens
- Check for design pattern reuse and standardization

#### Design Tokens
Systematized values to extract:
- **Colors**: primary, secondary, destructive, muted, background, foreground
- **Typography**: font sizes, weights, line heights, font families
- **Spacing**: consistent padding/margin scale (4px, 8px, 16px, etc.)
- **Border radius**: corner radius values
- **Shadows**: elevation system
- **Animation**: duration and easing curves

#### Component States
All interactive states must be defined:
- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Error/Success states (for form elements)

#### Responsive Behavior
- Breakpoint definitions
- Component adaptation strategies
- Mobile-first considerations

#### Accessibility
- Focus indicators visibility
- Color contrast ratios (WCAG compliance)
- Touch target sizes (minimum 44x44px)
- ARIA patterns consideration

### 2. AI Widget Flow Analysis

#### Transition States
- Button to panel transformation mechanics
- Animation timing and easing
- Intermediate states during expansion

#### Layout Structure
- Component hierarchy
- Spacing relationships
- Grid/flexbox patterns

#### Content States
- Empty state
- Loading state
- Populated state
- Error state
- No results state

#### Interaction Patterns
- Keyboard navigation flow
- Focus management during state changes
- Screen reader announcements

## Technical Implementation Strategy

### 1. Figma-to-Code Workflow

#### Component Structure
```typescript
// components/ai-widget/index.tsx
export { AskButton } from './AskButton'
export { ExpandedPanel } from './ExpandedPanel'
export { AISuggestionsList } from './AISuggestionsList'
export { AIWidget } from './AIWidget'
```

#### Design Token Extraction Tools
- **Figma Tokens Plugin**: For systematic token management in Figma
- **Style Dictionary**: Transform tokens to code
- **Figma API**: Programmatic access to design data

#### Token Mapping System
```typescript
// design-system/tokens.ts
export const tokens = {
  colors: {
    'figma-primary': 'hsl(var(--primary))',
    'figma-surface': 'hsl(var(--card))',
    'figma-surface-variant': 'hsl(var(--muted))'
  },
  spacing: {
    'figma-xs': '0.25rem',  // 4px
    'figma-sm': '0.5rem',   // 8px
    'figma-md': '1rem',     // 16px
    'figma-lg': '1.5rem',   // 24px
    'figma-xl': '2rem'      // 32px
  },
  radii: {
    'figma-sm': 'var(--radius-sm)',
    'figma-md': 'var(--radius)',
    'figma-lg': 'var(--radius-lg)'
  }
}
```

### 2. Component Composition Pattern

```tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

interface AIWidgetProps {
  onSubmit?: (query: string) => void
  suggestions?: Array<{ id: string; text: string }>
}

export function AIWidget({ onSubmit, suggestions = [] }: AIWidgetProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="default" 
          size="icon"
          className="rounded-full shadow-lg"
        >
          <span className="sr-only">Ask AI Assistant</span>
          {/* Icon component */}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>AI Assistant</SheetTitle>
          <SheetDescription>
            Ask me anything. I'm here to help!
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <Input 
            placeholder="Type your question..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onSubmit?.(query)
              }
            }}
          />
          <ScrollArea className="h-[300px] w-full">
            <div className="space-y-2 pr-4">
              {suggestions.map((suggestion) => (
                <Card 
                  key={suggestion.id}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => onSubmit?.(suggestion.text)}
                >
                  <CardContent className="p-3">
                    <p className="text-sm">{suggestion.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

### 3. Widget Embedding Architecture

#### Initialization System
```typescript
// widget/initialize.ts
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './providers/theme-provider'
import { AIWidget } from './components/AIWidget'

interface WidgetConfig {
  containerId: string
  theme?: 'light' | 'dark' | 'system'
  apiKey?: string
  onSubmit?: (query: string) => void
  position?: 'bottom-right' | 'bottom-left'
}

export function initializeWidget(config: WidgetConfig) {
  const container = document.getElementById(config.containerId)
  if (!container) {
    console.error(`Container with id "${config.containerId}" not found`)
    return
  }
  
  const root = createRoot(container)
  root.render(
    <ThemeProvider defaultTheme={config.theme || 'system'}>
      <div className={`fixed ${getPositionClasses(config.position)}`}>
        <AIWidget onSubmit={config.onSubmit} />
      </div>
    </ThemeProvider>
  )
  
  return {
    destroy: () => root.unmount(),
    updateConfig: (newConfig: Partial<WidgetConfig>) => {
      // Re-render with new config
    }
  }
}
```

#### Bundle Strategy
- Use Shadow DOM or iframe for style isolation
- Scope CSS with unique prefixes
- Tree-shake unused shadcn/ui components
- Target bundle size: < 50KB gzipped

### 4. State Management

```typescript
// stores/widget-store.ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface WidgetState {
  isExpanded: boolean
  query: string
  suggestions: Array<{ id: string; text: string }>
  isLoading: boolean
  error: string | null
  
  // Actions
  setExpanded: (expanded: boolean) => void
  setQuery: (query: string) => void
  setSuggestions: (suggestions: Array<{ id: string; text: string }>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useWidgetStore = create<WidgetState>()(
  subscribeWithSelector((set) => ({
    isExpanded: false,
    query: '',
    suggestions: [],
    isLoading: false,
    error: null,
    
    setExpanded: (expanded) => set({ isExpanded: expanded }),
    setQuery: (query) => set({ query }),
    setSuggestions: (suggestions) => set({ suggestions }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () => set({
      query: '',
      suggestions: [],
      isLoading: false,
      error: null
    })
  }))
)
```

## Build & Distribution Pipeline

### Development Workflow
1. **Component Development**: Develop in isolation using Storybook
2. **Testing**: Unit tests with Bun test runner, visual regression tests
3. **Build**: Bundle with Bun, optimize for production
4. **Publish**: Deploy to CDN, version management

### Build Configuration
```typescript
// bun.build.ts
import { build } from 'bun'

await build({
  entrypoints: ['./src/widget/index.ts'],
  outdir: './dist',
  target: 'browser',
  format: 'esm',
  splitting: true,
  minify: true,
  sourcemap: 'external',
  external: ['react', 'react-dom'], // Optional: for smaller bundles
})
```

### Widget Integration Example
```html
<!-- Host website integration -->
<div id="ai-assistant-widget"></div>
<script type="module">
  import { initializeWidget } from 'https://cdn.example.com/widget@1.0.0/index.js'
  
  initializeWidget({
    containerId: 'ai-assistant-widget',
    theme: 'light',
    position: 'bottom-right',
    onSubmit: async (query) => {
      // Handle query submission
      console.log('User query:', query)
    }
  })
</script>
```

## Performance Considerations

1. **Code Splitting**: Lazy load expanded panel components
2. **Bundle Optimization**: 
   - Tree-shake unused components
   - Minimize CSS with PurgeCSS
   - Use dynamic imports for heavy features
3. **Runtime Performance**:
   - Debounce user input
   - Virtual scrolling for long suggestion lists
   - Memoize expensive computations
4. **Caching Strategy**:
   - Cache static assets with long TTL
   - Use service workers for offline support

## Testing Strategy

### Unit Testing
```typescript
// __tests__/AIWidget.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { AIWidget } from '../components/AIWidget'

describe('AIWidget', () => {
  it('expands panel on button click', () => {
    render(<AIWidget />)
    const button = screen.getByRole('button', { name: /ask ai assistant/i })
    fireEvent.click(button)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
```

### Visual Regression Testing
- Use Chromatic or Percy for visual testing
- Compare Figma designs with implemented components
- Automated screenshot comparison in CI/CD

### Cross-Browser Testing
- Test widget embedding across browsers
- Verify Shadow DOM / iframe isolation
- Test in different host environments

## Documentation Requirements

1. **Component Documentation**: Use Storybook for interactive docs
2. **Integration Guide**: Step-by-step widget setup instructions
3. **API Reference**: Detailed configuration options
4. **Design Guidelines**: How to maintain consistency with Figma
5. **Troubleshooting**: Common issues and solutions

## Next Steps

1. Set up Figma API integration for automated design token extraction
2. Create proof-of-concept for widget embedding system
3. Establish component mapping strategy from Figma to shadcn/ui
4. Build development environment with hot reloading
5. Implement CI/CD pipeline for automated testing and deployment

## Additional Considerations

### Security
- Sanitize user inputs
- Implement CSP headers for widget
- Secure API key management
- XSS prevention in widget context

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion preferences

### Internationalization
- Support for RTL languages
- Locale-based formatting
- Translation management system
- Dynamic content loading based on locale