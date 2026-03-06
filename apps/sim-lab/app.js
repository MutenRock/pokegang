const I18N = {
  "en-US": {
    day: "Day",
    time: "Time",
    zone: "Zone",
    llm: "LLM",
    player: "Player",
    inventory: "Inventory",
    companions: "Companions",
    regionMap: "Region Map",
    currentZone: "Current zone",
    scene: "Scene",
    locals: "Locals",
    signals: "Signals",
    eventLog: "Event Log",
    settings: "Settings",
    general: "General",
    display: "Display",
    llmSetup: "LLM Setup",
    saveData: "Save Data",
    language: "Language",
    autoSave: "Auto-save",
    llmEvents: "Use LLM for dynamic events",
    uiScale: "UI scale",
    scanlines: "Scanlines",
    fullscreen: "Toggle fullscreen",
    provider: "Provider",
    baseUrl: "Base URL",
    model: "Model",
    apiKey: "API key",
    temperature: "Temperature",
    systemPrompt: "System prompt",
    testConnection: "Test connection",
    listModels: "List models",
    saveGame: "Save game",
    loadGame: "Load game",
    resetGame: "Reset run",
    saveHint: "Saves are stored locally in your browser.",
    morning: "Morning",
    noon: "Noon",
    evening: "Evening",
    night: "Night",
    actions: {
      travel: "Travel",
      forage: "Forage",
      rest: "Rest",
      talk: "Talk",
      observe: "Observe",
      search: "Search",
      bond: "Bond",
      provoke: "Provoke",
    },
    roles: {
      ranger: "Field Tamer",
    },
    zoneDescriptions: {
      forge: "A retro workshop where capture tools, bait capsules, and odd creature charms are assembled.",
      grove: "A living pocket of moss and roots. Small creatures hide in the underbrush and watch everything.",
      ruins: "Broken stone structures with old terminals still humming below the dust.",
      lake: "A cold mirror lake where bioluminescent fish-creatures surface at dusk.",
      market: "A frontier camp where tamers, traders, and drifters exchange rumors, tools, and food.",
      ridge: "A high vantage point. Great for scouting storms and migration patterns.",
      den: "A warm rocky den. Good for resting, but territorial creatures sometimes gather here.",
      lab: "An abandoned field lab with dormant systems and creature logs left behind.",
      gate: "A silent gate leading to a larger region, still sealed for now.",
    },
    eventTemplates: {
      welcome: "You wake inside the forge district. The region feels unstable, but alive.",
      moved: "You move toward {zone}. The air changes immediately.",
      foraged: "You search the area and recover {item}.",
      rested: "You take a careful rest and recover your focus.",
      observed: "You observe the zone. Patterns emerge: {detail}.",
      search: "You search nearby traces and uncover: {detail}.",
      bond: "You approach {target} with patience. The bond grows stronger.",
      talk: "{speaker} shares a fragment: {line}",
      provoke: "Your reckless move agitates the area. {effect}",
      autosave: "Auto-save completed.",
      loaded: "Save loaded.",
      reset: "A new run begins.",
      llmOk: "LLM response received.",
      llmFail: "LLM unavailable. Falling back to local simulation.",
    },
  },
  "fr-FR": {
    day: "Jour",
    time: "Temps",
    zone: "Zone",
    llm: "LLM",
    player: "Joueur",
    inventory: "Inventaire",
    companions: "Compagnons",
    regionMap: "Carte",
    currentZone: "Zone actuelle",
    scene: "Scène",
    locals: "Habitants",
    signals: "Signaux",
    eventLog: "Journal",
    settings: "Paramètres",
    general: "Général",
    display: "Affichage",
    llmSetup: "Réglage LLM",
    saveData: "Sauvegarde",
    language: "Langue",
    autoSave: "Sauvegarde auto",
    llmEvents: "Utiliser le LLM pour les événements dynamiques",
    uiScale: "Échelle UI",
    scanlines: "Scanlines",
    fullscreen: "Plein écran",
    provider: "Provider",
    baseUrl: "URL de base",
    model: "Modèle",
    apiKey: "Clé API",
    temperature: "Température",
    systemPrompt: "Prompt système",
    testConnection: "Tester la connexion",
    listModels: "Lister les modèles",
    saveGame: "Sauvegarder",
    loadGame: "Charger",
    resetGame: "Réinitialiser",
    saveHint: "Les sauvegardes sont stockées localement dans le navigateur.",
    morning: "Matin",
    noon: "Midi",
    evening: "Soir",
    night: "Nuit",
    actions: {
      travel: "Voyager",
      forage: "Fouiller",
      rest: "Se reposer",
      talk: "Parler",
      observe: "Observer",
      search: "Pister",
      bond: "Créer un lien",
      provoke: "Provoquer",
    },
    roles: {
      ranger: "Dompteur de terrain",
    },
    zoneDescriptions: {
      forge: "Un atelier rétro où l'on assemble outils de capture, capsules d'appât et charmes étranges.",
      grove: "Une poche vivante de mousse et de racines. De petites créatures observent depuis les broussailles.",
      ruins: "Des ruines de pierre brisées avec d'anciens terminaux qui vibrent encore sous la poussière.",
      lake: "Un lac miroir glacé où des créatures aquatiques bioluminescentes remontent au crépuscule.",
      market: "Un camp frontière où dompteurs, marchands et errants échangent rumeurs, outils et vivres.",
      ridge: "Un point haut parfait pour surveiller les orages et les migrations.",
      den: "Une tanière rocheuse chaude. Idéale pour se reposer, mais parfois occupée.",
      lab: "Un ancien laboratoire de terrain avec systèmes dormants et journaux de créatures.",
      gate: "Une porte silencieuse vers une région plus vaste, encore scellée.",
    },
    eventTemplates: {
      welcome: "Tu te réveilles dans le district de la forge. La région semble instable, mais vivante.",
      moved: "Tu te déplaces vers {zone}. L'atmosphère change aussitôt.",
      foraged: "Tu fouilles la zone et trouves {item}.",
      rested: "Tu prends un repos prudent et retrouves un peu de concentration.",
      observed: "Tu observes la zone. Un motif apparaît : {detail}.",
      search: "Tu suis des traces proches et découvres : {detail}.",
      bond: "Tu approches {target} avec patience. Le lien se renforce.",
      talk: "{speaker} partage un fragment : {line}",
      provoke: "Ton geste imprudent agite la zone. {effect}",
      autosave: "Sauvegarde auto effectuée.",
      loaded: "Sauvegarde chargée.",
      reset: "Une nouvelle partie commence.",
      llmOk: "Réponse LLM reçue.",
      llmFail: "LLM indisponible. Retour au moteur local.",
    },
  },
};

