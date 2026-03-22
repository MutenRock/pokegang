// ============================================================
// POKEFORGE — ROCKET HQ  app.js  v2
// Patch : Character Sheets + NPC Generator + LLM Injection
// ============================================================

// ── SPRITES ──────────────────────────────────────────────
const TRAINER_SPRITES = [
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunt.png',
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunf.png',
  'https://play.pokemonshowdown.com/sprites/trainers/giovanni-gen2.png',
  'https://play.pokemonshowdown.com/sprites/trainers/archer.png',
  'https://play.pokemonshowdown.com/sprites/trainers/ariana.png',
  'https://play.pokemonshowdown.com/sprites/trainers/proton.png',
  'https://play.pokemonshowdown.com/sprites/trainers/scientist.png',
  'https://play.pokemonshowdown.com/sprites/trainers/scientistf.png',
];

// ── NPC GENERATOR DATA ───────────────────────────────────
const NPC_FIRST_NAMES_M = [
  'Albert','Arthur','Auguste','Alain','Antoine','Alfred','Armand','Arnold','Andy','Anthony',
  'Bernard','Bill','Bob','Ben','Bruno','Bertrand','Bruce','Barry','Brian','Bastien',
  'Claude','Charles','Calvin','Chad','Carl','Colin','Clement','Corentin','Christian','Cyril',
  'Denis','Dan','Don','David','Damien','Didier','Daniel','Dylan','Dexter','Dustin',
  'Edouard','Emile','Earl','Edward','Eric','Etienne','Eugene','Ernest','Evan','Edgar',
  'Francois','Felix','Fred','Frank','Fabien','Florent','Fernand','Fabrice','Floyd','Fletcher',
  'Georges','Gaston','Guy','Gene','George','Gilles','Gerard','Guillaume','Gordon','Gary',
  'Henri','Harry','Howard','Harold','Hugo','Hector','Harvey','Hubert','Homer','Harrison',
  'Jacques','Jean','Joey','James','Jim','Joe','Jack','Jay','Jules','Justin',
  'Louis','Laurent','Lucien','Lee','Liam','Leo','Lucas','Leon','Lance','Lester',
];

const NPC_FIRST_NAMES_F = [
  'Alice','Anne','Agnes','Amelie','Audrey','Aurore','Anita','April','Amanda','Abigail',
  'Brigitte','Beatrice','Blandine','Betty','Bonnie','Barbara','Brenda','Blanche','Bessie','Bernice',
  'Catherine','Chantal','Christiane','Claire','Colette','Celine','Carol','Cindy','Chloe','Clara',
  'Danielle','Denise','Diane','Delphine','Dorothee','Daisy','Donna','Doris','Diana','Darlene',
  'Edith','Elisabeth','Elodie','Emilie','Estelle','Emma','Emily','Evelyn','Eleanor','Edna',
  'Francine','Francoise','Florence','Fabienne','Fanny','Flora','Faye','Felicia','Fern','Fiona',
  'Genevieve','Gisele','Gaelle','Grace','Gloria','Gladys','Gail','Gwendolyn','Gwen','Georgia',
  'Helene','Hortense','Henriette','Hazel','Helen','Heather','Holly','Heidi','Hilda','Hope',
  'Jacqueline','Jeanne','Josiane','Juliette','Justine','Jane','Judy','Joyce','Joan','Janet',
  'Louise','Lucie','Laurence','Laura','Linda','Lucy','Lois','Lillian','Loretta','Lynn',
];

const NPC_LAST_NAMES = [
  'Dubois','Dupont','Durand','Martin','Bernard','Thomas','Petit','Robert','Richard','Moreau',
  'Laurent','Simon','Michel','Lefevre','Leroy','Roux','David','Bertrand','Morel','Fournier',
  'Girard','Bonnet','Lambert','Fontaine','Rousseau','Vincent','Muller','Faure','Andre','Mercier',
  'Blanc','Guerin','Boyer','Garnier','Chevalier','Francois','Legrand','Gauthier','Garcia','Perrin',
  'Robin','Clement','Morin','Nicolas','Henry','Roussel','Mathieu','Gautier','Masson','Marchand',
  'Duval','Denis','Dumont','Marie','Lemaire','Noel','Meyer','Dufour','Meunier','Brun',
  'Blanchard','Giraud','Joly','Lucas','Brunet','Gaillard','Barbier','Arnaud','Martinez','Gerard',
  'Roche','Renard','Schmitt','Roy','Leroux','Colin','Vidal','Caron','Picard','Roger',
  'Oak','Elm','Birch','Rowan','Stone','Water','Smith','Johnson','Williams','Brown',
  'Chen','Seko','Orme','Sorbier','Rocher','Caillou','Bois','Riviere','Montagne','Foret',
];

