# Aplikasi Monitoring Infrastuktur 

Aplikasi Monitoring Infrastuktur dengan:
- Backend: Golang (Fiber)
- Frontend: React.js
- Database: MariaDB

## Struktur
- `backend/` : API server Golang
  - `main.go` : Entry point aplikasi Fiber
  - `cmd/migrate.go` : Binary migrasi database (`migrate`)
  - `model/` : Definisi entity (User, Role, Group, RoleBinding, Host, HostGroup, dll)
  - `handler/` : Handler endpoint API (CRUD User, Role, Group, Host, HostGroup, RoleBinding, dsb)
  - `database/migration/` : Script migrasi per tabel
  - `router/` : Routing API dan Swagger
- `frontend/` : UI React.js
- `docker-compose.yml` : Orkestrasi service

## Cara Menjalankan
1. Pastikan Docker & Docker Compose terinstall
2. Jalankan:
   ```bash
   ./run-local.sh
   ```
3. Akses:
   - Backend: http://localhost:9080
   - Frontend: http://localhost:9081
   - MariaDB: localhost:9306

## Migrasi Database
- Untuk migrasi database, gunakan binary `migrate`:
  ```bash
  # List migrasi yang tersedia
  ./migrate list

  # Jalankan semua migrasi
  ./migrate all

  # Jalankan migrasi tertentu (misal nomor 2)
  ./migrate 2
  ```

## Fitur Backend
- Login, dashboard, manajemen proxy, dan SSL
- RBAC: User, Role, Group, RoleBinding
- CRUD Host dan HostGroup
- CRUD Service ICMP: `/api/v1.0/services/availability/icmp`
- CRUD Service Website: `/api/v1.0/services/availability/website`
- CRUD Metrics (CPU, Memory, Disk):
  - `/api/v1.0/services/metrics/cpu`
  - `/api/v1.0/services/metrics/memory`
  - `/api/v1.0/services/metrics/disk`
- CRUD Service Group: `/api/v1.0/services/groups`
- CRUD Contact Group: `/api/v1.0/monitoring/contactgroups`
- CRUD Notification: `/api/v1.0/monitoring/notifications`
- CRUD Aknowledged: `/api/v1.0/monitoring/aknowledged`
- CRUD Profile Setting: `/api/v1.0/profiles/settings`
- CRUD Report Manual: `/api/v1.0/reports/manual`
- CRUD Report Automatic: `/api/v1.0/reports/automatic`
- Dokumentasi API otomatis via Swagger di `/docs/v1.0`
