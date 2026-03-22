
// ============================================================
// PATCH v4.03 — MISSIONS V2
// Nouvelles missions, récompenses Pokémon, mort/capture Jenny
// Retrait salle de capture
// ============================================================

// ── MISSIONS V2 — CATALOGUE COMPLET ─────────────────────
const MISSIONS_V2 = [
  // ── VOL DE POKÉMON ────────────────────────────────────
  { id:'m_vol_centre',    zone:'centre', categorie:'vol',
    nom:      { fr:'Vol au Centre Pokémon',          en:'Pokémon Center Theft' },
    desc:     { fr:'Subtiliser les Pokémon hospitalisés.', en:'Steal hospitalized Pokémon.' },
    recompense:{ pokedollars:200, pokemon:['chansey','clefairy'], intel:1 },
    duree:2, risque:'faible', jennyRisk:0.15,
    pkmRewardPool: ['chansey','clefairy','jigglypuff'],
  },
  { id:'m_vol_dresseur',  zone:'route',  categorie:'vol',
    nom:      { fr:'Racket de dresseurs Route 1',    en:'Route 1 Trainer Mugging' },
    desc:     { fr:'Forcer les dresseurs à abandonner leurs Pokémon.', en:'Force trainers to surrender their Pokémon.' },
    recompense:{ pokedollars:300, pokemon:['pidgey','rattata'] },
    duree:1, risque:'faible', jennyRisk:0.1,
    pkmRewardPool: ['pidgey','rattata','spearow','ekans'],
  },

  // ── RAID DE ZONE ──────────────────────────────────────
  { id:'m_raid_marais',   zone:'marais', categorie:'raid',
    nom:      { fr:'Raid — Marais Cramois',           en:'Raid — Crimson Swamp' },
    desc:     { fr:'Capturer les Pokémon aquatiques du marais.', en:'Capture aquatic Pokémon from the swamp.' },
    recompense:{ pokedollars:400, capturePoints:2 },
    duree:2, risque:'moyen', jennyRisk:0.2,
    pkmRewardPool: ['psyduck','poliwag','tentacool','goldeen','slowpoke'],
  },
  { id:'m_raid_safari',   zone:'safari', categorie:'raid',
    nom:      { fr:'Infiltration — Zone Safari',     en:'Infiltration — Safari Zone' },
    desc:     { fr:'Braconner des espèces rares sous couverture.', en:'Poach rare species undercover.' },
    recompense:{ pokedollars:500, capturePoints:3 },
    duree:3, risque:'moyen', jennyRisk:0.3,
    pkmRewardPool: ['tauros','kangaskhan','scyther','pinsir','rhyhorn'],
  },
  { id:'m_raid_grotte',   zone:'grotte', categorie:'raid',
    nom:      { fr:'Fouille — Grotte Azurée',         en:'Sweep — Cerulean Cave' },
    desc:     { fr:'Explorer la grotte pour capturer ce qui s'y trouve.', en:'Explore the cave and capture whatever lurks.' },
    recompense:{ pokedollars:600, intel:2 },
    duree:3, risque:'élevé', jennyRisk:0.2,
    pkmRewardPool: ['zubat','geodude','onix','cubone','drowzee'],
  },

  // ── TRAFIC / CONTREBANDE ──────────────────────────────
  { id:'m_trafic_fossiles', zone:'grotte', categorie:'trafic',
    nom:      { fr:'Trafic de Fossiles',              en:'Fossil Trafficking' },
    desc:     { fr:'Revendre des fossiles volés au Musée de Jadielle.', en:'Resell stolen fossils at Pewter Museum.' },
    recompense:{ pokedollars:700, intel:2 },
    duree:3, risque:'moyen', jennyRisk:0.25,
    pkmRewardPool: [],
  },
  { id:'m_silph',           zone:'silph',  categorie:'trafic',
    nom:      { fr:'Opération Silph Co.',             en:'Silph Co. Operation' },
    desc:     { fr:'Prendre le contrôle d'un étage de la Tour Silph.', en:'Take control of one floor of Silph Tower.' },
    recompense:{ pokedollars:1000, intel:5, capturePoints:2 },
    duree:4, risque:'élevé', jennyRisk:0.35,
    pkmRewardPool: ['porygon','electrode','lapras'],
  },

  // ── ÉVÉNEMENTS SPÉCIAUX ───────────────────────────────
  { id:'m_event_legendaire', zone:'default', categorie:'event',
    nom:       { fr:'Rumeur — Signal Inconnu',        en:'Rumor — Unknown Signal' },
    desc:      { fr:'Un signal étrange vient d'une île au large...', en:'A strange signal from a distant island...' },
    recompense: { pokedollars:1500, intel:8 },
    duree:5, risque:'élevé', jennyRisk:0.4,
    pkmRewardPool: ['mew','mewtwo'],
    rare:true,
  },
];

// Retire la salle de capture du state (migration douce)
function migrateRemoveCapture() {
  if (state.rooms && state.rooms.capture) {
    const pts = state.rooms.capture.level * 2;
    state.resources.pokedollars = (state.resources.pokedollars||0) + pts * 50;
    delete state.rooms.capture;
    addLog(lang==='fr'
      ? `Salle de Capture retirée — conversion : +${pts*50} Pokédollars.`
      : `Capture Room removed — converted to +${pts*50} Pokédollars.`);
  }
}

// Pool de missions disponibles — tirage parmi MISSIONS_V2
function rollAvailableMissionsV2() {
  const pool = MISSIONS_V2.filter(m => !m.rare);
  const shuffled = [...pool].sort(() => Math.random()-0.5);
  // Événement rare : 15% de chance d'apparaître
  const rares = MISSIONS_V2.filter(m => m.rare);
  if (Math.random() < 0.15 && rares.length) shuffled.unshift(pick(rares));
  state.availableMissions = shuffled.slice(0, 3);
}

// Résolution d'une mission V2
function resolveMissionV2(mi) {
  const mDef = MISSIONS_V2.find(x => x.id === mi.missionId) || MISSIONS.find(x => x.id === mi.missionId);
  if (!mDef) return;
  const agent = state.agents.find(a => a.id === mi.agentId);

  // Succès basé sur réputation + level agent
  const agentLevel = agent?.level || 1;
  const baseChance = 35 + (state.reputation||0) * 0.6 + agentLevel * 5;
  const success = Math.random() * 100 < Math.min(90, baseChance);

  // Risque Jenny
  const jennyRisk = mDef.jennyRisk || 0.1;
  const jennyEvent = Math.random() < jennyRisk;

  const result = { success, jennyEvent, pokedollars:0, intel:0, pokemon:[], losses:[] };

  if (success) {
    // Pokédollars
    result.pokedollars = mDef.recompense?.pokedollars || 0;
    state.resources.pokedollars += result.pokedollars;
    // Intel
    result.intel = mDef.recompense?.intel || 0;
    state.resources.intel += result.intel;
    // CapturePoints
    if (mDef.recompense?.capturePoints) state.resources.capturePoints += mDef.recompense.capturePoints;

    // Pokémon en récompense
    const pkmPool = mDef.pkmRewardPool || [];
    if (pkmPool.length) {
      const numPkm = 1 + Math.floor(Math.random() * Math.min(2, pkmPool.length));
      for (let i=0; i<numPkm; i++) {
        const spEN = pick(pkmPool);
        const spFR = Object.keys(FR_TO_EN).find(k => FR_TO_EN[k]===spEN) || spEN;
        const pok = makePokemon(spFR, 8 + Math.floor(Math.random()*10));
        state.pokemons.push(pok);
        state.newPokemonsThisTurn.push(pok);
        updatePokedex(spFR);
        result.pokemon.push(pok);
      }
    }
    // XP agent
    if (agent) {
      const xpGain = mDef.risque==='élevé' ? 50 : mDef.risque==='moyen' ? 30 : 15;
      grantAgentXP(agent, xpGain);
    }
    state.reputation = Math.min(100, (state.reputation||0) + 2);
    addLog(`✅ ${mDef.nom?.[lang]||mDef.nom} — ${lang==='fr'?'Succès':'Success'} (${agent?.name})`);
  } else {
    state.reputation = Math.max(0, (state.reputation||0) - 3);
    addLog(`❌ ${mDef.nom?.[lang]||mDef.nom} — ${lang==='fr'?'Échec':'Failure'} (${agent?.name})`);
  }

  // Événement Jenny : peut saisir un Pokémon de l'équipe de l'agent
  if (jennyEvent && agent?.team?.length) {
    const pkmId = pick(agent.team);
    const pkmObj = state.pokemons.find(p => p.id===pkmId);
    if (pkmObj) {
      result.losses.push(pkmObj.species_fr || pkmObj.species_en);
      state.pokemons = state.pokemons.filter(p => p.id !== pkmId);
      agent.team = agent.team.filter(id => id !== pkmId);
      addLog(`🚔 Jenny a saisi ${pkmObj.species_fr || pkmObj.species_en} !`);
    }
  }

  // Mort en mission : risque selon difficulté
  const deathRisk = mDef.risque==='élevé' ? 0.12 : mDef.risque==='moyen' ? 0.05 : 0.01;
  if (!success && agent?.team?.length && Math.random() < deathRisk) {
    const pkmId = pick(agent.team);
    const pkmObj = state.pokemons.find(p => p.id===pkmId);
    if (pkmObj) {
      result.losses.push(`${pkmObj.species_fr||pkmObj.species_en} (${lang==='fr'?'mort':'died'})`);
      state.pokemons = state.pokemons.filter(p => p.id !== pkmId);
      agent.team = agent.team.filter(id => id !== pkmId);
      addLog(`💀 ${pkmObj.species_fr||pkmObj.species_en} est mort en mission.`);
    }
  }

  // Cooldown post-mission
  if (agent) {
    const hasBourreau = (agent.traits||[]).includes('bourreau_de_travail');
    agent.cooldown = hasBourreau ? 0 : 1;
  }
  // Cooldown Pokémon
  if (agent?.team) {
    agent.team.forEach(pkmId => {
      const pkmObj = state.pokemons.find(p => p.id===pkmId);
      if (pkmObj) {
        const hasBourreau = (agent.traits||[]).includes('bourreau_de_travail');
        pkmObj.cooldown = hasBourreau ? 1 : 2;
      }
    });
  }

  // Popup de résolution
  showMissionPopup(mDef, agent, result);

  return result;
}

// Remplacement de processMissions par processMissionsV2
function processMissionsV2() {
  if (!state.missions) state.missions = [];
  state.missions.forEach(mi => mi.turnsLeft -= 1);
  const done = state.missions.filter(mi => mi.turnsLeft <= 0);
  state.missions = state.missions.filter(mi => mi.turnsLeft > 0);
  done.forEach(mi => resolveMissionV2(mi));

  // Décrémente cooldowns agents
  state.agents.forEach(a => { if (a.cooldown > 0) a.cooldown -= 1; });
  // Décrémente cooldowns pokémons
  state.pokemons.forEach(p => { if (p.cooldown > 0) p.cooldown -= 1; });
}

function renderMissionsV2() {
  const el = document.getElementById('missionsList');
  if (!el) return;
  const T = {
    fr:{ avail:'Missions disponibles', ongoing:'Missions en cours', none:'Aucune.', send:'Envoyer', noAgent:'Aucun agent libre', turns:'tour(s)', risk:'risque', reward:'Récompense' },
    en:{ avail:'Available Missions', ongoing:'Ongoing Missions', none:'None.', send:'Send', noAgent:'No free agent', turns:'turn(s)', risk:'risk', reward:'Reward' },
  }[lang];

  let html = `<h4>${T.avail}</h4>`;
  if (!state.availableMissions?.length) html += `<div class="mission-card">${T.none}</div>`;
  else html += state.availableMissions.map(m => {
    const agentLibre = state.agents.find(a =>
      !(state.missions||[]).some(mi => mi.agentId === a.id) && !(a.cooldown > 0)
    );
    const nom = m.nom?.[lang] || m.nom || m.id;
    const desc = m.desc?.[lang] || m.desc || '';
    const rwStr = Object.entries(m.recompense||{}).map(([k,v])=>`${v} ${k}`).join(', ');
    return `<div class="mission-card">
      <strong>${nom}</strong>
      <span class="badge-mission">${m.risque||'?'}</span>
      <small>${desc}</small>
      <small>${m.duree} ${T.turns} — ${T.reward} : ${rwStr}</small>
      ${agentLibre
        ? `<button class="small" onclick="assignMissionV2('${m.id}','${agentLibre.id}')">${T.send} ${agentLibre.name}</button>`
        : `<small><em>${T.noAgent}</em></small>`}
    </div>`;
  }).join('');

  html += `<h4>${T.ongoing}</h4>`;
  if (!state.missions?.length) html += `<div class="mission-card">${T.none}</div>`;
  else html += state.missions.map(mi => {
    const agent = state.agents.find(a => a.id === mi.agentId);
    const mDef = MISSIONS_V2.find(x => x.id === mi.missionId) || MISSIONS.find(x => x.id === mi.missionId);
    const nom = mDef?.nom?.[lang] || mDef?.nom || mi.missionId;
    return `<div class="mission-card"><strong>${nom}</strong> — ${agent?.name||'?'} — ${mi.turnsLeft} ${T.turns}</div>`;
  }).join('');
  el.innerHTML = html;
}

function assignMissionV2(missionId, agentId) {
  const m = MISSIONS_V2.find(x => x.id === missionId) || MISSIONS.find(x => x.id === missionId);
  const agent = state.agents.find(a => a.id === agentId);
  if (!m || !agent) return;
  if (!state.missions) state.missions = [];
  state.missions.push({ missionId, agentId, turnsLeft:m.duree, recompense:m.recompense });
  state.availableMissions = state.availableMissions.filter(x => x.id !== missionId);
  addLog(`${lang==='fr'?'Mission lancée':'Mission started'} : "${m.nom?.[lang]||m.nom}" — ${agent.name}`);
  saveState(); render();
}
