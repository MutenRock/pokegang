# POKEFORGE — ROCKET HQ v5
## Fichiers

- `index.html` — Page d'accueil : 3 save slots, sélection FR/EN
- `play.html`  — Interface de jeu principale
- `app.js`     — Logique complète (tous modules fusionnés)
- `styles.css` — Styles du jeu

### Démarrage
```bash
npm run dev   # serve game/ sur localhost:8080
```
Le menu (`index.html`) redirige vers `play.html?slot=X&lang=fr|en`.

### Notes
- Saves stockées dans localStorage : pf.slot1 / pf.slot2 / pf.slot3
- LLM local via Ollama (optionnel) — configurable dans le menu
- Compatible Chromium / Firefox — pas de backend requis
