@echo off
REM Script to run all implemented algorithms
REM Usage: run_all_implemented.bat [language] [options]

setlocal enabledelayedexpansion

if "%1"=="" (
    echo Usage: run_all_implemented.bat [language] [options]
    echo.
    echo Languages:
    echo   python    - Run Python implementations
    echo   java      - Run Java implementations
    echo   js        - Run JavaScript implementations
    echo   all       - Run all implementations
    echo.
    echo Options:
    echo   --test         - Run test cases
    echo   --benchmark    - Run performance benchmark
    echo   --help         - Show this help message
    goto :end
)

set LANGUAGE=%1
set OPTION=%2

echo ========================================
echo Algorithm Collection - Run All Implemented
echo ========================================
echo Language: %LANGUAGE%
echo Option: %OPTION%
echo ========================================
echo.

if "%LANGUAGE%"=="python" (
    echo Running Python implementations...
    echo.
    echo --- Sorting Algorithms ---
    python Sorting_Algorithms\Python\bubble_sort.py
    echo.
    echo --- Search Algorithms ---
    python Search_Algorithms\Python\binary_search.py
    echo.
    echo --- Graph Algorithms ---
    python Graph_Algorithms\Python\dijkstra.py
    echo.
    echo --- Dynamic Programming ---
    python Dynamic_Programming\Python\fibonacci_sequence.py
    echo.
    echo --- Greedy Algorithms ---
    python Greedy_Algorithms\Python\huffman_coding.py
    echo.
    echo --- Mathematical Algorithms ---
    python Mathematical_Algorithms\Python\euclidean_algorithm.py
    echo.
    echo --- Cryptographic Algorithms ---
    python Cryptographic_and_Compression_Algorithms\Python\rsa_algorithm.py
    echo.
    echo --- String Algorithms ---
    python String_Algorithms\Python\kmp_algorithm.py
    echo.
    echo --- Other Algorithms ---
    python Other_Algorithms\Python\backtracking.py
    echo.
) else if "%LANGUAGE%"=="java" (
    echo Running Java implementations...
    echo.
    echo --- Sorting Algorithms ---
    call scripts\run_java.bat bubble_sort
    call scripts\run_java.bat quick_sort
    call scripts\run_java.bat merge_sort
    call scripts\run_java.bat heap_sort
    echo.
    echo --- Search Algorithms ---
    call scripts\run_java.bat binary_search
    call scripts\run_java.bat linear_search
    echo.
    echo --- Graph Algorithms ---
    call scripts\run_java.bat dijkstra
    echo.
) else if "%LANGUAGE%"=="js" (
    echo Running JavaScript implementations...
    echo.
    echo --- Sorting Algorithms ---
    call scripts\run_js.bat bubble_sort
    call scripts\run_js.bat quick_sort
    call scripts\run_js.bat merge_sort
    call scripts\run_js.bat heap_sort
    echo.
    echo --- Search Algorithms ---
    call scripts\run_js.bat binary_search
    call scripts\run_js.bat linear_search
    echo.
    echo --- Graph Algorithms ---
    call scripts\run_js.bat dijkstra
    echo.
) else if "%LANGUAGE%"=="all" (
    echo Running all language implementations...
    echo.
    echo --- Python Implementation ---
    call %0 python
    echo.
    echo --- Java Implementation ---
    call %0 java
    echo.
    echo --- JavaScript Implementation ---
    call %0 js
    echo.
) else (
    echo Error: Language '%LANGUAGE%' not supported
    echo Supported languages: python, java, js, all
)

:end
echo.
echo ========================================
echo Execution completed!
echo ========================================
pause
