# POKEFORGE — ROCKET HQ v4
## Fichiers à déployer

### Racine du projet (3 fichiers principaux)
- `menu.html`  — Page d'accueil : 3 save slots, sélection FR/EN, DA sombre Team Rocket
- `index.html` — Interface de jeu principale
- `app.js`     — Logique complète v4 (tous modules fusionnés)

### Démarrage
Ouvrir `menu.html` dans un navigateur (ou serveur local).
Le menu redirige vers `index.html?slot=X&lang=fr|en`.

### Dossier patches/
Modules individuels pour référence — déjà tous intégrés dans app.js.

### Notes
- Saves stockées dans localStorage : pf.slot1 / pf.slot2 / pf.slot3
- LLM local via Ollama (optionnel) — configurable dans le menu ⚙
- Compatible Chromium / Firefox — pas de backend requis

### Nouveautés v4 vs v3
- Menu principal + 3 save slots + FR/EN
- Vue monde 2D (Pokémon cliquables, capture)
- Simulation de mission animée (sprites, dialogues, pop-up résolution)
- 8 nouvelles missions (raids, vols, trafic, event rare Mewtwo)
- Recrutement : 3 interactions / 100₽ chacune
- Niveaux agents + Pokémon + table d'évolution Gen1/Gen2
- Salle d'apprentissage combat + Salle d'entraînement Pokémon
- Sprites animés en bas de page par salle
- Pokédex + Combo Dex (+10₽ par combo)
- Chat allié recentré (1 conversation/tour)
- Lore NPCs : Giovanni, Archer, Ariane, Jessie, James, Professeur Chen, Red

### Version
v4.13 — 22/03/2026
