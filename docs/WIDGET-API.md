## Widget Public API Reference

Source of truth: `widgets/types.ts`, `scripts/initialize.widget.ts`, and `widgets/widget-manager.tsx`.

### Global Namespace

```typescript
// scripts/initialize.widget.ts
window.FloatingWidget = {
  init: (config: WidgetConfig) => void,
  instances: Map<string, WidgetInstance>,
};
```

### Configuration

```typescript
// widgets/types.ts
export interface WidgetConfig {
  containerId: string;
  apiKey: string;
  apiEndpoint?: string;
  theme?: WidgetTheme; // 'light' | 'dark' | 'custom'
  customStyles?: Record<string, string>;
  cspNonce?: string;
  buttonText?: string;
  headerTitle?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
  placeholder?: string;
  initialExpanded?: boolean;
  onReady?: () => void;
  onMessage?: (message: WidgetMessage) => void;
  onExpand?: () => void;
  onCollapse?: () => void;
}
```

### Messages

```typescript
export interface WidgetMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  metadata?: Record<string, unknown>;
}
```

### Instances

```typescript
export interface WidgetInstance {
  root: import('react-dom/client').Root;
  shadowRoot: ShadowRoot;
  config: WidgetConfig;
}
```

### Usage Examples

```html
<div id="ask-anything"></div>
<script src="/dist/widget.js"></script>
<script>
  window.FloatingWidget.init({
    containerId: 'ask-anything',
    apiKey: '',
    apiEndpoint: '/api/widget',
    theme: 'dark',
    buttonText: 'Ask',
    headerTitle: 'Ask Anything',
    placeholder: 'Type your message',
    onMessage: (msg) => console.log('Widget message', msg)
  });
</script>
```


