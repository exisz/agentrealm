#!/bin/bash
set -e
BIN="$(dirname "$0")/../bin/agentrealm.js"
TEST_DIR="/tmp/realm-e2e-$$"
REALM="test-realm-e2e"

node "$BIN" new "$REALM" --dir "$TEST_DIR/$REALM"
PROMPT_OUT=$(node "$BIN" prompt "$REALM")
echo "$PROMPT_OUT"

for section in "=== INDEX.md ===" "=== REALM.md ===" "=== TOOLS.md ==="; do
  if echo "$PROMPT_OUT" | grep -qF "$section"; then
    echo "✓ Found: $section"
  else
    echo "FAIL: missing $section"
    exit 1
  fi
done

node "$BIN" ls
node "$BIN" rm "$REALM" --yes
rm -rf "$TEST_DIR"
echo "✓ E2E passed"
