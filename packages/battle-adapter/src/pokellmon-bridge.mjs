/**
 * Lightweight bridge for Pokeforge v1 (mode A):
 * - Pokeforge core remains a management sim.
 * - Battle sandbox can call external services (Showdown/PokeLLMon) when needed.
 */

export function buildBattleRequest({ missionId, attacker, defender, doctrine }) {
  return {
    missionId,
    doctrine: doctrine || 'balanced',
    attacker,
    defender,
    timestamp: new Date().toISOString()
  };
}

export async function resolveBattleViaSandbox({ endpoint, payload }) {
  if (!endpoint) {
    throw new Error('resolveBattleViaSandbox requires an endpoint URL.');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Battle sandbox failed with HTTP ${response.status}: ${body}`);
  }

  return response.json();
}

export function fallbackDeterministicResolution({ attacker, defender }) {
  const attackPower = (attacker?.score || 0) + (attacker?.discipline || 0);
  const defensePower = (defender?.score || 0) + (defender?.discipline || 0);
  const winner = attackPower >= defensePower ? 'attacker' : 'defender';

  return {
    winner,
    attackPower,
    defensePower,
    source: 'deterministic-fallback'
  };
}
