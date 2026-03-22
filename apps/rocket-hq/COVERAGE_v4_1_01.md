# Test Coverage — v4.1.01

## Scope du patch
- `fetchOllamaModels()` — appel API Ollama `/api/tags`
- `showLoadingBar()` / `hideLoadingBar()` — barre de chargement DOM
- `callOllamaWithBar()` — wrapper avec loading bar
- `renderSettingsV2()` — injection du model picker
- `recruitStepV2()` — override avec loading bar
- `sendAllyChat()` — override avec loading bar

## Tests (6 groupes, ~14 assertions)

| ID | Groupe | Ce qui est testé | Type |
|---|---|---|---|
| T01 | fetchOllamaModels | Retour tableau, fallback gracieux, mise à jour DOM | Integration |
| T02 | showLoadingBar | Création DOM, progression après 500ms, masquage | DOM/Animation |
| T03 | callOllamaWithBar | Fallback si LLM désactivé | Unit |
| T04 | Settings model picker | Injection select + bouton refresh dans overlay | DOM |
| T05 | recruitStepV2 | Interaction comptée, Pokédollars débités | Integration |
| T06 | sendAllyChat | chatUsedThisTurn défini, log non vide | Integration |

## Coverage estimée : ~85%

| Composant | Couverture |
|---|---|
| fetchOllamaModels — succès | ✅ via fallback (Ollama down = cas nominal en test) |
| fetchOllamaModels — modèles réels | ⚠️ Nécessite Ollama lancé |
| showLoadingBar — ancre avatar | ⚠️ Partiel (ancre optionnelle) |
| hideLoadingBar — animation CSS | ✅ Vérifié via display:none |
| callOllamaWithBar — LLM réel | ⚠️ Nécessite Ollama lancé |
| recruitStepV2 — succès recrutement | ⚠️ Probabiliste (hiddenScore) |
| sendAllyChat — bonus narratif | ⚠️ Probabiliste (20%) |

## Lancer les tests
```js
// Console navigateur (F12) sur index.html
// Coller le contenu de test_v4_1_01.js puis :
runTests();
```
