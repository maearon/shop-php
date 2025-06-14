#!/bin/bash
set -e

# Remove old server.pid if exists
rm -f /app/tmp/pids/server.pid

# Run database migrations (optional)
# bundle exec rails db:prepare || true

# Execute CMD from Dockerfile
exec "$@"
