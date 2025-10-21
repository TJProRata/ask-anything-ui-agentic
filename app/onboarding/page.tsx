"use client";

import { useState } from "react";
import OnboardingWidget from "@/components/widgets/onboarding-widget/onboarding-widget";

export default function OnboardingPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Onboarding Widget Demo</h1>
          <p className="text-muted-foreground">
            Interactive multi-phase onboarding experience with AI assistance
          </p>
        </div>

        <div className="flex justify-center">
          <OnboardingWidget
            isExpanded={isExpanded}
            onExpandChange={setIsExpanded}
          />
        </div>
      </div>
    </div>
  );
}
