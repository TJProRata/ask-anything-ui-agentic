import { FloatingWidget } from "@/components/widgets/floating-widget/floating-widget";
import { AskButton } from "@/components/ask-anything/ask-button";

export default function Widgets() {
  return (
    <>
      {/* TODO: Clean up FloatingWidget props */}
      <FloatingWidget
        containerId="ask-anything-floating-widget"
        apiKey={process.env.NEXT_PUBLIC_ASK_ANYTHING_API_KEY || ""}
        apiEndpoint="https://api.ask-anything.com/v1"
        theme="dark"
        buttonText="Ask"
        headerTitle="Ask New York Times Anything!"
        placeholder="Ask Anything"
        config={{
          containerId: "ask-anything-floating-widget",
          apiKey: process.env.NEXT_PUBLIC_ASK_ANYTHING_API_KEY || "",
          apiEndpoint: "https://api.ask-anything.com/v1",
          theme: "dark",
          buttonText: "Ask",
          headerTitle: "Ask New York Times Anything!",
          placeholder: "Ask Anything",
        }}
      />
      <AskButton />
      <span>🚧</span>
    </>
  );
}
