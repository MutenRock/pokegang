# POKEFORGE — ROCKET HQ
# PATCH ROADMAP v4.XX
# Fichier de suivi des patches — à tenir à jour à chaque livraison

==========================================================
CONVENTIONS
==========================================================
- Chaque patch = 1 app.js + 1 index.html (si modifié)
- Les patches sont cumulatifs (v4.02 inclut v4.01)
- Statut : [ ] À faire | [WIP] En cours | [x] Livré | [skip] Reporté

==========================================================
v4.00 — MENU PRINCIPAL + SAVE SLOTS + SÉLECTION DE LANGUE
==========================================================
Statut : [ ]

Fichiers : menu.html, menu.css, menu.js

Contenu :
  [x] Écran de menu avant chargement de partie
      - DA : fond sombre, ambiance Team Rocket / criminelle
      - Logo "POKEFORGE — ROCKET HQ" stylisé
      - Animation de fond (sprites Rocket en boucle, très discrets)
  [x] Sélection de langue EN / FR au premier lancement
      - Stocké en localStorage
      - Appliqué à toute l'UI via un objet I18N simple (FR/EN keys)
  [x] 3 slots de sauvegarde
      - Slot affiché avec : nom du boss, nom de la team, tour actuel, date de sauvegarde
      - Slot vide : "Nouvelle partie"
      - Actions : Charger / Supprimer
  [x] Bouton "Paramètres" (accès aux settings LLM / Ollama)
  [x] Bouton "Crédits" (simple overlay)

Notes techniques :
  - menu.html est une page séparée de index.html
  - À la sélection d'un slot, on redirige vers index.html?slot=1|2|3
  - index.html lit le slot depuis l'URL au boot

==========================================================
v4.01 — WORLD VIEW (Vue Monde 2D en haut de page)
==========================================================
Statut : [ ]

Fichiers : index.html, app.js (module WORLD_VIEW)

Contenu :
  [ ] Bande horizontale en haut de l'interface principale
      - Hauteur ~180px, fond semi-transparent zone "Kanto stylisé"
      - QG Team Rocket à gauche (sprite fixe)
  [ ] Pokémon sauvages qui apparaissent aléatoirement toutes les N secondes
      - Sprites gen5 Showdown, animation CSS (float/bounce)
      - Position x aléatoire dans la bande
      - Disparaissent après 8s si non cliqués
  [ ] Clic sur un Pokémon → tente de le capturer
      - Coût : 50 Pokédollars ou 1 CapturePoint
      - Taux de réussite basé sur réputation + niveau joueur
      - Animation "Ball" sur clic (CSS)
      - Si réussi → Pokémon ajouté au roster + log
      - Si raté → log + Pokémon fuit
  [ ] Retrait de la "Salle de Capture" (salle supprimée du QG)
      - Les CapturePoints restants sont convertis en Pokédollars
  [ ] Fond de la bande monde change selon les événements actifs
      (ex: Mission en marais → fond marécageux)

==========================================================
v4.02 — SIMULATION DE MISSION (Bande horizontale)
==========================================================
Statut : [ ]

Fichiers : index.html, app.js (module MISSION_SIM)

Contenu :
  [ ] Overlay / panneau horizontal en haut de page déclenché
      lors du lancement ou de la résolution d'une mission
  [ ] Background dynamique selon la zone de mission
      (ex: Silph Co → immeuble, marais → swamp, Route 1 → plaine)
  [ ] Sprites des agents participants affichés côte à côte
  [ ] Sprites des Pokémon ennemis qui pop pendant les combats
  [ ] Bulles de dialogue des PNJ (texte généré ou LLM)
  [ ] Résolution step-by-step (3-5 étapes animées)
  [ ] Pop-up finale avec :
      - Résumé texte de la mission
      - Récompenses obtenues (Pokémon volés, Pokédollars, Intel)
      - Pertes éventuelles (Pokémon mort/capturé par Jenny)
      - Bouton "Continuer"
  [ ] PNJ lore (Giovanni, Archer...) peuvent apparaître
      comme superviseurs ou antagonistes selon la mission

