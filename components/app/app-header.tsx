import Link from "next/link";
import { AppHeaderNav } from "@/components/app/app-header-nav";

export function AppHeader() {
  return (
    <header className="row-start-1 w-full flex items-center justify-between">
      <div className="flex flex-col items-center sm:flex-row gap-1 sm:gap-6">
        <Link href="/">
          <span className="text-xl font-semibold font-mono px-2 py-1 border rounded-md bg-accent">ask-anything-ui</span>
        </Link>
        <span className=" text-xs font-sans text-muted-foreground">Ask Anything UI Components</span>
      </div>
      <AppHeaderNav />
    </header>
  );
}