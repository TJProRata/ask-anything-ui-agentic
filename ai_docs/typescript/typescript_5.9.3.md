# TypeScript 5.9.2 Reference

**Mode:** Strict  
**Stack:** Next.js 15 + React 19 + Bun + Convex

## Strict Mode (Enabled)

Strict mode enables all strict type-checking options:

- `noImplicitAny` - Error on expressions with implied `any`
- `strictNullChecks` - `null` and `undefined` are distinct types
- `strictFunctionTypes` - Stricter function parameter checking
- `strictBindCallApply` - Check `bind`, `call`, `apply` args
- `strictPropertyInitialization` - Class properties must be initialized
- `noImplicitThis` - Error when `this` has implied `any`
- `alwaysStrict` - Emit "use strict" in output
- `useUnknownInCatchVariables` - Catch variables are `unknown` not `any`

## Basic Types

### Primitives

```typescript
const str: string = "hello";
const num: number = 42;
const bool: boolean = true;
const n: null = null;
const u: undefined = undefined;
const sym: symbol = Symbol("key");
const big: bigint = 100n;
```

### Arrays & Tuples

```typescript
// Arrays
const nums: number[] = [1, 2, 3];
const strs: Array<string> = ["a", "b"];

// Tuples
const tuple: [string, number] = ["age", 25];
const tuple2: [string, number, boolean?] = ["name", 30]; // Optional element

// Readonly
const readonlyArr: readonly number[] = [1, 2, 3];
// readonlyArr.push(4); // Error
```

### Objects

```typescript
// Object type
const obj: { name: string; age: number } = {
  name: "John",
  age: 30,
};

// Optional properties
const obj2: { name: string; age?: number } = {
  name: "Jane",
};

// Index signatures
const dict: { [key: string]: number } = {
  a: 1,
  b: 2,
};

// Readonly properties
const obj3: { readonly id: string; name: string } = {
  id: "123",
  name: "John",
};
// obj3.id = "456"; // Error
```

### Functions

```typescript
// Function type
const add: (a: number, b: number) => number = (a, b) => a + b;

// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}`;
}

// Default parameters
function greet2(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// Overloads
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number {
  return typeof x === "string" ? x.toUpperCase() : x * 2;
}
```

## Type Aliases & Interfaces

### Type Aliases

```typescript
type User = {
  id: string;
  name: string;
  email: string;
  age?: number;
};

type ID = string | number;

type Response<T> = {
  data: T;
  error?: string;
  status: number;
};
```

### Interfaces

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

// Extension
interface Admin extends User {
  role: "admin";
  permissions: string[];
}

// Multiple inheritance
interface SuperAdmin extends Admin, Auditable {
  superPowers: string[];
}
```

### Type vs Interface

```typescript
// ✅ Use type for unions, intersections, primitives, tuples
type Status = "active" | "inactive";
type Point = [number, number];
type Combined = User & Settings;

// ✅ Use interface for objects that might be extended
interface User {
  id: string;
  name: string;
}

// Both work for objects, but interfaces can be merged
interface User {
  email: string; // Merges with above
}
```

## Union & Intersection Types

### Union Types

```typescript
type Status = "pending" | "approved" | "rejected";
type ID = string | number;
type Response = SuccessResponse | ErrorResponse;

function process(id: string | number): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

### Intersection Types

```typescript
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: string;
  name: string;
};

type TimestampedUser = User & Timestamped;

const user: TimestampedUser = {
  id: "1",
  name: "John",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

## Generics

### Basic Generics

```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

const num = identity(42); // T = number
const str = identity("hello"); // T = string

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name"); // string
const age = getProperty(user, "age"); // number
```

### Generic Types

```typescript
type Box<T> = { value: T };
type Result<T, E = Error> = { ok: true; data: T } | { ok: false; error: E };

const numBox: Box<number> = { value: 42 };
const result: Result<User> = { ok: true, data: user };
```

### Generic Classes

```typescript
class Container<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  map<U>(fn: (value: T) => U): Container<U> {
    return new Container(fn(this.value));
  }
}

const num = new Container(42);
const str = num.map((n) => n.toString());
```

## Utility Types

### Built-in Utilities

```typescript
// Partial - all properties optional
type User = { id: string; name: string; email: string };
type PartialUser = Partial<User>; // All optional

// Required - all properties required
type RequiredUser = Required<PartialUser>;

// Readonly - all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick - select subset of properties
type UserPreview = Pick<User, "id" | "name">;

// Omit - exclude properties
type UserWithoutEmail = Omit<User, "email">;

// Record - object type with specific keys
type Roles = "admin" | "user" | "guest";
type Permissions = Record<Roles, string[]>;

// ReturnType - extract return type
function getUser() {
  return { id: "1", name: "John" };
}
type User = ReturnType<typeof getUser>;

// Parameters - extract parameter types
function createUser(name: string, age: number) {}
type CreateUserParams = Parameters<typeof createUser>; // [string, number]

// Awaited - unwrap Promise
type User = Awaited<Promise<{ id: string }>>; // { id: string }

// NonNullable - exclude null/undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

// Extract - extract types from union
type T = Extract<"a" | "b" | "c", "a" | "f">; // "a"

// Exclude - exclude types from union
type T = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
```

### Custom Utility Types

```typescript
// Deep Partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Nullable
type Nullable<T> = T | null;

// Maybe
type Maybe<T> = T | null | undefined;

// ValueOf - get union of all values
type ValueOf<T> = T[keyof T];

// Mutable - remove readonly
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// RequireAtLeastOne
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
```

## Type Guards & Narrowing

### Type Guards

```typescript
// typeof guard
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // string
  }
  return value.toFixed(2); // number
}

// instanceof guard
class Dog {
  bark() {}
}
class Cat {
  meow() {}
}

function makeNoise(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// in operator
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}

// Custom type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    return value.toUpperCase(); // string
  }
}

// Array type guard
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}
```

### Discriminated Unions

```typescript
type Success = { status: "success"; data: string };
type Error = { status: "error"; error: string };
type Loading = { status: "loading" };

type Result = Success | Error | Loading;

function handle(result: Result) {
  switch (result.status) {
    case "success":
      console.log(result.data); // data available
      break;
    case "error":
      console.log(result.error); // error available
      break;
    case "loading":
      console.log("Loading..."); // no extra properties
      break;
  }
}
```

## React TypeScript Patterns

### Component Props

```typescript
// Functional component
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Or without React.FC (preferred)
function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

### Event Handlers

```typescript
function Form() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Clicked");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
```

### Hooks

```typescript
// useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// useRef
const inputRef = useRef<HTMLInputElement>(null);
const valueRef = useRef<number>(0);

// useEffect with cleanup
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer);
}, []);

