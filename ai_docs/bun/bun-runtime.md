# Bun Runtime Essentials

## Running Files

```bash
bun run index.ts        # TypeScript/JSX supported natively
bun index.tsx           # shorthand
bun --bun index.ts      # force Bun runtime (not Node.js)

# Watch mode
bun --watch index.ts
```

## Package Management

```bash
bun install             # install deps from package.json
bun install <pkg>       # add package
bun add <pkg>           # alias for install
bun remove <pkg>        # remove package
bun update <pkg>        # update package
bunx <pkg>              # run package (like npx)

# Faster than npm/yarn/pnpm
# - 33x faster than Yarn
# - 29x faster than npm
# - 17x faster than pnpm
```

## File I/O

```typescript
// Read file
const file = Bun.file("./input.txt");
const text = await file.text();
const buffer = await file.arrayBuffer();
const stream = file.stream();

// Write file
await Bun.write("./output.txt", "Hello!");
await Bun.write("./output.json", { data: "value" });
await Bun.write("./output.bin", new Uint8Array([1, 2, 3]));

// Check if file exists
const exists = await Bun.file("./file.txt").exists();

// File metadata
const stat = await Bun.file("./file.txt").stat();
// { size, mtime, atime, birthtime, isFile, isDirectory, ... }
```

## Environment Variables

```typescript
// Access
const port = Bun.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

// Set (in code)
Bun.env.MY_VAR = "value";
process.env.MY_VAR = "value";

// .env file automatically loaded
// Loads .env, .env.local, .env.production, etc.
```

## Fetch (Web API)

```typescript
// Standard fetch
const response = await fetch("https://api.example.com/data");
const data = await response.json();

// With options
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "John" }),
});
```

## SQLite (Built-in)

```typescript
import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");

// Query
const query = db.query("SELECT * FROM users WHERE id = ?");
const user = query.get(123);

// Multiple results
const users = query.all();

// Execute
db.run("INSERT INTO users (name) VALUES (?)", "Alice");

// Prepared statements are automatically cached
```

## TypeScript

No configuration needed - works out of the box.

```typescript
// tsconfig.json (optional, for IDE)
{
  "compilerOptions": {
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,
    "types": ["bun-types"],
    
    // Paths
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    
    // Strict mode
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
  }
}
```

## JSX/TSX

```typescript
// Automatic (default)
// No need to import React
function Component() {
  return <div>Hello</div>;
}

// Configure in tsconfig.json:
{
  "jsx": "react-jsx",        // automatic
  "jsxImportSource": "react" // or "preact"
}

// Classic (manual)
{
  "jsx": "react",
  "jsxFactory": "h",
  "jsxFragmentFactory": "Fragment"
}
```

## Module Resolution

```typescript
// Node.js-style imports work
import { something } from "package";
import local from "./local.ts";

// bun: namespace for built-ins
import { Database } from "bun:sqlite";
import { password } from "bun:secrets";

// Auto-install missing packages during dev
// Set in bunfig.toml:
[install]
auto = "auto"  # default, auto-install on import
```

## bunfig.toml

```toml
# Preload files before running
preload = ["./setup.ts"]

[install]
# Package manager behavior
auto = "auto"
production = false

[install.lockfile]
save = true
print = "yarn"  # yarn-style output

[install.cache]
dir = "~/.bun/install/cache"

[test]
# Test runner config
preload = ["./setup.ts"]
coverage = true
```

## Globals

```typescript
Bun.version           // Bun version string
Bun.revision          // Git commit hash
Bun.env               // Environment variables
Bun.main              // Entry point path
Bun.sleep(ms)         // Async sleep
Bun.which("git")      // Find executable path
Bun.hash(data)        // Fast hashing
Bun.CryptoHasher      // Streaming hash
Bun.escapeHTML(str)   // HTML escape
Bun.deepEquals(a, b)  // Deep equality check
```

## Process

```typescript
// Exit
process.exit(0);

// Platform
process.platform;  // "darwin" | "linux" | "win32"
process.arch;      // "x64" | "arm64"

// Current working directory
process.cwd();

// Arguments
process.argv;      // ["bun", "script.ts", "arg1"]
```

## $ Shell

```typescript
import { $ } from "bun";

// Run shell commands
await $`ls -la`;
await $`git commit -m "Initial commit"`;

// Capture output
const output = await $`git status`.text();
const json = await $`curl https://api.example.com`.json();

// Conditional
if (await $`test -f package.json`.quiet()) {
  console.log("package.json exists");
}
```

## Timers

```typescript
setTimeout(() => {}, 1000);
setInterval(() => {}, 1000);
setImmediate(() => {});
queueMicrotask(() => {});

// Async sleep
await Bun.sleep(1000);  // 1 second
```

## Crypto

```typescript
// Password hashing
const hash = await Bun.password.hash("my-password");
const isValid = await Bun.password.verify("my-password", hash);

// Hashing
import { CryptoHasher } from "bun";
const hasher = new CryptoHasher("sha256");
hasher.update("data");
const hash = hasher.digest("hex");

// Or one-shot
const hash = Bun.hash("data");
const hash = Bun.hash.wyhash("data");  // fastest
```

## Workers

```typescript
// Main thread
const worker = new Worker("./worker.ts");
worker.postMessage({ data: "value" });

worker.onmessage = (event) => {
  console.log("From worker:", event.data);
};

// worker.ts
self.onmessage = (event) => {
  const result = process(event.data);
  self.postMessage(result);
};
```

## Performance

- JavaScriptCore engine (Safari)
- Fast startup (3x faster than Node.js)
- Low memory usage
- Native TypeScript/JSX
- No bundling needed in dev
- Hot reloading with --watch

## Next.js Compatibility

For Next.js projects:
- Use Bun as package manager ✅
- Run dev server with `bun --bun run dev` ✅
- Build with `bun run build` (uses Node internally) ✅
- Some Node.js APIs may have quirks ⚠️

## Key Differences from Node.js

✅ ~90% Node.js API compatible
✅ Faster startup and runtime
✅ Native TypeScript/JSX
✅ Built-in SQLite, bundler, test runner
✅ Simpler toolchain

⚠️ Some packages may have issues
⚠️ Not all Node.js APIs implemented
⚠️ Check compatibility for native modules
