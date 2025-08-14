# Floating Widget Overview

## Introduction

The Floating Widget is a React-based embeddable chat interface that provides AI-powered conversations through a floating action button. It's built with complete style isolation using Shadow DOM and can be integrated into any website via a simple script tag.

## Architecture

### Technology Stack
- **React 19** - Component framework
- **TypeScript** - Type-safe development
- **Shadow DOM** - Complete style isolation
- **Bun** - Build tool and bundler
- **Tailwind CSS v4** - Styling (compiled into widget)

### Core Components

#### Widget Manager (`widgets/widget-manager.tsx`)
- Handles Shadow DOM creation and mounting
- Manages widget instances
- Injects styles and theme variables
- Provides lifecycle management

#### Floating Widget (`components/widgets/floating-widget/floating-widget.tsx`)
- Main React component
- Manages expanded/collapsed states
- Handles positioning and animations
- Integrates with API hooks

#### Widget Button (`floating-widget-button.tsx`)
- Trigger button component
- Animated icon states
- Accessible click target

#### Widget Card (`floating-widget-card.tsx`)
- Expandable chat panel
- Message display and input
- Loading and error states
- Auto-scroll behavior

### State Management

The widget uses React hooks for state management:

```typescript
- isExpanded: boolean - Panel open/closed state
- messages: WidgetMessage[] - Conversation history
- isLoading: boolean - API request state
- error: string | null - Error handling
```

### API Integration

Uses the `useWidgetAPI` hook for backend communication:
- Typed message interfaces
- Automatic retry logic
- Loading state management
- Error handling

## Features

### User Interface
- **Floating Action Button** - Customizable position and appearance
- **Expandable Panel** - Smooth animations and transitions
- **Chat Interface** - Message bubbles with timestamps
- **Input Field** - Text input with send button
- **Loading States** - Visual feedback during API calls
- **Error Display** - User-friendly error messages

### Customization
- **Themes** - Light, dark, and custom theme support
- **Positioning** - Four corner positions available
- **Copy** - Customizable button text, headers, placeholders
- **Styling** - CSS variable overrides for complete control
- **Callbacks** - Lifecycle hooks for integration

### Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation (ESC to close)
- Focus management
- Screen reader support
- High contrast mode support

## Implementation

### Bundle Structure
The widget is bundled as an IIFE (Immediately Invoked Function Expression) that:
1. Creates a global `window.FloatingWidget` object
2. Exposes `init()` method for programmatic initialization
3. Supports auto-initialization via `data-widget-config`
4. Includes all dependencies (React, styles, etc.)

### Shadow DOM Isolation
- Prevents style conflicts with host page
- Encapsulates widget styles completely
- Supports CSP nonce for secure environments
- Maintains clean DOM structure

### Initialization Flow
1. Script loads and registers global API
2. Checks for `data-widget-config` attribute
3. Parses configuration JSON
4. Creates Shadow DOM container
5. Mounts React component
6. Triggers `onReady` callback

## Configuration

### Required Options
- `containerId` - Target DOM element ID
- `apiKey` - Authentication key

### Optional Settings
- `apiEndpoint` - Custom API URL
- `theme` - 'light' | 'dark' | 'custom'
- `position` - Widget screen position
- `initialExpanded` - Start in expanded state
- `customStyles` - CSS variable overrides
- `cspNonce` - Security policy nonce

### Event Callbacks
- `onReady()` - Widget initialized
- `onMessage(message)` - Message sent/received
- `onExpand()` - Panel opened
- `onCollapse()` - Panel closed

## Integration Methods

### Script Tag (Recommended)
```html
<div id="widget"></div>
<script 
  src="widget.js"
  data-widget-config='{"containerId":"widget","apiKey":"KEY"}'
></script>
```

### Programmatic
```javascript
window.FloatingWidget.init({
  containerId: 'widget',
  apiKey: 'KEY',
  theme: 'dark'
});
```

## Performance

### Bundle Size
- ~236KB minified (includes React)
- Gzip compression reduces to ~80KB
- Single file, no additional requests

### Optimization
- Lazy loading of non-critical features
- Memoized React components
- Efficient re-rendering
- Debounced API calls

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security
- XSS protection via React
- CSP compliant
- Secure API communication
- No third-party tracking
- Isolated execution context

## Future Enhancements
- Multi-language support
- File upload capability
- Rich message formatting
- Voice input/output
- Analytics integration
- Webhook support