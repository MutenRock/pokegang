# POKEFORGE v6 — Technical Architecture

> Companion to GDD_v6. Describes file structure, state shape, modules, and data flow.

---

## 1. File structure

```
pokeforge/
├── game/
│   ├── index.html          # Landing / menu page
│   ├── play.html           # Main game page (tabs, zones, UI)
│   ├── app.js              # All game logic (single file, vanilla JS)
│   └── styles.css          # Extracted CSS (optional, can stay inline)
├── data/
│   ├── pokemon_gen1.json   # 151 species: base stats, moves, rarity, sprites
│   ├── zones.json          # Zone definitions: pool, spawn rate, reputation req
│   ├── natures.json        # 10 natures with stat modifiers
│   ├── items.json          # Balls, lures, potions with prices and effects
│   ├── trainers.json       # Trainer types: sprite, difficulty, rewards, teams
│   └── characters/         # Character sheets for LLM (existing)
├── docs/
│   ├── GDD_v6_FR.md
│   ├── GDD_v6_EN.md
│   └── ARCHITECTURE_v6.md
├── package.json
├── .env.example
└── .gitignore
```

### Why single-file JS?

- No build step, no bundler, no framework
- Easy to iterate, easy to deploy (static host)
- Data files are loaded at boot via fetch() or inlined as const
- Target: < 5000 lines for v6.0

---

## 2. Game state shape

```javascript
const DEFAULT_STATE = {
  version: '6.0.0',
  lang: 'fr',                    // 'fr' | 'en'

  // ── Player / Gang ──
  gang: {
    name: 'Shadow Syndicate',
    bossName: 'Boss',
    bossSprite: '',
    reputation: 0,
    money: 5000,
    initialized: false,
  },

  // ── Inventory ──
  inventory: {
    pokeball: 20,
    greatball: 0,
    ultraball: 0,
    duskball: 0,
    lure: 0,
    superlure: 0,
    potion: 0,
  },
  activeBall: 'pokeball',        // currently equipped ball type

  // ── Pokemon ──
  pokemons: [],                  // Array<Pokemon>  (see Pokemon shape below)

  // ── Agents ──
  agents: [],                    // Array<Agent>    (see Agent shape below)

  // ── Zones ──
  zones: {
    // zoneId: { unlocked, combatsWon, mastery, assignedAgents[] }
  },

  // ── Pokedex ──
  pokedex: {},                   // speciesEN: { seen, caught, shiny, lost, count }

  // ── Stats ──
  stats: {
    totalCaught: 0,
    totalSold: 0,
    totalFights: 0,
    totalFightsWon: 0,
    totalMoneyEarned: 0,
    totalMoneySpent: 0,
    shinyCaught: 0,
    rocketDefeated: 0,
  },

  // ── Settings ──
  settings: {
    llmEnabled: false,
    llmUrl: 'http://localhost:11434',
    llmModel: 'llama3',
    sfxEnabled: true,
    musicEnabled: false,
  },

  // ── Log ──
  log: [],                       // last 50 entries
};
```

### Pokemon shape

```javascript
{
  id: 'pk-1711900000-1234',      // unique ID
  species_fr: 'Pikachu',
  species_en: 'pikachu',
  level: 5,
  xp: 0,
  nature: 'jolly',              // key from NATURES
  potential: 3,                  // 1-5 stars
  shiny: false,
  moves: ['thunderbolt', 'quick-attack'],
  capturedIn: 'viridian_forest',
  stats: { atk: 14, def: 8, spd: 16 },
  assignedTo: null,              // agentId or null
  cooldown: 0,                   // turns until available
}
```

### Agent shape

```javascript
{
  id: 'ag-1711900000-5678',
  name: 'Mira',
  sprite: 'https://play.pokemonshowdown.com/sprites/trainers/rocketgruntf.png',
  title: 'grunt',               // 'grunt' | 'lieutenant' | 'captain'
  level: 1,
  xp: 0,
  combatsWon: 0,
  stats: {
    capture: 10,                // 1-20 base (gacha)
    combat: 8,
    luck: 5,
  },
  personality: ['loyal', 'nervous'],
  team: [],                     // max 3 pokemon IDs
  assignedZone: null,           // zoneId or null
}
```

---

## 3. Module breakdown (in app.js)

Modules are sections of the single file, separated by comment headers.

