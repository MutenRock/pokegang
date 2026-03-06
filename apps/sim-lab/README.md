# Pokeforge Sim Lab – First Gameplay Prototype

This is a **first playable gameplay loop** for Pokeforge.

## What it is

A small living sandbox focused on:
- persistent NPCs
- creatures with bond values and simple memory
- location-based resources
- turn-based world simulation
- bilingual EN / FR UI
- a clear future hook for LLM-written event flavor

## Why this first

This prototype is the most useful common denominator between the 3 big directions:
- **character sim** → the player acts in a world with NPCs and memory
- **creature embodiment** → creatures already exist as world agents and can become deeper later
- **4X / region sim** → locations, resources, trust, safety, and world tension already form a systemic base

## Current gameplay loop

1. choose a location or an action
2. spend one turn
3. NPCs and creatures act on their own
4. world tension / safety / weather evolve
5. the event log records what happened

## Current tech choice

This version is deliberately simple:
- plain HTML / CSS / JS
- no build step
- can be opened directly in a browser
- local save through `localStorage`

## Suggested future upgrades

### Simulation
- faction reputations
- creature ecology
- injuries / status effects
- camp projects / buildings

### LLM
- rewrite event text through API / Ollama
- generate NPC goals dynamically
- summarize run history
- memory compression for long campaigns

### Battle layer
- add a `battle-adapter` package
- connect to a Showdown-like simulator later
- only trigger battle when a world event calls for it

## Quick run

Open `index.html` in a browser.

For a cleaner dev workflow, you can also serve it locally:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/apps/sim-lab/`
