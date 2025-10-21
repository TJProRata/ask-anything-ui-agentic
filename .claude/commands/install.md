# Install & Prime

Initialize the Ask Anything UI development environment and load project context.

## Execute Prime
First, run the prime command to understand the project:
```
/prime
```

## Install Dependencies
Install all project dependencies using Bun:
```bash
bun install
```

## Verify Setup
Confirm the environment is ready:
```bash
# Check Next.js build
bun run build

# Build widget bundle
bun run build:widget

# Run linter
bun run lint
```

## Optional: Start Development
If everything passes, you can start the dev server:
```bash
bun run dev
```

## Report

Provide a concise summary:
- ✅ Dependencies installed (package count)
- ✅ Build verification results
- ✅ Widget bundle created (dist/ output)
- ✅ Development server status
- 🔍 Any warnings or issues encountered