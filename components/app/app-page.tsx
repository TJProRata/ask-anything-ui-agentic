import { cn } from "@/lib/utils";

interface AppPageProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function AppPage({ title, description, className, children }: AppPageProps) {
  return (
    <div className={cn("app-page size-full row-start-2 flex flex-col gap-8", className)}>
      <div className="app-page-header w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6">
        <h1 className="text-2xl font-sans font-bold">{title}</h1>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <main className="flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
}