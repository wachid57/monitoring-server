#!/bin/bash

# Ensure swag CLI is installed
if ! command -v swag &> /dev/null; then
    echo "swag CLI not found. Installing swag..."
    go install github.com/swaggo/swag/cmd/swag@latest
    export PATH=$PATH:$(go env GOPATH)/bin
fi

# Run swag init to generate Swagger docs
echo "Generating Swagger documentation..."
swag init

echo "Swagger docs generated in ./docs"