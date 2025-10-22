"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GistCreationWidget } from "@/components/widgets/gist-creation-widget/gist-creation-widget";
import { log } from "@/lib/logger";
import type { CreatePreviewResponse } from "@/components/widgets/onboarding-widget/types";

/**
 * Gist Builder Entry Page
 * Entry point for users to create their shareable mini-sites (gists)
 * Uses the gist creation widget to collect user information through a 10-step flow
 */
export default function GistPlatformPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    log.init("Gist Builder page loaded");
  }, []);

  const handleGistCreated = (data: CreatePreviewResponse) => {
    log.api(`Gist creation complete: ${data.slug}`);
    setPreviewUrl(data.previewUrl);
    setShowSuccess(true);

    // Redirect to preview after showing success message
    setTimeout(() => {
      router.push(data.previewUrl);
    }, 2000);
  };

  const handleStepChange = (step: number) => {
    log.api(`User reached step ${step}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-4xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Gist Builder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build a shareable mini-site in minutes. Answer a few questions and
            we&apos;ll generate a personalized landing page at{" "}
            <span className="font-semibold text-purple-600">
              gist.link/yourname
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Fast Setup</h3>
            <p className="text-sm text-gray-600">
              Takes just minutes to create
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold mb-1">Auto-Generated</h3>
            <p className="text-sm text-gray-600">
              AI creates your content
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="font-semibold mb-1">Shareable</h3>
            <p className="text-sm text-gray-600">
              Instant custom URL
            </p>
          </div>
        </div>

        {/* Gist Creation Widget */}
        <div className="flex justify-center">
          <GistCreationWidget
            isExpanded={isExpanded}
            onExpandChange={setIsExpanded}
            onComplete={handleGistCreated}
            onStepChange={handleStepChange}
          />
        </div>

        {/* Success Message */}
        {showSuccess && previewUrl && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Your gist is ready!
            </h3>
            <p className="text-green-700 mb-4">
              Redirecting to your preview...
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Your gist will be created in preview mode. You can edit and publish
            when ready.
          </p>
        </div>
      </div>
    </div>
  );
}
