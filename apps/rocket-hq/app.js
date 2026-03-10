<<<<<<< ours
const SPRITES = [
=======
const TRAINER_SPRITES = [
>>>>>>> theirs
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunt.png',
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunf.png',
  'https://play.pokemonshowdown.com/sprites/trainers/giovanni-gen2.png',
  'https://play.pokemonshowdown.com/sprites/trainers/archer.png',
];

<<<<<<< ours
const ZONES = ['QG', 'Safrania', 'Céladopole', 'Carmin', 'Azuria', 'Lavanville'];

const BASE_STATE = {
  day: 1,
  zone: 'QG',
  profile: { initialized: false, team: 'Team Rocket', firstName: 'Ari', lastName: 'Voss', sprite: SPRITES[0] },
  resources: { pokedollars: 1500, stability: 100, members: 6 },
  npcs: [
    { name: 'Mira', role: 'agent', mood: 'méfiante', relation: 12 },
    { name: 'Nox', role: 'scientifique', mood: 'froid', relation: 5 },
    { name: 'Riko', role: 'recruteur', mood: 'sournois', relation: 20 },
  ],
  selectedNpc: 'Mira',
=======
const POKEDEX_POOL = ['ekans', 'koffing', 'zubat', 'grimer', 'meowth', 'arbok', 'weezing', 'rattata', 'magnemite', 'gastly'];

const BASE_STATE = {
  turn: 1,
  profile: { initialized: false, team: 'Team Rocket', firstName: 'Ari', lastName: 'Voss', sprite: TRAINER_SPRITES[0] },
  resources: { pokedollars: 1800, capturePoints: 0, breedingPoints: 0, intel: 0 },
  rooms: {
    command: { name: 'Salle de commandement', level: 1, baseIncome: 120, upgradeCost: 700 },
    capture: { name: 'Salle de capture', level: 1, baseIncome: 2, upgradeCost: 550 },
    breeding: { name: 'Nurserie / Élevage', level: 1, baseIncome: 2, upgradeCost: 550 },
    training: { name: 'Salle d\'entraînement', level: 1, baseIncome: 1, upgradeCost: 600 },
  },
  agents: [
    { id: 'ag-1', name: 'Mira', rank: 'Agent', team: [] },
    { id: 'ag-2', name: 'Nox', rank: 'Scientifique', team: [] },
  ],
  npcs: [
    { name: 'Riko', mood: 'méfiant' },
    { name: 'Vera', mood: 'calme' },
  ],
  pokemons: [
    { id: 'pk-1', species: 'ekans', level: 9, assignedAgentId: null },
    { id: 'pk-2', species: 'koffing', level: 10, assignedAgentId: null },
    { id: 'pk-3', species: 'zubat', level: 8, assignedAgentId: null },
  ],
  newPokemonsThisTurn: [],
  breedingQueue: [],
  recruit: {
    candidateName: 'Soren',
    candidateRole: 'Infiltration',
    interactions: 0,
    hiddenScore: 5,
    transcript: [],
    finished: false,
  },
  selectedNpc: 'Riko',
>>>>>>> theirs
  log: [],
};

const DEFAULT_SETTINGS = { llmEnabled: false, baseUrl: 'http://localhost:11434', model: 'gemma3:4b' };

const ui = {
<<<<<<< ours
  dayValue: document.getElementById('dayValue'),
  zoneValue: document.getElementById('zoneValue'),
  llmBadge: document.getElementById('llmBadge'),
  playerSprite: document.getElementById('playerSprite'),
  playerName: document.getElementById('playerName'),
  teamName: document.getElementById('teamName'),
  meters: document.getElementById('meters'),
  mapGrid: document.getElementById('mapGrid'),
  sceneText: document.getElementById('sceneText'),
  actions: document.getElementById('actions'),
=======
  turnValue: document.getElementById('turnValue'),
  llmBadge: document.getElementById('llmBadge'),
  nextTurnBtn: document.getElementById('nextTurnBtn'),
  playerSprite: document.getElementById('playerSprite'),
  playerName: document.getElementById('playerName'),
  teamName: document.getElementById('teamName'),
  resourcesGrid: document.getElementById('resourcesGrid'),
  roomsList: document.getElementById('roomsList'),
  pokemonOwnedList: document.getElementById('pokemonOwnedList'),
  pokemonNewList: document.getElementById('pokemonNewList'),
  agentSelect: document.getElementById('agentSelect'),
  pokemonSelect: document.getElementById('pokemonSelect'),
  assignTeamBtn: document.getElementById('assignTeamBtn'),
  agentTeams: document.getElementById('agentTeams'),
  difficultySelect: document.getElementById('difficultySelect'),
  startTrainingFightBtn: document.getElementById('startTrainingFightBtn'),
  trainingResult: document.getElementById('trainingResult'),
  agentsList: document.getElementById('agentsList'),
  recruitCandidate: document.getElementById('recruitCandidate'),
  recruitTranscript: document.getElementById('recruitTranscript'),
  recruitMessage: document.getElementById('recruitMessage'),
  sendRecruitBtn: document.getElementById('sendRecruitBtn'),
>>>>>>> theirs
  npcList: document.getElementById('npcList'),
  npcMessage: document.getElementById('npcMessage'),
  npcSendBtn: document.getElementById('npcSendBtn'),
  logOutput: document.getElementById('logOutput'),
  introOverlay: document.getElementById('introOverlay'),
  teamInput: document.getElementById('teamInput'),
  firstNameInput: document.getElementById('firstNameInput'),
  lastNameInput: document.getElementById('lastNameInput'),
  spriteSelect: document.getElementById('spriteSelect'),
  spritePreview: document.getElementById('spritePreview'),
  introStartBtn: document.getElementById('introStartBtn'),
  challengeOverlay: document.getElementById('challengeOverlay'),
  challengeBody: document.getElementById('challengeBody'),
  challengeYesBtn: document.getElementById('challengeYesBtn'),
  challengeNoBtn: document.getElementById('challengeNoBtn'),
  settingsOverlay: document.getElementById('settingsOverlay'),
  openSettingsBtn: document.getElementById('openSettingsBtn'),
  closeSettingsBtn: document.getElementById('closeSettingsBtn'),
  llmEnabledToggle: document.getElementById('llmEnabledToggle'),
  baseUrlInput: document.getElementById('baseUrlInput'),
  modelInput: document.getElementById('modelInput'),
  testOllamaBtn: document.getElementById('testOllamaBtn'),
  llmStatus: document.getElementById('llmStatus'),
  saveBtn: document.getElementById('saveBtn'),
  loadBtn: document.getElementById('loadBtn'),
  resetBtn: document.getElementById('resetBtn'),
  exportSaveBtn: document.getElementById('exportSaveBtn'),
  importSaveBtn: document.getElementById('importSaveBtn'),
  saveFileInput: document.getElementById('saveFileInput'),
  exportCodeBtn: document.getElementById('exportCodeBtn'),
  importCodeBtn: document.getElementById('importCodeBtn'),
  exportLogsBtn: document.getElementById('exportLogsBtn'),
};

let state = loadState() || structuredClone(BASE_STATE);
let settings = loadSettings();
<<<<<<< ours
let pendingNpc = null;

function addLog(text) {
  state.log.unshift(`[J${state.day}] ${text}`);
  state.log = state.log.slice(0, 120);
=======
let pendingNpcChallenge = null;

function pokeSprite(species) {
  return `https://play.pokemonshowdown.com/sprites/gen5/${species}.png`;
}

function addLog(text) {
  state.log.unshift(`[T${state.turn}] ${text}`);
  state.log = state.log.slice(0, 200);
>>>>>>> theirs
}

function saveState() { localStorage.setItem('pokeforge.rocket-hq.state', JSON.stringify(state)); }
function loadState() {
  const raw = localStorage.getItem('pokeforge.rocket-hq.state');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
function saveSettings() { localStorage.setItem('pokeforge.rocket-hq.settings', JSON.stringify(settings)); }
function loadSettings() {
  const raw = localStorage.getItem('pokeforge.rocket-hq.settings');
  if (!raw) return { ...DEFAULT_SETTINGS };
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }; } catch { return { ...DEFAULT_SETTINGS }; }
}

<<<<<<< ours
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

function render() {
  ui.dayValue.textContent = state.day;
  ui.zoneValue.textContent = state.zone;
=======
function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

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
  } catch {
    return fallback;
  }
}

function renderResources() {
  ui.resourcesGrid.innerHTML = Object.entries(state.resources)
    .map(([k, v]) => `<div class="stat"><strong>${k}</strong><div>${v}</div></div>`)
    .join('');
}

function renderRooms() {
  ui.roomsList.innerHTML = Object.entries(state.rooms).map(([roomId, room]) => (
    `<div class="room"><div><strong>${room.name}</strong> (Niv ${room.level})</div>
      <div class="row"><small>Production/tour: ${room.baseIncome * room.level}</small>
      <button data-room="${roomId}">Upgrade (${room.upgradeCost})</button></div>
    </div>`
  )).join('');

  ui.roomsList.querySelectorAll('button[data-room]').forEach((btn) => {
    btn.onclick = () => {
      const room = state.rooms[btn.dataset.room];
      if (state.resources.pokedollars < room.upgradeCost) return addLog(`Pas assez de pokedollars pour ${room.name}.`);
      state.resources.pokedollars -= room.upgradeCost;
      room.level += 1;
      room.upgradeCost = Math.round(room.upgradeCost * 1.5);
      addLog(`${room.name} améliorée niveau ${room.level}.`);
      saveState();
      render();
    };
  });
}

function renderPokemonPanels() {
  ui.pokemonOwnedList.innerHTML = state.pokemons.map((p) => {
    const agent = state.agents.find((a) => a.id === p.assignedAgentId);
    return `<div class="card pokemon"><img class="poke-sprite" src="${pokeSprite(p.species)}" alt="${p.species}" /><div><div>${p.species} Lv.${p.level}</div><small>${agent ? `Assigné: ${agent.name}` : 'Non assigné'}</small></div></div>`;
  }).join('');

  ui.pokemonNewList.innerHTML = state.newPokemonsThisTurn.length
    ? state.newPokemonsThisTurn.map((p) => `<div class="card pokemon"><img class="poke-sprite" src="${pokeSprite(p.species)}" alt="${p.species}" /><div>${p.species} Lv.${p.level}</div></div>`).join('')
    : '<div class="card">Aucun nouveau Pokémon ce tour.</div>';
}

function renderTeamBuilder() {
  ui.agentSelect.innerHTML = state.agents.map((a) => `<option value="${a.id}">${a.name} (${a.rank})</option>`).join('');
  ui.pokemonSelect.innerHTML = state.pokemons.map((p) => `<option value="${p.id}">${p.species} Lv.${p.level}</option>`).join('');

  ui.agentTeams.innerHTML = state.agents.map((a) => {
    const names = a.team.map((id) => state.pokemons.find((p) => p.id === id)?.species).filter(Boolean);
    return `<div class="card"><strong>${a.name}</strong><div>${names.length ? names.join(', ') : 'Aucune équipe'}</div></div>`;
  }).join('');
}

function renderAgentsAndRecruitment() {
  ui.agentsList.innerHTML = state.agents.map((a) => `<div class="card"><strong>${a.name}</strong> • ${a.rank}</div>`).join('');
  const r = state.recruit;
  ui.recruitCandidate.textContent = `Candidat: ${r.candidateName} (${r.candidateRole}) • Interaction ${r.interactions}/5`;
  ui.recruitTranscript.innerHTML = r.transcript.map((line) => `<div class="log">${line}</div>`).join('') || '<div class="log">Démarre une discussion de recrutement.</div>';
}

function renderNpcs() {
  ui.npcList.innerHTML = state.npcs.map((npc) => `<button class="card ${npc.name === state.selectedNpc ? 'ok' : ''}" data-npc="${npc.name}">${npc.name} • ${npc.mood}</button>`).join('');
  ui.npcList.querySelectorAll('[data-npc]').forEach((btn) => {
    btn.onclick = () => { state.selectedNpc = btn.dataset.npc; render(); };
  });
}

function render() {
  ui.turnValue.textContent = state.turn;
>>>>>>> theirs
  ui.llmBadge.textContent = settings.llmEnabled ? 'ON' : 'OFF';
  ui.playerName.textContent = `${state.profile.firstName} ${state.profile.lastName}`;
  ui.teamName.textContent = state.profile.team;
  ui.playerSprite.src = state.profile.sprite;
<<<<<<< ours
  ui.meters.innerHTML = Object.entries(state.resources).map(([k, v]) => `<div>${k}: <strong>${v}</strong></div>`).join('');
  ui.mapGrid.innerHTML = ZONES.map((z) => `<button data-zone="${z}">${z}</button>`).join('');
  ui.mapGrid.querySelectorAll('button').forEach((b) => b.onclick = () => {
    state.zone = b.dataset.zone;
    state.day += 1;
    addLog(`Déplacement vers ${state.zone}.`);
    ui.sceneText.textContent = `La cellule Rocket arrive à ${state.zone}.`;
    saveState();
    render();
  });

  ui.actions.innerHTML = ['Mission', 'Racket', 'Repos', 'Espionner'].map((a) => `<button data-action="${a}">${a}</button>`).join('');
  ui.actions.querySelectorAll('button').forEach((b) => b.onclick = () => {
    const action = b.dataset.action;
    if (action === 'Mission') state.resources.stability = Math.max(0, state.resources.stability - 3);
    if (action === 'Racket') state.resources.pokedollars += 120;
    if (action === 'Repos') state.resources.members += 1;
    if (action === 'Espionner') state.resources.stability = Math.max(0, state.resources.stability - 1);
    addLog(`Action: ${action}`);
    saveState();
    render();
  });

  ui.npcList.innerHTML = state.npcs.map((npc) => `<button class="npc ${npc.name === state.selectedNpc ? 'active' : ''}" data-npc="${npc.name}"><b>${npc.name}</b> (${npc.role}) - ${npc.mood}</button>`).join('');
  ui.npcList.querySelectorAll('.npc').forEach((n) => n.onclick = () => { state.selectedNpc = n.dataset.npc; render(); });
  ui.logOutput.innerHTML = state.log.map((l) => `<div class="log">${l}</div>`).join('');

  ui.llmEnabledToggle.checked = settings.llmEnabled;
  ui.baseUrlInput.value = settings.baseUrl;
  ui.modelInput.value = settings.model;

  ui.introOverlay.classList.toggle('hidden', state.profile.initialized);
}

function openIntro() {
  ui.spriteSelect.innerHTML = SPRITES.map((src, i) => `<option value="${src}">Sprite ${i + 1}</option>`).join('');
  ui.teamInput.value = state.profile.team;
  ui.firstNameInput.value = state.profile.firstName;
  ui.lastNameInput.value = state.profile.lastName;
  ui.spriteSelect.value = state.profile.sprite;
  ui.spritePreview.src = state.profile.sprite;
}

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
  } catch {
    return fallback;
  }
