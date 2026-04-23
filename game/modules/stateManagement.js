/* State management module extracted from the current user-provided app.js. */

(() => {
  'use strict';

  const notify = (...args) => globalThis.notify?.(...args);
  const showConfirm = (...args) => globalThis.showConfirm?.(...args);
  const renderAll = (...args) => globalThis.renderAll?.(...args);
  const switchTab = (...args) => globalThis.switchTab?.(...args);
  const speciesName = (...args) => globalThis.speciesName?.(...args) ?? '';
  const pokeSprite = (...args) => globalThis.pokeSprite?.(...args) ?? '';
  const uid = (...args) => globalThis.uid?.(...args);
  const getSPECIES = () => globalThis.SPECIES_BY_EN || {};

// ── App version — bump on every deploy to force client reload ──
const APP_VERSION = '2.2.0';
const GAME_VERSION = 'v0.0 — pre-alpha';

const SAVE_KEYS = ['pokeforge.v6', 'pokeforge.v6.s2', 'pokeforge.v6.s3'];
let activeSaveSlot = Math.min(2, parseInt(localStorage.getItem('pokeforge.activeSlot') || '0'));
let SAVE_KEY = SAVE_KEYS[activeSaveSlot];

// ── Versionnage du schéma de save ────────────────────────────────────────────
// Incrémenter à chaque ajout de champ majeur pour déclencher le banner migration.
const SAVE_SCHEMA_VERSION = 7;

// Anciennes clés localStorage (versions antérieures à v6)
const LEGACY_SAVE_KEYS = ['pokeforge.v5', 'pokeforge.v4', 'pokeforge.v3', 'pokeforge.v2', 'pokeforge.v1', 'pokeforge'];

// Résultat de migration exposé au boot pour afficher le banner
let _migrationResult = null; // null | { from: string, fields: string[] }

const DEFAULT_STATE = {
  version: '6.0.0',
  _schemaVersion: SAVE_SCHEMA_VERSION,
  lang: 'fr',
  gang: {
    name: 'Team ???',
    bossName: 'Boss',
    bossSprite: '',
    bossZone: null, // the zone the boss is currently in
    bossTeam: [], // array of up to 3 pokemon IDs for boss combat
    showcase: [null, null, null],
    reputation: 0,
    money: 5000,
    initialized: false,
    titleA: 'recrue',
    titleB: null,
    titleLiaison: '',
    titleC: null,
    titleD: null,
  },
  inventory: {
    pokeball: 50,
    greatball: 0,
    ultraball: 0,
    duskball: 0,
    lure: 0,
    superlure: 0,
    potion: 0,
    incense: 2,
    rarescope: 1,
    aura: 0,
    evostone: 0,
    rarecandy: 0,
    masterball: 0,
    incubator: 0,
    egg_scanner: 0,
  },
  activeBall: 'pokeball',
  activeBoosts: {
    incense:   0, // timestamp when expires (0 = inactive)
    rarescope: 0,
    aura:      0,
    lure:      0,
    superlure: 0,
    chestBoost:0,
  },
  pokemons: [],
  agents: [],
  zones: {},
  pokedex: {},
  activeEvents: {}, // zoneId -> { eventId, expiresAt, data }
  missions: {
    completed: [],
    daily:  { reset: 0, progress: {}, claimed: [] },
    weekly: { reset: 0, progress: {}, claimed: [] },
    hourly: { reset: 0, slots: [], baseline: {}, claimed: [] },
  },
  stats: {
    totalCaught: 0,
    totalSold: 0,
    totalFights: 0,
    totalFightsWon: 0,
    totalMoneyEarned: 0,
    totalMoneySpent: 0,
    shinyCaught: 0,
    rocketDefeated: 0,
    chestsOpened: 0,
    eventsCompleted: 0,
    eggsHatched: 0,
    blueDefeated: 0,
  },
  settings: {
    llmEnabled: false,
    llmProvider: 'none',
    llmUrl: 'http://localhost:11434',
    llmModel: 'llama3',
    llmApiKey: '',
    sfxEnabled: true,
    musicVol: 50,
    uiScale: 100,
    musicEnabled: false,
    sfxVol: 80,
    zoneScale: 100,
    lightTheme: false,
    lowSpec: false,
    sfxIndividual: {},
    autoCombat: true,
    discoveryMode: true,
    autoBuyBall: null,  // null | 'pokeball' | 'greatball' | 'ultraball'
    classicSprites: false, // true = Showdown Gen 5 animés, false = sprites JSON (FireRed/LeafGreen)
  },
  log: [],
  marketSales: {}, // { [species_en]: { count, lastSale } } — supply/demand
  favorites: [],   // array of pokemon IDs marked as favorite
  trainingRoom: {
    pokemon: [],      // up to 6 pokemon IDs training here
    log: [],          // recent training events
    level: 1,         // room upgrade level
    lastFight: null,  // timestamp du dernier combat d'entraînement
  },
  _savedAt: 0,       // timestamp de la dernière sauvegarde
  cosmetics: {
    gameBg: null,       // CSS gradient/color for game background
    bossBg: null,       // CSS for boss panel background
    unlockedBgs: [],    // IDs of unlocked cosmetic backgrounds
  },
  lab: {
    trackedSpecies: [], // espèces suivies dans le tracker du labo
  },
  purchases: {
    translator: false,
    cosmeticsPanel: false, // 50 000₽ — débloque l'onglet Cosmétiques
    autoIncubator: false,  // 50 000₽ — Infirmière Joëlle corrompue (auto-incubation)
    chromaCharm: false,    // Gagné à 10 000 000₽ — taux shiny ×2
  },
  pension: {
    slotA: null,    // pokemon ID
    slotB: null,    // pokemon ID
    eggAt: null,    // timestamp when next egg generates
  },
  eggs: [],         // [{ id, species_en, hatchAt, potential, shiny }]
  playtime: 0,      // secondes de jeu total
  sessionStart: 0,  // timestamp début session
  openZoneOrder: [],
  favoriteZones: [], // zones ouvertes automatiquement au chargement
  claimedCodes: {},
  discoveryProgress: {
    marketUnlocked: false,
    pokedexUnlocked: false,
    missionsUnlocked: false,
    agentsUnlocked: false,
    battleLogUnlocked: false,
    cosmeticsUnlocked: false,
  },
  behaviourLogs: {
    firstCombatAt: 0,
    firstCaptureAt: 0,
    firstPurchaseAt: 0,
    firstAgentAt: 0,
    firstMissionAt: 0,
    tabViewCounts: {},
  },
};

let state = structuredClone(DEFAULT_STATE);

let _supaLastSaveAt = 0;
const SUPA_SAVE_THROTTLE_MS = 30_000; // max 1 cloud save / 30s

const MAX_HISTORY = 30; // cap des entrées d'historique par Pokémon (anti-QuotaExceeded)

// ── Sérialisation slim des pokémons ──────────────────────────────────────────
// On ne touche PAS les objets en mémoire : on crée un clone allégé pour la save.
// Champs supprimés : dérivables au runtime (species_fr, dex) + valeurs par défaut
// (assignedTo=null, cooldown=0, homesick=false, favorite=false, xp=0).
// Gain moyen : ~35% sur la section pokemons soit ~20-25% sur la save totale.
function slimPokemon(p) {
  const s = { ...p };
  // Dérivable depuis species_en via getSPECIES()
  delete s.species_fr;
  delete s.dex;
  // Valeurs par défaut — omises pour gagner de la place
  if (s.assignedTo === null)  delete s.assignedTo;
  if (s.cooldown   === 0)     delete s.cooldown;
  if (s.homesick   === false) delete s.homesick;
  if (s.favorite   === false) delete s.favorite;
  if (s.xp         === 0)     delete s.xp;
  // History : cap + suppression si vide
  if (s.history && s.history.length > MAX_HISTORY) s.history = s.history.slice(-MAX_HISTORY);
  if (!s.history || s.history.length === 0) delete s.history;
  return s;
}

function saveState() {
  if (!state.marketSales) state.marketSales = {}; // guard: toujours initialisé

  // Playtime accumulation
  if (state.sessionStart) {
    state.playtime = (state.playtime || 0) + Math.floor((Date.now() - state.sessionStart) / 1000);
    state.sessionStart = Date.now();
  }

  state._savedAt = Date.now();

  // Sérialisation slim : les objets en mémoire restent intacts
  const payload = { ...state, pokemons: state.pokemons.map(slimPokemon) };
  const data = JSON.stringify(payload);

  try {
    localStorage.setItem(SAVE_KEY, data);
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      notify('⚠ Save trop volumineuse — historiques supprimés', 'error');
      // Fallback : retirer tous les historiques
      const emergency = JSON.parse(data);
      for (const p of emergency.pokemons) delete p.history;
      try { localStorage.setItem(SAVE_KEY, JSON.stringify(emergency)); } catch {}
    }
  }
  // Cloud sync : throttlé, non-bloquant
  if (globalThis._supabase && globalThis.supaSession) {
    const now = Date.now();
    if (now - _supaLastSaveAt >= SUPA_SAVE_THROTTLE_MS) {
      _supaLastSaveAt = now;
      globalThis.supaCloudSave?.();
    }
  }
}

function formatPlaytime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${m}min`;
}

function loadState() {
  let raw = localStorage.getItem(SAVE_KEY);
  let legacyKey = null;

  // ── Détection save legacy (clés anciennes) ────────────────────────────────
  if (!raw) {
    for (const key of LEGACY_SAVE_KEYS) {
      const legacy = localStorage.getItem(key);
      if (legacy) { raw = legacy; legacyKey = key; break; }
    }
  }

  if (!raw) return null;
  try {
    const saved = JSON.parse(raw);
    const fromVersion = saved._schemaVersion ?? saved.version ?? 'inconnue';
    const needsMigration = legacyKey || (saved._schemaVersion !== SAVE_SCHEMA_VERSION);

    const migrated = migrate(saved);

    if (needsMigration) {
      // Lister les champs qui ont été ajoutés (présents dans DEFAULT_STATE mais absents du raw)
      const addedFields = [];
      if (!saved.behaviourLogs)       addedFields.push('Logs comportementaux');
      if (saved.discoveryProgress?.agentsUnlocked === undefined)
                                       addedFields.push('Progression découverte étendue');
      if (saved.settings?.classicSprites === undefined) addedFields.push('Option sprites');
      if (!saved.eggs)                addedFields.push('Système d\'œufs');
      if (!saved.pension)             addedFields.push('Pension');
      if (!saved.trainingRoom)        addedFields.push('Salle d\'entraînement');
      if (!saved.missions)            addedFields.push('Missions');
      if (!saved.cosmetics)           addedFields.push('Cosmétiques');

      _migrationResult = {
        from: legacyKey ? `clé ${legacyKey}` : `schéma v${fromVersion}`,
        toLegacyKey: legacyKey,
        fields: addedFields,
      };

      // Si c'était une clé legacy, migrer dans la clé v6 et nettoyer l'ancienne
      if (legacyKey) {
        try { localStorage.removeItem(legacyKey); } catch {}
      }
    }

    // Stamper le schéma courant dans la save migrée
    migrated._schemaVersion = SAVE_SCHEMA_VERSION;
    return migrated;
  } catch (e) {
    console.error('[PokéForge] Erreur loadState() — save corrompue ou illisible :', e);
    return null;
  }
}

function migrate(saved) {
  if (!saved.version) saved.version = '6.0.0';
  const merged = { ...structuredClone(DEFAULT_STATE), ...saved };
  merged.gang = { ...structuredClone(DEFAULT_STATE.gang), ...saved.gang };
  merged.inventory = { ...structuredClone(DEFAULT_STATE.inventory), ...saved.inventory };
  merged.stats = { ...structuredClone(DEFAULT_STATE.stats), ...saved.stats };
  merged.settings = { ...structuredClone(DEFAULT_STATE.settings), ...saved.settings };
  // Migration: discoveryProgress — merge avec valeurs par défaut complètes
  merged.discoveryProgress = { ...structuredClone(DEFAULT_STATE.discoveryProgress), ...(saved.discoveryProgress || {}) };
  if (!merged.behaviourLogs) merged.behaviourLogs = { firstCombatAt:0, firstCaptureAt:0, firstPurchaseAt:0, firstAgentAt:0, firstMissionAt:0, tabViewCounts:{} };
  if (!merged.behaviourLogs.tabViewCounts) merged.behaviourLogs.tabViewCounts = {};
  // Nouveau joueur → découverte ON ; joueur existant sans ce champ → OFF (déjà habitué)
  if (merged.settings.discoveryMode === undefined) merged.settings.discoveryMode = false;
  if (merged.settings.autoBuyBall === undefined) merged.settings.autoBuyBall = null;
  if (merged.settings.classicSprites === undefined) merged.settings.classicSprites = false;
  merged.activeBoosts = { ...structuredClone(DEFAULT_STATE.activeBoosts), ...(saved.activeBoosts || {}) };
  merged.activeEvents = saved.activeEvents || {};
  // Migration: bossTeam
  if (!merged.gang.bossTeam) merged.gang.bossTeam = [];
  if (!merged.gang.showcase) merged.gang.showcase = [null, null, null];
  // Migration: titles
  if (!merged.unlockedTitles) merged.unlockedTitles = ['recrue', 'fondateur'];
  if (!merged.gang.titleA) merged.gang.titleA = 'recrue';
  if (merged.gang.titleB === undefined) merged.gang.titleB = null;
  if (merged.gang.titleLiaison === undefined) merged.gang.titleLiaison = '';
  if (merged.gang.titleC === undefined) merged.gang.titleC = null;
  if (merged.gang.titleD === undefined) merged.gang.titleD = null;
  // Migration: marketSales + favorites
  if (!merged.marketSales) merged.marketSales = {};
  if (!merged.favorites) merged.favorites = [];
  // Migration: agent notifyCaptures
  for (const agent of (merged.agents || [])) {
    if (agent.notifyCaptures === undefined) agent.notifyCaptures = true;
  }
  // Migration: pokemon history + favorite
  for (const p of (merged.pokemons || [])) {
    // Restituer les champs omis par slimPokemon()
    const sp = getSPECIES()[p.species_en];
    if (!p.species_fr)             p.species_fr  = sp?.fr  || p.species_en;
    if (p.dex === undefined)       p.dex         = sp?.dex ?? 0;
    if (p.assignedTo === undefined) p.assignedTo = null;
    if (p.cooldown   === undefined) p.cooldown   = 0;
    if (p.homesick   === undefined) p.homesick   = false;
    if (p.favorite   === undefined) p.favorite   = false;
    if (p.xp         === undefined) p.xp         = 0;
    if (!p.history)                p.history     = [];
  }
  // Migration: missions
  if (!merged.missions) {
    merged.missions = structuredClone(DEFAULT_STATE.missions);
  }
  if (!merged.missions.daily) merged.missions.daily = { reset: 0, progress: {}, claimed: [] };
  if (!merged.missions.weekly) merged.missions.weekly = { reset: 0, progress: {}, claimed: [] };
  if (!merged.missions.completed) merged.missions.completed = [];
  if (!merged.missions.hourly) merged.missions.hourly = { reset: 0, slots: [], baseline: {}, claimed: [] };
  // Migration: trainingRoom + cosmetics + purchases
  if (!merged.trainingRoom) merged.trainingRoom = structuredClone(DEFAULT_STATE.trainingRoom);
  merged.trainingRoom = { ...structuredClone(DEFAULT_STATE.trainingRoom), ...merged.trainingRoom };
  if (!merged.cosmetics) merged.cosmetics = { gameBg: null, bossBg: null, unlockedBgs: [] };
  if (!merged.lab) merged.lab = { trackedSpecies: [] };
  if (!merged.lab.trackedSpecies) merged.lab.trackedSpecies = [];
  if (!merged.purchases) merged.purchases = { translator: false, mysteryEggCount: 0 };
  if (merged.purchases.mysteryEggCount === undefined) merged.purchases.mysteryEggCount = 0;
  if (merged.purchases.cosmeticsPanel === undefined) merged.purchases.cosmeticsPanel = false;
  if (merged.purchases.autoIncubator === undefined) merged.purchases.autoIncubator = false;
  if (merged.purchases.chromaCharm === undefined) merged.purchases.chromaCharm = false;
  if (!merged.favoriteZones) merged.favoriteZones = [];
  if (merged.settings.uiScale === undefined) merged.settings.uiScale = 100;
  if (merged.settings.musicVol === undefined) merged.settings.musicVol = 50;
  if (merged.settings.sfxVol === undefined)   merged.settings.sfxVol   = 80;
  if (merged.settings.zoneScale === undefined) merged.settings.zoneScale = 100;
  if (merged.settings.lightTheme === undefined) merged.settings.lightTheme = false;
  if (merged.settings.lowSpec === undefined)   merged.settings.lowSpec  = false;
  if (!merged.settings.sfxIndividual)          merged.settings.sfxIndividual = {};
  if (!merged.pension) merged.pension = { slotA: null, slotB: null, eggAt: null };
  if (!merged.eggs) merged.eggs = [];
  // Migration: eggs need incubating flag; auto-hatching eggs get paused
  for (const egg of merged.eggs) {
    if (egg.incubating === undefined) {
      egg.incubating = false;
      egg.hatchAt = null; // require manual incubation
    }
    if (!egg.rarity) egg.rarity = getSPECIES()[egg.species_en]?.rarity || 'common';
  }
  if (!merged.inventory.incubator) merged.inventory.incubator = 0;
  // Migration: agent perkLevels / pendingPerk
  for (const agent of (merged.agents || [])) {
    if (!agent.perkLevels) agent.perkLevels = [];
    if (agent.pendingPerk === undefined) agent.pendingPerk = false;
  }
  // Migration: homesick flag for imported pokemon
  merged.pokemons.forEach(p => { if (p.homesick === undefined) p.homesick = false; });
  // Clean up stale training room IDs (deleted pokemon)
  const allIds = new Set((merged.pokemons || []).map(p => p.id));
  merged.trainingRoom.pokemon = (merged.trainingRoom.pokemon || []).filter(id => allIds.has(id));
  // Résoudre les conflits d'affectation : priorité équipe > pension > formation
  {
    const teamSet = new Set(merged.gang.bossTeam || []);
    // Pension : retirer si aussi en équipe
    if (merged.pension.slotA && teamSet.has(merged.pension.slotA)) merged.pension.slotA = null;
    if (merged.pension.slotB && teamSet.has(merged.pension.slotB)) merged.pension.slotB = null;
    // Formation : retirer si en équipe ou en pension
    const resolvedPension = new Set([merged.pension.slotA, merged.pension.slotB].filter(Boolean));
    merged.trainingRoom.pokemon = (merged.trainingRoom.pokemon || []).filter(id => !teamSet.has(id) && !resolvedPension.has(id));
  }
  // ── Migration Gen 2 : convertir les Pokémon Gen 2 en ailes ────
  // Lugia et Ho-Oh ne spawnent plus dans les zones normales (zones dédiées désormais).
  // Si un joueur en a dans son PC, on les convertit en ailes.
  // Les évolutions Gen 2 (crobat, steelix, scizor, espeon, etc.) sont conservées :
  // elles restent obtenables par évolution et ne doivent PAS être effacées.
  const LEGENDARY_CONVERT = new Set(['lugia', 'ho-oh']);
  const legendaryFound = (merged.pokemons || []).filter(pk => LEGENDARY_CONVERT.has(pk.species_en));
  if (legendaryFound.length > 0) {
    merged.pokemons = merged.pokemons.filter(pk => !LEGENDARY_CONVERT.has(pk.species_en));
    merged.gang.bossTeam = (merged.gang.bossTeam || []).filter(id => !legendaryFound.some(p => p.id === id));
    merged.inventory = merged.inventory || {};
    for (const pk of legendaryFound) {
      if (pk.species_en === 'lugia') merged.inventory.silver_wing  = (merged.inventory.silver_wing  || 0) + 2;
      else                           merged.inventory.rainbow_wing = (merged.inventory.rainbow_wing || 0) + 2;
    }
    merged._gen2MigrationCount = legendaryFound.length;
  }

  // ── Migration limites : valeurs hors-limites → MissingNo reward ─
  // Limite incubateur = 10 (cohérent avec le shop qui bloque à owned >= 10)
  const LIMITS = { incubator: 10 };
  let limitViolation = false;
  for (const [item, max] of Object.entries(LIMITS)) {
    if ((merged.inventory[item] || 0) > max) {
      merged.inventory[item] = max;
      limitViolation = true;
    }
  }
  // Pokémon avec potential > 5 ou level > 100
  for (const pk of merged.pokemons || []) {
    if ((pk.potential || 1) > 5) { pk.potential = 5; limitViolation = true; }
    if ((pk.level || 1) > 100)   { pk.level = 100; limitViolation = true; }
  }
  if (limitViolation && !(merged.pokemons || []).some(p => p.species_en === 'missingno')) {
    const reward = { id: uid(), species_en:'missingno', species_fr:'MissingNo', dex:0,
      level:1, xp:0, potential:1, shiny:false, history:[{ type:'migration_reward', ts:Date.now() }],
      moves:['Morphing','Psyko','Métronome','Surf'] };
    merged.pokemons = merged.pokemons || [];
    merged.pokemons.push(reward);
    merged._limitViolationReward = true;
  }

  // Toujours stamper la version schéma courante
  merged._schemaVersion = SAVE_SCHEMA_VERSION;
  return merged;
}

function exportSave() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pokeforge-v6-save-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const raw = JSON.parse(e.target.result);
      if (!raw || typeof raw !== 'object' || (!raw.gang && !raw.pokemons)) {
        notify('Import échoué — fichier invalide ou non-reconnu.', 'error'); return;
      }
      openImportPreviewModal(raw);
    } catch {
      notify('Import échoué — fichier JSON invalide.', 'error');
    }
  };
  reader.readAsText(file);
}

// ── Modal de prévisualisation + conversion d'import ──────────────────────────
function openImportPreviewModal(raw) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px';

  // ── Analyse de la save importée ──────────────────────────────────────────
  const schemaVer   = raw._schemaVersion ?? raw.version ?? '?';
  const isLegacy    = !raw.eggs || !raw.pension || !raw.trainingRoom;
  const isVeryOld   = !raw.gang || !raw.pokemons;
  const gangName    = raw.gang?.name    ?? '—';
  const bossName    = raw.gang?.bossName ?? '—';
  const reputation  = (raw.gang?.reputation ?? 0).toLocaleString();
  const money       = (raw.gang?.money ?? 0).toLocaleString();
  const pokeCount   = (raw.pokemons  || []).length;
  const agentCount  = (raw.agents    || []).length;
  const dexCaught   = Object.values(raw.pokedex || {}).filter(e => e.caught).length;
  const shinyCount  = Object.values(raw.pokedex || {}).filter(e => e.shiny).length;
  const savedAt     = raw._savedAt ? new Date(raw._savedAt).toLocaleString('fr-FR') : '—';
  const playtime    = raw.playtime  ? formatPlaytime(raw.playtime) : '—';

  // ── Liste des champs qui seront ajoutés/migrés ───────────────────────────
  const migrations = [];
  if (!raw.eggs)             migrations.push('Système d\'œufs');
  if (!raw.pension)          migrations.push('Pension');
  if (!raw.trainingRoom)     migrations.push('Salle d\'entraînement');
  if (!raw.missions)         migrations.push('Missions');
  if (!raw.cosmetics)        migrations.push('Cosmétiques');
  if (!raw.unlockedTitles)   migrations.push('Titres débloqués');
  if (raw.gang?.titleC === undefined) migrations.push('Slots de titres (×4)');
  if (!raw.behaviourLogs)    migrations.push('Logs comportementaux');
  if (!raw.lab)              migrations.push('Laboratoire');
  if (!raw.purchases)        migrations.push('Achats spéciaux');
  if (!raw.eggs && !raw.inventory?.incubator) migrations.push('Inventaire incubateurs');
  if (raw.settings?.uiScale === undefined) migrations.push('Paramètres UI avancés');

  const migHtml = migrations.length
    ? migrations.map(m => `<div style="display:flex;gap:6px;align-items:center;font-size:8px;color:var(--text-dim)"><span style="color:var(--green)">✓</span>${m}</div>`).join('')
    : '<div style="font-size:8px;color:var(--green)">Aucune migration nécessaire — save à jour</div>';

  const versionBadge = isLegacy
    ? `<span style="font-size:7px;padding:2px 6px;border-radius:8px;background:rgba(255,160,0,.15);border:1px solid #ffa000;color:#ffa000">Version ancienne</span>`
    : `<span style="font-size:7px;padding:2px 6px;border-radius:8px;background:rgba(0,200,100,.1);border:1px solid var(--green);color:var(--green)">Format compatible</span>`;

  overlay.innerHTML = `
    <div style="background:var(--bg-panel);border:2px solid var(--gold-dim);border-radius:var(--radius);padding:24px;max-width:620px;width:100%;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column;gap:16px">

      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-family:var(--font-pixel);font-size:11px;color:var(--gold)">📥 Importer une Save</div>
        <button id="btnImportClose" style="background:none;border:none;color:var(--text-dim);font-size:18px;cursor:pointer">✕</button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">

        <!-- Infos save importée -->
        <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px;display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div style="font-family:var(--font-pixel);font-size:8px;color:var(--text-dim)">SAVE IMPORTÉE</div>
            ${versionBadge}
          </div>
          <div style="font-family:var(--font-pixel);font-size:12px;color:var(--red)">${gangName}</div>
          <div style="font-size:9px;color:var(--text-dim)">Boss : <span style="color:var(--text)">${bossName}</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:4px">
            <div style="font-size:8px;color:var(--text-dim)">🎯 Pokémon <span style="color:var(--text)">${pokeCount}</span></div>
            <div style="font-size:8px;color:var(--text-dim)">👤 Agents <span style="color:var(--text)">${agentCount}</span></div>
            <div style="font-size:8px;color:var(--text-dim)">⭐ Rép. <span style="color:var(--gold)">${reputation}</span></div>
            <div style="font-size:8px;color:var(--text-dim)">₽ <span style="color:var(--text)">${money}</span></div>
            <div style="font-size:8px;color:var(--text-dim)">📖 Pokédex <span style="color:var(--text)">${dexCaught}</span></div>
            <div style="font-size:8px;color:var(--text-dim)">✨ Shinies <span style="color:var(--text)">${shinyCount}</span></div>
          </div>
          <div style="font-size:7px;color:var(--text-dim);border-top:1px solid var(--border);padding-top:6px;margin-top:2px">
            Sauvegardé le ${savedAt}<br>Temps de jeu : ${playtime} · Schéma v${schemaVer}
          </div>
        </div>

        <!-- Champs à migrer -->
        <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px;display:flex;flex-direction:column;gap:6px">
          <div style="font-family:var(--font-pixel);font-size:8px;color:var(--text-dim);margin-bottom:4px">MIGRATION AUTOMATIQUE</div>
          ${migHtml}
        </div>
      </div>

      <!-- Avertissement écrasement -->
      <div style="background:rgba(204,51,51,.08);border:1px solid rgba(204,51,51,.3);border-radius:var(--radius-sm);padding:10px;font-size:9px;color:var(--text-dim)">
        ⚠ <b style="color:var(--red)">Import complet</b> : remplacera définitivement la save active (slot ${activeSaveSlot + 1}).
        Exporte d'abord ta save actuelle si tu veux la conserver.
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        <button id="btnImportBackupFirst" style="font-family:var(--font-pixel);font-size:8px;padding:8px 12px;background:var(--bg);border:1px solid var(--border-light);border-radius:var(--radius-sm);color:var(--text-dim);cursor:pointer;text-align:left">
          💾 Exporter ma save actuelle avant d'importer
        </button>
        <div style="display:flex;gap:8px">
          <button id="btnImportFull" style="flex:2;font-family:var(--font-pixel);font-size:9px;padding:12px;background:var(--bg);border:2px solid var(--gold);border-radius:var(--radius-sm);color:var(--gold);cursor:pointer">
            ⚡ Import complet<br><span style="font-size:7px;color:var(--text-dim);font-family:sans-serif">Tous les données migrées automatiquement</span>
          </button>
          ${isLegacy ? `<button id="btnImportHeritage" style="flex:1;font-family:var(--font-pixel);font-size:9px;padding:12px;background:var(--bg);border:1px solid var(--border-light);border-radius:var(--radius-sm);color:var(--text-dim);cursor:pointer">
            🏆 Mode héritage<br><span style="font-size:7px;font-family:sans-serif">1 agent + 2 Pokémon</span>
          </button>` : ''}
        </div>
        <button id="btnImportCancel" style="font-family:var(--font-pixel);font-size:8px;padding:8px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-dim);cursor:pointer">
          Annuler
        </button>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  overlay.querySelector('#btnImportClose')?.addEventListener('click',  () => overlay.remove());
  overlay.querySelector('#btnImportCancel')?.addEventListener('click', () => overlay.remove());

  overlay.querySelector('#btnImportBackupFirst')?.addEventListener('click', () => {
    exportSave();
    overlay.querySelector('#btnImportBackupFirst').textContent = '✅ Save actuelle exportée !';
    overlay.querySelector('#btnImportBackupFirst').style.color = 'var(--green)';
  });

  overlay.querySelector('#btnImportFull')?.addEventListener('click', () => {
    showConfirm(
      `Remplacer la save du slot ${activeSaveSlot + 1} par la save importée de "${gangName}" ?`,
      () => {
        try {
          state = migrate(raw);
          saveState();
          overlay.remove();
          renderAll();
          notify(`✅ Save de "${gangName}" importée et convertie au format actuel.`, 'success');
        } catch (err) {
          notify('Erreur lors de la conversion — save non-importée.', 'error');
          console.error(err);
        }
      },
      null,
      { confirmLabel: 'Importer', cancelLabel: 'Annuler' }
    );
  });

  overlay.querySelector('#btnImportHeritage')?.addEventListener('click', () => {
    overlay.remove();
    openLegacyImportModal(raw);
  });
}

