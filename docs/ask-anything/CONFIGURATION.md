# Ask Anything Configuration Guide

## Quick Start Configuration

### Minimal Setup
```javascript
{
  containerId: "ask-widget",
  apiKey: "your-api-key"
}
```

This minimal configuration will:
- Use default API endpoint (`/api/widget`)
- Apply light theme
- Position widget in bottom-right
- Use default copy and messages

## Complete Configuration Reference

### Core Settings

#### API Configuration
```javascript
{
  // Required: Your API authentication key
  apiKey: "your-api-key",
  
  // API endpoint for message processing
  apiEndpoint: "https://api.example.com/ask",
  
  // Request timeout in milliseconds
  requestTimeout: 30000,
  
  // Retry configuration
  retryAttempts: 3,
  retryDelay: 1000,
  
  // Custom headers for API requests
  customHeaders: {
    "X-Custom-Header": "value"
  }
}
```

#### UI Configuration
```javascript
{
  // Container element ID (required)
  containerId: "ask-widget",
  
  // Position on screen
  position: "bottom-right", // bottom-left, top-right, top-left
  
  // Theme selection
  theme: "light", // dark, custom
  
  // Start expanded
  initialExpanded: false,
  
  // Z-index for widget
  zIndex: 9999,
  
  // Enable/disable features
  enableSuggestions: true,
  enableVoiceInput: false,
  enableFileUpload: false,
  showTimestamps: true,
  enableMarkdown: true
}
```

### Styling Configuration

#### Theme Presets
```javascript
// Light theme (default)
{
  theme: "light"
}

// Dark theme
{
  theme: "dark"
}

// Custom theme
{
  theme: "custom",
  customStyles: {
    "--widget-bg": "#1a1a1a",
    "--widget-text": "#ffffff",
    "--widget-primary": "#00ff88",
    "--widget-border": "#333333",
    "--widget-hover": "#2a2a2a",
    "--widget-shadow": "0 4px 6px rgba(0,0,0,0.3)"
  }
}
```

#### Advanced Styling
```javascript
{
  customStyles: {
    // Colors
    "--widget-bg": "#ffffff",
    "--widget-text": "#333333",
    "--widget-primary": "#0066cc",
    "--widget-secondary": "#6c757d",
    "--widget-success": "#28a745",
    "--widget-danger": "#dc3545",
    "--widget-warning": "#ffc107",
    "--widget-info": "#17a2b8",
    
    // Typography
    "--widget-font-family": "'Inter', sans-serif",
    "--widget-font-size": "14px",
    "--widget-line-height": "1.5",
    
    // Spacing
    "--widget-padding": "16px",
    "--widget-margin": "8px",
    "--widget-radius": "8px",
    
    // Animations
    "--widget-transition": "all 0.3s ease",
    "--widget-animation-duration": "0.3s"
  }
}
```

### Content Configuration

#### Copy Customization
```javascript
{
  // Button text
  buttonText: "Ask",
  
  // Header content
  headerTitle: "Ask Anything",
  headerSubtitle: "How can I help you today?",
  
  // Input field
  placeholder: "Type your question...",
  sendButtonText: "Send",
  
  // Messages
  welcomeMessage: "Hello! Ask me anything about our products.",
  errorMessage: "Sorry, I couldn't process that. Please try again.",
  loadingMessage: "Thinking...",
  offlineMessage: "You appear to be offline. Please check your connection.",
  
  // Empty states
  emptyStateTitle: "Start a Conversation",
  emptyStateMessage: "Ask a question to begin",
  
  // Suggestions
  suggestionsTitle: "Suggested Questions",
  suggestions: [
    "What are your business hours?",
    "How do I track my order?",
    "What's your return policy?",
    "How can I contact support?"
  ]
}
```

#### Localization
```javascript
{
  locale: "en-US",
  translations: {
    "en-US": {
      buttonText: "Ask",
      headerTitle: "Ask Anything",
      placeholder: "Type your question..."
    },
    "es-ES": {
      buttonText: "Preguntar",
      headerTitle: "Pregunta Cualquier Cosa",
      placeholder: "Escribe tu pregunta..."
    },
    "fr-FR": {
      buttonText: "Demander",
      headerTitle: "Demandez N'importe Quoi",
      placeholder: "Tapez votre question..."
    }
  }
}
```

### Behavior Configuration

#### Interaction Settings
```javascript
{
  // Auto-expand behavior
  autoExpandOnLoad: false,
  autoExpandDelay: 3000,
  
  // Collapse behavior
  collapseOnOutsideClick: true,
  collapseOnEscape: true,
  collapseOnSubmit: false,
  
  // Message behavior
  clearOnSubmit: false,
  preserveHistory: true,
  maxHistorySize: 50,
  
  // Input behavior
  autoFocus: true,
  submitOnEnter: true,
  maxMessageLength: 500,
  
  // Sound effects
  soundEnabled: false,
  soundVolume: 0.5
}
```

#### Advanced Features
```javascript
{
  // Analytics
  enableAnalytics: true,
  analyticsId: "GA-XXXXX",
  
  // Session management
  sessionTimeout: 1800000, // 30 minutes
  persistSession: true,
  sessionStorageKey: "ask-anything-session",
  
  // Rate limiting
  rateLimitMessages: 50,
  rateLimitWindow: 3600000, // 1 hour
  
  // Caching
  enableCache: true,
  cacheTimeout: 300000, // 5 minutes
  maxCacheSize: 100
}
```