=======
  ui.introOverlay.classList.toggle('hidden', state.profile.initialized);

  renderResources();
  renderRooms();
  renderPokemonPanels();
  renderTeamBuilder();
  renderAgentsAndRecruitment();
  renderNpcs();

  ui.logOutput.innerHTML = state.log.map((line) => `<div class="log">${line}</div>`).join('');
  ui.llmEnabledToggle.checked = settings.llmEnabled;
  ui.baseUrlInput.value = settings.baseUrl;
  ui.modelInput.value = settings.model;
}

function processTurn() {
  state.turn += 1;
  state.newPokemonsThisTurn = [];

  state.resources.pokedollars += state.rooms.command.baseIncome * state.rooms.command.level;
  state.resources.capturePoints += state.rooms.capture.baseIncome * state.rooms.capture.level;
  state.resources.breedingPoints += state.rooms.breeding.baseIncome * state.rooms.breeding.level;
  state.resources.intel += state.rooms.training.baseIncome * state.rooms.training.level;

  while (state.resources.capturePoints >= 3) {
    state.resources.capturePoints -= 3;
    const species = pick(POKEDEX_POOL);
    const pokemon = { id: `pk-${Date.now()}-${Math.floor(Math.random() * 9999)}`, species, level: 6 + Math.floor(Math.random() * 7), assignedAgentId: null };
    state.pokemons.push(pokemon);
    state.newPokemonsThisTurn.push(pokemon);
    addLog(`Capture réussie: ${species}.`);
  }

  while (state.resources.breedingPoints >= 4) {
    state.resources.breedingPoints -= 4;
    state.breedingQueue.push({ turnsLeft: 2, species: pick(POKEDEX_POOL) });
    addLog('Un oeuf est ajouté à la nurserie.');
  }

  state.breedingQueue.forEach((egg) => { egg.turnsLeft -= 1; });
  const hatched = state.breedingQueue.filter((egg) => egg.turnsLeft <= 0);
  state.breedingQueue = state.breedingQueue.filter((egg) => egg.turnsLeft > 0);

  hatched.forEach((egg) => {
    const pokemon = { id: `pk-${Date.now()}-${Math.floor(Math.random() * 9999)}`, species: egg.species, level: 5 + Math.floor(Math.random() * 6), assignedAgentId: null };
    state.pokemons.push(pokemon);
    state.newPokemonsThisTurn.push(pokemon);
    addLog(`Éclosion: ${egg.species} rejoint la base.`);
  });

  saveState();
  render();
}

