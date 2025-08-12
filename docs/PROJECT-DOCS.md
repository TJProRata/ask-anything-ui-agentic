## Project Documentation Update Plan

Goal: Make `docs/` accurate, consistent with the codebase, and optimized for retrieval by LLMs and coding agents.

### Principles
- Single source of truth per topic with canonical file paths.
- Stable headings and anchors for chunkable retrieval.
- Code‑linked examples that compile or reflect current code.
- Clear “Current vs Planned” labeling to prevent ambiguity.

### Quick Wins (Do Now)
1. Update global API naming in docs
   - Replace `window.MyWidget` with `window.FloatingWidget` everywhere.
   - Files: `docs/react-widget-architecture-docs.md`, `docs/PROJECT-OVERVIEW.md`.

2. Correct build entrypoint references
   - Replace mentions of `src/widget/index.tsx` with `scripts/initialize.widget.ts`.
   - Files: `docs/react-widget-architecture-docs.md`, `docs/PROJECT-OVERVIEW.md`, `docs/PLAN.md`.

3. Shadow DOM styles source
   - Standardize on `styles/widget.css` as the widget style SoT; mention inline fallback in `widgets/widget-manager.tsx` for dev.
   - Files: `docs/react-widget-architecture-docs.md`, `docs/FIGMA-INTEGRATION.md`.

4. Clarify current vs future stack
   - Move Convex and Clerk to a “Future integrations” subsection in `docs/ui-ux-platform-concepts.md` and `docs/PROJECT-OVERVIEW.md`.
   - Mark Zustand as deferred in `docs/ui-ux-platform-concepts.md`.

5. Embed guide
   - Add a dedicated “Embedding the Widget” section with copy‑paste examples for script‑tag auto‑init and programmatic init.
   - File: new `docs/INTEGRATION.md` (or fold into `PROJECT-OVERVIEW.md` until added).

### Medium Changes (Next PR)
6. API section alignment
   - Ensure message payload shape in examples matches `hooks/use-widget-api.ts` (role/content mapping, headers).
   - Files: `docs/react-widget-architecture-docs.md`, `docs/PROJECT-OVERVIEW.md`.

7. Token and style SoT
   - Document `--widget-*` CSS variables and their mapping to app tokens.
   - Provide a small table mapping app `app/globals.css` tokens → widget `styles/widget.css` tokens.
   - Files: `docs/FIGMA-INTEGRATION.md` (add “Manual Token Sync Reference”), new `docs/TOKENS.md`.

8. Testing strategy alignment
   - Reflect project rules: Bun + Vitest + Testing Library; add commands section.
   - Defer package list until approved; include placeholders.
   - Files: `docs/PLAN.md`, `docs/PROJECT-OVERVIEW.md`.

9. Security guidance
   - Add embedding CSP guidance (hash/nonce patterns), clarify Shadow DOM style injection and risks.
   - Files: `docs/react-widget-architecture-docs.md` (Security & Performance), `docs/INTEGRATION.md`.

### Structure Improvements (After Medium Changes)
10. Introduce canonical doc index
   - Add `docs/INDEX.md` that lists each document, its purpose, and the code SoT paths per topic.
   - Include stable anchors for agent retrieval.

11. Component and API references
   - Add `docs/WIDGET-API.md`: mirrors `widgets/types.ts#WidgetConfig`, global API (`window.FloatingWidget` methods), and `useWidgetAPI` behavior.
   - Add `docs/COMPONENTS.md`: short entries for `FloatingWidget`, `FloatingWidgetPanel`, `FloatingWidgetButton` with props and code links.

12. Diagrams refresh
   - Update mermaid diagrams to match current entrypoint and naming; include links to files in captions.

### Proposed Edits (granular)
- `docs/react-widget-architecture-docs.md`
  - Rename `window.MyWidget` → `window.FloatingWidget` in code blocks and prose.
  - Replace `src/widget/index.tsx` → `scripts/initialize.widget.ts`.
  - Replace `widget.tailwind.css` → `styles/widget.css`.
  - Update API example payload to reflect role/content mapping.

- `docs/ui-ux-platform-concepts.md`
  - Tag Convex/Clerk as Future integrations; keep current stack minimal.
  - Move Zustand to “Deferred options”.

- `docs/FIGMA-INTEGRATION.md`
  - Call out manual SoT: `styles/widget.css`, `widgets/design-tokens.ts`.
  - Add a “Manual Token Sync Reference” section with a table of CSS variables.

- `docs/PLAN.md` and `docs/PROJECT-OVERVIEW.md`
  - Ensure entrypoint and API route references match current files.
  - Add “Embedding the Widget” quick section referencing `INTEGRATION.md`.

### LLM/Agent Optimization
- Use consistent file path prefixes in code fences and cite exact line ranges when possible.
- Keep headings short, unique, and stable; avoid synonyms for core entities (`WidgetManager`, `FloatingWidget`).
- Add “Source of Truth” callouts at the top of each doc with canonical code links.
- Prefer small, self‑contained examples that reflect current code.

### Acceptance Criteria
- No references to `window.MyWidget` remain; all use `window.FloatingWidget`.
- Build entrypoint references and integration examples point to `scripts/initialize.widget.ts` and the IIFE bundle.
- A single doc clearly lists `WidgetConfig` and global API methods with file links.
- Token and style SoT documented; CSS variable table exists.
- Security section includes CSP guidance for embedding.

### Out of Scope (for now)
- Adding new packages for docs generation.
- Automated token extraction (kept as future phase with flags per `FIGMA-INTEGRATION.md`).


