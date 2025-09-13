FROM openresty/openresty:alpine
COPY conf.d /etc/nginx/conf.d
COPY ssl /etc/nginx/ssl
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
