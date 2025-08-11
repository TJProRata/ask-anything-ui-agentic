# PROJECT-REVIEW.md

## Executive Summary

Ask Anything UI has a strong modern foundation (Next.js 15, React 19, Tailwind v4, Bun) and a documented roadmap. The floating widget architecture is in place with Shadow DOM isolation scaffolding and a custom IIFE build pipeline. To reach a working, embeddable MVP, we should prioritize: (1) widget prop simplification, (2) correct IIFE entrypoint, (3) Shadow DOM styles injection, (4) complete panel UI, and (5) a reliable dev API route. The new `docs/FIGMA-INTEGRATION.md` provides a minimal, dependency‑light plan to align tokens and components with Figma.

## Strengths

- Modern stack configured and working:
  - Next.js App Router, React 19, Tailwind v4, Bun.
  - shadcn/ui primitives installed and used.
- Clear documentation of goals and gaps (`docs/PROJECT-OVERVIEW.md`, `docs/PLAN.md`).
- Widget runtime architecture scaffolded:
  - `WidgetManager` sets up Shadow DOM and mounts React root.
  - IIFE bundling in Bun script is in place.
- Early component composition shown (`AskButton`, `FloatingWidget`).

## Gaps and Issues (Prioritized)

### High Priority (blocking)

- FloatingWidget prop duplication (confusing precedence, risk of misuse)
- Build entrypoint targets React component instead of initializer (IIFE unusable standalone)
- Shadow DOM styles placeholder (no isolation styles actually injected)
- Panel UI incomplete (no chat interface; only stub)
- Dev API route missing (external default hard-coded)

### Medium Priority (development friction)

- Component organization clarity between `components` and `widgets`
- Type hygiene and error typing in API hook
- Testing harness not configured (per project testing rules)

### Low Priority (polish)

- Design tokens: manual → scripted pipeline
- Bundle size monitoring and styles scoping refinements
- CI hooks and analytics (later phases)

## Detailed Findings with Code References

- FloatingWidget props duplication

```9:31:components/widgets/floating-widget/floating-widget.tsx
interface FloatingWidgetProps extends WidgetConfig {
  config: WidgetConfig;
}
...
export function FloatingWidget({
  // containerId,
  config,
  apiKey,
  apiEndpoint,
  theme = "dark",
  buttonText = "Ask",
  headerTitle = "Ask New York Times Anything!",
  placeholder = "Ask Anything",
  position = "bottom-right",
  customStyles,
  initialExpanded = false,
  onReady,
  onMessage,
  onExpand,
  onCollapse,
}: FloatingWidgetProps) {
```

- Panel UI is stubbed

```165:170:components/widgets/floating-widget/floating-widget.tsx
return (
  <div className="floating-widget-panel rounded-3xl border p-4">
    <span>FloatingWidgetPanel</span>
    {/* TODO: Implement actual FloatingWidgetPanel */}
  </div>
);
```

- Shadow DOM styles not injected (placeholder)

```5:12:widgets/widget-manager.tsx
// import widgetStyles from './widget.tailwind.css?inline';

// PLACEHOLDER
const widgetStyles = ``;
```

- Build script entrypoint mismatch (should be initializer)

```4:6:scripts/build.widget.ts
// TODO: Modify ENTRY_POINT as needed
const ENTRY_POINT = "components/widgets/floating-widget/floating-widget.tsx";
```

- Initializer exists and provides global + auto‑init (should be entrypoint)

```13:22:scripts/initialize.widget.ts
// Initialize widget manager
const widgetManager = new WidgetManager();

// Export to global scope
if (typeof window !== 'undefined') {
  window.FloatingWidget = {
    init: (config: WidgetConfig) => widgetManager.init(config),
    instances: widgetManager.instances
  };
}
```

- API hook defaults to external endpoint (dev flow would benefit from local route)

```8:14:hooks/use-widget-api.ts
const defaultEndpoint = endpoint || "https://api.ask-anything.com/v1";
```

## Action Plan (Next Steps)

### Phase 1 — Foundation (today–2 days)

- Prop simplification
  - Remove `extends WidgetConfig` and accept a single `config: WidgetConfig` prop. Destructure from `config` inside the component.
  - Update usages (e.g., `app/widgets/page.tsx`).
- Build entrypoint
  - Change `ENTRY_POINT` in `scripts/build.widget.ts` to `scripts/initialize.widget.ts`.
  - Verify IIFE bundle exposes `window.FloatingWidget` and supports `data-widget-config` auto‑init.
- Shadow DOM styles
  - Create `styles/widget.css` with minimal reset + `--widget-*` CSS custom properties.
  - Import CSS as string (or embed at build) and replace `widgetStyles` placeholder in `widgets/widget-manager.tsx`.
