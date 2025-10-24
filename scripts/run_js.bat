@echo off
REM Script to run JavaScript algorithms
REM Usage: run_js.bat [algorithm_name] [options]

setlocal enabledelayedexpansion

if "%1"=="" (
    echo Usage: run_js.bat [algorithm_name] [options]
    echo.
    echo Available algorithms:
    echo   bubble_sort    - Bubble Sort algorithm
    echo   quick_sort     - Quick Sort algorithm
    echo   merge_sort     - Merge Sort algorithm
    echo   heap_sort      - Heap Sort algorithm
    echo   binary_search  - Binary Search algorithm
    echo   linear_search  - Linear Search algorithm
    echo   dijkstra       - Dijkstra algorithm
    echo.
    echo Options:
    echo   --test         - Run test cases
    echo   --benchmark    - Run performance benchmark
    echo   --help         - Show this help message
    goto :end
)

set ALGORITHM=%1
set OPTION=%2

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js and add it to your PATH
    goto :end
)

REM Set paths based on algorithm type
if "%ALGORITHM%"=="bubble_sort" set SRC_DIR=%~dp0..\Sorting_Algorithms\JavaScript
if "%ALGORITHM%"=="quick_sort" set SRC_DIR=%~dp0..\Sorting_Algorithms\JavaScript
if "%ALGORITHM%"=="merge_sort" set SRC_DIR=%~dp0..\Sorting_Algorithms\JavaScript
if "%ALGORITHM%"=="heap_sort" set SRC_DIR=%~dp0..\Sorting_Algorithms\JavaScript
if "%ALGORITHM%"=="binary_search" set SRC_DIR=%~dp0..\Search_Algorithms\JavaScript
if "%ALGORITHM%"=="linear_search" set SRC_DIR=%~dp0..\Search_Algorithms\JavaScript
if "%ALGORITHM%"=="dijkstra" set SRC_DIR=%~dp0..\Graph_Algorithms\JavaScript

REM Run the specified algorithm
echo Running %ALGORITHM%...

if "%ALGORITHM%"=="bubble_sort" (
    if "%OPTION%"=="--test" (
        node "%SRC_DIR%\bubble_sort.js"
    ) else if "%OPTION%"=="--benchmark" (
        node "%SRC_DIR%\bubble_sort.js"
    ) else (
        node "%SRC_DIR%\bubble_sort.js"
    )
) else if "%ALGORITHM%"=="quick_sort" (
    if "%OPTION%"=="--test" (
        node "%SRC_DIR%\quick_sort.js"
    ) else if "%OPTION%"=="--benchmark" (
        node "%SRC_DIR%\quick_sort.js"
    ) else (
        node "%SRC_DIR%\quick_sort.js"
    )
) else if "%ALGORITHM%"=="merge_sort" (
    if "%OPTION%"=="--test" (
        node "%SRC_DIR%\merge_sort.js"
    ) else if "%OPTION%"=="--benchmark" (
        node "%SRC_DIR%\merge_sort.js"
    ) else (
        node "%SRC_DIR%\merge_sort.js"
    )
) else if "%ALGORITHM%"=="heap_sort" (
    if "%OPTION%"=="--test" (
        node "%SRC_DIR%\heap_sort.js"
    ) else if "%OPTION%"=="--benchmark" (
        node "%SRC_DIR%\heap_sort.js"
    ) else (
        node "%SRC_DIR%\heap_sort.js"
    )
) else if "%ALGORITHM%"=="binary_search" (
    if "%OPTION%"=="--test" (
        node "%SRC_DIR%\binary_search.js"
    ) else if "%OPTION%"=="--benchmark" (
        node "%SRC_DIR%\binary_search.js"
    ) else (
        node "%SRC_DIR%\binary_search.js"
    )
) else if "%ALGORITHM%"=="linear_search" (
    if "%OPTION%"=="--test" (
        node "%SRC_DIR%\linear_search.js"
    ) else if "%OPTION%"=="--benchmark" (
        node "%SRC_DIR%\linear_search.js"
    ) else (
        node "%SRC_DIR%\linear_search.js"
    )
) else if "%ALGORITHM%"=="dijkstra" (
    if "%OPTION%"=="--test" (
        node "%SRC_DIR%\dijkstra.js"
    ) else if "%OPTION%"=="--benchmark" (
        node "%SRC_DIR%\dijkstra.js"
    ) else (
        node "%SRC_DIR%\dijkstra.js"
    )
) else (
    echo Error: Algorithm '%ALGORITHM%' not found
    echo Available algorithms: bubble_sort, quick_sort, merge_sort, heap_sort, binary_search, linear_search, dijkstra
)

:end
pause
