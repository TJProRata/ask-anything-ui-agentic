# Bun Quick Reference

## Package Management

### Install
```bash
bun install                    # Install all dependencies
bun install <package>          # Add package
bun add <package>              # Alias for install
bun add -d <package>           # Add as dev dependency
bun add -g <package>           # Global install

# Flags
bun install --frozen-lockfile  # CI mode - don't update lockfile
bun install --production       # Production dependencies only
bun install --no-save          # Don't update package.json
```

### Update
```bash
bun update                     # Update all packages
bun update <package>           # Update specific package
bun update --interactive       # Choose which to update
```

### Remove
```bash
bun remove <package>
```

### Info
```bash
bun pm ls                      # List installed packages
bun pm ls --all               # Include dependencies
bun info <package>             # Package information
bun why <package>              # Show dependency tree
```

## Running Scripts

### Execute Files
```bash
bun run index.ts              # Run TypeScript directly
bun index.ts                  # Shorthand
bun --watch index.ts          # Hot reload on changes
bun --hot index.ts            # Hot reload (server)
```

### Package Scripts
```bash
bun run dev                   # Run package.json script
bun dev                       # Shorthand
bun run build
bun test
```

## File I/O

### Read Files
```typescript
// Text
const text = await Bun.file("./file.txt").text();

// JSON
const data = await Bun.file("./data.json").json();

// ArrayBuffer
const buffer = await Bun.file("./file.bin").arrayBuffer();

// Stream
const stream = Bun.file("./large.txt").stream();
```

### Write Files
```typescript
// Write text
await Bun.write("./output.txt", "Hello World");

// Write JSON
await Bun.write("./data.json", JSON.stringify({ key: "value" }));

// Write Response
const res = await fetch("https://example.com");
await Bun.write("./page.html", res);

// Write Blob
await Bun.write("./file.bin", new Blob([buffer]));
```

### File Metadata
```typescript
const file = Bun.file("./file.txt");
console.log(file.size);        // Size in bytes
console.log(file.type);        // MIME type
console.log(await file.exists()); // true/false
```

## HTTP Requests

### Fetch API
```typescript
// GET
const response = await fetch("https://api.example.com/users");
const data = await response.json();

// POST
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John" })
});

// With timeout
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
const response = await fetch(url, { signal: controller.signal });
```

## Testing

### Basic Test
```typescript
import { test, expect } from "bun:test";

test("addition", () => {
  expect(2 + 2).toBe(4);
});

test("async test", async () => {
  const result = await fetchData();
  expect(result).toBeTruthy();
});
```

### Run Tests
```bash
bun test                      # Run all tests
bun test file.test.ts         # Run specific file
bun test --watch              # Watch mode
```

## Database (Built-in)

### SQLite
```typescript
import { Database } from "bun:sqlite";

const db = new Database("./app.db");

// Query
const users = db.query("SELECT * FROM users").all();
const user = db.query("SELECT * FROM users WHERE id = ?").get(1);

// Prepared statements
const stmt = db.prepare("INSERT INTO users (name) VALUES (?)");
stmt.run("John");

// Transactions
const insert = db.transaction((users) => {
  for (const user of users) {
    stmt.run(user.name);
  }
});
insert([{ name: "Alice" }, { name: "Bob" }]);
```

### PostgreSQL
```typescript
import { sql } from "bun";

// Uses DATABASE_URL env var
const users = await sql`SELECT * FROM users`;
const user = await sql`SELECT * FROM users WHERE id = ${id}`;

// Insert
const result = await sql`
  INSERT INTO users (name, email) 
  VALUES (${name}, ${email}) 
  RETURNING *
`;
```

## Process & Shell

### Spawn Process
```typescript
import { spawn } from "bun";

const proc = spawn({
  cmd: ["npm", "install"],
  cwd: "./project",
  env: { ...process.env, NODE_ENV: "production" },
  stdout: "pipe",
  stderr: "pipe",
});

const output = await new Response(proc.stdout).text();
await proc.exited;
```

### Shell Commands (Bun Shell)
```typescript
import { $ } from "bun";

// Execute
await $`echo "Hello World"`;

// Capture output
const output = await $`ls -la`.text();

// Pipe
await $`cat file.txt | grep "search"`;
```

## Utils

### Path Operations
```typescript
import { resolve, join, dirname, basename } from "node:path";

const path = resolve("./file.txt");
const dir = dirname(path);
const file = basename(path);
```

### File URL Conversion
```typescript
const path = Bun.fileURLToPath(new URL("file:///foo/bar.txt"));
// "/foo/bar.txt"

const url = Bun.pathToFileURL("/foo/bar.txt");
// "file:///foo/bar.txt"
```

### Environment
```typescript
console.log(Bun.version);           // Bun version
console.log(Bun.revision);          // Git revision
console.log(process.cwd());         // Current directory
console.log(process.env.NODE_ENV);  // Environment variable
```

## Performance

### Benchmarking
```typescript
import { bench, run } from "bun:test";

bench("string concat", () => {
  let str = "";
  for (let i = 0; i < 1000; i++) {
    str += "a";
  }
});

bench("array join", () => {
  const arr = [];
  for (let i = 0; i < 1000; i++) {
    arr.push("a");
  }
  arr.join("");
});

await run();
```

## Common Flags

### Development
```bash
--watch              # Hot reload on file changes
--hot                # Hot reload for servers
--inspect            # Enable debugger
--inspect-brk        # Break on start
```

### Build
```bash
--minify             # Minify output
--sourcemap          # Generate source maps
--target browser     # Target platform
--outdir ./dist      # Output directory
```

### Runtime
```bash
--bun                # Use Bun APIs (force Bun mode)
--cwd ./path         # Set working directory
--env-file=.env.dev  # Load specific env file
```

## Version & Help
```bash
bun --version        # Show version
bun --help           # Show help
bun upgrade          # Upgrade Bun
bun completions      # Shell completions
```
