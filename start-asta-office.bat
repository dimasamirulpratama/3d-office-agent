@echo off
title Asta Office — 3D Workspace for Hermes Agent (Lysta)
echo ====================================================
echo       Starting Asta Office 3D Workspace for Hermes Agent
echo ====================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Hermes Gateway Adapter on ws://localhost:18789...
start "Hermes Adapter (9Router)" cmd /k "npm run hermes-adapter"

echo [2/2] Starting Asta Office Web Studio on http://localhost:3001...
start "Asta Office Web Studio" cmd /k "npx next dev -p 3001"

echo.
echo ====================================================
echo Asta Office is online!
echo Web Studio : http://localhost:3001
echo WebSocket  : ws://localhost:18789 (Hermes + 9Router)
echo ====================================================
pause
