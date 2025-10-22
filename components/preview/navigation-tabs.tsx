"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ArrowRightIcon, 
  ImageIcon, 
  MusicIcon, 
  PaletteIcon, 
  SlidersHorizontalIcon, 
  TypeIcon 
} from "lucide-react";
import React from "react";

export interface NavigationTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  onClick?: () => void;
  special?: boolean; // For the Arrow button styling
}

export interface NavigationTabsProps {
  onTabClick?: (tabId: string) => void;
  className?: string;
}

/**
 * Navigation Tabs Component
 * Row of icon buttons for Colors, Tweaks, Images, Sounds, Text, and Arrow.
 * All tabs are placeholders with no functionality yet.
 * Features hover states and the special Tweaks "2" badge.
 */
export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  onTabClick,
  className,
}) => {
  const tabs: NavigationTab[] = [
    {
      id: "colors",
      label: "Colors",
      icon: <PaletteIcon className="w-5 h-5" />,
      onClick: () => onTabClick?.("colors"),
    },
    {
      id: "tweaks",
      label: "Tweaks",
      icon: <SlidersHorizontalIcon className="w-5 h-5" />,
      badge: "2",
      onClick: () => onTabClick?.("tweaks"),
    },
    {
      id: "images",
      label: "Images",
      icon: <ImageIcon className="w-5 h-5" />,
      onClick: () => onTabClick?.("images"),
    },
    {
      id: "sounds",
      label: "Sounds",
      icon: <MusicIcon className="w-5 h-5" />,
      onClick: () => onTabClick?.("sounds"),
    },
    {
      id: "text",
      label: "Text",
      icon: <TypeIcon className="w-5 h-5" />,
      onClick: () => onTabClick?.("text"),
    },
    {
      id: "arrow",
      label: "More",
      icon: <ArrowRightIcon className="w-5 h-5" />,
      special: true,
      onClick: () => onTabClick?.("arrow"),
    },
  ];

  const handleTabClick = (tab: NavigationTab) => {
    // Placeholder functionality - just log for now
    console.log(`Tab clicked: ${tab.label}`);
    tab.onClick?.();
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-center gap-6">
        {tabs.map((tab) => (
          <div key={tab.id} className="flex flex-col items-center gap-2">
            {/* Tab Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleTabClick(tab)}
                className={cn(
                  // Base styling
                  "relative text-gray-400 hover:text-white hover:bg-gray-800/50",
                  "transition-all duration-200 rounded-xl",
                  "hover:scale-105 active:scale-95", // Subtle animations
                  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50",
                  
                  // Special styling for Arrow button
                  tab.special && [
                    "w-12 h-12 bg-gray-800/50 text-gray-300",
                    "hover:bg-gray-700/50 hover:text-white hover:shadow-lg",
                    "rounded-full" // Circular for arrow
                  ],
                  
                  // Default styling for other buttons
                  !tab.special && [
                    "w-10 h-10 min-h-[44px] min-w-[44px]" // Touch-friendly sizing
                  ]
                )}
                aria-label={tab.label}
              >
                {tab.icon}
              </Button>

              {/* Badge for Tweaks tab */}
              {tab.badge && (
                <div
                  className={cn(
                    "absolute -top-1 -right-1 w-5 h-5",
                    "bg-yellow-400 text-black text-xs font-bold",
                    "rounded-full flex items-center justify-center",
                    "ring-2 ring-gray-900" // Dark background ring
                  )}
                >
                  {tab.badge}
                </div>
              )}
            </div>

            {/* Tab Label */}
            <span
              className={cn(
                "text-xs font-medium text-gray-400",
                "transition-colors duration-200",
                // Make it slightly larger for special arrow button
                tab.special && "text-xs"
              )}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;