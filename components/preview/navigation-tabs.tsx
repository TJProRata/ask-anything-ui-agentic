"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BlueStar } from "@/components/icons/blue-star";
import { Wand } from "@/components/icons/wand";
import { cn } from "@/lib/utils";
import { 
  ArrowRightIcon, 
  ImageIcon, 
  MusicIcon, 
  PaletteIcon, 
  SlidersHorizontalIcon, 
  TypeIcon 
} from "lucide-react";
import React, { Fragment } from "react";

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
    <div className={cn("flex flex-col shrink-0", className)}>
      {/* Suggestion Buttons styled like onboarding widget */}
      {tabs.map((tab, index) => (
        <Fragment key={tab.id}>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => handleTabClick(tab)}
            className={cn(
              "justify-start text-left h-[30px] px-0 leading-[140%] hover:bg-transparent",
              "relative" // For badge positioning
            )}
            style={{
              color: 'var(--content-default, #151022)',
              fontFamily: 'var(--font-family-accent, "Work Sans")'
            }}
          >
            <BlueStar className="w-5 h-5 mr-3" />
            {tab.label}
            
            {/* Badge for Tweaks tab positioned after text */}
            {tab.badge && (
              <span className="ml-1 text-xs bg-yellow-400 text-black rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {tab.badge}
              </span>
            )}
          </Button>
          {index < tabs.length - 1 && <Separator className="border-t border-dashed border-gray-300 bg-transparent my-1" />}
        </Fragment>
      ))}

      {/* More Button styled like onboarding widget */}
      <div className="flex justify-center pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onTabClick?.("more")}
          className={cn(
            "rounded-[20px] px-2.5 py-1 gap-1 border border-black hover:bg-transparent"
          )}
          style={{
            background: 'var(--background-action-secondary, rgba(255, 255, 255, 0.10))',
            color: 'var(--content-default, #151022)',
            fontSize: '16px',
            fontFamily: 'Work Sans',
            fontWeight: 500,
            lineHeight: '22.40px',
            letterSpacing: '0.32px'
          }}
        >
          <Wand className="w-3.5 h-3.5" />
          More
        </Button>
      </div>
    </div>
  );
};

export default NavigationTabs;