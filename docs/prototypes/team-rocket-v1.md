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
