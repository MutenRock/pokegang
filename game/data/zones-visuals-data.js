/* Zone background and cosmetic background data. Extracted from app.js for progressive refactoring. */

const ZONE_BGS = {
  // ── Routes & nature ──────────────────────────────────────────
  route1:           { url:`${SD_BG}meadow.png`,         fb:'#1a3a0a,#0d2008' },
  viridian_forest:  { url:`${SD_BG}forest.png`,         fb:'#0a2a08,#041504' },
  route22:          { url:`${SD_BG}meadow.png`,          fb:'#1a2808,#101a04' },
  pallet_garden:    { url:`${SD_BG}meadow.png`,          fb:'#0a2a04,#061802' },
  // ── Cavernes ─────────────────────────────────────────────────
  mt_moon:          { url:`${SD_BG}mountain.png`,       fb:'#12123a,#07073a' },
  diglett_cave:     { url:`${SD_BG}mountain.png`,        fb:'#2a1204,#180a02' },
  rock_tunnel:      { url:`${SD_BG}mountain.png`,        fb:'#1a1410,#0a0a08' },
  victory_road:     { url:`${SD_BG}mountain.png`,       fb:'#2a1208,#180a06' },
  unknown_cave:     { url:`${SD_BG}mountain.png`,        fb:'#100820,#080012' },
  // ── Zones urbaines ───────────────────────────────────────────
  power_plant:      { url:`${SD_BG}city.png`,           fb:'#2a2008,#1a1400' },
  silph_co:         { url:`${SD_BG}city.png`,             fb:'#08101a,#040810' },
  // ── Zones spectrales / sombres ────────────────────────────────
  pokemon_tower:    { url:`${SD_BG}city.png`,            fb:'#0d0020,#06000f' },
  lavender_town:    { url:`${SD_BG}city.png`,            fb:'#160030,#0a0020' },
  pokemon_mansion:  { url:`${SD_BG}city.png`,            fb:'#200408,#140204' },
  // ── Mer / côte ────────────────────────────────────────────────
  seafoam_islands:  { url:`${SD_BG}deepsea.png`,        fb:'#082a3a,#041a2a' },
  ss_anne:          { url:`${SD_BG}beach.png`,           fb:'#082038,#041428' },
  // ── Montagne alta ────────────────────────────────────────────
  mt_silver:        { url:`${SD_BG}mountain.png`,        fb:'#0a0a20,#040414' },
  // ── Arènes ───────────────────────────────────────────────────
  pewter_gym:       { url:`${SD_BG}mountain.png`,        fb:'#2a1a08,#1a0e04' },
  cerulean_gym:     { url:`${SD_BG}beach.png`,           fb:'#081a3a,#041228' },
  celadon_gym:      { url:`${SD_BG}forest.png`,          fb:'#0a2a08,#042008' },
  fuchsia_gym:      { url:`${SD_BG}river.png`,           fb:'#280828,#180418' },
  saffron_gym:      { url:`${SD_BG}city.png`,            fb:'#181830,#0c0c22' },
  cinnabar_gym:     { url:`${SD_BG}desert.png`,          fb:'#3a0808,#280404' },
  indigo_plateau:   { url:`${SD_BG}mountain.png`,        fb:'#1a1a2a,#0c0c1c' },
  // ── Lieux spéciaux ───────────────────────────────────────────
  safari_zone:      { url:`${SD_BG}meadow.png`,          fb:'#082008,#041204' },
  celadon_casino:   { url:`${SD_BG}city.png`,            fb:'#1a0030,#100020' },
};

