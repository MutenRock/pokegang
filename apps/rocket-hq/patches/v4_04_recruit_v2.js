
// ============================================================
// PATCH v4.04 — RECRUTEMENT V2
// 3 interactions max, coût 100₽ chacune
// ============================================================

const RECRUIT_MAX_INTERACTIONS = 3;
const RECRUIT_COST_PER_STEP    = 100; // Pokédollars

// Override de recruitStep (remplace la version v3)
async function recruitStepV2() {
  const r = state.recruit;
  if (!r || r.finished) return;

  const message = ui.recruitMessage.value.trim();
  if (!message) return;

  // Coût
  if (state.resources.pokedollars < RECRUIT_COST_PER_STEP) {
    const msg = lang==='fr'
      ? `Pas assez de Pokédollars pour cette interaction. (${RECRUIT_COST_PER_STEP}₽ requis)`
      : `Not enough Pokédollars for this interaction. (${RECRUIT_COST_PER_STEP}₽ needed)`;
    ui.recruitTranscript.innerHTML += `<div class="logline" style="color:var(--danger)">${msg}</div>`;
    return;
  }

  state.resources.pokedollars -= RECRUIT_COST_PER_STEP;
  ui.recruitMessage.value = '';
  r.interactions += 1;
  r.transcript.push(`${lang==='fr'?'Vous':'You'} : ${message}`);

  const npc = r.npc;
  const systemPrompt = buildNpcSystemPrompt(npc);
  const fullPrompt   = `${systemPrompt}\n\n${lang==='fr'?'Message du recruteur':'Recruiter message'} : "${message}"\n\nRéponds en JSON strict : {"reply":"...","scoreDelta":-2..2}`;
  const fallback     = JSON.stringify({ reply:`${r.candidateName} : ${lang==='fr'?'Continue...':'Go on...'}`, scoreDelta: message.length > 20 ? 1 : 0 });
  const llmOut       = await callOllama(fullPrompt, fallback);

  let reply = `${r.candidateName} : ${lang==='fr'?'Je t'écoute.':'I'm listening.'}`;
  let delta  = 0;
  try {
    const jsonText = llmOut.includes('{') ? llmOut.slice(llmOut.indexOf('{'), llmOut.lastIndexOf('}')+1) : llmOut;
    const parsed   = JSON.parse(jsonText);
    reply = parsed.reply || reply;
    delta = Math.max(-2, Math.min(2, Number(parsed.scoreDelta)||0));
  } catch {
    delta = message.includes('Rocket')||message.includes('ressource')||message.includes('resource') ? 1 : 0;
  }

  r.hiddenScore = Math.max(1, Math.min(10, r.hiddenScore + delta));
  r.transcript.push(reply);

  // Fin à 3 interactions
  if (r.interactions >= RECRUIT_MAX_INTERACTIONS) {
    r.finished = true;
    if (r.hiddenScore >= 5) {
      const hasBourreau = Math.random() < 0.15; // 15% de chance d'avoir ce trait
      const newAgent = {
        id:      `ag-${Date.now()}`,
        name:    r.candidateName,
        rank:    r.candidateRole,
        level:   1, xp:0, cooldown:0,
        team:    [],
        traits:  hasBourreau ? ['bourreau_de_travail'] : [],
        sprite:  npc.sprite,
        personality:      npc.personality,
        catch_phrases:    npc.catch_phrases,
        pokemon_preferences: npc.pokemon_preferences,
        missions:[],
      };
      state.agents.push(newAgent);
      npc.possible_pokemon.forEach(spFR => state.pokemons.push(makePokemon(spFR)));
      state.reputation = Math.min(100, (state.reputation||0) + 3);
      const traitMsg = hasBourreau ? (lang==='fr' ? ' [Bourreau de travail !]' : ' [Workaholic!]') : '';
      addLog(`✅ ${lang==='fr'?'Recrutement réussi':'Recruitment successful'} : ${r.candidateName}${traitMsg}`);
      r.transcript.push(`--- ${lang==='fr'?'Recrutement réussi':'Recruitment successful'} ---`);
    } else {
      addLog(`❌ ${lang==='fr'?'Recrutement échoué':'Recruitment failed'} : ${r.candidateName}`);
      r.transcript.push(`--- ${lang==='fr'?'Refus':'Refused'} ---`);
    }
  }

  saveState(); render();
}

