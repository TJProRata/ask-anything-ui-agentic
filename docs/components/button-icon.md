# ButtonIcon

- **Code**: `components/ask-anything/button/button-icon.tsx`
- **Figma**: Dev Resource → “Button/Icon” component (attach in Figma)

## Import
```tsx
import { ButtonIcon } from "@/components/ask-anything/button/button-icon";
```

## Props
- `variant?: "primary" | "secondary" | "tertiary" | "quaternary"` — Figma style mapping (default `"primary"`)
- `size?: "sm" | "lg"` — icon-only size (default `"sm"`)
- `icon?: React.ReactNode` — optional custom icon (defaults to Lucide `Plus`)
- All base props from `Button` primitive are supported except `variant` and `size` which are controlled here.

## Variants
- `variant`: `primary | secondary | tertiary | quaternary`
- `size`: `sm | lg`

## Usage
```tsx
<ButtonIcon aria-label="Add" />
<ButtonIcon variant="secondary" size="lg" aria-label="Add" />
```

## Token References
- Backgrounds/hover: `--action-primary-bg`, `--action-primary-bg-hover`, `--action-secondary-bg`, `--action-secondary-bg-hover`, `--action-tertiary-bg`, `--action-tertiary-bg-hover`
- Borders: `--action-secondary-border`
- Gradient: `--action-gradient-start`, `--action-gradient-stop`, `--action-gradient-start-hover`, `--action-gradient-stop-hover`
- Text color: `--foreground`

## Notes
- Matches Figma sizes (Small → 24px, Large → 40px) and icon sizes (16px/20px).
- Ensure dark-mode tokens are kept in sync for hover/active states.
