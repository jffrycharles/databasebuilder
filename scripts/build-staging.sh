#!/usr/bin/env bash
# Build a self-contained Linux bundle for the VPS, on your Mac.
#
# The VPS is 2 GB / 1 vCPU. A Next build peaks around 740 MB resident and a
# full node_modules is ~630 MB on Linux, so neither the build nor `npm ci`
# belongs on that box. This produces one tarball you upload and run.
#
#   ./scripts/build-staging.sh                         # staging (noindex)
#   SITE_URL=https://databasebuilder.com NOINDEX=0 \
#     ./scripts/build-staging.sh                       # production
#
# Output: staging-bundle.tgz  (~90 MB)

set -euo pipefail
cd "$(dirname "$0")/.."

SITE_URL="${SITE_URL:-https://staging.databasebuilder.com}"
NOINDEX="${NOINDEX:-1}"
OUT="staging-bundle.tgz"

# These MUST exist before the build. Every page, robots.txt and sitemap.xml are
# prerendered, so a value supplied at runtime instead arrives too late and the
# deploy silently serves "Allow: /" with production canonicals.
printf 'NEXT_PUBLIC_SITE_URL="%s"\nNEXT_PUBLIC_NOINDEX="%s"\n' "$SITE_URL" "$NOINDEX" > .env.local
echo "==> building for $SITE_URL (noindex=$NOINDEX)"

rm -rf .next "$OUT"
npm run build

# `output: "standalone"` traces only the node_modules the app reaches, but it
# does not copy these two — Next expects the host to place them.
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# sharp is a native binary and the one thing that cannot be built on a Mac for
# a Linux server. Fetch the linux-x64 build into a scratch dir and copy only
# the packages across; running npm inside .next/standalone would re-install the
# entire dependency tree and quadruple the bundle.
echo "==> fetching linux-x64 sharp"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
( cd "$TMP" && npm init -y >/dev/null 2>&1 \
  && npm install --cpu=x64 --os=linux --libc=glibc --no-audit --no-fund sharp >/dev/null 2>&1 )
mkdir -p .next/standalone/node_modules/@img
cp -r "$TMP/node_modules/sharp" .next/standalone/node_modules/
for pkg in colour sharp-linux-x64 sharp-libvips-linux-x64; do
  [ -d "$TMP/node_modules/@img/$pkg" ] && cp -r "$TMP/node_modules/@img/$pkg" .next/standalone/node_modules/@img/
done

tar czf "$OUT" -C .next/standalone .
echo "==> $OUT  $(du -h "$OUT" | cut -f1)"
echo "    scp $OUT <user>@<server>:~/"
