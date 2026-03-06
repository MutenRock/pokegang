# Sim Lab v2 notes

## Main goals

- Make the prototype feel like a game, not a document mockup.
- Improve layout on laptop and desktop screens.
- Add an ESC menu for runtime settings.
- Add a first LLM configuration layer with an Ollama-friendly flow.
- Move toward a stronger retro / pixel-art identity.

## Added in v2

- Responsive UI with dedicated panels
- Retro DA using pixel-like styling, scanlines, thick borders, strong contrast
- ESC menu + tabs
- Display settings (scale, fullscreen, scanlines)
- General settings (language, autosave, LLM toggle)
- LLM settings (provider, base URL, model, API key, temperature, system prompt)
- Ollama test connection using `/api/tags`
- LLM event generation using `/api/generate` when provider = Ollama
- OpenAI-compatible fallback path for future providers

## Next recommended steps

1. Extract the simulation state and actions into `packages/core`
2. Move i18n dictionaries to `packages/i18n`
3. Add proper portrait sprites and tile icons
4. Add a turn resolver and world incidents table
5. Add battle trigger stubs and a combat adapter layer
