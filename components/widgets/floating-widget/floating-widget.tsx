import { Button } from "@/components/ui/button";

export function FloatingWidget() {
  return (
    <div className="flex items-center">
      <WidgetButton />
      <WidgetPanel />
    </div>
  );
}

function WidgetButton() {
  return (
    <Button variant="outline" className="px-5 py-2 border rounded-3xl">
      <span className="text-sm">Ask</span>
    </Button>
  );
}

function WidgetPanel() {
  return (
    <div className="hidden p-4 border rounded-3xl">
      <span>WidgetPanel</span>
    </div>
  );
}