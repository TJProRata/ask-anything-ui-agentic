# PROJECT-OVERVIEW.md

## Project Introduction

**Ask Anything UI** is a React-based component library designed to build and deploy embeddable AI-powered widgets. Currently at version 0.1.0, the project implements a comprehensive three-stage development pipeline that transforms design assets into production-ready embeddable widgets.

The core mission centers on creating a unified UI/UX platform that facilitates seamless product development through three key stages:
- **Import**: Extract designs and exported code assets from Figma
- **Transform**: Implement well-crafted React components using shadcn/ui primitives
- **Deploy**: Bundle, package, and ship components as embeddable widgets with complete style isolation

### Current Implementation Status
- ✅ **Foundation**: Next.js 15.4.5 application with TypeScript and Tailwind CSS v4 fully configured
- 🚧 **Widget Architecture**: Basic floating widget structure with expandable panel in active development
- 🚧 **Build Pipeline**: Custom Bun-based widget bundling system with IIFE output format
- 📋 **Figma Integration**: Design token extraction system planned for future implementation

## Getting Started

### Prerequisites
- Node.js 18+ (Bun runtime preferred)
- Git for version control
- VS Code with TypeScript extensions (recommended)

### Installation & Setup

```bash
# Clone repository
git clone [repository-url]
cd ask-anything-ui

# Install dependencies with Bun
bun install

# Start development server
bun run dev

# Build widget for production
bun run build:widget
```

### Key Configuration Files

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui component registry
- `next.config.ts` - Next.js configuration
- `scripts/build.widget.ts` - Widget build customization

## Technical Architecture

### Core Technology Stack

The project leverages modern web technologies optimized for performance and developer experience:

```typescript
const techStack = {
  runtime: "Bun (preferred over npm/yarn/pnpm)",
  framework: "Next.js 15.4.5 with App Router",
  react: "19.1.0 - Latest features including improved hydration",
  language: "TypeScript 5.9.2 with strict mode",
  styling: "Tailwind CSS v4 with Lightning CSS processing",
  components: "shadcn/ui (built on Radix UI primitives)",
  buildTool: "Custom Bun bundler with IIFE output format"
};
```

### Application Structure

The codebase follows a modular architecture with clear separation of concerns:

```
/ask-anything-ui/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage showcase
│   ├── components/        # UI components demonstration
│   ├── tokens/           # Design tokens showcase
│   └── widgets/          # Widget development playground
├── components/           # React component library
│   ├── ui/              # shadcn/ui primitives (42+ components)
│   ├── app/             # Application-level components
│   ├── ask-anything/    # AI widget specific components
│   ├── theme/           # Theme provider and utilities
│   └── widgets/         # Embeddable widget implementations
├── hooks/               # Custom React hooks
│   ├── use-mobile.ts    # Responsive behavior detection
│   └── use-widget-api.ts # API communication layer
├── scripts/             # Build automation
│   ├── build.widget.ts  # Custom widget bundling
│   └── initialize.widget.ts # Widget initialization
├── widgets/             # Widget core logic
│   ├── types.ts         # TypeScript interfaces
│   └── widget-manager.tsx # Widget lifecycle manager
└── docs/                # Architecture documentation
```

### Widget Embedding Architecture

The widget system implements complete isolation through Shadow DOM technology, ensuring zero CSS conflicts with host pages. The architecture supports multiple integration methods while maintaining a small bundle footprint:

- **Shadow DOM Isolation**: Complete style encapsulation preventing CSS leakage
- **IIFE Bundle Format**: Self-contained script execution in global scope
- **Modern Build Pipeline**: Bun-powered bundling with Lightning CSS for Tailwind v4
- **Target Bundle Size**: ~50KB gzipped including React and all dependencies

### Component Design System

Components follow a hierarchical architecture built on shadcn/ui primitives:
- **Base Layer**: 42+ shadcn/ui components providing consistent UI primitives
- **Composition Pattern**: Complex widgets assembled from primitive components
- **Theme Integration**: CSS custom properties enabling runtime theme switching
- **Typography System**: Work Sans for UI text, Geist Mono for code display

## Current Implementation Status

### Implemented Components ✅

#### Core UI Library (shadcn/ui)
The project includes a comprehensive set of 42+ production-ready components:
- Form elements: Button, Input, Select, Checkbox, Radio, Switch
- Layout components: Card, Sheet, Dialog, Drawer, Tabs
- Navigation: NavigationMenu, Breadcrumb, Pagination
- Feedback: Alert, Toast (Sonner), Progress, Skeleton
- Data display: Table, Avatar, Badge, Tooltip

