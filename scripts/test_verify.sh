#!/usr/bin/env bash
set -euo pipefail

# Quick tests for the verify endpoint
BASE_URL="http://localhost:3000/api/verify"

echo "1) Demo flow (no signedTxXdr)"
curl -s -X POST "$BASE_URL" -H 'Content-Type: application/json' -d '{"proofHash":14,"noteHash":42}' | sed -n '1,200p'

echo "\n2) Attempt Soroban RPC submit (placeholder XDR)"
curl -s -X POST "$BASE_URL" -H 'Content-Type: application/json' -d '{"proofHash":14,"noteHash":42,"signedTxXdr":"AAAA"}' | sed -n '1,200p'

echo "\nNote: Start the Next.js dev server first: npm run dev"
