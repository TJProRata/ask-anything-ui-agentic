"use client";

import { useState, useEffect } from "react";
import OnboardingWidget from "@/components/widgets/onboarding-widget/onboarding-widget";
import { log } from "@/lib/logger";

/**
 * Gist Platform Entry Page
 * Entry point for users to create their shareable mini-sites (gists)
 * Uses the onboarding widget to collect user information
 */
export default function GistPlatformPage() {
  const [isExpanded, setIsExpanded] = useState(true); // Start expanded for gist creation flow

  useEffect(() => {
    log.init("Gist Platform page loaded");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-4xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create Your Gist
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

        {/* Onboarding Widget */}
        <div className="flex justify-center">
          <OnboardingWidget
            isExpanded={isExpanded}
            onExpandChange={setIsExpanded}
          />
        </div>

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
