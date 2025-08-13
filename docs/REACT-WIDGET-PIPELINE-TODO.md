## React Widget Pipeline Prototype — TODO Tracker

This checklist tracks implementation of the prototype plan. Use IDs to reference tasks in commits/PRs (e.g., "T-3"). Paths use repo-relative backticks for agent retrieval.

### Legend

- Status tags: [P1] high priority, [P2] medium, [P3] low; [BLOCKED] requires action.
- Files are shown as backticked paths; acceptance are brief, testable criteria.

### Quick Links

- [Phase 0 — Baseline](#phase-0--baseline)
- [Phase 1 — MVP embedding & isolation](#phase-1--mvp-embedding--isolation)
- [Phase 2 — Theming & types](#phase-2--theming--types)
- [Phase 3 — Build quality & guidance](#phase-3--build-quality--guidance)
- [Phase 4 — Tests (pending approval)](#phase-4--tests-pending-approval)
- [Phase 5 — Docs alignment](#phase-5--docs-alignment)

---

### Phase 0 — Baseline

- [x] T-0.1 [P1] Verify build entry and format
  - Files: `scripts/build.widget.ts`
  - Acceptance: Entry is `scripts/initialize.widget.ts`, format is `iife`, outputs in `dist/`.

- [x] T-0.2 [P1] Verify API development path
  - Files: `hooks/use-widget-api.ts`, `app/api/widget/route.ts`
  - Acceptance: Default endpoint `/api/widget` returns JSON with `message`.

- [x] T-0.3 [P2] Verify component props simplification
  - Files: `components/widgets/floating-widget/floating-widget.tsx`
  - Acceptance: Component accepts a single `config: WidgetConfig` prop.

---

### Phase 1 — MVP embedding & isolation

- [x] T-1.1 [P1] Add Shadow DOM stylesheet
  - Files: `styles/widget.css` (new)
  - Acceptance: Contains minimal reset and `--widget-*` vars (bg, text, border, primary).

- [x] T-1.2 [P1] Inject real CSS into Shadow DOM
  - Files: `widgets/widget-manager.tsx`
  - Acceptance: `widgetStyles` replaced by imported CSS string; `<style>` injected before React mount; no FOUC.

- [x] T-1.3 [P1] Validate isolation in blank HTML host
  - Files: `dist/widget.[hash].js` (artifact)
  - Acceptance: Widget renders correctly on a plain HTML page; host styles don’t affect widget; no leaks out.

- [x] T-1.4 [P1] Global API and auto-init
  - Files: `scripts/initialize.widget.ts`
  - Acceptance: `window.FloatingWidget.init(config)` mounts; script with `data-widget-config` auto-initializes.

- [x] T-1.5 [P2] Next.js embed demo (IIFE)
  - Files: `app/widgets/page.tsx`
  - Acceptance: Page shows both direct component render and IIFE embed via `<Script>` with `data-widget-config`.

- [x] T-1.6 [P2] Accessibility polish
  - Files: `components/widgets/floating-widget/floating-widget-card.tsx`
  - Acceptance: Close/send controls have ARIA labels; ESC closes; loading and errors announced visually.

---

### Phase 2 — Theming & types

- [x] T-2.1 [P2] Token bridge starter
  - Files: `widgets/design-tokens.ts` (new)
  - Acceptance: Exposes a small map aligning app tokens to widget vars; documented mapping.

- [x] T-2.2 [P2] Theme override merge validation
  - Files: `widgets/widget-manager.tsx`
  - Acceptance: `generateThemeStyles` merges `customStyles` onto selected theme; verified visually.

- [x] T-2.3 [P2] JSDoc public APIs
  - Files: `widgets/types.ts`, `widgets/widget-manager.tsx`, `components/widgets/floating-widget/floating-widget.tsx`
  - Acceptance: Concise JSDoc on public interfaces and methods; no inline noise.

---

### Phase 3 — Build quality & guidance

- [x] T-3.1 [P2] Bundle build & size check
  - Files: `scripts/build.widget.ts`, output in `dist/`
  - Acceptance: Successful build; log outputs; size recorded; CSS kept minimal.
  - Result: Build succeeded via `bun run build:widget`. Current artifact sizes (dev machine):
    - `public/dist/widget.h68jas2x.js` ≈ 236 KB (minified)
    - `public/dist/widget.js` ≈ 236 KB (stable copy)
    - Source map ≈ 1.0 MB

- [x] T-3.2 [P2] CSP & CDN guidance
  - Files: `docs/INTEGRATION.md` (new)
  - Acceptance: Contains CSP nonce example for Shadow DOM `<style>`, CDN headers/versioning tips.
  - Result: Added `docs/INTEGRATION.md` with auto-init, programmatic init, config reference, theming, CSP (nonce), and CDN guidance.

---

### Phase 4 — Tests (pending approval)

- [ ] T-4.1 [P1][BLOCKED] Propose test deps (Vitest + Testing Library)
  - Files: `package.json` (proposal only)
  - Acceptance: Approval received to add dev deps and scripts.

- [ ] T-4.2 [P2] Unit tests — hook
  - Files: `hooks/use-widget-api.ts`, `__tests__/`
  - Acceptance: Success/error paths; headers/payload; passes locally.

- [ ] T-4.3 [P2] Component tests — widget & panel
  - Files: `components/widgets/floating-widget/*`, `__tests__/`
  - Acceptance: Toggle expand/collapse; ESC close; input submit; loading/error rendering.

- [ ] T-4.4 [P2] Integration — initializer
  - Files: `scripts/initialize.widget.ts`, `widgets/widget-manager.tsx`, `__tests__/`
  - Acceptance: Auto-init works; `window.FloatingWidget.init` mounts; multiple init calls safe.

---

### Phase 5 — Docs alignment

- [ ] T-5.1 [P2] Embedding guide
  - Files: `docs/INTEGRATION.md` (new)
  - Acceptance: Script-tag auto-init; programmatic init; config reference from `widgets/types.ts`.

- [ ] T-5.2 [P3] Normalize API naming in docs
  - Files: `docs/*`
  - Acceptance: All references use `window.FloatingWidget`; no `window.MyWidget` remains.

- [ ] T-5.3 [P3] Optional references
  - Files: `docs/WIDGET-API.md`, `docs/TOKENS.md` (new)
  - Acceptance: Concise references for public API and widget CSS variables.

---

### Progress snapshot

- Completed: 12 / Open: 9 (per sections above).
- Update this section as tasks complete.


