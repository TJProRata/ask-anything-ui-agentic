# Bun Documentation for Claude Code

**Version:** 1.2.23 (stable) | 1.3 (latest)  
**Stack:** Bun + Next.js 15.4.5 + React 19.1.0 + TypeScript 5.9.2 + Tailwind v4 + Convex

## Documentation Files

### Core Bun Features
1. **[bun-runtime.md](./bun-runtime.md)** - Runtime features, Node.js compatibility, built-in clients
2. **[bun-bundler.md](./bun-bundler.md)** - Build configuration, executables, plugins
3. **[bun-server.md](./bun-server.md)** - HTTP/WebSocket servers with Bun.serve
4. **[bun-quickref.md](./bun-quickref.md)** - Command reference and common operations

### Integration & Configuration
5. **[bun-nextjs.md](./bun-nextjs.md)** - Next.js integration and API routes
6. **[bun-typescript.md](./bun-typescript.md)** - TypeScript configuration and features
7. **[bun-env.md](./bun-env.md)** - Environment variable management

### Best Practices
8. **[bun-best-practices.md](./bun-best-practices.md)** - Latest features, patterns, gotchas

## Quick Reference

### Essential Commands
```bash
# Development
bun install                    # Install deps
bun --bun run dev             # Run Next.js dev
bun --watch server.ts         # Hot reload

# Building
bun run build                 # Next.js build
bun build --compile app.ts    # Standalone executable

# Testing
bun test                      # Run tests
bun test --watch              # Watch mode
```

### Core APIs
```typescript
// Built-in Database Clients
import { Database } from "bun:sqlite";
import { sql } from "bun";           // PostgreSQL
import { MySQL } from "bun";         // MySQL (1.3+)

// Server
import { serve } from "bun";
serve({ fetch(req) { return new Response("OK"); } });

// File I/O
await Bun.write("file.txt", "content");
const text = await Bun.file("file.txt").text();

// Process
import { spawn } from "bun";
import { $ } from "bun";
```

## Key Features for Your Project

### Database Integration
- **Convex**: Primary database (use SDK as normal)
- **SQLite**: Built-in for local caching
```typescript
import { Database } from "bun:sqlite";
const db = new Database("./cache.db");
```

### API Routes (Next.js)
```typescript
// app/api/users/route.ts
export async function GET() {
  const users = await fetchUsers();
  return Response.json(users);
}
```

### Environment Variables
```bash
# .env.local
DATABASE_URL=postgresql://...
CONVEX_DEPLOYMENT=...
NEXT_PUBLIC_API_URL=http://localhost:3000
```

```typescript
// Server-only
const secret = process.env.DATABASE_URL;

// Client-side (NEXT_PUBLIC_ prefix)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### TypeScript Path Mapping
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"]
    }
  }
}
```

## Performance Benefits

- 30% faster `bun install`
- 3x faster Express vs Node.js
- 100x reduction in idle CPU (v1.3)
- 90%+ Node.js compatibility

## Version History

- **1.3 (Oct 2025)**: MySQL client, full-stack dev server, GC improvements
- **1.2.23 (Sep 2025)**: Stability fixes
- **1.2 (Jan 2025)**: PostgreSQL, S3, HTTP/2, major Node compat improvements

---

**Usage**: Keep these docs as local reference for Claude Code agent. No fluff, just practical information.
