/**
 * Custom hook for managing gist creation form state
 */

import { useReducer, useMemo } from "react";
import {
  GistFormState,
  GistFormAction,
  GistCreationData,
} from "@/components/widgets/onboarding-widget/types";
import { generateSlug } from "@/lib/generator";

/**
 * Initial form state
 */
const initialState: GistFormState = {
  type: null,
  title: "",
  slug: "",
  goal: null,
  audience: null,
  vibe: null,
  source_url: "",
  hero_style: null,
  cta_placement: "",
  preview_choice: "",
  publish_decision: "",
};

/**
 * Form reducer function
 */
function gistFormReducer(
  state: GistFormState,
  action: GistFormAction
): GistFormState {
  switch (action.type) {
    case "SET_TYPE":
      return { ...state, type: action.payload };

    case "SET_TITLE": {
      const title = action.payload;
      const slug = title ? generateSlug(title) : "";
      return { ...state, title, slug };
    }

    case "SET_SLUG":
      return { ...state, slug: action.payload };

    case "SET_GOAL":
      return { ...state, goal: action.payload };

    case "SET_AUDIENCE":
      return { ...state, audience: action.payload };

    case "SET_VIBE":
      return { ...state, vibe: action.payload };

    case "SET_SOURCE_URL":
      return { ...state, source_url: action.payload };

    case "SET_HERO_STYLE":
      return { ...state, hero_style: action.payload };

    case "SET_CTA_PLACEMENT":
      return { ...state, cta_placement: action.payload };

    case "SET_PREVIEW_CHOICE":
      return { ...state, preview_choice: action.payload };

    case "SET_PUBLISH_DECISION":
      return { ...state, publish_decision: action.payload };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

/**
 * Validate form state
 */
function validateForm(state: GistFormState): {
  isValid: boolean;
  errors: string[];
  canSubmit: boolean;
} {
  const errors: string[] = [];

  // Required fields for API submission (after Step 6)
  if (!state.type) errors.push("Type is required");
  if (!state.title.trim()) errors.push("Title is required");
  if (!state.slug.trim()) errors.push("Slug is required");
  if (!state.goal) errors.push("Goal is required");
  if (!state.audience) errors.push("Audience is required");
  if (!state.vibe) errors.push("Vibe is required");
  if (!state.source_url.trim()) errors.push("Source URL is required");

  // Validate URL format
  if (state.source_url.trim()) {
    try {
      new URL(state.source_url);
    } catch {
      errors.push("Invalid URL format");
    }
  }

  // Validate slug format
  if (state.slug && !/^[a-z0-9-]+$/.test(state.slug)) {
    errors.push("Slug must contain only lowercase letters, numbers, and hyphens");
  }

  const isValid = errors.length === 0;
  const canSubmit =
    isValid &&
    state.type !== null &&
    state.goal !== null &&
    state.audience !== null &&
    state.vibe !== null;

  return { isValid, errors, canSubmit };
}

/**
 * Custom hook for gist form management
 * @returns Form state, dispatch function, and validation helpers
 */
export function useGistForm() {
  const [state, dispatch] = useReducer(gistFormReducer, initialState);

  const validation = useMemo(() => validateForm(state), [state]);

  /**
   * Convert form state to GistCreationData for API submission
   */
  const toGistCreationData = (): GistCreationData | null => {
    if (!validation.canSubmit) return null;

    return {
      type: state.type!,
      title: state.title,
      slug: state.slug,
      goal: state.goal!,
      audience: state.audience!,
      vibe: state.vibe!,
      source_url: state.source_url,
      hero_style: state.hero_style || undefined,
      cta_placement: state.cta_placement || undefined,
      preview_choice: state.preview_choice || undefined,
      publish_decision: state.publish_decision || undefined,
    };
  };

  return {
    state,
    dispatch,
    ...validation,
    toGistCreationData,
  };
}
