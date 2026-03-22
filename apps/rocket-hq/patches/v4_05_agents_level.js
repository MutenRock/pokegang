
// ============================================================
// PATCH v4.05 — NIVEAUX AGENTS + COOLDOWN
// ============================================================

const AGENT_XP_THRESHOLDS = [0, 50, 120, 250, 500]; // index = level-1

function grantAgentXP(agent, xp) {
  if (!agent) return;
  agent.xp = (agent.xp||0) + xp;
  const prevLevel = agent.level || 1;
  // Calcul du nouveau level
  let newLevel = 1;
  for (let i = AGENT_XP_THRESHOLDS.length-1; i>=0; i--) {
    if (agent.xp >= AGENT_XP_THRESHOLDS[i]) { newLevel = i+1; break; }
  }
  agent.level = newLevel;
  if (newLevel > prevLevel) {
    addLog(`⬆ ${agent.name} ${lang==='fr'?'passe au niveau':'reached level'} ${newLevel} !`);
  }
}

function agentMissionSuccessRate(agent) {
  const lvlBonus  = (agent?.level||1) * 5;
  const repBonus  = (state.reputation||0) * 0.6;
  return Math.min(90, 35 + lvlBonus + repBonus);
}

function renderAgentsV2() {
  const el = document.getElementById('agentsList');
  if (!el) return;
  const T = {
    fr:{ cd:'Repos', turns:'tour(s)', noTeam:'Aucune équipe', mission:'en mission', trait:'Bourreau de travail', xpTo:'XP suivant niveau' },
    en:{ cd:'Rest',  turns:'turn(s)', noTeam:'No team',       mission:'on mission', trait:'Workaholic',          xpTo:'XP to next level' },
  }[lang];

  el.innerHTML = state.agents.map(a => {
    const enMission = (state.missions||[]).some(mi => mi.agentId === a.id);
    const inCooldown = (a.cooldown||0) > 0;
    const sprite = a.sprite ? `<img src="${a.sprite}" style="height:36px;vertical-align:middle;margin-right:6px;">` : '';
    const traits  = (a.personality||[]).join(', ');
    const isBourreau = (a.traits||[]).includes('bourreau_de_travail');

    // Barre XP
    const currThreshold = AGENT_XP_THRESHOLDS[(a.level||1)-1] || 0;
    const nextThreshold = AGENT_XP_THRESHOLDS[a.level]  || AGENT_XP_THRESHOLDS[AGENT_XP_THRESHOLDS.length-1];
    const xpProgress = nextThreshold > currThreshold
      ? Math.min(100, Math.round(((a.xp||0)-currThreshold)/(nextThreshold-currThreshold)*100))
      : 100;

    return `<div class="card">
      ${sprite}
      <strong>${a.name}</strong> — ${a.rank}
      <span style="font-size:.7em;color:var(--accent);margin-left:6px">Nv.${a.level||1}</span>
      ${enMission ? `<span style="color:#e53;font-size:.7em"> [${T.mission}]</span>` : ''}
      ${inCooldown ? `<span style="color:#7060a8;font-size:.7em"> [${T.cd} ${a.cooldown} ${T.turns}]</span>` : ''}
      <div style="font-size:.68em;color:var(--muted);margin-top:2px">${traits}</div>
      ${isBourreau ? `<div style="font-size:.62em;color:var(--ok)">★ ${T.trait}</div>` : ''}
      <div style="margin-top:4px">
        <div style="font-size:.6em;color:var(--muted)">${T.xpTo} : ${(a.xp||0)}/${nextThreshold} XP</div>
        <div class="rep-bar" style="margin-top:3px">
          <div class="rep-fill" style="width:${xpProgress}%;background:var(--line)"></div>
        </div>
      </div>
    </div>`;
  }).join('');
}
