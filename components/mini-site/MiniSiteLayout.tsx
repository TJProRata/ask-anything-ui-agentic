import { ReactNode } from "react";

/**
 * MiniSiteLayout Component
 * Wrapper layout for gist mini-sites
 *
 * TODO: Implement full layout with:
 * - SEO meta tags from gist data
 * - Widget script injection
 * - Analytics tracking
 * - Responsive container
 */

interface MiniSiteLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MiniSiteLayout({
  children,
  className = "",
}: MiniSiteLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* TODO: Add meta tags, scripts, etc. */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
