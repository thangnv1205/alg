#!/bin/bash
# Script to run all implemented algorithms
# Usage: ./run_all_implemented.sh [language] [options]

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
    print_color $BLUE "Usage: $0 [language] [options]"
    echo
    print_color $YELLOW "Languages:"
    echo "  python    - Run Python implementations"
    echo "  java      - Run Java implementations"
    echo "  js        - Run JavaScript implementations"
    echo "  all       - Run all implementations"
    echo
    print_color $YELLOW "Options:"
    echo "  --test         - Run test cases"
    echo "  --benchmark    - Run performance benchmark"
    echo "  --help         - Show this help message"
}

# Function to run Python implementations
run_python() {
    print_color $GREEN "Running Python implementations..."
    echo
    
    print_color $CYAN "--- Sorting Algorithms ---"
    python3 Sorting_Algorithms/Python/bubble_sort.py
    echo
    
    print_color $CYAN "--- Search Algorithms ---"
    python3 Search_Algorithms/Python/binary_search.py
    echo
    
    print_color $CYAN "--- Graph Algorithms ---"
    python3 Graph_Algorithms/Python/dijkstra.py
    echo
    
    print_color $CYAN "--- Dynamic Programming ---"
    python3 Dynamic_Programming/Python/fibonacci_sequence.py
    echo
    
    print_color $CYAN "--- Greedy Algorithms ---"
    python3 Greedy_Algorithms/Python/huffman_coding.py
    echo
    
    print_color $CYAN "--- Mathematical Algorithms ---"
    python3 Mathematical_Algorithms/Python/euclidean_algorithm.py
    echo
    
    print_color $CYAN "--- Cryptographic Algorithms ---"
    python3 Cryptographic_and_Compression_Algorithms/Python/rsa_algorithm.py
    echo
    
    print_color $CYAN "--- String Algorithms ---"
    python3 String_Algorithms/Python/kmp_algorithm.py
    echo
    
    print_color $CYAN "--- Other Algorithms ---"
    python3 Other_Algorithms/Python/backtracking.py
    echo
}

# Function to run Java implementations
run_java() {
    print_color $GREEN "Running Java implementations..."
    echo
    
    print_color $CYAN "--- Sorting Algorithms ---"
    ./scripts/run_java.sh bubble_sort
    ./scripts/run_java.sh quick_sort
    ./scripts/run_java.sh merge_sort
    ./scripts/run_java.sh heap_sort
    echo
    
    print_color $CYAN "--- Search Algorithms ---"
    ./scripts/run_java.sh binary_search
    ./scripts/run_java.sh linear_search
    echo
    
    print_color $CYAN "--- Graph Algorithms ---"
    ./scripts/run_java.sh dijkstra
    echo
}

# Function to run JavaScript implementations
run_js() {
    print_color $GREEN "Running JavaScript implementations..."
    echo
    
    print_color $CYAN "--- Sorting Algorithms ---"
    ./scripts/run_js.sh bubble_sort
    ./scripts/run_js.sh quick_sort
    ./scripts/run_js.sh merge_sort
    ./scripts/run_js.sh heap_sort
    echo
    
    print_color $CYAN "--- Search Algorithms ---"
    ./scripts/run_js.sh binary_search
    ./scripts/run_js.sh linear_search
    echo
    
    print_color $CYAN "--- Graph Algorithms ---"
    ./scripts/run_js.sh dijkstra
    echo
}

# Main script
if [ $# -eq 0 ]; then
    show_usage
    exit 1
fi

LANGUAGE=$1
OPTION=$2

# Print header
print_color $PURPLE "========================================"
print_color $PURPLE "Algorithm Collection - Run All Implemented"
print_color $PURPLE "========================================"
print_color $BLUE "Language: $LANGUAGE"
print_color $BLUE "Option: $OPTION"
print_color $PURPLE "========================================"
echo

# Run based on language
case $LANGUAGE in
    "python")
        run_python
        ;;
    "java")
        run_java
        ;;
    "js")
        run_js
        ;;
    "all")
        print_color $CYAN "Running all language implementations..."
        echo
        print_color $YELLOW "--- Python Implementation ---"
        run_python
        echo
        print_color $YELLOW "--- Java Implementation ---"
        run_java
        echo
        print_color $YELLOW "--- JavaScript Implementation ---"
        run_js
        echo
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
