import { AppPage } from "@/components/app/app-page";
import { FloatingWidget } from "@/components/widgets/floating-widget/floating-widget";

export default function Widgets() {
  return (
    <AppPage title="Widgets" description="🚧 WORK IN PROGRESS 🚧">
      <div className="w-fit flex flex-row items-center gap-4">
        <h3 className="w-fit text-sm font-medium font-mono px-2 py-1 border rounded-sm bg-accent">FloatingWidget</h3>
        <span className="text-sm text-muted-foreground">🚧</span>
      </div>
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
    </AppPage>
  );
}
