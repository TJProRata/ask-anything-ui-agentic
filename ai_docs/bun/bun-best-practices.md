# Bun Best Practices & Latest Features

## Latest Features (1.3 - Oct 2025)

### MySQL Client (Built-in)
```typescript
import { MySQL } from "bun";

const mysql = new MySQL({
  hostname: "localhost",
  username: "root",
  password: "password",
  database: "mydb"
});

const users = await mysql.query("SELECT * FROM users");
```

### Full-Stack Dev Server
Run HTML files directly with hot reloading:
```bash
bun index.html
```

Automatically bundles React/CSS/JS with live reload.

### GC Improvements
- 100x reduction in idle CPU usage
- 40% reduction in idle memory usage
- Better integration with event loop

### bun info Command
```bash
bun info react
# Shows: version, dependencies, dist-tags, maintainers
```

### bun why Command
```bash
bun why tailwindcss
# Shows: full dependency chain explaining why package is installed
```

### Interactive Updates
```bash
bun update --interactive
# Choose which packages to update with visual interface
```

## Best Practices for Your Stack

### Project Structure
```
project/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── lib/             # Utilities
│   │   ├── db.ts        # Database client
│   │   ├── api.ts       # API helpers
│   │   └── utils.ts     
│   └── types/           # TypeScript types
├── public/              # Static assets
├── convex/              # Convex functions
├── .env.local           # Local env vars
├── .env                 # Default env vars
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── package.json
```

### Database Setup (SQLite + Convex)

#### SQLite (Local/Cache)
```typescript
// lib/db.ts
import { Database } from "bun:sqlite";

export const db = new Database("./cache.db", { 
  create: true,
  strict: true 
});

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS cache (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    expires_at INTEGER
  )
`);
```

#### Convex (Primary Database)
```typescript
// lib/convex.ts
import { ConvexHttpClient } from "convex/browser";

export const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);
```

### API Routes Best Practices

#### Error Handling
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const users = await fetchUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
```

#### Type Safety
```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createUserSchema.parse(body);
    
    const user = await createUser(validated);
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    throw error;
  }
}
```

### Performance Optimization

#### Use Built-in Clients
```typescript
// ❌ Avoid external packages when built-in exists
import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

// ✅ Use Bun's built-in clients
import { sql } from "bun";           // PostgreSQL
import { Database } from "bun:sqlite"; // SQLite
import { RedisClient } from "bun";    // Redis
import { S3Client } from "bun";       // S3
```

#### Cache Compiled Code
```typescript
// Development
Bun.serve({
  development: true,  // Hot reload, detailed errors
  routes: { /* ... */ }
});

// Production
Bun.serve({
  development: false,  // Enable caching, minification, ETags
  routes: { /* ... */ }
});
```

#### Preload Dependencies
```typescript
// preload.ts
import 'react';
import 'react-dom';
import '@/lib/db';
import '@/lib/utils';

// Run before main app
// bun --preload ./preload.ts server.ts
```

### Security

#### Environment Variables
```typescript
// ❌ Never expose secrets client-side
export const API_KEY = process.env.API_KEY;  // Will be bundled!

// ✅ Server-only access
import { headers } from 'next/headers';

export async function fetchData() {
  const apiKey = process.env.API_KEY;  // Server component/API route
  return fetch(url, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
}
```

#### Input Validation
```typescript
import { z } from 'zod';

// Define schemas
const schemas = {
  createGist: z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1),
    tags: z.array(z.string()).max(10)
  }),
  
  updateGist: z.object({
    id: z.string().uuid(),
    title: z.string().min(1).max(200).optional(),
    content: z.string().min(1).optional()
  })
};

// Use in routes
export async function POST(req: Request) {
  const data = schemas.createGist.parse(await req.json());
  // data is now type-safe and validated
}
```

### File Handling

#### Uploads
```typescript
// app/api/upload/route.ts
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  // Validate
  if (file.size > 10 * 1024 * 1024) {
    return new Response('File too large', { status: 400 });
  }
  
  // Save
  const path = `./uploads/${crypto.randomUUID()}-${file.name}`;
  await Bun.write(path, file);
  
  return Response.json({ path });
}
```

#### Image Processing
```typescript
// Serve optimized images
import sharp from 'sharp';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');
  const width = parseInt(searchParams.get('width') || '800');
  
  const file = Bun.file(path!);
  const buffer = await file.arrayBuffer();
  
  const optimized = await sharp(buffer)
    .resize(width)
    .webp({ quality: 80 })
    .toBuffer();
  
  return new Response(optimized, {
    headers: { 'Content-Type': 'image/webp' }
  });
}
```

### Development Workflow

#### Hot Reload
```bash
# Development
bun --watch dev

# Server with auto-restart
bun --hot server.ts
```

#### Environment-Specific Configs
```bash
# Development
bun --env-file=.env.local dev

# Production
bun --env-file=.env.production start
```

### Testing Strategy

#### Unit Tests
```typescript
import { test, expect } from "bun:test";
import { generateSlug } from '@/lib/utils';

test("generateSlug", () => {
  expect(generateSlug("Hello World")).toBe("hello-world");
  expect(generateSlug("Test  Multiple   Spaces")).toBe("test-multiple-spaces");
});
```

#### Integration Tests
```typescript
import { test, expect } from "bun:test";

test("API: create user", async () => {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test", email: "test@test.com" })
  });
  
  expect(response.status).toBe(200);
  const user = await response.json();
  expect(user.name).toBe("Test");
});
```

### Deployment

#### Build for Production
```bash
# Next.js
bun run build
bun run start

# Standalone executable
bun build --compile --target=bun-linux-x64 ./server.ts --outfile app
```

#### Docker (Bun Image)
```dockerfile
FROM oven/bun:1.3-slim

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
```

### Monitoring & Logging

#### Structured Logging
```typescript
// lib/logger.ts
export const logger = {
  info: (msg: string, meta?: object) => 
    console.log(JSON.stringify({ level: 'info', msg, ...meta })),
  
  error: (msg: string, error?: Error, meta?: object) =>
    console.error(JSON.stringify({ 
      level: 'error', 
      msg, 
      error: error?.message,
      stack: error?.stack,
      ...meta 
    })),
};
```

#### Performance Tracking
```typescript
// lib/metrics.ts
export async function withTiming<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  try {
    return await fn();
  } finally {
    const duration = performance.now() - start;
    console.log(`[PERF] ${name}: ${duration.toFixed(2)}ms`);
  }
}
```

## Common Gotchas

### 1. Don't Use Node-Specific APIs Without Checking
```typescript
// ❌ May not work in Bun
import { EventEmitter } from 'events';

// ✅ Use Web APIs when possible
import { EventTarget } from 'bun';
```

### 2. Path Resolution
```typescript
// ❌ Don't use __dirname (may not exist)
const path = __dirname + '/file.txt';

// ✅ Use import.meta
const path = new URL('./file.txt', import.meta.url).pathname;
```

### 3. Environment Variables in Client Code
```typescript
// ❌ Secret exposed to browser
const key = process.env.API_KEY;

// ✅ Only in server components/API routes
// Or use NEXT_PUBLIC_ prefix for public values
```

### 4. Dynamic Imports with Variables
```typescript
// ❌ Won't work with bundler
const mod = await import(`./${variable}.js`);

// ✅ Use static imports
const modules = {
  a: await import('./a.js'),
  b: await import('./b.js')
};
```
