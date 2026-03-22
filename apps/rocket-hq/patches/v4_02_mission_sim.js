
// ============================================================
// PATCH v4.02 — MISSION SIMULATION MODULE
// ============================================================

const ZONE_BG_STYLES = {
  default: { bg:'#0d1a0d', label:'Kanto', stars:true },
  marais:  { bg:'linear-gradient(160deg,#0a1a06 0%,#142a08 100%)', label:'Marais Cramois', stars:false },
  grotte:  { bg:'linear-gradient(160deg,#140a06 0%,#2a1408 100%)', label:'Grotte Sombre', stars:false },
  silph:   { bg:'linear-gradient(160deg,#06060a 0%,#14143a 100%)', label:'Tour Silph Co.', stars:true },
  safari:  { bg:'linear-gradient(160deg,#0a1a00 0%,#1a2a08 100%)', label:'Zone Safari', stars:false },
  route:   { bg:'linear-gradient(160deg,#0a1a0a 0%,#182a18 100%)', label:'Route 1', stars:false },
  centre:  { bg:'linear-gradient(160deg,#180a1a 0%,#0a0a18 100%)', label:'Centre Pokémon', stars:true },
};

const MISSION_ZONE_MAP = {
  m1:'centre', m2:'grotte', m3:'safari', m4:'silph', m5:'route', m6:'grotte',
  m_raid_marais:'marais', m_raid_safari:'safari', m_vol_dresseur:'route',
  m_event_legendaire:'default',
};

// Dialogues de simulation par phase (FR/EN)
const SIM_DIALOGUES = {
  fr: {
    approach: [
      "On approche de la zone. Silence.",
      "La cible est en vue. On reste groupés.",
      "Aucun agent ennemi détecté. On y va.",
    ],
    combat: [
      "Allez, montre-leur ce qu'on vaut !",
      "Fonce ! Ne leur laisse pas le temps !",
      "Tiens bon ! On n'abandonne pas !",
    ],
    success: [
      "Mission accomplie. Repli immédiat.",
      "Bien joué. Giovanni sera satisfait.",
      "On a ce qu'on est venu chercher.",
    ],
    failure: [
      "Retraite ! On se retrouve au QG.",
      "Maudit soit ce jour. On se replie.",
      "On reviendra. Mais pas aujourd'hui.",
    ],
    jenny: [
      "L'Agent Jenny ! Vite, fuyez !",
      "Police ! Abandonnez le butin et courez !",
    ],
    pkm_appears: [
      "Un Pokémon sauvage surgit !",
      "Attention, Pokémon hostile !",
    ],
  },
  en: {
    approach: [
      "Approaching the zone. Silence.",
      "Target in sight. Stay together.",
      "No enemy agents detected. Let's go.",
    ],
    combat: [
      "Go, show them what we're worth!",
      "Charge! Don't give them time!",
      "Hold on! We don't give up!",
    ],
    success: [
      "Mission complete. Immediate retreat.",
      "Well done. Giovanni will be pleased.",
      "We got what we came for.",
    ],
    failure: [
      "Retreat! Meet at HQ.",
      "Damn this day. We fall back.",
      "We'll be back. But not today.",
    ],
    jenny: [
      "Officer Jenny! Run!",
      "Police! Drop everything and run!",
    ],
    pkm_appears: [
      "A wild Pokémon appears!",
      "Hostile Pokémon!",
    ],
  },
};

// ── POPUP MISSION RÉSOLUTION ──────────────────────────
function showMissionPopup(missionDef, agentObj, result) {
  const L = SIM_DIALOGUES[lang] || SIM_DIALOGUES.fr;
  const zone = MISSION_ZONE_MAP[missionDef.id] || 'default';
  const zoneDef = ZONE_BG_STYLES[zone] || ZONE_BG_STYLES.default;
  const steps = buildSimSteps(missionDef, agentObj, result, L);

  const popup = document.createElement('div');
  popup.id = 'missionSimPopup';
  popup.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:100;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:16px;font-family:'Press Start 2P',monospace;
  `;

  popup.innerHTML = `
    <div style="width:min(900px,98vw);background:#0f0c1e;border:2px solid #7866d1;border-radius:12px;overflow:hidden;">
      <!-- Bande de simulation -->
      <div id="simBand" style="
        width:100%;height:170px;position:relative;
        background:${zoneDef.bg};transition:background 0.8s;
        border-bottom:2px solid #4a3a8a;overflow:hidden;
      ">
        <div style="position:absolute;top:8px;left:12px;font-size:.45em;color:#ffcc5a;letter-spacing:.1em">${zoneDef.label}</div>
        <!-- Agent sprite -->
        ${agentObj?.sprite ? `<img id="simAgentSprite" src="${agentObj.sprite}"
          style="position:absolute;bottom:16px;left:14%;width:56px;image-rendering:pixelated;
          animation:simFloat 2.5s ease-in-out infinite;">` : ''}
        <!-- Pokémon slot ennemi -->
        <div id="simEnemySlot" style="position:absolute;bottom:16px;right:14%;display:flex;gap:8px;"></div>
        <!-- Bulle de dialogue -->
        <div id="simBubble" style="
          position:absolute;top:10px;left:50%;transform:translateX(-50%);
          background:rgba(255,255,255,0.92);color:#0a0812;
          padding:6px 12px;border-radius:8px;font-size:.42em;
          max-width:55%;text-align:center;white-space:normal;line-height:1.6;
          display:none;
        "></div>
      </div>
      <!-- Corps -->
      <div style="padding:16px;display:grid;gap:10px;">
        <div style="font-size:.6em;color:#ffcc5a;letter-spacing:.1em">${missionDef.nom || missionDef.name}</div>
        <div id="simLog" style="font-size:.42em;color:#b9adff;line-height:2;min-height:60px;"></div>
        <div id="simRewards" style="display:none;font-size:.48em;color:#70e0a4;line-height:2;"></div>
        <div id="simContinueBtn" style="display:none;text-align:center;">
          <button onclick="closeMissionPopup()" style="
            font-family:'Press Start 2P',monospace;font-size:.55em;
            background:#ffcc5a;border:2px solid #000;padding:10px 24px;
            border-radius:8px;cursor:pointer;
          ">${lang==='fr'?'CONTINUER':'CONTINUE'} →</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  // Injection CSS animation si absente
  if (!document.getElementById('simAnimStyle')) {
    const s = document.createElement('style');
    s.id = 'simAnimStyle';
    s.textContent = `
      @keyframes simFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @keyframes simPop{0%{transform:scale(0)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
      @keyframes simShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
    `;
    document.head.appendChild(s);
  }

  // Joue les étapes de simulation
  playSimSteps(steps, 0);
}

