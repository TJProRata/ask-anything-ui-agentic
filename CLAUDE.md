# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ask Anything UI is a React-based component library for building embeddable AI-powered widgets. The project implements a three-stage pipeline: Import (Figma designs), Transform (React components), and Deploy (embeddable widgets).

## Tech Stack

- **Runtime**: Bun (preferred over npm/yarn/pnpm)
- **Framework**: Next.js 15.4.5 with React 19.1.0
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with Lightning CSS
- **Components**: shadcn/ui (based on Radix UI)
- **Build**: Custom widget bundler using Bun

## Common Commands

```bash
# Development
bun run dev           # Start Next.js dev server with Turbopack
bun run lint          # Run ESLint

# Build
bun run build         # Build Next.js application
bun run build:widget  # Build embeddable widget bundle
bun run clean         # Clean dist directory

# Production
bun run start         # Start production server
```

## Architecture

### Application Structure
- `/app` - Next.js app router pages and layouts
- `/components` - React components organized by category:
  - `/ui` - shadcn/ui primitive components
  - `/app` - Application-level components
  - `/ask-anything` - AI widget specific components
  - `/widgets` - Embeddable widget implementations
- `/hooks` - Custom React hooks (e.g., `use-widget-api`)
- `/scripts` - Build scripts for widget bundling
- `/docs` - Architecture and design documentation

### Widget Architecture
The project builds React components that can be embedded as third-party widgets using:
- Shadow DOM for style isolation
- IIFE bundle format for global script execution
- Custom build pipeline in `scripts/build.widget.ts`
- Widget manager for initialization and lifecycle

### Key Components
- **FloatingWidget**: Main embeddable widget component
- **WidgetManager**: Handles widget initialization and Shadow DOM
- **AskButton**: Expandable button trigger for widget panel

## Development Guidelines

### Component Development
- Follow existing component patterns in `/components`
- Use shadcn/ui primitives as base components
- Implement proper TypeScript types in `/widgets/types.ts`
- Maintain style consistency with Tailwind CSS v4

### Widget Building
- Entry point: `components/widgets/floating-widget/floating-widget.tsx`
- Output: IIFE bundle in `/dist` directory
- Target bundle size: ~50KB gzipped
- Includes React and all dependencies in bundle

### Styling
- Global styles in `app/globals.css`
- Work Sans as primary font, Geist Mono for code
- Theme provider with light/dark mode support
- CSS custom properties for widget theming

## Important Notes

- Always use Bun commands (`bun run`, not `npm run`)
- Widget builds include all dependencies (no external React)
- Shadow DOM provides complete style isolation for widgets
- No test framework currently configured