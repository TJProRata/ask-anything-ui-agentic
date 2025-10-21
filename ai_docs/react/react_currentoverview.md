# React 19.1.0 Reference

**Version:** 19.1.0 (March 2025)  
**Next.js Compatibility:** 15.4.5+  
**Official Docs:** https://react.dev

---

## Major Changes in React 19

### 1. React Compiler (Automatic Optimization)

Built-in compiler that auto-optimizes components. **No more manual memoization.**

```tsx
// ❌ Before: Manual optimization
const MemoizedChild = memo(Child);
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);

// ✅ After: Compiler handles it
function Parent() {
  const value = computeExpensive(a, b); // Auto-memoized
  return <Child onUpdate={handleUpdate} />; // Auto-optimized
}
```

**Impact:** Cleaner code, automatic performance optimization.

---

### 2. Actions & Form Handling

#### Actions API

Async functions that automatically manage pending states, errors, and optimistic updates.

```tsx
// New <form> action prop
function UpdateProfile() {
  async function updateAction(formData: FormData) {
    const name = formData.get("name");
    await updateUserProfile(name);
  }

  return (
    <form action={updateAction}>
      <input name="name" />
      <button type="submit">Update</button>
    </form>
  );
}
```

#### useActionState Hook

Manages form lifecycle with built-in error handling and pending states.

```tsx
import { useActionState } from "react";

function ProfileForm() {
  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get("name");
      try {
        await updateProfile(name);
        return { success: true, error: null };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },
    { success: false, error: null }
  );

  return (
    <form action={submitAction}>
      <input name="name" />
      <button disabled={isPending}>{isPending ? "Saving..." : "Save"}</button>
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

**Docs:** https://react.dev/reference/react/useActionState

---

### 3. useFormStatus Hook

Access parent form status from child components (no prop drilling).

```tsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending, data } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

function Form() {
  return (
    <form action={submitAction}>
      <input name="email" />
      <SubmitButton /> {/* Automatically knows form status */}
    </form>
  );
}
```

**Docs:** https://react.dev/reference/react-dom/hooks/useFormStatus

---

### 4. useOptimistic Hook

Update UI immediately while async operations complete.

```tsx
import { useOptimistic } from "react";

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, sending: true }]
  );

  async function handleSubmit(formData) {
    const newTodo = { id: Date.now(), text: formData.get("text") };
    addOptimisticTodo(newTodo); // Update UI immediately
    await saveTodo(newTodo); // Then save to server
  }

  return (
    <form action={handleSubmit}>
      {optimisticTodos.map((todo) => (
        <div key={todo.id} className={todo.sending ? "opacity-50" : ""}>
          {todo.text}
        </div>
      ))}
      <input name="text" />
      <button>Add</button>
    </form>
  );
}
```

**Docs:** https://react.dev/reference/react/useOptimistic

---

### 5. use() Hook

Read Promises and Context inside render (even in conditionals).

```tsx
import { use } from "react";

// With Promises
function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspends until resolved
  return <div>{user.name}</div>;
}

// With Context (like useContext but works in conditions)
function Button() {
  const theme = use(ThemeContext);
  return <button className={theme} />;
}

