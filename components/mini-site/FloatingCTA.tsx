import { Button } from "@/components/ui/button";

/**
 * FloatingCTA Component
 * Morphing floating action button for gist mini-sites
 *
 * TODO: Implement full CTA with:
 * - Morphing states (collapsed/expanded)
 * - Animation transitions
 * - Goal-based text (book/buy/waitlist)
 */

interface FloatingCTAProps {
  text?: string;
  onClick?: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export default function FloatingCTA({
  text = "Get Started",
  onClick,
  position = "bottom-right",
}: FloatingCTAProps) {
  const positionClasses = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <Button
        onClick={onClick}
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
      >
        {text}
      </Button>
    </div>
  );
}