function assignTeam() {
  const agentId = ui.agentSelect.value;
  const selectedPokemonIds = Array.from(ui.pokemonSelect.selectedOptions).map((o) => o.value).slice(0, 3);
  const agent = state.agents.find((a) => a.id === agentId);
  if (!agent) return;

  agent.team.forEach((id) => {
    const p = state.pokemons.find((x) => x.id === id);
    if (p) p.assignedAgentId = null;
  });

  agent.team = selectedPokemonIds;
  selectedPokemonIds.forEach((id) => {
    const p = state.pokemons.find((x) => x.id === id);
    if (p) p.assignedAgentId = agent.id;
  });

  addLog(`Équipe assignée à ${agent.name} (${agent.team.length}/3).`);
  saveState();
  render();
}

async function runTrainingBattle() {
  const difficulty = ui.difficultySelect.value;
  const agent = state.agents.find((a) => a.id === ui.agentSelect.value) || state.agents[0];
  const teamSpecies = agent.team.map((id) => state.pokemons.find((p) => p.id === id)?.species).filter(Boolean);
  if (!teamSpecies.length) {
    ui.trainingResult.textContent = 'Assigne au moins un Pokémon à un agent.';
    return;
  }

  let summary = '';
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
          team: difficulty === 'hard' ? ['alakazam', 'starmie', 'snorlax'] : difficulty === 'normal' ? ['raichu', 'arbok', 'golbat'] : ['rattata', 'pidgey', 'oddish'],
        },
      }),
    });
    if (response.ok) {
      const data = await response.json();
      summary = data.summary || '';
    }
  } catch {
    // fallback below
  }

  if (!summary) {
    const outcomes = {
      easy: ['Victoire nette en salle d\'entraînement.', 'Victoire avec quelques dégâts.'],
      normal: ['Match serré, victoire tactique.', 'Défaite serrée, progrès notable.'],
      hard: ['Défaite lourde, doctrine à revoir.', 'Victoire surprise en difficulté max.'],
    };
    summary = pick(outcomes[difficulty]);
  }

  ui.trainingResult.textContent = summary;
  addLog(`Combat entraînement (${difficulty}): ${summary}`);
  saveState();
  render();
}