```
app.js (~4000 lines target)
│
├── CONFIG & CONSTANTS
│   ├── POKEMON_GEN1         // 151 species with base stats, rarity, moves
│   ├── FR_TO_EN / EN_TO_FR  // name mapping
│   ├── NATURES              // 10 natures with modifiers
│   ├── ZONES                // zone definitions
│   ├── TRAINERS             // trainer type definitions
│   ├── ITEMS / BALLS        // item catalog with prices
│   └── I18N                 // all UI strings FR/EN
│
├── STATE MANAGEMENT
│   ├── DEFAULT_STATE
│   ├── loadState() / saveState()
│   ├── exportSave() / importSave()
│   └── migrate(state)       // version migrations
│
├── CORE UTILS
│   ├── pick(arr)            // random element
│   ├── uid()                // unique ID generator
│   ├── addLog(msg)          // add to log with timestamp
│   ├── t(key)               // i18n lookup: returns FR or EN string
│   └── pokeSprite(en, shiny?) // sprite URL builder
│
├── POKEMON MODULE
│   ├── makePokemon(speciesEN, zoneId, ballType)
│   ├── calculateStats(pokemon)
│   ├── rollNature()
│   ├── rollPotential(ballType)
│   ├── rollShiny()
│   ├── rollMoves(speciesEN)
│   ├── getPokemonPower(pokemon)
│   └── levelUpPokemon(pokemon, xpGain)
│
├── ZONE MODULE
│   ├── ZONE_DEFS            // static zone data
│   ├── initZone(zoneId)
│   ├── getZoneMastery(zoneId)
│   ├── getZoneAgentSlots(zoneId)
│   ├── spawnInZone(zoneId)  // returns {type:'pokemon'|'trainer'|'event', data}
│   └── zoneSpawnTimers      // per-zone setInterval handles
│
├── CAPTURE MODULE
│   ├── tryCapture(zoneId, spawnEntry)
│   ├── getBallCost(ballType)
│   └── consumeBall(ballType)
│
├── COMBAT MODULE
│   ├── resolveCombat(attacker, defender)
│   ├── getTeamPower(pokemonIds)
│   ├── getAgentCombatPower(agent)
│   ├── buildCombatAnimation(attacker, defender, result)
│   └── COMBAT_REWARDS       // reward tables by trainer type
│
├── AGENT MODULE
│   ├── rollNewAgent()       // gacha: random stats + personality
│   ├── recruitAgent(agentData)
│   ├── assignAgentToZone(agentId, zoneId)
│   ├── agentAutoCapture(agent)
│   ├── agentAutoCombat(agent, trainerData)
│   ├── grantAgentXP(agent, amount)
│   ├── checkPromotion(agent)
│   ├── TITLE_REQUIREMENTS   // { lieutenant: {lvl:50, combats:25}, ... }
│   └── TITLE_BONUSES        // { lieutenant: 0.15, captain: 0.30 }
│
├── MARKET MODULE
│   ├── calculatePrice(pokemon)
│   ├── sellPokemon(pokemonIds)
│   ├── buyItem(itemId, quantity)
│   └── BASE_PRICES          // base price per species
│
├── LLM MODULE
│   ├── detectLLM()          // ping Ollama / API at boot
│   ├── buildPrompt(context) // contextual prompt with game state
│   ├── queryLLM(prompt)     // fetch + cache
│   ├── llmCache             // Map<contextHash, response>
│   └── FALLBACK_DIALOGUES   // pre-written phrases when no LLM
│
├── UI — TABS & LAYOUT
│   ├── initUI()
│   ├── switchTab(tabId)
│   └── TAB_DEFS
│
├── UI — GANG TAB
│   ├── renderGangTab()
│   ├── renderBossProfile()
│   └── renderAgentList()
│
├── UI — ZONES TAB
│   ├── renderZonesTab()
│   ├── openZoneWindow(zoneId)
│   ├── closeZoneWindow(zoneId)
│   ├── renderZoneWindow(zoneId)
│   └── renderSpawnEntity(entity, zoneId)
│
├── UI — MARKET TAB
│   ├── renderMarketTab()
│   ├── renderSellPanel()
│   └── renderShopPanel()
│
├── UI — PC TAB
│   ├── renderPCTab()
│   ├── renderPokemonGrid(filter?, sort?)
│   ├── openPokemonDetail(pokemonId)
│   └── SORT_MODES / FILTER_MODES
│
├── UI — POKEDEX TAB
│   ├── renderPokedexTab()
│   └── renderPokedexEntry(speciesEN)
│
├── UI — COMBAT POPUP
│   ├── showCombatPopup(attacker, defender)
│   ├── playCombatAnimation(steps)
│   └── closeCombatPopup()
│
├── UI — NOTIFICATIONS
│   ├── notify(msg, type)    // toast-style notifications
│   └── notificationQueue
│
├── GAME LOOP
│   ├── boot()               // init state, UI, timers, LLM detection
│   ├── startZoneTimers()    // spawn intervals per active zone
│   ├── agentTick()          // periodic agent automation (every few seconds)
│   └── autoSave()           // periodic save
│
└── BOOT
    └── window.onload = boot
```

---

## 4. Data flow

### 4.1. Capture flow

