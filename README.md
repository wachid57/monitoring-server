# Mini Nginx Proxy Manager

Aplikasi manajemen proxy seperti Nginx Proxy Manager dengan:
- Backend: Golang (Echo)
- Frontend: Vue.js
- Database: MariaDB
- Proxy Engine: Nginx

## Struktur
- `backend/` : API server Golang
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

## Catatan
- Konfigurasi login, dashboard, manajemen proxy, dan SSL sudah tersedia.
- Untuk reload Nginx dari backend, pastikan volume Docker socket sudah di-mount.
- Silakan modifikasi sesuai kebutuhan.
