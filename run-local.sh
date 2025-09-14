#!/bin/bash
set -e

echo "[0/4] Stop and remove containers..."
docker compose down

echo "[1/4] Remove old images..."
docker image rm mini-npm-backend mini-npm-frontend mini-npm-nginx || true

echo "[2/4] Build docker images (no cache, always pull base image)..."
docker compose build --no-cache --pull

echo "[3/4] Start all services..."
docker compose up -d

echo "[4/4] Show status..."
docker compose ps

echo "Aplikasi sudah berjalan."
echo "- Backend: http://localhost:8080"
echo "- Frontend: http://localhost:8081"
echo "- Nginx Proxy: http://localhost (HTTP/HTTPS)"