# Swift Environment Dockerfile
FROM swift:5.9-focal

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    make \
    gcc \
    clang \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Create build directories
RUN mkdir -p build test-results benchmark-results

# Set environment variables
ENV SWIFT_BUILD_DIR=/app/build
ENV SWIFT_PACKAGE_RESOURCES_PATH=/app/build

# Default command
CMD ["swift", "--version"]