function buildSimSteps(missionDef, agentObj, result, L) {
  const steps = [];
  const enemies = getMissionEnemyPokemon(missionDef);

  steps.push({ type:'log',    text: pick(L.approach) });
  steps.push({ type:'bubble', text: pick(L.approach) });

  if (enemies.length) {
    steps.push({ type:'log',     text: pick(L.pkm_appears) });
    steps.push({ type:'bubble',  text: pick(L.pkm_appears) });
    steps.push({ type:'showPkm', pokemons: enemies });
  }

  steps.push({ type:'log',    text: pick(L.combat) });
  steps.push({ type:'bubble', text: pick(L.combat) });

  if (result.jennyEvent) {
    steps.push({ type:'log',    text: pick(L.jenny) });
    steps.push({ type:'bubble', text: pick(L.jenny) });
    steps.push({ type:'shake' });
  }

  const finalLine = result.success ? pick(L.success) : pick(L.failure);
  steps.push({ type:'log',    text: finalLine });
  steps.push({ type:'bubble', text: finalLine });
  steps.push({ type:'rewards', result });

  return steps;
}

function getMissionEnemyPokemon(missionDef) {
  const zone = MISSION_ZONE_MAP[missionDef.id] || 'default';
  const pools = {
    marais:  ['poliwag','psyduck','tentacool'],
    grotte:  ['geodude','zubat','onix'],
    silph:   ['porygon','electrode','magneton'],
    safari:  ['tauros','kangaskhan','scyther'],
    route:   ['pidgey','rattata','spearow'],
    centre:  ['chansey','clefairy','jigglypuff'],
    default: ['rattata','pidgey'],
  };
  const pool = pools[zone] || pools.default;
  return [pick(pool)];
}

let simStepTimeout = null;
function playSimSteps(steps, idx) {
  if (idx >= steps.length) return;
  const step = steps[idx];
  const delay = 1200;

  const logEl    = document.getElementById('simLog');
  const bubbleEl = document.getElementById('simBubble');
  const enemyEl  = document.getElementById('simEnemySlot');

  if (step.type === 'log' && logEl) {
    logEl.innerHTML += `<div>▶ ${step.text}</div>`;
  }
  if (step.type === 'bubble' && bubbleEl) {
    bubbleEl.textContent = step.text;
    bubbleEl.style.display = 'block';
    setTimeout(() => { if (bubbleEl) bubbleEl.style.display = 'none'; }, 2200);
  }
  if (step.type === 'showPkm' && enemyEl) {
    enemyEl.innerHTML = step.pokemons.map(en => `
      <div style="display:flex;flex-direction:column;align-items:center;animation:simPop .4s">
        <img src="https://play.pokemonshowdown.com/sprites/gen5/${en}.png"
             style="width:48px;image-rendering:pixelated;">
      </div>`).join('');
  }
  if (step.type === 'shake') {
    const band = document.getElementById('simBand');
    if (band) { band.style.animation='simShake .5s'; setTimeout(()=>{band.style.animation='';},600); }
  }
  if (step.type === 'rewards') {
    const rewardEl = document.getElementById('simRewards');
    const contBtn  = document.getElementById('simContinueBtn');
    if (rewardEl) {
      const r = step.result;
      let html = r.success
        ? (lang==='fr' ? '✅ Succès !' : '✅ Success!')
        : (lang==='fr' ? '❌ Échec.' : '❌ Failed.');
      if (r.pokedollars) html += `<br>💰 +${r.pokedollars} Pokédollars`;
      if (r.intel)       html += `<br>🔍 +${r.intel} Intel`;
      if (r.pokemon)     html += `<br>🎯 Pokémon récupéré : ${r.pokemon.map(p=>p.species_fr).join(', ')}`;
      if (r.losses)      html += `<br>💀 Perdu : ${r.losses.join(', ')}`;
      rewardEl.innerHTML = html;
      rewardEl.style.display = 'block';
    }
    if (contBtn) contBtn.style.display = 'block';
    return; // stop auto-advance
  }

  simStepTimeout = setTimeout(() => playSimSteps(steps, idx+1), delay);
}

function closeMissionPopup() {
  if (simStepTimeout) clearTimeout(simStepTimeout);
  const popup = document.getElementById('missionSimPopup');
  if (popup) popup.remove();
}
