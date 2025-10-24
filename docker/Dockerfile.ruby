# Ruby Environment Dockerfile
FROM ruby:3.2-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    make \
    gcc \
    musl-dev \
    linux-headers

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Create build directories
RUN mkdir -p build test-results benchmark-results

# Set environment variables
ENV RUBYOPT="-W0"
ENV BUNDLE_SILENCE_ROOT_WARNING=1

# Default command
CMD ["ruby", "--version"]
