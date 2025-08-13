import React from "react";
import { createRoot } from "react-dom/client";
import type { WidgetConfig, WidgetInstance } from "@/widgets/types";
import { FloatingWidget } from "@/components/widgets/floating-widget/floating-widget";
import widgetStyles from "@/styles/widget.css";

export class WidgetManager {
  public instances: Map<string, WidgetInstance> = new Map();
  // private instances: Map<string, WidgetInstance> = new Map();
  
  init(config: WidgetConfig) {
    const {
      // apiKey,
      containerId,
      theme = 'dark',
      position = 'bottom-right',
      customStyles = {},
      onReady,
      // ...restConfig
    } = config;
    
    // Find or create container
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }
    
    // Create Shadow DOM for style isolation
    const shadowRoot = container.attachShadow({ mode: 'open' });
    
    // Create mount point inside shadow DOM
    const mountPoint = document.createElement('div');
    mountPoint.id = 'widget-root';
    mountPoint.className = 'widget-container';
    
    // Inject styles into Shadow DOM
    const styleElement = document.createElement('style');
    styleElement.textContent = `
${widgetStyles}

/* Reset and base styles for Shadow DOM host */
:host {
  all: initial;
  display: block;
  position: fixed;
  ${this.getPositionStyles(position)}
  z-index: 9999;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Custom theme styles */
${this.generateThemeStyles(theme, customStyles)}
`;
    
    shadowRoot.appendChild(styleElement);
    shadowRoot.appendChild(mountPoint);
    
    // Create React root and render
    const root = createRoot(mountPoint);
    root.render(
      <React.StrictMode>
        <FloatingWidget config={config} />
      </React.StrictMode>
    );
    
    // Store instance
    this.instances.set(containerId, {
      root,
      shadowRoot,
      config
    });
    
    // Call ready callback
    onReady?.();
  }
  
  private getPositionStyles(position: string): string {
    const positions: Record<string, string> = {
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;',
      'center': 'top: 50%; left: 50%; transform: translate(-50%, -50%);'
    };
    return positions[position] || positions['bottom-right'];
  }
  
  private generateThemeStyles(theme: string, customStyles: Record<string, string>): string {
    const themes: Record<string, Record<string, string>> = {
      light: {
        '--widget-bg': '#ffffff',
        '--widget-text': '#000000',
        '--widget-primary': '#3b82f6',
        '--widget-border': '#e5e7eb'
      },
      dark: {
        '--widget-bg': '#1f2937',
        '--widget-text': '#ffffff',
        '--widget-primary': '#60a5fa',
        '--widget-border': '#374151'
      }
    };
    
    const selectedTheme = { ...themes[theme], ...customStyles };

    const declarations = Object.entries(selectedTheme)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n');

    return `:host {\n${declarations}\n}`;
  }
  
  destroy(containerId: string) {
    const instance = this.instances.get(containerId);
    if (instance) {
      instance.root.unmount();
      instance.shadowRoot.host.remove();
      this.instances.delete(containerId);
    }
  }
  
  updateConfig(containerId: string, newConfig: Partial<WidgetConfig>) {
    const instance = this.instances.get(containerId);
    if (instance) {
      const updatedConfig = { ...instance.config, ...newConfig };
      instance.root.render(
        <React.StrictMode>
          <FloatingWidget
            config={updatedConfig}
            {...updatedConfig}
          />
        </React.StrictMode>
      );
      instance.config = updatedConfig;
    }
  }
}