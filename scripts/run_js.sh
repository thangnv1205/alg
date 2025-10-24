#!/bin/bash
# Script to run JavaScript algorithms
# Usage: ./run_js.sh [algorithm_name] [options]

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

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_color $RED "Error: Node.js is not installed or not in PATH"
        print_color $YELLOW "Please install Node.js and add it to your PATH"
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

# Check Node.js installation
check_node

# Set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$SCRIPT_DIR/../Sorting_Algorithms/JavaScript"

# Run the specified algorithm
print_color $GREEN "Running $ALGORITHM..."

case $ALGORITHM in
    "bubble_sort")
        if [ "$OPTION" = "--test" ] || [ "$OPTION" = "--benchmark" ]; then
            node "$SRC_DIR/bubble_sort.js"
        else
            node "$SRC_DIR/bubble_sort.js"
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
