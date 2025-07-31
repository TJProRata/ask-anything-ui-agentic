"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AppHeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 text-sm font-mono">
      <Button variant="link" asChild>
        <Link href="/ui" className={pathname === "/ui" ? "underline" : ""}>UI</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/widgets" className={pathname === "/widgets" ? "underline" : ""}>Widgets</Link>
      </Button>
    </nav>
  );
}