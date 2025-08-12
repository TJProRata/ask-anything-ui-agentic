import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ButtonIconVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary";

export type ButtonIconSize = "sm" | "lg";

export interface ButtonIconProps
  extends Omit<React.ComponentProps<typeof Button>, "size" | "variant"> {
  /** Visual style variant mapped from Figma: Primary, Secondary, Tertiary, Quaternary */
  variant?: ButtonIconVariant;
  /** Icon button size mapped from Figma: Small | Large */
  size?: ButtonIconSize;
  /** Optional custom icon. Defaults to a Plus icon. */
  icon?: React.ReactNode;
  /** Accessible label for the icon-only button. */
  "aria-label"?: string;
}

/**
 * Button/Icon — icon-only button composed from the base `Button` primitive.
 * Implements Figma variants (Primary | Secondary | Tertiary | Quaternary)
 * and sizes (Small | Large) using Tailwind utilities and project tokens.
 */
export function ButtonIcon({
  className,
  variant = "primary",
  size = "sm",
  icon,
  "aria-label": ariaLabel = "Action",
  ...props
}: ButtonIconProps) {
  // Size mapping (Figma: Small → 24px, Large → 40px; icon 16px/20px)
  const sizeClasses = size === "lg" ? "w-10 h-10" : "w-6 h-6";
  // Icon size is handled via Tailwind size classes below

  // Shape mapping (rounded-full vs rounded-lg for Tertiary)
  const shapeClasses =
    variant === "tertiary"
      ? size === "lg"
        ? "rounded-[12.3px]"
        : "rounded-[8px]"
      : "rounded-full";

  // Background/border mapping derived from Figma design tokens for light/dark
  // Primary (light): rgba(21,16,34,0.05) → hover: ~0.08
  // Primary (dark):  rgba(255,255,255,0.10) → hover: 0.15
  // Secondary (light): rgba(21,16,34,0.10) → hover: 0.15, border ink/0.09
  // Secondary (dark):  rgba(255,255,255,0.10) → hover: 0.15, border white/30
  // Tertiary (light): rgba(21,16,34,0.05) → hover: 0.08, no border
  // Tertiary (dark):  rgba(255,255,255,0.10) → hover: 0.15, no border
  // Quaternary: gradient purple→green with 40% base → 50% on hover
  const backgroundClasses =
    variant === "primary"
      ? "bg-[var(--action-primary-bg)] hover:bg-[var(--action-primary-bg-hover)]"
      : variant === "secondary"
        ? "bg-[var(--action-secondary-bg)] hover:bg-[var(--action-secondary-bg-hover)]"
        : variant === "tertiary"
          ? "bg-[var(--action-tertiary-bg)] hover:bg-[var(--action-tertiary-bg-hover)]"
          : "bg-[linear-gradient(90deg,var(--action-gradient-start),var(--action-gradient-stop))] hover:bg-[linear-gradient(90deg,var(--action-gradient-start-hover),var(--action-gradient-stop-hover))]"; // Quaternary

  const borderClasses =
    variant === "secondary"
      ? "border border-[var(--action-secondary-border)]"
      : "border border-transparent";

  // Icon color mapping — use foreground so light=ink, dark=white
  const textColorClasses = "text-foreground";

  return (
    <Button
      type="button"
      aria-label={ariaLabel}
      // Use base icon size then override dimensions for precise control
      className={cn(
        "inline-flex items-center justify-center px-0 py-0 transition-colors",
        sizeClasses,
        shapeClasses,
        backgroundClasses,
        borderClasses,
        textColorClasses,
        className
      )}
      variant="icon"
      size={size === "lg" ? "iconLg" : "iconSm"}
      // Keep semantics of an icon button while using our base primitive
      {...props}
    >
      {icon ?? (
        <Plus className={cn(size === "lg" ? "size-5" : "size-4")} strokeWidth={2} />
      )}
    </Button>
  );
}

export default ButtonIcon;
