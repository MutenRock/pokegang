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

## Lancer en dev

```bash
python -m http.server 8080
```
Puis ouvrir:

```text
http://localhost:8080/apps/rocket-hq/
```

## Tester rapidement

1. Créer team + personnage + sprite à l'intro.
2. Ouvrir `MENU`:
   - tester `Save`, `Load`, `Export .txt`, `Export code`, `Export logs`.
3. Sélectionner un PNJ, envoyer un message contenant `défi` ou `combat`.
4. Vérifier la modale de confirmation puis le résultat auto.
5. (Optionnel) activer Ollama et utiliser `Test Ollama`.
