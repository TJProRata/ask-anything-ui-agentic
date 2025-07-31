# Floating Widget React/Next.js Migration Plan

## Executive Summary
I've analyzed your floating widget and designed a comprehensive migration plan to rebuild it using Next.js 15.4+, React 19, Tailwind CSS v4, and shadcn/ui components while maintaining complete feature parity.

## Component Architecture

### 1. **Component Hierarchy**
```typescript
FloatingWidget (Client Component - Portal-based)
├── WidgetButton (collapsed state)
│   ├── AIStarsIcon
│   └── GradientText 
└── WidgetPanel (expanded state)
    ├── WidgetHeader
    ├── SearchSection
    │   └── SearchInput (custom shadcn/ui Input)
    │       └── VoiceButton
    ├── SuggestionsSection
    │   ├── SuggestionItem[]
    │   └── DashedSeparator
    └── MoreButton
```

### 2. **Technology Mapping**

**Current → React Migration:**
- State classes → React components with Framer Motion
- Inline styles → Tailwind CSS v4 + CSS modules for glass morphism
- Event handlers → Custom React hooks
- DOM manipulation → React state + Portal rendering
- IIFE auto-init → Next.js script strategy

### 3. **shadcn/ui Components Usage**
- **Button**: Base for WidgetButton with custom glass morphism styling
- **Input**: Extended for SearchInput with gradient borders
- **Card**: Base structure for WidgetPanel
- **Separator**: Custom styled for dashed separators
- **Popover/Dialog**: Considered but Portal approach preferred for positioning

### 4. **State Management**
```typescript
// Custom hooks for encapsulated logic
useFloatingWidget() // Main state orchestration
useWidgetState() // Expanded/collapsed state
useOutsideClick() // Click outside detection
useEscapeKey() // Keyboard interactions
useWidgetAnimation() // Framer Motion variants
```

### 5. **Animation System**
Using Framer Motion for all animations:
- **Layout animations** for state transitions
- **AnimatePresence** for cross-fade effects
- **Variants** for hover/click states
- **Spring physics** for smooth interactions

### 6. **Integration Strategy**

**Dual Export Approach:**
1. **React Component**: For Next.js apps
   ```tsx
   import { FloatingWidget } from '@/components/floating-widget'
   ```

2. **Standalone Bundle**: For script tag integration
   ```html
   <script src="/widget.js"></script>
   ```

### 7. **Key Features Preserved**
- Glass morphism with backdrop-filter
- Gradient borders using CSS mask technique
- Google Fonts (Work Sans) integration
- Cross-fade animations between states
- Configurable positioning
- Auto-initialization capability
- Zero external dependencies for standalone

### 8. **Implementation Phases**

**Phase 1: Foundation**
- Setup Next.js 15.4 with App Router
- Configure Tailwind CSS v4 with custom design tokens
- Install shadcn/ui with custom theme
- Setup Framer Motion

**Phase 2: Core Components**
- Build base FloatingWidget with Portal
- Implement state management hooks
- Create reusable UI primitives

**Phase 3: Feature Implementation**
- Glass morphism styling system
- Gradient text and borders
- Animation variants
- Keyboard and click handlers

**Phase 4: Polish & Integration**
- Demo page with examples
- Build configuration for standalone
- Performance optimization
- Cross-browser testing

## Benefits of This Approach

1. **Modern Stack**: Latest React patterns with Server/Client components
2. **Maintainable**: Clear component hierarchy and separation of concerns
3. **Performant**: Optimized bundle size with tree-shaking
4. **Flexible**: Works in both React apps and vanilla JS sites
5. **Type-Safe**: Full TypeScript support throughout
6. **Accessible**: Better a11y with semantic HTML and ARIA

## Implementation Details

### Glass Morphism System
```css
/* Custom Tailwind utilities */
.glass-morphism {
  @apply backdrop-blur-xl bg-white/10 border border-white/20;
}

.glass-morphism-dark {
  @apply backdrop-blur-xl bg-black/20 border border-white/10;
}
```

### Gradient Border Implementation
```typescript
// Using CSS mask technique for true gradient borders
const GradientBorder = ({ children, gradient }) => (
  <div className="gradient-border-wrapper">
    {children}
    <style jsx>{`
      .gradient-border-wrapper {
        --border-width: 1px;
        --border-radius: 24px;
        background: ${gradient};
        padding: var(--border-width);
        border-radius: var(--border-radius);
        mask: linear-gradient(#000 0 0) content-box, 
              linear-gradient(#000 0 0);
        mask-composite: exclude;
      }
    `}</style>
  </div>
);
```

### Animation Variants
```typescript
const widgetVariants = {
  collapsed: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  expanded: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};
```

### Custom Hooks Architecture
```typescript
// Main orchestration hook
const useFloatingWidget = (config: WidgetConfig) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  
  useOutsideClick(widgetRef, () => setIsExpanded(false));
  useEscapeKey(() => setIsExpanded(false));
  
  return {
    isExpanded,
    setIsExpanded,
    widgetRef,
    // ... other state and handlers
  };
};
```

## Next Steps
1. Create new Next.js project with specified stack
2. Implement core components following the hierarchy
3. Add animations and interactions
4. Build demo page
5. Configure standalone build
6. Test across browsers and devices