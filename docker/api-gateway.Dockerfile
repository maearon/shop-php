FROM openresty/openresty:alpine
COPY apps/api-gateway/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY apps/api-gateway/lua/ /usr/local/openresty/nginx/lua/
EXPOSE 80
