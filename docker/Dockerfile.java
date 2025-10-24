# Java Environment Dockerfile
FROM openjdk:17-jdk-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    maven \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Create build directories
RUN mkdir -p build test-results benchmark-results

# Set environment variables
ENV JAVA_HOME="/usr/local/openjdk-17"
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Compile Java files
RUN find . -name "*.java" -exec javac -d build {} \;

# Default command
CMD ["java", "-cp", "build", "Main"]
