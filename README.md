# Pokeforge

Pokeforge est un jeu de gestion / simulation incrémentale inspiré de l’univers Pokémon, centré sur la prise de contrôle progressive d’une région depuis la base d’une organisation criminelle.

Le joueur ne contrôle pas directement chaque combat. Son rôle principal est de superviser une base, recruter des membres, entraîner des Pokémon, construire des équipes, lancer des opérations, gérer l’économie, faire baisser la stabilité régionale et répondre aux événements majeurs.

## Fantasy principale

Le joueur prend la relève d’un boss d’organisation criminelle. Depuis le QG, il développe ses infrastructures, corrompt la région, affaiblit les institutions locales et cherche à faire tomber la stabilité régionale jusqu’à la prise de contrôle.

## Piliers du projet

- Gestion de base en temps réel avec pause
- Carte régionale stratégique
- Équipes de terrain composées de membres et de Pokémon
- Combats résolus automatiquement selon des règles lisibles
- LLM utilisés seulement pour les événements et dialogues importants
- Direction artistique rétro pixel art

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


## Current v1 focus

The current v1 direction is a **Team Rocket-style management simulation**:

- HQ building and assignment loop
- regional operations with deterministic resolution
- real-time with pause + event log supervision
- optional battle AI experimentation through external adapters

See: docs\prototypes\team-rocket-v1.md


## Useful scripts

```bash
npm run check:repo
npm run check:locales
npm run check:structure
npm run llm:ollama:check
npm run battle:setup
npm run battle:setup
npm run battle:showdown
npm run check:ollama
```


## Pokeforge v1 direction (current)

Current v1 focuses on a **Team Rocket-style management simulation** with real-time + pause loops.

- Core simulation remains deterministic.
- LLM calls are event-based (major incidents/dialogues), not continuous.
- Battle is integrated as a **modular sandbox** via Showdown/PokeLLMon, with deterministic fallback in core gameplay.

See 'docs\prototypes\team-rocket-v1.md' for the playable slice.