```
Pokemon spawns in zone (timer)
  → renderSpawnEntity() shows sprite in zone window
  → Player clicks
  → tryCapture(zoneId, spawnEntry)
    → consumeBall(activeBall)
    → makePokemon(species, zone, ballType)
      → rollNature(), rollPotential(ball), rollShiny(), rollMoves()
      → calculateStats()
    → state.pokemons.push(pokemon)
    → updatePokedex()
    → addLog() + notify()
    → saveState()
    → renderPCTab() if open
```

### 4.2. Combat flow

```
Trainer spawns in zone (timer)
  → renderSpawnEntity() shows trainer sprite
  → Player clicks (or agent auto-resolves)
  → resolveCombat(playerTeam, trainerTeam)
    → compare powers → determine winner
    → calculate rewards (money, XP, reputation)
  → showCombatPopup() with animation
    → sprites face off, HP bars, attacks, KOs
  → apply rewards to state
  → check agent promotion
  → saveState()
```

### 4.3. Agent automation flow

```
agentTick() runs every 2-5 seconds
  → for each agent with assignedZone:
    → if capture timer elapsed:
      → agentAutoCapture(agent)
        → pick random species from zone pool
        → makePokemon() with agent's luck modifier
        → notify player
    → if trainer present in zone:
      → agentAutoCombat(agent, trainer)
        → resolveCombat()
        → grantAgentXP() + levelUpPokemon()
        → notify player
```

---

## 5. I18N strategy

All user-facing strings go through `t(key)`:

```javascript
const I18N = {
  gang_tab: { fr: 'Gang', en: 'Gang' },
  zones_tab: { fr: 'Zones', en: 'Zones' },
  market_tab: { fr: 'Marche', en: 'Market' },
  pc_tab: { fr: 'PC', en: 'PC' },
  pokedex_tab: { fr: 'Pokedex', en: 'Pokedex' },
  catch_success: { fr: '{name} capture !', en: '{name} caught!' },
  // ...
};

function t(key, vars = {}) {
  const entry = I18N[key];
  if (!entry) return key;
  let str = entry[state.lang] || entry.fr || key;
  for (const [k, v] of Object.entries(vars)) {
    str = str.replace(`{${k}}`, v);
  }
  return str;
}
```

---

## 6. LLM integration

### 6.1. Detection at boot

```javascript
async function detectLLM() {
  const url = state.settings.llmUrl;
  try {
    const res = await fetch(`${url}/api/tags`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      state.settings.llmEnabled = true;
      addLog(t('llm_connected'));
    }
  } catch {
    state.settings.llmEnabled = false;
  }
}
```

### 6.2. Contextual prompt building

```javascript
function buildLLMPrompt(npc, situation) {
  return `You are a Pokemon lore-accurate NPC in Kanto.
You are a ${npc.role} in ${situation.zone}.

Context:
- You are facing a member of "${state.gang.name}" (a rival gang to Team Rocket)
- Their gang reputation is ${state.gang.reputation} (${getRepDescription()})
- They have: ${situation.playerPokemon.map(p => p.species_en).join(', ')}
- You have: ${npc.possible_pokemon.join(', ')}

Character sheet:
${JSON.stringify(npc, null, 2)}

Respond in character in ${state.lang === 'fr' ? 'French' : 'English'}.
Keep it short (2-3 sentences max).`;
}
```

---

## 7. Save / Load

```javascript
const SAVE_KEY = 'pokeforge.v6';

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return structuredClone(DEFAULT_STATE);
  const saved = JSON.parse(raw);
  return migrate(saved);
}

function migrate(saved) {
  // Handle version upgrades
  if (!saved.version) saved.version = '6.0.0';
  // Merge with defaults for new fields
  return { ...structuredClone(DEFAULT_STATE), ...saved };
}

function exportSave() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `pokeforge-save-${Date.now()}.json`;
  a.click(); URL.revokeObjectURL(url);
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    state = migrate(JSON.parse(e.target.result));
    saveState();
    render();
  };
  reader.readAsText(file);
}
```

---

## 8. Performance considerations

- **Spawn timers**: One setInterval per open zone (cleared when zone window closes)
- **Agent tick**: Single setInterval for all agents (every 3s)
- **DOM updates**: Only re-render the active tab + open zone windows
- **Sprite caching**: Browser handles via HTTP cache headers (Showdown sprites are cacheable)
- **State size**: With 500+ Pokemon, state JSON stays under 500KB — localStorage handles it
- **Auto-save**: Debounced, max every 5 seconds

---

## 9. Migration from v5

- v5 saves (`pf.slot1`, etc.) are **not compatible** with v6
- On first boot, if v5 saves detected, offer to start fresh (with acknowledgment)
- No automatic migration — the game model is too different
- v5 code stays on the `v5` branch for reference