const NPC_ROLES = [
  { id: 'Infiltration',  faction: 'team_rocket', traits: ['discret','loyal','nerveux'],     types: ['poison','dark'],    sprites: ['rocketgrunt','rocketgrunf'] },
  { id: 'Science',       faction: 'team_rocket', traits: ['intelligent','froid','precis'],  types: ['electric','psychic'],sprites: ['scientist','scientistf'] },
  { id: 'Combat',        faction: 'team_rocket', traits: ['agressif','courageux','brutal'], types: ['fighting','poison'],sprites: ['rocketgrunt'] },
  { id: 'Logistique',    faction: 'team_rocket', traits: ['organisé','méfiant','fiable'],   types: ['normal','dark'],    sprites: ['rocketgrunf'] },
  { id: 'Renseignement', faction: 'team_rocket', traits: ['observateur','calme','rusé'],    types: ['psychic','dark'],   sprites: ['scientist'] },
];

const NPC_POKEMON_BY_TYPE = {
  poison:   ['ekans','arbok','koffing','weezing','grimer','muk','zubat','golbat'],
  dark:     ['murkrow','sneasel','houndour','houndoom','poochyena'],
  electric: ['magnemite','magneton','voltorb','electrode','electabuzz'],
  psychic:  ['abra','kadabra','drowzee','hypno','mr-mime'],
  fighting: ['mankey','machop','machoke','hitmonlee','hitmonchan'],
  normal:   ['rattata','raticate','meowth','persian','snorlax'],
};

const NPC_CATCHPHRASES = [
  "Je ne me bats pas pour perdre.",
  "La Team Rocket ne pardonne pas.",
  "Tu veux jouer ? Très bien.",
  "J'ai des ordres. Tu es dans mon chemin.",
  "Ne prends pas ça personnellement.",
  "Give me your Pokémon!",
  "You can't stop Team Rocket!",
  "Don't get in my way.",
  "I'm doing this for the boss.",
  "You'll regret crossing us.",
];

// ── EXTENDED POKEDEX POOL ────────────────────────────────
const POKEDEX_POOL = [
  'ekans','koffing','zubat','grimer','meowth','arbok','weezing','rattata','magnemite','gastly',
  'drowzee','cubone','voltorb','electrode','ditto','porygon','houndour','murkrow','sneasel',
];

// ── NPC GENERATOR ────────────────────────────────────────
function generateNPC() {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstName = pick(gender === 'male' ? NPC_FIRST_NAMES_M : NPC_FIRST_NAMES_F);
  const lastName   = pick(NPC_LAST_NAMES);
  const role       = pick(NPC_ROLES);
  const primaryType = pick(role.types);
  const pool = NPC_POKEMON_BY_TYPE[primaryType] || NPC_POKEMON_BY_TYPE.normal;
  const possiblePokemon = [...new Set([pick(pool), pick(pool), pick(pool)])];
  const sprite = `https://play.pokemonshowdown.com/sprites/trainers/${pick(role.sprites)}.png`;

  return {
    id:            `npc-${Date.now()}-${Math.floor(Math.random()*9999)}`,
    name:          `${firstName} ${lastName}`,
    firstName,
    lastName,
    gender,
    age:           10 + Math.floor(Math.random() * 40),
    role:          role.id,
    faction:       role.faction,
    personality:   [pick(role.traits), pick(role.traits)],
    orientation:   'villain',
    trust_level:   1 + Math.floor(Math.random() * 4),
    goals: {
      short_term:  'Survivre et servir la Team Rocket.',
      long_term:   'Monter en grade et s\'enrichir.',
    },
    values:        [pick(['argent','pouvoir','loyauté','survie']), pick(['ordre','chaos','respect','force'])],
    speech_style: {
      tone:        pick(['froid','nerveux','confiant','agressif']),
      verbosity:   pick(['low','medium']),
      formality:   pick(['low','medium']),
    },
    catch_phrases: [pick(NPC_CATCHPHRASES)],
    pokemon_preferences: [primaryType],
    possible_pokemon:    possiblePokemon,
    sprite,
    memories:        [],
    relationships:   {},
    events_history:  [],
    hiddenScore:     Math.floor(Math.random() * 5) + 3,
  };
}

// ── BASE STATE ───────────────────────────────────────────
const BASE_STATE = {
  turn: 1,
  profile: {
    initialized: false,
    team: 'Team Rocket',
    firstName: 'Ari',
    lastName: 'Voss',
    sprite: TRAINER_SPRITES[0],
  },
  resources: { pokedollars: 1800, capturePoints: 0, breedingPoints: 0, intel: 0 },
  rooms: {
    command:  { name: 'Salle de commandement', level: 1, baseIncome: 120, upgradeCost: 700 },
    capture:  { name: 'Salle de capture',      level: 1, baseIncome: 2,   upgradeCost: 550 },
    breeding: { name: 'Nurserie / Élevage',    level: 1, baseIncome: 2,   upgradeCost: 550 },
    training: { name: 'Salle d\'entraînement', level: 1, baseIncome: 1,   upgradeCost: 600 },
  },
  agents: [
    { id: 'ag-1', name: 'Mira',   rank: 'Agent',       team: [], sprite: TRAINER_SPRITES[1], personality: ['loyal','discret'],     catch_phrases: ['Ordre reçu.'],     pokemon_preferences: ['poison'] },
    { id: 'ag-2', name: 'Nox',    rank: 'Scientifique', team: [], sprite: TRAINER_SPRITES[6], personality: ['intelligent','froid'], catch_phrases: ['Fascinant.'],      pokemon_preferences: ['psychic'] },
  ],
  npcs: [
    { name: 'Riko',  mood: 'méfiant', sprite: TRAINER_SPRITES[0], catch_phrases: ['Je ne fais confiance à personne.'] },
    { name: 'Vera',  mood: 'calme',   sprite: TRAINER_SPRITES[1], catch_phrases: ['Tout est sous contrôle.'] },
  ],
  pokemons: [
    { id: 'pk-1', species: 'ekans',   level: 9,  assignedAgentId: null },
    { id: 'pk-2', species: 'koffing', level: 10, assignedAgentId: null },
    { id: 'pk-3', species: 'zubat',   level: 8,  assignedAgentId: null },
  ],
  newPokemonsThisTurn: [],
  breedingQueue: [],
  recruit: null,          // sera rempli par generateNPC() au 1er render
  recruitsPool: [],       // pool de 3 candidats renouvelé à chaque recrutement terminé
  selectedNpc: 'Riko',
  log: [],
};

const DEFAULT_SETTINGS = { llmEnabled: false, baseUrl: 'http://localhost:11434', model: 'gemma3:4b' };

// ── UI REFS ──────────────────────────────────────────────
const ui = {
  turnValue:          document.getElementById('turnValue'),
  llmBadge:           document.getElementById('llmBadge'),
  nextTurnBtn:        document.getElementById('nextTurnBtn'),
  playerSprite:       document.getElementById('playerSprite'),
  playerName:         document.getElementById('playerName'),
  teamName:           document.getElementById('teamName'),
  resourcesGrid:      document.getElementById('resourcesGrid'),
  roomsList:          document.getElementById('roomsList'),
  pokemonOwnedList:   document.getElementById('pokemonOwnedList'),
  pokemonNewList:     document.getElementById('pokemonNewList'),
  agentSelect:        document.getElementById('agentSelect'),
  pokemonSelect:      document.getElementById('pokemonSelect'),
  assignTeamBtn:      document.getElementById('assignTeamBtn'),
  agentTeams:         document.getElementById('agentTeams'),
  difficultySelect:   document.getElementById('difficultySelect'),
  startTrainingFightBtn: document.getElementById('startTrainingFightBtn'),
  trainingResult:     document.getElementById('trainingResult'),
  agentsList:         document.getElementById('agentsList'),
  recruitCandidate:   document.getElementById('recruitCandidate'),
  recruitTranscript:  document.getElementById('recruitTranscript'),
  recruitMessage:     document.getElementById('recruitMessage'),
  sendRecruitBtn:     document.getElementById('sendRecruitBtn'),
  npcList:            document.getElementById('npcList'),
  npcMessage:         document.getElementById('npcMessage'),
  npcSendBtn:         document.getElementById('npcSendBtn'),
  logOutput:          document.getElementById('logOutput'),
  introOverlay:       document.getElementById('introOverlay'),
  teamInput:          document.getElementById('teamInput'),
  firstNameInput:     document.getElementById('firstNameInput'),
  lastNameInput:      document.getElementById('lastNameInput'),
  spriteSelect:       document.getElementById('spriteSelect'),
  spritePreview:      document.getElementById('spritePreview'),
  introStartBtn:      document.getElementById('introStartBtn'),
  challengeOverlay:   document.getElementById('challengeOverlay'),
  challengeBody:      document.getElementById('challengeBody'),
  challengeYesBtn:    document.getElementById('challengeYesBtn'),
  challengeNoBtn:     document.getElementById('challengeNoBtn'),
  settingsOverlay:    document.getElementById('settingsOverlay'),
  openSettingsBtn:    document.getElementById('openSettingsBtn'),
  closeSettingsBtn:   document.getElementById('closeSettingsBtn'),
  llmEnabledToggle:   document.getElementById('llmEnabledToggle'),
  baseUrlInput:       document.getElementById('baseUrlInput'),
  modelInput:         document.getElementById('modelInput'),
  testOllamaBtn:      document.getElementById('testOllamaBtn'),
  llmStatus:          document.getElementById('llmStatus'),
  saveBtn:            document.getElementById('saveBtn'),
  loadBtn:            document.getElementById('loadBtn'),
  resetBtn:           document.getElementById('resetBtn'),
  exportSaveBtn:      document.getElementById('exportSaveBtn'),
  importSaveBtn:      document.getElementById('importSaveBtn'),
  saveFileInput:      document.getElementById('saveFileInput'),
  exportCodeBtn:      document.getElementById('exportCodeBtn'),
  importCodeBtn:      document.getElementById('importCodeBtn'),
  exportLogsBtn:      document.getElementById('exportLogsBtn'),
};