#### Application Components
```typescript
// Key implemented components with their status
const implementedComponents = {
  "AppHeader": "Complete navigation with theme toggle",
  "AppFooter": "Minimal footer with project info",
  "AskButton": "Prototype AI widget trigger with gradient text",
  "FloatingWidget": "Basic expandable structure with state management",
  "ThemeProvider": "Dark/light mode with system preference support"
};
```

#### Build Infrastructure
- Custom Bun build script (`scripts/build.widget.ts`) with Lightning CSS integration
- TypeScript configuration with strict mode and path aliases
- Next.js 15.4.5 with Turbopack for fast development builds
- Prettier with Tailwind CSS plugin for consistent formatting

### In Development 🚧

#### FloatingWidget Enhancement
The core widget component currently features:
- Basic expand/collapse state management
- Message history array structure
- API integration hook preparation
- Keyboard navigation (ESC to close)
- Position configuration support

Required enhancements:
- Complete panel UI with chat interface
- Message bubble components
- Input field with validation
- Loading states and typing indicators
- Error boundary implementation

#### Widget API System
The `useWidgetAPI` hook provides:
- HTTP client with Bearer token authentication
- OpenAI-compatible message format
- Loading and error state management
- TypeScript-typed responses

### Planned Features 📋

- Complete FloatingWidget chat UI implementation
- Production-ready Shadow DOM integration
- Figma API connection for design token extraction
- Multi-instance widget support on single page
- Plugin architecture for custom extensions
- Analytics and tracking integration
- Comprehensive testing framework

## AI Widget Implementation

### Widget Architecture Overview

The AI widget follows an intuitive button-to-panel expansion pattern optimized for third-party embedding:

```typescript
interface WidgetConfig {
  // Required configuration
  containerId: string;
  apiKey: string;
  
  // Optional customization
  apiEndpoint?: string;
  theme?: "light" | "dark" | "custom";
  buttonText?: string;
  headerTitle?: string;
  placeholder?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  customStyles?: Record<string, string>;
  initialExpanded?: boolean;
  
  // Event callbacks
  onReady?: () => void;
  onMessage?: (message: WidgetMessage) => void;
  onExpand?: () => void;
  onCollapse?: () => void;
}
```

### Current Component Structure

#### AskButton Component
**Status**: ✅ Implemented (prototype)

The AskButton serves as the primary entry point for user interaction:
```tsx
// Current implementation with gradient text and brand integration
<Button className="ask-button group relative rounded-[41px] border-2 border-purple-400/10 bg-[#1A1A1A] px-4 py-2">
  <Image src="/ai-stars.svg" alt="Ask" width={24} height={24} />
  <span className="bg-gradient-to-r from-green-200 to-purple-400 bg-clip-text text-transparent">
    Ask
  </span>
  <div className="rounded-full bg-black p-1">
    <Image src="/nyt-logo-tiny.png" alt="NYT" width={20} height={20} />
  </div>
</Button>
```

#### FloatingWidget Component
**Status**: 🚧 Basic structure implemented

Core functionality includes:
- State management for expanded/collapsed modes
- Message history array for conversation tracking
- Prepared API integration through custom hook
- Keyboard accessibility with escape key handling
- Configurable positioning system

### API Integration System

#### useWidgetAPI Hook
The custom hook manages all backend communication:
```typescript
export function useWidgetAPI(apiKey: string, endpoint?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sendMessage = async (text: string, history: WidgetMessage[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(endpoint || '/api/widget', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text, history })
      });
      
      const data = await response.json();
      return data.message;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { sendMessage, isLoading, error };
}
```

## Build System & Widget Pipeline

### Custom Build Configuration

The project employs a sophisticated Bun-based build system optimized for widget embedding:

```typescript
// scripts/build.widget.ts configuration
const buildConfig = {
  entrypoints: ["components/widgets/floating-widget/floating-widget.tsx"],
  outdir: "dist",
  target: "browser",
  format: "iife",
  naming: {
    entry: "widget.[hash].js",
    chunk: "chunk.[hash].js",
    asset: "assets/[name].[hash].[ext]"
  },
  minify: true,
  sourcemap: "external",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  plugins: [
    // Lightning CSS plugin for Tailwind v4 processing
    {
      name: "tailwind-transformer",
      setup(build) {
        // Transform and minify CSS with Lightning CSS
      }
    }
  ]
};
```

### Development Workflow

```bash
# Core development commands
bun run dev           # Start Next.js dev server with Turbopack
bun run build         # Build Next.js production application
bun run build:widget  # Create widget IIFE bundle
bun run lint          # Run ESLint validation
bun run clean         # Remove build artifacts
```

### Widget Distribution Strategy

The build process generates optimized outputs for CDN distribution:

