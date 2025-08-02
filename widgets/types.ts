import type { Root } from "react-dom/client";

export interface WidgetConfig {
  containerId: string;
  apiKey: string;
  apiEndpoint?: string;
  theme?: "light" | "dark" | "custom";
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

export interface WidgetMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface WidgetAPIResponse {
  message: string;
  metadata?: Record<string, unknown>;
}

export interface WidgetInstance {
  root: Root;
  shadowRoot: ShadowRoot;
  config: WidgetConfig;
}
