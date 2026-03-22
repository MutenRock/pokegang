# Patch v4.1.01 — Ollama Model Picker + Loading Bar

## Fichiers modifiés
- `app.js` — append du patch à la fin
- `pokellmon_bridge.js` — nouveau fichier side script (inactif)

## Résumé
Deux ajouts UX : sélection des modèles Ollama disponibles dans les settings, et barre de chargement animée lors de tout appel LLM.

## Ollama Model Picker
- Appel `GET /api/tags` au moment de l'ouverture du panel Settings
- `<select id="ollamaModelSelect">` injecté dynamiquement sous le champ modèle texte
- Bouton 🔄 pour rafraîchir la liste
- Sélection persistée dans `pf.settings`
- Fallback gracieux si Ollama down : status `❌ Ollama inaccessible`

## Loading Bar
- Barre globale 3px en bas de page (`#llmLoadingBar`) : gradient rouge→jaune→vert
- Mini barre 64px au-dessus du sprite du personnage qui parle (`#llmAvatarBar`)
- Label animé (blink) avec le nom du personnage
- Progression indéterminée simulée : +random% toutes les 200ms, plafonné à 92%
- Fin : remplissage à 100% → disparition en 400ms

## Contextes d'utilisation
| Contexte | Ancre | Label |
|---|---|---|
| Recrutement PNJ | `#recruitCandidate` | Nom du candidat |
| Chat allié | `#allyChatPanel` | Nom de l'agent |
| Missions (LLM) | *(global bar)* | — |

## PokéLLMon (side script)
- Mis de côté dans `pokellmon_bridge.js`
- Contient : `checkPokellmon()`, `pokellmonChooseMove()`, `pokellmonResolveCombat()`, `pokellmonMissionHook()`
- Candidat v5 pour un mode "Duel interactif"
- Activer en ajoutant `<script src="pokellmon_bridge.js"></script>` avant `app.js`

## Fonctions introduites
- `fetchOllamaModels()`, `showLoadingBar(anchorId, label)`, `hideLoadingBar(handle)`
- `callOllamaWithBar(prompt, fallback, anchorId, label)`
- `renderSettingsV2()` (override)
- `recruitStepV2()` (override avec bar)
- `sendAllyChat()` (override avec bar)
