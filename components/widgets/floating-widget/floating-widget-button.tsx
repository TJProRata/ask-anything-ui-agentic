import { AskButton } from "@/components/ask-anything/ask-button";

interface FloatingWidgetButtonProps {
  onClick: () => void;
  text: string;
}

export function FloatingWidgetButton({ onClick, text }: FloatingWidgetButtonProps) {
  return (
    <AskButton
      className="floating-widget-button rounded-3xl border px-5 py-2"
      variant="outline"
      aria-label="Open Ask Anything Widget"
      onClick={onClick}
    >
      <span className="text-sm">{text}</span>
    </AskButton>
  );
}