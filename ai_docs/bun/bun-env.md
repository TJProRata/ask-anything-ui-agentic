# Environment Variables in Bun

## Loading .env Files

### Automatic Loading
Bun automatically loads `.env` files in this order:
1. `.env.local` (highest priority, not committed)
2. `.env.production` / `.env.development` (environment-specific)
3. `.env` (default, committed)

```bash
# .env
DATABASE_URL=postgresql://localhost/mydb
API_KEY=secret123

# .env.local (overrides .env)
DATABASE_URL=postgresql://prod-server/mydb
```

### Manual Loading
```typescript
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);
```

## Accessing Environment Variables

### Runtime (Server-Side Only)
```typescript
// Available in Node.js/Bun runtime
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
```

### Build-Time (Next.js Public Variables)
```bash
# .env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=abc123
```

```typescript
// Inlined at build time - works in browser
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ❌ Won't work (dynamic access)
const key = 'NEXT_PUBLIC_API_URL';
const apiUrl = process.env[key];  // undefined
```

## Build-Time Inlining with Bun

### CLI
```bash
# Inline specific constants
bun build \
  --define BUILD_VERSION='"1.0.0"' \
  --define NODE_ENV='"production"' \
  src/index.ts --outdir ./dist

# Inline env vars by prefix
bun build \
  --env "MY_PUBLIC_*" \
  src/index.ts --outdir ./dist
```

### JavaScript API
```typescript
// Define constants
await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  define: {
    BUILD_VERSION: '"1.0.0"',
    NODE_ENV: '"production"',
    'process.env.API_URL': '"https://api.com"'
  }
});

// Prefix-based inlining
await Bun.build({
  env: "MY_PUBLIC_*",  // Inlines MY_PUBLIC_API_URL, MY_PUBLIC_KEY, etc.
  entrypoints: ["src/index.ts"],
  outdir: "./dist"
});
```

### Usage in Code
```typescript
// Declared at top of file
declare const BUILD_VERSION: string;
declare const CONFIG: {
  apiUrl: string;
  timeout: number;
};

// Used in code - replaced at build time
console.log(`App v${BUILD_VERSION}`);
const response = await fetch(CONFIG.apiUrl, {
  timeout: CONFIG.timeout
});
```

## Patterns

### Server Configuration
```typescript
// config/server.ts
export const serverConfig = {
  database: {
    url: process.env.DATABASE_URL!,
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10')
  },
  redis: {
    url: process.env.REDIS_URL!
  },
  s3: {
    bucket: process.env.S3_BUCKET!,
    region: process.env.S3_REGION || 'us-east-1'
  }
};
```

### Client Configuration
```typescript
// config/client.ts
export const clientConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID!,
  environment: process.env.NEXT_PUBLIC_ENV || 'development'
};
```

### Type Safety
```typescript
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    S3_BUCKET: string;
    S3_REGION?: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_ANALYTICS_ID: string;
  }
}
```

### Validation
```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  S3_BUCKET: z.string().min(1),
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

## Security Best Practices

### Never Expose Secrets Client-Side
```typescript
// ❌ BAD - Exposes secret in browser
const secret = process.env.API_SECRET;  // No NEXT_PUBLIC_ prefix!

// ✅ GOOD - Only on server
const secret = process.env.API_SECRET;  // Server component/API route only
```

### Use .env.local for Local Secrets
```bash
# .env (committed)
DATABASE_URL=postgresql://localhost/mydb

# .env.local (NOT committed, overrides .env)
DATABASE_URL=postgresql://real-prod/mydb
API_SECRET=super-secret-key
```

### .gitignore
```
.env.local
.env.*.local
```

## Database-Specific

### SQLite
```typescript
import { Database } from "bun:sqlite";

const db = new Database(
  process.env.SQLITE_DB_PATH || "./app.db"
);
```

### PostgreSQL
```typescript
import { sql } from "bun";

// Uses DATABASE_URL env var automatically
const users = await sql`SELECT * FROM users`;
```

### S3
```typescript
import { S3Client } from "bun";

// Reads from env vars:
// S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY
const s3 = new S3Client();
```

## Common Env Vars

### Required for Your Stack
```bash
# Database
DATABASE_URL=postgresql://...
CONVEX_DEPLOYMENT=...

# S3/Storage (if using)
S3_BUCKET=...
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...

# Next.js Public
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENV=development

# Build
NODE_ENV=development
```
