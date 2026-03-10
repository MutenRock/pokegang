#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHOWDOWN_DIR="${ROOT_DIR}/external/pokemon-showdown"

if [[ ! -d "${SHOWDOWN_DIR}" ]]; then
  echo "pokemon-showdown not found. Run: bash scripts/setup-pokellmon-stack.sh"
  exit 1
fi

cd "${SHOWDOWN_DIR}"

npm install

if [[ ! -f config/config.js ]]; then
  cp config/config-example.js config/config.js
fi

node pokemon-showdown start --no-security