// Custom hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setStoredValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(value) : value;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [value, setStoredValue] as const;
}
```

### Children Patterns

```typescript
// ReactNode - anything renderable
interface Props {
  children: React.ReactNode;
}

// Function as children
interface Props {
  children: (data: User) => React.ReactNode;
}

function DataProvider({ children }: Props) {
  const user = { id: "1", name: "John" };
  return <>{children(user)}</>;
}

// Render prop
interface Props {
  render: (data: User) => React.ReactNode;
}
```

## Next.js TypeScript Patterns

### Page Props (App Router)

```typescript
// app/users/[id]/page.tsx
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function UserPage({ params, searchParams }: PageProps) {
  const user = await fetchUser(params.id);
  return <div>{user.name}</div>;
}
```

### API Routes (App Router)

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const users = await fetchUsers(query);
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body: CreateUserRequest = await request.json();
  const user = await createUser(body);
  return NextResponse.json(user, { status: 201 });
}
```

### Dynamic API Routes

```typescript
// app/api/users/[id]/route.ts
interface RouteContext {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const user = await fetchUser(params.id);
  return NextResponse.json(user);
}
```

### Server Actions

```typescript
"use server";

import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await db.insert({ name, email });
  revalidatePath("/users");
}

// With return type
export async function updateUser(
  id: string,
  data: Partial<User>
): Promise<User> {
  const user = await db.update(id, data);
  return user;
}
```

### Metadata

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page",
  description: "Page description",
};

// Dynamic metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const user = await fetchUser(params.id);
  return {
    title: user.name,
    description: `Profile of ${user.name}`,
  };
}
```

## API Response Patterns

### Type-Safe API Responses

```typescript
// Response types
interface ApiResponse<T> {
  data: T;
  error?: never;
}

interface ApiError {
  data?: never;
  error: {
    message: string;
    code: string;
  };
}

type ApiResult<T> = ApiResponse<T> | ApiError;

// Usage
async function fetchUser(id: string): Promise<ApiResult<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : "Unknown error",
        code: "FETCH_ERROR",
      },
    };
  }
}

// Consuming
const result = await fetchUser("123");
if (result.error) {
  console.error(result.error.message);
} else {
  console.log(result.data.name);
}
```

### Zod Integration

```typescript
import { z } from "zod";

// Schema definition
const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});

// Infer type from schema
type User = z.infer<typeof userSchema>;

// Validation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = userSchema.parse(body);

    const user = await createUser(validated);
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    throw error;
  }
}
```

## Database Patterns (Convex)

### Convex Schema Types

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    age: v.optional(v.number()),
    role: v.union(v.literal("admin"), v.literal("user")),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    published: v.boolean(),
  }).index("by_author", ["authorId"]),
});
```

### Convex Queries

```typescript
// convex/users.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query(async ({ db }) => {
  return await db.query("users").collect();
});

export const get = query({
  args: { id: v.id("users") },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    age: v.optional(v.number()),
  },
  handler: async ({ db }, args) => {
    const userId = await db.insert("users", {
      ...args,
      role: "user",
      createdAt: Date.now(),
    });
    return userId;
  },
});
```

### Client-Side Usage

```typescript
'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

function UserList() {
  const users = useQuery(api.users.list);
  const createUser = useMutation(api.users.create);

  const handleCreate = async () => {
    await createUser({
      name: "John",
      email: "john@example.com"
    });
  };

  if (!users) return <div>Loading...</div>;

  return (
    <div>
      {users.map(user => <div key={user._id}>{user.name}</div>)}
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}
```

