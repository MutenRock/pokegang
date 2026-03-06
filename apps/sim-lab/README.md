# Pokeforge Sim Lab v2

Responsive retro-pixel prototype for the first playable loop.

## Features

- Responsive multi-panel UI
- Pixel-art inspired retro direction
- ESC system menu
- EN / FR switch
- Local save / load / reset
- LLM provider settings persisted in localStorage
- Ollama quick connection test via `/api/tags`
- Dynamic event generation fallback to local simulation

## Run

Open `index.html` in a browser, or serve the repo locally:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/apps/sim-lab/
```

## Notes for LLM

The integrated browser-side Ollama test expects an Ollama server reachable from the browser.
Default local host is `http://localhost:11434`.