async function recruitStep() {
  const r = state.recruit;
  const message = ui.recruitMessage.value.trim();
  if (!message || r.finished) return;
  ui.recruitMessage.value = '';

  r.interactions += 1;
  r.transcript.push(`Vous: ${message}`);

  const fallbackReply = `${r.candidateName}: J'écoute, mais je veux des garanties.`;
  const llmOutput = await callOllama(
    `Tu es ${r.candidateName}, candidat Rocket (${r.candidateRole}). Réponds en JSON strict: {"reply":"...","scoreDelta":-2..2}. Message: ${message}`,
    JSON.stringify({ reply: fallbackReply, scoreDelta: message.length > 25 ? 1 : 0 }),
  );

  let reply = fallbackReply;
  let delta = 0;
  try {
    const jsonText = llmOutput.includes('{') ? llmOutput.slice(llmOutput.indexOf('{'), llmOutput.lastIndexOf('}') + 1) : llmOutput;
    const parsed = JSON.parse(jsonText);
    reply = parsed.reply || fallbackReply;
    delta = Number(parsed.scoreDelta);
    if (!Number.isFinite(delta)) delta = 0;
    delta = Math.max(-2, Math.min(2, delta));
  } catch {
    reply = fallbackReply;
    delta = message.includes('ressources') || message.includes('team') ? 1 : 0;
  }

  r.hiddenScore = Math.max(1, Math.min(10, r.hiddenScore + delta));
  r.transcript.push(`${r.candidateName}: ${reply}`);

  if (r.interactions >= 5) {
    r.finished = true;
    if (r.hiddenScore > 5) {
      const newAgent = { id: `ag-${Date.now()}`, name: r.candidateName, rank: r.candidateRole, team: [] };
      state.agents.push(newAgent);
      state.npcs.push({ name: `${r.candidateName}-contact`, mood: 'loyal' });
      addLog(`Recrutement réussi: ${r.candidateName} rejoint la team.`);
    } else {
      addLog(`Recrutement échoué: ${r.candidateName} refuse l'offre.`);
    }
  }

  saveState();
  render();
>>>>>>> theirs
}

