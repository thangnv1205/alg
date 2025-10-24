# Scala Environment Dockerfile
FROM openjdk:17-jdk-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    git \
    make \
    && rm -rf /var/lib/apt/lists/*

# Install Scala
RUN wget https://downloads.lightbend.com/scala/2.13.11/scala-2.13.11.tgz \
    && tar -xzf scala-2.13.11.tgz -C /opt \
    && rm scala-2.13.11.tgz

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Create build directories
RUN mkdir -p build test-results benchmark-results

# Set environment variables
ENV SCALA_HOME=/opt/scala-2.13.11
ENV PATH="${SCALA_HOME}/bin:${PATH}"
ENV JAVA_HOME=/usr/local/openjdk-17

# Default command
CMD ["scala", "-version"]
