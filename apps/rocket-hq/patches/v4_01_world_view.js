
// ============================================================
// PATCH v4.01 — WORLD VIEW MODULE
// À injecter dans app.js après les déclarations de constantes
// ============================================================

// ── WORLD VIEW CONFIG ────────────────────────────────────
const WORLD_POKEMON_POOL = [
  { fr:'abo',       en:'ekans',    rarity:0.6 },
  { fr:'nosferapti',en:'zubat',    rarity:0.6 },
  { fr:'smogo',     en:'koffing',  rarity:0.5 },
  { fr:'miaouss',   en:'meowth',   rarity:0.5 },
  { fr:'fantominus',en:'gastly',   rarity:0.3 },
  { fr:'magneti',   en:'magnemite',rarity:0.3 },
  { fr:'voltorbe',  en:'voltorb',  rarity:0.25 },
  { fr:'soporifik', en:'drowzee',  rarity:0.2 },
  { fr:'osselait',  en:'cubone',   rarity:0.2 },
  { fr:'magicarpe', en:'magikarp', rarity:0.15 },
  { fr:'nidoran♀',  en:'nidoran-f',rarity:0.15 },
  { fr:'ptéra',     en:'aerodactyl',rarity:0.04 },
  { fr:'mewtwo',    en:'mewtwo',   rarity:0.01 },
];

const ZONE_BACKGROUNDS = {
  default:   'linear-gradient(160deg,#1a0a2e 0%,#0d1a0d 60%,#0a0a1a 100%)',
  marais:    'linear-gradient(160deg,#0a1a0a 0%,#1a2a10 50%,#0a2a0a 100%)',
  grotte:    'linear-gradient(160deg,#1a1010 0%,#2a1a10 50%,#1a0808 100%)',
  silph:     'linear-gradient(160deg,#0a0a2a 0%,#1a1a3a 50%,#2a0a2a 100%)',
  safari:    'linear-gradient(160deg,#1a2a00 0%,#2a3a10 50%,#1a2a08 100%)',
  route:     'linear-gradient(160deg,#0a1a0a 0%,#1a2a1a 50%,#0a2a0a 100%)',
};

// ── WORLD VIEW STATE ─────────────────────────────────────
// Ajouté au BASE_STATE :
// worldPokemon: []  ← liste des pkm visibles dans la vue monde

function initWorldView() {
  if (!state.worldPokemon) state.worldPokemon = [];
}

// Spawn d'un Pokémon sauvage toutes les ~8s
let worldSpawnInterval = null;
function startWorldSpawner() {
  if (worldSpawnInterval) clearInterval(worldSpawnInterval);
  worldSpawnInterval = setInterval(() => {
    if (!state.profile.initialized) return;
    // Max 5 Pokémon à la fois dans la zone
    if ((state.worldPokemon||[]).length >= 5) return;
    spawnWorldPokemon();
  }, 8000);
}

function spawnWorldPokemon() {
  // Tirage pondéré par rareté
  const total = WORLD_POKEMON_POOL.reduce((s,p) => s+p.rarity, 0);
  let r = Math.random() * total;
  let chosen = WORLD_POKEMON_POOL[0];
  for (const p of WORLD_POKEMON_POOL) { r -= p.rarity; if (r <= 0) { chosen = p; break; } }

  const entry = {
    uid:    `wp-${Date.now()}-${Math.floor(Math.random()*9999)}`,
    fr:     chosen.fr,
    en:     chosen.en,
    x:      15 + Math.random() * 70, // % de la largeur de la bande
    level:  3 + Math.floor(Math.random() * 12),
    spawnedAt: Date.now(),
    ttl:    12000, // disparaît après 12s
  };
  state.worldPokemon = [...(state.worldPokemon||[]), entry];
  renderWorldView();

  // Auto-disparition
  setTimeout(() => {
    state.worldPokemon = (state.worldPokemon||[]).filter(p => p.uid !== entry.uid);
    renderWorldView();
  }, entry.ttl);
}

function tryCapture(uid) {
  const pkm = (state.worldPokemon||[]).find(p => p.uid === uid);
  if (!pkm) return;

  const cost = 50; // Pokédollars
  if (state.resources.pokedollars < cost) {
    addLog(lang==='fr' ? `Pas assez de Pokédollars pour capturer ! (50₽ requis)` : `Not enough Pokédollars to capture! (50₽ needed)`);
    return;
  }

  state.resources.pokedollars -= cost;
  state.worldPokemon = (state.worldPokemon||[]).filter(p => p.uid !== uid);

  // Taux de succès : 40% + 1% par point de réputation
  const chance = 40 + (state.reputation || 0);
  const success = Math.random() * 100 < chance;

  if (success) {
    const newPkm = makePokemon(pkm.fr, pkm.level);
    state.pokemons.push(newPkm);
    state.newPokemonsThisTurn.push(newPkm);
    updatePokedex(pkm.fr);
    addLog(lang==='fr'
      ? `⚡ Capture réussie : ${pkm.fr} Nv.${pkm.level} !`
      : `⚡ Captured: ${pkm.fr} Lv.${pkm.level}!`);
    showCaptureFlash(true, pkm.fr);
  } else {
    addLog(lang==='fr'
      ? `💨 ${pkm.fr} a fui ! (-50₽)`
      : `💨 ${pkm.fr} fled! (-50₽)`);
    showCaptureFlash(false, pkm.fr);
  }
  saveState(); render();
}

function showCaptureFlash(success, name) {
  const band = document.getElementById('worldBand');
  if (!band) return;
  const flash = document.createElement('div');
  flash.style.cssText = `
    position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
    background:${success?'rgba(112,224,164,0.9)':'rgba(255,68,102,0.85)'};
    color:#000;font-family:'Press Start 2P',monospace;font-size:.65em;
    padding:8px 14px;border-radius:8px;z-index:20;pointer-events:none;
    animation:flashFade 1.5s forwards;
  `;
  flash.textContent = success ? `✓ ${name} !` : `✗ ${name} fuit !`;
  band.appendChild(flash);
  setTimeout(() => flash.remove(), 1500);
}

function renderWorldView() {
  const band = document.getElementById('worldBand');
  if (!band) return;

  // Fond dynamique selon mission active
  const activeMission = (state.missions||[]).find(m => m.turnsLeft > 0);
  const activeDef = activeMission ? MISSIONS.find(x => x.id === activeMission.missionId) : null;
  const zoneBg = ZONE_BACKGROUNDS[activeDef?.zone || 'default'];
  band.style.background = zoneBg;

  // Nettoie les sprites existants (garder QG)
  band.querySelectorAll('.world-pokemon,.world-capture-anim').forEach(el => el.remove());

  // Pokémon dans la bande
  (state.worldPokemon||[]).forEach(pkm => {
    const el = document.createElement('div');
    el.className = 'world-pokemon';
    el.style.cssText = `left:${pkm.x}%;`;
    el.innerHTML = `
      <img src="https://play.pokemonshowdown.com/sprites/gen5/${pkm.en}.png"
           style="width:48px;height:48px;image-rendering:pixelated;">
      <div style="font-size:.45em;text-align:center;margin-top:2px;color:#ffcc5a">${pkm.fr}<br>Nv.${pkm.level}</div>
    `;
    el.onclick = () => tryCapture(pkm.uid);
    band.appendChild(el);
  });
}
