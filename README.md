# 🖥️ Monitoring Server

Aplikasi monitoring infrastruktur modern dengan fitur lengkap untuk manajemen server, jaringan, dan aplikasi.

## 🏗️ Teknologi Stack

- **Backend**: Go (Fiber Framework)
- **Frontend**: React.js (Vite)
- **Database**: MariaDB
- **Cache/Session**: Redis
- **Authentication**: JWT + Redis Session
- **API Documentation**: Swagger
- **Containerization**: Docker & Docker Compose

## 📁 Struktur Project

```
monitoring-server/
├── backend/                     # API Server Go
│   ├── main.go                 # Entry point aplikasi
│   ├── go.mod                  # Dependencies Go
│   ├── auth/                   # Authentication handlers
│   ├── handler/                # API endpoints handlers
│   ├── model/                  # Database models (Gorm)
│   ├── database/              
│   │   ├── db.go              # Database connection
│   │   └── migration/         # Migration scripts
│   ├── middlewares/           # JWT, CORS middlewares
│   ├── router/                # API routing
│   ├── session/               # Redis session management
│   ├── rbac/                  # Role-based access control
│   └── docs/                  # Swagger documentation
├── frontend/                   # React.js UI
│   ├── src/
│   │   ├── views/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Utility functions
│   │   ├── middlewares/       # Route protection
│   │   └── config/            # Configuration
│   └── package.json
├── docker-compose.yml         # Service orchestration
└── run-local.sh              # Development script
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### Installation & Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd monitoring-server
   ```

2. **Jalankan aplikasi**
   ```bash
   ./run-local.sh
   ```

3. **Akses aplikasi**
   - 🌐 **Frontend**: http://localhost:7081
   - 🔧 **Backend API**: http://localhost:7080
   - 📚 **API Docs (Swagger)**: http://localhost:7080/docs/v1.0
   - 🗄️ **MariaDB**: localhost:9306
   - 🔴 **Redis**: localhost:6379

## 🔐 Default Login

- **Username**: `wpm-admin`
- **Password**: `masuk-wpm`

## 🔑 Fitur Backend API

### Authentication & Authorization
- ✅ **Login/Logout** dengan JWT + Redis session
- ✅ **Registration** dengan validasi email
- ✅ **Change Password** dengan validasi
- ✅ **Session Management** dengan Redis
- ✅ **RBAC** (Role-Based Access Control)

### User Management  
- ✅ **CRUD Users** - `/api/v1.0/users`
- ✅ **CRUD Roles** - `/api/v1.0/users/roles`
- ✅ **CRUD Groups** - `/api/v1.0/users/groups`
- ✅ **CRUD Role Bindings** - `/api/v1.0/users/role-bindings`

### Monitoring Services
- ✅ **ICMP Monitoring** - `/api/v1.0/services/availability/icmp`
- ✅ **Website Monitoring** - `/api/v1.0/services/availability/website`
- ✅ **System Metrics**:
  - CPU: `/api/v1.0/services/metrics/cpu`
  - Memory: `/api/v1.0/services/metrics/memory`
  - Disk: `/api/v1.0/services/metrics/disk`

### Infrastructure Management
- ✅ **CRUD Hosts** - `/api/v1.0/hosts`
- ✅ **CRUD Host Groups** - `/api/v1.0/hostgroups`
- ✅ **CRUD Service Groups** - `/api/v1.0/services/groups`

### Notifications & Reporting
- ✅ **Contact Groups** - `/api/v1.0/monitoring/contactgroups`
- ✅ **Notifications** - `/api/v1.0/monitoring/notifications`
- ✅ **Acknowledgments** - `/api/v1.0/monitoring/aknowledged`
- ✅ **Manual Reports** - `/api/v1.0/reports/manual`
- ✅ **Automatic Reports** - `/api/v1.0/reports/automatic`

### System Configuration
- ✅ **Profile Settings** - `/api/v1.0/profiles/settings`
- ✅ **Dashboard Data** - `/api/v1.0/dashboard`

## 🎨 Fitur Frontend

### Authentication
- ✅ **Login Page** dengan validasi
- ✅ **Registration Form** dengan validasi email/password
- ✅ **Protected Routes** dengan JWT validation
- ✅ **Auto Logout** saat token expired

### Administration
- ✅ **User Management** - List, create, edit, delete users
- ✅ **Role Management** - RBAC administration
- ✅ **Dashboard** - Overview monitoring status

### UI/UX Features
- ✅ **Responsive Design** dengan Material-UI
- ✅ **Dark/Light Theme** support
- ✅ **Loading States** dan error handling
- ✅ **Form Validation** dengan real-time feedback

## 🗄️ Database Schema

### Core Tables
- `users` - User accounts dengan email, name
- `roles` - System roles definition
- `groups` - User groups
- `user_roles` - Role assignments
- `user_groups` - Group memberships

### Monitoring Tables
- `hosts` - Server/device inventory
- `hostgroups` - Host grouping
- `availability_icmp` - ICMP check results  
- `availability_website` - Website check results
- `metrics_*` - System metrics storage

## 🔧 Database Migration

