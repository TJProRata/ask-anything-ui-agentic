## Components Reference

This directory documents UI components, their props, variants, and links to Figma nodes. It is intended to help designers and engineers keep Figma and code in sync.

### Structure
- Component pages live directly in this folder (e.g., `ask-button.md`, `button-icon.md`).
- Use `_template.md` when adding a new component doc.
- Link to the source code path and (optionally) the Figma node via Dev Resources.

### Conventions
- Match component names with code and Figma component set names where practical.
- Use the design tokens and Tailwind utilities described in `app/globals.css` and `.cursor/rules/design_system_rules.mdc`.
- Prefer token-backed utilities (e.g., `bg-[var(--action-primary-bg)]`) over raw hex.

### Figma Dev Resources
- In Figma, select the component → Dev Mode → Add Dev Resource → paste the GitHub/Repo path to the component, e.g.:
  - `components/ask-anything/ask-button.tsx`
  - `components/ask-anything/button/button-icon.tsx`
- Optionally include a deep link to a specific line/section.

### Code Connect (optional, later)
- If using Figma Code Connect, keep examples and prop snapshots in sync with these docs.
- See `docs/FIGMA-INTEGRATION.md` for the planned automation scripts.

### Add a new component doc
1. Copy `_template.md` → `<component-name>.md`.
2. Fill in the code path, import example, props, variants, tokens, and Figma link.
3. Keep examples minimal, focused, and token-driven.
