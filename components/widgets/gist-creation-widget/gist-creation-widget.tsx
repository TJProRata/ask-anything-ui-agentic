"use client";

import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PoweredByButton } from "@/components/ui/powered-by-button";
import {
  GlassWidgetContainer,
  GlassWidgetHeader,
  GlassWidgetContent,
  GlassWidgetFooter,
} from "@/components/ai-elements/glass_widget_container";
import { SimpleProgressBar } from "@/components/ai-elements/simple-progress-bar";
import { SearchingAnimation } from "@/components/animations/searching-animation";
import {
  GradientPlaceholderInput,
  GradientSubmitButton,
  GradientBorderContainer,
} from "@/components/ai-elements/prompt-input";
import { Check, ChevronLeft } from "lucide-react";
import { BlueStar } from "@/components/icons/blue-star";
import { Wand } from "@/components/icons/wand";
import { cn } from "@/lib/utils";
import { useGistForm } from "@/hooks/use-gist-form";
import type { CreatePreviewResponse } from "../onboarding-widget/types";
import { log } from "@/lib/logger";

interface GistCreationWidgetProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  onComplete?: (data: CreatePreviewResponse) => void;
  onStepChange?: (step: number) => void;
}

// Phase configuration for 10-step gist creation flow
const PHASES = [
  {
    step: 1,
    heading: "What's this gist about?",
    subheading: "Choose the type that best describes your content",
    options: [
      { label: "A person", value: "person" },
      { label: "A product", value: "product" },
      { label: "A place", value: "place" },
    ],
    field: "type" as const,
  },
  {
    step: 2,
    heading: "Give it a name",
    subheading: "This will be your gist's title and URL",
    inputType: "text",
    field: "title" as const,
    placeholder: "Enter your title...",
  },
  {
    step: 3,
    heading: "What's the main goal?",
    subheading: "What do you want visitors to do?",
    options: [
      { label: "Book a call", value: "book" },
      { label: "Buy now", value: "buy" },
      { label: "Join waitlist", value: "waitlist" },
    ],
    field: "goal" as const,
  },
  {
    step: 4,
    heading: "Who's it for?",
    subheading: "Your target audience",
    options: [
      { label: "Prospects", value: "prospects" },
      { label: "Fans", value: "fans" },
      { label: "Investors", value: "investors" },
    ],
    field: "audience" as const,
  },
  {
    step: 5,
    heading: "Pick a vibe",
    subheading: "Choose the tone for your gist",
    options: [
      { label: "Friendly", value: "friendly" },
      { label: "Professional", value: "professional" },
      { label: "Bold", value: "bold" },
    ],
    field: "vibe" as const,
  },
  {
    step: 6,
    heading: "Add one source",
    subheading: "Where should we pull content from?",
    inputType: "url",
    field: "source_url" as const,
    placeholder: "https://example.com",
    isSubmitStep: true,
  },
  {
    step: 7,
    heading: "Choose hero style",
    subheading: "How should your hero section look?",
    options: [
      { label: "Image", value: "image" },
      { label: "Video", value: "video" },
      { label: "Gradient", value: "gradient" },
    ],
    field: "hero_style" as const,
  },
  {
    step: 8,
    heading: "CTA placement",
    subheading: "Where should the call-to-action appear?",
    options: [
      { label: "Ask me anything", value: "floating" },
      { label: "Book now", value: "inline" },
      { label: "Get access", value: "sidebar" },
    ],
    field: "cta_placement" as const,
  },
  {
    step: 9,
    heading: "Ready to preview?",
    subheading: "Or make some adjustments first",
    options: [
      { label: "Preview now", value: "preview" },
      { label: "Tighten headline", value: "edit_headline" },
      { label: "Change colors", value: "edit_colors" },
    ],
    field: "preview_choice" as const,
  },
  {
    step: 10,
    heading: "What's next?",
    subheading: "Choose how to proceed",
    options: [
      { label: "Get private link", value: "private" },
      { label: "Publish public", value: "public" },
      { label: "Finish later", value: "later" },
    ],
    field: "publish_decision" as const,
  },
];

