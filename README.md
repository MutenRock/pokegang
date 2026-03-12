# Pokeforge
Pokeforge est un jeu de gestion / simulation incrémentale inspiré de l’univers Pokémon, centré sur la prise de contrôle progressive d’une région depuis la base d’une organisation criminelle.

Le prototype actif est désormais **Rocket HQ**: une base de gestion incrémentale Team Rocket.

## Où lancer le jeu

```bash
python -m http.server 8080
```

Puis ouvrir:

```text
http://localhost:8080/apps/rocket-hq/
```

## Focus actuel Rocket HQ

- gestion de salles du QG,
- boucle par tour pour les ressources,
- capture/élevage Pokémon,
- recrutement d'agents via discussion LLM,
- assignation d'équipe Pokémon -> agent,
- combats auto d'entraînement,
- save locale + export/import + logs.

## Vérification dev

```bash
npm run check:repo
node --check apps/rocket-hq/app.js
npm run llm:ollama:check
```

Voir `apps/rocket-hq/README.md` pour le scénario de test complet.

## Character sheets LLM (personnages)

Les fiches personnages structurées sont disponibles dans `data/characters/` (Rocket, rivals, civilians).

Validation rapide:

```bash
npm run check:characters
```

Utilitaires de prompt/validation: `packages/npc-mind/src/character-sheet.mjs`.

