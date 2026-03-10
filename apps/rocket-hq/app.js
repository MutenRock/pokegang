const SPRITES = [
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunt.png',
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunf.png',
  'https://play.pokemonshowdown.com/sprites/trainers/giovanni-gen2.png',
  'https://play.pokemonshowdown.com/sprites/trainers/archer.png',
];

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
  log: [],
};

const DEFAULT_SETTINGS = { llmEnabled: false, baseUrl: 'http://localhost:11434', model: 'gemma3:4b' };

const ui = {
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
let pendingNpc = null;

function addLog(text) {
  state.log.unshift(`[J${state.day}] ${text}`);
  state.log = state.log.slice(0, 120);
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

function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

function render() {
  ui.dayValue.textContent = state.day;
  ui.zoneValue.textContent = state.zone;
  ui.llmBadge.textContent = settings.llmEnabled ? 'ON' : 'OFF';
  ui.playerName.textContent = `${state.profile.firstName} ${state.profile.lastName}`;
  ui.teamName.textContent = state.profile.team;
  ui.playerSprite.src = state.profile.sprite;
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
}

async function talkToNpc() {
  const msg = ui.npcMessage.value.trim();
  if (!msg) return;
  ui.npcMessage.value = '';
  const npc = state.npcs.find((n) => n.name === state.selectedNpc) || state.npcs[0];

  if (/\b(defi|défi|combat|duel|challenge)\b/i.test(msg)) {
    pendingNpc = npc;
    ui.challengeBody.textContent = `Acceptez vous le défi de ${npc.name} ?`;
    ui.challengeOverlay.classList.remove('hidden');
    return;
  }

  const fallback = `${npc.name}: Restons concentrés. La police bouge dans ${state.zone}.`;
  const answer = await callOllama(`Tu es ${npc.name}, membre Team Rocket. Réponds en 1 phrase à: ${msg}`, fallback);
  addLog(`CHAT > ${msg}`);
  addLog(answer);
  ui.sceneText.textContent = answer;
  saveState();
  render();
}

async function resolveBattle() {
  const npc = pendingNpc;
  ui.challengeOverlay.classList.add('hidden');
  if (!npc) return;
  addLog(`Défi accepté contre ${npc.name}.`);

  let result = null;
  try {
    const response = await fetch('http://localhost:8081/api/pokellmon/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
  saveState();
  render();
}

function refuseBattle() {
  const npc = pendingNpc;
  ui.challengeOverlay.classList.add('hidden');
  if (npc) {
    addLog(`Défi refusé. ${npc.name} se moque de toi.`);
    ui.sceneText.textContent = `${npc.name}: Même pas capable de te battre ?`;
  }
  pendingNpc = null;
  saveState();
  render();
}

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
    saveState(); render();
  };

  ui.npcSendBtn.onclick = talkToNpc;
  ui.npcMessage.addEventListener('keydown', (e) => { if (e.key === 'Enter') talkToNpc(); });
  ui.challengeYesBtn.onclick = resolveBattle;
  ui.challengeNoBtn.onclick = refuseBattle;

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
if (!state.log.length) addLog('Bienvenue dans Rocket HQ.');
render();
