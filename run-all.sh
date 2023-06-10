IDENTITY="python3 services/identity/main.py"
PROFILE="python3 services/profile/main.py"
CONTENT="yarn workspace @workingsoftware2023/content start"
PRICE="yarn workspace @workingsoftware2023/price start"
OMS="yarn workspace @workingsoftware2023/oms start"
ACCOUNTING="yarn workspace @workingsoftware2023/accounting start"
WEBSITE="yarn workspace @workingsoftware2023/website dev"

killall ${IDENTITY} 2>/dev/null
killall ${PROFILE} 2>/dev/null
killall ${CONTENT} 2>/dev/null
killall ${PRICE} 2>/dev/null
killall ${OMS} 2>/dev/null
killall ${ACCOUNTING} 2>/dev/null
killall ${WEBSITE} 2>/dev/null

(trap 'kill 0' SIGINT; ${CONTENT} & ${PRICE} & ${OMS} & ${ACCOUNTING} & ${IDENTITY} & ${PROFILE} & ${WEBSITE})
