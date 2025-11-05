@echo off
REM Install dependencies if node_modules is missing then start dev server
IF NOT EXIST node_modules (
  echo Installing dependencies…
  npm install
)
npm run dev