const COSMETIC_BGS = {
  // ── Fonds d'écran photo (CDN Showdown) ───────────────────────
  meadow:        { fr:'Prairie',       cost:5000,  url:`${SD_BG}meadow.png`,   type:'image' },
  forest:        { fr:'Forêt',         cost:8000,  url:`${SD_BG}forest.png`,   type:'image' },
  mountain:      { fr:'Montagne',      cost:10000, url:`${SD_BG}mountain.png`, type:'image' },
  beach:         { fr:'Plage',         cost:8000,  url:`${SD_BG}beach.png`,    type:'image' },
  river:         { fr:'Rivière',       cost:6000,  url:`${SD_BG}river.png`,    type:'image' },
  city:          { fr:'Ville',         cost:12000, url:`${SD_BG}city.png`,     type:'image' },
  desert:        { fr:'Désert',        cost:10000, url:`${SD_BG}desert.png`,   type:'image' },
  deepsea:       { fr:'Fond Marin',    cost:20000, url:`${SD_BG}deepsea.png`,  type:'image' },
  // ── Thèmes couleur (dégradés CSS) ────────────────────────────
  theme_red:     { fr:'Rouge Sang',    cost:2000,  gradient:'linear-gradient(145deg,#160000 0%,#2e0808 50%,#0a0000 100%)', type:'gradient' },
  theme_blue:    { fr:'Bleu Glacé',    cost:2000,  gradient:'linear-gradient(145deg,#000c1a 0%,#081a30 50%,#000810 100%)', type:'gradient' },
  theme_purple:  { fr:'Nuit Violette', cost:2000,  gradient:'linear-gradient(145deg,#0c0018 0%,#1a0830 50%,#060010 100%)', type:'gradient' },
  theme_green:   { fr:'Vert Toxik',    cost:2000,  gradient:'linear-gradient(145deg,#001400 0%,#0a2010 50%,#000a00 100%)', type:'gradient' },
  theme_gold:    { fr:'Doré',          cost:4000,  gradient:'linear-gradient(145deg,#1a1000 0%,#2e2000 50%,#0a0800 100%)', type:'gradient' },
  theme_sunset:  { fr:'Coucher Soleil',cost:4000,  gradient:'linear-gradient(145deg,#1a0800 0%,#2e1000 40%,#180016 100%)', type:'gradient' },
  theme_midnight:{ fr:'Minuit',        cost:3000,  gradient:'linear-gradient(145deg,#020204 0%,#060610 50%,#000004 100%)', type:'gradient' },
};

// Sequential gym unlock order
const GYM_ORDER = ['pewter_gym','cerulean_gym','celadon_gym','fuchsia_gym','saffron_gym','cinnabar_gym','indigo_plateau'];

// → Moved to data/zones-data.js
// Applique le mapping aux objets de zone
Object.entries(ZONE_MUSIC_MAP).forEach(([id, track]) => {
  if (ZONE_BY_ID[id]) ZONE_BY_ID[id].music = track;
});

