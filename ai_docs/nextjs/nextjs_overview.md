# Next.js 15 Reference Guide

**Version:** 15.4.5 (using React 19.1.0)  
**Router:** App Router (file-system based)  
**Runtime:** Bun (recommended)

> **Official Docs:** https://nextjs.org/docs

---

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Routing](#routing)
3. [Server & Client Components](#server--client-components)
4. [Data Fetching](#data-fetching)
5. [Server Actions](#server-actions)
6. [API Routes](#api-routes)
7. [Layouts & Pages](#layouts--pages)
8. [Metadata & SEO](#metadata--seo)
9. [Configuration](#configuration)
10. [Performance](#performance)
11. [Deployment](#deployment)

---

## Core Concepts

### App Router vs Pages Router

Next.js 15 uses **App Router** (`/app` directory) by default. This guide focuses on App Router patterns.

**Key Benefits:**

- React Server Components (RSC)
- Streaming & Suspense support
- Nested layouts
- Collocated data fetching
- Server Actions

**Deep dive:** https://nextjs.org/docs/app

### React Server Components (RSC)

Server Components render on the server and send only HTML to client.

**Benefits:**

- 70% smaller bundle sizes
- Direct database access
- Zero client-side JavaScript for static content
- Automatic code splitting

```typescript
// Server Component (default in /app)
export default async function Page() {
  const users = await db.query('SELECT * FROM users');
  return <UserList users={users} />;
}
```

**Client Components** (opt-in with `'use client'`):

```typescript
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Rule:** Use Server Components by default. Only use Client Components for:

- Interactivity (onClick, onChange, etc.)
- Browser APIs (localStorage, window)
- State management (useState, useReducer)
- Effects (useEffect)

**Deep dive:** https://nextjs.org/docs/app/building-your-application/rendering/server-components

---

## Routing

### File-System Router

Routes are defined by folder structure in `/app`:

```
app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
├── blog/
│   ├── page.tsx          → /blog
│   └── [slug]/
│       └── page.tsx      → /blog/:slug
└── api/
    └── users/
        └── route.ts      → /api/users
```

### Special Files

- `page.tsx` - Route UI
- `layout.tsx` - Shared UI wrapper
- `loading.tsx` - Loading UI (Suspense boundary)
- `error.tsx` - Error UI
- `not-found.tsx` - 404 UI
- `route.ts` - API endpoint

### Dynamic Routes

```typescript
// app/blog/[slug]/page.tsx
export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}

// Generate static params at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### Catch-All Routes

```typescript
// app/docs/[...slug]/page.tsx → /docs/a, /docs/a/b, /docs/a/b/c
params: { slug: string[] }

// app/shop/[[...slug]]/page.tsx → /shop, /shop/a, /shop/a/b
// Optional catch-all
```

### Route Groups

```typescript
// app/(marketing)/about/page.tsx → /about
// app/(marketing)/contact/page.tsx → /contact
// Parentheses = organize without affecting URL
```

### Parallel Routes

```typescript
// app/@modal/(.)photo/[id]/page.tsx
// app/@feed/page.tsx
// Render multiple pages in same layout simultaneously
```

**Deep dive:** https://nextjs.org/docs/app/building-your-application/routing

---

## Server & Client Components

### When to Use Each

**Server Components (default):**

- ✅ Fetch data
- ✅ Access backend resources (DB, filesystem)
- ✅ Keep secrets on server
- ✅ Large dependencies (syntax highlighters, etc.)

**Client Components (`'use client'`):**

- ✅ Interactivity (event listeners)
- ✅ State & lifecycle (useState, useEffect)
- ✅ Browser APIs (localStorage, geolocation)
- ✅ Custom hooks that use above

### Composition Pattern

```typescript
// app/dashboard/page.tsx (Server Component)
import ClientSidebar from './ClientSidebar';
import { getCurrentUser } from '@/lib/auth';

export default async function Dashboard() {
  const user = await getCurrentUser();

  return (
    <div>
      {/* Server-rendered */}
      <h1>Welcome {user.name}</h1>

      {/* Client-rendered */}
      <ClientSidebar userId={user.id} />
    </div>
  );
}
```

### Passing Props Server → Client

```typescript
// ✅ Serializable data only
<ClientComponent
  user={{ id: 1, name: "John" }}
  timestamp={Date.now()}
/>

// ❌ Cannot pass functions, class instances, Dates
<ClientComponent
  onClick={() => {}} // Error!
  date={new Date()}   // Error!
/>
```

**Deep dive:** https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

---

## Data Fetching

### In Server Components (Preferred)

```typescript
// Direct database access
export default async function Users() {
  const users = await db.query('SELECT * FROM users');
  return <UserList users={users} />;
}

// External API
export default async function Posts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  const posts = await res.json();
  return <PostList posts={posts} />;
}
```

### Fetch Options

```typescript
// Static (cached forever, revalidated on demand)
fetch(url, { cache: "force-cache" });

// Dynamic (no cache, fetch every request)
fetch(url, { cache: "no-store" });

// Revalidate (cached, refresh after N seconds)
fetch(url, { next: { revalidate: 60 } });

// Revalidate on demand
import { revalidatePath, revalidateTag } from "next/cache";
revalidatePath("/blog");
revalidateTag("posts");
```

### Parallel Data Fetching

```typescript
export default async function Page() {
  // ✅ Parallel (both fetch at same time)
  const [users, posts] = await Promise.all([getUsers(), getPosts()]);

  // ❌ Sequential (posts waits for users)
  const users = await getUsers();
  const posts = await getPosts();
}
```

### Request Memoization

```typescript
// Same fetch called multiple times = only 1 request
async function getUser(id: string) {
  return fetch(`/api/users/${id}`);
}

// Both components call getUser(123) → only 1 fetch
// Automatic deduplication during single render
```

### Streaming with Suspense

```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Show immediately */}
      <StaticContent />

      {/* Stream in when ready */}
      <Suspense fallback={<Skeleton />}>
        <AsyncData />
      </Suspense>
    </div>
  );
}

async function AsyncData() {
  const data = await slowQuery();
  return <div>{data}</div>;
}
```

**Deep dive:** https://nextjs.org/docs/app/building-your-application/data-fetching

---

## Server Actions

Server Actions = async functions that run on server, callable from client.

### Basic Usage

```typescript
// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await db.insert({ title, content });
  revalidatePath("/blog");

  return { success: true };
}
```

### Form Integration

```typescript
// app/blog/new/page.tsx
import { createPost } from '@/app/actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create</button>
    </form>
  );
}
```

### Progressive Enhancement

Forms work without JavaScript! Submit triggers HTTP POST.

### Client-Side Usage

```typescript
'use client';

import { createPost } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function Form() {
  const [state, formAction] = useFormState(createPost, null);

  return (
    <form action={formAction}>
      <input name="title" />
      <SubmitButton />
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Creating...' : 'Create'}
    </button>
  );
}
```

### Optimistic Updates

```typescript
'use client';

import { useOptimistic } from 'react';
import { createTodo } from './actions';

export default function Todos({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleSubmit(formData: FormData) {
    const text = formData.get('text');
    addOptimisticTodo({ id: Date.now(), text, completed: false });
    await createTodo(formData);
  }

  return (
    <form action={handleSubmit}>
      <input name="text" />
      <button>Add</button>
      {optimisticTodos.map(todo => <Todo key={todo.id} {...todo} />)}
    </form>
  );
}
```

### Validation & Error Handling

```typescript
"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signup(formData: FormData) {
  const result = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: result.error.flatten() };
  }

  try {
    await createUser(result.data);
    return { success: true };
  } catch (error) {
    return { error: "Failed to create user" };
  }
}
```

### When to Use Server Actions vs API Routes

**Server Actions:**

- Form submissions
- Mutations from UI
- Internal app logic
- Automatic CSRF protection

**API Routes:**

- External API access
- Webhooks
- Complex HTTP handling
- Third-party integrations

**Deep dive:** https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

---

## API Routes

### Basic Route Handler

```typescript
// app/api/users/route.ts
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const users = await db.query("SELECT * FROM users");
  return Response.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await db.insert(body);
  return Response.json(user, { status: 201 });
}
```

### Dynamic Routes

```typescript
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await db.findById(id);

  if (!user) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(user);
}
```

### Headers & Cookies

```typescript
import { cookies, headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const cookieStore = await cookies();

  const auth = headersList.get("authorization");
  const session = cookieStore.get("session")?.value;

  return Response.json({ auth, session });
}
```

### Middleware

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
};
```

**Deep dive:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## Layouts & Pages

### Root Layout (Required)

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Nested Layouts

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

// Wraps: app/dashboard/page.tsx, app/dashboard/settings/page.tsx, etc.
```

### Loading UI

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return <Skeleton />;
}

// Automatic Suspense boundary for page.tsx
```

### Error Boundaries

```typescript
// app/dashboard/error.tsx
'use client'; // Must be Client Component

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Template vs Layout

```typescript
// layout.tsx - Persists state across navigation
// template.tsx - Remounts on navigation

// app/template.tsx
export default function Template({ children }) {
  return <div>{children}</div>;
}
```

**Deep dive:** https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates

---

## Metadata & SEO

### Static Metadata

```typescript
// app/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "Best app ever",
  openGraph: {
    title: "My App",
    description: "Best app ever",
    images: ["/og-image.png"],
  },
};
```

### Dynamic Metadata

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  };
}
```

### JSON-LD

```typescript
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'My Article',
    datePublished: '2025-01-01',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>...</article>
    </>
  );
}
```

**Deep dive:** https://nextjs.org/docs/app/building-your-application/optimizing/metadata

---

## Configuration

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true,
      },
    ];
  },

  // Environment variables
  env: {
    CUSTOM_KEY: "value",
  },

  // Experimental features
  experimental: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

module.exports = nextConfig;
```

### Environment Variables

```bash
# .env.local
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=https://api.example.com
```

```typescript
// Server-side only
const dbUrl = process.env.DATABASE_URL;

// Client-side (NEXT_PUBLIC_ prefix)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

**Deep dive:** https://nextjs.org/docs/app/api-reference/next-config-js

---

## Performance

### Image Optimization

```typescript
import Image from 'next/image';

export default function Avatar() {
  return (
    <Image
      src="/avatar.jpg"
      alt="Avatar"
      width={100}
      height={100}
      priority // Load immediately (above fold)
    />
  );
}
```

### Font Optimization

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Code Splitting

```typescript
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <Loading />,
  ssr: false, // Client-side only
});
```

### Partial Prerendering (PPR)

```typescript
// next.config.js
experimental: {
  ppr: true,
}

// Static shell + dynamic content
// Best of both: SEO + personalization
```

**Deep dive:** https://nextjs.org/docs/app/building-your-application/optimizing

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Self-Hosting

```bash
# Build
bun run build

# Start (requires Node.js server)
bun run start

# Or standalone
next build
next start
```

### Docker

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package*.json ./
RUN npm ci --production

EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

```javascript
// next.config.js
const nextConfig = {
  output: "export",
};

// Limitations: No Server Actions, no dynamic routes
```

**Deep dive:** https://nextjs.org/docs/app/building-your-application/deploying

---

## Best Practices for Your Stack

### With Bun Runtime

```json
{
  "scripts": {
    "dev": "bun --bun next dev",
    "build": "bun --bun next build",
    "start": "bun --bun next start"
  }
}
```

### With Convex

```typescript
// lib/convex.ts
import { ConvexHttpClient } from "convex/browser";

export const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// In Server Components
const users = await convex.query(api.users.list);

// With Server Actions
("use server");
import { convex } from "@/lib/convex";
export async function createUser(data: any) {
  return await convex.mutation(api.users.create, data);
}
```

### Project Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── signup/page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx
│   └── settings/page.tsx
├── api/
│   └── webhook/route.ts
├── actions.ts         # Server Actions
├── layout.tsx
└── page.tsx

components/
├── ui/               # shadcn/ui components
└── ...

lib/
├── db.ts
├── utils.ts
└── convex.ts
```

---

## Key Differences: Next.js 15 vs 14

1. **React 19** - Stable Server Components, Actions API
2. **Turbopack** - Faster builds (beta)
3. **Typed Routes** - Compile-time route safety
4. **Node.js Middleware** - Stable (was Edge-only)
5. **Better Caching** - `use cache` directive

---

## Common Gotchas

1. **Async params** - All params are now `Promise<T>` in Next.js 15
2. **Server Actions** - Must return JSON-serializable data
3. **Client Components** - Can't import Server Components
4. **Cookies/Headers** - Must `await` in Server Components
5. **generateStaticParams** - Required for static dynamic routes

---

## Quick Links

- **Docs:** https://nextjs.org/docs
- **API Reference:** https://nextjs.org/docs/app/api-reference
- **Examples:** https://github.com/vercel/next.js/tree/canary/examples
- **Blog:** https://nextjs.org/blog
- **Learn:** https://nextjs.org/learn

---

**For Claude Code:** This guide covers 95% of daily Next.js tasks. For advanced topics (PPR, middleware, instrumentation), consult official docs.