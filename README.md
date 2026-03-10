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
Le projet passe maintenant du mode **sim-world** vers une implémentation gameplay plus directe: **Pokémon Rocket HQ**.

## Prototype principal actuel

- `apps/rocket-hq/`: prototype jouable Rocket HQ (intro, save/export, logs, NPC + trigger combat).
- `apps/sim-lab/`: ancien prototype conservé comme référence.


## Lancer le jeu en mode dev

```bash
python -m http.server 8080
```

Ouvrir:

```text
http://localhost:8080/apps/rocket-hq/
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

## Vérifications techniques

```bash
npm run check:repo
node --check apps/rocket-hq/app.js
npm run llm:ollama:check
```

## Tester le gameplay Rocket HQ

1. Intro: créer team + nom/prénom + sprite.
2. Dans MENU: tester save locale + export/import (fichier/code) + export logs.
3. Chat PNJ: envoyer un message normal.
4. Chat PNJ avec `défi` / `combat`: valider la confirmation Oui/Non.
5. Vérifier:
   - Non => PNJ se moque du joueur.
   - Oui => combat auto déclenché (bridge PokeLLMon si dispo, sinon fallback local).