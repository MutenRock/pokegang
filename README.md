# Pokeforge

Pokeforge is a bilingual sandbox project exploring persistent simulation, LLM-driven NPCs, emergent events, and modular Pokémon-compatible battle systems.

The project starts as a **simulation lab**, not as a fully locked game design. Three gameplay directions are intentionally kept open:

1. **Character simulation** — play as a person in a living world.
2. **Creature / Pokémon embodiment** — live as a creature with needs, relations, and progression.
3. **4X / region management** — oversee a settlement, region, or evolving civilization.

## Core principles

- **Persistent entities**: NPCs, creatures, factions, places, and memories should evolve over time.
- **LLMs for expression, not raw rules**: language models handle dialogue, event framing, personality expression, and local reasoning.
- **Deterministic core simulation**: economy, combat resolution, resources, and progression should remain testable and reproducible.
- **Battle adapter, not hard lock-in**: combat can be routed through a modular adapter layer.
- **English + French from day one**.

## Repository layout

```text
apps/           User-facing applications and prototypes
packages/       Shared packages (core, llm, npc mind, battle adapter, i18n)
docs/           Vision, research notes, ADRs, design directions
data/           Seeds, locale files, templates
tools/          Small scripts for repo health and validation
tests/          Repository-level tests and fixtures
```

## First milestone

The first milestone is **not** a full game. It is a playable vertical slice with:

- a small persistent map
- a few NPCs / creatures with memory
- basic event generation
- bilingual UI scaffolding
- one battle adapter proof of concept

## Useful scripts

```bash
npm run check:repo
npm run check:locales
npm run check:structure
npm run llm:ollama:check
npm run battle:setup
```


## Pokeforge v1 direction (current)

Current v1 focuses on a **Team Rocket-style management simulation** with real-time + pause loops.

- Core simulation remains deterministic.
- LLM calls are event-based (major incidents/dialogues), not continuous.
- Battle is integrated as a **modular sandbox** via Showdown/PokeLLMon, with deterministic fallback in core gameplay.

See `docs/prototypes/team-rocket-v1.md` for the playable slice.

## Git workflow

Suggested branches:

- `main` for stable history
- `dev` for integration
- `spike/*` for experiments
- `feat/*` for actual features
- `docs/*` for research and documentation

## Important note

This repository template only covers **original project code and structure**. If you later add Pokémon-derived content, assets, names, or data, keep legal/IP considerations clearly separated from the engine code.
