"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface MobileDeviceFrameProps {
  children: React.ReactNode;
  variant?: "iphone" | "android";
  className?: string;
}

/**
 * Mobile Device Frame Component
 * Creates an iPhone-style device frame with rounded corners, shadow, and responsive scaling.
 * Used to preview mobile content in a realistic device context.
 */
export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  variant = "iphone", // Currently only supports iPhone variant
  className,
}) => {
  // Future: Add Android variant support
  console.log(`Rendering device frame with variant: ${variant}`);
  return (
    <div className={cn("flex justify-center items-center p-4", className)}>
      {/* Device Frame Container */}
      <div
        className={cn(
          // Device frame dimensions (iPhone-like aspect ratio)
          "relative w-full max-w-[375px]",
          "aspect-[375/812]", // iPhone dimensions ratio
          
          // Visual styling
          "bg-black rounded-[40px] p-3",
          "shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
          
          // Responsive behavior
          "mx-auto",
          "max-h-[90vh]", // Prevent overflow on small screens
          
          // Smooth transitions
          "transition-all duration-300 ease-out"
        )}
      >
        {/* Status Bar Area */}
        <div className="relative w-full h-6 flex items-center justify-center mb-2">
          {/* Camera Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />
          
          {/* Status Bar Content */}
          <div className="flex justify-between items-center w-full px-6 text-white text-xs font-medium">
            <div className="flex items-center gap-1">
              <span>9:41</span>
            </div>
            <div className="flex items-center gap-1">
              {/* Signal bars */}
              <div className="flex gap-1">
                <div className="w-1 h-2 bg-white rounded-full opacity-60" />
                <div className="w-1 h-2 bg-white rounded-full opacity-80" />
                <div className="w-1 h-2 bg-white rounded-full" />
                <div className="w-1 h-2 bg-white rounded-full" />
              </div>
              {/* WiFi icon */}
              <div className="w-3 h-3">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
              </div>
              {/* Battery */}
              <div className="w-6 h-3 border border-white rounded-sm relative">
                <div className="w-1 h-1 bg-white rounded-full absolute -right-1.5 top-1" />
                <div className="w-4 h-1.5 bg-white rounded-sm m-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Screen Content Area */}
        <div 
          className={cn(
            "relative w-full flex-1 bg-white rounded-[32px] overflow-hidden",
            "min-h-0", // Allows flex child to shrink
            // Focus outline for accessibility
            "focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-opacity-75"
          )}
          role="main"
          aria-label="Mobile preview content"
        >
          {children}
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pt-2">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default MobileDeviceFrame;