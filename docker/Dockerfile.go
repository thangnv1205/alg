# Go Environment Dockerfile
FROM golang:1.21-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    make \
    gcc \
    musl-dev

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Create build directories
RUN mkdir -p build test-results benchmark-results

# Set environment variables
ENV GO111MODULE=auto
ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64

# Default command
CMD ["go", "version"]