let state    = loadState() || structuredClone(BASE_STATE);
let settings = loadSettings();
let pendingNpcChallenge = null;

// ── UTILS ─────────────────────────────────────────────────
function pokeSprite(species) {
  return `https://play.pokemonshowdown.com/sprites/gen5/${species}.png`;
}
function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
function addLog(text) {
  state.log.unshift(`[T${state.turn}] ${text}`);
  state.log = state.log.slice(0, 200);
}
function saveState()    { localStorage.setItem('pokeforge.rocket-hq.state', JSON.stringify(state)); }
function saveSettings() { localStorage.setItem('pokeforge.rocket-hq.settings', JSON.stringify(settings)); }

function loadState() {
  const raw = localStorage.getItem('pokeforge.rocket-hq.state');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
function loadSettings() {
  const raw = localStorage.getItem('pokeforge.rocket-hq.settings');
  if (!raw) return { ...DEFAULT_SETTINGS };
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }; } catch { return { ...DEFAULT_SETTINGS }; }
}

// ── LLM ──────────────────────────────────────────────────
async function callOllama(prompt, fallback) {
  if (!settings.llmEnabled) return fallback;
  try {
    const res = await fetch(`${settings.baseUrl.replace(/\/$/, '')}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: settings.model, prompt, stream: false }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.response?.trim() || fallback;
  } catch { return fallback; }
}

// ── BUILD NPC SYSTEM PROMPT (Character Sheet injection) ──
function buildNpcSystemPrompt(npc) {
  return `Tu incarnes un personnage dans un jeu de gestion criminel style Pokémon.

Fiche personnage :
Nom : ${npc.name}
Rôle : ${npc.role}
Faction : ${npc.faction}
Personnalité : ${npc.personality?.join(', ')}
Valeurs : ${npc.values?.join(', ')}
Style : ton ${npc.speech_style?.tone}, verbosité ${npc.speech_style?.verbosity}
Réplique type : "${npc.catch_phrases?.[0]}"
Pokémon préférés : ${npc.possible_pokemon?.join(', ')}

Reste strictement dans ce personnage. Réponds en une ou deux phrases max.`;
}

// ── RECRUIT CANDIDATE INIT ────────────────────────────────
function initRecruit() {
  const npc = generateNPC();
  state.recruit = {
    npc,
    candidateName:  npc.name,
    candidateRole:  npc.role,
    interactions:   0,
    hiddenScore:    npc.hiddenScore,
    transcript:     [],
    finished:       false,
  };
}

// ── RENDER ───────────────────────────────────────────────
function renderResources() {
  const labels = { pokedollars: '💰 Pokédollars', capturePoints: '🎣 Capture', breedingPoints: '🥚 Élevage', intel: '🔍 Intel' };
  ui.resourcesGrid.innerHTML = Object.entries(state.resources)
    .map(([k, v]) => `<div class="stat"><strong>${labels[k] || k}</strong><div>${v}</div></div>`)
    .join('');
}

function renderRooms() {
  ui.roomsList.innerHTML = Object.entries(state.rooms).map(([roomId, room]) => `
    <div class="room">
      <div><strong>${room.name}</strong> Niv.${room.level}</div>
      <div class="row"><small>Production/tour : ${room.baseIncome * room.level}</small>
      <button data-room="${roomId}">Améliorer ${room.upgradeCost}$</button></div>
    </div>`).join('');
  ui.roomsList.querySelectorAll('button[data-room]').forEach(btn => {
    btn.onclick = () => {
      const room = state.rooms[btn.dataset.room];
      if (state.resources.pokedollars < room.upgradeCost) return addLog(`Pas assez de pokédollars pour ${room.name}.`);
      state.resources.pokedollars -= room.upgradeCost;
      room.level += 1;
      room.upgradeCost = Math.round(room.upgradeCost * 1.5);
      addLog(`${room.name} améliorée niveau ${room.level}.`);
      saveState(); render();
    };
  });
}

function renderPokemonPanels() {
  ui.pokemonOwnedList.innerHTML = state.pokemons.map(p => {
    const agent = state.agents.find(a => a.id === p.assignedAgentId);
    return `<div class="card pokemon">
      <img class="poke-sprite" src="${pokeSprite(p.species)}" alt="${p.species}">
      <div>${p.species} Lv.${p.level}</div>
      <small>${agent ? `→ ${agent.name}` : 'Non assigné'}</small>
    </div>`;
  }).join('');
  ui.pokemonNewList.innerHTML = state.newPokemonsThisTurn.length
    ? state.newPokemonsThisTurn.map(p => `
      <div class="card pokemon">
        <img class="poke-sprite" src="${pokeSprite(p.species)}" alt="${p.species}">
        <div>${p.species} Lv.${p.level}</div>
      </div>`).join('')
    : '<div class="card">Aucun nouveau Pokémon ce tour.</div>';
}

function renderTeamBuilder() {
  ui.agentSelect.innerHTML  = state.agents.map(a => `<option value="${a.id}">${a.name} – ${a.rank}</option>`).join('');
  ui.pokemonSelect.innerHTML = state.pokemons.map(p => `<option value="${p.id}">${p.species} Lv.${p.level}</option>`).join('');
  ui.agentTeams.innerHTML = state.agents.map(a => {
    const names = a.team.map(id => state.pokemons.find(p => p.id === id)?.species).filter(Boolean);
    const sprite = a.sprite ? `<img src="${a.sprite}" style="height:40px;vertical-align:middle;margin-right:6px;">` : '';
    return `<div class="card">${sprite}<strong>${a.name}</strong> — ${a.rank}
      <div><small>${names.length ? names.join(', ') : 'Aucune équipe'}</small></div>
    </div>`;
  }).join('');
}

function renderAgentsAndRecruitment() {
  ui.agentsList.innerHTML = state.agents.map(a => {
    const sprite = a.sprite ? `<img src="${a.sprite}" style="height:36px;vertical-align:middle;margin-right:6px;">` : '';
    const traits = a.personality?.join(', ') || '';
    return `<div class="card">${sprite}<strong>${a.name}</strong> — ${a.rank}<div><small>${traits}</small></div></div>`;
  }).join('');

  // Ensure a recruit candidate always exists
  if (!state.recruit || (!state.recruit.npc && state.recruit.finished !== false)) initRecruit();
  if (!state.recruit.npc) initRecruit();

  const r = state.recruit;
  const npc = r.npc;

  // Candidate card with sprite + traits
  const spriteImg = npc?.sprite ? `<img src="${npc.sprite}" style="height:48px;vertical-align:middle;margin-right:8px;">` : '';
  const traits = npc?.personality?.join(', ') || '';
  const pkmnPref = npc?.possible_pokemon?.join(', ') || '';
  const phrase = npc?.catch_phrases?.[0] || '';

  ui.recruitCandidate.innerHTML = r.finished
    ? `<div class="card"><em>Recrutement terminé. Un nouveau candidat apparaîtra au prochain tour.</em></div>`
    : `<div class="card" style="display:flex;align-items:center;gap:8px;">
        ${spriteImg}
        <div>
          <strong>${r.candidateName}</strong> — ${r.candidateRole}<br>
          <small>Traits : ${traits}</small><br>
          <small>Pokémon : ${pkmnPref}</small><br>
          <small><em>"${phrase}"</em></small><br>
          <small>Interaction ${r.interactions}/5</small>
        </div>
      </div>`;

  ui.recruitTranscript.innerHTML = r.transcript.length
    ? r.transcript.map(line => `<div class="logline">${line}</div>`).join('')
    : '<div class="log">Démarre une discussion de recrutement.</div>';
}

function renderNpcs() {
  ui.npcList.innerHTML = state.npcs.map(npc => {
    const sprite = npc.sprite ? `<img src="${npc.sprite}" style="height:32px;vertical-align:middle;margin-right:6px;">` : '';
    return `<button class="card" ${npc.name === state.selectedNpc ? 'style="outline:2px solid #e53"' : ''} data-npc="${npc.name}">
      ${sprite}${npc.name} <small>${npc.mood}</small>
    </button>`;
  }).join('');
  ui.npcList.querySelectorAll('[data-npc]').forEach(btn => {
    btn.onclick = () => { state.selectedNpc = btn.dataset.npc; render(); };
  });
}

function render() {
  ui.turnValue.textContent = state.turn;
  ui.llmBadge.textContent  = settings.llmEnabled ? 'ON' : 'OFF';
  ui.playerName.textContent = `${state.profile.firstName} ${state.profile.lastName}`;
  ui.teamName.textContent   = state.profile.team;
  ui.playerSprite.src       = state.profile.sprite;
  ui.introOverlay.classList.toggle('hidden', state.profile.initialized);
  renderResources();
  renderRooms();
  renderPokemonPanels();
  renderTeamBuilder();
  renderAgentsAndRecruitment();
  renderNpcs();
  ui.logOutput.innerHTML = state.log.map(line => `<div class="logline">${line}</div>`).join('');
  ui.llmEnabledToggle.checked = settings.llmEnabled;
  ui.baseUrlInput.value = settings.baseUrl;
  ui.modelInput.value   = settings.model;
}

// ── GAME LOOP ─────────────────────────────────────────────
function processTurn() {
  state.turn += 1;
  state.newPokemonsThisTurn = [];

  // Resources income
  state.resources.pokedollars    += state.rooms.command.baseIncome  * state.rooms.command.level;
  state.resources.capturePoints  += state.rooms.capture.baseIncome  * state.rooms.capture.level;
  state.resources.breedingPoints += state.rooms.breeding.baseIncome * state.rooms.breeding.level;
  state.resources.intel          += state.rooms.training.baseIncome * state.rooms.training.level;

  // Capture
  while (state.resources.capturePoints >= 3) {
    state.resources.capturePoints -= 3;
    const species = pick(POKEDEX_POOL);
    const pokemon = { id: `pk-${Date.now()}-${Math.floor(Math.random()*9999)}`, species, level: 6 + Math.floor(Math.random()*7), assignedAgentId: null };
    state.pokemons.push(pokemon);
    state.newPokemonsThisTurn.push(pokemon);
    addLog(`Capture réussie : ${species}.`);
  }

  // Breeding
  while (state.resources.breedingPoints >= 4) {
    state.resources.breedingPoints -= 4;
    state.breedingQueue.push({ turnsLeft: 2, species: pick(POKEDEX_POOL) });
    addLog('Un œuf est ajouté à la nurserie.');
  }
  state.breedingQueue.forEach(egg => egg.turnsLeft -= 1);
  const hatched = state.breedingQueue.filter(egg => egg.turnsLeft <= 0);
  state.breedingQueue = state.breedingQueue.filter(egg => egg.turnsLeft > 0);
  hatched.forEach(egg => {
    const pokemon = { id: `pk-${Date.now()}-${Math.floor(Math.random()*9999)}`, species: egg.species, level: 5 + Math.floor(Math.random()*6), assignedAgentId: null };
    state.pokemons.push(pokemon);
    state.newPokemonsThisTurn.push(pokemon);
    addLog(`Éclosion : ${egg.species} rejoint la base.`);
  });

  // Auto-refresh recruit if finished
  if (state.recruit?.finished) {
    initRecruit();
    addLog(`Nouveau candidat disponible : ${state.recruit.candidateName} (${state.recruit.candidateRole}).`);
  }

  saveState(); render();
}

// ── TEAM ASSIGNMENT ───────────────────────────────────────
function assignTeam() {
  const agentId = ui.agentSelect.value;
  const selectedPokemonIds = Array.from(ui.pokemonSelect.selectedOptions).map(o => o.value).slice(0, 3);
  const agent = state.agents.find(a => a.id === agentId);
  if (!agent) return;
  agent.team.forEach(id => { const p = state.pokemons.find(x => x.id === id); if (p) p.assignedAgentId = null; });
  agent.team = selectedPokemonIds;
  selectedPokemonIds.forEach(id => { const p = state.pokemons.find(x => x.id === id); if (p) p.assignedAgentId = agent.id; });
  addLog(`Équipe assignée à ${agent.name} (${agent.team.length}/3).`);
  saveState(); render();
}

// ── TRAINING BATTLE ───────────────────────────────────────
async function runTrainingBattle() {
  const difficulty = ui.difficultySelect.value;
  const agent = state.agents.find(a => a.id === ui.agentSelect.value) || state.agents[0];
  const teamSpecies = agent.team.map(id => state.pokemons.find(p => p.id === id)?.species).filter(Boolean);
  if (!teamSpecies.length) { ui.trainingResult.textContent = 'Assigne au moins un Pokémon à un agent.'; return; }
  let summary;
  try {
    const response = await fetch('http://localhost:8081/api/pokellmon/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        difficulty,
        mode: 'training-room',
        player: { name: agent.name, team: teamSpecies },
        npc: {
          name: `Training-${difficulty}`,
          team: difficulty === 'hard' ? ['alakazam','starmie','snorlax'] : difficulty === 'normal' ? ['raichu','arbok','golbat'] : ['rattata','pidgey','oddish'],
        },
      }),
    });
    if (response.ok) { const data = await response.json(); summary = data.summary; }
  } catch { /* fallback below */ }
  if (!summary) {
    const outcomes = {
      easy:   ['Victoire nette en salle d\'entraînement.','Victoire avec quelques dégâts.'],
      normal: ['Match serré, victoire tactique.','Défaite serrée, progrès notable.'],
      hard:   ['Défaite lourde, doctrine à revoir.','Victoire surprise en difficulté max.'],
    };
    summary = pick(outcomes[difficulty]);
  }
  ui.trainingResult.textContent = summary;
  addLog(`Combat entraînement (${difficulty}) : ${summary}`);
  saveState(); render();
}

// ── RECRUITMENT (LLM + Character Sheet) ──────────────────
async function recruitStep() {
  const r = state.recruit;
  if (!r || r.finished) return;
  const message = ui.recruitMessage.value.trim();
  if (!message) return;
  ui.recruitMessage.value = '';
  r.interactions += 1;
  r.transcript.push(`Vous : ${message}`);

  const npc = r.npc;
  const systemPrompt = buildNpcSystemPrompt(npc);
  const fullPrompt = `${systemPrompt}

Message du recruteur : "${message}"

Réponds en JSON strict : {"reply":"...","scoreDelta":-2..2}`;

  const fallbackReply = `${r.candidateName} : Je t'écoute, mais je veux des garanties.`;
  const llmOutput = await callOllama(fullPrompt, JSON.stringify({ reply: fallbackReply, scoreDelta: message.length > 25 ? 1 : 0 }));

  let reply = fallbackReply;
  let delta  = 0;
  try {
    const jsonText = llmOutput.includes('{') ? llmOutput.slice(llmOutput.indexOf('{'), llmOutput.lastIndexOf('}') + 1) : llmOutput;
    const parsed = JSON.parse(jsonText);
    reply = parsed.reply || fallbackReply;
    delta = Number(parsed.scoreDelta);
    if (!Number.isFinite(delta)) delta = 0;
    delta = Math.max(-2, Math.min(2, delta));
  } catch {
    reply = fallbackReply;
    delta  = message.includes('ressources') || message.includes('team') ? 1 : 0;
  }

  r.hiddenScore = Math.max(1, Math.min(10, r.hiddenScore + delta));
  r.transcript.push(`${r.candidateName} : ${reply}`);

  if (r.interactions >= 5) {
    r.finished = true;
    if (r.hiddenScore >= 5) {
      const newAgent = {
        id:           `ag-${Date.now()}`,
        name:         r.candidateName,
        rank:         r.candidateRole,
        team:         [],
        sprite:       npc.sprite,
        personality:  npc.personality,
        catch_phrases: npc.catch_phrases,
        pokemon_preferences: npc.pokemon_preferences,
      };
      state.agents.push(newAgent);
      // Ajoute les Pokémon du PNJ à la base
      npc.possible_pokemon.forEach(species => {
        state.pokemons.push({
          id: `pk-${Date.now()}-${Math.floor(Math.random()*9999)}`,
          species,
          level: 5 + Math.floor(Math.random() * 8),
          assignedAgentId: newAgent.id,
        });
      });
      state.npcs.push({ name: `${r.candidateName}-contact`, mood: 'loyal', sprite: npc.sprite, catch_phrases: npc.catch_phrases });
      addLog(`Recrutement réussi : ${r.candidateName} rejoint la team.`);
    } else {
      addLog(`Recrutement échoué : ${r.candidateName} refuse l'offre.`);
    }
  }
  saveState(); render();
}

// ── NPC CHAT ──────────────────────────────────────────────
async function talkToNpc() {
  const msg = ui.npcMessage.value.trim();
  if (!msg) return;
  ui.npcMessage.value = '';
  const npc = state.npcs.find(n => n.name === state.selectedNpc) || state.npcs[0];
  if (/défi|dfi|combat|duel|challenge/i.test(msg)) {
    pendingNpcChallenge = npc;
    ui.challengeBody.textContent = `Acceptez-vous le défi de ${npc.name} ?`;
    ui.challengeOverlay.classList.remove('hidden');
    return;
  }
  const systemPrompt = buildNpcSystemPrompt(npc);
  const fallback = `${npc.name} : La base tourne, reste efficace.`;
  const answer = await callOllama(`${systemPrompt}\n\nMessage reçu : "${msg}"\nRéponds en une phrase.`, fallback);
  addLog(`CHAT → ${msg}`);
  addLog(answer);
  saveState(); render();
}

async function acceptNpcChallenge() {
  ui.challengeOverlay.classList.add('hidden');
  const npc = pendingNpcChallenge;
  pendingNpcChallenge = null;
  if (!npc) return;
  addLog(`Défi accepté contre ${npc.name}.`);
  let result;
  try {
    const response = await fetch('http://localhost:8081/api/pokellmon/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'npc-challenge',
        player: { name: `${state.profile.firstName} ${state.profile.lastName}`, team: ['ekans','koffing','zubat'] },
        npc:    { name: npc.name, team: ['pikachu','pidgeotto','rattata'] },
      }),
    });
    if (response.ok) result = (await response.json()).summary;
  } catch { /* fallback */ }
  if (!result) result = pick(['Victoire Rocket au tour 7.','Défaite Rocket, repli stratégique.','Match nul brutal.']);
  addLog(`Résultat combat auto : ${result}`);
  saveState(); render();
}

