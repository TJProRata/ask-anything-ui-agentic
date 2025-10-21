# Bun.serve - HTTP & WebSocket

## Basic HTTP Server
```typescript
import { serve } from "bun";

const server = serve({
  fetch(req: Request) {
    return new Response("Hello World");
  },
  port: 3000,
});

console.log(`Server running at ${server.url}`);
```

## Advanced Configuration
```typescript
serve({
  port: 3000,
  hostname: "0.0.0.0",
  development: true,  // Hot reload, detailed errors
  
  fetch(req: Request) {
    const url = new URL(req.url);
    
    if (url.pathname === "/api/data") {
      return Response.json({ data: "value" });
    }
    
    return new Response("Not Found", { status: 404 });
  },
  
  error(error: Error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
});
```

## Production Mode (1.2.3+)
```typescript
serve({
  development: false,  // Enables:
  // - In-memory asset caching
  // - Cache-Control & ETag headers
  // - JS/TS/JSX minification
  // - Lazy bundling on first request
  
  routes: { "/": homepage },
});
```

## Routes API (1.2.3+)

### HTML Imports with Auto-Bundling
```typescript
import { serve, sql } from "bun";
import homepage from "./index.html";
import dashboard from "./dashboard.html";

serve({
  routes: {
    // HTML files - automatically bundles scripts/styles
    "/": homepage,
    "/dashboard": dashboard,
    
    // API endpoints
    "/api/users": {
      async GET(req) {
        const users = await sql`SELECT * FROM users`;
        return Response.json(users);
      },
      async POST(req) {
        const { name, email } = await req.json();
        const user = await sql`
          INSERT INTO users (name, email) 
          VALUES (${name}, ${email}) 
          RETURNING *
        `;
        return Response.json(user[0]);
      }
    },
    
    // Dynamic routes
    "/api/users/:id": async (req) => {
      const { id } = req.params;
      const user = await sql`SELECT * FROM users WHERE id = ${id}`;
      return Response.json(user[0]);
    },
  },
  
  // Fallback for unmatched routes
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  }
});
```

## WebSocket Server
```typescript
import { serve } from "bun";

const server = serve({
  fetch(req, server) {
    const url = new URL(req.url);
    
    if (url.pathname === "/chat") {
      const username = url.searchParams.get("username") || "Anonymous";
      
      const success = server.upgrade(req, {
        data: { username, joinedAt: Date.now() }
      });
      
      if (!success) {
        return new Response("WebSocket upgrade failed", { status: 400 });
      }
      return;  // Must return undefined for upgrades
    }
    
    return new Response("Connect to /chat");
  },
  
  websocket: {
    open(ws) {
      ws.subscribe("chat-room");
      server.publish("chat-room", JSON.stringify({
        type: "join",
        username: ws.data.username
      }));
    },
    
    message(ws, message) {
      server.publish("chat-room", JSON.stringify({
        type: "message",
        username: ws.data.username,
        text: message
      }));
    },
    
    close(ws, code, reason) {
      server.publish("chat-room", JSON.stringify({
        type: "leave",
        username: ws.data.username
      }));
      ws.unsubscribe("chat-room");
    },
    
    // Configuration
    perMessageDeflate: true,
    maxPayloadLength: 16 * 1024 * 1024,  // 16MB
  }
});
```

## Alternative Syntax
```typescript
// Default export (auto-detected by Bun)
import { type Serve } from "bun";

export default {
  fetch(req) {
    return new Response("Bun!");
  },
} satisfies Serve;
```

## Server Lifecycle
```typescript
const server = Bun.serve({ /* config */ });

// Stop server
server.stop(true);  // true = close active connections

// Unreference (allow process to exit)
server.unref();
```

## File Serving
```typescript
import { serve } from "bun";

serve({
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    
    // Serve static files
    const file = Bun.file(`./public${path}`);
    if (await file.exists()) {
      return new Response(file);
    }
    
    return new Response("Not Found", { status: 404 });
  }
});
```

## Performance Notes
- Express 3x faster than Node.js
- Native HTTP/2 support (2x faster than Node)
- Built-in WebSocket pub/sub
- Automatic asset bundling for HTML imports
