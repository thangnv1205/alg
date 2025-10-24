# Dart Environment Dockerfile
FROM dart:stable

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Create build directories
RUN mkdir -p build test-results benchmark-results

# Set environment variables
ENV DART_SDK=/usr/lib/dart
ENV PATH="/usr/lib/dart/bin:${PATH}"

# Default command
CMD ["dart", "--version"]
