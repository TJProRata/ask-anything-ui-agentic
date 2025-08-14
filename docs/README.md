# Ask Anything UI

A React-based component library for building embeddable AI-powered widgets with complete style isolation.

## Quick Start

```bash
# Install dependencies (using Bun)
bun install

# Start development server
bun run dev

# Build widget bundle
bun run build:widget
```

## Project Overview

Ask Anything UI implements a three-stage pipeline for creating embeddable widgets:

1. **Import** - Extract designs and assets from Figma
2. **Transform** - Build React components using shadcn/ui primitives  
3. **Deploy** - Bundle as embeddable widgets with Shadow DOM isolation

### Key Features

- 🎯 **Embeddable Widgets** - IIFE bundles that work on any website
- 🛡️ **Complete Isolation** - Shadow DOM prevents style conflicts
- 🎨 **Theming System** - Light/dark presets with custom overrides
- ⚡ **Modern Stack** - React 19, Next.js 15, TypeScript, Tailwind CSS v4
- 📦 **Small Footprint** - ~236KB minified bundle including React

## Architecture

```
/ask-anything-ui/
├── app/                    # Next.js App Router
├── components/             # React component library
│   ├── ui/                # shadcn/ui primitives
│   ├── widgets/           # Embeddable widget components
│   └── ask-anything/      # AI chat components
├── scripts/               # Build and initialization
├── widgets/               # Widget runtime and types
└── docs/                  # Documentation
```

## Widget Integration

### Script Tag Method
```html
<div id="widget-container"></div>
<script 
  src="https://cdn.example.com/widget.js"
  data-widget-config='{"containerId":"widget-container","apiKey":"YOUR_KEY"}'
></script>
```

### Programmatic Method
```javascript
window.FloatingWidget.init({
  containerId: 'widget-container',
  apiKey: 'YOUR_KEY',
  theme: 'dark'
});
```

## Development

### Common Commands

```bash
# Development
bun run dev           # Start dev server (http://localhost:3000)
bun run lint          # Run ESLint

# Build
bun run build         # Build Next.js application
bun run build:widget  # Build embeddable widget

# Production
bun run start         # Start production server
```

### Key URLs

- `/` - Homepage with component showcase
- `/widgets` - Widget development playground
- `/components` - UI component gallery
- `/tokens` - Design token reference

## Tech Stack

- **Runtime**: Bun (preferred over npm/yarn)
- **Framework**: Next.js 15.4.5 with App Router
- **React**: 19.1.0
- **TypeScript**: 5.9.2 with strict mode
- **Styling**: Tailwind CSS v4 with Lightning CSS
- **Components**: shadcn/ui (Radix UI based)

## Widget API

The widget exposes a global API for initialization and management:

```typescript
window.FloatingWidget = {
  init(config: WidgetConfig): void,
  instances: Map<string, WidgetInstance>
}
```

### Configuration Options

- `containerId` (required) - Target container element ID
- `apiKey` (required) - API authentication key
- `theme` - 'light' | 'dark' | 'custom'
- `position` - Widget position on screen
- `customStyles` - CSS variable overrides
- `onReady`, `onMessage`, etc. - Event callbacks

## Testing

```bash
bun test              # Run test suite
```

Tests use Bun's built-in test runner with happy-dom and Testing Library.

## Documentation

- [Widget Pipeline](./WIDGET-PIPELINE.md) - Complete widget architecture
- [Integration Guide](./INTEGRATION.md) - Embedding instructions
- [Widget API](./WIDGET-API.md) - API reference
- [Design Tokens](./TOKENS.md) - Theming system
- [Development Plan](./PLAN.md) - Roadmap and priorities

## Current Status

### ✅ Completed
- Widget pipeline with Shadow DOM isolation
- IIFE bundle generation
- Theme system with presets
- Basic chat UI components
- TypeScript types and JSDoc
- Test infrastructure

### 🚧 In Progress
- Figma design token integration
- Advanced widget features
- Performance optimizations

### 📋 Planned
- Multi-widget orchestration
- Advanced theming options
- Analytics integration
- Internationalization

## Contributing

This project uses:
- TypeScript with strict mode
- ESLint for code quality
- Conventional commits
- Bun for all operations

## License

[License information]

## Support

For issues and questions, please refer to the documentation or create an issue in the repository.