// Mise à jour du render de recrutement pour afficher les 3 étapes
function renderRecruitV2() {
  if (!state.recruit) initRecruit();
  const r    = state.recruit;
  const npc  = r.npc;
  const T = {
    fr:{ inter:'Interaction', max:'max', cost:'coût', score:'Score', finished:'Recrutement terminé.', newNext:'Nouveau candidat au prochain tour.', send:'Envoyer', placeholder:'Argumente pour recruter…' },
    en:{ inter:'Interaction', max:'max', cost:'cost', score:'Score', finished:'Recruitment over.', newNext:'New candidate next turn.', send:'Send', placeholder:'Make your pitch…' },
  }[lang];

  const spriteImg = npc?.sprite ? `<img src="${npc.sprite}" style="height:48px;vertical-align:middle;margin-right:8px;">` : '';
  const traits   = (npc?.personality||[]).join(', ');
  const pkmnFR   = (npc?.possible_pokemon||[]).join(', ');
  const phrase   = (npc?.catch_phrases||['...'])[0];
  const stepsLeft = RECRUIT_MAX_INTERACTIONS - (r.interactions||0);

  // Barre de progression des interactions
  const stepBar = [1,2,3].map(i =>
    `<span style="display:inline-block;width:18px;height:18px;border-radius:50%;margin:0 3px;
      background:${i <= (r.interactions||0) ? '#ffcc5a' : '#4b3e83'};
      border:2px solid ${i <= (r.interactions||0) ? '#ffcc5a' : '#4b3e83'}"></span>`
  ).join('');

  const recruitCandidateEl = document.getElementById('recruitCandidate');
  if (!recruitCandidateEl) return;

  if (r.finished) {
    recruitCandidateEl.innerHTML = `<div class="card"><em>${T.finished}<br>${T.newNext}</em></div>`;
  } else {
    recruitCandidateEl.innerHTML = `
      <div class="card" style="display:flex;align-items:center;gap:8px;">
        ${spriteImg}
        <div style="flex:1">
          <strong>${r.candidateName}</strong> — ${r.candidateRole}<br>
          <small>Traits : ${traits}</small><br>
          <small>Pokémon : ${pkmnFR}</small><br>
          <small style="color:rgba(255,255,255,.5)">"${phrase}"</small><br>
          <div style="margin-top:6px">${stepBar}
            <span style="font-size:.65em;color:var(--muted);margin-left:6px">
              ${r.interactions}/${RECRUIT_MAX_INTERACTIONS} — ${RECRUIT_COST_PER_STEP}₽/${T.cost}
            </span>
          </div>
          ${!r.finished && stepsLeft>0
            ? `<small style="color:var(--accent)">${lang==='fr'?'Reste':'Remaining'} : ${stepsLeft} — Total : ${stepsLeft*RECRUIT_COST_PER_STEP}₽</small>`
            : ''}
        </div>
      </div>`;
  }

  const transcriptEl = document.getElementById('recruitTranscript');
  if (transcriptEl) {
    transcriptEl.innerHTML = r.transcript.length
      ? r.transcript.map(line => `<div class="logline">${line}</div>`).join('')
      : `<div class="log">${lang==='fr'?'Démarre une discussion.':'Start a conversation.'}</div>`;
  }

  // Mise à jour placeholder
  const inp = document.getElementById('recruitMessage');
  if (inp) inp.placeholder = T.placeholder;
  const btn = document.getElementById('sendRecruitBtn');
  if (btn) btn.textContent = T.send;
}
