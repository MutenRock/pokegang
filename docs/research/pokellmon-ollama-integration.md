# PokeLLMon + Pokémon Showdown + Ollama integration notes

This guide sets a reproducible local setup for battle-AI experimentation without coupling it to the core sim loop.

## 1) Bootstrap external dependencies

Run from repository root:

```bash
bash scripts/setup-pokellmon-stack.sh
```

This script clones:

- `external/pokemon-showdown` from `https://github.com/smogon/pokemon-showdown.git`
- `external/pokellmon` from `https://github.com/git-disl/PokeLLMon`

## 2) Start Pokémon Showdown

```bash
bash scripts/run-showdown.sh
```

It performs equivalent steps to the upstream quickstart:

1. `npm install`
2. `cp config/config-example.js config/config.js` (first run only)
3. `node pokemon-showdown start --no-security`

Default URL:

- `http://localhost:8000/`

## 3) Start Ollama

Ensure Ollama is running locally and a model is available:

```bash
ollama serve
ollama pull llama3.1:8b
```

Check connectivity from this repo:

```bash
node scripts/check-ollama.mjs
```

## 4) Adapter contract for Pokeforge v1

Pokeforge v1 does not route every mission through LLM battles.
Instead:

- normal missions use deterministic resolver,
- selected high-impact encounters may call an external battle experiment,
- the resolver returns normalized report fields:
  - `winner`
  - `turns`
  - `faints`
  - `notable_events`
  - `confidence`

## 5) Why this architecture

- Keeps core gameplay responsive and deterministic.
- Makes PokeLLMon experimentation optional and replaceable.
- Avoids high-frequency LLM cost/latency.
