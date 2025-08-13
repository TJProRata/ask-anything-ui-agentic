import { describe, it, expect, beforeEach } from "bun:test";
import { waitFor } from "@testing-library/react";
import { act } from "react";

describe("initializer (scripts/initialize.widget)", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    delete (window as unknown as { FloatingWidget?: unknown }).FloatingWidget;
    // Provide a base URL for relative image src parsing in next/image
    Object.defineProperty(window as unknown as { location: unknown }, "location", {
      value: new URL("http://localhost/"),
      writable: true
    });
  });

  it("exposes global API and auto-initializes from data-widget-config", async () => {
    const script = document.createElement("script");
    script.setAttribute(
      "data-widget-config",
      JSON.stringify({
        containerId: "auto-init-container",
        apiKey: "",
        apiEndpoint: "/api/widget",
        theme: "dark"
      })
    );
    document.body.appendChild(script);

    // Ensure the initializer reads our script via document.currentScript
    Object.defineProperty(document, "currentScript", {
      configurable: true,
      get: () => script as HTMLScriptElement
    });

    await act(async () => {
      await import("@/scripts/initialize.widget");
      // Trigger DOMContentLoaded in case initializer deferred auto-init
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    // Global API exposed
    expect(window.FloatingWidget).toBeTruthy();
    expect(typeof window.FloatingWidget.init).toBe("function");
    expect(window.FloatingWidget.instances instanceof Map).toBe(true);

    await waitFor(() => {
      const container = document.getElementById("auto-init-container");
      expect(container).toBeTruthy();
      expect(container?.shadowRoot).toBeTruthy();
    });
  });
});