const DEFAULT_SETTINGS = {
  language: "fr-FR",
  autosave: true,
  uiScale: 1,
  scanlines: true,
  llmEnabled: false,
  provider: "disabled",
  baseUrl: "http://localhost:11434",
  model: "gemma3:4b",
  apiKey: "",
  temperature: 0.7,
  systemPrompt:
    "You are the world simulation layer for Pokeforge. Write concise in-world responses, keep continuity, and avoid contradicting established facts.",
};

const BASE_STATE = {
  day: 1,
  timeIndex: 0,
  zoneId: "forge",
  player: {
    name: "Ranger-01",
    roleKey: "ranger",
    energy: 76,
    focus: 68,
    rapport: 22,
    inventory: ["fiber", "spark shard"],
    companions: ["Mossling"],
  },
  npcs: [
    { name: "Mira", role: "scout", mood: "alert", relation: 18, home: "ridge", memory: ["You asked about the sealed gate."] },
    { name: "Juno", role: "mechanist", mood: "calm", relation: 28, home: "forge", memory: ["You helped repair a bait capsule."] },
    { name: "Orik", role: "forager", mood: "wary", relation: 8, home: "grove", memory: ["He saw tracks near the ruins."] },
  ],
  creatures: [
    { name: "Mossling", type: "flora", mood: "curious", zone: "grove" },
    { name: "Voltfin", type: "aqua", mood: "skittish", zone: "lake" },
    { name: "Cindercub", type: "ember", mood: "bold", zone: "den" },
  ],
  log: [],
};

const ZONES = [
  { id: "forge", key: "forge", name: { "en-US": "Forge Workshop", "fr-FR": "Atelier Forge" }, tags: ["safe", "craft", "hub"], pos: [0, 0] },
  { id: "grove", key: "grove", name: { "en-US": "Moss Grove", "fr-FR": "Bosquet de mousse" }, tags: ["wild", "flora"], pos: [1, 0] },
  { id: "ruins", key: "ruins", name: { "en-US": "Signal Ruins", "fr-FR": "Ruines signal" }, tags: ["mystery", "ancient"], pos: [2, 0] },
  { id: "market", key: "market", name: { "en-US": "Frontier Market", "fr-FR": "Marché frontière" }, tags: ["trade", "rumors"], pos: [0, 1] },
  { id: "lake", key: "lake", name: { "en-US": "Mirror Lake", "fr-FR": "Lac miroir" }, tags: ["water", "quiet"], pos: [1, 1] },
  { id: "ridge", key: "ridge", name: { "en-US": "Sky Ridge", "fr-FR": "Crête du ciel" }, tags: ["scout", "storm"], pos: [2, 1] },
  { id: "den", key: "den", name: { "en-US": "Ash Den", "fr-FR": "Tanière de cendre" }, tags: ["rest", "heat"], pos: [0, 2] },
  { id: "lab", key: "lab", name: { "en-US": "Field Lab", "fr-FR": "Laboratoire terrain" }, tags: ["records", "tech"], pos: [1, 2] },
  { id: "gate", key: "gate", name: { "en-US": "Old Gate", "fr-FR": "Ancienne porte" }, tags: ["sealed", "future"], pos: [2, 2] },
];

const DETAILS = {
  tracks: [
    { "en-US": "fresh claw marks around a hollow trunk", "fr-FR": "de récentes marques de griffes autour d'un tronc creux" },
    { "en-US": "glowing spores drifting against the wind", "fr-FR": "des spores lumineuses dérivant contre le vent" },
    { "en-US": "old relay nodes blinking in sequence", "fr-FR": "d'anciens relais qui clignotent en séquence" },
  ],
  foundItems: ["fiber", "ember seed", "clean water", "spark shard", "ancient bolt", "sweet moss"],
  provoke: [
    { "en-US": "a nearby creature answers with a warning cry", "fr-FR": "une créature proche répond par un cri d'avertissement" },
    { "en-US": "a pack shifts somewhere just outside your sight", "fr-FR": "un groupe se déplace juste hors de ton champ de vision" },
    { "en-US": "an NPC notes your behavior and seems less trusting", "fr-FR": "un habitant remarque ton attitude et te fait moins confiance" },
  ],
};

