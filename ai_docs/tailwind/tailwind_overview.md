# Tailwind CSS v4 - Complete Reference

**Version:** 4.1 (latest stable)  
**Released:** January 22, 2025  
**Browser Support:** Safari 16.4+, Chrome 111+, Firefox 128+

## What's New in v4

### Major Changes

- **5x faster** full builds, **100x faster** incremental builds
- **Zero configuration** - automatic content detection
- **CSS-first configuration** - no more `tailwind.config.js` (optional)
- **Built-in Lightning CSS** - vendor prefixing, nesting, imports
- **Modern CSS features** - cascade layers, `@property`, `color-mix()`
- **First-party Vite plugin** - optimal performance

### New Features (v4.1)

- Text shadows (`text-shadow-*`)
- Masking utilities (`mask-*`)
- Better browser compatibility fallbacks
- Text wrapping (`wrap-break-word`, `wrap-anywhere`)
- Colored drop shadows

## Installation

### With Vite (Recommended for Your Stack)

```bash
npm install tailwindcss@latest @tailwindcss/vite@latest
```

```javascript
// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### CSS File

```css
/* app/globals.css or src/index.css */
@import "tailwindcss";
```

That's it! No `content` array needed.

## CSS-First Configuration

### Basic Theme Customization

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: oklch(0.6 0.2 250);
  --color-secondary: oklch(0.7 0.15 150);
  --color-accent: #3b82f6;

  /* Fonts */
  --font-display: "Inter", sans-serif;
  --font-mono: "Fira Code", monospace;

  /* Spacing (custom) */
  --spacing-128: 32rem;

  /* Breakpoints */
  --breakpoint-3xl: 1920px;

  /* Custom easings */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Usage

```tsx
<button className="bg-primary text-white font-display">
  Click me
</button>

<div className="w-128 3xl:w-256">
  Extra large content
</div>
```

## Dark Mode & Theming

### Simple Dark Mode

```css
@import "tailwindcss";

@theme {
  --color-background: #ffffff;
  --color-text: #1a1a1a;
}

.dark {
  --color-background: #1a1a1a;
  --color-text: #ffffff;
}
```

```tsx
<div className="bg-background text-text">Auto-themed content</div>
```

### Multi-Theme System

```css
@theme {
  --color-primary: #3b82f6;
}

@layer base {
  [data-theme="ocean"] {
    --color-primary: #0ea5e9;
  }

  [data-theme="forest"] {
    --color-primary: #10b981;
  }

  [data-theme="sunset"] {
    --color-primary: #f97316;
  }
}
```

```tsx
<div data-theme="ocean" className="bg-primary">
  Ocean themed
</div>
```

## Utility Classes

### Layout & Spacing

```tsx
// Flexbox
<div className="flex flex-col items-center justify-between gap-4">

// Grid (any number now works!)
<div className="grid grid-cols-12 lg:grid-cols-24 gap-6">

// Container queries
<div className="@container">
  <div className="@lg:grid-cols-2">Content</div>
</div>

// Dynamic spacing (0.25rem = 1 unit)
<div className="p-4 m-8 space-y-2">
  <div className="w-32 h-16">Box</div>
</div>
```

### Colors

```tsx
// Text
<p className="text-slate-900 dark:text-slate-100">

// Background
<div className="bg-blue-500 hover:bg-blue-600">

// Borders
<div className="border border-gray-200 dark:border-gray-800">

// With opacity
<div className="bg-black/50 text-white/90">

// P3 color space (wider gamut)
<div className="bg-[oklch(0.7_0.2_250)]">
```

### Typography

```tsx
// Size & weight
<h1 className="text-4xl font-bold tracking-tight">

// Font families
<p className="font-sans">Body text</p>
<code className="font-mono">Code</code>

// Line height & letter spacing
<p className="leading-relaxed tracking-wide">

// Text wrapping (v4.1)
<p className="wrap-break-word">
  pneumonoultramicroscopicsilicovolcanoconiosis
</p>
```

### Responsive Design

```tsx
// Mobile-first breakpoints
<div className="
  w-full
  sm:w-1/2
  md:w-1/3
  lg:w-1/4
  xl:w-1/5
  2xl:w-1/6
">

// Container queries
<div className="@container">
  <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">
</div>
```

### States & Variants

```tsx
// Hover, focus, active
<button className="
  bg-blue-500
  hover:bg-blue-600
  focus:ring-2
  active:scale-95
">

// Data attributes (no more arbitrary values!)
<div className="data-[state=open]:block data-[state=closed]:hidden">

// Group hover
<div className="group">
  <img className="group-hover:scale-110" />
</div>

// Not variant (v4)
<div className="not-[:disabled]:hover:bg-gray-100">
```

### Transitions & Animations

```tsx
// Basic transitions
<div className="transition-all duration-300 ease-in-out">

// Transform
<div className="hover:scale-110 hover:rotate-3">

// 3D transforms (v4)
<div className="rotate-x-45 rotate-y-30">

// @starting-style support (v4)
<dialog className="
  open:scale-100
  starting:scale-95
  transition-all
">
```

### Shadows & Effects

```tsx
// Shadows
<div className="shadow-lg drop-shadow-xl">

// Colored drop shadows (v4.1)
<div className="drop-shadow-[0_4px_8px_rgb(59_130_246)]">

// Text shadows (v4.1)
<h1 className="text-shadow-sm text-shadow-blue-500/50">