==========================================================
v4.03 — MISSIONS V2 (nouvelles zones + récompenses Pokémon)
==========================================================
Statut : [ ]

Fichiers : app.js (module MISSIONS_V2)

Contenu :
  [ ] Retrait définitif de la logique "salle de capture" income
  [ ] Nouvelles catégories de missions :
      - Vol de Pokémon (Centre Pokémon, dresseurs)
      - Raid de zone (Marais Cramois, Zone Safari, Grottes)
      - Trafic/Contrebande (Fossiles, Objets rares)
      - Événements spéciaux (apparition Pokémon légendaire, alerte Jenny)
  [ ] Chaque mission peut rapporter 0-3 Pokémon selon zone + succès
  [ ] Pokémon capturés via mission ont un niveau cohérent avec la zone
  [ ] Les Pokémon peuvent mourir en mission (probabilité selon risque)
  [ ] Les Pokémon peuvent être saisis par les Agent Jenny (malchance)
  [ ] Cooldown post-mission :
      - Agent : 1 tour de repos
      - Pokémon : 2 tours de repos
      - Trait "Bourreau de travail" : agent 0 tour, Pokémon 1 tour
  [ ] Missions liées au lore (ex : "Raid Silph Co." → PNJ Giovanni superviseur)

==========================================================
v4.04 — RECRUTEMENT V2 (3 interactions, coût 100₽)
==========================================================
Statut : [ ]

Fichiers : app.js (module RECRUIT_V2)

Contenu :
  [ ] Réduction à 3 interactions max (était 5)
  [ ] Chaque interaction coûte 100 Pokédollars
      - Si fonds insuffisants → interaction bloquée
  [ ] Score caché toujours actif, influencé par le LLM ou fallback
  [ ] Nouveau candidat généré si recrutement terminé + nouveau tour
  [ ] Trait "Bourreau de travail" peut être découvert au recrutement

==========================================================
v4.05 — NIVEAUX AGENTS + COOLDOWN
==========================================================
Statut : [ ]

Fichiers : app.js (module AGENTS_LEVEL)

Contenu :
  [ ] Chaque agent a un champ : level (départ : 1), xp (départ : 0)
  [ ] XP gagnée via :
      - Missions réussies (+20-50 XP selon risque)
      - Entraînement en Salle d'apprentissage (+5 XP/combat simulé)
  [ ] Paliers de level : 0/50/120/250/500 XP (level 1→5)
  [ ] Le level influence :
      - Taux de succès des missions
      - Niveau des Pokémon adverses en simulation
      - Répliques LLM (agent plus expérimenté = style différent)
  [ ] Cooldown post-mission visible dans l'UI
      (badge "[repos]" sur la carte agent, compteur de tours)
  [ ] Trait "Bourreau de travail" : appliqué à la génération du PNJ,
      élimine le cooldown agent

==========================================================
v4.06 — NIVEAUX POKÉMON + ÉVOLUTION + EVENTS SPÉCIAUX
==========================================================
Statut : [ ]

Fichiers : app.js (module POKEMON_LEVEL)

Contenu :
  [ ] Chaque Pokémon a : level, xp, cooldown (tours de repos)
  [ ] XP gagnée via :
      - Salle d'entraînement Pokémon (+XP/tour selon level salle)
      - Missions (+XP si survie)
  [ ] Évolution :
      - Conditions : niveau suffisant ET présent en salle d'entraînement en début de tour
      - Liste d'évolutions Gen1/Gen2 intégrée (ex: Abo→Arbok à L22, Smogo→Smogogo à L35)
      - Animation/log de l'évolution
  [ ] Événements spéciaux (chance selon level salle) :
      - Bonus permanent : +5 ATK, +5 DEF, Capacité bonus débloquée
      - Malus permanent : -HP max, Peur des combats (-10% taux succès)
  [ ] Cooldown post-mission : 2 tours (ou 1 avec trait Bourreau de travail)
  [ ] Mort/perte en mission : Pokémon retiré définitivement du roster
      (log + entrée Pokédex marquée "Perdu en mission")

