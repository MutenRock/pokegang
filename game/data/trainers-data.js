/* Trainer archetype definitions and reward tiers. Extracted from app.js for progressive refactoring. */

const TRAINER_TYPES = {
  // Basic trainers
  youngster:    { fr:'Gamin',        en:'Youngster',    sprite:'youngster',    diff:1, reward:[10,30],    rep:1  },
  lass:         { fr:'Fillette',     en:'Lass',         sprite:'lass',         diff:1, reward:[10,30],    rep:1  },
  bugcatcher:   { fr:'Chasseur',     en:'Bug Catcher',  sprite:'bugcatcher',   diff:1, reward:[10,30],    rep:1  },
  camper:       { fr:'Campeur',      en:'Camper',       sprite:'camper',       diff:1, reward:[15,40],    rep:1  },
  picnicker:    { fr:'Pique-niqueuse',en:'Picnicker',   sprite:'picnicker',    diff:1, reward:[15,40],    rep:1  },
  fisherman:    { fr:'Pêcheur',      en:'Fisherman',    sprite:'fisherman',    diff:1, reward:[20,50],    rep:2  },
  // Mid-tier trainers
  hiker:        { fr:'Montagnard',   en:'Hiker',        sprite:'hiker',        diff:2, reward:[25,75],    rep:3  },
  swimmer:      { fr:'Nageur',       en:'Swimmer',      sprite:'swimmer',      diff:2, reward:[25,75],    rep:3  },
  psychic:      { fr:'Médium',       en:'Psychic',      sprite:'psychic',      diff:2, reward:[25,75],    rep:3  },
  gentleman:    { fr:'Gentleman',    en:'Gentleman',    sprite:'gentleman',    diff:2, reward:[30,90],    rep:3  },
  beauty:       { fr:'Canon',        en:'Beauty',       sprite:'beauty',       diff:2, reward:[30,90],    rep:3  },
  sailor:       { fr:'Marin',        en:'Sailor',       sprite:'sailor',       diff:2, reward:[25,80],    rep:3  },
  blackbelt:    { fr:'Karatéka',     en:'Black Belt',   sprite:'blackbelt',    diff:2, reward:[30,85],    rep:3  },
  supernerd:    { fr:'Intello',      en:'Super Nerd',   sprite:'supernerd',    diff:2, reward:[25,75],    rep:3  },
  // High-tier trainers
  acetrainer:   { fr:'Topdresseur',  en:'Ace Trainer',  sprite:'acetrainer',   diff:3, reward:[50,150],   rep:5  },
  scientist:    { fr:'Scientifique', en:'Scientist',    sprite:'scientist',    diff:3, reward:[50,150],   rep:5  },
  channeler:    { fr:'Mystimana',    en:'Channeler',    sprite:'channeler',    diff:3, reward:[40,125],   rep:5  },
  juggler:      { fr:'Jongleur',     en:'Juggler',      sprite:'juggler',      diff:3, reward:[50,140],   rep:5  },
  // Team Rocket
  rocketgrunt:  { fr:'Sbire Rocket', en:'Rocket Grunt', sprite:'rocketgrunt',  diff:4, reward:[100,300],  rep:10 },
  rocketgruntf: { fr:'Sbire Rocket', en:'Rocket Grunt', sprite:'rocketgruntf', diff:4, reward:[100,300],  rep:10 },
  archer:       { fr:'Archer',       en:'Archer',       sprite:'archer',       diff:4, reward:[150,400],  rep:12 },
  ariana:       { fr:'Ariane',       en:'Ariana',       sprite:'ariana',       diff:4, reward:[150,400],  rep:12 },
  proton:       { fr:'Lambda',       en:'Proton',       sprite:'proton',       diff:4, reward:[150,400],  rep:12 },
  giovanni:     { fr:'Giovanni',     en:'Giovanni',     sprite:'giovanni',     diff:5, reward:[2500,5000], rep:25},
  // Gym Leaders
  brock:        { fr:'Pierre',       en:'Brock',        sprite:'brock',        diff:3, reward:[1000,2000],rep:15 },
  misty:        { fr:'Ondine',       en:'Misty',        sprite:'misty',        diff:3, reward:[1000,2500],rep:15 },
  ltsurge:      { fr:'Maj. Bob',     en:'Lt. Surge',    sprite:'ltsurge',      diff:4, reward:[1500,3000],rep:18 },
  erika:        { fr:'Érika',        en:'Erika',        sprite:'erika',        diff:4, reward:[1500,3000],rep:18 },
  koga:         { fr:'Koga',         en:'Koga',         sprite:'koga',         diff:4, reward:[2000,4000],rep:20 },
  sabrina:      { fr:'Morgane',      en:'Sabrina',      sprite:'sabrina',      diff:5, reward:[2500,5000], rep:22},
  blaine:       { fr:'Auguste',      en:'Blaine',       sprite:'blaine',       diff:5, reward:[2500,5000], rep:22},
  // Elite Four & Champion
  lorelei:        { fr:'Olga',           en:'Lorelei',        sprite:'lorelei',        diff:6, reward:[4000,7500],  rep:30},
  bruno:          { fr:'Aldo',           en:'Bruno',          sprite:'bruno',          diff:6, reward:[4000,7500],  rep:30},
  agatha:         { fr:'Agatha',         en:'Agatha',         sprite:'agatha',         diff:6, reward:[4000,7500],  rep:30},
  lance:          { fr:'Peter',          en:'Lance',          sprite:'lance',          diff:7, reward:[5000,10000], rep:40},
  blue:           { fr:'Blue',           en:'Blue',           sprite:'blue',           diff:7, reward:[6000,12500], rep:50},
  red:            { fr:'Red',            en:'Red',            sprite:'red',            diff:8, reward:[7500,15000], rep:60},
  // Rangers Pokémon (forces de l'ordre, pokémon puissants : Tauros, Scarabrute, etc.)
  pokemonranger:  { fr:'Ranger Pokémon', en:'Pokémon Ranger', sprite:'pokemonranger',  diff:4, reward:[125,350],   rep:10},
  pokemonrangerf: { fr:'Ranger Pokémon', en:'Pokémon Ranger', sprite:'pokemonrangerf', diff:4, reward:[125,350],   rep:10},
  // Police (Arcanin, Caninos — zones Rocket)
  policeman:      { fr:'Policier',       en:'Policeman',      sprite:'policeman',      diff:4, reward:[150,400],   rep:12},
};

