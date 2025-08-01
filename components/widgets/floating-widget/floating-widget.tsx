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
    <Button variant="outline" className="rounded-3xl border px-5 py-2">
      <span className="text-sm">Ask</span>
    </Button>
  );
}

function WidgetPanel() {
  return (
    <div className="hidden rounded-3xl border p-4">
      <span>WidgetPanel</span>
    </div>
  );
}
