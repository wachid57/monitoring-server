#!/bin/bash
set -e

echo "[0/4] Stop and remove containers..."
docker compose down

echo "[1/4] Remove old images..."
docker image rm monitoring-server-backend monitoring-server-frontend monitoring-server-nginx || true

echo "[2/4] Build docker images (no cache, always pull base image)..."
docker compose build --no-cache --pull

echo "[3/4] Start all services..."
docker compose up -d

echo "[4/4] Show status..."
docker compose ps

# Resolve server IP (override with HOST_IP env if provided)
HOST_IP_RESOLVED="${HOST_IP}"
if [ -z "$HOST_IP_RESOLVED" ]; then
	# Try several methods to get a non-loopback IPv4
	HOST_IP_RESOLVED=$(hostname -I 2>/dev/null | awk '{for(i=1;i<=NF;i++) if ($i!="127.0.0.1") {print $i; exit}}')
	if [ -z "$HOST_IP_RESOLVED" ]; then
		HOST_IP_RESOLVED=$(ip route get 1 2>/dev/null | awk 'NR==1{print $7}')
	fi
	if [ -z "$HOST_IP_RESOLVED" ]; then
		HOST_IP_RESOLVED="localhost"
	fi
fi

# Discover mapped ports dynamically from compose
BACKEND_PORT=$(docker compose port backend 8080 2>/dev/null | tail -n1 | sed -E 's/.*:([0-9]+)$/\1/')
FRONTEND_PORT=$(docker compose port frontend 8080 2>/dev/null | tail -n1 | sed -E 's/.*:([0-9]+)$/\1/')

# Fallbacks to common defaults if discovery fails
[ -z "$BACKEND_PORT" ] && BACKEND_PORT=7080
[ -z "$FRONTEND_PORT" ] && FRONTEND_PORT=7081

echo "Aplikasi sudah berjalan."
echo "- Backend: http://$HOST_IP_RESOLVED:$BACKEND_PORT"
echo "- Frontend: http://$HOST_IP_RESOLVED:$FRONTEND_PORT"