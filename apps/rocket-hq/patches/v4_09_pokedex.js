
// ============================================================
// PATCH v4.09 — POKÉDEX + COMBO DEX
// ============================================================

// ── POKÉDEX ──────────────────────────────────────────────
// state.pokedex = { [species_fr]: { count:N, lost:N, firstSeen:turn } }
function updatePokedex(species_fr) {
  if (!state.pokedex) state.pokedex = {};
  if (!state.pokedex[species_fr]) {
    state.pokedex[species_fr] = { count:0, lost:0, firstSeen: state.turn };
    addLog(`📖 ${lang==='fr'?'Pokédex':'Pokédex'} : ${species_fr} ${lang==='fr'?'enregistré !':'registered!'}`);
  }
  state.pokedex[species_fr].count += 1;
}

function markPokedexLost(species_fr) {
  if (!state.pokedex) return;
  if (!state.pokedex[species_fr]) return;
  state.pokedex[species_fr].lost = (state.pokedex[species_fr].lost||0) + 1;
}

function renderPokedex() {
  const el = document.getElementById('pokedexPanel');
  if (!el) return;
  const dex = state.pokedex || {};
  const entries = Object.entries(dex);
  const T = {
    fr:{ title:'Pokédex', seen:'Obtenus', lost:'Perdus', empty:'Aucun Pokémon encore enregistré.' },
    en:{ title:'Pokédex', seen:'Obtained', lost:'Lost',  empty:'No Pokémon registered yet.' },
  }[lang];

  if (!entries.length) {
    el.innerHTML = `<div class="card">${T.empty}</div>`;
    return;
  }
  el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:6px;">
    ${entries.map(([fr, data]) => {
      const en = FR_TO_EN[fr.toLowerCase()] || fr;
      return `<div class="card pokemon" style="flex-direction:column;align-items:center;padding:6px;text-align:center;">
        <img src="https://play.pokemonshowdown.com/sprites/gen5/${en}.png"
             style="width:40px;image-rendering:pixelated;">
        <div style="font-size:.55em;margin-top:2px">${fr}</div>
        <div style="font-size:.5em;color:var(--ok)">×${data.count}</div>
        ${data.lost ? `<div style="font-size:.45em;color:var(--danger)">💀×${data.lost}</div>` : ''}
      </div>`;
    }).join('')}
  </div>`;
}

// ── COMBO DEX ─────────────────────────────────────────────
// state.comboDex = { [key]: { pattern:[], label:'', wins:0, rewardClaimed:false } }

function getTeamPattern(agent) {
  if (!agent?.team?.length) return null;
  const types = agent.team.map(pkmId => {
    const p = state.pokemons.find(x => x.id === pkmId);
    if (!p) return null;
    const fr = (p.species_fr||'').toLowerCase();
    // Type approximatif depuis les pools
    for (const [type, pool] of Object.entries(POKEMON_FR_POOL_BY_TYPE)) {
      if (pool.includes(fr)) return type;
    }
    return 'normal';
  }).filter(Boolean).sort();
  if (types.length < 2) return null;
  return types.join('-');
}

function checkComboUnlock(agent) {
  const pattern = getTeamPattern(agent);
  if (!pattern) return;
  if (!state.comboDex) state.comboDex = {};
  if (state.comboDex[pattern]) {
    if (!state.comboDex[pattern].rewardClaimed) {
      state.comboDex[pattern].rewardClaimed = true;
      state.resources.pokedollars += 10;
      addLog(`🏆 Combo "${pattern}" validé ! +10₽`);
    }
    return;
  }
  // Nouveau combo
  state.comboDex[pattern] = {
    pattern: pattern.split('-'),
    label: pattern,
    wins: 0,
    rewardClaimed: false,
    firstSeen: state.turn,
  };
  state.resources.pokedollars += 10;
  addLog(`🏆 ${lang==='fr'?'Nouveau combo débloqué':'New combo unlocked'} : "${pattern}" +10₽`);
}

function renderComboDex() {
  const el = document.getElementById('comboDexPanel');
  if (!el) return;
  const dex = state.comboDex || {};
  const entries = Object.entries(dex);
  const T = {
    fr:{ empty:'Aucun combo découvert.', apply:'Appliquer', wins:'victoires' },
    en:{ empty:'No combo discovered.',   apply:'Apply',     wins:'wins' },
  }[lang];

  if (!entries.length) { el.innerHTML = `<div class="card">${T.empty}</div>`; return; }

  el.innerHTML = entries.map(([key, data]) => {
    // Peut-on appliquer ce combo ?
    const canApply = data.pattern.every(type => {
      const pool = POKEMON_FR_POOL_BY_TYPE[type] || [];
      return state.pokemons.some(p => pool.includes((p.species_fr||'').toLowerCase()) && !(p.assignedAgentId));
    });
    return `<div class="card" style="font-size:.78em">
      <strong>${data.label}</strong>
      ${data.rewardClaimed ? '<span style="color:var(--ok)">✓</span>' : ''}
      <div style="font-size:.8em;color:var(--muted)">${data.wins} ${T.wins}</div>
      ${canApply
        ? `<button class="small" onclick="applyCombo('${key}')">${T.apply}</button>`
        : ''}
    </div>`;
  }).join('');
}

function applyCombo(key) {
  const combo = state.comboDex?.[key];
  const agent = state.agents.find(a => a.id === document.getElementById('agentSelect')?.value);
  if (!combo || !agent) return;

  const assigned = [];
  combo.pattern.forEach(type => {
    const pool = POKEMON_FR_POOL_BY_TYPE[type] || [];
    const pkm = state.pokemons.find(p =>
      pool.includes((p.species_fr||'').toLowerCase()) &&
      !p.assignedAgentId && !assigned.includes(p.id)
    );
    if (pkm) assigned.push(pkm.id);
  });

  agent.team.forEach(id => { const p = state.pokemons.find(x=>x.id===id); if(p) p.assignedAgentId=null; });
  agent.team = assigned.slice(0,3);
  assigned.forEach(id => { const p = state.pokemons.find(x=>x.id===id); if(p) p.assignedAgentId=agent.id; });
  checkComboUnlock(agent);
  addLog(`Combo "${key}" appliqué à ${agent.name}.`);
  saveState(); render();
}
