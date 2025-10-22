Kill all running dev servers, then start fresh development server.

## Steps

1. Kill all existing dev server processes
2. Clean up ports 3000-3005
3. Start development server with 300s timeout
4. Watch output for errors

## Execute

```bash
# Kill all dev server processes
pkill -f "next-server" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
lsof -ti:3000,3005 2>/dev/null | xargs kill -9 2>/dev/null || true

# Start fresh server
sh ./scripts/start.sh 300s
```
