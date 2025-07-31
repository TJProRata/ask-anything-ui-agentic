import Image from "next/image";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[64px_1fr_64px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <header className="row-start-1 w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">ask-anything-ui</h1>
        <ThemeToggle />
      </header>
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <span>main</span>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
        <span>footer</span>
      </footer>
    </div>
  );
}
