# FloatingWidget

The main widget component that creates an embeddable chat interface with Shadow DOM isolation.

## Import

```typescript
import { FloatingWidget } from '@/components/widgets/floating-widget/floating-widget';
```

## Usage

```tsx
<FloatingWidget config={widgetConfig} />
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `WidgetConfig` | Yes | Complete widget configuration object |

## Configuration

The `config` prop accepts a `WidgetConfig` object with the following properties:

### Required Fields
- `containerId`: string - ID of the container element
- `apiKey`: string - API authentication key

### Optional Fields
- `apiEndpoint`: string - Custom API endpoint URL
- `theme`: 'light' | 'dark' | 'custom' - Theme selection
- `position`: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' - Screen position
- `initialExpanded`: boolean - Start in expanded state
- `customStyles`: Record<string, string> - CSS variable overrides
- `cspNonce`: string - Content Security Policy nonce

### Callbacks
- `onReady`: () => void - Called when widget is initialized
- `onMessage`: (message: WidgetMessage) => void - Message event handler
- `onExpand`: () => void - Panel opened event
- `onCollapse`: () => void - Panel closed event

## Examples

### Basic Usage
```tsx
const config = {
  containerId: 'widget-container',
  apiKey: 'your-api-key'
};

<FloatingWidget config={config} />
```

### Advanced Configuration
```tsx
const config = {
  containerId: 'widget-container',
  apiKey: 'your-api-key',
  theme: 'dark',
  position: 'bottom-left',
  customStyles: {
    '--widget-primary': '#ff6b6b',
    '--widget-bg': '#1e1e1e'
  },
  onReady: () => console.log('Widget ready'),
  onMessage: (msg) => analytics.track('message', msg)
};

<FloatingWidget config={config} />
```

## State Management

The component manages the following internal state:
- `isExpanded`: boolean - Panel visibility
- `messages`: WidgetMessage[] - Conversation history
- `isLoading`: boolean - API request state
- `error`: string | null - Error messages

## Styling

The widget uses Shadow DOM for complete style isolation. Customize appearance using:

### CSS Variables
```css
--widget-bg: Background color
--widget-text: Text color
--widget-primary: Primary accent color
--widget-border: Border color
```

### Custom Styles
Pass custom CSS variables via the `customStyles` prop:

```tsx
customStyles: {
  '--widget-bg': '#000000',
  '--widget-text': '#ffffff',
  '--widget-primary': '#00ff00'
}
```

## Accessibility

- Full keyboard navigation support
- ESC key to close panel
- ARIA labels on all interactive elements
- Focus management
- Screen reader compatible

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

## Related Components

- [FloatingWidgetButton](./floating-widget-button.md) - Trigger button
- [FloatingWidgetCard](./floating-widget-card.md) - Chat panel
- [WidgetManager](../widget/widget-manager.md) - Instance management

## API Integration

Uses the `useWidgetAPI` hook for backend communication:

```tsx
const { sendMessage, isLoading, error } = useWidgetAPI(config);
```

## Performance Considerations

- Lazy loads chat panel until first interaction
- Memoizes expensive computations
- Debounces API calls
- Efficient re-rendering with React.memo

## Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingWidget } from './floating-widget';

test('expands on button click', () => {
  render(<FloatingWidget config={config} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
```

## Troubleshooting

**Widget not appearing**
- Verify container element exists
- Check console for initialization errors
- Ensure config is valid

**API not responding**
- Verify API endpoint is correct
- Check API key validity
- Review CORS configuration

**Styling issues**
- Check Shadow DOM is working
- Verify CSS variables are applied
- Review custom styles syntax