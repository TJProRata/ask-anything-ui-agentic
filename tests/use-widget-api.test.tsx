import { describe, it, expect, beforeEach } from "bun:test";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import { useWidgetAPI } from "@/hooks/use-widget-api";
import React from "react";

function HookHarness({ message }: { message: string }) {
  const { sendMessage, error, isLoading } = useWidgetAPI("test-key", "/api/widget");
  return (
    <div>
      <button
        onClick={async () => {
          try {
            const res = await sendMessage(message, []);
            (document.getElementById("result") as HTMLDivElement).textContent = res;
          } catch {
            // ignore
          }
        }}
      >
        Send
      </button>
      <div id="loading">{String(isLoading)}</div>
      <div id="error">{error ?? ""}</div>
      <div id="result"></div>
    </div>
  );
}

describe("useWidgetAPI", () => {
  // const apiKey = "test-key";
  // const endpoint = "/api/widget";

  beforeEach(() => {
    // reset fetch before each test
    // @ts-expect-error overwrite
    global.fetch = undefined;
  });

  it("sends message and returns response", async () => {
    const mockResponse = { message: "Hello from API" };
    global.fetch = (async () =>
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })) as unknown as typeof fetch;

    const { getByText } = render(<HookHarness message="Hello" />);
    const btn = getByText("Send");
    await act(async () => {
      await fireEvent.click(btn);
    });
    await waitFor(() => {
      expect(document.getElementById("result")?.textContent).toBe("Hello from API");
      expect(document.getElementById("error")?.textContent).toBe("");
    });
  });

  it("sets error on non-OK response", async () => {
    global.fetch = (async () => new Response("fail", { status: 500 })) as unknown as typeof fetch;

    const { getByText } = render(<HookHarness message="Hi" />);
    const btn = getByText("Send");
    await act(async () => {
      await fireEvent.click(btn);
    });
    await waitFor(() => {
      expect(document.getElementById("error")?.textContent || "").toContain("API error");
    });
  });
});


