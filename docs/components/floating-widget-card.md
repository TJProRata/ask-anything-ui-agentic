# FloatingWidgetCard

The expandable chat panel component that displays messages and handles user input.

## Import

```typescript
import { FloatingWidgetCard } from '@/components/widgets/floating-widget/floating-widget-card';
```

## Usage

```tsx
<FloatingWidgetCard
  isExpanded={isExpanded}
  onClose={handleClose}
  messages={messages}
  onSendMessage={handleSendMessage}
  isLoading={isLoading}
  error={error}
  config={config}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isExpanded` | `boolean` | Yes | Controls panel visibility |
| `onClose` | `() => void` | Yes | Close button click handler |
| `messages` | `WidgetMessage[]` | Yes | Array of conversation messages |
| `onSendMessage` | `(content: string) => void` | Yes | Message submit handler |
| `isLoading` | `boolean` | No | Shows loading indicator |
| `error` | `string \| null` | No | Error message to display |
| `config` | `WidgetConfig` | Yes | Widget configuration |

## Features

### Message Display
- Scrollable message area
- Auto-scroll to latest message
- Message bubbles with sender indication
- Timestamp display (optional)
- Loading indicators

### Input Area
- Text input field with placeholder
- Send button with disabled state
- Submit on Enter key
- Character limit enforcement
- Input validation

### Header
- Customizable title text
- Close button with aria-label
- Optional subtitle support
- Minimize/maximize controls

## Examples

### Basic Usage
```tsx
const [messages, setMessages] = useState<WidgetMessage[]>([]);
const [isLoading, setIsLoading] = useState(false);

<FloatingWidgetCard
  isExpanded={true}
  onClose={() => setExpanded(false)}
  messages={messages}
  onSendMessage={handleSend}
  isLoading={isLoading}
  error={null}
  config={widgetConfig}
/>
```

### With Error Handling
```tsx
<FloatingWidgetCard
  isExpanded={true}
  onClose={handleClose}
  messages={messages}
  onSendMessage={handleSend}
  isLoading={false}
  error="Failed to send message. Please try again."
  config={config}
/>
```

## Message Interface

```typescript
interface WidgetMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  metadata?: Record<string, any>;
}
```

## Styling

### Structure
```
.widget-card
  .widget-header
    .widget-title
    .widget-close
  .widget-messages
    .message-bubble (user)
    .message-bubble (assistant)
  .widget-input-area
    .widget-input
    .widget-send-button
```

### CSS Classes
- `.widget-card` - Main container
- `.widget-header` - Header section
- `.widget-messages` - Message display area
- `.widget-input-area` - Input section
- `.message-bubble` - Individual messages
- `.message-user` - User messages
- `.message-assistant` - Assistant messages

## Behavior

### Auto-scroll
Messages area automatically scrolls to the bottom when:
- New message is added
- Panel is expanded
- Component mounts

### Focus Management
- Input field auto-focuses when panel opens
- Focus trapped within panel
- ESC key closes panel

### Loading States
```tsx
// Shows typing indicator
<FloatingWidgetCard isLoading={true} ... />

// Shows error message
<FloatingWidgetCard error="Connection failed" ... />
```

## Accessibility

- ARIA role="dialog" on panel
- ARIA labels on all buttons
- Keyboard navigation support
- Focus management
- Screen reader announcements

## Animation

The card uses CSS transitions for smooth animations:

```css
/* Expand animation */
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

/* Collapse animation */
@keyframes slideDown {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}
```

## Event Handlers

### onSendMessage
```tsx
const handleSendMessage = (content: string) => {
  // Validate message
  if (!content.trim()) return;
  
  // Add to messages
  const newMessage: WidgetMessage = {
    id: generateId(),
    content,
    role: 'user',
    timestamp: Date.now()
  };
  
  // Send to API
  api.sendMessage(newMessage);
};
```

### onClose
```tsx
const handleClose = () => {
  // Save conversation state
  saveConversation(messages);
  
  // Trigger collapse animation
  setExpanded(false);
  
  // Call config callback
  config.onCollapse?.();
};
```

## Performance

- Uses React.memo for optimization
- Virtualized list for large message histories
- Debounced input handling
- Lazy renders message content

## Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingWidgetCard } from './floating-widget-card';

test('sends message on submit', () => {
  const onSendMessage = jest.fn();
  render(
    <FloatingWidgetCard
      isExpanded={true}
      onSendMessage={onSendMessage}
      // ... other props
    />
  );
  
  const input = screen.getByPlaceholderText('Type a message...');
  const button = screen.getByRole('button', { name: 'Send' });
  
  fireEvent.change(input, { target: { value: 'Hello' } });
  fireEvent.click(button);
  
  expect(onSendMessage).toHaveBeenCalledWith('Hello');
});
```

## Related Components

- [FloatingWidget](./floating-widget.md) - Parent widget component
- [FloatingWidgetButton](./floating-widget-button.md) - Trigger button
- [WidgetMessage](./widget-message.md) - Message display