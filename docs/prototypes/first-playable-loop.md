# First playable loop for Pokeforge

## Decision

Start with a **living micro-sandbox** instead of a full RPG or full 4X.

## Reason

It gives a working base for:
- persistent NPCs
- event generation
- memory systems
- location/resource simulation
- future creature control
- future battle injection

## What this prototype proves

- the project can feel alive before combat exists
- LLMs are optional for the first playable loop, not mandatory
- EN / FR can exist from the start
- the same base can branch into multiple future gameplay directions

## Near-term follow-up

1. add structured JSON content instead of inline data
2. separate simulation logic from UI rendering
3. add a provider interface for local / remote LLMs
4. add seedable RNG for deterministic test runs
5. define when a combat scene should trigger
