@echo off
REM Script to show the new directory structure
REM Usage: show_structure.bat

echo ========================================
echo Algorithm Collection - Directory Structure
echo ========================================
echo.

echo Current directory structure:
echo.

for /d %%d in (*) do (
    if not "%%d"=="scripts" if not "%%d"=="build" (
        echo [%%d]
        for /d %%s in ("%%d\*") do (
            echo   ├── [%%~ns]
            for /f "delims=" %%f in ('dir /b "%%s\*.*" 2^>nul') do (
                echo   │   ├── %%~nf.%%~xf
            )
        )
        echo.
    )
)

echo ========================================
echo Structure completed!
echo ========================================
pause
