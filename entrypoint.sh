#!/bin/bash
set -e

# Xoá server.pid nếu có (tránh lỗi "server already running")
rm -f /app/tmp/pids/server.pid

# Chạy Rails server
exec bundle exec rails server -b 0.0.0.0 -p 3000
