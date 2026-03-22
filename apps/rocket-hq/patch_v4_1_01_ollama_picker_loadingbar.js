
// ============================================================
// PATCH v4.1.01 — OLLAMA MODEL PICKER + LOADING BAR
// ============================================================

// ── OLLAMA MODEL DISCOVERY ───────────────────────────────

async function fetchOllamaModels() {
  const el = document.getElementById('ollamaModelSelect');
  const status = document.getElementById('ollamaModelStatus');
  if (status) status.textContent = '⏳ Chargement…';
  try {
    const res = await fetch(`${settings.baseUrl}/api/tags`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const models = (data.models || []).map(m => m.name);
    if (!models.length) throw new Error('Aucun modèle trouvé');
    if (el) {
      el.innerHTML = models.map(m =>
        `<option value="${m}" ${m === settings.model ? 'selected' : ''}>${m}</option>`
      ).join('');
      el.onchange = () => {
        settings.model = el.value;
        const inp = document.getElementById('modelInput');
        if (inp) inp.value = el.value;
        localStorage.setItem('pf.settings', JSON.stringify(settings));
      };
    }
    if (status) status.textContent = `✅ ${models.length} modèle(s) disponible(s)`;
    return models;
  } catch (e) {
    if (status) status.textContent = `❌ Ollama inaccessible (${e.message})`;
    if (el) el.innerHTML = `<option value="${settings.model}">${settings.model} (local)</option>`;
    return [];
  }
}

// ── LOADING BAR ───────────────────────────────────────────

// Crée ou réutilise la barre de chargement sur un élément cible
function showLoadingBar(anchorId, label = '') {
  let bar = document.getElementById('llmLoadingBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'llmLoadingBar';
    bar.style.cssText = `
      position:fixed;bottom:0;left:0;width:100%;height:3px;z-index:9999;
      background:transparent;pointer-events:none;
    `;
    bar.innerHTML = `<div id="llmLoadingFill" style="
      height:3px;width:0%;
      background:linear-gradient(90deg,#cc2233,#ffcc5a,#70e0a4);
      transition:width .3s ease;border-radius:0 3px 3px 0;
      box-shadow:0 0 8px rgba(255,204,90,.6);
    "></div>`;
    document.body.appendChild(bar);
  }
  bar.style.display = 'block';

  // Barre au-dessus du personnage si anchorId fourni
  const anchor = anchorId ? document.getElementById(anchorId) : null;
  let avatarBar = null;
  if (anchor) {
    avatarBar = document.createElement('div');
    avatarBar.id = 'llmAvatarBar';
    avatarBar.style.cssText = `
      position:absolute;bottom:calc(100% + 4px);left:0;width:100%;
      display:flex;flex-direction:column;align-items:center;gap:2px;
      pointer-events:none;z-index:50;
    `;
    avatarBar.innerHTML = `
      ${label ? `<span style="font-family:'Press Start 2P',monospace;font-size:.32em;
        color:var(--accent);white-space:nowrap;animation:blink .8s step-end infinite">${label}</span>` : ''}
      <div style="width:64px;height:4px;background:#2a2048;border-radius:2px;overflow:hidden;">
        <div id="llmAvatarFill" style="height:4px;width:0%;
          background:linear-gradient(90deg,#cc2233,#ffcc5a);
          border-radius:2px;transition:width .4s ease;"></div>
      </div>`;
    anchor.style.position = 'relative';
    anchor.appendChild(avatarBar);
  }

  // Progression simulée (indéterminée)
  let pct = 0;
  const fill     = document.getElementById('llmLoadingFill');
  const fillAvt  = document.getElementById('llmAvatarFill');
  const interval = setInterval(() => {
    pct = pct < 85 ? pct + (Math.random() * 8) : pct + 0.5;
    pct = Math.min(pct, 92);
    if (fill)    fill.style.width    = `${pct}%`;
    if (fillAvt) fillAvt.style.width = `${pct}%`;
  }, 200);

  return { fill, fillAvt, interval, avatarBar };
}

function hideLoadingBar({ fill, fillAvt, interval, avatarBar } = {}) {
  clearInterval(interval);
  if (fill)    { fill.style.width = '100%'; setTimeout(() => { const b = document.getElementById('llmLoadingBar'); if(b) b.style.display='none'; fill.style.width='0%'; }, 400); }
  if (fillAvt) { fillAvt.style.width = '100%'; }
  if (avatarBar) setTimeout(() => avatarBar.remove(), 500);
}

// ── OVERRIDE callOllama avec loading bar ─────────────────
const _callOllamaBase = callOllama;
async function callOllamaWithBar(prompt, fallback = '', anchorId = '', speakerLabel = '') {
  if (!settings.llmEnabled) return fallback;
  const handle = showLoadingBar(anchorId, speakerLabel);
  try {
    const result = await _callOllamaBase(prompt, fallback);
    hideLoadingBar(handle);
    return result;
  } catch(e) {
    hideLoadingBar(handle);
    return fallback;
  }
}
// Remplacement global
// Les appels LLM via recrutement et ally chat utilisent callOllamaWithBar
// Les ancres : 'recruitCandidate' pour recrutement, 'allyChatPanel' pour ally chat

// ── OVERRIDE sendAllyChat pour loading bar ───────────────
const _sendAllyChatBase = sendAllyChat;
async function sendAllyChat() {
  if (state.chatUsedThisTurn) return;
  const sel = document.getElementById('allyChatAgentSelect');
  const inp = document.getElementById('allyChatInput');
  if (!sel || !inp) return;
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';

  const agentId = sel.value;
  const agent   = state.agents.find(a => a.id === agentId);
  if (!agent) return;

  state.chatUsedThisTurn = agentId;
  if (!state.allyChatLog) state.allyChatLog = [];
  state.allyChatLog = [];
  state.allyChatLog.push(`${lang==='fr'?'Vous':'You'} → ${agent.name} : ${msg}`);

  const system  = buildNpcSystemPrompt(agent);
  const prompt  = `${system}

${lang==='fr'?'Message reçu':'Message received'} : "${msg}"
${lang==='fr'?'Réponds en une ou deux phrases.':'Answer in one or two sentences.'}`;
  const fallback= `${agent.name} : ${pick(agent.catch_phrases||['...'])}`;

  const reply = await callOllamaWithBar(prompt, fallback, 'allyChatPanel', agent.name);

  state.allyChatLog.push(reply);
  if (Math.random() < 0.2) {
    const bonuses = {
      fr: ['Cette conversation te donne des informations utiles. +1 Intel.','L'agent partage un tuyau. +50₽.'],
      en: ['This conversation yields useful intel. +1 Intel.','The agent shares a tip. +50₽.'],
    };
    const bonus = pick(bonuses[lang]||bonuses.fr);
    if (bonus.includes('Intel')) state.resources.intel += 1;
    else state.resources.pokedollars += 50;
    state.allyChatLog.push(`💡 ${bonus}`);
    addLog(`💡 ${bonus}`);
  }
  addLog(`[Chat] ${agent.name} : ${reply.slice(0,80)}…`);
  saveState(); render();
}

// ── OVERRIDE recruitStepV2 pour loading bar ──────────────
async function recruitStepV2() {
  const r = state.recruit;
  if (!r || r.finished) return;
  const message = document.getElementById('recruitMessage')?.value?.trim();
  if (!message) return;
  if (state.resources.pokedollars < RECRUIT_COST_PER_STEP) {
    const msg = lang==='fr' ? `Pas assez de Pokédollars. (${RECRUIT_COST_PER_STEP}₽ requis)` : `Not enough Pokédollars. (${RECRUIT_COST_PER_STEP}₽ needed)`;
    document.getElementById('recruitTranscript').innerHTML += `<div class="logline" style="color:var(--danger)">${msg}</div>`;
    return;
  }
  state.resources.pokedollars -= RECRUIT_COST_PER_STEP;
  document.getElementById('recruitMessage').value = '';
  r.interactions += 1;
  r.transcript.push(`${lang==='fr'?'Vous':'You'} : ${message}`);

  const npc = r.npc;
  const systemPrompt = buildNpcSystemPrompt(npc);
  const fullPrompt = `${systemPrompt}

${lang==='fr'?'Message du recruteur':'Recruiter message'} : "${message}"

Réponds en JSON strict : {"reply":"...","scoreDelta":-2..2}`;
  const fallback = JSON.stringify({ reply:`${r.candidateName} : ${lang==='fr'?'Continue...':'Go on...'}`, scoreDelta:0 });

  const llmOut = await callOllamaWithBar(fullPrompt, fallback, 'recruitCandidate', r.candidateName);

  let reply = `${r.candidateName} : ${lang==='fr'?'Je t'écoute.':'I'm listening.'}`;
  let delta  = 0;
  try {
    const jsonText = llmOut.includes('{') ? llmOut.slice(llmOut.indexOf('{'), llmOut.lastIndexOf('}')+1) : llmOut;
    const parsed   = JSON.parse(jsonText);
    reply = parsed.reply || reply;
    delta = Math.max(-2, Math.min(2, Number(parsed.scoreDelta)||0));
  } catch {
    delta = message.includes('Rocket') ? 1 : 0;
  }
  r.hiddenScore = Math.max(1, Math.min(10, r.hiddenScore + delta));
  r.transcript.push(reply);

  if (r.interactions >= RECRUIT_MAX_INTERACTIONS) {
    r.finished = true;
    if (r.hiddenScore >= 5) {
      const hasBourreau = Math.random() < 0.15;
      const newAgent = {
        id:`ag-${Date.now()}`, name:r.candidateName, rank:r.candidateRole,
        level:1, xp:0, cooldown:0, team:[], traits:hasBourreau?['bourreau_de_travail']:[],
        sprite:npc.sprite, personality:npc.personality,
        catch_phrases:npc.catch_phrases, pokemon_preferences:npc.pokemon_preferences,
        missions:[],
      };
      state.agents.push(newAgent);
      npc.possible_pokemon?.forEach(spFR => state.pokemons.push(makePokemon(spFR)));
      state.reputation = Math.min(100,(state.reputation||0)+3);
      addLog(`✅ ${lang==='fr'?'Recrutement réussi':'Recruited'} : ${r.candidateName}${hasBourreau?' [Bourreau de travail]':''}`);
      r.transcript.push(`--- ${lang==='fr'?'Recrutement réussi':'Success'} ---`);
    } else {
      addLog(`❌ ${lang==='fr'?'Recrutement échoué':'Failed'} : ${r.candidateName}`);
      r.transcript.push(`--- ${lang==='fr'?'Refus':'Refused'} ---`);
    }
  }
  saveState(); render();
}

// ── RENDER SETTINGS V2 (avec model picker) ───────────────
function renderSettingsV2() {
  const overlay = document.getElementById('settingsOverlay');
  if (!overlay || overlay.classList.contains('hidden')) return;

  // Injecte le sélecteur de modèles si absent
  if (!document.getElementById('ollamaModelSelect')) {
    const modelLabel = document.getElementById('modelInput')?.closest('label');
    if (modelLabel) {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:grid;gap:4px;';
      wrapper.innerHTML = `
        <label style="font-size:.8em;color:var(--muted)">
          Modèles disponibles
          <div style="display:flex;gap:6px;align-items:center">
            <select id="ollamaModelSelect" style="flex:1"></select>
            <button id="refreshModelsBtn" class="small">🔄</button>
          </div>
          <small id="ollamaModelStatus" style="color:var(--muted)">—</small>
        </label>`;
      modelLabel.parentNode.insertBefore(wrapper, modelLabel.nextSibling);
      document.getElementById('refreshModelsBtn').onclick = fetchOllamaModels;
    }
  }
  fetchOllamaModels();
}

// CSS loading bar + blink
if (!document.getElementById('loadingBarStyle')) {
  const s = document.createElement('style');
  s.id = 'loadingBarStyle';
  s.textContent = `
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    #llmLoadingBar { display:none; }
  `;
  document.head.appendChild(s);
}
