"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AppHeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 text-sm font-mono">
      <Button variant="link" asChild className="px-0 py-0">
        <Link href="/tokens" className={cn(pathname === "/tokens" && "underline")}>Tokens</Link>
      </Button>
      <Button variant="link" asChild className="px-0 py-0">
        <Link href="/components" className={cn(pathname === "/components" && "underline")}>Components</Link>
      </Button>
      <Button variant="link" asChild className="px-0 py-0">
        <Link href="/widgets" className={pathname === "/widgets" ? "underline" : ""}>Widgets</Link>
      </Button>
    </nav>
  );
}