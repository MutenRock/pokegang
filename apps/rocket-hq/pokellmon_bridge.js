// ============================================================
// POKELLMON BRIDGE — SIDE SCRIPT (MIS DE CÔTÉ — v5 candidat)
// Ne pas inclure dans app.js pour l'instant
// Activer en ajoutant : <script src="pokellmon_bridge.js"></script>
// avant app.js dans index.html
// ============================================================
//
// PokéLLMon est un agent IA de combat pour Pokémon Showdown.
// Dans Rocket HQ, ce bridge remplacerait le calcul probabiliste
// de résolution de mission par une vraie séquence de combat IA.
//
// Cas d'usage v5 :
//   - Mode "Duel" interactif (joueur vs IA, tour par tour)
//   - Résolution de mission haute priorité via LLM combat
//   - Boss fights (Red, Giovanni PVP) avec stratégie IA
//
// Dépendances :
//   - Ollama local (http://localhost:11434)
//   - Serveur PokéLLMon bridge (http://localhost:8081)
//   - Modèle recommandé : mistral, llama3, deepseek-r1
//
// ============================================================

const POKELLMON_BASE = 'http://localhost:8081';

// Vérifie si PokéLLMon bridge est disponible
async function checkPokellmon() {
  try {
    const r = await fetch(`${POKELLMON_BASE}/health`, { signal: AbortSignal.timeout(2000) });
    return r.ok;
  } catch { return false; }
}

// Soumet un état de combat à PokéLLMon et récupère le move choisi
// combatState = { myTeam:[], opponentTeam:[], myActive:{}, opponentActive:{}, availableMoves:[] }
async function pokellmonChooseMove(combatState) {
  try {
    const res = await fetch(`${POKELLMON_BASE}/api/pokellmon/choose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: settings.model || 'mistral',
        state: combatState,
        lang,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.move || null; // { name, type, power, accuracy }
  } catch(e) {
    console.warn('[PokéLLMon] Bridge unavailable:', e.message);
    return null; // fallback : calcul probabiliste classique
  }
}

// Résout un combat complet via PokéLLMon (plusieurs tours)
// Retourne { winner:'player'|'opponent', turns:[], summary:'' }
async function pokellmonResolveCombat(myTeam, opponentTeam) {
  const available = await checkPokellmon();
  if (!available) {
    // Fallback classique
    const success = Math.random() < 0.5 + (state.reputation || 0) * 0.004;
    return { winner: success ? 'player' : 'opponent', turns: [], summary: 'Résolution probabiliste (PokéLLMon indisponible)' };
  }

  const turns = [];
  let myActive  = myTeam[0];
  let oppActive = opponentTeam[0];

  for (let i = 0; i < 10; i++) { // max 10 tours
    const combatState = {
      myTeam, opponentTeam,
      myActive, opponentActive: oppActive,
      availableMoves: myActive.moves || ['Charge', 'Rugissement'],
    };

    const move = await pokellmonChooseMove(combatState);
    if (!move) break;

    // Calcul dégâts simplifié (à enrichir en v5)
    const dmg = move.power ? Math.floor((move.power / 100) * (myActive.atk || 50)) : 0;
    oppActive.currentHp = (oppActive.currentHp ?? oppActive.hp ?? 100) - dmg;

    turns.push({
      turn: i + 1,
      actor: myActive.species_fr || myActive.name,
      move: move.name,
      damage: dmg,
      oppHp: Math.max(0, oppActive.currentHp),
    });

    if (oppActive.currentHp <= 0) {
      return { winner: 'player', turns, summary: `Victoire en ${i+1} tours via PokéLLMon.` };
    }

    // Tour adverse (simple)
    const oppDmg = Math.floor(Math.random() * 30 + 10);
    myActive.currentHp = (myActive.currentHp ?? myActive.hp ?? 100) - oppDmg;
    if (myActive.currentHp <= 0) {
      return { winner: 'opponent', turns, summary: `Défaite au tour ${i+1}.` };
    }
  }
  return { winner: 'player', turns, summary: 'Résolution par dépassement de tours.' };
}

// Hook d'intégration (à appeler dans resolveMissionV2 si bridge dispo)
// Remplace le calcul de succès probabiliste pour les missions "élevé"
async function pokellmonMissionHook(missionDef, agent) {
  if (missionDef.risque !== 'élevé') return null; // uniquement pour les missions difficiles
  const myTeam = (agent.team || []).map(id => state.pokemons.find(p => p.id === id)).filter(Boolean);
  if (!myTeam.length) return null;

  const opponentPool = ['arcanine', 'machamp', 'gyarados', 'alakazam'];
  const opponentTeam = [{ species_fr: pick(opponentPool), hp: 120, atk: 70, moves: ['Tranche', 'Jackpot'] }];

  const result = await pokellmonResolveCombat(myTeam, opponentTeam);
  addLog(`[PokéLLMon] ${result.summary}`);
  return result.winner === 'player'; // true = succès mission
}

console.info('[PokéLLMon Bridge] Loaded (side script — not active in v4)');