==========================================================
v4.07 — SALLES V2 (Apprentissage + Entraînement Pokémon)
==========================================================
Statut : [ ]

Fichiers : app.js (module ROOMS_V2), index.html

Contenu :
  Salle d'apprentissage du combat (ancienne salle d'entraînement) :
  [ ] Un agent peut y être assigné
  [ ] Chaque tour : 5 combats simulés automatiques
  [ ] Gains : XP pour l'agent (+5/combat) + XP pour ses Pokémon (+2/combat)
  [ ] Le combat simulé utilise le même bridge Showdown (ou fallback)

  Salle d'entraînement Pokémon (nouvelle) :
  [ ] Level 1 : 1 Pokémon simultané
  [ ] Level 3 : 2 Pokémon simultanés
  [ ] Level 5 (max actuel) : 3 Pokémon simultanés
  [ ] XP/tour par Pokémon = baseXP * level de la salle
  [ ] Chance d'événement spécial = 5% + 3% par level de salle
  [ ] Évolution déclenchée en début de tour si conditions remplies
  [ ] Sprites des Pokémon assignés affichés dans le panel de la salle

==========================================================
v4.08 — SPRITES SALLES EN BAS DE PAGE (Animations CSS)
==========================================================
Statut : [ ]

Fichiers : index.html, CSS intégré

Contenu :
  [ ] Bande en bas de page avec une mini-carte par salle active
  [ ] Chaque carte affiche :
      - Nom de la salle
      - Sprites des Pokémon ou agents assignés
      - Animation CSS légère (float, pulse)
  [ ] Mise à jour lors des événements spéciaux (sprite qui tremble, flash)
  [ ] Visible en permanence, scroll horizontal si beaucoup de salles

==========================================================
v4.09 — POKEDEX + COMBO DEX
==========================================================
Statut : [ ]

Fichiers : app.js (module POKEDEX), index.html

Contenu :
  Pokédex :
  [ ] Liste de toutes les espèces obtenues au moins une fois
  [ ] Entrée : nom FR, sprite, nombre d'exemplaires obtenus, statut (vivant/perdu)
  [ ] Débloqué à l'obtention du premier Pokémon de l'espèce
  [ ] Accessible via un bouton "Pokédex" dans le topbar

  Combo Dex :
  [ ] Détection automatique de patterns d'équipe (ex: [poison, poison, dark])
  [ ] Si pattern non encore enregistré → récompense +10₽ + entrée débloquée
  [ ] Entrée affiche : composition de l'équipe, synergie, nombre de victoires
  [ ] Applicable directement si Pokémon possédés (bouton "Appliquer ce combo")

==========================================================
v4.10 — CHAT PNJ ALLIÉ RECENTRÉ (1 conversation/tour)
==========================================================
Statut : [ ]

Fichiers : app.js (module NPC_CHAT_V2), index.html