```
dist/
├── widget.[hash].js      # Main IIFE bundle (~50KB gzipped)
├── widget.[hash].js.map  # Source maps for debugging
└── assets/              # Static assets (images, fonts)
```

### Style Isolation System

Complete CSS isolation achieved through:
- **Shadow DOM Boundary**: Prevents style leakage in both directions
- **Scoped Tailwind Classes**: All utilities confined to widget context
- **CSS Custom Properties**: Enables runtime customization
- **Reset Styles**: Normalized base styles within Shadow DOM

## Design System Integration

### Figma-to-Code Pipeline (Planned)

The project architecture supports comprehensive design-to-code workflow:

```typescript
// Planned design token structure
export const designTokens = {
  colors: {
    'ask-anything-green': 'oklch(0.9455 0.0801 168.22)',
    'ask-anything-purple': 'oklch(0.7186 0.1849 305.32)',
    'ask-anything-gradient': 'linear-gradient(90deg, var(--green) 0%, var(--purple) 100%)'
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem'      // 32px
  },
  typography: {
    fontFamily: {
      sans: ['Work Sans', 'system-ui', 'sans-serif'],
      mono: ['Geist Mono', 'monospace']
    },
    fontSize: {
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem'     // 20px
    }
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }
};
```

### Current Design Implementation

Visual identity established through:
- **Color Palette**: Dark theme with purple-400 accents and green-to-purple gradients
- **Typography**: Work Sans for UI text with gradient effects for branding
- **Layout System**: Compact button expanding to full-featured panel
- **Animation**: Smooth transitions using Tailwind's transition utilities

## Development Guidelines & Best Practices

### Code Standards

#### Component Development
```typescript
// Preferred component structure
interface ComponentProps {
  // Required props with clear types
  id: string;
  onAction: (data: ActionData) => void;
  
  // Optional props with defaults
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Component({
  id,
  onAction,
  variant = 'default',
  size = 'md',
  className
}: ComponentProps) {
  // Implementation with proper TypeScript types
}
```

#### Styling Guidelines
- Use Tailwind utilities for all styling (no inline styles)
- Implement responsive design with mobile-first breakpoints
- Utilize semantic color tokens from theme system
- Maintain consistent animation timings across components

### Performance Considerations

- **Bundle Size Monitoring**: Continuous tracking toward <50KB target
- **Tree Shaking**: Automatic removal of unused shadcn/ui components
- **Code Splitting**: Dynamic imports for heavy features
- **Asset Optimization**: Image compression and lazy loading

## API & Integration Patterns

### Widget Embedding Methods

#### Script Tag Integration
```html
<!-- Simple embedding with auto-initialization -->
<script src="https://cdn.example.com/widget@1.0.0/widget.js"
        data-widget-config='{
          "containerId": "ai-widget",
          "apiKey": "your-api-key",
          "theme": "dark"
        }'>
</script>
<div id="ai-widget"></div>
```

#### Programmatic Initialization
```javascript
// Advanced integration with callbacks
window.AskAnythingWidget.init({
  containerId: 'ai-widget',
  apiKey: 'your-api-key',
  theme: 'custom',
  customStyles: {
    '--widget-primary': '#8b5cf6',
    '--widget-background': '#1a1a1a'
  },
  onMessage: (message) => {
    analytics.track('widget_message', message);
  },
  onExpand: () => {
    console.log('Widget expanded');
  }
});
```

### Message Protocol

```typescript
interface WidgetMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sources?: string[];
    tokens?: number;
  };
}
```

## Current Challenges & Roadmap

### Active Development Areas 🚧

- **FloatingWidget Panel UI**: Complete chat interface implementation
- **Shadow DOM Production Integration**: Finalize isolation system
- **API Backend Connection**: Integrate with production AI service
- **Testing Framework**: Establish comprehensive test coverage

### Development Roadmap

#### Phase 1: Foundation (Current)
- ✅ Next.js application structure
- ✅ shadcn/ui component library
- 🚧 Basic widget functionality
- 🚧 Build pipeline optimization

#### Phase 2: Enhancement (Q1 2025)
- 📋 Complete chat UI implementation
- 📋 Multi-instance widget support
- 📋 Advanced theming system
- 📋 Performance optimization

#### Phase 3: Integration (Q2 2025)
- 📋 Figma API integration
- 📋 Automated design token extraction
- 📋 Analytics dashboard
- 📋 Enterprise features

## Known Issues & Technical Debt

### Critical Issues Requiring Immediate Attention