// ── Missions System ──────────────────────────────────────────
const MISSIONS = [
  // --- Daily missions ---
  { id:'catch_5',       type:'daily', fr:'Attraper 5 Pokémon',         en:'Catch 5 Pokémon',
    stat:'totalCaught',  target:5,  reward:{ money:500 },  icon:'🎯' },
  { id:'catch_20',      type:'daily', fr:'Attraper 20 Pokémon',        en:'Catch 20 Pokémon',
    stat:'totalCaught',  target:20, reward:{ money:2000 }, icon:'🎯' },
  { id:'win_3_fights',  type:'daily', fr:'Gagner 3 combats',           en:'Win 3 fights',
    stat:'totalFightsWon',target:3, reward:{ money:1000, rep:5 }, icon:'⚔️' },
  { id:'win_10_fights', type:'daily', fr:'Gagner 10 combats',          en:'Win 10 fights',
    stat:'totalFightsWon',target:10,reward:{ money:3000, rep:10 },icon:'⚔️' },
  { id:'earn_5000',     type:'daily', fr:'Gagner 5 000₽',              en:'Earn 5,000₽',
    stat:'totalMoneyEarned',target:5000, reward:{ money:1500 },   icon:'💰' },
  { id:'open_3_chests', type:'daily', fr:'Ouvrir 3 coffres',           en:'Open 3 chests',
    stat:'chestsOpened', target:3,  reward:{ money:800 },  icon:'📦' },
  { id:'sell_5',        type:'daily', fr:'Vendre 5 Pokémon',           en:'Sell 5 Pokémon',
    stat:'totalSold',    target:5,  reward:{ money:1000 }, icon:'💱' },
  // --- Weekly missions ---
  { id:'catch_100',     type:'weekly',fr:'Attraper 100 Pokémon',       en:'Catch 100 Pokémon',
    stat:'totalCaught',  target:100,reward:{ money:10000, rep:20 },icon:'🏅' },
  { id:'win_50_fights', type:'weekly',fr:'Gagner 50 combats',          en:'Win 50 fights',
    stat:'totalFightsWon',target:50,reward:{ money:15000, rep:30 },icon:'🏅' },
  { id:'earn_50000',    type:'weekly',fr:'Gagner 50 000₽',             en:'Earn 50,000₽',
    stat:'totalMoneyEarned',target:50000,reward:{money:10000,rep:15},icon:'🏅'},
  { id:'open_20_chests',type:'weekly',fr:'Ouvrir 20 coffres',          en:'Open 20 chests',
    stat:'chestsOpened', target:20, reward:{ money:5000 }, icon:'🏅' },
  { id:'catch_shiny',   type:'weekly',fr:'Capturer un Shiny',          en:'Catch a Shiny',
    stat:'shinyCaught',  target:1,  reward:{ money:8000, rep:10 }, icon:'✨' },
  { id:'defeat_10_rockets',type:'weekly',fr:'Vaincre 10 Rockets',      en:'Defeat 10 Rockets',
    stat:'rocketDefeated',target:10,reward:{ money:8000, rep:25 }, icon:'🚀' },
  { id:'complete_events',type:'weekly',fr:'Compléter 5 événements',    en:'Complete 5 events',
    stat:'eventsCompleted',target:5,reward:{ money:5000, rep:15 }, icon:'🎪' },
  // --- Story missions (one-time, permanent) ---
  { id:'story_first_catch',type:'story',fr:'Premier Pokémon !',        en:'First Pokémon!',
    stat:'totalCaught',  target:1,  reward:{ money:500 },  icon:'📜',
    desc_fr:'Capturez votre tout premier Pokémon.',
    desc_en:'Catch your very first Pokémon.' },
  { id:'story_10_catch', type:'story',fr:'Collectionneur Débutant',    en:'Beginner Collector',
    stat:'totalCaught',  target:10, reward:{ money:2000, rep:5 }, icon:'📜',
    desc_fr:'Remplissez votre PC avec 10 Pokémon.',
    desc_en:'Fill your PC with 10 Pokémon.' },
  { id:'story_50_catch', type:'story',fr:'Dresseur Confirmé',          en:'Seasoned Trainer',
    stat:'totalCaught',  target:50, reward:{ money:5000, rep:15 },icon:'📜',
    desc_fr:'50 Pokémon capturés ! Le Prof. Chen est impressionné.',
    desc_en:'50 Pokémon caught! Prof. Oak is impressed.' },
  { id:'story_first_fight',type:'story',fr:'Premier Combat',           en:'First Fight',
    stat:'totalFightsWon',target:1, reward:{ money:500 },  icon:'📜',
    desc_fr:'Remportez votre premier combat de dresseur.',
    desc_en:'Win your first trainer battle.' },
  { id:'story_beat_10',  type:'story',fr:'Combattant Aguerri',         en:'Seasoned Fighter',
    stat:'totalFightsWon',target:10,reward:{ money:3000, rep:10 },icon:'📜',
    desc_fr:'10 victoires ! Votre gang se fait respecter.',
    desc_en:'10 victories! Your gang earns respect.' },
  { id:'story_beat_50',  type:'story',fr:'Terreur de Kanto',           en:'Terror of Kanto',
    stat:'totalFightsWon',target:50,reward:{ money:10000,rep:25 },icon:'📜',
    desc_fr:'50 dresseurs vaincus. Les gens commencent à avoir peur.',
    desc_en:'50 trainers defeated. People start to fear you.' },
  { id:'story_rep_25',   type:'story',fr:'Notoriété Locale',           en:'Local Notoriety',
    stat:'_reputation',  target:25, reward:{ money:2000 }, icon:'📜',
    desc_fr:'Votre gang a une réputation de 25. Les gens parlent de vous.',
    desc_en:'Your gang has 25 reputation. People talk about you.' },
  { id:'story_rep_50',   type:'story',fr:'Gang Redouté',               en:'Feared Gang',
    stat:'_reputation',  target:50, reward:{ money:5000 }, icon:'📜',
    desc_fr:'Réputation 50 ! Même la Team Rocket surveille vos mouvements.',
    desc_en:'50 reputation! Even Team Rocket monitors your movements.' },
  { id:'story_rep_100',  type:'story',fr:'Maîtres de Kanto',           en:'Masters of Kanto',
    stat:'_reputation',  target:100,reward:{ money:20000 },icon:'📜',
    desc_fr:'Réputation 100 ! Votre gang est légendaire dans tout Kanto.',
    desc_en:'100 reputation! Your gang is legendary across Kanto.' },
  { id:'story_first_shiny',type:'story',fr:'Première Étoile',          en:'First Star',
    stat:'shinyCaught',  target:1,  reward:{ money:5000, rep:10 },icon:'📜',
    desc_fr:'Vous avez capturé un Pokémon Shiny ! Incroyable !',
    desc_en:'You caught a Shiny Pokémon! Incredible!' },
  { id:'story_rocket_5', type:'story',fr:'Anti-Rocket',                en:'Anti-Rocket',
    stat:'rocketDefeated',target:5, reward:{ money:5000, rep:15 },icon:'📜',
    desc_fr:'5 Sbires Rocket vaincus. Ils ne vous oublieront pas.',
    desc_en:'5 Rocket Grunts defeated. They won\'t forget you.' }

export { ZONE_BGS, COSMETIC_BGS };