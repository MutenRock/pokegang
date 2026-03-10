# battle-adapter

Bridge layer between Pokeforge world state and external or internal battle systems.

## v1 mode A scope

Pokeforge v1 keeps combat as a modular sandbox:

- Core game loop = management / operations / region control.
- Battle resolution = optional external call to Showdown/PokeLLMon.
- Deterministic fallback always available.

`src/pokellmon-bridge.mjs` includes request shaping, external battle call, and fallback resolver.
