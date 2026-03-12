# npc-mind

Memory, traits, goals, relationships, local decision helpers, and prompt shaping for living entities.

## Character sheets (LLM-ready)

`src/character-sheet.mjs` provides:

- `validateCharacterSheet(sheet)`
- `buildCharacterPromptContext(sheet)`
- `buildCharacterDialoguePrompt({ sheet, playerMessage })`
- `loadCharacterSheets(rootDir)`

Use with datasets under `data/characters/` to keep NPC roleplay consistent.
