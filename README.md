# PokéForge — Gang Wars

> Un jeu de gestion/idle Pokémon Gen 1 dans l'univers de la Team Rocket — vanilla JS, zéro dépendance, jouable dans le navigateur.

---

## Concept

Tu n'es pas le Dresseur. Tu es le **Boss d'un gang** qui opère dans l'ombre de Kanto.

Recrute des agents, envoie-les dans les zones, capture des Pokémon, gagne de l'argent, écrase des dresseurs. Construis ton empire Pokémon pendant que le Prof. Chen cherche encore son manteau.

---

## Jouer

Ouvre simplement `game/index.html` dans un navigateur moderne. Aucune installation, aucun serveur requis.

```
pokeforge/
└── game/
    ├── index.html   ← ouvrir ici
    └── app.js       ← moteur complet (~6000 lignes, vanilla JS)
```

La progression est sauvegardée automatiquement en `localStorage` (3 slots de sauvegarde).

---

## Systèmes de jeu

### Gang & Boss
- Personnalise ton boss (nom, sprite, équipe de 3 Pokémon)
- La réputation déverrouille de nouvelles zones et événements
- Le boss peut être déployé dans n'importe quelle zone pour booster les combats

### Agents
- Recrute des agents (coût ×4 par recrutement — ça monte vite)
- Chaque agent a des stats Combat/Capture/Chance, une personnalité, un niveau
- Les agents gagnent des **perks** tous les 5 niveaux
- Assigne-leur une zone et une équipe de 3 Pokémon
- **Clic droit** → menu rapide (auto-équipe, zone, vider)

### Zones (20 zones)
| Type | Zones |
|------|-------|
| Routes | Jardin de Pallet, Route 1, Chenal 22, Forêt de Jade, Mont Sélénite, Grotte Taupiqueur, Grotte, Tour Pokémon, Centrale, Îles Écume, Route Victoire, Grotte Inconnue, Mt. Argenté |
| Arènes | Argenta, Azuria, Céladopole, Parmanie, Safrania, Cramois'île, Plateau Indigo |
| Spéciales | Parc Safari, Casino Céladopole, Sylphe SARL, Bateau St. Anne, Manoir Pokémon |

- Système de **Maîtrise** (0→3 étoiles selon les victoires)
- **Fog of war** — les zones se dévoilent selon ta réputation
- Spawns réguliers : Pokémon sauvages, dresseurs, événements, coffres, raids

### Pokémon & PC
- 151 Pokémon Gen 1, chacun avec rareté, types, moves, nature, stats
- PC avec grille **6×6** (36 par page), filtres, recherche
- **Potentiel ★1 à ★5** — muter un Pokémon en sacrifiant des spécimens de la même espèce (les Shinies ne peuvent pas être sacrifiés)
- **Évolution** par niveau ou Pierre d'Évolution
- **Clic droit** sur un Pokémon → vendre, équiper, Super Bonbon, favori

### Pension & Oeufs
- Place 2 Pokémon en pension → génère un oeuf toutes les 5 min
- Temps d'éclosion selon la rareté (3 min à 25 min)
- **Oeuf Mystère** achetable en boutique — contient un Pokémon normalement introuvable (starters, fossiles, Évoli...) — prix de départ 50 000₽, scaling ×3

### Safari Zone — Pool Rare
Le Parc Safari dispose d'un **pool secret** de 58 Pokémon normalement non-capturables (starters, fossiles, Évoli et ses évolutions, Aérodactyl...). 10% de chance par spawn d'y piocher (30% avec le Rarioscope).

### Salle d'Entraînement
- Jusqu'à 6 Pokémon en formation simultanée
- Combat visuel face-à-face
- Gagnent XP et niveaux automatiquement

### Marché
- **Vendre** : gestion des stocks, tri par valeur/potentiel/niveau, vente en lot
- **Boutique** : balls, leurres, Rarioscope, Aura Shiny, Oeuf Mystère, Traducteur Pokémon...
- **Cosmetiques** : backgrounds de zones personnalisables

### Pokédex
- 151 entrées avec description, stats de base (barres), zones de spawn et taux, nombre de captures par espèce
- Panel de détail latéral avec recherche

### Missions
- **Quotidiennes & Hebdomadaires** : capturer, combattre, vendre, ouvrir des coffres
- **Histoire** (permanentes) : premier shiny, Maîtres de Kanto, Starters de Pallet, Fossiles, Rivalité Éternelle avec Blue, Guide de Terrain (15 zones), Collection de Léo (10 oeufs)...

### Événements Spéciaux
Des événements rares se déclenchent dans les zones selon la réputation :

| Événement | Zone | Effet |
|-----------|------|-------|
| Nuée Shiny | Toutes | Taux shiny ×10 pendant 60s |
| Migration Rare | Toutes | Spawns rares ×5 |
| Expédition Fossile | Routes | Oeuf Amonita ou Kabuto |
| Apparition de Mew | Safari | Ultra-rare — oeuf Mew |
| Vol de Mewtwo | Sylphe SARL | Récompenses massives |
| Raid St. Anne | Bateau | Giovanni + cadeau Lokhlass |
| Tournoi Céladopole | Casino | Oeuf Porygon ou Minidraco |
| Appel de Léo | Global | Toutes les 3h, Bill envoie un Pokémon rare dans ton PC |

---

## Stack technique

- **Vanilla JS** — aucun framework, aucun bundler
- **LocalStorage** — 3 slots de sauvegarde avec import/export JSON
- **Sprites** — [PokéAPI](https://pokeapi.co/) (Pokémon) + [Pokémon Showdown](https://play.pokemonshowdown.com/) (backgrounds, trainers)
- **CSS custom properties** — thème sombre pixel art

---

## Fonctionnalités UI notables

- **Log de combats** persistant (coin bas-droit) — chaque combat expandable
- **Menus contextuels** (clic droit) sur Pokémon et Agents
- **Recherche & filtres** dans tous les pickers de Pokémon
- **Boutons Pension / Formation** directement depuis le détail PC
- Imports de sauvegarde legacy avec sélection d'1 agent et 2 Pokémon

---

## Roadmap envisagée

- [ ] Panel Monde — classements et top captures serveur (Supabase)
- [ ] Manoir Pokémon — événements liés aux journaux du Dr. Fuji
- [ ] Bateau St. Anne — zone complète avec event Rocket
- [ ] Missions supplémentaires (Tournois, Fossiles, Explorer)
- [ ] Combat spéciaux plein écran (captures légendaires)
- [ ] Carnet des captures impressionnantes (top 10 joueur + serveur)

---

*Projet fan-made non affilié à Nintendo / Game Freak. PokéForge utilise les noms et sprites Pokémon à des fins non commerciales.*
