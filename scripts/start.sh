#!/bin/bash

# Ask Anything UI - Development Server Startup Script

set -e

echo "🚀 Starting Ask Anything UI development server..."
echo ""

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Error: Bun is not installed"
    echo "Install from: https://bun.sh"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    bun install
    echo ""
fi

# Start the development server
echo "✨ Starting Next.js dev server with Turbopack..."
echo "🌐 Server will be available at: http://localhost:3000"
echo ""

bun run dev
