"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AppHeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-0 text-sm font-mono">
      <Button variant="link" asChild>
        <Link href="/tokens" className={pathname === "/tokens" ? "underline" : ""}>Tokens</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/components" className={pathname === "/components" ? "underline" : ""}>Components</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/widgets" className={pathname === "/widgets" ? "underline" : ""}>Widgets</Link>
      </Button>
    </nav>
  );
}