import { AppPage } from "@/components/app/app-page";
import { ButtonIcon } from "@/components/ask-anything/button/button-icon";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { AskButton } from "@/components/ask-anything/ask-button";

// NOTE: This page is meant to display the entire UI component library (base UI components, Ask Anything UI components, etc.)

export default function Components() {
  return (
    <AppPage title="UI Components" description="🚧 WORK IN PROGRESS 🚧">
      {/* UI primitives */}
      {/* <section className="flex flex-col gap-3">
        <h2 className="text-xl font-sans font-semibold">Primitives</h2>
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
      </section> */}

      {/* Base UI Components */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-sans font-bold">Base</h2>
        <div className="flex flex-col gap-3">
          <h3 className="w-fit font-semibold font-mono px-2 py-1 border rounded-sm bg-accent">Button/Icon</h3>
          <div className="w-full sm:max-w-xl flex flex-col sm:flex-row justify-between gap-12">  
            <div className="size-full flex flex-col gap-4">
              <span className="font-semibold text-right">Small</span>
              <div className="size-full flex flex-col justify-between gap-4">
                <div className="min-h-[40px] flex flex-row flex-wrap items-center justify-between gap-10">
                  <span className="text-xs font-mono px-1.5 py-0.5 border rounded-sm bg-accent">Primary</span>
                  <ButtonIcon variant="primary" size="sm" />
                </div>
                <div className="min-h-[40px] flex flex-row flex-wrap items-center justify-between gap-10">
                  <span className="text-xs font-mono px-1.5 py-0.5 border rounded-sm bg-accent">Secondary</span>
                  <ButtonIcon variant="secondary" size="sm" />
                </div>
                <div className="min-h-[40px] flex flex-row flex-wrap items-center justify-between gap-10">
                  <span className="text-xs font-mono px-1.5 py-0.5 border rounded-sm bg-accent">Tertiary</span>
                  <ButtonIcon variant="tertiary" size="sm" />
                </div>
                <div className="min-h-[40px] flex flex-row flex-wrap items-center justify-between gap-10">
                  <span className="text-xs font-mono px-1.5 py-0.5 border rounded-sm bg-accent">Quaternary</span>
                  <ButtonIcon variant="quaternary" size="sm" />
                </div>
              </div>
            </div>
            <div className="size-full flex flex-col gap-4">
              <span className="font-semibold text-right">Large</span>
              <div className="size-full flex flex-col justify-between gap-4">
                <div className="flex flex-row flex-wrap items-center justify-between gap-10">
                  <span className="text-xs font-mono px-1.5 py-0.5 border rounded-sm bg-accent">Primary</span>
                  <ButtonIcon variant="primary" size="lg" />
                </div>
                <div className="flex flex-row flex-wrap items-center justify-between gap-10">
                  <span className="text-xs font-mono px-1.5 py-0.5 border rounded-sm bg-accent">Secondary</span>
                  <ButtonIcon variant="secondary" size="lg" />
                </div>
                <div className="flex flex-row flex-wrap items-center justify-between gap-10">
                  <span className="text-xs font-mono px-1.5 py-0.5 border rounded-sm bg-accent">Tertiary</span>
                  <ButtonIcon variant="tertiary" size="lg" />
                </div>
                <div className="flex flex-row flex-wrap items-center justify-between gap-10">
                  <span className="text-xs font-mono px-1.5 py-0.5 border rounded-sm bg-accent">Quaternary</span>
                  <ButtonIcon variant="quaternary" size="lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">🚧</span>
      </section>

      {/* Ask Anything Components (built using base components) */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-sans font-semibold">Ask Anything</h2>
        <div className="flex flex-col gap-3">
          <h3 className="w-fit font-semibold font-mono px-2 py-1 border rounded-sm bg-accent">AskButton</h3>
          <AskButton />
        </div>
        <span className="text-sm text-muted-foreground">🚧</span>
      </section>
    </AppPage>
  );
}