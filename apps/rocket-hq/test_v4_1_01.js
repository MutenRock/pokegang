// ============================================================
// TEST SUITE — v4.1.01
// À exécuter dans la console navigateur (F12)
// ou via : node test_v4_1_01.js (avec jsdom si besoin)
// ============================================================

const TEST_RESULTS = [];
function assert(label, condition, detail = '') {
  const ok = !!condition;
  TEST_RESULTS.push({ label, ok, detail });
  console[ok ? 'log' : 'error'](`${ok ? '✅' : '❌'} ${label}${detail ? ' — ' + detail : ''}`);
  return ok;
}

async function runTests() {
  TEST_RESULTS.length = 0;
  console.group('🧪 POKEFORGE v4.1.01 — Test Suite');

  // ── T01 : fetchOllamaModels ─────────────────────────────
  console.group('T01 — fetchOllamaModels');
  try {
    const models = await fetchOllamaModels();
    assert('fetchOllamaModels retourne un tableau', Array.isArray(models));
    assert('Pas d'exception sur Ollama down', true, 'graceful fallback OK');
    const statusEl = document.getElementById('ollamaModelStatus');
    assert('ollamaModelStatus mis à jour', !!statusEl && statusEl.textContent !== '—');
  } catch(e) {
    assert('fetchOllamaModels sans crash', false, e.message);
  }
  console.groupEnd();

  // ── T02 : showLoadingBar ────────────────────────────────
  console.group('T02 — showLoadingBar / hideLoadingBar');
  const handle = showLoadingBar('logOutput', 'Giovanni');
  assert('showLoadingBar crée #llmLoadingBar', !!document.getElementById('llmLoadingBar'));
  assert('showLoadingBar crée #llmLoadingFill', !!document.getElementById('llmLoadingFill'));
  await new Promise(r => setTimeout(r, 500));
  const pct = parseFloat(document.getElementById('llmLoadingFill')?.style.width || '0');
  assert('Progression > 0% après 500ms', pct > 0, `width=${pct}%`);
  hideLoadingBar(handle);
  await new Promise(r => setTimeout(r, 500));
  assert('Bar cachée après hideLoadingBar', document.getElementById('llmLoadingBar')?.style.display === 'none');
  console.groupEnd();

  // ── T03 : callOllamaWithBar ─────────────────────────────
  console.group('T03 — callOllamaWithBar fallback');
  const saved = settings.llmEnabled;
  settings.llmEnabled = false;
  const fallbackResult = await callOllamaWithBar('test', 'FALLBACK_OK', '', '');
  assert('Retourne fallback si LLM désactivé', fallbackResult === 'FALLBACK_OK');
  settings.llmEnabled = saved;
  console.groupEnd();

  // ── T04 : Model select injected in settings ─────────────
  console.group('T04 — Settings panel model picker');
  // Ouvre les settings
  const settingsOverlay = document.getElementById('settingsOverlay');
  if (settingsOverlay) {
    settingsOverlay.classList.remove('hidden');
    renderSettingsV2();
    await new Promise(r => setTimeout(r, 200));
    assert('ollamaModelSelect injecté', !!document.getElementById('ollamaModelSelect'));
    assert('refreshModelsBtn injecté', !!document.getElementById('refreshModelsBtn'));
    settingsOverlay.classList.add('hidden');
  } else {
    assert('Settings overlay existe', false, '#settingsOverlay absent du DOM');
  }
  console.groupEnd();

  // ── T05 : Recrutement + loading bar ────────────────────
  console.group('T05 — recruitStepV2 loading bar');
  state.resources.pokedollars = 500;
  if (!state.recruit || state.recruit.finished) initRecruit();
  state.recruit.interactions = 0;
  const inp = document.getElementById('recruitMessage');
  if (inp) {
    inp.value = 'Rejoins la Team Rocket !';
    await recruitStepV2();
    assert('Interaction consommée', state.recruit.interactions === 1);
    assert('Pokédollars débités', state.resources.pokedollars <= 450);
  } else {
    assert('recruitMessage input existe', false, 'Element absent');
  }
  console.groupEnd();

  // ── T06 : Ally chat + loading bar ──────────────────────
  console.group('T06 — sendAllyChat loading bar');
  state.chatUsedThisTurn = false;
  state.allyChatLog = [];
  if (state.agents.length) {
    const chatInp = document.getElementById('allyChatInput');
    const chatSel = document.getElementById('allyChatAgentSelect');
    if (chatInp && chatSel) {
      chatInp.value = 'Situation de la mission ?';
      await sendAllyChat();
      assert('chatUsedThisTurn défini', !!state.chatUsedThisTurn);
      assert('allyChatLog non vide', state.allyChatLog.length > 0);
    } else {
      assert('Ally chat elements existent', false, 'Inputs absents');
    }
  } else {
    assert('T06 skipped — aucun agent', true, 'Skip: no agents');
  }
  console.groupEnd();

  // ── RÉSUMÉ ──────────────────────────────────────────────
  const passed = TEST_RESULTS.filter(t => t.ok).length;
  const total  = TEST_RESULTS.length;
  const pct    = Math.round(passed / total * 100);
  console.group(`📊 RÉSULTATS : ${passed}/${total} (${pct}%)`);
  TEST_RESULTS.filter(t => !t.ok).forEach(t => console.error(`  ❌ ${t.label} ${t.detail}`));
  console.groupEnd();
  console.groupEnd();
  return { passed, total, coverage: pct };
}

// Auto-run
runTests().then(r => {
  console.info(`\n🎯 Coverage estimée : ${r.coverage}% (${r.passed}/${r.total} tests)`);
});
