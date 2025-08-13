import { describe, it, expect } from "bun:test";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FloatingWidgetCard } from "@/components/widgets/floating-widget/floating-widget-card";

describe("FloatingWidgetCard", () => {
  const baseProps = {
    isLoading: false,
    messages: [],
    headerTitle: "Ask Anything",
    placeholder: "Type",
    error: null as string | null,
    onSendMessage: (_: string) => {},
    onCollapse: () => {},
  };

  it("renders header and input, submits message", () => {
    const calls: string[] = [];
    const { getByText, getByPlaceholderText } = render(
      <FloatingWidgetCard
        {...baseProps}
        onSendMessage={(msg) => calls.push(msg)}
      />
    );
    expect(getByText(/ask anything/i)).toBeTruthy();
    const input = getByPlaceholderText(/type/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.submit(input.closest("form")!);
    expect(calls).toEqual(["Hello"]);
  });
});


