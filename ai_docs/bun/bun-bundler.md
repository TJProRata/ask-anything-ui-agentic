# Bun Bundler

## Basic Usage

### CLI
```bash
# Bundle single file
bun build ./src/index.ts --outdir ./dist

# Multiple entry points
bun build ./pages/index.tsx ./pages/settings.tsx --outdir ./out

# Production build
bun build --target=bun --production --outdir=dist ./src/index.ts

# Minify
bun build ./src/index.ts --outdir ./dist --minify

# Source maps
bun build ./src/index.ts --outdir ./dist --sourcemap
```

### JavaScript API
```typescript
await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'bun',       // or 'browser', 'node'
  format: 'esm',       // or 'cjs'
  minify: true,
  sourcemap: 'external',
  splitting: true,     // Code splitting
  root: '.',
});
```

## Environment Variables

### Inline at Build Time
```typescript
// Define constants
bun build --define BUILD_VERSION='"1.0.0"' --define NODE_ENV='"production"' src/index.ts --outdir ./dist

// API
await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  define: {
    BUILD_VERSION: '"1.0.0"',
    NODE_ENV: '"production"'
  }
});
```

### Prefix-based Inlining
```typescript
// Inline all env vars with prefix
await Bun.build({
  env: "MY_PUBLIC_*",
  entrypoints: ["src/index.ts"],
  outdir: "./dist"
});

// Makes MY_PUBLIC_API_URL available at build time
```

## External Dependencies
```typescript
// Mark as external (not bundled)
await Bun.build({
  entrypoints: ['./index.tsx'],
  outdir: './out',
  external: ["lodash", "react", "react-dom"]
});

// All dependencies external
await Bun.build({
  entrypoints: ['./index.tsx'],
  outdir: './out',
  external: ['*']
});
```

## Standalone Executables

### Basic Compile
```bash
# Current platform
bun build --compile ./server.ts --outfile myapp

# Cross-platform
bun build --compile --target=bun-linux-x64 ./index.ts --outfile myapp
bun build --compile --target=bun-windows-x64 ./app.ts --outfile myapp.exe
```

### API
```typescript
await Bun.build({
  entrypoints: ["./app.ts"],
  outdir: "./dist",
  compile: {
    target: "bun-windows-x64",
    outfile: "myapp.exe"
  }
});
```

### Full-Stack Apps
HTML imports automatically bundle frontend assets:
```typescript
import { serve } from "bun";
import index from "./index.html";

serve({
  routes: {
    "/": index,
    "/api/hello": { GET: () => Response.json({ msg: "hi" }) }
  }
});

// Compile with frontend bundled
// bun build --compile ./server.ts --outfile myapp
```

## Build-Time Constants
```typescript
// config.ts
declare const CONFIG: {
  apiUrl: string;
  timeout: number;
};

// Build with replacement
// bun build --define CONFIG='{"apiUrl":"https://api.com","timeout":5000}'

// Use in code
const response = await fetch(CONFIG.apiUrl, {
  timeout: CONFIG.timeout
});
```

## Plugins

### Basic Plugin
```typescript
import { plugin } from "bun";

plugin({
  name: "my-plugin",
  setup(build) {
    build.onStart(() => {
      console.log("Build started");
    });
    
    build.onLoad({ filter: /\.txt$/ }, async (args) => {
      const text = await Bun.file(args.path).text();
      return {
        contents: `export default ${JSON.stringify(text)}`,
        loader: "js"
      };
    });
  }
});
```

## Output Configuration
```typescript
await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  naming: {
    entry: '[dir]/[name].[ext]',
    chunk: '[name]-[hash].[ext]',
    asset: '[name]-[hash].[ext]'
  }
});
```

## Targets
- `bun`: Bun runtime (default)
- `node`: Node.js
- `browser`: Browser environments

## Performance
- Significantly faster than Webpack/Rollup
- Native CSS/TypeScript/JSX transpilation
- No separate build tools needed
