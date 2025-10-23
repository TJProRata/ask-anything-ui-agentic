"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface DemoMicrositeProps {
  className?: string;
}

/**
 * Demo Microsite Content Component
 * Placeholder content showing a product card layout similar to Rolex Explorer II.
 * This is temporary demo content that will be replaced with actual gist content.
 * 
 * @deprecated This component contains placeholder content only
 */
export const DemoMicrosite: React.FC<DemoMicrositeProps> = ({ className }) => {
  return (
    <div className={cn("w-full h-full bg-white flex flex-col", className)}>
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto" 
           style={{
             scrollbarWidth: 'thin',
             scrollbarColor: 'rgba(0,0,0,0.2) transparent'
           }}>
        {/* Header Navigation */}
      <header className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="font-semibold text-lg">ROLEX</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-6">
        {/* Product Image Placeholder */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
          </div>
          
          {/* Product Badge */}
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
            NEW
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Explorer II
            </h1>
            <p className="text-lg text-gray-600 mb-1">
              Oyster, 42 mm, Oystersteel
            </p>
            <p className="text-sm text-gray-500">
              Reference: 226570
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-3 py-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-semibold text-gray-900">Waterproof</div>
              <div className="text-xs text-gray-600">100m / 330ft</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-semibold text-gray-900">Movement</div>
              <div className="text-xs text-gray-600">Perpetual</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              The Rolex Explorer II is a robust and reliable tool watch, 
              originally designed for cave explorers and polar expeditions. 
              This timepiece features a distinctive 24-hour graduated bezel and orange GMT hand.
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-3 pt-4">
            <Button 
              className="w-full h-12 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              size="lg"
            >
              Explore Collection
            </Button>
            
            <Button 
              variant="outline"
              className="w-full h-12 border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              size="lg"
            >
              Find a Store
            </Button>
          </div>

          {/* Footer Info */}
          <div className="pt-6 text-center">
            <p className="text-xs text-gray-500">
              This is demo content for preview purposes only.
              <br />
              Your actual gist content will appear here.
            </p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default DemoMicrosite;