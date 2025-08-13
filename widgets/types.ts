import type { Root } from "react-dom/client";
import type { WidgetTheme } from "@/widgets/design-tokens";

/**
 * Configuration for initializing an embedded FloatingWidget instance.
 */
export interface WidgetConfig {
  containerId: string;
  apiKey: string;
  apiEndpoint?: string;
  theme?: WidgetTheme;
  customStyles?: Record<string, string>;
  buttonText?: string;
  headerTitle?: string;
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "center";
  placeholder?: string;
  initialExpanded?: boolean;
  onReady?: () => void;
  onMessage?: (message: WidgetMessage) => void;
  onExpand?: () => void;
  onCollapse?: () => void;
}

/**
 * Chat message exchanged between user and AI within the widget.
 */
export interface WidgetMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

/**
 * Minimal API response shape used by the mock route and hook.
 */
export interface WidgetAPIResponse {
  message: string;
  metadata?: Record<string, unknown>;
}

/**
 * Runtime handle for a mounted widget instance.
 */
export interface WidgetInstance {
  root: Root;
  shadowRoot: ShadowRoot;
  config: WidgetConfig;
}
