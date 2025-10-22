import { log } from "@/lib/logger";

/**
 * Public Gist Page
 * Displays a published mini-site at /[slug]
 *
 * TODO: Implement full gist rendering:
 * 1. Query Convex for gist by slug
 * 2. Verify gist status is "public"
 * 3. Render MiniSiteLayout with hero and tiles
 * 4. Include FloatingCTA button
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicGistPage({ params }: PageProps) {
  const { slug } = await params;

  log.init(`Public gist page: ${slug}`);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Public Gist: {slug}
        </h1>
        <p className="text-gray-600 mb-6">
          This page will display the published mini-site for this gist.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            🚧 Coming Soon
          </h2>
          <p className="text-sm text-blue-700">
            Full gist rendering with hero section, content tiles, and embedded
            AI chat widget.
          </p>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <p>URL: gist.link/{slug}</p>
        </div>
      </div>
    </div>
  );
}