async function talkToNpc() {
  const msg = ui.npcMessage.value.trim();
  if (!msg) return;
  ui.npcMessage.value = '';
<<<<<<< ours
  const npc = state.npcs.find((n) => n.name === state.selectedNpc) || state.npcs[0];

  if (/\b(defi|défi|combat|duel|challenge)\b/i.test(msg)) {
    pendingNpc = npc;
=======

  const npc = state.npcs.find((n) => n.name === state.selectedNpc) || state.npcs[0];
  if (/\b(defi|défi|combat|duel|challenge)\b/i.test(msg)) {
    pendingNpcChallenge = npc;
>>>>>>> theirs
    ui.challengeBody.textContent = `Acceptez vous le défi de ${npc.name} ?`;
    ui.challengeOverlay.classList.remove('hidden');
    return;
  }

<<<<<<< ours
  const fallback = `${npc.name}: Restons concentrés. La police bouge dans ${state.zone}.`;
  const answer = await callOllama(`Tu es ${npc.name}, membre Team Rocket. Réponds en 1 phrase à: ${msg}`, fallback);
  addLog(`CHAT > ${msg}`);
  addLog(answer);
  ui.sceneText.textContent = answer;
=======
  const fallback = `${npc.name}: La base tourne, reste efficace.`;
  const answer = await callOllama(`Tu es ${npc.name}, PNJ de Rocket HQ. Réponds en une phrase à: ${msg}`, fallback);
  addLog(`CHAT > ${msg}`);
  addLog(answer);
>>>>>>> theirs
  saveState();
  render();
}

<<<<<<< ours
async function resolveBattle() {
  const npc = pendingNpc;
  ui.challengeOverlay.classList.add('hidden');
  if (!npc) return;
  addLog(`Défi accepté contre ${npc.name}.`);

=======
async function acceptNpcChallenge() {
  ui.challengeOverlay.classList.add('hidden');
  const npc = pendingNpcChallenge;
  pendingNpcChallenge = null;
  if (!npc) return;

  addLog(`Défi accepté contre ${npc.name}.`);
>>>>>>> theirs
  let result = null;
  try {
    const response = await fetch('http://localhost:8081/api/pokellmon/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
<<<<<<< ours
        player: { name: `${state.profile.firstName} ${state.profile.lastName}`, team: ['Ekans', 'Koffing', 'Zubat'] },
        npc: { name: npc.name, team: ['Pikachu', 'Pidgeotto', 'Rattata'] },
      }),
    });
    if (response.ok) {
      const data = await response.json();
      result = data.summary;
    }
  } catch {
    // fallback below
  }

  if (!result) {
    result = pick([
      `Victoire Rocket: ${npc.name} est neutralisé en 5 tours.`,
      `Défaite Rocket: ${npc.name} contre et force la retraite.`,
      `Match nul: les deux camps se replient avec des blessures.`,
    ]);
  }

  addLog(`Résultat combat auto: ${result}`);
  ui.sceneText.textContent = result;
  pendingNpc = null;
