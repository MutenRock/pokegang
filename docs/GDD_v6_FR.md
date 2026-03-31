# POKEFORGE v6 — Game Design Document (FR)

> **Version** : 6.0.0-draft
> **Derniere mise a jour** : 2026-03-31
> **Genre** : Idle Clicker / Gang Management
> **Stack** : Vanilla JS, single-page, localStorage, sprites Pokemon Showdown
> **LLM** : Integration optionnelle (Ollama local ou API distante)

---

## 1. Pitch

Tu diriges un **gang rival** qui cherche a **supplanter la Team Rocket** dans la region de Kanto. Capture des Pokemon, recrute des agents, conquiers des zones et deviens le gang le plus puissant de la region.

Le jeu se joue **au clic** : les Pokemon et dresseurs apparaissent dans des environnements visuels. Clique pour capturer, combattre, interagir. Au fil de ta progression, tu recrutes des agents qui automatisent le grind dans les zones conquises.

---

## 2. Identite et ton

- **Joueur** : Boss d'un gang Pokemon rival de la Team Rocket
- **Ton** : Sombre, humoristique, parodique — on est les mechants, mais avec style
- **Team Rocket** : Antagoniste recurrent, pas notre faction
- **Progression narrative** : Petit gang local → rival serieux → on supplante la Rocket
- **Bilingue** : Tous les textes existent en FR et EN, switch dynamique

---

## 3. Core Loop

```
Environnement (spawn) → Clic (capture/combat) → Collection → Vente/Assignation
     ↑                                                           ↓
  Agents automatisent  ←  Recrutement  ←  Argent/Progression  ←─┘
```

**Phase 1 — Farm solo** : Le joueur clique manuellement dans les zones pour capturer des Pokemon et gagner des combats.

**Phase 2 — Automation** : Les agents recrutes sont assignes aux zones maitrisees et grindent automatiquement.

**Phase 3 — Empire** : Le joueur gere son gang (marche noir, promotions, expansion, confrontation Rocket).

---

## 4. Interface

### 4.1. Navigation par onglets

| Onglet | Contenu |
|--------|---------|
| 💀 Gang | Profil du boss, liste des agents, promotions, stats du gang |
| 🗺️ Zones | Navigation entre zones, mini-fenetres des zones ouvertes |
| 💰 Marche | Marche noir (vente), boutique (balls, appats, items) |
| 💻 PC | Grille de tous les Pokemon possedes, tri/filtre |
| 📖 Pokedex | Collection, progression, stats globales |

### 4.2. Mini-fenetres de zones

- Chaque zone ouverte s'affiche comme une **mini-fenetre** dans l'onglet Zones
- Le joueur peut ouvrir **plusieurs zones** simultanement
- Chaque mini-fenetre montre :
  - Le decor de la zone (background + elements visuels)
  - Les Pokemon/dresseurs/events qui spawn
  - L'agent assigne (si applicable)
  - Les stats de la zone (maitrise, spawns restants)

---

## 5. Systeme de zones

### 5.1. Types de zones

**Zones simples** : Environnements generiques (foret, grotte, marais, plaine)
**Zones lore** : Lieux iconiques de Kanto (Route 1, Bourg Palette, Casino de Celadopole, Tour Pokemon)

### 5.2. Deblocage

Chaque zone se debloque a un **seuil de reputation** du gang.

### 5.3. Maitrise

