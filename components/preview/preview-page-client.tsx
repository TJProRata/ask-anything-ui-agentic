"use client";

import DemoMicrosite from "@/components/preview/demo-microsite";
import MobileDeviceFrame from "@/components/preview/mobile-device-frame";
import NavigationTabs from "@/components/preview/navigation-tabs";
import { type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import {
  GlassWidgetContainer,
  GlassWidgetContent,
  GlassWidgetFooter
} from "@/components/ai-elements/glass_widget_container";
import {
  PromptInput,
  GradientBorderContainer,
  GradientPlaceholderInput,
  IconButton
} from "@/components/ai-elements/prompt-input";
import { PoweredByButton } from "@/components/ui/powered-by-button";
import { PlusIcon, MicIcon, UserCircle } from "lucide-react";

interface PreviewPageClientProps {
  slug: string;
}

export function PreviewPageClient({ slug }: PreviewPageClientProps) {
  const handleEditSubmit = (message: PromptInputMessage) => {
    console.log(`Edit submitted for ${slug}:`, message);
    // TODO: Integrate with AI editing capabilities
  };

  const handleTabClick = (tabId: string) => {
    console.log("Tab clicked:", tabId);
    // TODO: Add functionality for navigation tabs
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4 py-8"
      style={{
        background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)'
      }}
    >
      {/* Glassmorphism Widget Container */}
      <GlassWidgetContainer
        isExpanded={true}
        positioning="relative"
        expandedWidth={392}
        expandedHeight={500}
        className="max-w-md w-full"
      >
        {/* Device Frame with Demo Content */}
        <GlassWidgetContent className="flex flex-col h-full px-0 py-0 overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-4">
            <MobileDeviceFrame className="w-full max-w-[375px] h-[475px]">
              <DemoMicrosite />
            </MobileDeviceFrame>
          </div>
        </GlassWidgetContent>

        {/* Glassmorphism Footer with Input and Navigation */}
        <GlassWidgetFooter className="space-y-4">
          {/* Edit Input Section with Glassmorphism Styling */}
          <PromptInput
            variant="glassmorphism"
            onSubmit={handleEditSubmit}
            maxWidth={348}
          >
            <GradientBorderContainer maxWidth={348}>
              <div className="flex items-center gap-1 px-1.5 py-2 h-12">
                <IconButton
                  icon={<PlusIcon className="size-5" />}
                  aria-label="Add attachment"
                />
                <GradientPlaceholderInput
                  placeholder="Make an edit..."
                  name="edit"
                />
                <IconButton
                  icon={<MicIcon className="size-5" />}
                  aria-label="Voice input"
                />
                <IconButton
                  icon={<UserCircle className="size-6" />}
                  aria-label="User profile"
                />
              </div>
            </GradientBorderContainer>
          </PromptInput>
          
          {/* Navigation Tabs */}
          <NavigationTabs onTabClick={handleTabClick} />

          {/* Powered By Button */}
          <div className="flex justify-center pt-2">
            <PoweredByButton />
          </div>
        </GlassWidgetFooter>
      </GlassWidgetContainer>
    </div>
  );
}