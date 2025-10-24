#!/bin/bash
# Script to compile and run Java algorithms
# Usage: ./run_java.sh [algorithm_name] [options]

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to show usage
show_usage() {
    print_color $BLUE "Usage: $0 [algorithm_name] [options]"
    echo
    print_color $YELLOW "Available algorithms:"
    echo "  bubble_sort    - Bubble Sort algorithm"
    echo "  quick_sort     - Quick Sort algorithm"
    echo "  merge_sort     - Merge Sort algorithm"
    echo "  heap_sort      - Heap Sort algorithm"
    echo "  binary_search  - Binary Search algorithm"
    echo
    print_color $YELLOW "Options:"
    echo "  --test         - Run test cases"
    echo "  --benchmark    - Run performance benchmark"
    echo "  --help         - Show this help message"
}

# Check if Java is installed
check_java() {
    if ! command -v java &> /dev/null; then
        print_color $RED "Error: Java is not installed or not in PATH"
        print_color $YELLOW "Please install Java JDK and add it to your PATH"
        exit 1
    fi
    
    if ! command -v javac &> /dev/null; then
        print_color $RED "Error: Java compiler (javac) is not installed"
        print_color $YELLOW "Please install Java JDK"
        exit 1
    fi
}

# Main script
if [ $# -eq 0 ]; then
    show_usage
    exit 1
fi

ALGORITHM=$1
OPTION=$2

# Check Java installation
check_java

# Set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$SCRIPT_DIR/../Sorting_Algorithms/Java"
BUILD_DIR="$SCRIPT_DIR/../build"
CLASS_DIR="$BUILD_DIR/classes"

# Create build directory if it doesn't exist
mkdir -p "$BUILD_DIR"
mkdir -p "$CLASS_DIR"

# Compile Java files
print_color $BLUE "Compiling Java files..."
javac -d "$CLASS_DIR" "$SRC_DIR"/*.java
if [ $? -ne 0 ]; then
    print_color $RED "Error: Compilation failed"
    exit 1
fi

# Run the specified algorithm
print_color $GREEN "Running $ALGORITHM..."
cd "$CLASS_DIR"

case $ALGORITHM in
    "bubble_sort")
        if [ "$OPTION" = "--test" ] || [ "$OPTION" = "--benchmark" ]; then
            java BubbleSort
        else
            java BubbleSort
        fi
        ;;
    "quick_sort")
        print_color $YELLOW "Quick Sort implementation coming soon..."
        ;;
    "merge_sort")
        print_color $YELLOW "Merge Sort implementation coming soon..."
        ;;
    "heap_sort")
        print_color $YELLOW "Heap Sort implementation coming soon..."
        ;;
    "binary_search")
        print_color $YELLOW "Binary Search implementation coming soon..."
        ;;
    *)
        print_color $RED "Error: Algorithm '$ALGORITHM' not found"
        print_color $YELLOW "Available algorithms: bubble_sort, quick_sort, merge_sort, heap_sort, binary_search"
        exit 1
        ;;
esac

print_color $GREEN "Execution completed successfully!"
