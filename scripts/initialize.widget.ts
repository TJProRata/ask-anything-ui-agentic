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

function autoInitFromScriptTag() {
  const scriptTag = (document.currentScript as HTMLScriptElement | null) ||
    (document.querySelector('script[data-widget-config]') as HTMLScriptElement | null);

  if (!scriptTag) return;

  const configAttr = scriptTag.getAttribute('data-widget-config');
  if (!configAttr) return;

  try {
    const config = JSON.parse(configAttr) as WidgetConfig;
    widgetManager.init(config);
  } catch (e) {
    console.error('Failed to parse widget config:', e);
  }
}

// Auto-initialize whether DOM is already loaded or not
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInitFromScriptTag);
} else {
  autoInitFromScriptTag();
}