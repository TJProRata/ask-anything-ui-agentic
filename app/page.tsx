import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ask Anything UI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Embeddable AI-powered widgets and shareable mini-sites
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Gist Builder */}
          <Link href="/gistplatform">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer border-2 border-purple-100 hover:border-purple-300">
              <div className="text-4xl mb-4">🎨</div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                Gist Builder
              </h2>
              <p className="text-gray-600 mb-4">
                Create shareable mini-sites at custom URLs. Perfect for
                personal landing pages, product showcases, and quick sites.
              </p>
              <div className="text-purple-600 font-semibold">
                Gist Builder →
              </div>
            </div>
          </Link>

          {/* Widgets */}
          <Link href="/widgets">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer border-2 border-blue-100 hover:border-blue-300">
              <div className="text-4xl mb-4">💬</div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                Widget Gallery
              </h2>
              <p className="text-gray-600 mb-4">
                Explore embeddable AI chat widgets. View demos, test
                interactions, and see integration examples.
              </p>
              <div className="text-blue-600 font-semibold">
                View Widgets →
              </div>
            </div>
          </Link>

          {/* Onboarding Demo */}
          <Link href="/onboarding">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer border-2 border-green-100 hover:border-green-300">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                Onboarding Widget
              </h2>
              <p className="text-gray-600 mb-4">
                Interactive multi-phase onboarding experience with AI
                assistance. See the full widget in action.
              </p>
              <div className="text-green-600 font-semibold">
                Try Demo →
              </div>
            </div>
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="text-center text-sm text-gray-500 max-w-4xl mx-auto">
          <p className="mb-2">Built with modern web technologies:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">
              Bun
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">
              Next.js 15
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">
              React 19
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">
              Tailwind CSS v4
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">
              Convex
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">
              shadcn/ui
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
