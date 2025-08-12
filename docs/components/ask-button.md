# AskButton

- **Code**: `components/ask-anything/ask-button.tsx`
- **Figma**: Dev Resource → “Ask Button” component (attach in Figma)

## Import
```tsx
import { AskButton } from "@/components/ask-anything/ask-button";
```

## Props
- `logoSrc?: string` — right avatar/logo image URL (default `/daily-mail.png`)
- `logoAlt?: string` — alt text for the logo (default `"Daily Mail"`)
- All base props from `Button` primitive are supported.

## Variants
- Uses `Button` `variant="ghost"` with custom classes.

## Usage
```tsx
<AskButton onClick={() => console.log("Ask clicked")}/>
```

## Token References
- Text color via gradient (consider mapping to `--ask-anything-linear-gradient` later)
- Surface/background should align with tokens from `app/globals.css` as this component evolves.

## Notes
- Uses `next/image` for sparkles and the right-hand logo.
- Visually validated for both light and dark themes recommended.
