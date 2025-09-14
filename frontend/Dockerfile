# Stage 1: Build the React app
FROM harbor-regs.wachid.web.id/library/node:20-alpine AS build
RUN apk add --no-cache curl
WORKDIR /app
COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm install react-router-dom && \
    npm install --legacy-peer-deps

# Pastikan env tersedia saat build React
RUN export VITE_BACKEND_URL=${VITE_BACKEND_URL} && npm run build
    
# Generate build version file
RUN echo $(date +%y%m%d%H%M%S) > /app/build/version.txt

# Stage 2: Use nginx to serve the production build
FROM harbor-regs.wachid.web.id/library/nginx:alpine AS production
RUN apk add --no-cache curl
WORKDIR /app
# Copy build output to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html
# Copy custom nginx config
COPY docker-config/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
# Fix permission for nginx cache and run folders
RUN mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx \
    && mkdir -p /run && chown -R nginx:nginx /run
USER nginx
CMD ["nginx", "-g", "daemon off;"]
