## React Widget Pipeline Prototype — Implementation Plan

### Goal

Deliver a working, embeddable MVP of the `FloatingWidget` as a third-party widget with Shadow DOM isolation, IIFE bundle, basic chat UI, and a local mock API for development. This plan converts the guidance in `docs/react-widget-pipeline-prototype.md` and linked docs into concrete, low-risk steps aligned with project rules (Bun, Next.js 15 App Router, React 19, Tailwind v4, no new packages without approval).

### Sources of truth (code)

- `components/widgets/floating-widget/floating-widget.tsx`
- `components/widgets/floating-widget/floating-widget-button.tsx`
- `components/widgets/floating-widget/floating-widget-card.tsx`
- `hooks/use-widget-api.ts`
- `widgets/widget-manager.tsx`
- `widgets/types.ts`
- `scripts/initialize.widget.ts`
- `scripts/build.widget.ts`
- `app/api/widget/route.ts`
- `app/widgets/page.tsx`

### References (docs)

- Prototype: `docs/react-widget-pipeline-prototype.md`
- Architecture: `docs/react-widget-architecture-docs.md`
- Overview/Review/Concepts: `docs/PROJECT-OVERVIEW.md`, `docs/PROJECT-REVIEW.md`, `docs/PROJECT-CONCEPTS.md`
- Figma plan: `docs/FIGMA-INTEGRATION.md`

### External references (version-appropriate)

- Next.js 15 App Router (Route Handlers, next/script, font, etc.): `https://github.com/vercel/next.js` (App Router docs; see examples for `route.ts`, `next/script`)
- React 19 (createRoot, StrictMode, portals, RSC directives): `https://react.dev` (see createRoot, StrictMode, createPortal)

### Guardrails and constraints

- Use Bun (latest) for builds/scripts; no new packages without approval.
- TypeScript with semicolons and double quotes.
- React 19, Next.js 15 App Router, Tailwind CSS v4.
- Keep changes incremental and reversible; prefer narrow edits.

---

## Phase 0 — Baseline validation (no-op)

- Build entrypoint: Verified `scripts/build.widget.ts` uses `scripts/initialize.widget.ts` and IIFE output.
- API hook default: `hooks/use-widget-api.ts` defaults to `/api/widget` (good for dev).
- API route: `app/api/widget/route.ts` exists and echoes a minimal response.
- Widget props: `FloatingWidget` already accepts a single `config: WidgetConfig` prop.
- Demo page: `/app/widgets/page.tsx` renders `FloatingWidget` directly (component mode).

Outcome: We can proceed to isolation styles, embed flow, and polish.

---

## Phase 1 — MVP embedding and isolation

### 1. Shadow DOM style isolation

- Add `styles/widget.css` (new):
  - Minimal reset for Shadow DOM.
  - Theme variables `--widget-*` (bg, text, border, primary) and mapping comments to app tokens.
  - Small utility set used by the panel/button (keep tight to avoid bloat).
- Inject styles in `widgets/widget-manager.tsx`:
  - Replace placeholder `widgetStyles` with imported CSS as string (supported by current Bun CSS loader) or embed minimal CSS literal while we iterate.
  - Keep `:host` position rules and `getPositionStyles(position)` logic.
- Ensure the Shadow Root `<style>` precedes mount to avoid FOUC.

Acceptance:
- Widget renders with consistent styling when mounted via Shadow DOM.
- No leakage of host page styles; no leakage from widget outward.

### 2. IIFE embedding path (no framework host)

- Keep `scripts/initialize.widget.ts` as entry; ensure:
  - `window.FloatingWidget.init(config)` works after script load.
  - Auto-init via `data-widget-config` on the script tag parses and mounts successfully.
  - Instances tracked in `WidgetManager.instances` map.
- Add a simple static HTML example (for manual verification only, not committed to app):
  - Script tag embed with `data-widget-config` and a `div#containerId`.
  - Validate mount, expand/collapse, message send roundtrip to local API.

Acceptance:
- Loading built `dist/widget.*.js` in a blank HTML page initializes and mounts the widget, with open/close and message roundtrip working.

### 3. Demo embed inside Next.js app

- On `/app/widgets/page.tsx`, add a second demo section that uses Next.js `<Script>` to embed the built IIFE (local file during dev), using `data-widget-config` to mount into a container within the page.
- Keep the existing direct React component render as a control.

Acceptance:
- Both component mode and IIFE embed render and function on the Widgets page.

### 4. Basic chat UI completeness and a11y

- `FloatingWidgetCard` already has input focus, auto-scroll, loading and error messages.
- Add light polish only (no new deps):
  - ARIA labels for close/send.
  - Keyboard: ensure ESC closes (already supported at root).
  - Bubbles (minimal class tweaks using Shadow DOM vars).

Acceptance:
- Usable, accessible chat panel with clear affordances and keyboard support.

---

## Phase 2 — Theming, tokens, and configuration

### 5. Token bridge and theming

