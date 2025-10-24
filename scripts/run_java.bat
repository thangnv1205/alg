@echo off
REM Script to compile and run Java algorithms
REM Usage: run_java.bat [algorithm_name] [options]

setlocal enabledelayedexpansion

if "%1"=="" (
    echo Usage: run_java.bat [algorithm_name] [options]
    echo.
    echo Available algorithms:
    echo   bubble_sort    - Bubble Sort algorithm
    echo   quick_sort     - Quick Sort algorithm
    echo   merge_sort     - Merge Sort algorithm
    echo   heap_sort      - Heap Sort algorithm
    echo   binary_search  - Binary Search algorithm
    echo.
    echo Options:
    echo   --test         - Run test cases
    echo   --benchmark    - Run performance benchmark
    echo   --help         - Show this help message
    goto :end
)

set ALGORITHM=%1
set OPTION=%2

REM Check if Java is installed
java -version >nul 2>&1
if errorlevel 1 (
    echo Error: Java is not installed or not in PATH
    echo Please install Java JDK and add it to your PATH
    goto :end
)

REM Set paths
set SRC_DIR=%~dp0..\Sorting_Algorithms\Java
set BUILD_DIR=%~dp0..\build
set CLASS_DIR=%BUILD_DIR%\classes

REM Create build directory if it doesn't exist
if not exist "%BUILD_DIR%" mkdir "%BUILD_DIR%"
if not exist "%CLASS_DIR%" mkdir "%CLASS_DIR%"

REM Compile Java files
echo Compiling Java files...
javac -d "%CLASS_DIR%" "%SRC_DIR%\*.java"
if errorlevel 1 (
    echo Error: Compilation failed
    goto :end
)

REM Run the specified algorithm
echo Running %ALGORITHM%...
cd /d "%CLASS_DIR%"

if "%ALGORITHM%"=="bubble_sort" (
    if "%OPTION%"=="--test" (
        java BubbleSort
    ) else if "%OPTION%"=="--benchmark" (
        java BubbleSort
    ) else (
        java BubbleSort
    )
) else if "%ALGORITHM%"=="quick_sort" (
    if "%OPTION%"=="--test" (
        java QuickSort
    ) else if "%OPTION%"=="--benchmark" (
        java QuickSort
    ) else (
        java QuickSort
    )
) else if "%ALGORITHM%"=="merge_sort" (
    if "%OPTION%"=="--test" (
        java MergeSort
    ) else if "%OPTION%"=="--benchmark" (
        java MergeSort
    ) else (
        java MergeSort
    )
) else if "%ALGORITHM%"=="heap_sort" (
    if "%OPTION%"=="--test" (
        java HeapSort
    ) else if "%OPTION%"=="--benchmark" (
        java HeapSort
    ) else (
        java HeapSort
    )
) else if "%ALGORITHM%"=="binary_search" (
    if "%OPTION%"=="--test" (
        java BinarySearch
    ) else if "%OPTION%"=="--benchmark" (
        java BinarySearch
    ) else (
        java BinarySearch
    )
) else if "%ALGORITHM%"=="linear_search" (
    if "%OPTION%"=="--test" (
        java LinearSearch
    ) else if "%OPTION%"=="--benchmark" (
        java LinearSearch
    ) else (
        java LinearSearch
    )
) else if "%ALGORITHM%"=="dijkstra" (
    if "%OPTION%"=="--test" (
        java Dijkstra
    ) else if "%OPTION%"=="--benchmark" (
        java Dijkstra
    ) else (
        java Dijkstra
    )
) else (
    echo Error: Algorithm '%ALGORITHM%' not found
    echo Available algorithms: bubble_sort, quick_sort, merge_sort, heap_sort, binary_search, linear_search, dijkstra
)

:end
pause
