# AI Documentation

Technical documentation for Claude Code agents working on Ask Anything UI.

**Project Stack**: Bun + Next.js 15 + React 19 + TypeScript 5.9.2 + Tailwind v4 + Convex

---

## 📚 Quick Reference

### Essential Files (Load First)
- **`bun/bun-quickref.md`** - Command reference, file I/O, testing
- **`react/react_currentoverview.md`** - React 19 features, hooks, patterns
- **`nextjs/nextjs_overview.md`** - App Router, routing, data fetching
- **`tailwind/tailwind_overview.md`** - Utility classes, theming, responsive design
- **`typescript/typescript_5.9.3.md`** - TypeScript features and best practices

---

## 📂 Directory Guide

### `/bun` - Runtime & Tooling

**When to load:**
- Package management (install, update, scripts)
- Build configuration and bundling
- Performance optimization
- Database operations (SQLite, PostgreSQL)
- Server setup and API routes

**Files:**
- **`bun-quickref.md`** - Commands, file I/O, HTTP, testing, shell
- **`bun-best-practices.md`** ⭐ - Latest features (v1.3), patterns, gotchas, security
- **`bun-runtime.md`** - Runtime features, Node.js compatibility, built-in APIs
- **`bun-bundler.md`** - Build config, executables, plugins, optimization
- **`bun-server.md`** - HTTP/WebSocket servers, Bun.serve patterns
- **`bun-nextjs.md`** - Next.js integration, API routes, deployment
- **`bun-typescript.md`** - TypeScript config, path mapping, JSX
- **`bun-env.md`** - Environment variables, secrets management

---

### `/convex` - Database & Backend

**When to load:**
- Database schema design
- Data queries and mutations
- Real-time subscriptions
- Authentication and user management
- File storage and uploads

**Files:**
- **`convex_database.md`** ⭐ - Schema, queries, mutations, indexes, relationships
- **`convex_functions.md`** ⭐ - Query/mutation/action patterns, validators, scheduling
- **`convex_auth.md`** - Authentication flows, session management, user data
- **`convex_filestorage.md`** - File uploads, storage URLs, metadata

---

### `/nextjs` - Framework & Routing

**When to load:**
- Page creation and routing
- Server/client components
- Data fetching strategies
- Layouts and nested routes
- API route handlers

**Files:**
- **`nextjs_overview.md`** ⭐ - App Router, server components, metadata, caching
- **`nextjs_dynamicroutes.md`** - Dynamic routes, catch-all, route groups, parallel routes

---

### `/react` - UI Components

**When to load:**
- Component architecture
- State management (useState, useReducer, Context)
- Effects and lifecycle
- Performance optimization (memo, useMemo, useCallback)
- Refs and DOM interaction

**Files:**
- **`react_currentoverview.md`** ⭐ - React 19 features, hooks, patterns, best practices

---

### `/tailwind` - Styling

**When to load:**
- UI styling and layout
- Responsive design
- Theme customization
- Component composition with utilities
- Dark mode implementation

**Files:**
- **`tailwind_overview.md`** ⭐ - v4 features, utility classes, customization, responsive design

---

### `/typescript` - Type System

**When to load:**
- Type definitions and interfaces
- Generic programming
- Advanced type features
- Build configuration
- Strict mode compliance

**Files:**
- **`typescript_5.9.3.md`** ⭐ - TypeScript 5.9.3 features, patterns, configuration

---

## 🎯 Common Task Workflows

### Building a New Feature
```
1. react/react_currentoverview.md     → Component patterns
2. tailwind/tailwind_overview.md      → Styling approach
3. convex/convex_database.md          → Data schema
4. convex/convex_functions.md         → Queries/mutations
```

### API Development
```
1. bun/bun-server.md                  → Server setup
2. nextjs/nextjs_overview.md          → API routes
3. convex/convex_functions.md         → Backend logic
4. typescript/typescript_5.9.3.md     → Type safety
```

### Performance Optimization
```
1. bun/bun-best-practices.md          → Runtime optimization
2. react/react_currentoverview.md     → Component optimization
3. nextjs/nextjs_overview.md          → Caching strategies
```

### Debugging & Troubleshooting
```
1. bun/bun-best-practices.md          → Common gotchas
2. bun/bun-quickref.md                → CLI commands
3. typescript/typescript_5.9.3.md     → Type errors
```

---

## 🔥 Priority Loading Guide

### Session Start (Always Load)
- `bun/bun-best-practices.md` - Critical patterns and gotchas
- `react/react_currentoverview.md` - Component fundamentals
- `nextjs/nextjs_overview.md` - Framework essentials

### Frontend Work
- `tailwind/tailwind_overview.md`
- `react/react_currentoverview.md`
- `typescript/typescript_5.9.3.md`

### Backend Work
- `convex/convex_database.md`
- `convex/convex_functions.md`
- `bun/bun-server.md`

### Build/Deploy Work
- `bun/bun-bundler.md`
- `bun/bun-nextjs.md`
- `nextjs/nextjs_overview.md`

---

## 📝 Notes

- **⭐ = Priority file** - Load these for general context
- Most files are task-specific - load on demand
- Bun v1.3+ features documented throughout
- All docs align with project's exact versions:
  - Bun 1.3+
  - Next.js 15.4.5
  - React 19.1.0
  - TypeScript 5.9.2
  - Tailwind CSS v4

---

## 🚀 Quick Access

**For `/prime` command** - Essential onboarding files:
- `bun/bun-best-practices.md`
- `bun/bun-quickref.md`
- `convex/convex_database.md`
- `convex/convex_functions.md`
- `nextjs/nextjs_overview.md`
- `react/react_currentoverview.md`
- `tailwind/tailwind_overview.md`
- `typescript/typescript_5.9.3.md`

**For specific tasks** - Load on-demand as needed based on workflows above.
