import { ThemeToggle } from "@/components/theme/theme-toggle";

export function AppFooter() {
  return (
    <footer className="row-start-3 w-full flex items-center justify-end gap-4">
      <ThemeToggle />
    </footer>
  );
}