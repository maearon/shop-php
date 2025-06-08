#!/bin/sh

echo "🚀 Starting API Gateway (OpenResty)..."

if [ "$NGINX_ENV" = "development" ]; then
    echo "🔥 Starting development mode..."
    /usr/local/openresty/bin/openresty -g "daemon off;" -c /usr/local/openresty/nginx/conf/nginx.dev.conf
else
    echo "🏭 Starting production mode..."
    /usr/local/openresty/bin/openresty -g "daemon off;"
fi
