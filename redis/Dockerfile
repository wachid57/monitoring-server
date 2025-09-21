# Redis Dockerfile for Monitoring Server
FROM redis:7-alpine

# Install redis-cli tools
RUN apk add --no-cache redis

# Create redis user and directories
RUN addgroup -g 999 redis && \
    adduser -D -s /bin/sh -u 999 -G redis redis

# Create data directory
RUN mkdir -p /data && \
    chown redis:redis /data

# Copy custom redis configuration
COPY redis.conf /usr/local/etc/redis/redis.conf

# Set proper permissions
RUN chown redis:redis /usr/local/etc/redis/redis.conf

# Switch to redis user
USER redis

# Expose port
EXPOSE 6379

# Set working directory
WORKDIR /data

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD redis-cli ping || exit 1

# Start redis server with custom config
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
