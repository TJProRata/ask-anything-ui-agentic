import React from "react";
import { createRoot } from "react-dom/client";
import type { WidgetConfig, WidgetInstance } from "@/widgets/types";
import { FloatingWidget } from "@/components/widgets/floating-widget/floating-widget";
import widgetStyles from "@/styles/widget.css";
import {
  type WidgetTheme,
  type WidgetThemeTokens,
  widgetThemePresets,
  widgetCssVariables,
  mergeThemeTokens,
  tokensToHostCss,
} from "@/widgets/design-tokens";

/**
 * Manages the lifecycle of embedded widget instances mounted inside a Shadow DOM.
 */
export class WidgetManager {
  public instances: Map<string, WidgetInstance> = new Map();
  // private instances: Map<string, WidgetInstance> = new Map();
  
  /**
   * Initialize and mount a widget instance with Shadow DOM isolation.
   */
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
  
  /**
   * Compute inline CSS rules for the chosen widget position.
   */
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
  
  /**
   * Generate a :host CSS block for the selected theme merged with optional overrides.
   */
  private generateThemeStyles(theme: WidgetTheme, customStyles: Record<string, string>): string {
    const baseTheme: WidgetThemeTokens =
      theme === 'light'
        ? widgetThemePresets.light
        : widgetThemePresets.dark; // default to dark for 'dark' and 'custom'

    const filteredOverrides: Partial<WidgetThemeTokens> = this.normalizeCustomStyles(customStyles);

    const merged = mergeThemeTokens(baseTheme, filteredOverrides);
    return tokensToHostCss(merged);
  }

  /**
   * Filter arbitrary overrides to allowed widget CSS variables only.
   */
  private normalizeCustomStyles(overrides: Record<string, string>): Partial<WidgetThemeTokens> {
    const allowed = new Set<string>(widgetCssVariables as readonly string[]);
    const result: Partial<WidgetThemeTokens> = {};
    Object.entries(overrides).forEach(([key, value]) => {
      if (allowed.has(key)) {
        // @ts-expect-error index signature narrowed by runtime guard
        result[key] = value;
      }
    });
    return result;
  }
  
  /**
   * Destroy/unmount a widget instance and clean its Shadow DOM.
   */
  destroy(containerId: string) {
    const instance = this.instances.get(containerId);
    if (instance) {
      instance.root.unmount();
      instance.shadowRoot.host.remove();
      this.instances.delete(containerId);
    }
  }
  
  /**
   * Update an existing widget instance with new configuration.
   */
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