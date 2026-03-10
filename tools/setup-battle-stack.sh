#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXTERNAL_DIR="${ROOT_DIR}/external"
SHOWDOWN_DIR="${EXTERNAL_DIR}/pokemon-showdown"
POKELLMON_DIR="${EXTERNAL_DIR}/PokeLLMon"

mkdir -p "${EXTERNAL_DIR}"

if [[ ! -d "${SHOWDOWN_DIR}" ]]; then
  git clone https://github.com/smogon/pokemon-showdown.git "${SHOWDOWN_DIR}"
else
  echo "pokemon-showdown already exists at ${SHOWDOWN_DIR}"
fi

if [[ ! -d "${POKELLMON_DIR}" ]]; then
  git clone https://github.com/git-disl/PokeLLMon "${POKELLMON_DIR}"
else
  echo "PokeLLMon already exists at ${POKELLMON_DIR}"
fi

pushd "${SHOWDOWN_DIR}" >/dev/null
npm install
cp -n config/config-example.js config/config.js || true
popd >/dev/null

cat <<MSG

Battle stack prepared.

1) Start Showdown:
   cd ${SHOWDOWN_DIR}
   node pokemon-showdown start --no-security

2) Verify Ollama locally:
   npm run llm:ollama:check

3) Configure PokeLLMon to use Ollama endpoint:
   OLLAMA_BASE_URL=http://127.0.0.1:11434
   OLLAMA_MODEL=llama3.1:8b

MSG
