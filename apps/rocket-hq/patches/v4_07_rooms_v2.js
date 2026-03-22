
// ============================================================
// PATCH v4.07 — SALLES V2
// Salle d'apprentissage du combat + Salle d'entraînement Pokémon
// ============================================================

// ── STATE ADDITIONS ───────────────────────────────────────
// Ajouté dans BASE_STATE.rooms :
// learning:  { nom, level, assignedAgentId, upgradeCost }
// pkm_train: { nom, level, assignedPokemonIds:[], upgradeCost }

const LEARNING_ROOM_DEFAULTS = {
  nom:            { fr:'Salle d'apprentissage', en:'Learning Room' },
  level:          1,
  assignedAgentId:null,
  upgradeCost:    600,
  baseXpPerFight: 5,   // XP agent par combat simulé
  pkmXpPerFight:  2,   // XP Pokémon par combat simulé
};

const PKM_TRAIN_ROOM_DEFAULTS = {
  nom:                { fr:'Salle d'entraînement Pokémon', en:'Pokémon Training Room' },
  level:              1,
  assignedPokemonIds: [],
  upgradeCost:        600,
  baseXpPerTurn:      12,   // XP Pokémon/tour au niveau 1
};

function initRoomsV2() {
  if (!state.rooms.learning) {
    state.rooms.learning  = { ...LEARNING_ROOM_DEFAULTS };
  }
  if (!state.rooms.pkm_train) {
    state.rooms.pkm_train = { ...PKM_TRAIN_ROOM_DEFAULTS, assignedPokemonIds:[] };
  }
}

// Slots Pokémon disponibles dans la salle d'entraînement selon son level
function pkmTrainSlots(room) {
  if ((room.level||1) >= 5) return 3;
  if ((room.level||1) >= 3) return 2;
  return 1;
}

// ── PROCESSING ────────────────────────────────────────────
function processLearningRoom() {
  const room = state.rooms.learning;
  if (!room || !room.assignedAgentId) return;
  const agent = state.agents.find(a => a.id === room.assignedAgentId);
  if (!agent) return;
  if ((agent.cooldown||0) > 0) return; // agent en repos

  const fights = 5;
  const agentXP = fights * room.baseXpPerFight;
  grantAgentXP(agent, agentXP);

  // XP pour les Pokémon de l'agent
  agent.team.forEach(pkmId => {
    const pkm = state.pokemons.find(p => p.id === pkmId);
    if (pkm && !(pkm.cooldown > 0)) {
      grantPokemonXP(pkm, fights * room.pkmXpPerFight);
    }
  });
  addLog(`📚 ${agent.name} ${lang==='fr'?'a fait':'did'} ${fights} ${lang==='fr'?'combats simulés':'simulated fights'} (+${agentXP} XP)`);
}

function processPkmTrainingRoom() {
  const room = state.rooms.pkm_train;
  if (!room || !room.assignedPokemonIds?.length) return;

  const xpPerTurn = (room.baseXpPerTurn||12) * (room.level||1);

  room.assignedPokemonIds.forEach(pkmId => {
    const pkm = state.pokemons.find(p => p.id === pkmId);
    if (!pkm || (pkm.cooldown||0) > 0) return;

    // XP
    grantPokemonXP(pkm, xpPerTurn);

    // Évolution ?
    checkEvolution(pkm);

    // Événement spécial ?
    const ev = rollTrainingEvent(room);
    if (ev) {
      applyTrainingEvent(pkm, ev);
      // Flash visuel dans la bande des salles
      flashRoomSprite(pkmId, ev.positive);
    }
  });
}

function flashRoomSprite(pkmId, positive) {
  const el = document.getElementById(`room-sprite-${pkmId}`);
  if (!el) return;
  el.style.filter = positive ? 'drop-shadow(0 0 10px #70e0a4)' : 'drop-shadow(0 0 10px #ff4466)';
  el.style.animation = 'simShake .5s';
  setTimeout(() => {
    el.style.filter = '';
    el.style.animation = '';
  }, 800);
}

// ── RENDER SALLES V2 ─────────────────────────────────────
function renderRoomsV2() {
  const el = document.getElementById('roomsList');
  if (!el) return;

  const T = {
    fr:{ upgrade:'Améliorer', level:'Niv.', prod:'Prod./tour', assign:'Assigner', unassign:'Retirer', agent:'Agent assigné', none:'Aucun', pkm:'Pokémon assignés', slots:'slots', fights:'5 combats/tour' },
    en:{ upgrade:'Upgrade',   level:'Lv.',  prod:'Prod/turn',  assign:'Assign',   unassign:'Remove',  agent:'Assigned agent',  none:'None',  pkm:'Assigned Pokémon', slots:'slots', fights:'5 fights/turn' },
  }[lang];

  let html = '';

  // Salles standard (command, breeding, training)
  const standardRooms = ['command','breeding','training'];
  standardRooms.filter(k => state.rooms[k]).forEach(roomId => {
    const room = state.rooms[roomId];
    const nom = typeof room.nom === 'object' ? (room.nom[lang]||room.nom.fr) : room.nom;
    html += `<div class="room">
      <div><strong>${nom}</strong> ${T.level}${room.level}</div>
      <div class="row">
        <small>${T.prod} : ${room.baseIncome * room.level}</small>
        <button data-room="${roomId}">${T.upgrade} ${room.upgradeCost}₽</button>
      </div>
    </div>`;
  });

  // Salle d'apprentissage
  const lr = state.rooms.learning;
  if (lr) {
    const nom = lr.nom?.[lang] || lr.nom?.fr || 'Salle d'apprentissage';
    const assignedAgent = lr.assignedAgentId ? state.agents.find(a => a.id === lr.assignedAgentId) : null;
    const freeAgents = state.agents.filter(a => !(state.missions||[]).some(mi=>mi.agentId===a.id) && !(a.cooldown>0));

    html += `<div class="room">
      <div><strong>${nom}</strong> ${T.level}${lr.level} <small>(${T.fights})</small></div>
      <div><small>${T.agent} : ${assignedAgent ? assignedAgent.name : T.none}</small></div>
      ${assignedAgent
        ? `<button data-unassign-learning>✕ ${T.unassign}</button>`
        : `<select id="learningAgentSelect">${freeAgents.map(a=>`<option value="${a.id}">${a.name}</option>`).join('')}</select>
           <button data-assign-learning>${T.assign}</button>`}
      <div class="row" style="margin-top:4px">
        <button data-room="learning">${T.upgrade} ${lr.upgradeCost}₽</button>
      </div>
    </div>`;
  }

  // Salle d'entraînement Pokémon
  const ptr = state.rooms.pkm_train;
  if (ptr) {
    const nom   = ptr.nom?.[lang] || ptr.nom?.fr || 'Salle d'entraînement Pokémon';
    const slots = pkmTrainSlots(ptr);
    const assignedPkm = (ptr.assignedPokemonIds||[]).map(id => state.pokemons.find(p=>p.id===id)).filter(Boolean);
    const freePkm = state.pokemons.filter(p => !(ptr.assignedPokemonIds||[]).includes(p.id) && !(p.cooldown>0));
    const canAdd  = assignedPkm.length < slots;

    html += `<div class="room">
      <div><strong>${nom}</strong> ${T.level}${ptr.level} <small>(${slots} ${T.slots})</small></div>
      <div style="font-size:.75em;color:var(--muted)">${T.pkm} (${assignedPkm.length}/${slots}) :</div>
      ${assignedPkm.map(p => `
        <div style="display:flex;align-items:center;gap:4px;font-size:.75em">
          <img src="https://play.pokemonshowdown.com/sprites/gen5/${p.species_en}.png" id="room-sprite-${p.id}"
               style="width:28px;image-rendering:pixelated">
          ${p.species_fr} Nv.${p.level||1}
          ${p.cooldown>0 ? `<span style="color:#7060a8">[repos ${p.cooldown}t]</span>` : ''}
          <button class="small" data-unassign-pkm="${p.id}">✕</button>
        </div>`).join('')}
      ${canAdd && freePkm.length
        ? `<select id="pkmTrainSelect">${freePkm.map(p=>`<option value="${p.id}">${p.species_fr} Nv.${p.level||1}</option>`).join('')}</select>
           <button data-assign-pkm>${T.assign}</button>`
        : ''}
      <div class="row" style="margin-top:4px">
        <button data-room="pkm_train">${T.upgrade} ${ptr.upgradeCost}₽</button>
      </div>
    </div>`;
  }

  el.innerHTML = html;

  // Events
  el.querySelectorAll('button[data-room]').forEach(btn => {
    btn.onclick = () => {
      const room = state.rooms[btn.dataset.room];
      if (!room) return;
      if (state.resources.pokedollars < room.upgradeCost) {
        addLog(lang==='fr' ? 'Pas assez de Pokédollars.' : 'Not enough Pokédollars.');
        return;
      }
      state.resources.pokedollars -= room.upgradeCost;
      room.level = (room.level||1) + 1;
      room.upgradeCost = Math.round(room.upgradeCost * 1.5);
      addLog(`${typeof room.nom==='object'?room.nom[lang]:room.nom} ${lang==='fr'?'améliorée':'upgraded'} — Nv.${room.level}`);
      saveState(); render();
    };
  });
  el.querySelectorAll('[data-unassign-learning]').forEach(btn => {
    btn.onclick = () => { state.rooms.learning.assignedAgentId=null; saveState(); render(); };
  });
  el.querySelectorAll('[data-assign-learning]').forEach(btn => {
    btn.onclick = () => {
      const sel = document.getElementById('learningAgentSelect');
      if (sel) { state.rooms.learning.assignedAgentId = sel.value; saveState(); render(); }
    };
  });
  el.querySelectorAll('[data-unassign-pkm]').forEach(btn => {
    btn.onclick = () => {
      state.rooms.pkm_train.assignedPokemonIds =
        (state.rooms.pkm_train.assignedPokemonIds||[]).filter(id => id !== btn.dataset.unassignPkm);
      saveState(); render();
    };
  });
  el.querySelectorAll('[data-assign-pkm]').forEach(btn => {
    btn.onclick = () => {
      const sel = document.getElementById('pkmTrainSelect');
      const slots = pkmTrainSlots(state.rooms.pkm_train);
      if (sel && (state.rooms.pkm_train.assignedPokemonIds||[]).length < slots) {
        state.rooms.pkm_train.assignedPokemonIds = [...(state.rooms.pkm_train.assignedPokemonIds||[]), sel.value];
        saveState(); render();
      }
    };
  });
}
