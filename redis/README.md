# Redis Docker Setup

## Files:
- `Dockerfile` - Custom Redis image with security configurations
- `redis.conf` - Redis server configuration optimized for monitoring server

## Features:
- **Security**: Non-root user, proper file permissions
- **Persistence**: AOF + RDB with optimized settings
- **Memory**: 256MB limit with LRU eviction
- **Performance**: Optimized for session storage workload
- **Health checks**: Built-in ping monitoring

## Production Setup:
1. Uncomment and set password in `redis.conf`:
   ```
   requirepass your_strong_password_here
   ```

2. Update docker-compose.yml:
   ```yaml
   redis:
     build: ./redis
     environment:
       - REDIS_PASSWORD=your_strong_password_here
   ```

3. Update backend environment:
   ```env
   REDIS_PASSWORD=your_strong_password_here
   ```

## Usage:
```bash
# Build and run
docker-compose up redis

# Connect to Redis CLI
docker exec -it monitoring-server-redis-1 redis-cli

# Monitor Redis
docker exec -it monitoring-server-redis-1 redis-cli monitor
```
