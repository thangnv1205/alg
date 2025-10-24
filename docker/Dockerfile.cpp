# C++ Environment Dockerfile
FROM gcc:latest

# Install system dependencies
RUN apt-get update && apt-get install -y \
    g++ \
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
ENV CXX=g++
ENV CXXFLAGS="-Wall -Wextra -std=c++17"

# Default command
CMD ["make", "compile-cpp"]
