#!/bin/bash

# Jalankan dari folder backend
cd "$(dirname "$0")"

# Inisialisasi go module jika belum ada
if [ ! -f "go.mod" ]; then
    echo "go.mod not found. Initializing go module..."
    go mod init mini-npm-backend
fi

# Update dependencies
go mod tidy

# Pastikan swag CLI sudah terinstall
if ! command -v swag &> /dev/null; then
    echo "swag CLI not found. Installing swag..."
    go install github.com/swaggo/swag/cmd/swag@latest
    export PATH=$PATH:$(go env GOPATH)/bin
fi

# Generate Swagger docs
echo "Generating Swagger documentation..."
swag init

echo "Swagger docs generated in ./docs"