- **Non maitrisee** : Seul le joueur peut y aller (clic manuel uniquement)
- **Maitrisee (10 combats gagnes)** : Peut y assigner 1 agent
- **Maitrise elevee (50 combats)** : Peut y assigner 2 agents
- **Capacite max** : 3 personnes par zone (joueur + 2 agents, ou 3 agents si le joueur n'y est pas)

### 5.4. Catalogue des zones (Gen 1 Kanto)

| Zone | Reputation | Pool Pokemon | Spawn/s | Evenements |
|------|-----------|-------------|---------|------------|
| Route 1 | 0 | Rattata, Pidgey, Chenipan | 0.15 | Gamins, Fillettes |
| Foret de Jade | 10 | Pikachu, Papilusion, Dardargnan, Chrysacier | 0.12 | Coupeurs, insectes rares |
| Grotte Taupiqueur | 25 | Taupiqueur, Onix, Racaillou, Nosferapti | 0.10 | Mineurs, eboulements |
| Route 24/25 (Pont Pepite) | 35 | Abra, Roucool, Mystherbe | 0.12 | Dresseurs en serie |
| Bourg Palette | 40 | Rattata, Roucool + starters ultra rares | 0.08 | Prof Chen |
| Parc Safari | 50 | Kangourex, Tauros, Insecateur, Scarabrute | 0.10 | Gardiens |
| Casino Celadopole | 60 | Porygon, Abra, Melofee | 0.10 | Team Rocket ! |
| Tour Pokemon (Lavanville) | 75 | Fantominus, Spectrum, Osselait | 0.08 | Mediums, fantomes |
| Iles Ecume | 80 | Tentacool, Kokiyas, Stari, Lokhlass (rare) | 0.10 | Nageurs |
| Silph Co. | 90 | Porygon, Electrode, Magneti | 0.12 | Raid Team Rocket |
| Grotte Inconnue | 100 | Mewtwo (ultra rare), Metamorph, Kadabra | 0.05 | Rien — zone end-game |

### 5.5. Spawns

- Chaque zone a un **taux de spawn** (Pokemon apparaissent a intervalle regulier)
- Les Pokemon ont un **TTL** (temps avant de disparaitre, ~10-15s)
- Les dresseurs spawn moins souvent que les Pokemon (~20% des spawns)
- Les evenements speciaux sont rares (~5% des spawns)
- **Appats** (item achetable) : double le spawn rate pendant X secondes

---

## 6. Pokemon — Variabilite

### 6.1. Chaque specimen est unique

```
{
  id, species_fr, species_en,
  level,          // 1-100
  nature,         // 1 parmi 10
  potential,      // ★1-5 (tire a la capture)
  shiny,          // bool (~1/200)
  moves,          // 2 parmi le pool de l'espece
  capturedIn,     // zone de capture
  stats,          // derives de base_stats + nature + potential
}
```

### 6.2. Natures (10)

| Nature | FR | Bonus | Malus |
|--------|-----|-------|-------|
| Hardy | Hardi | — | — |
| Brave | Brave | ATK +10% | SPD -10% |
| Timid | Timide | SPD +10% | ATK -10% |
| Bold | Assure | DEF +10% | ATK -10% |
| Jolly | Jovial | SPD +10% | DEF -10% |
| Adamant | Rigide | ATK +10% | SPD -10% |
| Calm | Calme | DEF +10% | SPD -10% |
| Modest | Modeste | SPE +10% | ATK -10% |
| Careful | Prudent | DEF +10% | SPE -10% |
| Naive | Naif | SPD +10% | DEF -10% |

### 6.3. Potentiel (★1-5) et Balls

Le type de ball utilise influence la distribution du potentiel a la capture.

| Ball | Cout | ★1 | ★2 | ★3 | ★4 | ★5 |
|------|------|----|----|----|----|-----|
| Poke Ball | 200₽ | 40% | 30% | 20% | 8% | 2% |
| Super Ball | 600₽ | 15% | 30% | 30% | 18% | 7% |
| Hyper Ball | 2000₽ | 5% | 15% | 30% | 30% | 20% |
| Sombre Ball | 1500₽ | 20% | 20% | 20% | 20% | 20% |

### 6.4. Shiny

- Taux : ~1/200 (0.5%)
- Sprite alternatif via Showdown (`/sprites/gen5-shiny/`)
- Effet visuel special (particules, glow)
- Valeur marche noir x10
- Purement cosmetique (pas de bonus stats)

### 6.5. Moves

- 2 moves tires aleatoirement du pool de l'espece a la capture
- Chaque espece Gen1 a un pool de 4-6 moves definis
- Les moves influencent la puissance en combat

### 6.6. Stats derivees

```
stat_finale = base_stat × (1 + potential × 0.1) × nature_modifier × (1 + level/100)
```

3 stats principales : **ATK**, **DEF**, **SPD**

---

## 7. Capture

- **Clic sur un Pokemon** = capture instantanee (pas d'echec)
- **Cout** : 1 ball consommee du type selectionne
- **Ball active** : Le joueur choisit quelle ball est "equipee" (switch rapide)
- Si le joueur n'a plus de balls → ne peut plus capturer (doit en acheter)
- Le Pokemon capture recoit ses stats aleatoires (nature, potentiel, shiny, moves)

---

## 8. Combat

### 8.1. Declenchement

- Un **dresseur** spawn dans la zone (apparait avec son sprite + equipe visible)
- Le joueur clique dessus pour lancer le combat
- OU un agent dans la zone le resout automatiquement

### 8.2. Resolution

- **Auto-resolution** basee sur les stats
- Le joueur/agent envoie son equipe (1-3 Pokemon)
- Puissance = somme des stats de l'equipe + bonus agent
- Animation rapide (~3-5s) : sprites face a face, barres de vie, attaques, KO
- Victoire → XP (agent + Pokemon), argent, reputation
- Defaite → Pokemon blesses (cooldown), perte de reputation mineure

### 8.3. Types de dresseurs

| Type | Difficulte | Recompense |
|------|-----------|-----------|
| Gamin/Fillette | Facile | 50-150₽, +1 rep |
| Dresseur | Moyen | 200-500₽, +3 rep |
| Ranger/Expert | Difficile | 500-1500₽, +5 rep |
| Rocket Grunt | Difficile+ | 1000-3000₽, +10 rep, loot possible |
| Rocket Executive | Boss zone | 5000₽+, +25 rep, event unlock |
| Giovanni | Boss final | Enorme, titre special |

### 8.4. Team Rocket comme ennemi

- Les Rocket Grunts spawn dans certaines zones (Casino, Silph Co.)
- Frequence augmente avec la reputation du joueur (la Rocket nous remarque)
- Battre des Rocket = grosse rep + loot + progression narrative
- Evenements speciaux : raids Rocket sur des zones qu'on controle

---

## 9. Agents — Systeme Gacha

### 9.1. Recrutement

- **Evenement aleatoire** : un agent potentiel apparait dans une zone
- Le joueur voit ses stats et decide de recruter ou non
- **Cout de recrutement** : variable selon la rarete de l'agent
- Stats tirees aleatoirement (gacha) — certains agents sont meilleurs que d'autres

### 9.2. Stats d'agent

```
{
  id, name, sprite,
  title: 'Sbire',          // Sbire → Lieutenant → Capitaine
  level: 1,                // 1-100
  xp: 0,
  combatsWon: 0,
  stats: {
    capture: X,            // vitesse de capture auto
    combat: X,             // puissance en combat
    luck: X,               // chance meilleurs drops/potentiel
  },
  team: [],                // max 3 Pokemon
  assignedZone: null,
  personality: ['...'],    // pour LLM / flavor text
}
```

### 9.3. Titres et promotions

| Titre | Condition | Bonus |
|-------|----------|-------|
| Sbire | — | Aucun |
| Lieutenant | Lvl 50 + 25 combats gagnes | +15% toutes stats |
| Capitaine | Lvl 75 + 200 combats gagnes | +30% toutes stats |

### 9.4. Automation

Un agent assigne a une zone :
- **Capture auto** : 1 Pokemon toutes les `base_interval / (1 + capture_stat/50)` secondes
- **Combat auto** : Resout les dresseurs automatiquement (taux de victoire base sur combat + team)
- **Events auto** : Resout les evenements simples
- Le joueur recoit les notifications des captures/combats de l'agent

### 9.5. Equipe de l'agent

- Max 3 Pokemon assignes
- Les Pokemon de l'agent influencent sa puissance de combat
- Un Pokemon ne peut etre assigne qu'a un seul agent a la fois

---

## 10. Marche Noir

### 10.1. Vente

Le joueur selectionne des Pokemon a vendre et recoit des Pokedollars.

```
Prix = BASE_PRIX[espece] × MULT_POTENTIEL[★] × (shiny ? 10 : 1) × MULT_NATURE
```

| Potentiel | Multiplicateur |
|-----------|---------------|
| ★1 | x0.5 |
| ★2 | x1 |
| ★3 | x2 |
| ★4 | x5 |
| ★5 | x15 |

### 10.2. Tension design

- Vendre rapporte de l'argent → acheter plus de balls → capturer plus
- Mais les meilleurs specimens sont rares → les vendre = perte potentielle
- Decision constante : garder ou vendre ?

---

## 11. Boutique

| Item | Prix | Effet |
|------|------|-------|
| Poke Ball (x10) | 2 000₽ | Capture standard |
| Super Ball (x10) | 6 000₽ | Meilleur potentiel |
| Hyper Ball (x5) | 10 000₽ | Bien meilleur potentiel |
| Sombre Ball (x5) | 7 500₽ | Distribution uniforme |
| Appat | 500₽ | x2 spawn rate pendant 60s (zone active) |
| Super Appat | 2 000₽ | x3 spawn rate pendant 60s |
| Potion | 300₽ | Retire le cooldown d'un Pokemon |

---

## 12. Economie

### 12.1. Sources de revenus

| Source | Volume | Frequence |
|--------|--------|-----------|
| Marche noir (vente Pokemon) | Variable, principal | A volonte |
| Victoires combat | 50-5000₽ | Par combat |
| Evenements speciaux | Bonus ponctuel | Rare |
| Quetes/objectifs | Recompenses fixes | Ponctuel |

### 12.2. Depenses

| Depense | Volume | Frequence |
|---------|--------|-----------|
| Poke Balls | 200₽+ par capture | Continu |
| Appats | 500₽-2000₽ | Optionnel |
| Recrutement agents | Variable | Ponctuel |
| Deblocage zones | Gratuit (reputation) | Progression |

### 12.3. Argent de depart

Le joueur commence avec **5 000₽** et **20 Poke Balls**.

---

## 13. Progression et reputation

### 13.1. Reputation

- Ressource principale de progression
- Gagnee via combats, events, objectifs
- Debloque les zones et les fonctionnalites
- La Rocket reagit quand la reputation monte (plus d'ennemis, plus durs)

### 13.2. Jalons

| Reputation | Deblocage |
|-----------|-----------|
| 0 | Route 1, tutoriel |
| 10 | Foret de Jade |
| 25 | Grotte Taupiqueur |
| 35 | Pont Pepite |
| 40 | Bourg Palette |
| 50 | Parc Safari, Marche Noir ameliore |
| 60 | Casino Celadopole |
| 75 | Tour Pokemon |
| 80 | Iles Ecume |
| 90 | Silph Co. |
| 100 | Grotte Inconnue |

---

## 14. Integration LLM (optionnelle)

### 14.1. Principe

Si un LLM est connecte (Ollama local ou API distante), les PNJ et dresseurs ont des dialogues **generes dynamiquement** bases sur le contexte de la partie.

### 14.2. Prompt contextuel

```
You are a Pokemon lore-accurate NPC in Kanto.
You are a [ROLE] in [ZONE].

Context:
- You are facing a member of [GANG_NAME] (a rival gang to Team Rocket)
- Their gang reputation is [REP] (they are [REP_DESCRIPTION])
- They have: [PLAYER_POKEMON_LIST]
- You have: [NPC_POKEMON_LIST]

Character sheet:
[CHARACTER_JSON]

Respond in character. Keep it short (2-3 sentences max).
The player says: "[MESSAGE]"
```

### 14.3. Integration technique

- **Detection** : Au boot, le jeu ping `localhost:11434` (Ollama) ou une URL API configuree
- **Fallback** : Si pas de LLM, utilise des dialogues pre-ecrits (pool de phrases)
- **Cache** : Les reponses LLM sont cachees par contexte pour eviter les appels redondants
- **Configuration** : URL + modele configurable dans les settings du jeu

### 14.4. Quand le LLM est utilise

| Situation | Avec LLM | Sans LLM |
|-----------|---------|----------|
| Dresseur rencontre | Dialogue genere contextuel | Phrase pre-ecrite aleatoire |
| Event special | Narration generee | Texte fixe |
| Rocket encounter | Dialogue adaptatif | Phrases Rocket generiques |
| Recrutement agent | Conversation dynamique | Script fixe |

---

## 15. Sauvegarde

- **Slot unique** (simplifie l'UX)
- **localStorage** avec cle `pokeforge.v6`
- **Auto-save** a chaque action significative (capture, combat, vente)
- **Export/Import** : Bouton pour exporter en JSON, importer depuis un fichier
- **Purge cache** : Bouton dans les settings

---

## 16. Assets et sprites

### 16.1. Pokemon

- Sprites face : `https://play.pokemonshowdown.com/sprites/gen5/{name}.png`
- Sprites dos : `https://play.pokemonshowdown.com/sprites/gen5-back/{name}.png`
- Sprites shiny : `https://play.pokemonshowdown.com/sprites/gen5-shiny/{name}.png`

### 16.2. Dresseurs

- Sprites : `https://play.pokemonshowdown.com/sprites/trainers/{name}.png`
- Noms valides verifies : youngster, lass, fisherman, hiker, blackbelt, acetrainer, psychic, gentleman, swimmer, bugcatcher, camper, picnicker, rocketgrunt, rocketgruntf, giovanni, archer, ariana, proton, oak, red, silver, blue, nurse, scientist

### 16.3. Gen 1 uniquement

- 151 especes (Bulbizarre → Mew)
- Dictionnaire FR↔EN complet
- Pool de 4-6 moves par espece

---

## 17. Hors scope v6.0 (futures versions)

- PvP entre joueurs
- Autres regions (Johto, Hoenn...)
- Breeding / elevage
- Echanges entre joueurs
- Achievements / trophees
- Systeme de quetes avancees
- Mode histoire lineaire