// Works in conditionals (unlike other hooks!)
function Component({ showUser }) {
  if (showUser) {
    const user = use(userPromise); // ✅ Valid!
    return <div>{user.name}</div>;
  }
  return null;
}
```

**Docs:** https://react.dev/reference/react/use

---

### 6. ref as Prop

No more `forwardRef` for function components.

```tsx
// ❌ Before
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// ✅ After: ref is just a prop
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// Usage stays the same
function Form() {
  const inputRef = useRef();
  return <Input ref={inputRef} />;
}
```

---

### 7. Document Metadata (Native)

Render `<title>`, `<meta>`, `<link>` anywhere in components.

```tsx
function BlogPost({ post }) {
  return (
    <article>
      <title>{post.title} - My Blog</title>
      <meta property="og:title" content={post.title} />
      <meta property="og:image" content={post.image} />
      <link rel="canonical" href={post.url} />

      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

React automatically hoists these to `<head>`. Works with SSR and Server Components.

---

### 8. Server Components & Server Actions

#### Server Components (stable)

Components that render on the server, reducing client JS bundle.

```tsx
// app/page.tsx (Server Component by default in Next.js)
async function HomePage() {
  const posts = await db.query("SELECT * FROM posts");

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

#### Server Actions

Functions that run on the server, callable from client.

```tsx
// app/actions.ts
"use server";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  await db.posts.create({ title, content });
  revalidatePath("/posts");
}

// app/components/PostForm.tsx (Client Component)
("use client");
import { createPost } from "../actions";

export function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button>Publish</button>
    </form>
  );
}
```

**Directives:**

- `'use server'` - Marks server-only functions
- `'use client'` - Marks client-side components (when using hooks/interactivity)

---

### 9. Concurrent Rendering (Default)

React 19 enables concurrent rendering by default - no config needed.

**Benefits:**

- Non-blocking updates
- Automatic batching of state updates
- Better responsiveness during heavy operations
- Smoother animations and transitions

```tsx
// Automatically uses concurrent features
function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // This won't block the input field
  useEffect(() => {
    async function search() {
      const data = await searchAPI(query);
      setResults(data); // Batched automatically
    }
    search();
  }, [query]);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ResultsList results={results} />
    </>
  );
}
```

---

### 10. Enhanced Suspense

Better handling of async operations, SSR, and hydration.

```tsx
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UserProfile /> {/* Can use async data */}
    </Suspense>
  );
}

