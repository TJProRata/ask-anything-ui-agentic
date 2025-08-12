import Link from "next/link";
import { AppHeaderNav } from "@/components/app/app-header-nav";

export function AppHeader() {
  return (
    <header className="row-start-1 size-full flex flex-col sm:flex-row items-baseline sm:items-center justify-between">
      <div className="flex flex-col items-center sm:flex-row gap-1 sm:gap-6">
        <span className="text-xl font-semibold font-mono px-2 py-1 border rounded-md bg-accent leading-none">
          <Link href="/">
            ask-anything-ui
          </Link>
        </span>
        <span className=" text-xs font-sans text-muted-foreground">
          Ask Anything UI Components
        </span>
      </div>
      <AppHeaderNav />
    </header>
  );
}