```bash
# Jalankan migrasi
cd backend
go run cmd/migrate.go
```

### RBAC automatic seeding

When the database is empty the migration scripts will create default RBAC data automatically:

- Default roles: Administrator, User, Moderator, Viewer
- Default permissions table is created (permissions can be extended)
- Default user: `wpm-admin` with password `masuk-wpm` will be created and assigned the Administrator role

If you run migrations with `./migrate all` or `go run cmd/migrate.go` the seeding is included.

Verify RBAC seeding in MariaDB:

```sql
SELECT * FROM roles;
SELECT * FROM users WHERE username = 'wpm-admin';
SELECT * FROM user_roles WHERE user_id = <wpm-admin id>;
SELECT * FROM role_bindings WHERE user_id = <wpm-admin id>;
```

## 🔐 RBAC & API Endpoints

The project exposes role, permission and binding management under the `/api/v1.0/users` namespace. Useful endpoints:

- List roles: GET `/api/v1.0/users/roles`
- Create role: POST `/api/v1.0/users/roles`  (body: { name, description })
- Assign role to user (simple API): POST `/api/v1.0/users/roles/users` (body: { user_id, role_id } or { user_id, role_name })
- List user-role assignments: GET `/api/v1.0/users/roles/users?user_id=<id>`
- Role bindings (CRUD): `/api/v1.0/users/roles/binding` (GET/POST/GET/:id/PUT/:id/DELETE/:id)
- Role-permission management: `/api/v1.0/users/roles/permission` (GET/POST/DELETE)
- Permissions CRUD: `/api/v1.0/users/permissions` (GET/POST/GET/:id/PUT/:id/DELETE/:id)

Frontend Add User dialog will fetch roles from GET `/api/v1.0/users/roles` and let you pick a role during user creation.

## ✅ Quick RBAC example (assign admin to user 1)

```bash
# Using curl, include Authorization header with a valid Bearer token
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" \
   -d '{"user_id":1,"role_name":"Administrator"}' \
   http://localhost:7080/api/v1.0/users/roles/users
```


## 🌐 Environment Variables

```env
# Frontend
VITE_BACKEND_URL=http://localhost:7080

# Database
DB_HOST=mariadb
DB_PORT=3306
DB_USER=root
DB_PASS=monpass
DB_NAME=mondb

# Security
JWT_SECRET=your-super-secret-jwt-key

# Redis
REDIS_ADDR=redis:6379
REDIS_PASSWORD=redispass123

# Application
APP_ENV=development
APP_PORT=8080
```

## 🔨 Development

### Backend Development
```bash
cd backend
go mod tidy
go run main.go
```

### Frontend Development  
```bash
cd frontend
npm install
npm run dev
```

### Database Reset
```bash
docker compose down -v
docker compose up -d
```

## 📚 API Documentation

Dokumentasi API lengkap tersedia di **Swagger UI**:
- URL: http://localhost:7080/docs/v1.0
- Format: OpenAPI 3.0
- Interactive testing available

## 🧪 Testing

### Test Backend
```bash
cd backend
go test ./...
```

### Test API Endpoints
```bash
# Login
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"wpm-admin","password":"masuk-wpm"}' \
  http://localhost:7080/api/v1.0/auth/login

# Get Users (with token)
curl -H "Authorization: Bearer <token>" \
  http://localhost:7080/api/v1.0/users
```

## 🔄 Production Deployment

1. **Environment Setup**
   ```bash
   cp .env.example .env.production
   # Edit environment variables
   ```

2. **Build Production Images**
   ```bash
   docker compose -f docker-compose.prod.yml build
   ```

3. **Deploy**
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

## 🛠️ Troubleshooting

### Common Issues

1. **JWT Invalid Token**
   - Check Redis connection
   - Verify JWT_SECRET consistency
   - Clear browser localStorage

2. **Database Connection Failed**
   - Verify MariaDB container is running
   - Check database credentials
   - Wait for database initialization

3. **Frontend Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

### Common Backend / Docker build issues

If you see Go build errors during `docker build` like:

```
# monitoring-server/handler
handler/role.go:201:15: undefined: rbac
```

This usually means a package reference (`rbac`) is used in a file but the package wasn't imported at the top of that file. Quick fixes:

1. Open the file that the compiler reports (example: `backend/handler/role.go`) and add the import:

```go
import (
   // ... other imports ...
   "monitoring-server/rbac"
)
```

2. Ensure other files that reference `rbac` (migrations, handlers) have the correct imports.

3. Locally validate the backend builds before Dockerizing:

```bash
cd backend
go mod tidy
go build ./...
```

4. Rebuild Docker image after fixes:

```bash
# from project root
docker compose build --no-cache backend
docker compose up -d
```

If the error persists, run `go build` inside the Docker build context or container to capture the full compile error and stack trace.

## 📈 Monitoring & Logs

```bash
# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Monitor resources
docker stats

# Database access
docker exec -it monitoring-server-mariadb-1 mysql -u root -p
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Support

- 📧 Email: support@monitoring-server.com
- 🐛 Issues: GitHub Issues
- 📖 Documentation: Wiki pages
