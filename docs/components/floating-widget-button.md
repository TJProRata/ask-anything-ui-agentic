# FloatingWidgetButton

The floating action button that triggers the widget panel expansion.

## Import

```typescript
import { FloatingWidgetButton } from '@/components/widgets/floating-widget/floating-widget-button';
```

## Usage

```tsx
<FloatingWidgetButton
  onClick={handleClick}
  isExpanded={isExpanded}
  buttonText="Ask"
  position="bottom-right"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onClick` | `() => void` | Yes | - | Click event handler |
| `isExpanded` | `boolean` | No | false | Current expansion state |
| `buttonText` | `string` | No | "Ask" | Button label text |
| `position` | `Position` | No | "bottom-right" | Screen position |
| `className` | `string` | No | - | Additional CSS classes |
| `ariaLabel` | `string` | No | "Open chat" | Accessibility label |

## Position Type

```typescript
type Position = 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'top-right' 
  | 'top-left';
```

## Features

### Visual States
- Default state with hover effects
- Expanded state with different icon
- Loading state animation
- Focus visible outline
- Pressed state feedback

### Animations
- Smooth icon transitions
- Scale on hover
- Pulse animation for attention
- Rotation on state change

### Icons
- Collapsed: Chat bubble icon
- Expanded: Close (X) icon
- Loading: Spinner animation
- Custom icon support

## Examples

### Basic Button
```tsx
<FloatingWidgetButton
  onClick={() => setExpanded(!expanded)}
  isExpanded={expanded}
/>
```

### Custom Text and Position
```tsx
<FloatingWidgetButton
  onClick={handleToggle}
  isExpanded={false}
  buttonText="Help"
  position="bottom-left"
/>
```

### With Loading State
```tsx
<FloatingWidgetButton
  onClick={handleClick}
  isExpanded={expanded}
  isLoading={loading}
  buttonText={loading ? "" : "Ask"}
/>
```

## Styling

### CSS Structure
```css
.widget-button {
  /* Positioning */
  position: fixed;
  bottom: 20px;
  right: 20px;
  
  /* Appearance */
  width: 56px;
  height: 56px;
  border-radius: 28px;
  
  /* Colors */
  background: var(--widget-primary);
  color: var(--widget-text-on-primary);
  
  /* Effects */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.widget-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}
```

### Customization

#### Via CSS Variables
```css
--widget-button-size: 56px;
--widget-button-bg: #0066cc;
--widget-button-color: #ffffff;
--widget-button-shadow: 0 4px 12px rgba(0,0,0,0.15);
```

#### Via Classes
```tsx
<FloatingWidgetButton
  className="custom-button"
  // ... other props
/>
```

```css
.custom-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid white;
}
```

## Positioning

### Fixed Positioning
The button uses fixed positioning relative to the viewport:

```typescript
const positionStyles = {
  'bottom-right': { bottom: 20, right: 20 },
  'bottom-left': { bottom: 20, left: 20 },
  'top-right': { top: 20, right: 20 },
  'top-left': { top: 20, left: 20 }
};
```

### Responsive Positioning
```tsx
// Adjust position on mobile
const position = isMobile ? 'bottom-center' : 'bottom-right';

<FloatingWidgetButton position={position} />
```

## Icon Management

### Default Icons
```tsx
// Chat icon (collapsed state)
<ChatBubbleIcon />

// Close icon (expanded state)
<CloseIcon />

// Loading spinner
<SpinnerIcon />
```

### Custom Icons
```tsx
<FloatingWidgetButton
  icon={<CustomIcon />}
  expandedIcon={<CustomCloseIcon />}
/>
```

## Accessibility

### ARIA Attributes
- `role="button"` - Identifies as button
- `aria-label` - Descriptive label
- `aria-expanded` - Indicates state
- `aria-pressed` - Button state
- `tabindex="0"` - Keyboard focusable

### Keyboard Support
- `Enter` - Activate button
- `Space` - Activate button
- `Tab` - Focus navigation

### Screen Reader
```tsx
<FloatingWidgetButton
  ariaLabel="Open chat assistant"
  ariaExpanded={isExpanded}
  ariaDescribedBy="widget-description"
/>
```

## Animation Examples

### Pulse Animation
```css
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.widget-button.attention {
  animation: pulse 2s infinite;
}
```

### Icon Transition
```css
.widget-button-icon {
  transition: transform 0.3s ease;
}

.widget-button.expanded .widget-button-icon {
  transform: rotate(45deg);
}
```

## State Management

```tsx
const FloatingWidgetButton = ({ onClick, isExpanded }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <button
      className={cn(
        'widget-button',
        isExpanded && 'expanded',
        isHovered && 'hovered',
        isFocused && 'focused'
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Icon content */}
    </button>
  );
};
```

## Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingWidgetButton } from './floating-widget-button';

describe('FloatingWidgetButton', () => {
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<FloatingWidgetButton onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('shows expanded state', () => {
    render(<FloatingWidgetButton isExpanded={true} />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveClass('expanded');
  });
});
```

## Performance

- Memoized with React.memo
- CSS transitions instead of JS animations
- Lazy loads icons
- Minimal re-renders

## Common Patterns

### With Tooltip
```tsx
<Tooltip content="Click to chat">
  <FloatingWidgetButton onClick={handleClick} />
</Tooltip>
```

### With Badge
```tsx
<div className="widget-button-container">
  <FloatingWidgetButton onClick={handleClick} />
  {unreadCount > 0 && (
    <span className="widget-badge">{unreadCount}</span>
  )}
</div>
```

## Related Components

- [FloatingWidget](./floating-widget.md) - Parent widget
- [FloatingWidgetCard](./floating-widget-card.md) - Chat panel
- [ButtonIcon](./button-icon.md) - Icon component