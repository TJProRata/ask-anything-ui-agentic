"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface BottomControlBarProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Bottom Control Bar Container
 * Fixed positioning container that houses input section and navigation tabs.
 * Features dark theme styling consistent with Gizmo interface design.
 */
export const BottomControlBar: React.FC<BottomControlBarProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        // Fixed positioning at bottom
        "fixed bottom-0 left-0 right-0 z-50",
        
        // Dark theme styling
        "bg-gray-900/95 backdrop-blur-sm",
        "border-t border-gray-800",
        
        // Layout and spacing
        "px-4 py-6 pb-8", // Extra bottom padding for safe area
        
        // Responsive behavior
        "md:px-6 lg:px-8",
        
        // Support for safe area (mobile devices)
        "supports-[padding:max(0px)]:pb-[max(2rem,env(safe-area-inset-bottom))]",
        
        // Smooth transitions
        "transition-all duration-200 ease-out",
        
        className
      )}
    >
      {/* Content Container */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomControlBar;