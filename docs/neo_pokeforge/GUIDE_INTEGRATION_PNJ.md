# Guide d'Intégration : Générateur de PNJ et Lore dans Rocket HQ

Ce guide explique comment utiliser le pack `pokeforge_random_and_lore_pack` pour créer le prochain patch de l'application Rocket HQ. Il couvre l'intégration des fiches statiques (Lore) et la génération procédurale dynamique dans la boucle de gameplay (notamment pour le recrutement).

## 1. Structure à intégrer

Après avoir décompressé les archives `pokeforge_character_sheets` et `pokeforge_random_and_lore_pack`, voici comment structurer votre projet :

```text
packages/npc-mind/           <-- Nouveau package recommandé
  ├── data/
  │   ├── characters/        <-- Les fiches statiques (Giovanni, Archer, Jessie, James...)
  │   └── lore_characters/   <-- Les fiches statiques (Red, Oak...)
  ├── generator/
  │   └── npc_generator.js   <-- L'algorithme de génération procédurale
  └── loader/
      └── load_characters.js <-- Le chargeur de fichiers JSON
```

## 2. Modification de `apps/rocket-hq/app.js`

L'objectif principal est de remplacer les agents "en dur" par des PNJ générés dynamiquement lorsqu'on ouvre le panel de recrutement ou lorsqu'on dresse une nouvelle cible de mission.

### A. Importer le générateur

En haut de `app.js` (si vous utilisez les modules ES) :
```javascript
import { generateRandomNPC } from '../../packages/npc-mind/generator/npc_generator.js';
// Ajustez le chemin selon votre configuration de build (Vite/Rollup)
```

*Note : Si `app.js` n'utilise pas de bundler, vous devrez peut-être transpiler `npc_generator.js` pour le navigateur ou l'inclure directement dans le fichier.*

### B. Mettre à jour le State Initial

Modifiez `BASESTATE` pour inclure une section d'agents disponibles au recrutement :

```javascript
const BASESTATE = {
  // ... autres propriétés
  recruitsPool: [], // Liste des PNJ générés qui attendent d'être recrutés
  agents: [],       // Vos agents actifs (utilisera désormais le format des Character Sheets)
  // ...
};
```

### C. Générer des recrues à chaque tour

Dans votre fonction de changement de tour (`nextTurn` ou équivalent), ajoutez une logique pour rafraîchir le pool de recrues. On cible spécifiquement des profils de type "villain" (Team Rocket) ou "criminal".

```javascript
function refreshRecruitsPool() {
  // On vide les anciens candidats non recrutés
  state.recruitsPool = [];

  // On génère 3 nouveaux candidats avec une tendance Rocket/Criminel
  for(let i=0; i<3; i++) {
    const candidate = generateRandomNPC({
      // On peut forcer le rôle ici si on veut
      roleObj: { id: "rocket_grunt", faction: "team_rocket", orientation: "villain", sprites: ["rocketgrunt", "rocketgruntf"], types: ["poison", "dark", "normal"] } 
    });
    state.recruitsPool.push(candidate);
  }
}
```

### D. Brancher l'UI de Recrutement

Modifiez la fonction qui gère le clic sur le bouton "Recruter un agent".

```javascript
// Fonction déclenchée lors de l'ouverture du menu de recrutement
function renderRecruitmentPanel() {
  const panel = document.getElementById('recruitCandidateList');
  panel.innerHTML = state.recruitsPool.map((npc, index) => `
    <div class="recruit-card">
      <img src="${npc.sprite}" alt="${npc.name}">
      <h4>${npc.name}</h4>
      <p>Traits: ${npc.personality.join(', ')}</p>
      <p>Pokémon favoris: ${npc.pokemon_preferences.join(', ')}</p>
      <button onclick="startRecruitmentChat(${index})">Discuter (LLM)</button>
    </div>
  `).join('');
}
```

### E. Injecter la Character Sheet dans le Prompt LLM

Quand le joueur lance la discussion de recrutement, on passe la fiche complète au LLM.

```javascript
async function startRecruitmentChat(index) {
  const npc = state.recruitsPool[index];

  // Prépare le prompt système
  const systemPrompt = `
You are roleplaying a character from the Pokémon world in a management game.
You are currently being interviewed by a Team Rocket executive to join their base.

Character sheet (JSON):
${JSON.stringify(npc, null, 2)}

Stay consistent with your personality, goals, and speech style.
The player will ask you questions. You must decide during the conversation if you want to join them or not based on your trust_level and orientation.
`;

  // Lance l'interface de chat (adaptez selon votre logique existante)
  openChatOverlay(npc, systemPrompt);
}
```

### F. Validation du recrutement

Si la conversation LLM se solde par un succès (le PNJ accepte), transférez-le du pool vers vos agents actifs.

```javascript
function confirmRecruitment(npcId) {
  const recruitIndex = state.recruitsPool.findIndex(n => n.id === npcId);
  if(recruitIndex > -1) {
    const recruit = state.recruitsPool.splice(recruitIndex, 1)[0];

    // Ajout à la base d'agents (avec la structure Character Sheet complète)
    state.agents.push(recruit);

    // Bonus : Ajout direct des Pokémon du PNJ à la base du joueur (ou assignés par défaut)
    recruit.possible_pokemon.forEach(pkmnSpecies => {
      state.pokemons.push({
        id: `pk-${Date.now()}-${Math.floor(Math.random()*100)}`,
        species: pkmnSpecies,
        level: Math.floor(Math.random() * 10) + 5,
        assignedAgentId: recruit.id
      });
    });

    addLog(`${recruit.name} a rejoint l'équipe !`);
    saveState();
    renderTeamBuilder(); // Rafraichir l'UI
  }
}
```

## 3. Ajout des "Boss" (Jessie, James, Giovanni)

Pour le Lore, ces personnages ne doivent pas être générés aléatoirement. Vous pouvez :
1. Les charger au démarrage du jeu via `load_characters.js` si c'est un jeu backend/Node.
2. Si vous êtes 100% frontend (Vanilla JS), copiez le contenu JSON de ces personnages directement dans un fichier `lore_data.js` et exportez-les comme des constantes pour les injecter dans le jeu (par exemple, comme cibles de boss ou alliés spéciaux).
