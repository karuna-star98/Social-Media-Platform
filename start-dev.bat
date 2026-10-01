@echo off
setlocal
cd /d "%~dp0"

echo Installing root dependencies...
call npm.cmd install
if errorlevel 1 goto :error

echo Installing server dependencies...
call npm.cmd --prefix server install
if errorlevel 1 goto :error

echo Installing client dependencies...
call npm.cmd --prefix client install
if errorlevel 1 goto :error

echo.
echo Starting ConnectSphere...
call npm.cmd run dev
goto :eof

:error
echo.
echo Setup failed. Check the command above, your Node.js installation, and internet access to npm.
exit /b 1
