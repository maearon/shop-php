#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid
rm -f /app/tmp/pids/server.pid

# Start the main process
exec "$@"
