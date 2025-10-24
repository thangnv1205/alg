# Makefile for Algorithm Collection
# Usage: make [target]

.PHONY: help install test benchmark clean run-python run-java run-js run-all

# Default target
help:
	@echo "Algorithm Collection - Available Commands"
	@echo "========================================"
	@echo ""
	@echo "Setup:"
	@echo "  install     - Install dependencies"
	@echo "  clean       - Clean build artifacts"
	@echo ""
	@echo "Testing:"
	@echo "  test        - Run all tests"
	@echo "  test-js     - Run JavaScript tests"
	@echo "  test-java   - Run Java tests"
	@echo "  test-python - Run Python tests"
	@echo ""
	@echo "Benchmarking:"
	@echo "  benchmark   - Run all benchmarks"
	@echo "  benchmark-js - Run JavaScript benchmarks"
	@echo ""
	@echo "Running Algorithms:"
	@echo "  run-python  - Run Python implementations"
	@echo "  run-java    - Run Java implementations"
	@echo "  run-js      - Run JavaScript implementations"
	@echo "  run-all     - Run all implementations"
	@echo ""
	@echo "Specific Algorithms:"
	@echo "  bubble-sort - Run bubble sort in all languages"
	@echo "  quick-sort  - Run quick sort in all languages"
	@echo "  merge-sort  - Run merge sort in all languages"
	@echo "  heap-sort   - Run heap sort in all languages"
	@echo "  binary-search - Run binary search in all languages"
	@echo ""
	@echo "Development:"
	@echo "  lint        - Run linter"
	@echo "  format      - Format code"
	@echo "  build       - Build project"

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install
	@echo "Dependencies installed successfully!"

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf build/
	rm -rf dist/
	rm -rf node_modules/
	@echo "Clean completed!"

# Run tests
test: test-js test-java test-python

test-js:
	@echo "Running JavaScript tests..."
	npm run test

test-java:
	@echo "Running Java tests..."
	@if command -v javac >/dev/null 2>&1; then \
		./scripts/run_java.sh bubble_sort --test; \
	else \
		echo "Java not found. Please install Java JDK."; \
	fi

test-python:
	@echo "Running Python tests..."
	@if command -v python3 >/dev/null 2>&1; then \
		python3 Sorting_Algorithms/Python/bubble_sort.py; \
	else \
		echo "Python3 not found. Please install Python 3."; \
	fi

# Run benchmarks
benchmark: benchmark-js

benchmark-js:
	@echo "Running JavaScript benchmarks..."
	npm run benchmark

# Run algorithms
run-python:
	@echo "Running Python implementations..."
	@if command -v python3 >/dev/null 2>&1; then \
		python3 Sorting_Algorithms/Python/bubble_sort.py; \
	else \
		echo "Python3 not found. Please install Python 3."; \
	fi

run-java:
	@echo "Running Java implementations..."
	@if command -v javac >/dev/null 2>&1; then \
		./scripts/run_java.sh bubble_sort; \
	else \
		echo "Java not found. Please install Java JDK."; \
	fi

run-js:
	@echo "Running JavaScript implementations..."
	@if command -v node >/dev/null 2>&1; then \
		./scripts/run_js.sh bubble_sort; \
	else \
		echo "Node.js not found. Please install Node.js."; \
	fi

run-all:
	@echo "Running all implementations..."
	@if command -v python3 >/dev/null 2>&1; then \
		echo "--- Python Implementation ---"; \
		python3 Sorting_Algorithms/Python/bubble_sort.py; \
		echo ""; \
	fi
	@if command -v javac >/dev/null 2>&1; then \
		echo "--- Java Implementation ---"; \
		./scripts/run_java.sh bubble_sort; \
		echo ""; \
	fi
	@if command -v node >/dev/null 2>&1; then \
		echo "--- JavaScript Implementation ---"; \
		./scripts/run_js.sh bubble_sort; \
	fi

# Specific algorithms
bubble-sort:
	@echo "Running Bubble Sort in all languages..."
	@$(MAKE) run-all

quick-sort:
	@echo "Quick Sort implementation coming soon..."

merge-sort:
	@echo "Merge Sort implementation coming soon..."

heap-sort:
	@echo "Heap Sort implementation coming soon..."

binary-search:
	@echo "Binary Search implementation coming soon..."

# Development tools
lint:
	@echo "Running linter..."
	npm run lint

format:
	@echo "Formatting code..."
	npm run format

build: clean install lint test
	@echo "Build completed successfully!"

# Platform-specific targets
ifeq ($(OS),Windows_NT)
    # Windows specific commands
    run-java-windows:
		scripts\run_java.bat bubble_sort
    run-js-windows:
		scripts\run_js.bat bubble_sort
    run-all-windows:
		scripts\run_all.bat all bubble_sort
else
    # Unix/Linux specific commands
    run-java-unix:
		./scripts/run_java.sh bubble_sort
    run-js-unix:
		./scripts/run_js.sh bubble_sort
    run-all-unix:
		./scripts/run_all.sh all bubble_sort
endif
