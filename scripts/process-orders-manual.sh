#!/bin/bash

# Manual Square Order Processing Script
# Run this script to immediately process any pending orders

# Set script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Change to project directory
cd "$PROJECT_DIR"

# Load environment variables from .env if present
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Set log file
LOG_FILE="$PROJECT_DIR/sync_cron.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Function to log messages
log_message() {
    echo "[$TIMESTAMP] MANUAL PROCESSING: $1" | tee -a "$LOG_FILE"
}

# Check if required environment variables are set
if [ -z "$SQUARE_POLL_KEY" ]; then
    log_message "ERROR: SQUARE_POLL_KEY environment variable is not set"
    exit 1
fi

if [ -z "$NEXT_PUBLIC_BASE_URL" ]; then
    log_message "WARNING: NEXT_PUBLIC_BASE_URL not set, using localhost"
    export NEXT_PUBLIC_BASE_URL="http://localhost:3000"
fi

# Start processing
log_message "Starting MANUAL Square order processing..."

# Call the poll-square API endpoint
RESPONSE=$(curl -s -w "\n%{http_code}" \
    -H "Content-Type: application/json" \
    "$NEXT_PUBLIC_BASE_URL/api/poll-square?token=$SQUARE_POLL_KEY")

# Extract HTTP status code and response body
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')

# Log the response
log_message "HTTP Status: $HTTP_CODE"
log_message "Response: $RESPONSE_BODY"

# Check if the request was successful
if [ "$HTTP_CODE" -eq 200 ]; then
    # Parse the JSON response to get processed count
    PROCESSED=$(echo "$RESPONSE_BODY" | grep -o '"processed":[0-9]*' | cut -d':' -f2)
    ERROR_COUNT=$(echo "$RESPONSE_BODY" | grep -o '"errors":\[[^]]*\]' | grep -o '\[.*\]' | jq 'length' 2>/dev/null || echo "0")
    
    if [ -n "$PROCESSED" ] && [ "$PROCESSED" -gt 0 ]; then
        log_message "SUCCESS: Manually processed $PROCESSED new orders"
    else
        log_message "INFO: No new orders to process manually"
    fi
    
    if [ "$ERROR_COUNT" -gt 0 ]; then
        log_message "WARNING: $ERROR_COUNT errors encountered during manual processing"
    fi
else
    log_message "ERROR: Manual API request failed with status $HTTP_CODE"
    log_message "Response: $RESPONSE_BODY"
    exit 1
fi

log_message "Manual Square order processing completed" 