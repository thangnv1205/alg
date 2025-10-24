#!/bin/bash
# Script to show the new directory structure
# Usage: ./show_structure.sh

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

print_color $PURPLE "========================================"
print_color $PURPLE "Algorithm Collection - Directory Structure"
print_color $PURPLE "========================================"
echo

print_color $BLUE "Current directory structure:"
echo

# Function to show directory structure
show_structure() {
    local dir=$1
    local prefix=$2
    
    if [ -d "$dir" ]; then
        print_color $GREEN "$prefix[$(basename "$dir")]"
        
        # Show language directories
        for lang_dir in "$dir"/*/; do
            if [ -d "$lang_dir" ]; then
                local lang_name=$(basename "$lang_dir")
                print_color $YELLOW "$prefix├── [$lang_name]"
                
                # Show files in language directory
                local file_count=0
                for file in "$lang_dir"*; do
                    if [ -f "$file" ]; then
                        local filename=$(basename "$file")
                        print_color $CYAN "$prefix│   ├── $filename"
                        ((file_count++))
                    fi
                done
                
                if [ $file_count -eq 0 ]; then
                    print_color $RED "$prefix│   └── (empty)"
                fi
            fi
        done
        echo
    fi
}

# Show structure for each algorithm category
for algorithm_dir in */; do
    if [ -d "$algorithm_dir" ] && [ "$algorithm_dir" != "scripts/" ] && [ "$algorithm_dir" != "build/" ]; then
        show_structure "$algorithm_dir" ""
    fi
done

print_color $PURPLE "========================================"
print_color $GREEN "Structure completed!"
print_color $PURPLE "========================================"
