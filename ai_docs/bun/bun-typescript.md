# TypeScript with Bun

## Key Features
- **Native TypeScript execution** - No transpilation needed
- **JSX/TSX support** - Built-in React transform
- **Path mapping** - Runtime resolution of tsconfig paths
- **No build step** for development
- **Fast transpilation** - Uses native transpiler

## Recommended tsconfig.json

### For Bun + Next.js
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "forceConsistentCasingInFileNames": true,
    
    "plugins": [
      { "name": "next" }
    ],
    
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    },
    
    "baseUrl": "."
  },
  
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  
  "exclude": ["node_modules"]
}
```

### For Standalone Bun
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "esnext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "types": ["bun-types"],
    
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    
    "paths": {
      "@/*": ["./src/*"]
    },
    
    "baseUrl": "."
  },
  
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Path Mapping

### Configuration
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/utils/*": ["./utils/*"],
      "@/types/*": ["./types/*"],
      "data": ["./data.ts"]
    }
  }
}
```

### Usage
```typescript
// Instead of: import Button from '../../../components/Button'
import Button from '@/components/Button';

// Instead of: import { db } from '../../../../lib/db'
import { db } from '@/lib/db';
```

### Bun Runtime Support
Bun natively resolves paths at runtime - no build step needed:
```typescript
// data.ts
export const foo = "Hello world!";

// app.ts
import { foo } from "data";  // Resolved via paths config
console.log(foo);
```

## JSX Configuration

### React JSX Transform (Recommended)
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

```tsx
// No React import needed!
export default function Button() {
  return <button>Click me</button>;
}
```

### Classic JSX
```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

```tsx
import React from 'react';

export default function Button() {
  return <button>Click me</button>;
}
```

### Per-File JSX Runtime
```tsx
/* @jsxRuntime automatic */
export const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx
/* @jsxRuntime classic */
import React from 'react';
export const HelloWorld = () => <h1>Hello world</h1>;
```

## Type Definitions

### Bun Types
```bash
bun add -d bun-types
```

```json
{
  "compilerOptions": {
    "types": ["bun-types"]
  }
}
```

### Environment Variables
```typescript
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    S3_BUCKET: string;
    NEXT_PUBLIC_API_URL: string;
  }
}
```

### Global Types
```typescript
// global.d.ts
declare global {
  var __DEV__: boolean;
  
  interface Window {
    analytics: {
      track: (event: string) => void;
    };
  }
}

export {};
```

## Decorators

### Enable Experimental Decorators
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

```typescript
function Log(target: any, propertyKey: string) {
  console.log(`${propertyKey} called`);
}

class MyClass {
  @Log
  myMethod() {
    // ...
  }
}
```

## Module Resolution

### Bundler (Recommended for Bun)
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

Benefits:
- Allows importing JSON files
- Supports package.json `exports` field
- Works with path mapping
- Compatible with modern bundlers

### Node16/NodeNext (For Node.js compatibility)
```json
{
  "compilerOptions": {
    "moduleResolution": "node16"
  }
}
```

## Common Patterns

### API Types
```typescript
// types/api.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export type CreateUserRequest = Omit<User, 'id'>;
```

### Database Types
```typescript
// types/db.ts
import type { InferSelectModel } from 'drizzle-orm';
import * as schema from '@/db/schema';

export type User = InferSelectModel<typeof schema.users>;
export type Post = InferSelectModel<typeof schema.posts>;
```

### Component Props
```typescript
// types/components.ts
import type { ReactNode } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}
```

## Strict Mode

### Recommended Settings
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

## Performance

### Faster Type Checking
```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "incremental": true
  }
}
```

### Project References (Monorepo)
```json
{
  "references": [
    { "path": "./packages/shared" },
    { "path": "./packages/client" }
  ]
}
```

## Bun-Specific Features

### Import Attributes
```typescript
// Import JSON
import data from './data.json' assert { type: 'json' };

// Import text
import text from './file.txt' assert { type: 'text' };
```

### Top-Level Await
```typescript
// Works in Bun without special config
const data = await fetch('https://api.example.com').then(r => r.json());
console.log(data);
```
