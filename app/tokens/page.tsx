import { AppPage } from "@/components/app/app-page";

export default function Tokens() {
  return (
    <AppPage title="Design Tokens" description="🚧 WORK IN PROGRESS 🚧">
      {/* Color Tokens */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-sans font-semibold">Colors</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-4 h-4 bg-primary"></div>
            <span className="text-sm">primary</span>
            <span className="text-xs text-muted-foreground">--color-primary</span>
          </div>
          <span className="text-sm">🚧</span>
        </div>
      </div>

      {/* Spacing Tokens */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-sans font-semibold">Spacing</h2>
        <div className="flex flex-col gap-3">
          <span className="text-sm">🚧</span>
          {/* ... */}
        </div>
      </div>

      {/* Typography Tokens */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-sans font-semibold">Typography</h2>
        <div className="flex flex-col gap-3">
          <span className="text-sm">🚧</span>
          {/* ... */}
        </div>
      </div>
      {/* <h2 className="text-xl font-sans font-semibold">Breakpoints</h2> */}
    </AppPage>
  );
}