- Panel UI
  - Implement `FloatingWidgetPanel`: message list with auto‑scroll, input with submit, loading state and error display.
  - Keep footprint small; use existing shadcn/ui primitives.
- Dev API route
  - Add `app/api/widget/route.ts` with a mock POST handler returning a canned response.
  - Default `useWidgetAPI` to `/api/widget` in dev unless overridden by `endpoint`.

### Phase 2 — Integration and Types (week 1)

- Component structure
  - Clarify boundaries: keep reusable primitives in `components/ui`, widget-specific UI under `widgets/components/` (or keep current until after MVP, then reorganize with a targeted PR).
- Error typing
  - Introduce `WidgetError` union in `widgets/types.ts`; surface typed errors from `useWidgetAPI`.
- Figma tokens and Code Connect (per `docs/FIGMA-INTEGRATION.md`)
  - Add `widgets/design-tokens.ts` (starter mapping) and wire to CSS variables.
  - Add `styles/widget.css` generator later via Bun script.

### Phase 3 — Testing & Build Quality (week 2+)

- Testing harness
  - Per project rules, use Bun + Vitest + Testing Library. Defer installs until approved.
  - Test priorities: `useWidgetAPI` (unit), `FloatingWidget` (component), initializer auto‑init (integration in jsdom/happy-dom).
- Build checks
  - Validate IIFE bundle loads on a plain HTML page, mounts Shadow DOM, handles multiple `init` calls safely.

## File‑Level Tasks Checklist

- [ ] `components/widgets/floating-widget/floating-widget.tsx`: simplify props; complete `FloatingWidgetPanel` UI.
- [ ] `scripts/build.widget.ts`: set entrypoint to `scripts/initialize.widget.ts`.
- [ ] `widgets/widget-manager.tsx`: inject generated CSS from `styles/widget.css` (replace `widgetStyles`).
- [ ] `styles/widget.css`: add minimal reset + `--widget-*` variables consumed by panel/button.
- [ ] `widgets/design-tokens.ts`: add starter token map (colors, radii, spacing, typography meta).
- [ ] `app/api/widget/route.ts`: mock POST handler.
- [ ] `hooks/use-widget-api.ts`: default dev endpoint to `/api/widget` (override via prop).
- [ ] `app/widgets/page.tsx`: update to the simplified `FloatingWidget` props.

## Figma Alignment (see `docs/FIGMA-INTEGRATION.md`)

- Minimal token sync without new packages
  - Designers maintain variables; developer mirrors into `styles/widget.css` and `widgets/design-tokens.ts` initially.
- Code Connect and Dev Resources
  - Attach Dev Resources on Figma nodes to repo file paths for `AskButton`, `FloatingWidgetButton`, `FloatingWidgetPanel`.
  - Optionally add small scripts later to enumerate component sets and generate `docs/components/*.md` stubs.

## Testing Strategy (proposed; pending package approval)

- Unit
  - `use-widget-api.ts`: success/error paths, headers, payload shape.
- Component
  - `FloatingWidget`: toggling expand/collapse, ESC key close, onMessage callbacks.
  - `FloatingWidgetPanel`: input handling, loading/error rendering, auto‑scroll.
- Integration
  - Initializer autoload: `window.FloatingWidget.init(...)`, `data-widget-config` boot, Shadow DOM style presence.

Commands (once configured):

- Bun tests: `bun test`
- Vitest: add `"test": "vitest"` then `bun run test run` (per rules) — requires approval to add dev deps.

## Risk & Mitigation

- Shadow DOM style leaks or missing resets
  - Start with a small, strict reset in `styles/widget.css`; expand only as needed.
- Token naming drift
  - Adopt naming conventions and review changes touching `styles/widget.css`/`widgets/design-tokens.ts`.
- IIFE drift vs. Next.js app
  - Keep initializer decoupled from app code; validate on a plain HTML host during CI.

## References

- Internal
  - `docs/FIGMA-INTEGRATION.md` — current Figma plan and workflow
  - `docs/PROJECT-OVERVIEW.md`, `docs/PLAN.md` — broader roadmap and current state
- External
  - Figma Code Connect: `https://github.com/figma/code-connect`
  - Figma REST API (OpenAPI): `https://github.com/figma/rest-api-spec`
  - Figma Plugin/Dev Mode: `https://www.figma.com/plugin-docs/`

---

This document reflects the most up‑to‑date, actionable next steps. It complements `docs/FIGMA-INTEGRATION.md` and focuses on unblocking the embeddable widget MVP with clear, minimal changes.
