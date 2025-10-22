"use client";

import BottomControlBar from "@/components/preview/bottom-control-bar";
import DemoMicrosite from "@/components/preview/demo-microsite";
import EditInputSection from "@/components/preview/edit-input-section";
import MobileDeviceFrame from "@/components/preview/mobile-device-frame";
import NavigationTabs from "@/components/preview/navigation-tabs";
import { type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";
import { type FormEvent } from "react";

interface PreviewPageClientProps {
  slug: string;
}

export function PreviewPageClient({ slug }: PreviewPageClientProps) {
  const handleEditSubmit = (message: PromptInputMessage, _event: FormEvent<HTMLFormElement>) => {
    console.log(`Edit submitted for ${slug}:`, message);
    // TODO: Integrate with AI editing capabilities
  };

  const handleTabClick = (tabId: string) => {
    console.log("Tab clicked:", tabId);
    // TODO: Add functionality for navigation tabs
  };

  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Main Content Area */}
      <main 
        className={cn(
          "relative w-full min-h-screen",
          "flex items-center justify-center",
          "px-4 py-8",
          // Add bottom padding to account for fixed bottom bar
          "pb-32 md:pb-36"
        )}
      >
        {/* Device Frame with Demo Content */}
        <MobileDeviceFrame className="w-full max-w-lg">
          <DemoMicrosite />
        </MobileDeviceFrame>
      </main>

      {/* Bottom Control Bar */}
      <BottomControlBar>
        {/* Edit Input Section */}
        <EditInputSection onSubmit={handleEditSubmit} />
        
        {/* Navigation Tabs */}
        <NavigationTabs onTabClick={handleTabClick} />
      </BottomControlBar>
    </div>
  );
}