### Event Callbacks

#### Lifecycle Events
```javascript
{
  // Widget lifecycle
  onReady: () => {
    console.log('Widget initialized and ready');
  },
  
  onError: (error) => {
    console.error('Widget error:', error);
  },
  
  onDestroy: () => {
    console.log('Widget destroyed');
  },
  
  // Interaction events
  onExpand: () => {
    analytics.track('widget_expanded');
  },
  
  onCollapse: () => {
    analytics.track('widget_collapsed');
  },
  
  // Message events
  onMessage: (message) => {
    console.log('Message sent/received:', message);
  },
  
  onSuggestionClick: (suggestion) => {
    console.log('Suggestion clicked:', suggestion);
  }
}
```

#### Custom Handlers
```javascript
{
  // Message preprocessing
  beforeSend: (message) => {
    // Modify message before sending
    return {
      ...message,
      metadata: {
        timestamp: Date.now(),
        userId: getCurrentUserId()
      }
    };
  },
  
  // Response processing
  afterReceive: (response) => {
    // Process response after receiving
    if (response.action === 'redirect') {
      window.location.href = response.url;
    }
    return response;
  },
  
  // Error handling
  onApiError: (error, retry) => {
    if (error.status === 429) {
      showRateLimitMessage();
    } else {
      retry(); // Retry the request
    }
  }
}
```

## Environment-Specific Configuration

### Development
```javascript
const devConfig = {
  apiEndpoint: "http://localhost:3000/api/widget",
  debugMode: true,
  enableAnalytics: false,
  cacheEnabled: false,
  customStyles: {
    "--widget-border": "2px solid red" // Visual debug indicator
  }
};
```

### Staging
```javascript
const stagingConfig = {
  apiEndpoint: "https://staging-api.example.com/ask",
  debugMode: true,
  enableAnalytics: true,
  analyticsId: "GA-STAGING"
};
```

### Production
```javascript
const productionConfig = {
  apiEndpoint: "https://api.example.com/ask",
  debugMode: false,
  enableAnalytics: true,
  analyticsId: "GA-PRODUCTION",
  enableCache: true,
  rateLimitMessages: 100
};
```

## Security Configuration

### Content Security Policy
```javascript
{
  // Provide nonce for style injection
  cspNonce: "random-nonce-here",
  
  // Sanitization options
  sanitizeInput: true,
  sanitizeOutput: true,
  
  // XSS protection
  escapeHtml: true,
  
  // Allowed domains for links
  allowedDomains: [
    "example.com",
    "trusted-partner.com"
  ]
}
```

### Authentication
```javascript
{
  // API key (basic)
  apiKey: "your-api-key",
  
  // OAuth configuration
  authType: "oauth",
  authEndpoint: "https://auth.example.com/token",
  clientId: "client-id",
  scope: "ask-anything:read ask-anything:write",
  
  // Token refresh
  refreshToken: true,
  tokenRefreshInterval: 3600000 // 1 hour
}
```

## Performance Configuration

### Optimization Settings
```javascript
{
  // Lazy loading
  lazyLoad: true,
  lazyLoadDelay: 1000,
  
  // Debouncing
  debounceInput: true,
  debounceDelay: 300,
  
  // Throttling
  throttleScroll: true,
  throttleDelay: 100,
  
  // Resource hints
  preconnect: [
    "https://api.example.com",
    "https://cdn.example.com"
  ],
  
  // Bundle optimization
  minify: true,
  compress: true,
  treeshake: true
}
```

## Validation

### Configuration Validation
```javascript
// The widget validates configuration on initialization
window.FloatingWidget.init(config)
  .then(() => {
    console.log('Configuration valid and widget initialized');
  })
  .catch(error => {
    console.error('Configuration error:', error);
    // Handle invalid configuration
  });
```

### Required Fields
- `containerId` - Must reference existing DOM element
- `apiKey` - Non-empty string

### Type Validation
The widget uses TypeScript interfaces to ensure type safety:

```typescript
interface WidgetConfig {
  containerId: string;
  apiKey: string;
  apiEndpoint?: string;
  theme?: 'light' | 'dark' | 'custom';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  // ... additional typed fields
}
```

## Migration Guide

### From Version 0.x to 1.x
```javascript
// Old configuration (0.x)
{
  container: "widget",
  key: "api-key",
  endpoint: "/api"
}

// New configuration (1.x)
{
  containerId: "widget",
  apiKey: "api-key",
  apiEndpoint: "/api/widget"
}
```

## Debugging Configuration

### Debug Mode
```javascript
{
  debugMode: true,
  logLevel: "verbose", // error, warn, info, debug, verbose
  logToConsole: true,
  logToServer: false,
  
  // Debug UI
  showDebugPanel: true,
  showNetworkActivity: true,
  showStateChanges: true
}
```

### Configuration Inspector
```javascript
// Get current configuration
const config = window.FloatingWidget.getConfig();
console.log('Current configuration:', config);

// Validate configuration
const isValid = window.FloatingWidget.validateConfig(config);
console.log('Configuration valid:', isValid);

// Update configuration
window.FloatingWidget.updateConfig({
  theme: 'dark'
});
```