// Trainers qui donnent +10 rep (gym leaders, Elite 4, personnages d'histoire)
const SPECIAL_TRAINER_KEYS = new Set([
  'brock','misty','ltsurge','erika','koga','sabrina','blaine',  // arènes
  'lorelei','bruno','agatha','lance',                             // Conseil des 4
  'blue','red','oak','giovanni',                                  // personnages d'histoire
]);

const MAX_COMBAT_REWARD = 5000;

// ── Items & Balls ─────────────────────────────────────────────
const BALLS = {
  pokeball:   { fr:'Poké Ball',  en:'Poké Ball',  cost:200,  potential:[40,30,20,8,2]  },
  greatball:  { fr:'Super Ball', en:'Great Ball',  cost:600,  potential:[15,30,30,18,7] },
  ultraball:  { fr:'Hyper Ball', en:'Ultra Ball',  cost:2000, potential:[5,15,30,30,20] },
  duskball:   { fr:'Sombre Ball',en:'Dusk Ball',   cost:1500, potential:[20,20,20,20,20]},
  masterball: { fr:'Master Ball',en:'Master Ball', cost:99999,potential:[0,0,0,10,90]  },
};

const SHOP_ITEMS = [
  { id:'pokeball',  qty:10, cost:2000,  icon:'PB'  },
  { id:'greatball', qty:10, cost:6000,  icon:'GB'  },
  { id:'ultraball', qty:5,  cost:10000, icon:'UB'  },
  { id:'duskball',  qty:5,  cost:7500,  icon:'DB'  },
  { id:'lure',      qty:1,  cost:500,   icon:'LR',  fr:'Leurre',       en:'Lure',            desc_fr:'x2 spawns 60s',         desc_en:'x2 spawns 60s' },
  { id:'superlure', qty:1,  cost:2000,  icon:'SL',  fr:'Super Leurre', en:'Super Lure',      desc_fr:'x3 spawns 60s',         desc_en:'x3 spawns 60s' },
  { id:'incense',   qty:1,  cost:1500,  icon:'IN',  fr:'Encens Chance',en:'Lucky Incense',   desc_fr:'*+1 potentiel 90s',     desc_en:'*+1 potential 90s' },
  { id:'rarescope', qty:1,  cost:3000,  icon:'SC',  fr:'Rarioscope',   en:'Rare Scope',      desc_fr:'Spawns rares x3 90s',   desc_en:'Rare spawns x3 90s' },
  { id:'aura',      qty:1,  cost:5000,  icon:'AU',  fr:'Aura Shiny',   en:'Shiny Aura',      desc_fr:'Shiny x5 90s',          desc_en:'Shiny x5 90s' },
  { id:'evostone',  qty:1,  cost:5000,  icon:'EV',  fr:'Pierre Evol.', en:'Evo Stone',       desc_fr:'Evoluer un Pokemon',    desc_en:'Evolve a Pokemon' },
  { id:'rarecandy', qty:1,  cost:3000,  icon:'RC',  fr:'Super Bonbon', en:'Rare Candy',      desc_fr:'+1 niveau',             desc_en:'+1 level' },
  { id:'translator',qty:1,  cost:1000000,icon:'TR', fr:'Traducteur Pokemon', en:'Pokemon Translator', desc_fr:'Comprend ce que disent les Pokemon en combat', desc_en:'Understand pokemon speech in combat' },
  { id:'mysteryegg', qty:1, cost:0, icon:'EG', fr:'Oeuf Mystère', en:'Mystery Egg', desc_fr:'Contient un Pokemon introuvable — Prix croissant', desc_en:'Contains an uncatchable Pokemon — Scaling price' },
  { id:'incubator',  qty:1, cost:15000, icon:'INC', fr:'Incubateur', en:'Incubator', desc_fr:'Eclot un oeuf (reutilisable) — 1 a la fois', desc_en:'Hatches an egg (reusable) — 1 at a time' },
  // ── Zone unlock items ──
  { id:'map_pallet',    qty:1, cost:5000,  icon:'🗺', fr:'Carte de Pallet',  en:'Pallet Map',      desc_fr:'Débloque le Jardin de Pallet',          desc_en:'Unlocks Pallet Garden' },
  { id:'casino_ticket', qty:1, cost:20000, icon:'🎰', fr:'Ticket Casino',    en:'Casino Ticket',   desc_fr:'Accès au Casino de Céladopole',         desc_en:'Access to Celadon Casino' },
  { id:'silph_keycard', qty:1, cost:50000, icon:'🔑', fr:'Badge Sylphe',     en:'Silph Keycard',   desc_fr:'Accès à Sylphe SARL',                   desc_en:'Access to Silph Co.' },
  { id:'boat_ticket',   qty:1, cost:15000, icon:'⚓', fr:'Ticket Bateau',    en:'Boat Ticket',     desc_fr:'Monte à bord du Bateau St. Anne',        desc_en:'Board the S.S. Anne' },
  { id:'egg_scanner', qty:1, cost:5000, icon:'🔬', fr:'Scanneur d\'Oeuf', en:'Egg Scanner', desc_fr:'89% révèle l\'espèce, 10% détruit l\'outil, 1% détruit l\'oeuf', desc_en:'89% reveals species, 10% destroys tool, 1% destroys egg' }

export { TRAINER_TYPES };