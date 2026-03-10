<<<<<<< ours
# Pokémon Rocket HQ (prototype)

Prototype front orienté **Rocket HQ** (pas sim-world), avec la boucle demandée pour démarrer l'implémentation gameplay.

## Features implémentées

- Intro avec fenêtre de création:
  - nom de team,
  - prénom/nom du personnage,
  - sprite style Pokémon Showdown.
- Sauvegarde locale `localStorage`.
- Export / import sauvegarde:
  - fichier texte,
  - code (base64).
- Export des logs de partie en fichier texte.
- Interaction PNJ (chat) avec Ollama en option.
- Trigger combat auto via mots-clés: `defi`, `défi`, `combat`, `duel`, `challenge`.
- Confirmation Oui/Non:
  - Non: le PNJ se moque du joueur.
  - Oui: combat automatique (bridge `http://localhost:8081/api/pokellmon/resolve` puis fallback local).
=======
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
>>>>>>> theirs

## Lancer en dev

```bash
python -m http.server 8080
```
<<<<<<< ours
=======

>>>>>>> theirs
Puis ouvrir:

```text
http://localhost:8080/apps/rocket-hq/
```

<<<<<<< ours
## Tester rapidement

1. Créer team + personnage + sprite à l'intro.
2. Ouvrir `MENU`:
   - tester `Save`, `Load`, `Export .txt`, `Export code`, `Export logs`.
3. Sélectionner un PNJ, envoyer un message contenant `défi` ou `combat`.
4. Vérifier la modale de confirmation puis le résultat auto.
5. (Optionnel) activer Ollama et utiliser `Test Ollama`.
=======
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
>>>>>>> theirs
