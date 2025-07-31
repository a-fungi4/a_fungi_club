#!/bin/bash
cd "$(dirname "$0")/../.."
# Load environment variables from .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
node src/scripts/sync_printful_to_square.ts 