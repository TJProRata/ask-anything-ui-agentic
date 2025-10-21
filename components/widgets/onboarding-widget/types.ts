/**
 * OnboardingWidget TypeScript Type Definitions
 */

export interface OnboardingWidgetProps {
  /** Controls whether the widget is expanded or collapsed */
  isExpanded: boolean;
  /** Callback when expand state changes */
  onExpandChange: (expanded: boolean) => void;
}

export interface PhaseState {
  /** Current phase number (1-15) */
  currentPhase: number;
  /** Whether user can proceed to next phase */
  canProceed: boolean;
  /** User responses and selections */
  responses: Record<string, unknown>;
}

export type Phase = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export interface PhaseConfig {
  /** Phase number */
  phase: Phase;
  /** Phase title */
  title: string;
  /** Phase description */
  description?: string;
  /** Whether this phase requires user input */
  requiresInput: boolean;
}