export function GistCreationWidget({
  isExpanded,
  onExpandChange,
  onComplete,
  onStepChange,
}: GistCreationWidgetProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { state, dispatch, canSubmit, errors, toGistCreationData } =
    useGistForm();

  const currentPhase = PHASES[currentStep - 1];

  const handleOptionClick = async (value: string) => {
    setError(null);

    // Dispatch the appropriate action
    switch (currentPhase.field) {
      case "type":
        dispatch({
          type: "SET_TYPE",
          payload: value as "person" | "product" | "place",
        });
        break;
      case "goal":
        dispatch({
          type: "SET_GOAL",
          payload: value as "book" | "buy" | "waitlist",
        });
        break;
      case "audience":
        dispatch({
          type: "SET_AUDIENCE",
          payload: value as "prospects" | "fans" | "investors",
        });
        break;
      case "vibe":
        dispatch({
          type: "SET_VIBE",
          payload: value as "friendly" | "professional" | "bold",
        });
        break;
      case "hero_style":
        dispatch({
          type: "SET_HERO_STYLE",
          payload: value as "image" | "video" | "gradient",
        });
        break;
      case "cta_placement":
        dispatch({ type: "SET_CTA_PLACEMENT", payload: value });
        break;
      case "preview_choice":
        dispatch({ type: "SET_PREVIEW_CHOICE", payload: value });
        if (value === "preview") {
          // Navigate to preview
          onComplete?.({
            success: true,
            previewUrl: `/preview/${state.slug}`,
            slug: state.slug,
          });
        }
        break;
      case "publish_decision":
        dispatch({ type: "SET_PUBLISH_DECISION", payload: value });
        if (value === "private" && state.slug) {
          // Copy link and show success
          navigator.clipboard.writeText(
            `${window.location.origin}/preview/${state.slug}`
          );
          setShowSuccess(true);
        }
        break;
    }

    // Move to next step
    if (currentStep < PHASES.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    }
  };

  const handleInputSubmit = async (value: string) => {
    setError(null);

    // Dispatch the appropriate action
    if (currentPhase.field === "title") {
      dispatch({ type: "SET_TITLE", payload: value });
      // Move to next step
      if (currentStep < PHASES.length) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        onStepChange?.(nextStep);
      }
    } else if (currentPhase.field === "source_url") {
      dispatch({ type: "SET_SOURCE_URL", payload: value });

      // Step 6 submission - call API
      if (currentPhase.isSubmitStep && canSubmit) {
        await handleApiSubmit();
        return; // API submit will handle navigation
      } else {
        // Move to next step if not submitting
        if (currentStep < PHASES.length) {
          const nextStep = currentStep + 1;
          setCurrentStep(nextStep);
          onStepChange?.(nextStep);
        }
      }
    }
  };

  const handleApiSubmit = async () => {
    const data = toGistCreationData();
    if (!data) {
      setError("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      log.api("Submitting gist creation data");

      const response = await fetch("/api/create-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId: "temp-anonymous-user",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create preview");
      }

      const result: CreatePreviewResponse = await response.json();
      log.api(`Preview created: ${result.previewUrl}`);

      // Show success animation
      setShowSuccess(true);

      // Wait a moment then proceed to next step
      setTimeout(() => {
        setShowSuccess(false);
        if (currentStep < PHASES.length) {
          const nextStep = currentStep + 1;
          setCurrentStep(nextStep);
          onStepChange?.(nextStep);
        }
      }, 2000);

      // Notify parent
      onComplete?.(result);
    } catch (err) {
      log.error("Failed to create preview", err as Error);
      setError(
        err instanceof Error ? err.message : "Failed to create preview"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
      setError(null);
    }
  };

  const handleClose = () => {
    onExpandChange(false);
  };

  const handleMoreClick = () => {
    // Handle more button click
  };

  return (
    <GlassWidgetContainer
      className="w-full max-w-2xl mx-auto"
      isExpanded={isExpanded}
      onExpandChange={onExpandChange}
      positioning="relative"
    >
      <GlassWidgetHeader>
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
            className="text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex-1 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Create Your Gist
            </h2>
            <p className="text-sm text-gray-600">
              Step {currentStep} of {PHASES.length}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-gray-700 hover:text-gray-900"
          >
            ✕
          </Button>
        </div>

        <SimpleProgressBar currentPhase={currentStep - 1} totalPhases={PHASES.length} />
      </GlassWidgetHeader>

      <GlassWidgetContent>
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full space-y-4"
            >
              <SearchingAnimation />
              <p className="text-gray-700">Creating your gist...</p>
            </motion.div>
          ) : showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-xl font-semibold text-gray-900">Success!</p>
              <p className="text-gray-600">Your gist is ready</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentPhase.heading}
                </h3>
                <p className="text-gray-600">{currentPhase.subheading}</p>
              </div>

              {currentPhase.inputType ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const value =
                      currentPhase.field === "title"
                        ? state.title
                        : state.source_url;
                    handleInputSubmit(value);
                  }}
                  className="space-y-4"
                >
                  <GradientBorderContainer maxWidth={600}>
                    <div className="flex items-center gap-2 h-14">
                      <GradientPlaceholderInput
                        name={currentPhase.field}
                        value={
                          currentPhase.field === "title"
                            ? state.title
                            : state.source_url
                        }
                        onChange={(value) => {
                          if (currentPhase.field === "title") {
                            dispatch({ type: "SET_TITLE", payload: value });
                          } else if (currentPhase.field === "source_url") {
                            dispatch({ type: "SET_SOURCE_URL", payload: value });
                          }
                        }}
                        placeholder={currentPhase.placeholder}
                        aria-label={currentPhase.field}
                      />
                      <GradientSubmitButton
                        disabled={
                          isSubmitting ||
                          !(currentPhase.field === "title"
                            ? state.title.trim()
                            : state.source_url.trim())
                        }
                        aria-label="Continue"
                      />
                    </div>
                  </GradientBorderContainer>

                  <AnimatePresence initial={false}>
                    {currentPhase.field === "title" && state.slug && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Your gist URL:</p>
                          <p className="text-sm text-gray-700 font-mono">
                            gist.link/{state.slug}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              ) : (
                <div className="flex flex-col">
                  {currentPhase.options?.map((option, index) => (
                    <Fragment key={option.value}>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => handleOptionClick(option.value)}
                        disabled={isSubmitting}
                        className={cn(
                          "justify-start text-left h-[30px] px-0 leading-[140%] hover:bg-transparent",
                          isSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                        style={{
                          color: 'var(--content-default, #151022)',
                          fontFamily: 'var(--font-family-accent, "Work Sans")'
                        }}
                      >
                        <BlueStar className="w-5 h-5 mr-3" />
                        {option.label}
                      </Button>
                      {index < (currentPhase.options?.length ?? 0) - 1 && (
                        <Separator className="border-t border-dashed border-gray-300 bg-transparent my-1" />
                      )}
                    </Fragment>
                  ))}

                  {/* More Button */}
                  <div className="flex justify-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMoreClick}
                      disabled={isSubmitting}
                      className={cn(
                        "rounded-[20px] px-2.5 py-1 gap-1 border border-black hover:bg-transparent",
                        isSubmitting && "opacity-50 cursor-not-allowed"
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
              )}

              <AnimatePresence initial={false}>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {errors.length > 0 && currentPhase.isSubmitStep && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-700">
                        {errors.join(", ")}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassWidgetContent>

      <GlassWidgetFooter>
        <Separator className="mb-4 bg-gray-200" />
        <PoweredByButton />
      </GlassWidgetFooter>
    </GlassWidgetContainer>
  );
}
