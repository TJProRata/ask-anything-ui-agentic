/**
 * Widget design tokens and theme presets.
 * Bridges app-level tokens (app/globals.css) to Shadow DOM CSS variables used by the widget.
 */

/**
 * Supported widget theme names.
 */
export type WidgetTheme = "light" | "dark" | "custom";

/**
 * CSS variable names used within the widget Shadow DOM.
 *
 * Conceptual mapping to app tokens (see app/globals.css):
 * - --widget-bg      ≈ --card / --background
 * - --widget-text    ≈ --foreground
 * - --widget-primary ≈ --primary
 * - --widget-border  ≈ --border
 */
export type WidgetCssVar =
  | "--widget-bg"
  | "--widget-text"
  | "--widget-primary"
  | "--widget-border";

/**
 * Typed theme token map for the widget.
 */
export interface WidgetThemeTokens {
  "--widget-bg": string;
  "--widget-text": string;
  "--widget-primary": string;
  "--widget-border": string;
}

/**
 * Readonly list of supported CSS variables for validation or tooling.
 */
export const widgetCssVariables: readonly WidgetCssVar[] = [
  "--widget-bg",
  "--widget-text",
  "--widget-primary",
  "--widget-border",
] as const;

/**
 * Built-in theme presets. "custom" is handled by merging overrides at runtime.
 */
export const widgetThemePresets: Record<Exclude<WidgetTheme, "custom">, WidgetThemeTokens> = {
  light: {
    "--widget-bg": "#ffffff",
    "--widget-text": "#000000",
    "--widget-primary": "#3b82f6",
    "--widget-border": "#e5e7eb",
  },
  dark: {
    "--widget-bg": "#1f2937",
    "--widget-text": "#ffffff",
    "--widget-primary": "#60a5fa",
    "--widget-border": "#374151",
  },
};

/**
 * Merge a base token set with optional overrides.
 */
export function mergeThemeTokens(
  base: WidgetThemeTokens,
  overrides?: Partial<WidgetThemeTokens>
): WidgetThemeTokens {
  return { ...base, ...(overrides || {}) };
}

/**
 * Convert a token map into a :host { ... } CSS block string for injection.
 */
export function tokensToHostCss(tokens: WidgetThemeTokens): string {
  const declarations = Object.entries(tokens)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
  return `:host {\n${declarations}\n}`;
}


