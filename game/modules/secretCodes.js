/**
 * Secret codes module extracted from app.js
 *
 * This module contains all of the logic related to redeemable
 * secret codes and their associated rewards.  It was originally
 * defined inline in `app.js`, but has been moved here to make
 * the codebase easier to navigate and maintain.  The functions
 * defined here reference a handful of global variables (such as
 * `state`, `TITLES`, `notify`, etc.) which are expected to be
 * available on the `window` object at runtime.  When this module
 * is imported, it will attach its public APIs to the `window`
 * object so that existing code can continue to call them without
 * modifications.
 */

// Helper: generates a function used to unlock a title.  The
// surrounding game state and constants are accessed off of
// `window` so that this module does not need to import anything
// explicitly.  When the returned function is invoked, it will
// award the specified title to the player, update the save, and
// refresh any relevant UI.
const _mkTitleExec = (titleId) => (claim) => {
  const state = window.state;
  if (!state.unlockedTitles) state.unlockedTitles = [];
  if (state.unlockedTitles.includes(titleId)) {
    window.notify('Ce titre est déjà débloqué !', 'error');
    return;
  }
  const t = (window.TITLES || []).find(x => x.id === titleId);
  state.unlockedTitles.push(titleId);
  // Sync with purchases (for titles purchasable in the shop)
  state.purchases = state.purchases || {};
  state.purchases[`title_${titleId}`] = true;
  claim();
  if (typeof window.saveState === 'function') window.saveState();
  window.notify(`🏆 Titre débloqué : "${t?.label || titleId}" !`, 'gold');
  if (typeof window.renderGangTab === 'function' && window.activeTab === 'tabGang') window.renderGangTab();
  if (typeof window.renderCosmeticsTab === 'function' && window.activeTab === 'tabCosmetics') window.renderCosmeticsTab();
};

