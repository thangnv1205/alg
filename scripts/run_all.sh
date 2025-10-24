#!/bin/bash
# Master script to run all algorithms in different languages
# Usage: ./run_all.sh [language] [algorithm] [options]

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to show usage
show_usage() {
    print_color $BLUE "Usage: $0 [language] [algorithm] [options]"
    echo
    print_color $YELLOW "Languages:"
    echo "  python    - Run Python implementations"
    echo "  java      - Run Java implementations"
    echo "  js        - Run JavaScript implementations"
    echo "  all       - Run all implementations"
    echo
    print_color $YELLOW "Algorithms:"
    echo "  bubble_sort    - Bubble Sort algorithm"
    echo "  quick_sort     - Quick Sort algorithm"
    echo "  merge_sort     - Merge Sort algorithm"
    echo "  heap_sort      - Heap Sort algorithm"
    echo "  binary_search  - Binary Search algorithm"
    echo "  all           - Run all algorithms"
    echo
    print_color $YELLOW "Options:"
    echo "  --test         - Run test cases"
    echo "  --benchmark    - Run performance benchmark"
    echo "  --help         - Show this help message"
}

# Function to run Python implementation
run_python() {
    local algorithm=$1
    local option=$2
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local project_root="$script_dir/.."
    
    print_color $GREEN "Running Python implementation..."
    
    case $algorithm in
        "bubble_sort")
            python3 "$project_root/Sorting_Algorithms/Python/bubble_sort.py"
            ;;
        "all")
            print_color $CYAN "Running all Python algorithms..."
            for file in "$project_root"/Sorting_Algorithms/Python/*.py; do
                if [ -f "$file" ]; then
                    print_color $YELLOW "Running $(basename "$file")..."
                    python3 "$file"
                    echo
                fi
            done
            ;;
        *)
            print_color $YELLOW "Algorithm $algorithm not implemented in Python yet"
            ;;
    esac
}

# Function to run Java implementation
run_java() {
    local algorithm=$1
    local option=$2
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    print_color $GREEN "Running Java implementation..."
    "$script_dir/run_java.sh" "$algorithm" "$option"
}

# Function to run JavaScript implementation
run_js() {
    local algorithm=$1
    local option=$2
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    print_color $GREEN "Running JavaScript implementation..."
    "$script_dir/run_js.sh" "$algorithm" "$option"
}

# Main script
if [ $# -eq 0 ]; then
    show_usage
    exit 1
fi

LANGUAGE=$1
ALGORITHM=$2
OPTION=$3

# Print header
print_color $PURPLE "========================================"
print_color $PURPLE "Algorithm Collection - Master Runner"
print_color $PURPLE "========================================"
print_color $BLUE "Language: $LANGUAGE"
print_color $BLUE "Algorithm: $ALGORITHM"
print_color $BLUE "Option: $OPTION"
print_color $PURPLE "========================================"
echo

# Run based on language
case $LANGUAGE in
    "python")
        run_python "$ALGORITHM" "$OPTION"
        ;;
    "java")
        run_java "$ALGORITHM" "$OPTION"
        ;;
    "js")
        run_js "$ALGORITHM" "$OPTION"
        ;;
    "all")
        print_color $CYAN "Running all language implementations..."
        echo
        print_color $YELLOW "--- Python Implementation ---"
        run_python "$ALGORITHM" "$OPTION"
        echo
        print_color $YELLOW "--- Java Implementation ---"
        run_java "$ALGORITHM" "$OPTION"
        echo
        print_color $YELLOW "--- JavaScript Implementation ---"
        run_js "$ALGORITHM" "$OPTION"
        ;;
    *)
        print_color $RED "Error: Language '$LANGUAGE' not supported"
        print_color $YELLOW "Supported languages: python, java, js, all"
        exit 1
        ;;
esac

print_color $GREEN "========================================"
print_color $GREEN "Execution completed!"
print_color $GREEN "========================================"
