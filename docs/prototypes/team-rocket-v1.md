# Team Rocket Management Sim — v1 Skeleton

## Product direction

Pokeforge v1 prioritizes a real-time management loop with pause:

- Build and upgrade HQ rooms.
- Assign agents and 3-Pokémon squads.
- Launch regional operations.
- Resolve most systems deterministically.
- Use LLM calls only on major narrative events.

## Core resources

- `pokédollars`: construction, bribes, black market, repairs.
- `members`: agents, specialists, scientists.
- `pokémon`: team capacity and mission power.
- `stability` (regional): starts at 100, victory phase 1 at 0.
- `heat` (police pressure): scales patrol strength and raids.
- `local sentiment` per zone (0–100): civilian behavior + corruption.

## v1 playable slice

- 1 HQ map.
- 6 room types.
- 3 controllable zones.
- 10–20 available species.
- 5 team recipes.
- 3 mission categories.
- pause / play / x2 speed + event log.

## LLM usage policy

Allowed:

- boss dialogues
- major incidents
- interrogation scenes
- unique mission reports

Forbidden:

- tick simulation
- regular mission resolution
- economy updates
- standard battle turns

## Battle integration mode

- Primary mode: deterministic auto-resolve in management loop.
- Optional sandbox mode: external Showdown + PokeLLMon integration.
- Ollama is the default local provider for event narratives.
<<<<<<< ours

 
# Pokeforge v1 — Team Rocket Management Sim (A/A)

This document locks the **v1 direction** for Pokeforge around a management-first gameplay loop inspired by Team Rocket fantasy.

## Product decision

- **Primary loop**: run a criminal organization from HQ (incremental / real-time with pause).
- **Combat in v1**: battle sandbox separated from the HQ loop (not blocking core progression).
- **LLM usage**: event-driven only (major incidents, briefings, dialogues), never per simulation tick.

## v1 gameplay loop (first 15 minutes)

1. **Giovanni tutorial briefing** (overlay + one scripted intro event).
2. Build first rooms in HQ: Command Room, Dormitory, Storage.
3. Recruit first 3 grunts.
4. Assemble one 3-Pokémon squad with one doctrine.
5. Launch first operations on a mini-map of 3 zones.
6. Resolve operations automatically and read event logs.
7. Trigger one major event pause with optional LLM narrative output.

## Simulation stats for v1

### Region-level

- **Regional Stability** (start 100%, phase-1 win at 0%).
- **Police Heat** (counter-pressure; higher heat means harder responses).

### Zone-level

- **Local Corruption** (0–100, drives NPC behavior distribution).
- **Security Presence** (affects mission risk).
- **Economic Value** (affects Pokédollar gains).

### Organization-level

- **Pokédollars** (economy, upgrades, items).
- **Members** (grunts, officers, specialists).
- **Pokémon Capacity** (how many active/bench creatures can be managed).

## NPC behavior bands (by local corruption)

- 0–9: hard anti-crime population.
- 10–29: defensive, reports suspicious activity.
- 30–49: cautious neutral.
- 50–69: opportunistic.
- 70–89: compromised/corruptible.
- 90–100: openly collaborative with Team Rocket.

## HQ room set for v1

### Core rooms

1. **Command Room**: unlock operations + alerts.
2. **Dormitory**: member cap and recovery.
3. **Storage**: item/material cap.
4. **Training Room**: squad strength progression.
5. **Infirmary**: faster post-mission recovery.
6. **Black Market Desk**: stolen goods conversion to Pokédollars.

### Evil-themed starter room

- **Meowth Exploitation Room**: passive Pokédollar generation with event risk.

## Battle architecture (v1)

- Main game remains deterministic.
- Missions call a **battle resolver interface**.
- Resolver mode can be:
  - deterministic simulation (default),
  - external sandbox run (Showdown + PokeLLMon experiments).
- Results always return as a compact mission report for logs/UI.

## LLM architecture constraints

LLM calls are allowed only when one of these triggers fires:

- major story event,
- critical mission failure/success,
- boss-level dialogue,
- interrogation/briefing scene.

Each call receives a small structured summary:

- current day/time,
- zone and mission context,
- team composition,
- outcome facts that cannot be contradicted.

## External integration target

For battle experimentation in parallel to gameplay v1:

- Pokémon Showdown server (local).
- PokeLLMon clone (local).
- Ollama as local model provider.

See `docs/research/pokellmon-ollama-integration.md` and scripts in `scripts/`.

=======
>>>>>>> theirs
