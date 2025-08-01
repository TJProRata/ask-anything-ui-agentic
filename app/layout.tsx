import type { Metadata } from "next";
import { Work_Sans, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AppHeader } from "@/components/app/app-header";
import { AppFooter } from "@/components/app/app-footer";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ask-anything-ui",
  description: "Ask Anything UI component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${workSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="font-sans grid min-h-screen max-w-6xl mx-auto grid-rows-[46px_1fr_42px] sm:grid-rows-[36px_1fr_42px] items-center justify-items-center gap-16 p-4 sm:p-8">
            <AppHeader />
            <main className="row-start-2 flex flex-col items-center gap-8">
              {children}
            </main>
            <AppFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