async function UserProfile() {
  const user = await fetchUser(); // Suspends automatically
  return <div>{user.name}</div>;
}
```

---

## React 19.1.0 Specific Improvements (March 2025)

### Owner Stack (Debugging)

New dev-only feature for better error tracing.

```tsx
// Development only - shows which component rendered another
captureOwnerStack(); // Returns owner stack for debugging
```

Shows direct component relationships, not full hierarchy.

### Enhanced Suspense Improvements

- Better client/server/hydration handling
- More reliable loading state management
- Improved streaming SSR

### Server Component Enhancements

- `unstable_prerender` API for server-side prerendering
- Fixed streaming issues after global errors
- Better chunk counting for performance

---

## Core Hooks Reference

### State Hooks

```tsx
const [state, setState] = useState(initialValue);
const [state, dispatch] = useReducer(reducer, initialState);
```

### Effect Hooks

```tsx
useEffect(() => {
  /* effect */
}, [deps]);
useLayoutEffect(() => {
  /* layout effect */
}, [deps]);
useInsertionEffect(() => {
  /* css-in-js */
}, [deps]);
```

### Ref Hooks

```tsx
const ref = useRef(initialValue);
useImperativeHandle(ref, () => ({ method }), [deps]);
```

### Context

```tsx
const value = useContext(Context);
const value = use(Context); // New in 19 - works in conditionals
```

### Performance (Mostly Auto-Handled by Compiler)

```tsx
const memoized = useMemo(() => compute(a, b), [a, b]);
const callback = useCallback(() => fn(a, b), [a, b]);
const MemoComponent = memo(Component);
```

### Transitions

```tsx
const [isPending, startTransition] = useTransition();
const deferredValue = useDeferredValue(value);
```

### ID Generation

```tsx
const id = useId(); // Stable ID for SSR
```

### Sync External Store

```tsx
const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
```

---

## Common Patterns for Your Stack

### Form with Validation

```tsx
"use client";
import { useActionState } from "react";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    async (prev, formData) => {
      const data = {
        email: formData.get("email"),
        name: formData.get("name"),
      };

      const result = schema.safeParse(data);
      if (!result.success) {
        return { errors: result.error.flatten() };
      }

      await createUser(result.data);
      return { success: true };
    },
    {}
  );

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.errors?.email && <span>{state.errors.email}</span>}

      <input name="name" />
      {state.errors?.name && <span>{state.errors.name}</span>}

      <button disabled={isPending}>
        {isPending ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
```

### Optimistic Updates with Convex

```tsx
"use client";
import { useOptimistic } from "react";
import { useMutation } from "convex/react";

export function TodoList({ todos }) {
  const addTodo = useMutation(api.todos.add);
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAdd(formData) {
    const text = formData.get("text");
    const tempTodo = { _id: `temp-${Date.now()}`, text, done: false };

    addOptimistic(tempTodo);
    await addTodo({ text });
  }

  return (
    <form action={handleAdd}>
      {optimisticTodos.map((todo) => (
        <div key={todo._id}>{todo.text}</div>
      ))}
      <input name="text" />
      <button>Add</button>
    </form>
  );
}
```

### Server Component with Data Fetching

```tsx
// app/posts/page.tsx (Server Component)
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";

export default async function PostsPage() {
  const posts = await preloadQuery(api.posts.list);

  return (
    <>
      <title>Posts - My App</title>
      <meta name="description" content="Latest posts" />

      <h1>Posts</h1>
      {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </>
  );
}
```

---

## TypeScript Support

### Type Inference with Hooks

```tsx
// State type inferred
const [count, setCount] = useState(0); // number
const [user, setUser] = useState<User | null>(null); // explicit

// Form actions
type FormState = { error?: string; success?: boolean };
const [state, formAction] = useActionState<FormState>(
  async (prev, formData) => {
    /* ... */
  },
  {}
);

// Refs
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
```

### Component Props

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// With ref
interface InputProps {
  ref?: React.RefObject<HTMLInputElement>;
  placeholder?: string;
}

export function Input({ ref, placeholder }: InputProps) {
  return <input ref={ref} placeholder={placeholder} />;
}
```

---

## Migration Guide (React 18 → 19)

### Breaking Changes

1. **forwardRef deprecated** - Use `ref` as prop
2. **Legacy Context deprecated** - Use `createContext`
3. **String refs removed** - Use `useRef`

### Codemod Available

```bash
npx codemod@latest react/19/replace-forward-ref
npx codemod@latest react/19/replace-string-refs
```

### Installation

```bash
bun add react@19.1.0 react-dom@19.1.0
# or
npm install react@19.1.0 react-dom@19.1.0
```

---

## Performance Optimizations

### Automatic (Compiler)

- Component memoization
- Dependency array optimization
- Callback stability
- Props comparison

### Manual (When Needed)

```tsx
// Heavy computation
const result = useMemo(() => {
  return expensiveOperation(data);
}, [data]);

// List virtualization
import { useVirtualizer } from "@tanstack/react-virtual";

// Code splitting
const HeavyComponent = lazy(() => import("./HeavyComponent"));
```

---

## Debugging Tools

### React DevTools

- Component tree inspection
- Profiler for performance
- Hook state inspection
- Owner Stack visualization (19.1+)

### Chrome DevTools (19.2+)

- Custom React Performance Tracks
- Scheduler track showing priorities
- Render timing visualization

---

## Best Practices for Your Stack

### 1. Server Components by Default

```tsx
// app/page.tsx - Server Component (default)
async function Page() {
  const data = await fetchData();  // Direct DB/API calls
  return <ClientComponent data={data} />;
}

// Only use 'use client' when needed
'use client';
function ClientComponent({ data }) {
  const [state, setState] = useState(data);  // Has state/effects
  return <div onClick={() => setState(...)}>...</div>;
}
```

### 2. Use Actions for Forms

```tsx
// Prefer this:
<form action={serverAction}>

// Over this:
<form onSubmit={handleSubmit}>
```

### 3. Leverage Compiler

Don't wrap everything in `useMemo`/`useCallback` - let compiler optimize.

### 4. Use Suspense Boundaries

```tsx
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

---

## Resources & Deep Dives

### Official Documentation

- **React 19 Release:** https://react.dev/blog/2024/12/05/react-19
- **React 19.1 Release:** https://react.dev/blog/2025/03/31/react-19-1
- **Hooks Reference:** https://react.dev/reference/react/hooks
- **Server Components:** https://react.dev/reference/rsc/server-components
- **Actions:** https://react.dev/reference/rsc/server-actions

### Upgrade Guides

- **React 19 Upgrade Guide:** https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- **Next.js 15 + React 19:** https://nextjs.org/docs/app/building-your-application/upgrading

### Community Resources

- **React 19 Cheatsheet:** https://react-19-cheatsheet.com
- **React Compiler Playground:** https://playground.react.dev
- **React Server Components:** https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md

---

## Version History

- **19.2.0** (Oct 2025): Activity component, Partial Pre-rendering, Performance tracks
- **19.1.0** (Mar 2025): Owner Stack, Suspense improvements, Server Component enhancements
- **19.0.0** (Dec 2024): Compiler, Actions, ref as prop, document metadata, stable Server Components

---

**For Your Project:**

- Use Server Components for data fetching
- Use Actions for form handling
- Use `useOptimistic` for instant UI updates
- Let compiler handle optimization (avoid manual memo)
- Leverage Suspense for loading states
