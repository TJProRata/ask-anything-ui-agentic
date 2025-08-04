import { AppPage } from "@/components/app/app-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AskButton } from "@/components/ask-anything/ask-button";

// NOTE: This page is meant to display the entire UI component library (base UI components, Ask Anything UI components, etc.)

export default function Components() {
  return (
    <AppPage title="UI Components" description="🚧 WORK IN PROGRESS 🚧">
      {/* Base Components (UI primitives) */}
      <h2 className="text-xl font-sans font-semibold">Base</h2>
      <div className="w-fit flex flex-col gap-4">
        <h3 className="w-fit text-sm font-medium font-mono px-2 py-1 border rounded-sm bg-accent">Button</h3>
        <div className="flex flex-row flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div className="w-fit flex flex-col gap-4">
        <h3 className="w-fit text-sm font-medium font-mono px-2 py-1 border rounded-sm bg-accent">Input</h3>
        <Input placeholder="Input" />
      </div>
      <span className="text-sm text-muted-foreground">🚧</span>

      {/* Ask Anything Components (built using base components) */}
      <h2 className="text-xl font-sans font-semibold">Ask Anything</h2>
      <div className="flex flex-col gap-3">
        <h3 className="w-fit text-sm font-medium font-mono px-2 py-1 border rounded-sm bg-accent">AskButton</h3>
        <AskButton />
      </div>
      <span className="text-sm text-muted-foreground">🚧</span>
    </AppPage>
  );
}