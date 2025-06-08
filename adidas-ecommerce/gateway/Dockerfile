FROM openresty/openresty:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy Nginx configuration
COPY conf/ /usr/local/openresty/nginx/conf/
COPY lua/ /usr/local/openresty/nginx/lua/

# Copy start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80 443

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

CMD ["/start.sh"]
