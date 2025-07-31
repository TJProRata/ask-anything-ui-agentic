import Link from "next/link";
import { AppHeaderNav } from "@/components/app/app-header-nav";

export function AppHeader() {
  return (
    <header className="row-start-1 w-full flex items-center justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-6">
        <Link href="/">
          <h1 className="text-lg sm:text-xl font-bold font-mono">ask-anything-ui</h1>
        </Link>
        <span className=" text-[10px] font-mono text-muted-foreground">Ask Anything UI Components</span>
      </div>
      <AppHeaderNav />
    </header>
  );
}