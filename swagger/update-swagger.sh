#!/usr/bin/env bash
# Lädt die in swagger/swagger-ui.version eingetragene Swagger-UI-Version,
# ersetzt swagger/dist und legt danach die eigenen Anpassungen aus swagger/dist_bkp darüber.
# Aufruf: swagger/update-swagger.sh [latest]
set -euo pipefail

SWAGGER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SWAGGER_DIR")"
VERSION_FILE="$SWAGGER_DIR/swagger-ui.version"
HASH_FILE="$SWAGGER_DIR/.upstream-hashes"
BKP_DIR="$SWAGGER_DIR/dist_bkp"
DIST_DIR="$SWAGGER_DIR/dist"

if [[ "${1:-}" == "latest" ]]; then
  curl -sfL https://api.github.com/repos/swagger-api/swagger-ui/releases/latest | jq -r .tag_name > "$VERSION_FILE"
fi

VERSION="$(tr -d '[:space:]' < "$VERSION_FILE")"
echo "Swagger UI $VERSION"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

(cd "$TMP" && npm pack "swagger-ui-dist@${VERSION#v}" --silent >/dev/null && tar xzf ./*.tgz)
UPSTREAM="$TMP/package"

# Änderungen an den Originalen erkennen, die wir überschreiben
NEW_HASHES="$(cd "$UPSTREAM" && sha256sum index.html swagger-initializer.js)"
if [[ -f "$HASH_FILE" && "$NEW_HASHES" != "$(cat "$HASH_FILE")" ]]; then
  echo "WARNUNG: index.html oder swagger-initializer.js haben sich upstream geändert - dist_bkp prüfen!" >&2
fi
echo "$NEW_HASHES" > "$HASH_FILE"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"
# package.json, README etc. gehören nicht ins dist
(cd "$UPSTREAM" && find . -maxdepth 1 -type f \( -name '*.js' -o -name '*.map' -o -name '*.css' -o -name '*.png' -o -name '*.html' \) -exec cp {} "$DIST_DIR/" \;)
rm -f "$DIST_DIR/index.html"

cp "$BKP_DIR"/* "$DIST_DIR/"
mv "$DIST_DIR/index.html" "$ROOT_DIR/index.html"

echo "Fertig: $DIST_DIR aktualisiert, $ROOT_DIR/index.html ersetzt."
