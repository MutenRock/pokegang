
// ============================================================
// PATCH v4.10 — CHAT PNJ ALLIÉ RECENTRÉ
// 1 conversation/tour, uniquement agents recrutés
// ============================================================

// state.chatUsedThisTurn = false | agentId

function renderAllyChat() {
  const el = document.getElementById('allyChatPanel');
  if (!el) return;
  const T = {
    fr:{ title:'Briefing allié', used:'Conversation utilisée ce tour.', pick:'Choisir un allié', send:'Parler', placeholder:'Message à l'allié…', hint:'1 conversation disponible par tour.' },
    en:{ title:'Ally Briefing',  used:'Conversation used this turn.',    pick:'Choose an ally',  send:'Talk',   placeholder:'Message to ally…',    hint:'1 conversation available per turn.' },
  }[lang];

  const alreadyUsed = !!state.chatUsedThisTurn;

  const agentOptions = state.agents.map(a =>
    `<option value="${a.id}" ${state.chatUsedThisTurn===a.id?'disabled':''}>
      ${a.name} — ${a.rank}
    </option>`
  ).join('');

  el.innerHTML = `
    <h2>${T.title}</h2>
    ${alreadyUsed
      ? `<div class="card" style="font-size:.78em;color:var(--muted)">${T.used}</div>`
      : `<small style="color:var(--muted);font-size:.7em">${T.hint}</small>`}
    <label style="font-size:.75em">${T.pick}
      <select id="allyChatAgentSelect">${agentOptions}</select>
    </label>
    <div class="chat">
      <input id="allyChatInput" type="text" placeholder="${T.placeholder}" ${alreadyUsed?'disabled':''}>
      <button id="allyChatSendBtn" ${alreadyUsed?'disabled':''} onclick="sendAllyChat()">${T.send}</button>
    </div>
    <div id="allyChatLog" class="logs" style="max-height:160px;margin-top:6px"></div>
  `;

  // Log de la conversation du tour
  const log = state.allyChatLog || [];
  const logEl = document.getElementById('allyChatLog');
  if (logEl) {
    logEl.innerHTML = log.map(l => `<div class="logline">${l}</div>`).join('') ||
      `<div style="font-size:.7em;color:var(--muted)">${lang==='fr'?'Aucune conversation.':'No conversation.'}</div>`;
  }

  // Enter key
  const inp = document.getElementById('allyChatInput');
  if (inp) inp.onkeydown = e => { if(e.key==='Enter') sendAllyChat(); };
}

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
  state.allyChatLog = []; // reset à chaque tour (voir processTurn)
  state.allyChatLog.push(`${lang==='fr'?'Vous':'You'} → ${agent.name} : ${msg}`);

  // LLM ou fallback
  const system  = buildNpcSystemPrompt(agent);
  const prompt  = `${system}

${lang==='fr'?'Message reçu':'Message received'} : "${msg}"
${lang==='fr'?'Réponds en une ou deux phrases.':'Answer in one or two sentences.'}`;
  const fallback= `${agent.name} : ${pick(agent.catch_phrases||['...'])}`;
  const reply   = await callOllama(prompt, fallback);

  state.allyChatLog.push(reply);

  // Chance de bonus narratif
  if (Math.random() < 0.2) {
    const bonuses = {
      fr: ['Cette conversation te donne des informations utiles. +1 Intel.', 'L'agent partage un tuyau. +50₽.', 'Un détail révélateur. +1 Intel.'],
      en: ['This conversation yields useful intel. +1 Intel.', 'The agent shares a tip. +50₽.', 'A revealing detail. +1 Intel.'],
    };
    const bonus = pick(bonuses[lang] || bonuses.fr);
    if (bonus.includes('Intel')) state.resources.intel += 1;
    else state.resources.pokedollars += 50;
    state.allyChatLog.push(`💡 ${bonus}`);
    addLog(`💡 ${bonus}`);
  }

  addLog(`[Chat] ${agent.name} : ${reply.slice(0, 80)}…`);
  saveState(); render();
}

// Réinitialise le chat en début de tour (appelé dans processTurn)
function resetAllyChat() {
  state.chatUsedThisTurn = false;
  state.allyChatLog = [];
}
