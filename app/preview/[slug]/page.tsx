import { log } from "@/lib/logger";

/**
 * Preview Gist Page
 * Displays an editable preview of a gist at /preview/[slug]
 *
 * TODO: Implement full preview experience:
 * 1. Query Convex for gist by slug
 * 2. Verify gist exists and user has access
 * 3. Render MiniSiteLayout with editable sidebar
 * 4. Enable real-time updates via Convex
 * 5. Add "Publish" button to change status to "public"
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewGistPage({ params }: PageProps) {
  const { slug } = await params;

  log.init(`Preview gist page: ${slug}`);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
          PREVIEW MODE
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Preview: {slug}
        </h1>
        <p className="text-gray-600 mb-6">
          This page will display your editable gist preview with a sidebar for
          customization.
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-purple-900 mb-2">
            🎨 Edit Your Gist
          </h2>
          <p className="text-sm text-purple-700 mb-4">
            Full editing interface with sidebar for questions 7-10, live preview
            updates, and publish button.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left text-sm">
            <div className="bg-white p-3 rounded">
              <strong>✏️ Edit</strong>
              <p className="text-xs text-gray-600 mt-1">
                Modify hero, tiles, and content
              </p>
            </div>
            <div className="bg-white p-3 rounded">
              <strong>👁️ Preview</strong>
              <p className="text-xs text-gray-600 mt-1">
                See changes in real-time
              </p>
            </div>
            <div className="bg-white p-3 rounded">
              <strong>💬 Answer</strong>
              <p className="text-xs text-gray-600 mt-1">
                Complete questions 7-10
              </p>
            </div>
            <div className="bg-white p-3 rounded">
              <strong>🚀 Publish</strong>
              <p className="text-xs text-gray-600 mt-1">
                Make it live at /{slug}
              </p>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <p>Preview URL: /preview/{slug}</p>
          <p className="mt-1">
            Public URL (after publish): gist.link/{slug}
          </p>
        </div>
      </div>
    </div>
  );
}
