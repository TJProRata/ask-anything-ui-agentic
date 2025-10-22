# Bun + Next.js Integration

## Installation & Setup

### Install Dependencies
```bash
bun install
# or with specific package
bun add next@15.4.5 react@19.1.0 react-dom@19.1.0
```

### Run Next.js Dev Server
```bash
bun --bun run dev
# or
bun run next dev
```

### Build & Start
```bash
bun run next build
bun run next start
```

## Environment Variables

### Next.js Public Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...

# Build-time inlining
NEXT_PUBLIC_ANALYTICS_ID=abc123
```

```typescript
// Bundled at build time - frozen value
setupAnalytics(process.env.NEXT_PUBLIC_ANALYTICS_ID);

// Only available server-side
const dbUrl = process.env.DATABASE_URL;
```

### Load Env Outside Next.js Runtime
```bash
bun add @next/env
```

```typescript
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Use in ORM config, test runners, etc.
export default {
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  }
};
```

## API Routes

### Basic API Route
```typescript
// app/api/users/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const users = await db.query('SELECT * FROM users');
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await db.insert(body);
  return NextResponse.json(user);
}
```

```typescript
// pages/api/users.ts (Pages Router)
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const users = await db.query('SELECT * FROM users');
    res.json(users);
  }
}
```

## TypeScript Configuration

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Bun Path Mapping
Bun respects `tsconfig.json` paths at runtime:
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/utils/*": ["./utils/*"]
    }
  }
}
```

## Server Components & Actions (App Router)

### Server Component
```typescript
// app/users/page.tsx
export default async function UsersPage() {
  const users = await db.query('SELECT * FROM users');
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Server Actions
```typescript
// app/actions.ts
'use server';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  await db.insert({ name, email });
  revalidatePath('/users');
}
```

## Edge Runtime
```typescript
// app/api/edge/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  const response = await fetch('https://api.example.com');
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

## Performance Optimizations

### Bun-Specific
- Use `bun --bun` flag for native Bun APIs
- Enable `experimentalDecorators` if using decorators
- Leverage Bun's built-in SQLite/PostgreSQL clients

### Next.js 15 Features
- Parallel routes
- Server actions
- Streaming SSR
- React Server Components

## Common Patterns

### Database Integration
```typescript
// lib/db.ts
import { Database } from "bun:sqlite";

export const db = new Database("./app.db", { create: true });

// Or PostgreSQL
import { sql } from "bun";
export { sql };
```

### File Uploads
```typescript
// app/api/upload/route.ts
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  await Bun.write(`./uploads/${file.name}`, file);
  
  return Response.json({ success: true });
}
```

## Compatibility Notes
- Bun is 90%+ Node.js compatible
- Most Next.js features work out of the box
- Some Node-specific packages may need alternatives
- Edge runtime has limited API surface