- Add `widgets/design-tokens.ts` (new): starter map mirroring the subset of `app/globals.css` used by the widget.
- Document mapping in comments and in `FIGMA-INTEGRATION.md` (manual phase):
  - App tokens → Widget tokens (`--ask-anything-*` → `--widget-*`).
- Ensure `WidgetManager.generateThemeStyles` merges `customStyles` onto base theme vars.

Acceptance:
- Theme can be switched via `theme` and overridden via `customStyles`.

### 6. Type hygiene and JSDoc

- Add concise JSDoc to public-facing types and components:
  - `widgets/types.ts` interfaces (`WidgetConfig`, `WidgetMessage`, `WidgetInstance`).
  - `WidgetManager` public methods.
  - `FloatingWidget` props.
- Standardize `WidgetMessage` usage end-to-end (already followed in `use-widget-api.ts`).

Acceptance:
- Public APIs are documented; types consistent across components and hook.

---

## Phase 3 — Build quality and measurements

### 7. Bundle validation

- Use current Bun build to produce IIFE assets.
- Inspect output size and console log from `scripts/build.widget.ts`.
- If needed, prune unused CSS from `styles/widget.css` (keep minimal surface).

Acceptance:
- IIFE bundle builds deterministically; acceptable size for MVP.

### 8. CSP and host guidance

- Document in integration guide:
  - Script tag loading and `data-widget-config`.
  - CSP examples (hash/nonce) and note about Shadow DOM `<style>` injection being subject to CSP.
  - How to host the bundle on a CDN with long cache headers.

Acceptance:
- Clear instructions exist for partners to embed safely under CSP.

---

## Phase 4 — Testing and QA (pending approval for dev deps)

Per project rules, prefer Bun, Vitest, and Testing Library. Do not add packages until approved.

- Unit: `use-widget-api.ts` (success path, error path, headers/payload).
- Component: `FloatingWidget` (toggle, ESC, callbacks), `FloatingWidgetCard` (input submit, loading indicator, error render, auto-scroll).
- Integration (jsdom/happy-dom): `initialize.widget.ts` auto-init mounts, `window.FloatingWidget.init`, instance map behavior.
- Command targets after approval:
  - Add `"test": "vitest"` script and run tests with `bun run test run`.

Acceptance:
- Smoke tests for core flows; green locally. Package additions gated by approval.

---

## Phase 5 — Documentation alignment

### 9. New/updated docs

- Add `docs/INTEGRATION.md` (embedding guide):
  - Script tag auto-init example.
  - Programmatic `window.FloatingWidget.init` example.
  - Config reference from `widgets/types.ts` and theming overrides.
  - CSP notes and CDN guidance.
- Normalize global API naming:
  - Replace any `window.MyWidget` remnants with `window.FloatingWidget` in docs.
- Optional follow-ups:
  - `docs/WIDGET-API.md` (public API + types),
  - `docs/TOKENS.md` (widget CSS vars and mapping to app tokens).

Acceptance:
- One canonical embedding doc; all examples use `window.FloatingWidget`.

---

## File-level task checklist

- New: `styles/widget.css` (Shadow DOM reset + `--widget-*` vars).
- New: `widgets/design-tokens.ts` (starter map; no runtime deps).
- Edit: `widgets/widget-manager.tsx` (inject real CSS; keep position/theming helpers).
- Edit: `components/widgets/floating-widget/*` (a11y polish; optional bubble styles using CSS vars).
- No-op verify: `scripts/initialize.widget.ts`, `scripts/build.widget.ts`, `hooks/use-widget-api.ts`, `app/api/widget/route.ts`.
- Docs: Add `docs/INTEGRATION.md`; small cleanups in existing docs to align naming.

---

## Risks and mitigations

- Style leakage or missing resets: start with tight CSS; iterate only as needed.
- CSP blocks injected `<style>` in Shadow DOM: document CSP allow-list strategies; offer nonce/hash guidance.
- Bundle size creep: keep CSS minimal; avoid new deps; measure regularly.
- Host variability: provide a plain HTML test to validate behavior outside Next.js.

---

## Acceptance criteria (from prototype doc, refined)

- Built IIFE bundle initializes and mounts via script tag with `data-widget-config`.
- Widget renders correctly inside Shadow DOM with isolated styles.
- Chat UI works end-to-end against the local mock route; shows loading/errors.
- `/widgets` page demonstrates both component mode and IIFE embed mode without errors.

---

## Execution notes

- Use Bun for all scripts and builds.
- Avoid adding packages without prior approval (testing stack will be proposed first).
- Keep edits small and well-scoped; prefer JSDoc over inline comments.

---

## Next actions (sequence to start)

1) Add `styles/widget.css` and wire it in `widget-manager.tsx`.
2) Light a11y/UX polish in `FloatingWidgetCard` (labels, small bubbles via CSS vars).
3) Build the IIFE with `bun run build:widget`; verify on blank HTML page.
4) Add embed demo to `/app/widgets/page.tsx` using `<Script>` and `data-widget-config`.
5) Draft `docs/INTEGRATION.md` with copy-paste examples and CSP notes.
6) Propose testing dependencies for approval; then add minimal smoke tests.


