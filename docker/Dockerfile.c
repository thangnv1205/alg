# C Environment Dockerfile
FROM gcc:latest

# Install system dependencies
RUN apt-get update && apt-get install -y \
    make \
    cmake \
    git \
    valgrind \
    gdb \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Create build directories
RUN mkdir -p build test-results benchmark-results

# Set environment variables
ENV CC=gcc
ENV CFLAGS="-Wall -Wextra -std=c99"

# Default command
CMD ["make", "compile-c"]
