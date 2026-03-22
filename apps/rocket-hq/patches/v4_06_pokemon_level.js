
// ============================================================
// PATCH v4.06 — NIVEAUX POKÉMON + ÉVOLUTION + EVENTS SPÉCIAUX
// ============================================================

// Table d'évolution Gen1/Gen2 (niveau minimal + espèce FR cible)
const EVOLUTION_TABLE = {
  'abo':          { level:22, into_fr:'arbok',       into_en:'arbok' },
  'nosferapti':   { level:22, into_fr:'nosferalto',  into_en:'golbat' },
  'smogo':        { level:35, into_fr:'smogogo',     into_en:'weezing' },
  'voltorbe':     { level:30, into_fr:'électrode',   into_en:'electrode' },
  'fantominus':   { level:25, into_fr:'spectrum',    into_en:'haunter' },
  'magneti':      { level:30, into_fr:'magnéton',    into_en:'magneton' },
  'osselait':     { level:28, into_fr:'ossatueur',   into_en:'marowak' },
  'soporifik':    { level:26, into_fr:'hypnomade',   into_en:'hypno' },
  'miaouss':      { level:28, into_fr:'persian',     into_en:'persian' },
  'magicarpe':    { level:20, into_fr:'léviator',    into_en:'gyarados' },
  'ptitard':      { level:25, into_fr:'têtarte',     into_en:'poliwhirl' },
  'feuforêve':    { level:24, into_fr:'démolosse',   into_en:'houndoom' },
  'munja':        { level:1,  into_fr:'munja',       into_en:'murkrow' }, // pas d'évolution Gen2
  'farfuret':     { level:1,  into_fr:'farfuret',    into_en:'sneasel' },
  'abra':         { level:16, into_fr:'kadabra',     into_en:'kadabra' },
  'racaillou':    { level:25, into_fr:'gravalanch',  into_en:'graveler' },
  'héricendre':   { level:14, into_fr:'feurisson',   into_en:'quilava' },
  'germignon':    { level:16, into_fr:'macronium',   into_en:'bayleef' },
  'kaiminus':     { level:18, into_fr:'crocrodil',   into_en:'croconaw' },
};

// Événements spéciaux d'entraînement
const TRAINING_EVENTS = {
  fr: [
    { id:'ev_atk',  label:'Percée offensive !',   effect:{ stat:'atk',  delta:+5 }, positive:true },
    { id:'ev_def',  label:'Carapace renforcée !',  effect:{ stat:'def',  delta:+5 }, positive:true },
    { id:'ev_hp',   label:'Endurance décuplée !',  effect:{ stat:'hp',   delta:+10 }, positive:true },
    { id:'ev_fear', label:'Traumatisme de combat.', effect:{ stat:'accuracy', delta:-10 }, positive:false },
    { id:'ev_weak', label:'Blessure chronique.',   effect:{ stat:'hp',   delta:-5  }, positive:false },
  ],
  en: [
    { id:'ev_atk',  label:'Offensive breakthrough!', effect:{ stat:'atk',  delta:+5 }, positive:true },
    { id:'ev_def',  label:'Reinforced shell!',        effect:{ stat:'def',  delta:+5 }, positive:true },
    { id:'ev_hp',   label:'Increased endurance!',     effect:{ stat:'hp',   delta:+10 }, positive:true },
    { id:'ev_fear', label:'Battle trauma.',           effect:{ stat:'accuracy', delta:-10 }, positive:false },
    { id:'ev_weak', label:'Chronic injury.',          effect:{ stat:'hp',   delta:-5  }, positive:false },
  ],
};

function grantPokemonXP(pkm, xp) {
  if (!pkm) return;
  pkm.xp    = (pkm.xp||0) + xp;
  // Chaque tranche de 30 XP = +1 niveau
  const newLevel = 1 + Math.floor(pkm.xp / 30);
  if (newLevel > (pkm.level||1)) {
    pkm.level = newLevel;
    addLog(`⬆ ${pkm.species_fr||pkm.species_en} ${lang==='fr'?'passe':'reached'} Nv.${pkm.level} !`);
  }
}

function checkEvolution(pkm) {
  const key = (pkm.species_fr||'').toLowerCase();
  const evo = EVOLUTION_TABLE[key];
  if (!evo) return false;
  if (evo.level <= 1) return false; // pas d'évolution
  if ((pkm.level||1) < evo.level) return false;
  if (pkm.evolved) return false; // déjà évolué une fois

  // Évolution !
  const oldName = pkm.species_fr;
  pkm.species_fr = evo.into_fr;
  pkm.species_en = evo.into_en;
  pkm.evolved    = true;
  updatePokedex(evo.into_fr);
  addLog(`✨ ${oldName} a évolué en ${evo.into_fr} !`);
  return true;
}

function rollTrainingEvent(salle) {
  const eventChance = 0.05 + 0.03 * (salle.level||1);
  if (Math.random() > eventChance) return null;
  const events = TRAINING_EVENTS[lang] || TRAINING_EVENTS.fr;
  return pick(events);
}

function applyTrainingEvent(pkm, event) {
  if (!pkm || !event) return;
  if (!pkm.bonuses) pkm.bonuses = {};
  pkm.bonuses[event.effect.stat] = (pkm.bonuses[event.effect.stat]||0) + event.effect.delta;
  const sign = event.effect.delta > 0 ? '+' : '';
  addLog(`⚡ [Événement] ${pkm.species_fr||pkm.species_en} : ${event.label} (${sign}${event.effect.delta} ${event.effect.stat})`);
}