// Definition of all supported secret codes.  Each entry defines
// the key used to look up the code, presentation strings, and
// an `exec` function that grants the reward.  These functions
// reference the global `state` and helper functions on the
// `window` object (such as `makePokemon` and `pokeSprite`).  See
// the original `app.js` for additional context.
const SECRET_CODES = {
  'MERCIDAVOIRJOUEMONJEU': {
    key: 'code_missingno',
    cooldownMs: 60 * 60 * 1000,
    label: '👾 MissingNo',
    exec: (claim) => {
      const state = window.state;
      const existing = state.pokemons.find(p => p.species_en === 'missingno');
      if (existing) { window.notify('Tu possèdes déjà MissingNo !', 'error'); return; }
      const p = window.makePokemon('missingno', 'secret', 'pokeball');
      p.potential = 5;
      p.level = 1;
      p.shiny = Math.random() < 0.5;
      p.noSell = true;
      state.pokemons.push(p);
      if (!state.pokedex['missingno']) state.pokedex['missingno'] = {};
      state.pokedex['missingno'].caught = true;
      state.pokedex['missingno'].count = 1;
      claim();
      if (typeof window.saveState === 'function') window.saveState();
      window.notify('👾 MissingNo a rejoint ton PC ! Le tissu du jeu tremble…', 'gold');
      // Reset PC render key so the new Pokémon appears immediately
      if (typeof window._pcLastRenderKey !== 'undefined') window._pcLastRenderKey = '';
      if (typeof window.renderPokemonGrid === 'function') window.renderPokemonGrid(true);
    }
  },
  'POKEGANGSTARTER': {
    key: 'code_starter',
    oneTime: true,
    label: '🌟 Starter surprise',
    exec: (claim) => {
      const starters = ['bulbasaur','charmander','squirtle'];
      const choices = starters.map(sp => {
        const shiny = Math.random() < 0.5;
        const spDef = (window.POKEMON_GEN1 || []).find(s => s.en === sp);
        return {
          emoji: `<img src="${window.pokeSprite(sp, shiny)}" style="width:56px;height:56px;image-rendering:pixelated${shiny ? ';filter:drop-shadow(0 0 6px gold)' : ''}">`,
          label: (shiny ? '✨ ' : '') + ((spDef && spDef.fr) || sp),
          sublabel: 'Lv.1',
          onPick: () => {
            const p = window.makePokemon(sp, 'reward', 'pokeball');
            p.level = 1;
            p.shiny = shiny;
            p.potential = Math.random() < 0.2 ? 2 : 1;
            window.state.pokemons.push(p);
            claim();
            if (typeof window.saveState === 'function') window.saveState();
            window.notify(`🎁 ${(spDef && spDef.fr) || sp}${shiny ? ' ✨' : ''} a rejoint ton PC !`, 'gold');
            if (typeof window._pcLastRenderKey !== 'undefined') window._pcLastRenderKey = '';
            if (typeof window.renderPokemonGrid === 'function') window.renderPokemonGrid(true);
          }
        };
      });
      window.showRewardChoicePopup('🎁 Choisis ton Starter !', 'Une seule chance — choisit bien.', choices);
    }
  },
  'POKEGANGBALLS': {
    key: 'code_balls',
    cooldownMs: 24 * 60 * 60 * 1000,
    label: '🎯 Pack de Balls',
    exec: (claim) => {
      const state = window.state;
      const packs = [
        { emoji: '🔴', label: '6× Poké Ball', sublabel: 'Bon départ', items: {pokeball:6} },
        { emoji: '🔵', label: '3× Super Ball', sublabel: 'Efficacité +', items: {greatball:3} },
        { emoji: '🟡', label: '1× Hyper Ball', sublabel: 'Pour les rares', items: {ultraball:1} },
      ];
      const choices = packs.map(pack => ({
        emoji: pack.emoji,
        label: pack.label,
        sublabel: pack.sublabel,
        onPick: () => {
          for (const [k, v] of Object.entries(pack.items)) state.inventory[k] = (state.inventory[k] || 0) + v;
          claim();
          if (typeof window.saveState === 'function') window.saveState();
          if (typeof window.updateTopBar === 'function') window.updateTopBar();
          window.notify(`🎁 ${pack.label} ajouté à ton inventaire !`, 'success');
        }
      }));
      window.showRewardChoicePopup('🎯 Choisis ton pack de Balls !', 'Recharger dans 24h.', choices);
    }
  },
  'POKEGANGPIKACHU': {
    key: 'code_pikachu',
    oneTime: true,
    label: '⚡ Pikachu spécial',
    exec: (claim) => {
      const shiny = Math.random() < 0.5;
      const opts = [
        { sp:'pikachu', bonus: 'ATK ×2', atk: 2 },
        { sp:'pikachu', bonus: 'VIT ×2', spd: 2 },
        { sp:'pikachu', bonus: 'Potentiel ★★★', pot: 3 },
      ];
      const choices = opts.map(opt => ({
        emoji: `<img src="${window.pokeSprite(opt.sp, shiny)}" style="width:56px;height:56px;image-rendering:pixelated${shiny ? ';filter:drop-shadow(0 0 6px gold)' : ''}">`,
        label: (shiny ? '✨ ' : '') + 'Pikachu',
        sublabel: opt.bonus,
        onPick: () => {
          const p = window.makePokemon('pikachu', 'reward', 'pokeball');
          p.level = 1;
          p.shiny = shiny;
          if (opt.atk) p.atk = Math.round((p.atk || 10) * opt.atk);
          if (opt.spd) p.spd = Math.round((p.spd || 10) * opt.spd);
          if (opt.pot) p.potential = opt.pot;
          window.state.pokemons.push(p);
          claim();
          if (typeof window.saveState === 'function') window.saveState();
          window.notify(`⚡ Pikachu${shiny ? ' ✨' : ''} — ${opt.bonus} — a rejoint ton PC !`, 'gold');
          if (typeof window._pcLastRenderKey !== 'undefined') window._pcLastRenderKey = '';
          if (typeof window.renderPokemonGrid === 'function') window.renderPokemonGrid(true);
        }
      }));
      window.showRewardChoicePopup('⚡ Choisis ton Pikachu !', 'Chaque version est unique.', choices);
    }
  },

  // Title codes (one-time, distributed manually)
  'R4PK2W7':  { key:'ct_apprenti',        oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('apprenti') },
  'B9XM3C6':  { key:'ct_chasseur',        oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('chasseur') },
  'T7GA5N2':  { key:'ct_agent',           oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('agent') },
  'Z3CP8K1':  { key:'ct_capo',            oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('capo') },
  'W6LT4M9':  { key:'ct_lieutenant',      oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('lieutenant') },
  'Q2BA7D5':  { key:'ct_boss_adj',        oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('boss_adj') },
  'K8BO3S4':  { key:'ct_boss',            oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('boss') },
  'Y5BR9N6':  { key:'ct_baron',           oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('baron') },
  'V1PR4N8':  { key:'ct_parrain',         oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('parrain') },
  'J9LD6G3':  { key:'ct_legende',         oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('legende') },
  'X4IT7C2':  { key:'ct_intouchable',     oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('intouchable') },
  'S6PY2M8':  { key:'ct_pyromane',        oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('pyromane') },
  'BF3SU7R5': { key:'ct_surfeur',         oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('surfeur') },
  'CW9BT4S1': { key:'ct_botaniste',       oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('botaniste') },
  'DQ7EL3C6': { key:'ct_electricien',     oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('electricien') },
  'HN4PS8Y2': { key:'ct_psy',             oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('psy') },
  'MK2SP6T9': { key:'ct_spectre',         oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('spectre') },
  'RJ5DL1N7': { key:'ct_dragon_lord',     oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('dragon_lord') },
  'AZ8VN3M4': { key:'ct_venimeux',        oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('venimeux') },
  'PF6CB9T3': { key:'ct_combattant',      oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('combattant') },
  'GT4CL7R2': { key:'ct_collectionneur',  oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('collectionneur') },
  'XB1GV5D8': { key:'ct_grand_vendeur',   oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('grand_vendeur') },
  'WC9GU3R6': { key:'ct_guerrier',        oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('guerrier') },
  'QM7CS4Y5': { key:'ct_chasseur_shiny',  oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('chasseur_shiny') },
  'ZH3RI8S2': { key:'ct_richissime',      oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('richissime') },
  'NK6GL9T4': { key:'ct_glitcheur',       oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('glitcheur') },
  'VD2PR5F8': { key:'ct_professeur',      oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('professeur') },
  'LR8MD3S1': { key:'ct_maitre_dresseur', oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('maitre_dresseur') },
  'FJ4TC7R6': { key:'ct_triade_chroma',   oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('triade_chroma') },
  'BW5SH2G9': { key:'ct_seigneur_chroma', oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('seigneur_chroma') },
  'YK3DC8R5': { key:'ct_dresseur_chroma', oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('dresseur_chroma') },

  // Exclusive titles
  'EP1C5AR7Y2': { key:'ct_early_backer',      oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('early_backer') },
  'MC9X4Z2W7K': { key:'ct_maitre_chronicles', oneTime:true, label:'🏆 Titre',  exec: _mkTitleExec('maitre_chronicles') },
};