function refuseNpcChallenge() {
  ui.challengeOverlay.classList.add('hidden');
  if (pendingNpcChallenge) addLog(`Défi refusé. ${pendingNpcChallenge.name} se moque de toi.`);
  pendingNpcChallenge = null;
  saveState(); render();
}

// ── SAVE / EXPORT ─────────────────────────────────────────
function exportFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── INTRO ─────────────────────────────────────────────────
function openIntro() {
  ui.spriteSelect.innerHTML = TRAINER_SPRITES.map((src, i) => `<option value="${src}">Sprite ${i + 1}</option>`).join('');
  ui.teamInput.value      = state.profile.team;
  ui.firstNameInput.value = state.profile.firstName;
  ui.lastNameInput.value  = state.profile.lastName;
  ui.spriteSelect.value   = state.profile.sprite;
  ui.spritePreview.src    = state.profile.sprite;
}

// ── EVENTS ───────────────────────────────────────────────
function bindEvents() {
  ui.nextTurnBtn.onclick            = processTurn;
  ui.assignTeamBtn.onclick          = assignTeam;
  ui.startTrainingFightBtn.onclick  = runTrainingBattle;
  ui.sendRecruitBtn.onclick         = recruitStep;
  ui.recruitMessage.addEventListener('keydown', e => { if (e.key === 'Enter') recruitStep(); });
  ui.npcSendBtn.onclick             = talkToNpc;
  ui.npcMessage.addEventListener('keydown', e => { if (e.key === 'Enter') talkToNpc(); });
  ui.challengeYesBtn.onclick        = acceptNpcChallenge;
  ui.challengeNoBtn.onclick         = refuseNpcChallenge;

  ui.openSettingsBtn.onclick  = () => ui.settingsOverlay.classList.remove('hidden');
  ui.closeSettingsBtn.onclick = () => ui.settingsOverlay.classList.add('hidden');
  ui.spriteSelect.onchange    = () => { ui.spritePreview.src = ui.spriteSelect.value; };

  ui.introStartBtn.onclick = () => {
    state.profile.team        = ui.teamInput.value.trim()      || 'Team Rocket';
    state.profile.firstName   = ui.firstNameInput.value.trim() || 'Ari';
    state.profile.lastName    = ui.lastNameInput.value.trim()  || 'Voss';
    state.profile.sprite      = ui.spriteSelect.value;
    state.profile.initialized = true;
    addLog(`Profil créé : ${state.profile.firstName} ${state.profile.lastName} — ${state.profile.team}`);
    saveState(); render();
  };

  ui.llmEnabledToggle.onchange = () => { settings.llmEnabled = ui.llmEnabledToggle.checked; saveSettings(); render(); };
  ui.baseUrlInput.onchange     = () => { settings.baseUrl = ui.baseUrlInput.value.trim(); saveSettings(); };
  ui.modelInput.onchange       = () => { settings.model   = ui.modelInput.value.trim();   saveSettings(); };

  ui.testOllamaBtn.onclick = async () => {
    try {
      const r = await fetch(`${settings.baseUrl.replace(/\/$/, '')}/api/tags`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      ui.llmStatus.textContent = `OK — ${data.models?.map(m => m.name.slice(0, 6)).join(', ')}`;
    } catch (e) { ui.llmStatus.textContent = `Erreur Ollama : ${e.message}`; }
  };

  ui.saveBtn.onclick   = () => { saveState(); ui.llmStatus.textContent = 'Save locale OK'; };
  ui.loadBtn.onclick   = () => { const loaded = loadState(); if (loaded) { state = loaded; render(); } };
  ui.resetBtn.onclick  = () => {
    localStorage.removeItem('pokeforge.rocket-hq.state');
    state = structuredClone(BASE_STATE);
    openIntro();
    if (!state.log.length) addLog('Bienvenue dans Rocket HQ.');
    render();
  };

  ui.exportSaveBtn.onclick = () => exportFile('rocket-hq-save.txt', JSON.stringify(state, null, 2));
  ui.importSaveBtn.onclick = () => ui.saveFileInput.click();
  ui.saveFileInput.onchange = () => {
    const file = ui.saveFileInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        state = { ...structuredClone(BASE_STATE), ...JSON.parse(reader.result) };
        addLog('Save importée via fichier.');
        saveState(); render();
      } catch { ui.llmStatus.textContent = 'Fichier invalide.'; }
    };
    reader.readAsText(file);
    ui.saveFileInput.value = '';
  };

  ui.exportCodeBtn.onclick = () => {
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    navigator.clipboard?.writeText(code);
    ui.llmStatus.textContent = `Code copié : ${code.slice(0, 36)}…`;
  };
  ui.importCodeBtn.onclick = () => {
    const code = prompt('Colle le code de sauvegarde :');
    if (!code) return;
    try {
      state = { ...structuredClone(BASE_STATE), ...JSON.parse(decodeURIComponent(escape(atob(code.trim())))) };
      addLog('Save importée via code.');
      saveState(); render();
    } catch { ui.llmStatus.textContent = 'Code invalide.'; }
  };
  ui.exportLogsBtn.onclick = () => exportFile('rocket-hq-logs.txt', state.log.join('\n'));
}

// ── BOOT ─────────────────────────────────────────────────
openIntro();
bindEvents();

// Init premier candidat si absent
if (!state.recruit) initRecruit();

if (!state.log.length) addLog('Bienvenue dans Rocket HQ.');
render();
