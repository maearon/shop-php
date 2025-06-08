FROM openresty/openresty:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy Nginx configuration
COPY gateway/conf/ /usr/local/openresty/nginx/conf/
COPY gateway/lua/ /usr/local/openresty/nginx/lua/

EXPOSE 80 443

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Development vs Production
CMD if [ "$NGINX_ENV" = "development" ]; then \
      /usr/local/openresty/bin/openresty -g "daemon off;" -c /usr/local/openresty/nginx/conf/nginx.dev.conf; \
    else \
      /usr/local/openresty/bin/openresty -g "daemon off;"; \
    fi
