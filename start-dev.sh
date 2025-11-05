#!/usr/bin/env bash
# Install dependencies if node_modules is missing then start dev server
set -e

if [ ! -d node_modules ]; then
  echo "Installing dependencies…"
  npm install
fi

exec npm run dev