/**
 * Validate and redeem a secret code.  If the code does not exist
 * in `SECRET_CODES`, returns false.  Otherwise executes the
 * associated reward function and returns true.  Cooldowns and
 * one‑time restrictions are enforced here.
 * @param {string} input Raw code entered by the player
 */
function checkSecretCode(input) {
  const code = input.trim().toUpperCase();
  const def = SECRET_CODES[code];
  if (!def) return false;
  const state = window.state;
  const now = Date.now();
  const lastUsed = state.claimedCodes?.[def.key];
  if (def.cooldownMs) {
    if (lastUsed && now - lastUsed < def.cooldownMs) {
      const remaining = Math.ceil((def.cooldownMs - (now - lastUsed)) / 60000);
      window.notify(`Code en recharge — ${remaining} min restante${remaining > 1 ? 's' : ''}.`, 'error');
      return true;
    }
  } else if (def.oneTime && lastUsed) {
    window.notify('Ce code a déjà été utilisé.', 'error');
    return true;
  }
  def.exec(() => {
    state.claimedCodes = state.claimedCodes || {};
    state.claimedCodes[def.key] = def.cooldownMs ? now : true;
  });
  return true;
}

/**
 * Display a modal allowing the user to pick from a list of reward
 * options.  Each entry in `choices` should define a label, an
 * optional sublabel, an emoji or HTML snippet, and an `onPick`
 * callback to execute when selected.  Only one choice can be
 * selected at a time and the overlay will close automatically.
 *
 * @param {string} title The heading displayed at the top of the popup
 * @param {string} subtitle Additional instructions shown below the title
 * @param {Array} choices Array of reward definitions
 */
function showRewardChoicePopup(title, subtitle, choices) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9800;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;padding:16px';
  const cardsHtml = choices.map((c, i) => `
    <div class="reward-choice-card" data-choice="${i}" style="cursor:pointer;background:var(--bg-panel);border:2px solid var(--border);border-radius:var(--radius);padding:16px 12px;display:flex;flex-direction:column;align-items:center;gap:8px;min-width:120px;max-width:160px;flex:1;transition:border-color .15s,transform .15s">
      <div style="font-size:40px;line-height:1">${c.emoji}</div>
      <div style="font-family:var(--font-pixel);font-size:9px;color:var(--text);text-align:center;line-height:1.4">${c.label}</div>
      ${c.sublabel ? `<div style="font-size:9px;color:var(--text-dim);text-align:center">${c.sublabel}</div>` : ''}
      <button style="margin-top:4px;font-family:var(--font-pixel);font-size:8px;padding:6px 12px;background:var(--red-dark);border:1px solid var(--red);border-radius:var(--radius-sm);color:var(--text);cursor:pointer">Choisir</button>
    </div>`).join('');
  overlay.innerHTML = `
    <div style="background:var(--bg-panel);border:2px solid var(--gold);border-radius:var(--radius);padding:24px;max-width:560px;width:100%;display:flex;flex-direction:column;gap:16px">
      <div style="font-family:var(--font-pixel);font-size:12px;color:var(--gold);text-align:center">${title}</div>
      ${subtitle ? `<div style="font-size:10px;color:var(--text-dim);text-align:center">${subtitle}</div>` : ''}
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${cardsHtml}</div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('.reward-choice-card').forEach(card => {
    card.addEventListener('mouseenter', () => { card.style.borderColor = 'var(--gold)'; card.style.transform = 'translateY(-3px)'; });
    card.addEventListener('mouseleave', () => { card.style.borderColor = 'var(--border)'; card.style.transform = ''; });
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.choice);
      overlay.remove();
      choices[idx].onPick();
    });
  });
}

// Expose the API on the global window so existing code continues to work
window._mkTitleExec = _mkTitleExec;
window.SECRET_CODES  = SECRET_CODES;
window.checkSecretCode = checkSecretCode;
window.showRewardChoicePopup = showRewardChoicePopup;

export { _mkTitleExec, SECRET_CODES, checkSecretCode, showRewardChoicePopup };