Contenu :
  [ ] Retrait du chat PNJ global (l'ancien panel "Discussion PNJ")
  [ ] Nouveau panel : "Briefing allié" — uniquement les agents recrutés
  [ ] 1 seule conversation possible par tour
      - Cooldown visuel sur les autres agents après avoir parlé
  [ ] La conversation utilise la Character Sheet de l'agent injectée dans le LLM
  [ ] Les réponses peuvent révéler des infos sur les missions en cours,
      ou générer de petits événements narratifs (bonus Intel, info sur un PNJ)

==========================================================
v4.11 — LORE NPCs INTÉGRÉS (Giovanni, Archer, Jessie, James, Oak, Red)
==========================================================
Statut : [ ]

Fichiers : app.js (module LORE_NPCS)

Contenu :
  [ ] Les 6 fiches JSON lore chargées comme constantes dans app.js
  [ ] Giovanni : apparaît comme superviseur sur les missions de haut rang
      (Silph Co., missions "Élevé" de difficulté)
  [ ] Archer / Ariana : PNJ alliés disponibles dès le début
      (peuvent être "activés" si réputation >= 40)
  [ ] Jessie / James : agents recrutables via événement spécial
      (apparaissent comme candidats si tour > 5 et réputation > 20)
  [ ] Professeur Chen / Red : PNJ antagonistes sur certaines missions
  [ ] Tous injectés avec leur Character Sheet complète dans les prompts LLM
  [ ] Répliques FR/EN selon la langue sélectionnée

==========================================================
ORDRE DE LIVRAISON RECOMMANDÉ
==========================================================

Phase 1 — Fondations UX (menu + langue + saves)
  → v4.00

Phase 2 — World & Simulation (les features visuelles "wow")
  → v4.01 (World View)
  → v4.02 (Mission Sim)

Phase 3 — Gameplay core
  → v4.03 (Missions V2)
  → v4.04 (Recrutement V2)
  → v4.05 (Niveaux Agents)
  → v4.06 (Niveaux Pokémon)
  → v4.07 (Salles V2)

Phase 4 — Polish & Profondeur
  → v4.08 (Sprites salles)
  → v4.09 (Pokédex)
  → v4.10 (Chat allié)
  → v4.11 (Lore NPCs)

==========================================================
CHANGELOG (mis à jour à chaque livraison)
==========================================================

v3 (22/03/2026) :
  - Full FR Pokémon Gen1/Gen2 (noms officiels)
  - Système de Réputation
  - Missions avec risque/durée/récompense
  - Événements aléatoires
  - Générateur NPC v2
  - Character Sheet injectée dans LLM

v4.00 : à venir

==========================================================
CHANGELOG — MIS À JOUR
==========================================================

[x] v4.00 — MENU PRINCIPAL (22/03/2026)
    Fichier : menu.html
    - Menu principal séparé de index.html
    - DA sombre style Team Rocket (scanlines, glow rouge, fond radial)
    - Police Press Start 2P (pixel font)
    - Animation de fond : sprites Pokémon flottants (zubat, koffing, ekans...)
    - Sélection FR / EN au démarrage, stockée en localStorage (pf.lang)
    - I18N appliquée à toute l'UI du menu
    - 3 slots de sauvegarde avec affichage : boss, team, tour, date
    - Slot vide → ouverture d'un formulaire "Nouvelle partie"
    - Slot occupé → boutons Charger / Supprimer
    - Redirection vers index.html?slot=X&lang=fr|en au lancement
    - Panel Paramètres LLM (URL Ollama, modèle, toggle)
    - Overlay Crédits

[ ] v4.01 — WORLD VIEW (à faire)


==========================================================
CHANGELOG — SUITE
==========================================================

[x] v4.02 (22/03/2026) — Mission Simulation
    - Pop-up de résolution step-by-step
    - Backgrounds dynamiques par zone (marais, grotte, silph, safari, route, centre)
    - Sprites agents + Pokémon ennemis animés
    - Bulles de dialogue avec auto-disparition
    - Événement Jenny (shake + log)
    - Affichage récompenses + bouton Continuer

[x] v4.03 (22/03/2026) — Missions V2
    - 8 nouvelles missions (vol, raid, trafic, event rare)
    - Retrait salle de capture (conversion en Pokédollars)
    - Récompenses Pokémon directes selon zone
    - Mort en mission (probabiliste selon risque)
    - Capture par Jenny (saisie d'un Pokémon d'équipe)
    - Cooldown : agent 1 tour, Pokémon 2 tours
    - Trait Bourreau de travail : réduit cooldowns à 0/1

[x] v4.04 (22/03/2026) — Recrutement V2
    - 3 interactions max (était 5)
    - Coût 100₽ par interaction, bloqué si fonds insuffisants
    - Barre visuelle de progression (3 points)
    - Trait Bourreau de travail (15% chance) à la réussite

[x] v4.05 (22/03/2026) — Niveaux Agents
    - level 1-5, XP via missions et salle d'apprentissage
    - Paliers 0/50/120/250/500 XP
    - Barre XP visuelle dans la carte agent
    - Cooldown visible "[Repos N tour(s)]"

[x] v4.06 (22/03/2026) — Niveaux Pokémon + Évolution
    - XP Pokémon, palier +1 niveau tous les 30 XP
    - Table d'évolution Gen1/Gen2 (20+ espèces)
    - Évolution uniquement en salle d'entraînement en début de tour
    - Événements spéciaux permanents (bonus/malus stat)

[x] v4.07 (22/03/2026) — Salles V2
    - Salle d'apprentissage : 1 agent assigné, 5 combats/tour, XP agent+Pokémon
    - Salle d'entraînement Pokémon : 1-3 slots selon level
    - XP/tour = baseXP × level de salle
    - Évolution déclenchée en début de tour si conditions remplies

[x] v4.08 (22/03/2026) — Sprites Salles
    - Bande sticky en bas de page
    - 4 cartes (Commandement, Nurserie, Apprentissage, Entraînement)
    - Sprites agents/Pokémon animés (float)
    - Flash rouge/vert sur événement spécial

[x] v4.09 (22/03/2026) — Pokédex + Combo Dex
    - Pokédex : grille par espèce, compteur obtenu/perdu
    - Débloqué au premier obtenu, entrée mise à jour automatiquement
    - Combo Dex : pattern de types détecté automatiquement
    - Récompense +10₽ à chaque nouveau combo validé
    - Bouton "Appliquer" si Pokémon disponibles

[x] v4.10 (22/03/2026) — Chat Allié Recentré
    - Retrait du chat PNJ global
    - Panel "Briefing allié" : uniquement agents recrutés
    - 1 seule conversation par tour, reset à chaque nouveau tour
    - Chance 20% de bonus narratif (Intel ou Pokédollars)

[x] v4.11 (22/03/2026) — Lore NPCs
    - Giovanni (superviseur permanent, niveau 10)
    - Archer + Ariane (agents alliés si réputation >= 40)
    - Jessie + James (recrutables via événement si tour > 5 et réputation > 20)
    - Professeur Chen + Red (antagonistes de missions)
    - Tous injectés avec Character Sheets dans les prompts LLM
    - Répliques FR/EN selon langue active

[x] v4.12 (22/03/2026) — app.js v4 complet
    - Fusion de tous les modules v4.01 → v4.11
    - Lecture slot et langue depuis URL (?slot=X&lang=fr)
    - Save/Load slot-aware (pf.slot1/2/3)
    - processTurn() v4 complet
    - bootV4() : migration, init, lore NPC check, world spawner

[x] v4.13 (22/03/2026) — index_v4.html final
    - Layout 4 colonnes (Boss+Salles / Pokémon+Équipes+Pokédex / Missions+Agents / Chat+Logs)
    - World Band sticky en haut
    - Rooms Band sticky en bas
    - Tous les panels v4 intégrés
    - Police Press Start 2P sur les titres
    - Bouton ← Menu pour retourner au menu.html
    - DA sombre cohérente avec menu.html

==========================================================
FICHIERS FINAUX À DÉPLOYER
==========================================================
  menu.html      ← Page d'accueil (3 slots, FR/EN, settings)
  index_v4.html  ← Interface de jeu principale
  app_v4.js      ← Logique complète v4

==========================================================
NOTES D'INTÉGRATION
==========================================================
  1. Renommer index_v4.html → index.html dans ton projet
  2. Renommer app_v4.js → app.js (ou garder app_v4.js et le référencer tel quel)
  3. Le menu.html redirige vers index.html?slot=X&lang=fr|en
  4. Les saves sont stockées dans localStorage sous pf.slot1/2/3
  5. Les anciens saves (pokeforge.rocket-hq.state) ne sont PAS migrés automatiquement
