import type { WidgetConfig, WidgetInstance } from "@/widgets/types";
import { WidgetManager } from "@/widgets/widget-manager";

declare global {
  interface Window {
    FloatingWidget: {
      init: (config: WidgetConfig) => void;
      instances: Map<string, WidgetInstance>;
    };
  }
}

// Initialize widget manager
const widgetManager = new WidgetManager();

// Export to global scope
if (typeof window !== 'undefined') {
  window.FloatingWidget = {
    init: (config: WidgetConfig) => widgetManager.init(config),
    instances: widgetManager.instances
  };
}

// Auto-initialize if data attributes are present
document.addEventListener('DOMContentLoaded', () => {
  const scriptTag = document.currentScript || 
    document.querySelector('script[data-widget-config]');
  
  if (scriptTag) {
    const configAttr = scriptTag.getAttribute('data-widget-config');
    if (configAttr) {
      try {
        const config = JSON.parse(configAttr);
        widgetManager.init(config);
      } catch (e) {
        console.error('Failed to parse widget config:', e);
      }
    }
  }
});