=======
        mode: 'npc-challenge',
        player: { name: `${state.profile.firstName} ${state.profile.lastName}`, team: ['ekans', 'koffing', 'zubat'] },
        npc: { name: npc.name, team: ['pikachu', 'pidgeotto', 'rattata'] },
      }),
    });
    if (response.ok) result = (await response.json()).summary;
  } catch {
    // fallback below
  }
  if (!result) result = pick(['Victoire Rocket au tour 7.', 'Défaite Rocket, repli stratégique.', 'Match nul brutal.']);

  addLog(`Résultat combat auto: ${result}`);
>>>>>>> theirs
  saveState();
  render();
}

<<<<<<< ours
function refuseBattle() {
  const npc = pendingNpc;
  ui.challengeOverlay.classList.add('hidden');
  if (npc) {
    addLog(`Défi refusé. ${npc.name} se moque de toi.`);
    ui.sceneText.textContent = `${npc.name}: Même pas capable de te battre ?`;
  }
  pendingNpc = null;
=======
function refuseNpcChallenge() {
  ui.challengeOverlay.classList.add('hidden');
  if (pendingNpcChallenge) addLog(`Défi refusé. ${pendingNpcChallenge.name} se moque de toi.`);
  pendingNpcChallenge = null;
>>>>>>> theirs
  saveState();
  render();
}

<<<<<<< ours
function download(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function exportSave() { download('rocket-hq-save.txt', JSON.stringify(state, null, 2)); addLog('Save exportée.'); render(); }
function exportCode() {
  const code = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  navigator.clipboard?.writeText(code);
  ui.llmStatus.textContent = `Code copié: ${code.slice(0, 30)}...`;
}
function importCode() {
  const code = prompt('Colle le code de sauvegarde');
  if (!code) return;
  try {
    state = { ...structuredClone(BASE_STATE), ...JSON.parse(decodeURIComponent(escape(atob(code.trim())))) };
    addLog('Save importée via code.');
    saveState(); render();
  } catch { ui.llmStatus.textContent = 'Code invalide.'; }
}
function exportLogs() { download('rocket-hq-logs.txt', state.log.join('\n')); }

function attach() {
=======
function exportFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function openIntro() {
  ui.spriteSelect.innerHTML = TRAINER_SPRITES.map((src, i) => `<option value="${src}">Sprite ${i + 1}</option>`).join('');
  ui.teamInput.value = state.profile.team;
  ui.firstNameInput.value = state.profile.firstName;
  ui.lastNameInput.value = state.profile.lastName;
  ui.spriteSelect.value = state.profile.sprite;
  ui.spritePreview.src = state.profile.sprite;
}

function bindEvents() {
  ui.nextTurnBtn.onclick = processTurn;
  ui.assignTeamBtn.onclick = assignTeam;
  ui.startTrainingFightBtn.onclick = runTrainingBattle;
  ui.sendRecruitBtn.onclick = recruitStep;
  ui.recruitMessage.addEventListener('keydown', (e) => { if (e.key === 'Enter') recruitStep(); });
  ui.npcSendBtn.onclick = talkToNpc;
  ui.npcMessage.addEventListener('keydown', (e) => { if (e.key === 'Enter') talkToNpc(); });

  ui.challengeYesBtn.onclick = acceptNpcChallenge;
  ui.challengeNoBtn.onclick = refuseNpcChallenge;

>>>>>>> theirs
  ui.openSettingsBtn.onclick = () => ui.settingsOverlay.classList.remove('hidden');
  ui.closeSettingsBtn.onclick = () => ui.settingsOverlay.classList.add('hidden');

  ui.spriteSelect.onchange = () => { ui.spritePreview.src = ui.spriteSelect.value; };
  ui.introStartBtn.onclick = () => {
    state.profile.team = ui.teamInput.value.trim() || 'Team Rocket';
    state.profile.firstName = ui.firstNameInput.value.trim() || 'Ari';
    state.profile.lastName = ui.lastNameInput.value.trim() || 'Voss';
    state.profile.sprite = ui.spriteSelect.value;
    state.profile.initialized = true;
    addLog(`Profil créé: ${state.profile.firstName} ${state.profile.lastName} / ${state.profile.team}`);
<<<<<<< ours
    saveState(); render();
  };

  ui.npcSendBtn.onclick = talkToNpc;
  ui.npcMessage.addEventListener('keydown', (e) => { if (e.key === 'Enter') talkToNpc(); });
  ui.challengeYesBtn.onclick = resolveBattle;
  ui.challengeNoBtn.onclick = refuseBattle;

=======
    saveState();
    render();
  };

>>>>>>> theirs
  ui.llmEnabledToggle.onchange = () => { settings.llmEnabled = ui.llmEnabledToggle.checked; saveSettings(); render(); };
  ui.baseUrlInput.onchange = () => { settings.baseUrl = ui.baseUrlInput.value.trim(); saveSettings(); };
  ui.modelInput.onchange = () => { settings.model = ui.modelInput.value.trim(); saveSettings(); };
  ui.testOllamaBtn.onclick = async () => {
    try {
      const r = await fetch(`${settings.baseUrl.replace(/\/$/, '')}/api/tags`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      ui.llmStatus.textContent = `OK: ${(data.models || []).map((m) => m.name).slice(0, 6).join(', ')}`;
    } catch (e) {
      ui.llmStatus.textContent = `Erreur Ollama: ${e.message}`;
    }
  };

  ui.saveBtn.onclick = () => { saveState(); ui.llmStatus.textContent = 'Save locale OK'; };
  ui.loadBtn.onclick = () => { const loaded = loadState(); if (loaded) { state = loaded; render(); } };
<<<<<<< ours
  ui.resetBtn.onclick = () => { localStorage.removeItem('pokeforge.rocket-hq.state'); state = structuredClone(BASE_STATE); openIntro(); render(); };

  ui.exportSaveBtn.onclick = exportSave;
  ui.importSaveBtn.onclick = () => ui.saveFileInput.click();
  ui.saveFileInput.onchange = () => {
    const f = ui.saveFileInput.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        state = { ...structuredClone(BASE_STATE), ...JSON.parse(String(r.result)) };
        addLog('Save importée via fichier.');
        saveState(); render();
      } catch { ui.llmStatus.textContent = 'Fichier invalide.'; }
    };
    r.readAsText(f);
    ui.saveFileInput.value = '';
  };
  ui.exportCodeBtn.onclick = exportCode;
  ui.importCodeBtn.onclick = importCode;
  ui.exportLogsBtn.onclick = exportLogs;
}

openIntro();
attach();
=======
  ui.resetBtn.onclick = () => {
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
        state = { ...structuredClone(BASE_STATE), ...JSON.parse(String(reader.result)) };
        addLog('Save importée via fichier.');
        saveState();
        render();
      } catch {
        ui.llmStatus.textContent = 'Fichier invalide.';
      }
    };
    reader.readAsText(file);
    ui.saveFileInput.value = '';
  };

  ui.exportCodeBtn.onclick = () => {
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    navigator.clipboard?.writeText(code);
    ui.llmStatus.textContent = `Code copié: ${code.slice(0, 36)}...`;
  };

  ui.importCodeBtn.onclick = () => {
    const code = prompt('Colle le code de sauvegarde');
    if (!code) return;
    try {
      state = { ...structuredClone(BASE_STATE), ...JSON.parse(decodeURIComponent(escape(atob(code.trim())))) };
      addLog('Save importée via code.');
      saveState();
      render();
    } catch {
      ui.llmStatus.textContent = 'Code invalide.';
    }
  };

  ui.exportLogsBtn.onclick = () => exportFile('rocket-hq-logs.txt', state.log.join('\n'));
}

openIntro();
bindEvents();
>>>>>>> theirs
if (!state.log.length) addLog('Bienvenue dans Rocket HQ.');
render();
