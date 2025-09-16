# Mini Nginx Proxy Manager

Aplikasi manajemen proxy seperti Nginx Proxy Manager dengan:
- Backend: Golang (Fiber)
- Frontend: Vue.js
- Database: MariaDB
- Proxy Engine: Nginx

## Struktur
- `backend/` : API server Golang
  - `main.go` : Entry point aplikasi Fiber
  - `cmd/migrate.go` : Binary migrasi database (`migrate`)
  - `model/` : Definisi entity (User, Role, Group, RoleBinding, Host, HostGroup, dll)
  - `handler/` : Handler endpoint API (CRUD User, Role, Group, Host, HostGroup, RoleBinding, dsb)
  - `database/migration/` : Script migrasi per tabel
  - `router/` : Routing API dan Swagger
- `frontend/` : UI Vue.js
- `docker-compose.yml` : Orkestrasi service
- `nginx/` : Konfigurasi Nginx

## Cara Menjalankan
1. Pastikan Docker & Docker Compose terinstall
2. Jalankan:
   ```bash
   ./run-local.sh
   ```
3. Akses:
   - Backend: http://localhost:9080
   - Frontend: http://localhost:9081
   - Nginx Proxy: http://localhost:9082 (HTTP)
   - Nginx Proxy: https://localhost:9443 (HTTPS)
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
- Dokumentasi API otomatis via Swagger di `/docs/v1.0`

## Catatan
- Untuk reload Nginx dari backend, pastikan volume Docker socket sudah di-mount.
- Silakan modifikasi sesuai kebutuhan.
