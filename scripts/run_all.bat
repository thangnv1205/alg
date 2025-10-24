@echo off
REM Master script to run all algorithms in different languages
REM Usage: run_all.bat [language] [algorithm] [options]

setlocal enabledelayedexpansion

if "%1"=="" (
    echo Usage: run_all.bat [language] [algorithm] [options]
    echo.
    echo Languages:
    echo   python    - Run Python implementations
    echo   java      - Run Java implementations
    echo   js        - Run JavaScript implementations
    echo   all       - Run all implementations
    echo.
    echo Algorithms:
    echo   bubble_sort    - Bubble Sort algorithm
    echo   quick_sort     - Quick Sort algorithm
    echo   merge_sort     - Merge Sort algorithm
    echo   heap_sort      - Heap Sort algorithm
    echo   binary_search  - Binary Search algorithm
    echo   all           - Run all algorithms
    echo.
    echo Options:
    echo   --test         - Run test cases
    echo   --benchmark    - Run performance benchmark
    echo   --help         - Show this help message
    goto :end
)

set LANGUAGE=%1
set ALGORITHM=%2
set OPTION=%3

REM Set paths
set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..

echo ========================================
echo Algorithm Collection - Master Runner
echo ========================================
echo Language: %LANGUAGE%
echo Algorithm: %ALGORITHM%
echo Option: %OPTION%
echo ========================================
echo.

if "%LANGUAGE%"=="python" (
    echo Running Python implementation...
    if "%ALGORITHM%"=="bubble_sort" (
        python "%PROJECT_ROOT%\Sorting_Algorithms\Python\bubble_sort.py"
    ) else if "%ALGORITHM%"=="all" (
        echo Running all Python algorithms...
        for %%f in ("%PROJECT_ROOT%\Sorting_Algorithms\Python\*.py") do (
            echo Running %%f...
            python "%%f"
            echo.
        )
    ) else (
        echo Algorithm %ALGORITHM% not implemented in Python yet
    )
) else if "%LANGUAGE%"=="java" (
    echo Running Java implementation...
    call "%SCRIPT_DIR%\run_java.bat" %ALGORITHM% %OPTION%
) else if "%LANGUAGE%"=="js" (
    echo Running JavaScript implementation...
    call "%SCRIPT_DIR%\run_js.bat" %ALGORITHM% %OPTION%
) else if "%LANGUAGE%"=="all" (
    echo Running all language implementations...
    echo.
    echo --- Python Implementation ---
    if "%ALGORITHM%"=="bubble_sort" (
        python "%PROJECT_ROOT%\Sorting_Algorithms\Python\bubble_sort.py"
    ) else (
        echo Python implementation for %ALGORITHM% not available
    )
    echo.
    echo --- Java Implementation ---
    call "%SCRIPT_DIR%\run_java.bat" %ALGORITHM% %OPTION%
    echo.
    echo --- JavaScript Implementation ---
    call "%SCRIPT_DIR%\run_js.bat" %ALGORITHM% %OPTION%
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
