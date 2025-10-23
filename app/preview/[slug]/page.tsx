import { PreviewPageClient } from "@/components/preview/preview-page-client";
import { log } from "@/lib/logger";
import { Suspense } from "react";

/**
 * Preview Gist Page - Gizmo-Style Mobile Editor Interface
 * Features a mobile device frame with live preview and bottom editing controls.
 * Displays demo content in a realistic mobile viewport with professional styling.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewGistPage({ params }: PageProps) {
  const { slug } = await params;

  log.init(`Preview gist page: ${slug}`);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ 
        background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)' 
      }}>
        <div className="text-gray-900">Loading preview...</div>
      </div>
    }>
      <PreviewPageClient slug={slug} />
    </Suspense>
  );
}