# Widget Pipeline Documentation

## Overview

This document describes the React-to-embeddable widget pipeline that transforms React components into third-party widgets with Shadow DOM isolation. The pipeline produces IIFE bundles that can be embedded on any website via script tags.

## Architecture

### Key Components

**Runtime & Management**
- `scripts/initialize.widget.ts` - Global API and auto-initialization
- `widgets/widget-manager.tsx` - Shadow DOM, styles, mount lifecycle
- `widgets/types.ts` - TypeScript interfaces for configuration and messages
- `styles/widget.css` - Shadow DOM reset and CSS variables
- `widgets/design-tokens.ts` - Design token presets and theming helpers

**UI Components**
- `components/widgets/floating-widget/floating-widget.tsx` - Main widget component
- `components/widgets/floating-widget/floating-widget-button.tsx` - Trigger button
- `components/widgets/floating-widget/floating-widget-card.tsx` - Chat panel

**API & Hooks**
- `app/api/widget/route.ts` - Backend API endpoint
- `hooks/use-widget-api.ts` - Typed API client with loading/error handling

**Build System**
- `scripts/build.widget.ts` - Bun build script producing IIFE assets
- Output: `dist/widget.[hash].js` (~236KB minified)

## Public API

### Global Interface
```javascript
window.FloatingWidget = {
  init(config: WidgetConfig): void,
  instances: Map<string, WidgetInstance>
}
```

### Configuration
```typescript
interface WidgetConfig {
  // Required
  containerId: string;
  apiKey: string;
  
  // Optional
  apiEndpoint?: string;
  theme?: 'light' | 'dark' | 'custom';
  customStyles?: Record<string, string>;
  cspNonce?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  initialExpanded?: boolean;
  
  // Copy customization
  buttonText?: string;
  headerTitle?: string;
  placeholder?: string;
  
  // Callbacks
  onReady?: () => void;
  onMessage?: (message: WidgetMessage) => void;
  onExpand?: () => void;
  onCollapse?: () => void;
}
```

## Embedding Methods

### 1. Script Tag Auto-Init
```html
<div id="my-widget-container"></div>
<script 
  src="https://cdn.example.com/widget.js"
  data-widget-config='{"containerId":"my-widget-container","apiKey":"YOUR_KEY"}'
></script>
```

### 2. Programmatic Init
```javascript
window.FloatingWidget.init({
  containerId: 'my-widget-container',
  apiKey: 'YOUR_KEY',
  theme: 'dark',
  onReady: () => console.log('Widget ready!')
});
```

## Theming System

### CSS Variables
The widget uses CSS custom properties for theming:
- `--widget-bg` - Background color
- `--widget-text` - Text color  
- `--widget-primary` - Primary/accent color
- `--widget-border` - Border color

### Theme Presets
- `light` - Light theme preset
- `dark` - Dark theme preset
- `custom` - Use with `customStyles` for complete control

## Build Process

### Development Build
```bash
bun run build:widget
```

### Production Considerations
- Bundle includes React and all dependencies
- Shadow DOM provides complete style isolation
- CSP support via nonce attribute
- CDN hosting with long cache headers recommended

## Implementation Status

### ✅ Completed Features
- Shadow DOM isolation with style injection
- IIFE bundle generation with Bun
- Global API with instance tracking
- Auto-initialization via data attributes
- Theme system with presets and custom styles
- Accessibility features (ARIA labels, keyboard navigation)
- TypeScript types and JSDoc documentation
- Test coverage with Bun test runner
- CSP nonce support

### 📋 Future Enhancements
- Widget destroy/update APIs
- Automated token synchronization from Figma
- Bundle size optimization
- Multi-widget instance management improvements
- Extended browser compatibility testing

## Testing

Test suite uses Bun's built-in test runner with happy-dom and Testing Library:

```bash
bun test
```

Coverage includes:
- Unit tests for API hooks
- Component interaction tests
- Integration tests for initialization
- Shadow DOM mounting verification

## Security Considerations

- CSP nonce support for style injection
- API key validation
- Secure message handling
- No external dependencies at runtime
- Isolated execution context via Shadow DOM

## Bundle Metrics

Current production bundle (minified):
- JavaScript: ~236KB
- Includes: React, widget code, styles
- Source maps: ~1MB (development only)

## Related Documentation

- [Integration Guide](./INTEGRATION.md) - Detailed embedding instructions
- [Widget API Reference](./WIDGET-API.md) - Complete API documentation
- [Design Tokens](./TOKENS.md) - Theming and CSS variables