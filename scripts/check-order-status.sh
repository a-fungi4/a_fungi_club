#!/bin/bash

# Check Order Processing Status Script
# Shows recent activity and system status

# Set script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Change to project directory
cd "$PROJECT_DIR"

# Set log file
LOG_FILE="$PROJECT_DIR/sync_cron.log"

echo "=== ORDER PROCESSING STATUS ==="
echo "Timestamp: $(date)"
echo ""

# Check if log file exists
if [ -f "$LOG_FILE" ]; then
    echo "=== RECENT LOG ACTIVITY (last 10 entries) ==="
    tail -10 "$LOG_FILE"
    echo ""
    
    echo "=== TOTAL LOG ENTRIES ==="
    wc -l "$LOG_FILE"
    echo ""
    
    echo "=== LAST SUCCESSFUL PROCESSING ==="
    grep "SUCCESS" "$LOG_FILE" | tail -1
    echo ""
    
    echo "=== LAST ERROR ==="
    grep "ERROR" "$LOG_FILE" | tail -1
    echo ""
else
    echo "No log file found at $LOG_FILE"
    echo ""
fi

# Check cache file
CACHE_FILE="$PROJECT_DIR/printful-orders-cache.json"
if [ -f "$CACHE_FILE" ]; then
    echo "=== PROCESSED ORDERS CACHE ==="
    echo "Cache file size: $(wc -c < "$CACHE_FILE") bytes"
    echo "Cached order IDs:"
    cat "$CACHE_FILE" | jq -r '.[]' 2>/dev/null || echo "No orders in cache"
    echo ""
else
    echo "No cache file found"
    echo ""
fi

# Check if server is running
echo "=== SERVER STATUS ==="
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Server is running on localhost:3000"
else
    echo "❌ Server is not running on localhost:3000"
fi

echo ""
echo "=== QUICK ACTIONS ==="
echo "1. Run manual processing: ./scripts/process-orders-manual.sh"
echo "2. View full logs: tail -f $LOG_FILE"
echo "3. Update cron to run every 2 minutes: crontab cron-config.txt" 