function openLegacyImportModal(legacyData) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px';

  const agents = legacyData.agents || [];
  const pokemons = legacyData.pokemons || [];

  const agentHtml = agents.length
    ? agents.map(a => `<label style="display:flex;align-items:center;gap:8px;padding:6px;border-bottom:1px solid var(--border);cursor:pointer">
        <input type="radio" name="legacyAgent" value="${a.id}" style="accent-color:var(--gold)">
        <img src="${a.sprite || ''}" style="width:32px;height:32px" onerror="this.style.display='none'">
        <span style="font-size:10px">${a.name} — Lv.${a.level} (${a.title})</span>
      </label>`).join('')
    : '<div style="color:var(--text-dim);font-size:10px;padding:8px">Aucun agent dans cette save</div>';

  const pokeHtml = pokemons.slice(0, 60).map(p => `<label style="display:flex;align-items:center;gap:6px;padding:4px;border-bottom:1px solid var(--border);cursor:pointer">
      <input type="checkbox" name="legacyPoke" value="${p.id}" style="accent-color:var(--gold)">
      <img src="${pokeSprite(p.species_en, p.shiny)}" style="width:28px;height:28px">
      <span style="font-size:9px">${speciesName(p.species_en)} Lv.${p.level} ${'*'.repeat(p.potential)}${p.shiny?' [S]':''}</span>
    </label>`).join('') || '<div style="color:var(--text-dim);font-size:10px">Aucun Pokémon</div>';

  overlay.innerHTML = `
    <div style="background:var(--bg-panel);border:2px solid var(--gold-dim);border-radius:var(--radius);padding:20px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto">
      <div style="font-family:var(--font-pixel);font-size:12px;color:var(--gold);margin-bottom:8px">IMPORT HERITAGE</div>
      <div style="font-size:10px;color:var(--text-dim);margin-bottom:16px">
        Save d'une version antérieure détectée. Tu peux conserver <b style="color:var(--text)">1 agent</b> et <b style="color:var(--text)">2 Pokémon</b>.<br>
        Les 2 Pokémon seront placés à la Pension pour pondre un oeuf de départ.
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div>
          <div style="font-family:var(--font-pixel);font-size:9px;color:var(--text-dim);margin-bottom:8px">CHOISIR 1 AGENT</div>
          <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);max-height:200px;overflow-y:auto">${agentHtml}</div>
        </div>
        <div>
          <div style="font-family:var(--font-pixel);font-size:9px;color:var(--text-dim);margin-bottom:8px">CHOISIR 2 POKEMON</div>
          <div id="legacyPokeCount" style="font-size:9px;color:var(--red);margin-bottom:4px">0/2 sélectionnés</div>
          <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);max-height:200px;overflow-y:auto">${pokeHtml}</div>
        </div>
      </div>

      <div style="margin-top:16px;display:flex;gap:8px">
        <button id="btnLegacyConfirm" style="flex:1;font-family:var(--font-pixel);font-size:10px;padding:10px;background:var(--bg);border:2px solid var(--gold);border-radius:var(--radius-sm);color:var(--gold);cursor:pointer">COMMENCER</button>
        <button id="btnLegacyCancel" style="font-family:var(--font-pixel);font-size:10px;padding:10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-dim);cursor:pointer">Annuler</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  // Limit pokemon checkboxes to 2
  overlay.querySelectorAll('input[name="legacyPoke"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = [...overlay.querySelectorAll('input[name="legacyPoke"]:checked')];
      const countEl = document.getElementById('legacyPokeCount');
      if (checked.length > 2) { cb.checked = false; return; }
      if (countEl) countEl.textContent = `${checked.length}/2 sélectionnés`;
    });
  });

  document.getElementById('btnLegacyCancel')?.addEventListener('click', () => overlay.remove());

  document.getElementById('btnLegacyConfirm')?.addEventListener('click', () => {
    const agentId = overlay.querySelector('input[name="legacyAgent"]:checked')?.value;
    const pokeIds = [...overlay.querySelectorAll('input[name="legacyPoke"]:checked')].map(cb => cb.value);

    if (pokeIds.length !== 2) {
      notify('Sélectionne exactement 2 Pokémon.'); return;
    }

    // Build fresh state
    const fresh = structuredClone(DEFAULT_STATE);
    // Transfer gang basics from legacy
    fresh.gang.name = legacyData.gang?.name || 'La Gang';
    fresh.gang.bossName = legacyData.gang?.bossName || 'Boss';
    fresh.gang.bossSprite = legacyData.gang?.bossSprite || 'rocketgrunt';

    // Transfer chosen agent
    if (agentId) {
      const agent = agents.find(a => a.id === agentId);
      if (agent) {
        agent.team = []; // reset team
        agent.pendingPerk = false;
        fresh.agents = [agent];
      }
    }

    // Transfer chosen pokemon to pension
    const chosenPokes = pokeIds.map(id => pokemons.find(p => p.id === id)).filter(Boolean);
    chosenPokes.forEach(p => { p.homesick = true; });
    fresh.pokemons = chosenPokes;
    if (chosenPokes[0]) fresh.pension.slotA = chosenPokes[0].id;
    if (chosenPokes[1]) fresh.pension.slotB = chosenPokes[1].id;
    fresh.pension.eggAt = Date.now() + 60000; // first egg in 1 minute

    state = migrate(fresh);
    saveState();
    overlay.remove();
    renderAll();
    notify('Nouvelle partie héritée commencée ! Les Pokémon sont à la Pension.', 'gold');
    switchTab('tabPC');
  });
}

  Object.defineProperty(globalThis, 'state', {
    get() { return state; },
    set(v) { state = v; },
    configurable: true,
  });

  const syncMutableGlobals = () => {
    globalThis.activeSaveSlot = activeSaveSlot;
    globalThis.SAVE_KEY = SAVE_KEY;
    globalThis._migrationResult = _migrationResult;
    globalThis._supaLastSaveAt = _supaLastSaveAt;
  };

  const _saveState = saveState;
  saveState = function(...args) {
    const result = _saveState.apply(this, args);
    syncMutableGlobals();
    return result;
  };

  const _loadState = loadState;
  loadState = function(...args) {
    const result = _loadState.apply(this, args);
    syncMutableGlobals();
    return result;
  };

  const _migrate = migrate;
  migrate = function(...args) {
    const result = _migrate.apply(this, args);
    syncMutableGlobals();
    return result;
  };

  Object.assign(globalThis, {
    APP_VERSION,
    GAME_VERSION,
    SAVE_KEYS,
    SAVE_SCHEMA_VERSION,
    LEGACY_SAVE_KEYS,
    MAX_HISTORY,
    SUPA_SAVE_THROTTLE_MS,
    DEFAULT_STATE,
    slimPokemon,
    saveState,
    formatPlaytime,
    loadState,
    migrate,
    exportSave,
    importSave,
    openImportPreviewModal,
    openLegacyImportModal,
  });

  syncMutableGlobals();
})();

export {};