const UI = {
  dayValue: document.getElementById("dayValue"),
  timeValue: document.getElementById("timeValue"),
  zoneValue: document.getElementById("zoneValue"),
  llmBadge: document.getElementById("llmBadge"),
  playerName: document.getElementById("playerName"),
  playerRole: document.getElementById("playerRole"),
  meters: document.getElementById("meters"),
  inventoryList: document.getElementById("inventoryList"),
  companionList: document.getElementById("companionList"),
  mapGrid: document.getElementById("mapGrid"),
  zoneName: document.getElementById("zoneName"),
  zoneDescription: document.getElementById("zoneDescription"),
  zoneTags: document.getElementById("zoneTags"),
  sceneText: document.getElementById("sceneText"),
  actions: document.getElementById("actions"),
  npcList: document.getElementById("npcList"),
  creatureList: document.getElementById("creatureList"),
  logOutput: document.getElementById("logOutput"),
  overlay: document.getElementById("settingsOverlay"),
  openSettingsBtn: document.getElementById("openSettingsBtn"),
  closeSettingsBtn: document.getElementById("closeSettingsBtn"),
  tabs: [...document.querySelectorAll(".tab-btn")],
  panels: [...document.querySelectorAll(".tab-panel")],
  languageSelect: document.getElementById("languageSelect"),
  autosaveToggle: document.getElementById("autosaveToggle"),
  llmEnabledToggle: document.getElementById("llmEnabledToggle"),
  uiScaleRange: document.getElementById("uiScaleRange"),
  uiScaleValue: document.getElementById("uiScaleValue"),
  scanlineToggle: document.getElementById("scanlineToggle"),
  fullscreenBtn: document.getElementById("fullscreenBtn"),
  providerSelect: document.getElementById("providerSelect"),
  baseUrlInput: document.getElementById("baseUrlInput"),
  modelInput: document.getElementById("modelInput"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  temperatureRange: document.getElementById("temperatureRange"),
  temperatureValue: document.getElementById("temperatureValue"),
  systemPromptInput: document.getElementById("systemPromptInput"),
  testOllamaBtn: document.getElementById("testOllamaBtn"),
  pullModelsBtn: document.getElementById("pullModelsBtn"),
  llmStatus: document.getElementById("llmStatus"),
  saveBtn: document.getElementById("saveBtn"),
  loadBtn: document.getElementById("loadBtn"),
  resetBtn: document.getElementById("resetBtn"),
};

let state = loadRun() || structuredClone(BASE_STATE);
let settings = loadSettings();

function t(key) {
  const lang = settings.language;
  const keys = key.split(".");
  let value = I18N[lang];
  for (const part of keys) value = value?.[part];
  return value ?? key;
}

function format(template, vars) {
  return template.replace(/\{(.*?)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

function currentZone() {
  return ZONES.find((z) => z.id === state.zoneId);
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function advanceTime() {
  state.timeIndex += 1;
  if (state.timeIndex > 3) {
    state.timeIndex = 0;
    state.day += 1;
  }
}

function timeLabel() {
  return [t("morning"), t("noon"), t("evening"), t("night")][state.timeIndex];
}

function saveSettings() {
  localStorage.setItem("pokeforge.simlab.settings", JSON.stringify(settings));
}

function loadSettings() {
  const raw = localStorage.getItem("pokeforge.simlab.settings");
  if (!raw) return { ...DEFAULT_SETTINGS };
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveRun() {
  localStorage.setItem("pokeforge.simlab.run", JSON.stringify(state));
}

function loadRun() {
  const raw = localStorage.getItem("pokeforge.simlab.run");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function addLog(text) {
  state.log.unshift({ time: `D${state.day}-${state.timeIndex}`, text });
  state.log = state.log.slice(0, 30);
}

function updateScene(text) {
  UI.sceneText.textContent = text;
}

function renderI18n() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = t(key);
  });
}

function renderMeters() {
  const meters = [
    ["Energy", state.player.energy],
    ["Focus", state.player.focus],
    ["Rapport", state.player.rapport],
  ];
  UI.meters.innerHTML = meters
    .map(
      ([name, value]) => `
      <div class="meter">
        <div class="meter-head"><span>${name}</span><span>${value}</span></div>
        <div class="meter-bar"><div class="meter-fill" style="width:${value}%"></div></div>
      </div>`
    )
    .join("");
}

function renderTags(target, items) {
  target.innerHTML = items.map((item) => `<span class="tag">${item}</span>`).join("");
}

function renderList(target, items, compact = false) {
  target.classList.toggle("compact", compact);
  target.innerHTML = items
    .map((item) => `
      <div class="entity-card">
        <div class="entity-line"><span class="name">${item.name}</span><span class="mood">${item.mood}</span></div>
        <div class="meta">${item.meta || item.role || item.type || ""}</div>
        ${item.extra ? `<div class="meta">${item.extra}</div>` : ""}
      </div>`)
    .join("");
}

function renderMap() {
  UI.mapGrid.innerHTML = ZONES.map((zone) => {
    const active = zone.id === state.zoneId ? "current" : "";
    return `
      <button class="map-cell ${active}" data-zone-id="${zone.id}">
        <div class="cell-title">${zone.name[settings.language]}</div>
        <div class="cell-meta">${zone.tags.join(" • ")}</div>
      </button>`;
  }).join("");

  UI.mapGrid.querySelectorAll(".map-cell").forEach((button) => {
    button.addEventListener("click", () => actionTravel(button.dataset.zoneId));
  });
}

function renderZone() {
  const zone = currentZone();
  UI.zoneName.textContent = zone.name[settings.language];
  UI.zoneDescription.textContent = t(`zoneDescriptions.${zone.key}`);
  renderTags(UI.zoneTags, zone.tags);
}

function renderActions() {
  const actions = ["travel", "forage", "rest", "talk", "observe", "search", "bond", "provoke"];
  UI.actions.innerHTML = actions
    .map((action) => `<button class="pixel-btn ${action === "provoke" ? "danger" : ""}" data-action="${action}">${t(`actions.${action}`)}</button>`)
    .join("");

  UI.actions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });
}

function renderLog() {
  UI.logOutput.innerHTML = state.log
    .map((entry) => `<div class="log-line"><div class="log-time">${entry.time}</div>${entry.text}</div>`)
    .join("");
}

function renderEntities() {
  const npcs = state.npcs.map((npc) => ({
    name: npc.name,
    mood: npc.mood,
    role: `${npc.role} • ${npc.home}`,
    extra: `${settings.language === "fr-FR" ? "Relation" : "Relation"}: ${npc.relation}`,
  }));
  const creatures = state.creatures.map((creature) => ({
    name: creature.name,
    mood: creature.mood,
    type: `${creature.type} • ${creature.zone}`,
  }));
  const companions = state.player.companions.map((name) => ({ name, mood: "linked", meta: settings.language === "fr-FR" ? "compagnon actif" : "active companion" }));

  renderList(UI.npcList, npcs);
  renderList(UI.creatureList, creatures, true);
  renderList(UI.companionList, companions, true);
}

function renderTop() {
  UI.dayValue.textContent = state.day;
  UI.timeValue.textContent = timeLabel();
  UI.zoneValue.textContent = currentZone().name[settings.language];
  UI.llmBadge.textContent = settings.llmEnabled && settings.provider !== "disabled" ? settings.provider.toUpperCase() : "OFF";
  UI.playerName.textContent = state.player.name;
  UI.playerRole.textContent = t(`roles.${state.player.roleKey}`);
}

function renderInventory() {
  renderTags(UI.inventoryList, state.player.inventory);
}

function renderSettings() {
  UI.languageSelect.value = settings.language;
  UI.autosaveToggle.checked = settings.autosave;
  UI.llmEnabledToggle.checked = settings.llmEnabled;
  UI.uiScaleRange.value = settings.uiScale;
  UI.uiScaleValue.textContent = `${Number(settings.uiScale).toFixed(2)}x`;
  UI.scanlineToggle.checked = settings.scanlines;
  UI.providerSelect.value = settings.provider;
  UI.baseUrlInput.value = settings.baseUrl;
  UI.modelInput.value = settings.model;
  UI.apiKeyInput.value = settings.apiKey;
  UI.temperatureRange.value = settings.temperature;
  UI.temperatureValue.textContent = Number(settings.temperature).toFixed(1);
  UI.systemPromptInput.value = settings.systemPrompt;
}

function applyDisplaySettings() {
  document.documentElement.style.setProperty("--ui-scale", settings.uiScale);
  document.body.classList.toggle("scanlines", settings.scanlines);
}

function renderAll() {
  renderI18n();
  renderTop();
  renderMeters();
  renderInventory();
  renderMap();
  renderZone();
  renderActions();
  renderEntities();
  renderLog();
  renderSettings();
  applyDisplaySettings();
}

function maybeAutosave() {
  if (!settings.autosave) return;
  saveRun();
  addLog(t("eventTemplates.autosave"));
}

async function llmGenerate({ purpose, prompt, fallback }) {
  if (!settings.llmEnabled || settings.provider === "disabled") return fallback();
  try {
    let text = "";
    if (settings.provider === "ollama") {
      const base = settings.baseUrl.replace(/\/$/, "");
      const response = await fetch(`${base}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: settings.model,
          prompt,
          system: settings.systemPrompt,
          stream: false,
          options: { temperature: Number(settings.temperature) },
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      text = data.response?.trim() || "";
    } else if (settings.provider === "openai") {
      const base = settings.baseUrl.replace(/\/$/, "");
      const response = await fetch(`${base}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(settings.apiKey ? { Authorization: `Bearer ${settings.apiKey}` } : {}),
        },
        body: JSON.stringify({
          model: settings.model,
          temperature: Number(settings.temperature),
          messages: [
            { role: "system", content: settings.systemPrompt },
            { role: "user", content: prompt },
          ],
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      text = data.choices?.[0]?.message?.content?.trim() || "";
    }

    if (!text) throw new Error("Empty LLM response");
    addLog(t("eventTemplates.llmOk"));
    return text;
  } catch (error) {
    addLog(`${t("eventTemplates.llmFail")} [${error.message}]`);
    return fallback();
  }
}

function zonePromptBase() {
  return `${settings.language === "fr-FR" ? "Zone" : "Zone"}: ${currentZone().name[settings.language]}\n`
    + `${settings.language === "fr-FR" ? "Jour" : "Day"}: ${state.day}\n`
    + `${settings.language === "fr-FR" ? "Temps" : "Time"}: ${timeLabel()}\n`
    + `${settings.language === "fr-FR" ? "Inventaire" : "Inventory"}: ${state.player.inventory.join(", ")}`;
}

async function actionTravel(zoneId) {
  const zone = ZONES.find((z) => z.id === zoneId);
  if (!zone || zone.id === state.zoneId) return;
  state.zoneId = zone.id;
  state.player.energy = Math.max(0, state.player.energy - 6);
  advanceTime();
  const text = format(t("eventTemplates.moved"), { zone: zone.name[settings.language] });
  addLog(text);
  updateScene(await llmGenerate({
    purpose: "travel",
    prompt: `${zonePromptBase()}\nDescribe the arrival in 2 short sentences, keeping a retro creature-sim tone.`,
    fallback: () => `${text}\n\n${t(`zoneDescriptions.${zone.key}`)}`,
  }));
  maybeAutosave();
  renderAll();
}

async function handleAction(action) {
  switch (action) {
    case "travel": {
      const zone = pick(ZONES.filter((z) => z.id !== state.zoneId));
      await actionTravel(zone.id);
      break;
    }
    case "forage": {
      const item = pick(DETAILS.foundItems);
      state.player.inventory.push(item);
      state.player.focus = Math.max(0, state.player.focus - 4);
      advanceTime();
      const text = format(t("eventTemplates.foraged"), { item });
      addLog(text);
      updateScene(await llmGenerate({
        purpose: "forage",
        prompt: `${zonePromptBase()}\nWrite a concise foraging outcome with one found item: ${item}.`,
        fallback: () => `${text}\n\n${settings.language === "fr-FR" ? "Tu ranges ta trouvaille dans ton sac." : "You secure the find in your pack."}`,
      }));
      maybeAutosave();
      break;
    }
    case "rest": {
      state.player.energy = Math.min(100, state.player.energy + 16);
      state.player.focus = Math.min(100, state.player.focus + 10);
      advanceTime();
      const text = t("eventTemplates.rested");
      addLog(text);
      updateScene(await llmGenerate({
        purpose: "rest",
        prompt: `${zonePromptBase()}\nDescribe a short, peaceful rest scene in 2 sentences.`,
        fallback: () => text,
      }));
      maybeAutosave();
      break;
    }
    case "talk": {
      const npc = pick(state.npcs);
      npc.relation += 3;
      const line = npc.memory[npc.memory.length - 1] || (settings.language === "fr-FR" ? "La région change plus vite que prévu." : "This region changes faster than expected.");
      const text = format(t("eventTemplates.talk"), { speaker: npc.name, line });
      addLog(text);
      updateScene(await llmGenerate({
        purpose: "talk",
        prompt: `${zonePromptBase()}\nWrite one short in-character line from ${npc.name}, a ${npc.role}, who feels ${npc.mood}.`,
        fallback: () => text,
      }));
      maybeAutosave();
      break;
    }
    case "observe": {
      const detail = pick(DETAILS.tracks)[settings.language];
      state.player.focus = Math.min(100, state.player.focus + 4);
      const text = format(t("eventTemplates.observed"), { detail });
      addLog(text);
      updateScene(await llmGenerate({
        purpose: "observe",
        prompt: `${zonePromptBase()}\nDescribe environmental details and one hint about creature behavior.`,
        fallback: () => text,
      }));
      maybeAutosave();
      break;
    }
    case "search": {
      const detail = pick(DETAILS.tracks)[settings.language];
      state.player.energy = Math.max(0, state.player.energy - 4);
      advanceTime();
      const text = format(t("eventTemplates.search"), { detail });
      addLog(text);
      updateScene(await llmGenerate({
        purpose: "search",
        prompt: `${zonePromptBase()}\nWrite a short trace-reading scene and end on a small clue.`,
        fallback: () => text,
      }));
      maybeAutosave();
      break;
    }
    case "bond": {
      const creature = pick(state.creatures);
      state.player.rapport = Math.min(100, state.player.rapport + 6);
      if (!state.player.companions.includes(creature.name) && Math.random() > 0.65) {
        state.player.companions.push(creature.name);
      }
      const text = format(t("eventTemplates.bond"), { target: creature.name });
      addLog(text);
      updateScene(await llmGenerate({
        purpose: "bond",
        prompt: `${zonePromptBase()}\nWrite a gentle bonding moment with the creature ${creature.name}.`,
        fallback: () => text,
      }));
      maybeAutosave();
      break;
    }
    case "provoke": {
      const effect = pick(DETAILS.provoke)[settings.language];
      state.player.energy = Math.max(0, state.player.energy - 8);
      state.player.rapport = Math.max(0, state.player.rapport - 5);
      const npc = pick(state.npcs);
      npc.relation = Math.max(0, npc.relation - 4);
      const text = format(t("eventTemplates.provoke"), { effect });
      addLog(text);
      updateScene(await llmGenerate({
        purpose: "provoke",
        prompt: `${zonePromptBase()}\nDescribe a tense reaction from the world after a reckless action.`,
        fallback: () => text,
      }));
      maybeAutosave();
      break;
    }
  }
  renderAll();
}

function openSettings() {
  UI.overlay.classList.remove("hidden");
  UI.overlay.setAttribute("aria-hidden", "false");
}

function closeSettings() {
  UI.overlay.classList.add("hidden");
  UI.overlay.setAttribute("aria-hidden", "true");
}

async function testConnection() {
  UI.llmStatus.textContent = settings.language === "fr-FR" ? "Test en cours..." : "Testing...";
  try {
    if (settings.provider === "ollama") {
      const base = settings.baseUrl.replace(/\/$/, "");
      const response = await fetch(`${base}/api/tags`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const models = (data.models || []).map((m) => m.name).slice(0, 8);
      UI.llmStatus.textContent = `${settings.language === "fr-FR" ? "Connexion OK" : "Connection OK"}\n${models.join("\n") || "No models listed."}`;
    } else {
      UI.llmStatus.textContent = settings.language === "fr-FR" ? "Choisis Ollama pour le test rapide intégré." : "Choose Ollama for the built-in quick test.";
    }
  } catch (error) {
    UI.llmStatus.textContent = `${settings.language === "fr-FR" ? "Échec" : "Failed"}: ${error.message}`;
  }
}

async function listModels() {
  await testConnection();
}

function attachEvents() {
  UI.openSettingsBtn.addEventListener("click", openSettings);
  UI.closeSettingsBtn.addEventListener("click", closeSettings);
  UI.overlay.addEventListener("click", (event) => {
    if (event.target === UI.overlay) closeSettings();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (UI.overlay.classList.contains("hidden")) openSettings();
      else closeSettings();
    }
  });

  UI.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      UI.tabs.forEach((btn) => btn.classList.toggle("active", btn === tab));
      UI.panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tab.dataset.tab));
    });
  });

  UI.languageSelect.addEventListener("change", () => {
    settings.language = UI.languageSelect.value;
    saveSettings();
    renderAll();
  });
  UI.autosaveToggle.addEventListener("change", () => {
    settings.autosave = UI.autosaveToggle.checked;
    saveSettings();
  });
  UI.llmEnabledToggle.addEventListener("change", () => {
    settings.llmEnabled = UI.llmEnabledToggle.checked;
    saveSettings();
    renderAll();
  });
  UI.uiScaleRange.addEventListener("input", () => {
    settings.uiScale = Number(UI.uiScaleRange.value);
    UI.uiScaleValue.textContent = `${settings.uiScale.toFixed(2)}x`;
    saveSettings();
    applyDisplaySettings();
  });
  UI.scanlineToggle.addEventListener("change", () => {
    settings.scanlines = UI.scanlineToggle.checked;
    saveSettings();
    applyDisplaySettings();
  });
  UI.fullscreenBtn.addEventListener("click", async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  });

  [UI.providerSelect, UI.baseUrlInput, UI.modelInput, UI.apiKeyInput, UI.systemPromptInput].forEach((input) => {
    input.addEventListener("change", syncLLMSettings);
  });
  UI.temperatureRange.addEventListener("input", () => {
    settings.temperature = Number(UI.temperatureRange.value);
    UI.temperatureValue.textContent = settings.temperature.toFixed(1);
    saveSettings();
  });
  UI.testOllamaBtn.addEventListener("click", async () => {
    syncLLMSettings();
    await testConnection();
  });
  UI.pullModelsBtn.addEventListener("click", async () => {
    syncLLMSettings();
    await listModels();
  });

  UI.saveBtn.addEventListener("click", () => {
    saveRun();
    UI.llmStatus.textContent = settings.language === "fr-FR" ? "Sauvegarde manuelle effectuée." : "Manual save completed.";
  });
  UI.loadBtn.addEventListener("click", () => {
    const loaded = loadRun();
    if (loaded) {
      state = loaded;
      addLog(t("eventTemplates.loaded"));
      renderAll();
    }
  });
  UI.resetBtn.addEventListener("click", () => {
    localStorage.removeItem("pokeforge.simlab.run");
    state = structuredClone(BASE_STATE);
    state.log = [];
    addLog(t("eventTemplates.reset"));
    updateScene(t("eventTemplates.welcome"));
    renderAll();
  });
}

function syncLLMSettings() {
  settings.provider = UI.providerSelect.value;
  settings.baseUrl = UI.baseUrlInput.value.trim();
  settings.model = UI.modelInput.value.trim();
  settings.apiKey = UI.apiKeyInput.value;
  settings.systemPrompt = UI.systemPromptInput.value;
  saveSettings();
  renderTop();
}

function init() {
  if (!state.log.length) addLog(t("eventTemplates.welcome"));
  updateScene(t("eventTemplates.welcome"));
  attachEvents();
  renderAll();
}

init();
