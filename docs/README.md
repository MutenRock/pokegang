# Pokeforge

Pokeforge est un jeu de gestion / simulation incrementale inspire de l'univers Pokemon, centre sur la prise de controle progressive d'une region par un gang rival.

Le jeu actif est **Gang Wars v6** : gestion de gang, capture de Pokemon, combat de dresseurs, investissement de zones.

## Lancer le jeu

```bash
npm run dev
```

Puis ouvrir `http://localhost:8080/`

## Gameplay

- Recruter des agents et les assigner a des zones
- Capturer des Pokemon (animation ball + effets de qualite)
- Combattre des dresseurs (normaux et elites)
- Investir dans les zones pour debloquer evenements et dresseurs d'elite
- Ouvrir des coffres au tresor pour du loot
- Utiliser des items boost (Encens, Rarioscope, Aura Shiny)
- Progresser dans le Pokedex Gen1 (151 especes)

## Structure

```
game/          Jeu principal (index.html + app.js)
docs/          Documentation (GDD, architecture, ADR)
data/          Donnees (personnages, locales)
scripts/       Utilitaires dev
tools/         Outils de validation
```

## Verification dev

```bash
npm run check:locales
npm run check:characters
npm run check:ollama
```

## Technologies

- Vanilla JS (aucun framework)
- Sprites : Pokemon Showdown
- Sauvegarde : localStorage
- LLM optionnel : Ollama / OpenAI / Anthropic
- SFX : Web Audio API
