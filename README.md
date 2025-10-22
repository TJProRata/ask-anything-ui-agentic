# ask-anything-ui

> Ask Anything UI components

<!-- TODO: Add overview section -->

## Usage

Install deps:

```bash
bun i
# or
npm install
```

Run development server:

```bash
bun run dev
# or
npm run dev
```

Build for production:

```bash
bun run build
# or
npm run build
```

Serve production build:

```bash
bun run start
# or
npm run start
```

## Documentation & Resources

- [Bun](https://bun.com/docs)
- [React - Learn](https://react.dev/learn)
  - [React - Learn - Thinking in React](https://react.dev/learn/thinking-in-react)
- [React - Reference](https://react.dev/reference/react)
  - [React - Reference - createPortal](https://react.dev/reference/react-dom/createPortal)
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Motion (prev Framer Motion)](https://motion.dev/docs/react)

## AI Developer Workflow (ADW)

This project uses ADW for automated GitHub issue processing.

### Quick Start

Process a GitHub issue:
```bash
cd adws/
uv run adw_plan_build.py <issue-number>
```

### Available Commands

- `uv run adw_plan.py <issue>` - Generate implementation plan
- `uv run adw_build.py` - Implement existing plan
- `uv run adw_test.py <issue>` - Run tests and report results
- `uv run adw_plan_build_test.py <issue>` - Full pipeline

### Monitoring

Start continuous monitoring:
```bash
cd adws/
uv run adw_triggers/trigger_cron.py
```

For details, see [adws/README.md](adws/README.md)

### `docs/` (Project Docs)

**`docs/widgets/floating-widget/`**:
- `OVERVIEW.md`: An overview TJ's existing `floating-widget` codebase
- `PLAN.md`: An initial plan for rebuilding the `floating-widget` codebase as composed React components
