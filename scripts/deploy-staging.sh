#!/usr/bin/env bash
# Build, upload and restart staging. One command, no sudo.
#
# The restart is a kill rather than `systemctl restart`, because that needs
# root — and the unit is Restart=always running as jcharles, so signalling the
# process is enough: systemd brings it straight back on the new bundle.
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="jcharles@129.121.85.164"

./scripts/build-staging.sh
echo "==> uploading"
scp -o BatchMode=yes staging-bundle.tgz "$HOST:~/staging-bundle.tgz"

echo "==> swapping and restarting"
ssh -o BatchMode=yes "$HOST" '
  set -e
  rm -rf ~/dbb.new && mkdir -p ~/dbb.new
  tar xzf ~/staging-bundle.tgz -C ~/dbb.new 2>/dev/null
  test -f ~/dbb.new/server.js || { echo "bad bundle, not swapping"; exit 1; }
  rm -rf ~/dbb.old && mv ~/dbb ~/dbb.old && mv ~/dbb.new ~/dbb
  kill "$(systemctl show dbb -p MainPID --value)" 2>/dev/null || true
  sleep 8
  systemctl is-active dbb
  rm -rf ~/dbb.old
'
echo "==> live check"
for r in / /about /pricing /faq /contact; do
  printf "  %-10s %s\n" "$r" "$(curl -s -o /dev/null -w '%{http_code}' -m 25 "https://staging.databasebuilder.com$r")"
done
echo "  robots: $(curl -s -m 15 https://staging.databasebuilder.com/robots.txt | tr '\n' ' ')"
