# Pokémon Rocket HQ (prototype v2)

Prototype orienté **gestion de base Team Rocket** (sans carte/lieux visibles pour le moment).

## Ce qui est implémenté

- Intro de création:
  - nom de team,
  - prénom + nom du boss,
  - sprite trainer depuis Pokémon Showdown.
- Boucle incrémentale par tour (`Valider le tour`):
  - production pokedollars,
  - points de capture,
  - points d'élevage,
  - intelligence.
- Gestion des salles du QG:
  - commandement,
  - capture,
  - élevage,
  - entraînement,
  - avec upgrade par coût.
- Début de système capture/élevage Pokémon.
- Panel création d'équipe:
  - assignation des Pokémon possédés à un agent (max 3).
- Salle d'entraînement:
  - test combat auto (facile/normal/difficile),
  - tentative bridge PokeLLMon/Showdown via `http://localhost:8081/api/pokellmon/resolve`,
  - fallback local si indisponible.
- Recrutement agent via discussion LLM (Ollama optionnel):
  - maximum 5 interactions,
  - score caché (1..10),
  - si score final > 5 : candidat rejoint la team + nouveau PNJ contact débloqué.
- Chat PNJ + déclenchement duel par mots-clés (`défi`, `combat`, etc.) avec validation Oui/Non.
- Save locale + export/import (fichier/code) + export logs.
- Character sheets LLM de base dans `data/characters/` pour piloter les discussions PNJ.

## Lancer en dev

```bash
python -m http.server 8080
```

Puis ouvrir:

```text
http://localhost:8080/apps/rocket-hq/
```

## Vérifications dev

```bash
npm run check:repo
node --check apps/rocket-hq/app.js
npm run llm:ollama:check
```

## Scénario de test manuel

1. Créer team/personnage/sprite.
2. Cliquer `Valider le tour` plusieurs fois et vérifier la croissance des ressources.
3. Améliorer des salles et observer l'impact par tour.
4. Assigner des Pokémon à un agent puis lancer un combat d'entraînement.
5. Faire 5 interactions de recrutement et vérifier succès/échec selon le score caché.
6. Dans chat PNJ, envoyer `je te défie` puis tester Oui/Non.
7. Tester save/export/import + export logs.