#### 1. FloatingWidget Prop Duplication ⚠️
**Issue**: The component has redundant prop structures causing confusion:
```typescript
// Problem: Props extend WidgetConfig AND accept config prop
interface FloatingWidgetProps extends WidgetConfig {
  config: WidgetConfig;  // Duplication!
}
```
**Impact**: Unclear which props take precedence, potential runtime errors  
**Resolution**: Remove either the extends clause or the config prop

#### 2. Build Entry Point Mismatch ⚠️
**Issue**: Build script points to React component, not widget initializer:
```typescript
// Current (incorrect):
const ENTRY_POINT = "components/widgets/floating-widget/floating-widget.tsx";
// Should be:
const ENTRY_POINT = "widgets/index.ts"; // Self-initializing widget entry
```
**Impact**: Bundle doesn't work as standalone widget  
**Resolution**: Create proper widget entry point with initialization logic

#### 3. Missing Widget Manager Implementation ⚠️
**Issue**: No actual Shadow DOM creation or global namespace setup
- No `window.FloatingWidget` implementation
- No Shadow DOM injection code
- No auto-initialization from data attributes
**Impact**: Widget cannot be embedded on third-party sites  
**Resolution**: Implement complete WidgetManager class with Shadow DOM

### Architectural Inconsistencies

#### 4. Component Organization Confusion
**Issue**: Unclear separation between app and widget components:
- `FloatingWidget` in `/components/widgets/` (should be `/widgets/`?)
- Widget-specific components scattered across directories
**Impact**: Difficult to understand component boundaries  
**Resolution**: Establish clear directory conventions

#### 5. API Endpoint Configuration
**Issue**: Mock endpoint with no actual implementation:
```typescript
// Hook defaults to non-existent endpoint
const endpoint = apiEndpoint || '/api/widget';
```
**Impact**: API calls fail in production  
**Resolution**: Implement Next.js API route or configure external endpoint

#### 6. Missing Panel Components
**Issue**: Referenced but undefined components:
```typescript
// Referenced in FloatingWidget but don't exist:
<FloatingWidgetButton />  // Not defined
<FloatingWidgetPanel />   // Not defined
```
**Impact**: Component won't compile  
**Resolution**: Implement missing components or update imports

### Style System Issues

#### 7. Inconsistent CSS Architecture
**Issue**: Mixed styling approaches without clear patterns:
- Inline Tailwind classes
- Planned CSS custom properties not implemented
- No Shadow DOM style isolation
**Impact**: Styles leak between widget and host page  
**Resolution**: Implement consistent CSS-in-JS or scoped styles

#### 8. Design Token Implementation Gap
**Issue**: Tokens documented but not implemented:
```typescript
// Documented but missing:
export const designTokens = { /* ... */ };
```
**Impact**: Inconsistent styling, difficult theming  
**Resolution**: Create and import design token system

### Type System Problems

#### 9. Inconsistent Interface Usage
**Issue**: `WidgetMessage` defined but not consistently used:
```typescript
// Defined in types.ts but components use inline types
interface WidgetMessage { /* ... */ }
```
**Impact**: Type safety compromised, potential runtime errors  
**Resolution**: Enforce consistent type usage across components

#### 10. Missing Error Types
**Issue**: No proper error handling types:
```typescript
// Current: generic string errors
const [error, setError] = useState<string | null>(null);
// Should have: structured error types
```
**Impact**: Poor error handling and debugging  
**Resolution**: Define comprehensive error type system

### Build System Issues

#### 11. Bundle Output Problems
**Issue**: Build doesn't produce self-contained widget:
- No IIFE wrapper for global execution
- Styles not embedded in bundle
- React not bundled (despite documentation)
**Impact**: Widget doesn't work as documented  
**Resolution**: Fix build configuration for proper IIFE output

#### 12. Missing Script Initialization
**Issue**: No auto-initialization from script tag:
```html
<!-- This doesn't actually work: -->
<script src="widget.js" data-widget-config='{...}'></script>
```
**Impact**: Integration method doesn't function  
**Resolution**: Implement script tag parsing and auto-init

### Priority Resolution Order

1. **High Priority** (Blocking functionality):
   - Fix FloatingWidget prop structure (#1)
   - Implement missing panel components (#6)
   - Fix build entry point (#2)
   - Create working widget manager (#3)

2. **Medium Priority** (Affecting development):
   - Resolve component organization (#4)
   - Implement API endpoint (#5)
   - Fix type inconsistencies (#9)

3. **Low Priority** (Polish and optimization):
   - Implement design tokens (#8)
   - Improve error types (#10)
   - Optimize build output (#11)

---

**Document Status**: Living document - Last updated January 2025  
**Version**: Based on v0.1.0 (commit b141830)  
**Maintainers**: Development team with Claude Code assistance

*Legend*: ✅ Implemented | 🚧 In Progress | 📋 Planned