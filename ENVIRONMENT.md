# Environment Configuration Guide

This document explains all environment variables used in the Monitoring Server.

## 🌐 Frontend Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_BACKEND_URL` | Backend API URL for frontend | `http://localhost:9080` | ✅ |

## 🗄️ Database Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `DB_HOST` | Database host/service name | `localhost` or `monitoring-server-mariadb-1` | ✅ |
| `DB_PORT` | Database port | `3306` | ✅ |
| `DB_USER` | Database username | `root` | ✅ |
| `DB_PASS` | Database password | `your-secure-password` | ✅ |
| `DB_NAME` | Database name | `monitoring` | ✅ |

## 🔐 Security Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | JWT signing secret key | `openssl rand -hex 32` output | ✅ |

## 📦 Redis Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `REDIS_ADDR` | Redis server address | `localhost:6379` | ✅ |
| `REDIS_PASSWORD` | Redis password (optional) | `your-redis-password` | ❌ |

## ⚙️ Application Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `APP_ENV` | Application environment | `development`, `staging`, `production` | ❌ |
| `APP_PORT` | Application port | `8080` | ❌ |
| `LOG_LEVEL` | Logging level | `debug`, `info`, `warn`, `error` | ❌ |

## 📊 Monitoring Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `ENABLE_METRICS` | Enable metrics collection | `true`, `false` | ❌ |
| `METRICS_PORT` | Metrics server port | `9090` | ❌ |

## 🚀 Production Setup

### 1. Generate Secure JWT Secret
```bash
openssl rand -hex 32
```

### 2. Set Production Environment
```env
APP_ENV=production
LOG_LEVEL=info
JWT_SECRET=your-generated-secure-key
REDIS_PASSWORD=your-strong-redis-password
```

### 3. Docker Environment
For Docker deployments, use service names:
```env
DB_HOST=monitoring-server-mariadb-1
REDIS_ADDR=monitoring-server-redis-1:6379
```

### 4. Local Development
For local development:
```env
DB_HOST=localhost
REDIS_ADDR=localhost:6379
```

## 🔒 Security Best Practices

1. **Never commit actual `.env` files** - Only commit `.env.example`
2. **Use strong passwords** - Minimum 12 characters with mixed case, numbers, symbols
3. **Rotate secrets regularly** - Especially JWT_SECRET in production
4. **Use environment-specific configs** - Different secrets for dev/staging/prod
5. **Secure file permissions** - `chmod 600 .env` to restrict access

## 📋 Environment Checklist

### Development
- [ ] Copy `.env.example` to `.env`
- [ ] Update database credentials
- [ ] Set local service addresses
- [ ] Enable debug logging

### Production
- [ ] Generate secure JWT_SECRET
- [ ] Set strong database password
- [ ] Configure Redis password
- [ ] Set APP_ENV=production
- [ ] Set appropriate LOG_LEVEL
- [ ] Verify all required variables