## Advanced Patterns

### Conditional Types

```typescript
// Basic conditional
type IsString<T> = T extends string ? true : false;
type A = IsString<string>; // true
type B = IsString<number>; // false

// Exclude null/undefined
type NoNullable<T> = T extends null | undefined ? never : T;

// Extract promise type
type Unwrap<T> = T extends Promise<infer U> ? U : T;
type Result = Unwrap<Promise<string>>; // string

// Function return type
type Return<T> = T extends (...args: any[]) => infer R ? R : never;
```

### Mapped Types

```typescript
// Make all properties optional
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Transform property types
type Stringify<T> = {
  [K in keyof T]: string;
};

// Conditional property types
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

### Template Literal Types

```typescript
// String manipulation
type Uppercase<S extends string> = Uppercase<S>;
type Lowercase<S extends string> = Lowercase<S>;
type Capitalize<S extends string> = Capitalize<S>;
type Uncapitalize<S extends string> = Uncapitalize<S>;

// Template literals
type EventName = "click" | "focus" | "blur";
type Handler = `on${Capitalize<EventName>}`; // "onClick" | "onFocus" | "onBlur"

// Route types
type Route = "/users" | "/posts" | "/settings";
type ApiRoute = `/api${Route}`; // "/api/users" | "/api/posts" | "/api/settings"
```

## Common Errors & Solutions

### Error: Type 'X' is not assignable to type 'Y'

```typescript
// ❌ Problem
const str: string = 42;

// ✅ Solution: Use correct type
const num: number = 42;

// Or use union
const value: string | number = 42;
```

### Error: Object is possibly 'null' or 'undefined'

```typescript
// ❌ Problem
const user: User | null = getUser();
console.log(user.name); // Error

// ✅ Solution 1: Optional chaining
console.log(user?.name);

// ✅ Solution 2: Type guard
if (user) {
  console.log(user.name);
}

// ✅ Solution 3: Non-null assertion (use carefully)
console.log(user!.name);
```

### Error: Argument of type 'X' is not assignable to parameter of type 'never'

```typescript
// ❌ Problem: Array not typed
const arr = [];
arr.push("hello"); // Error

// ✅ Solution: Type the array
const arr: string[] = [];
arr.push("hello");
```

### Error: Property 'X' does not exist on type 'Y'

```typescript
// ❌ Problem
const obj = {};
obj.name = "John"; // Error

// ✅ Solution 1: Type it
const obj: { name: string } = { name: "John" };

// ✅ Solution 2: Index signature
const obj: { [key: string]: string } = {};
obj.name = "John";
```

## Best Practices

### 1. Prefer Type Inference

```typescript
// ❌ Unnecessary explicit types
const name: string = "John";
const age: number = 30;

// ✅ Let TypeScript infer
const name = "John";
const age = 30;
```

### 2. Use `unknown` Over `any`

```typescript
// ❌ any bypasses type checking
function process(value: any) {
  return value.toUpperCase(); // No error even if value is number
}

// ✅ unknown requires type checking
function process(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  throw new Error("Invalid type");
}
```

### 3. Avoid Type Assertions Unless Necessary

```typescript
// ❌ Type assertion can hide errors
const user = getUser() as User;

// ✅ Type guard
const user = getUser();
if (isUser(user)) {
  // user is User
}
```

### 4. Use Const Assertions

```typescript
// ❌ Widened type
const status = "pending"; // string

// ✅ Literal type
const status = "pending" as const; // "pending"

// For objects
const config = {
  apiUrl: "https://api.com",
  timeout: 5000,
} as const;
// config is readonly { apiUrl: "https://api.com", timeout: 5000 }
```

### 5. Discriminated Unions for State

```typescript
// ✅ Clear state representation
type State =
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: string };

function render(state: State) {
  switch (state.status) {
    case "loading":
      return <Spinner />;
    case "success":
      return <User data={state.data} />;
    case "error":
      return <Error message={state.error} />;
  }
}
```

## Quick Reference

### Essential Types

- `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- `any`, `unknown`, `never`, `void`
- `object`, `Object`, `{}`
- `Array<T>`, `T[]`, `readonly T[]`
- `Record<K, V>`, `Map<K, V>`, `Set<T>`
- `Promise<T>`, `Partial<T>`, `Required<T>`, `Readonly<T>`
- `Pick<T, K>`, `Omit<T, K>`, `Exclude<T, U>`, `Extract<T, U>`

### Type Operators

- `keyof` - Get keys of object type
- `typeof` - Get type of value
- `in` - Check if property exists
- `extends` - Type constraint
- `infer` - Infer type in conditional

### Useful Links

- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **Utility Types**: https://www.typescriptlang.org/docs/handbook/utility-types.html
- **React TypeScript Cheatsheet**: https://react-typescript-cheatsheet.netlify.app/
- **Type Challenges**: https://github.com/type-challenges/type-challenges
- **TS Playground**: https://www.typescriptlang.org/play

---

**Note:** This is a practical reference for writing TypeScript in your Next.js + React + Bun stack with strict mode enabled.
