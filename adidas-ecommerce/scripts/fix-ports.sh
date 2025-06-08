#!/bin/bash

echo "🔍 Checking for processes using port 80..."

# Check what's using port 80
lsof -i :80

echo "🛑 Stopping any processes using port 80..."

# Kill processes using port 80 (be careful with this)
sudo lsof -ti:80 | xargs sudo kill -9 2>/dev/null || echo "No processes found on port 80"

echo "✅ Port 80 should now be available"

# Check again
echo "🔍 Checking port 80 again..."
lsof -i :80 || echo "Port 80 is now free"
