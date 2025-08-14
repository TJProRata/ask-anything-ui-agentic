# Figma Integration Plan

## Goals

- Align designs and code for Ask Anything UI widgets using Figma Dev Mode, Code Connect, Tokens, and REST API.
- Enable a repeatable Import → Transform → Deploy pipeline with minimal manual steps.
- Keep dependencies minimal; start with scripts and docs-first process, add packages only with approval.

## Scope Overview

- Design tokens: round‑trip sync from Figma to Tailwind v4 custom properties and TS token exports.
- Component mapping: connect Figma component examples to code via Code Connect and Dev Mode resources.
- Asset flow: controlled export of icons/images from Figma when needed.
- Governance: naming, versioning, review gates, and CI hooks (future).

## Integration Tracks

### 1) Tokens Pipeline (Design → Code)

- Author tokens in Figma using a dedicated “Design tokens” page and variables (colors, radii, spacing, typography). Keep names stable.
- Use Tokens Studio (optional) for structured token sets and Git sync. If not using the plugin, export JSON via REST API or Dev Mode and transform locally.
- Transform to code targets:
  - Tailwind v4 CSS custom properties in `app/globals.css` and widget CSS (Shadow DOM): `--ask-anything-*` tokens.
  - TypeScript token exports for runtime usage and API config (e.g., `widgets/design-tokens.ts`).
- Initial implementation without new packages: a Bun script parses token JSON → emits CSS variables and TS maps.

Deliverables:
- `scripts/figma.tokens.ts` (Bun): fetch tokens from Figma (or read a local JSON), output:
  - `styles/widget.css`: minimal reset + variables consumed by `WidgetManager` for Shadow DOM injection.
  - `widgets/design-tokens.ts`: typed token map (colors, radii, spacing, typography meta).

### 2) Component Mapping (Figma Code Connect)

- Use Figma Code Connect to link canonical UI examples in Figma to the corresponding code components.
- Maintain a `code-connect/` folder with small scripts to pull component metadata (names, props, variants) and generate docs/examples that live alongside components.
- Dev Mode: attach Dev Resources on Figma nodes to the repo URLs (per component) to surface code links in Figma.

Deliverables:
- `docs/components/` reference pages that embed links to Figma nodes and code paths.
- Optional small generator (Bun) that writes `.md` stubs for each connected component with props snapshot.

### 3) Assets (Icons/Images)

- Prefer repo‑managed assets. Only export from Figma when they are source‑of‑truth.
- If needed, create a Bun script using Figma REST API images endpoint to export SVG/PNG by node IDs into `public/` with hashing and a manifest.

### 4) Dev Mode MCP Server (Optional, later)

- Add an MCP server for Figma (e.g., “Talk to Figma”/Dev Mode) to allow AI agents to read frames, variables, and component metadata during refactors. Keep it tool‑only (no build dependency).

## Minimal Workflow (No New Packages)

1. Designers maintain tokens and components in Figma with stable names.
2. Developer runs:
   - `bun run scripts/figma.tokens.ts` → updates `styles/widget.css` and `widgets/design-tokens.ts`.
   - (Optional) `bun run scripts/figma.components.ts` → refreshes Code Connect docs stubs.
3. Commit updated files; CI can lint and verify JSON structure.

## File and Naming Conventions

- Tokens
  - Colors: `ask-anything.*` (e.g., `ask-anything.green`, `ask-anything.purple`).
  - Typography: `font.family.sans`, `font.size.base`, `font.weight.semibold`, etc.
  - Spacing: `space.xs|sm|md|lg|xl`.
  - Radii: `radius.sm|md|lg|xl`.
- Map tokens to CSS vars using consistent prefixes:
  - App scope: `--ask-anything-*` in `app/globals.css`.
  - Widget Shadow DOM scope: `--widget-*` in `styles/widget.css`.

## How It Connects To Current Code

- `widgets/widget-manager.tsx`: inject `styles/widget.css` string into Shadow DOM for isolation. Replace placeholder `widgetStyles` with generated CSS.
- `components/widgets/floating-widget/floating-widget.tsx`: consumes tokens via Tailwind classes or runtime CSS vars (from Shadow DOM).
- `hooks/use-widget-api.ts`: unaffected; keep API endpoint configurable via tokens if needed (branding-driven headers, etc.).

## Figma Setup Checklist

- Create “Design tokens” page with frames: Colors, Typography, Spacing, Radius.
- Create “Components” page with canonical variants for `AskButton`, `FloatingWidgetButton`, `FloatingWidgetPanel`.
- Attach Dev Resources on components linking to the repo paths (e.g., `components/ask-anything/ask-button.tsx`).
- If using Code Connect: maintain a small script that enumerates component sets by name and writes metadata.

## Auth and Access

- Use a personal Figma access token locally via env var (never commit): `FIGMA_ACCESS_TOKEN`.
- If automating in CI, store token in CI secrets and scope access to read‑only.

## Scripts To Add (scaffolds, no package installs)

- `scripts/figma.tokens.ts`
  - If `FIGMA_ACCESS_TOKEN` and `FIGMA_FILE_KEY` are present, call Figma REST `/files/{file_id}` and read variables/paints or ingest a pre‑exported JSON.
  - Transform to:
    - `styles/widget.css` (CSS variables + minimal reset for Shadow DOM).
    - `widgets/design-tokens.ts` (typed maps).
- `scripts/figma.components.ts` (optional)
  - Pull component names and IDs by page prefix, emit `docs/components/*.md` with links and code paths.

## Rollout Plan

Phase 1 (Today)
- Add `styles/widget.css` and wire `WidgetManager` to inject it.
- Add `widgets/design-tokens.ts` (handwritten starter) mirroring `app/globals.css` variables.
- Document manual token sync steps here.

Phase 2
- Implement `scripts/figma.tokens.ts` (read local JSON first, then wire REST fetch behind a flag).
- Add Dev Resources to Figma components pointing to repo paths.

Phase 3
- Introduce Code Connect scripts to enumerate component sets and write docs stubs.
- Optionally add MCP server for advanced AI workflows.

## Manual Token Sync (Starter)

Until scripts are approved:

1) Designers update tokens in Figma.
2) Developer mirrors changes into `app/globals.css` and `styles/widget.css` (new) and updates `widgets/design-tokens.ts`.
3) Verify visually in `/app/widgets` and `/app/components` pages.

## Risks & Mitigations

- Token naming drift → enforce naming spec above; review PRs that touch tokens.
- Shadow DOM style gaps → start with a tight CSS reset in `styles/widget.css` and incrementally add utilities.
- Over‑automation → begin manual, add REST/Code Connect only when stable.

## References

- Figma REST API (OpenAPI): `https://github.com/figma/rest-api-spec`
- Figma Code Connect (client scripts): `https://github.com/figma/code-connect`
- Figma Plugin/Dev Mode Guides: `https://www.figma.com/plugin-docs/`
- Tokens Studio docs (optional flow): `https://github.com/tokens-studio/tokens-studio-for-figma-plugin-docs`


