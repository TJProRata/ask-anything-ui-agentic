/**
 * HeroSection Component
 * Top section of gist mini-sites
 *
 * TODO: Implement full hero with:
 * - Dynamic headline and subhead
 * - Background styles (gradient, image, solid)
 * - Media display (image/video)
 * - CTA button
 */

interface HeroSectionProps {
  headline?: string;
  subhead?: string;
  style?: string;
  mediaUrl?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function HeroSection({
  headline = "Hero Section",
  subhead = "",
  style = "gradient",
  mediaUrl,
  ctaText = "Get Started",
  onCtaClick,
}: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">{headline}</h1>
      {subhead && <p className="text-lg mb-6 opacity-90">{subhead}</p>}
      {mediaUrl && (
        <div className="mb-6">
          {/* TODO: Render image or video based on mediaUrl */}
        </div>
      )}
      {ctaText && (
        <button
          onClick={onCtaClick}
          className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
}
