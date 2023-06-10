BACKEND="python3 backend/main.py"
WEBSITE="yarn workspace @workingsoftware2023/website dev"

killall ${BACKEND} 2>/dev/null
killall ${WEBSITE} 2>/dev/null

(trap 'kill 0' SIGINT; ${BACKEND} & ${WEBSITE})