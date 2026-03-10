#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXTERNAL_DIR="${ROOT_DIR}/external"
SHOWDOWN_DIR="${EXTERNAL_DIR}/pokemon-showdown"
POKELLMON_DIR="${EXTERNAL_DIR}/pokellmon"

mkdir -p "${EXTERNAL_DIR}"

if [[ ! -d "${SHOWDOWN_DIR}/.git" ]]; then
  git clone https://github.com/smogon/pokemon-showdown.git "${SHOWDOWN_DIR}"
else
  echo "pokemon-showdown already present at ${SHOWDOWN_DIR}"
fi

if [[ ! -d "${POKELLMON_DIR}/.git" ]]; then
  git clone https://github.com/git-disl/PokeLLMon "${POKELLMON_DIR}"
else
  echo "PokeLLMon already present at ${POKELLMON_DIR}"
fi

echo "Done. External battle stack repositories are available in ${EXTERNAL_DIR}."
