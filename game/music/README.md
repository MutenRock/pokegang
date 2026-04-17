# 🎵 PokéGang — Musiques de fond

Placez ici les fichiers audio (.mp3 recommandé) correspondant aux clés définies dans `MUSIC_TRACKS` (game/app.js).

## Catalogue de pistes attendues

| Fichier          | Zone(s)                                       | Ambiance               |
|------------------|-----------------------------------------------|------------------------|
| `base.mp3`       | Base du Gang (Gang tab, Zones tab vide)       | Calme, HQ              |
| `forest.mp3`     | Route 1, Forêt de Jade, Jardin de Pallet     | Nature, exploration    |
| `cave.mp3`       | Mont Sélénite, Grotte Taupiqueur, Route Victoire, Grotte Inconnue | Mystérieux, sombre |
| `city.mp3`       | Centrale                                      | Urbain, électrique     |
| `sea.mp3`        | Îles Écume, Bateau St. Anne                   | Marin, aventurier      |
| `safari.mp3`     | Parc Safari                                   | Exotique, naturel      |
| `gym.mp3`        | Toutes les arènes (sauf Plateau Indigo)       | Tendu, combat          |
| `rocket.mp3`     | Team Rocket (événements)                      | Dramatique, menace     |
| `silph.mp3`      | Sylphe SARL                                   | Techno, infiltration   |
| `elite4.mp3`     | Plateau Indigo                                | Épique, climax         |
| `casino.mp3`     | Casino de Céladopole                          | Jazz, nuit             |
| `lavender.mp3`   | Tour Pokémon                                  | Lugubre, fantôme       |

## Format recommandé
- Format : **MP3** (bonne compatibilité navigateur)
- Bitrate : 128–192 kbps (équilibre qualité/taille)
- Durée : 1–3 minutes (la boucle est gérée par le moteur)
- Loop : les fichiers doivent pouvoir se boucler proprement (même silence au début et à la fin)

## Comment ajouter une piste
1. Placez votre fichier `.mp3` dans ce dossier
2. Dans `MUSIC_TRACKS` (app.js), la clé `file` référence le chemin depuis `game/` (ex: `'music/forest.mp3'`)
3. Dans `ZONE_MUSIC_MAP`, associez l'ID de zone à la clé de piste

## Crossfade
Le moteur (`MusicPlayer`) effectue un fondu croisé de **2 secondes** entre les pistes.
Quand une zone est ouverte, sa musique démarre. À la fermeture, le contexte passe
à la prochaine zone ouverte ou s'arrête progressivement.
