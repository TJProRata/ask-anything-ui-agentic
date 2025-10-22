"use client";

import { PromptInput, type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LightbulbIcon, SendIcon } from "lucide-react";
import React, { type FormEvent } from "react";

export interface EditInputSectionProps {
  onSubmit?: (message: PromptInputMessage, event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

/**
 * Edit Input Section Component
 * Customized input field with dark theme styling and lightbulb icon.
 * Integrates with existing prompt-input component for consistent behavior.
 */
export const EditInputSection: React.FC<EditInputSectionProps> = ({
  onSubmit,
  className,
}) => {
  const handleSubmit = (message: PromptInputMessage, event: FormEvent<HTMLFormElement>) => {
    console.log("Edit input submitted:", message);
    onSubmit?.(message, event);
  };

  return (
    <div className={cn("w-full", className)}>
      <PromptInput
        onSubmit={handleSubmit}
        className={cn(
          // Dark theme styling
          "bg-[#2C2C2E] border-gray-700 rounded-2xl overflow-hidden",
          "shadow-lg",
          // Remove default styling
          "border-0 shadow-none divide-y-0"
        )}
      >
        <div className="flex items-center gap-3 p-4">
          {/* Text Input Area */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              name="message"
              placeholder="Make an edit..."
              className={cn(
                "w-full bg-transparent text-white placeholder:text-gray-400",
                "text-base font-normal border-none outline-none ring-0",
                "focus:ring-0 focus:outline-none",
                // Custom styling to match design
                "placeholder:font-normal",
                // Touch-friendly sizing
                "min-h-[44px] py-2"
              )}
              style={{ lineHeight: '140%' }}
              aria-label="Edit your microsite content"
              autoComplete="off"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Lightbulb Icon */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "w-8 h-8 text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50",
                "rounded-lg transition-colors duration-200"
              )}
              aria-label="AI suggestions"
            >
              <LightbulbIcon className="w-4 h-4" />
            </Button>

            {/* Send Button */}
            <Button
              type="submit"
              size="icon"
              className={cn(
                "w-8 h-8 bg-white text-gray-900 hover:bg-gray-100",
                "rounded-lg transition-colors duration-200"
              )}
              aria-label="Send message"
            >
              <SendIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </PromptInput>
    </div>
  );
};

export default EditInputSection;