// Blur & backdrop
<div className="backdrop-blur-md bg-white/80">

// Masking (v4.1)
<div className="mask-[url(mask.svg)]">
```

### Gradients

```tsx
// Linear
<div className="bg-gradient-to-r from-blue-500 to-purple-600">

// Radial (v4)
<div className="bg-[radial-gradient(circle,var(--color-blue-500),transparent)]">

// Conic (v4)
<div className="bg-[conic-gradient(from_90deg,red,yellow,green)]">
```

## Advanced Patterns

### Custom Utilities

```css
@utility screen-reader-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

```tsx
<span className="screen-reader-only">Accessible text</span>
```

### Custom Variants

```css
@custom-variant theme-dark (&:where([data-theme="dark"], [data-theme="dark"] *));

/* Usage: theme-dark:bg-slate-900 */
```

### Base Styles

```css
@layer base {
  h1 {
    @apply text-4xl font-bold;
  }

  h2 {
    @apply text-3xl font-semibold;
  }

  a {
    @apply text-blue-600 hover:underline;
  }
}
```

### Component Styles

```css
@layer components {
  .btn {
    @apply rounded-lg px-4 py-2 font-medium transition-colors;
  }

  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
}
```

## Working with shadcn/ui

### Installation

shadcn/ui fully supports Tailwind v4. Initialize with:

```bash
npx shadcn@latest init
```

### CSS Variables Setup

```css
@import "tailwindcss";

:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 3.9%);
  --primary: hsl(222 47% 11%);
  --primary-foreground: hsl(210 40% 98%);
  /* ... more variables */
}

.dark {
  --background: hsl(0 0% 3.9%);
  --foreground: hsl(0 0% 98%);
  --primary: hsl(210 40% 98%);
  --primary-foreground: hsl(222 47% 11%);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}
```

## Common Patterns for Your Project

### Card Component

```tsx
<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
  <h3 className="mb-2 text-xl font-semibold">Title</h3>
  <p className="text-gray-600 dark:text-gray-400">Content</p>
</div>
```

### Form Input

```tsx
<input className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-800" />
```

### Button

```tsx
<button className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-blue-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
  <span>Click me</span>
</button>
```

### Loading Spinner

```tsx
<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
```

## Performance Tips

### Arbitrary Values

```tsx
// Use when needed, but prefer theme values
<div className="w-[342px] bg-[#1a1a1a]">

// Better with theme
<div className="w-96 bg-gray-900">
```

### Dynamic Classes

```tsx
// ❌ Don't concatenate strings
const color = 'blue';
<div className={`bg-${color}-500`}>  // Won't work!

// ✅ Use complete class names
const bgClass = color === 'blue' ? 'bg-blue-500' : 'bg-red-500';
<div className={bgClass}>

// ✅ Or use inline styles for true dynamic values
<div style={{ backgroundColor: userColor }}>
```

### Optimize Production

Tailwind v4 automatically removes unused CSS. Your production bundle will be tiny (typically <10KB).

## Migration from v3

### Automated Tool

```bash
npx @tailwindcss/upgrade@next
```

This handles:

- Updating dependencies
- Converting `tailwind.config.js` to CSS
- Updating deprecated utilities
- Migrating content configuration

### Manual Steps

```css
/* Before (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After (v4) */
@import "tailwindcss";
```

## Debugging

### VS Code IntelliSense

Install: `Tailwind CSS IntelliSense`

If autocomplete doesn't work, add to `.vscode/settings.json`:

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["className[=:]\\s*[\"']([^\"']*)[\"']"]
  ]
}
```

### Content Detection Issues

```css
/* Explicitly add sources */
@source "**/*.{ts,tsx}";
@source "../packages/**/*.tsx";
```

## Important Breaking Changes

1. **Browser support** - Modern browsers only (Safari 16.4+, Chrome 111+, Firefox 128+)
2. **No preprocessors** - Can't use Sass/Less/Stylus with v4
3. **Placeholder color** - Now uses `currentColor` at 50% opacity (was `gray-400`)
4. **Button cursor** - Now `cursor: default` (was `cursor: pointer`)
5. **Dialog margins** - Reset to 0 (was browser default)

## Resources

**Official Docs:** https://tailwindcss.com/docs  
**Migration Guide:** https://tailwindcss.com/docs/upgrade-guide  
**Playground:** https://play.tailwindcss.com  
**Theme Variables:** https://tailwindcss.com/docs/theme  
**Functions & Directives:** https://tailwindcss.com/docs/functions-and-directives  
**Release Notes:** https://tailwindcss.com/blog/tailwindcss-v4

## Quick Reference

### Most Used Utilities

```tsx
// Layout
flex flex-col items-center justify-between gap-4
grid grid-cols-3 gap-6

// Sizing
w-full h-screen min-h-0 max-w-7xl

// Spacing
p-4 px-6 py-2 m-auto space-y-4

// Typography
text-lg font-bold leading-tight tracking-wide

// Colors
bg-white text-gray-900 border-gray-200

// Effects
shadow-lg rounded-xl transition-all duration-300

// States
hover:bg-gray-100 focus:ring-2 active:scale-95
```

### Color Palette (Default)

- **Gray:** `slate`, `gray`, `zinc`, `neutral`, `stone`
- **Colors:** `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`
- **Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

### Breakpoints (Default)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

**For your Next.js + React project:** Tailwind v4 works seamlessly. Use the Vite plugin, define your theme in CSS, and you're ready to go. Zero configuration needed.
