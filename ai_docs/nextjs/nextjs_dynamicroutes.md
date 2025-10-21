# Next.js Dynamic Routes Reference

## Dynamic Segments

**Convention:** Wrap folder name in square brackets `[folderName]`

```
app/blog/[slug]/page.tsx
```

| Route                     | Example URL | params          |
| ------------------------- | ----------- | --------------- |
| `app/blog/[slug]/page.js` | `/blog/a`   | `{ slug: 'a' }` |
| `app/blog/[slug]/page.js` | `/blog/b`   | `{ slug: 'b' }` |

## Accessing Params

### Server Components (App Router)

**Next.js 15+ (params is Promise):**

```typescript
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>Post: {slug}</div>
}
```

**Next.js 14 (synchronous):**

```typescript
export default function Page({
  params,
}: {
  params: { slug: string }
}) {
  return <div>Post: {params.slug}</div>
}
```

### Client Components

**Method 1: use() hook**

```typescript
'use client'
import { use } from 'react'

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  return <div>{slug}</div>
}
```

**Method 2: useParams() hook**

```typescript
'use client'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams<{ slug: string }>()
  return <div>{params.slug}</div>
}
```

## Catch-all Segments

**Convention:** `[...folderName]`

```
app/shop/[...slug]/page.tsx
```

Matches all subsequent segments.

| Route                        | Example URL   | params                      |
| ---------------------------- | ------------- | --------------------------- |
| `app/shop/[...slug]/page.js` | `/shop/a`     | `{ slug: ['a'] }`           |
| `app/shop/[...slug]/page.js` | `/shop/a/b`   | `{ slug: ['a', 'b'] }`      |
| `app/shop/[...slug]/page.js` | `/shop/a/b/c` | `{ slug: ['a', 'b', 'c'] }` |

**Note:** Does NOT match `/shop`

## Optional Catch-all Segments

**Convention:** `[[...folderName]]`

```
app/shop/[[...slug]]/page.tsx
```

Matches route with or without parameters.

| Route                          | Example URL | params                 |
| ------------------------------ | ----------- | ---------------------- |
| `app/shop/[[...slug]]/page.js` | `/shop`     | `{ slug: undefined }`  |
| `app/shop/[[...slug]]/page.js` | `/shop/a`   | `{ slug: ['a'] }`      |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b` | `{ slug: ['a', 'b'] }` |

**Difference:** Optional catch-all matches the base route (`/shop`)

## Multiple Dynamic Segments

```
app/[categoryId]/[itemId]/page.tsx
```

```typescript
export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string; itemId: string }>
}) {
  const { categoryId, itemId } = await params
  return <div>{categoryId} - {itemId}</div>
}
```

## TypeScript Type Helpers

**Page:**

```typescript
import { PageProps } from "next";

export default async function Page(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  // slug is typed as string
}
```

**Layout:**

```typescript
import { LayoutProps } from "next";

export default function Layout(props: LayoutProps<"/blog/[slug]">) {
  // Automatic typing
}
```

**Route Handler:**

```typescript
import { RouteContext } from "next";

export async function GET(
  request: Request,
  context: RouteContext<"/api/posts/[id]">
) {
  const { id } = await context.params;
}
```

## Type Definitions

| Route                               | params Type                              |
| ----------------------------------- | ---------------------------------------- |
| `app/blog/[slug]/page.js`           | `{ slug: string }`                       |
| `app/shop/[...slug]/page.js`        | `{ slug: string[] }`                     |
| `app/shop/[[...slug]]/page.js`      | `{ slug?: string[] }`                    |
| `app/[categoryId]/[itemId]/page.js` | `{ categoryId: string, itemId: string }` |

## generateStaticParams

Statically generate routes at build time.

**Basic Usage:**

```typescript
export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Render page
}
```

**Multiple Dynamic Segments:**

```typescript
// app/products/[category]/[product]/page.tsx
export async function generateStaticParams() {
  const products = await fetch("https://.../products").then((res) =>
    res.json()
  );

  return products.map((product) => ({
    category: product.category,
    product: product.id,
  }));
}
```

**Nested generateStaticParams:**

```typescript
// app/products/[category]/layout.tsx
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

// app/products/[category]/[product]/page.tsx
export async function generateStaticParams({
  params: { category },
}: {
  params: { category: string };
}) {
  const products = await getProducts(category);
  return products.map((product) => ({ product: product.id }));
}
```

**Properties:**

- Runs at build time during `next build`
- Runs when navigating to route in `next dev`
- Requests automatically deduplicated
- Does not run again during revalidation (ISR)

## Dynamic Params Config

```typescript
export const dynamicParams = true; // default
// or
export const dynamicParams = false;
```

**`dynamicParams = true` (default):**

- Unspecified paths rendered on-demand
- Paths not from generateStaticParams served dynamically

**`dynamicParams = false`:**

- Only paths from generateStaticParams served
- Other paths return 404

```typescript
// app/blog/[slug]/page.tsx
export const dynamicParams = false; // Only allow generateStaticParams paths

export async function generateStaticParams() {
  return [{ slug: "post-1" }, { slug: "post-2" }];
}
```

## Runtime Validation

Narrow types with validation:

```typescript
import { notFound } from "next/navigation";

type Locale = "en" | "fr" | "de";

function isValidLocale(value: string): value is Locale {
  return ["en", "fr", "de"].includes(value);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  // locale is now typed as Locale ('en' | 'fr' | 'de')
}
```

## Params in Different Functions

**Passed to:**

- `page` component
- `layout` component
- `route` handlers (GET, POST, etc.)
- `generateMetadata` function

**Layout Example:**

```typescript
export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}) {
  const { slug } = await params
  return <div>{children}</div>
}
```

**generateMetadata Example:**

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
  };
}
```

**Route Handler Example:**

```typescript
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = await getData(slug);

  return Response.json(data);
}
```

## Version Differences

**Next.js 15:**

- `params` is a Promise
- Must use `await` or `use()`

**Next.js 14:**

- `params` is synchronous
- Direct access: `params.slug`

**Backwards Compatibility:**

- Can still access synchronously in Next.js 15
- Will be deprecated in future

## Examples

### Blog with Static Generation

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}
```

### Docs with Catch-all

```typescript
// app/docs/[[...slug]]/page.tsx
export default async function Docs({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const path = slug ? slug.join('/') : 'index'
  const content = await getDocsContent(path)

  return <div>{content}</div>
}
```

### E-commerce with Multiple Segments

```typescript
// app/products/[category]/[product]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts()

  return products.map((product) => ({
    category: product.category,
    product: product.id,
  }))
}

export default async function Product({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product } = await params
  const data = await getProduct(category, product)

  return <ProductPage product={data} />
}
```

## Best Practices

- Use `generateStaticParams` for known routes
- Set `dynamicParams = false` for strict route matching
- Validate params for type narrowing
- Use TypeScript helpers for automatic typing
- Await params in Next.js 15+
- Use `notFound()` for invalid params

---

**Source:** https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes
