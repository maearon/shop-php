#!/bin/sh

echo "🚀 Starting Adidas Frontstore..."

if [ "$NODE_ENV" = "development" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "🔥 Starting development server with hot reload..."
    npm run dev
else
    echo "🏭 Starting production server..."
    node server.js
fi
