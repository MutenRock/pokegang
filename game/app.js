// ============================================================
// POKEFORGE — ROCKET HQ  app.js  v4  (Full FR/EN + All Patches)
// Patches intégrés : v4.01 → v4.11
// ============================================================

// ── LANGUE (lue depuis l'URL ou localStorage) ────────────
const urlParams = new URLSearchParams(window.location.search);
let lang = urlParams.get('lang') || localStorage.getItem('pf.lang') || 'fr';
const SLOT_INDEX = parseInt(urlParams.get('slot') || '1', 10);
const SAVE_KEY   = `pokeforge.rocket-hq.slot${SLOT_INDEX}`;

// ── I18N STRINGS ─────────────────────────────────────────
const UI_TEXT = {
  fr: {
    nextTurn:'⏩ Valider le tour', openMenu:'⚙ Menu', llmOn:'LLM ON', llmOff:'LLM OFF',
    turn:'Tour', resources:'Ressources', rooms:'Salles du QG', pokemon:'Pokémon',
    teamBuilder:"Création d'équipe", training:"Salle d'apprentissage",
    agents:'Agents', recruit:'Recrutement', missions:'Missions',
    pokedex:'Pokédex', combodex:'Combo Dex', allyChat:'Briefing allié',
    logs:'Logs',
  },
  en: {
    nextTurn:'⏩ End Turn', openMenu:'⚙ Menu', llmOn:'LLM ON', llmOff:'LLM OFF',
    turn:'Turn', resources:'Resources', rooms:'HQ Rooms', pokemon:'Pokémon',
    teamBuilder:'Team Builder', training:'Learning Room',
    agents:'Agents', recruit:'Recruitment', missions:'Missions',
    pokedex:'Pokédex', combodex:'Combo Dex', allyChat:'Ally Briefing',
    logs:'Logs',
  },
};
function T(key) { return UI_TEXT[lang]?.[key] || UI_TEXT.fr[key] || key; }

// ── SETTINGS (doit être déclaré avant loadSettings) ─────
const DEFAULT_SETTINGS = { llmEnabled:false, baseUrl:'http://localhost:11434', model:'gemma3:4b' };

// ── SAVE / LOAD (slot-aware) ──────────────────────────────
function saveState() {
  const data = { ...state, savedAt: Date.now(), lang };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}
function loadState() {
  const r = localStorage.getItem(SAVE_KEY);
  if (!r) return null;
  try { return JSON.parse(r); } catch { return null; }
}
function loadSettings() {
  const r = localStorage.getItem('pf.settings');
  if (!r) return { ...DEFAULT_SETTINGS };
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(r) }; } catch { return { ...DEFAULT_SETTINGS }; }
}

// ============================================================
// POKEFORGE — ROCKET HQ  app.js  v3  (Full FR + Gameplay+)
// ============================================================

// ── CONSTANTES GLOBALES ──────────────────────────────────
const AGENT_XP_THRESHOLDS = [0, 50, 120, 250, 500]; // index = level-1

// ── SPRITES ─────────────────────────────────────────────
const TRAINER_SPRITES = [
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunt.png',
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgruntf.png',
  'https://play.pokemonshowdown.com/sprites/trainers/giovanni.png',
  'https://play.pokemonshowdown.com/sprites/trainers/archer.png',
  'https://play.pokemonshowdown.com/sprites/trainers/ariana.png',
  'https://play.pokemonshowdown.com/sprites/trainers/proton.png',
  'https://play.pokemonshowdown.com/sprites/trainers/scientist.png',
  'https://play.pokemonshowdown.com/sprites/trainers/scientistf.png',
];

// ── POKÉDEX FR — GEN 1 & 2 (noms officiels) ─────────────
// Mapping EN→FR pour Showdown sprites (Showdown utilise l'EN)
const POKEMON_FR = {
  // Gen 1
  'bulbizarre':'bulbasaur','herbizarre':'ivysaur','florizarre':'venusaur',
  'salamèche':'charmander','reptincel':'charmeleon','dracaufeu':'charizard',
  'carapuce':'squirtle','carabaffe':'wartortle','tortank':'blastoise',
  'chenipan':'caterpie','chrysacier':'metapod','papilusion':'butterfree',
  'aspicot':'weedle','coconfort':'kakuna','dardargnan':'beedrill',
  'rattata':'rattata','rattatac':'raticate',
  'roucool':'pidgey','roucoups':'pidgeotto','roucarnage':'pidgeot','ronflex':'snorlax',
  'piafabec':'spearow','rapasdepic':'fearow',
  'abo':'ekans','arbok':'arbok','pikachu':'pikachu','raichu':'raichu',
  'sabelette':'sandshrew','sablaireau':'sandslash',
  'nidoran♀':'nidoran-f','nidorina':'nidorina','nidoqueen':'nidoqueen',
  'nidoran♂':'nidoran-m','nidorino':'nidorino','nidoking':'nidoking',
  'mélofée':'clefairy','méloféé':'clefable','goupix':'vulpix','feunard':'ninetales',
  'rondoudou':'jigglypuff','grodoudou':'wigglytuff',
  'nosferapti':'zubat','nosferalto':'golbat',
  'mystherbe':'oddish','ortide':'gloom','rafflesia':'vileplume',
  'paras':'paras','parasect':'parasect',
  'mimitoss':'venonat','aéromite':'venomoth',
  'taupiqueur':'diglett','triopikeur':'dugtrio',
  'miaouss':'meowth','persian':'persian',
  'psykokwak':'psyduck','akwakwak':'golduck',
  'férosinge':'mankey','colossinge':'primeape',
  'caninos':'growlithe','arcanin':'arcanine',
  'ptitard':'poliwag','têtarte':'poliwhirl','tartard':'poliwrath',
  'abra':'abra','kadabra':'kadabra','alakazam':'alakazam',
  'machoc':'machop','machopeur':'machoke','mackogneur':'machamp',
  'chétiflor':'bellsprout','boustiflor':'weepinbell','empiflor':'victreebel',
  'tentacool':'tentacool','tentacruel':'tentacruel',
  'racaillou':'geodude','gravalanch':'graveler','golem':'golem',
  'ponyta':'ponyta','galopa':'rapidash',
  'ramoloss':'slowpoke','flagadoss':'slowbro',
  'magneti':'magnemite','magnéton':'magneton',
  'canarticho':'farfetchd','doduo':'doduo','dodrio':'dodrio',
  'otaria':'seel','lamantine':'dewgong',
  'tadmorv':'grimer','grotadmorv':'muk',
  'kokiyas':'shellder','crustabri':'cloyster',
  'fantominus':'gastly','spectrum':'haunter','ectoplasma':'gengar',
  'onix':'onix','soporifik':'drowzee','hypnomade':'hypno',
  'crabe':'krabby','krabboss':'kingler',
  'voltorbe':'voltorb','électrode':'electrode',
  'nœunoœuf':'exeggcute','noadkoko':'exeggutor',
  'osselait':'cubone','ossatueur':'marowak',
  'tygnon':'hitmonlee','kicklee':'hitmonchan',
  'excelangue':'lickitung','smogo':'koffing','smogogo':'weezing',
  'rhinocorne':'rhyhorn','rhinoféros':'rhydon',
  'leveinard':'chansey','kangourex':'kangaskhan',
  'hypotrempe':'horsea','hypocéan':'seadra',
  'poissirène':'goldeen','poissoroy':'seaking',
  'stari':'staryu','staross':'starmie',
  'm. mime':'mr-mime','insécateur':'scyther','lippoutou':'jynx',
  'électabuzz':'electabuzz','magmar':'magmar',
  'scarabeug':'pinsir','tauros':'tauros',
  'magicarpe':'magikarp','léviator':'gyarados',
  'lokhlass':'lapras','métamorph':'ditto',
  'évoli':'eevee','aquali':'vaporeon','voltali':'jolteon','pyroli':'flareon',
  'porygon':'porygon','amonita':'omanyte','amonistar':'omastar',
  'kabuto':'kabuto','kabutops':'kabutops',
  'ptéra':'aerodactyl',
  'artikodin':'articuno','électhor':'zapdos','sulfura':'moltres',
  'minidraco':'dratini','draco':'dragonair','dracolosse':'dragonite',
  'mewtwo':'mewtwo','mew':'mew',

  // Gen 2
  'germignon':'chikorita','macronium':'bayleef','méganium':'meganium',
  'héricendre':'cyndaquil','feurisson':'quilava','typhlosion':'typhlosion',
  'kaiminus':'totodile','crocrodil':'croconaw','aligatueur':'feraligatr',
  'fouinette':'sentret','fouinar':'furret',
  'hululia':'hoothoot','noarfang':'noctowl',
  'coxy':'ledyba','coxyclaque':'ledian',
  'arakdo':'spinarak','migalos':'ariados',
  'nostenfer':'crobat',
  'loupiotte':'chinchou','lanturn':'lanturn',
  'pichu':'pichu','mélo':'cleffa','toudoudou':'igglybuff',
  'togepi':'togepi','togetic':'togetic',
  'natu':'natu','xatu':'xatu',
  'wattouat':'mareep','lainergie':'flaaffy','pharamp':'ampharos',
  'marill':'marill','azumarill':'azumarill',
  'granivol':'hoppip','entobulle':'skiploom','cotovol':'jumpluff',
  'capumain':'aipom',
  'tournegrin':'sunkern','héliatronc':'sunflora',
  'yanma':'yanma',
  'phanpy':'phanpy','donphan':'donphan',
  'mentali':'espeon','noctali':'umbreon',
  'cornèbre':'murkrow',
  'roigada':'slowking','feuforêve':'misdreavus',
  'farfuret':'sneasel',
  'magby':'magby','élekid':'elekid','lippouti':'smoochum',
  'rémoraid':'remoraid','octillery':'octillery',
  'corayon':'corsola','qwilfish':'qwilfish',
  'cizayox':'scizor','caratroc':'shuckle','malosse':'houndour','démolosse':'houndoom',
  'magnéton':'magneton',
  'porygon2':'porygon2',
  'steelix':'steelix',
  'scarhino':'heracross',
  'ursaring':'ursaring',
  'teddiursa':'teddiursa',
  'swinub':'swinub','piloswine':'piloswine',
  'girafarig':'girafarig',
  'forretress':'forretress',
  'blissey':'blissey',
  'raikou':'raikou','entei':'entei','suicune':'suicune',
  'embrylex':'larvitar','ymphect':'pupitar','tyranocif':'tyranitar',
  'lugia':'lugia','ho-oh':'ho-oh','celebi':'celebi',
};

// Dictionnaire inversé FR→EN pour pokeSprite
const FR_TO_EN = Object.fromEntries(Object.entries(POKEMON_FR));

// Pools FR par type (noms français)
const POKEMON_FR_POOL_BY_TYPE = {
  poison:   ['abo','arbok','nosferapti','nosferalto','smogo','smogogo','tadmorv','grotadmorv'],
  dark:     ['cornèbre','farfuret','malosse','démolosse'],
  electric: ['magneti','magnéton','voltorbe','électrode','électabuzz'],
  psychic:  ['abra','kadabra','soporifik','hypnomade','m. mime'],
  fighting: ['férosinge','colossinge','machoc','machopeur','mackogneur','tygnon','kicklee'],
  normal:   ['miaouss','persian','ronflex','métamorph','tauros','fouinette','fouinar'],
  feu:      ['salamèche','reptincel','dracaufeu','caninos','arcanin','ponyta','galopa','magmar'],
  eau:      ['carapuce','carabaffe','tortank','ptitard','têtarte','psykokwak','akwakwak'],
  plante:   ['bulbizarre','herbizarre','florizarre','mystherbe','ortide','rafflesia'],
  roche:    ['racaillou','gravalanch','golem','rhinocorne','rhinoféros'],
  sol:      ['taupiqueur','triopikeur','sabelette','sablaireau','osselait','ossatueur'],
};

const POKEDEX_POOL_FR = [
  'abo','smogo','nosferapti','tadmorv','miaouss','arbok','smogogo','magneti','voltorbe',
  'fantominus','soporifik','munja','farfuret','feuforêve','racaillou','osselait','métamorph','porygon',
];

// ── NOMS FR ─────────────────────────────────────────────
const NPC_FIRST_NAMES_M = [
  'Albert','Arthur','Auguste','Alain','Antoine','Alfred','Armand','Arnold','Andy','Anthony',
  'Bernard','Bill','Bob','Ben','Bruno','Bertrand','Bruce','Barry','Brian','Bastien',
  'Claude','Charles','Calvin','Chad','Carl','Colin','Clement','Corentin','Christian','Cyril',
  'Denis','Dan','Don','David','Damien','Didier','Daniel','Dylan','Dexter','Dustin',
  'Edouard','Emile','Earl','Edward','Eric','Etienne','Eugene','Ernest','Evan','Edgar',
  'Francois','Felix','Fred','Frank','Fabien','Florent','Fernand','Fabrice','Floyd','Fletcher',
  'Georges','Gaston','Guy','Gene','George','Gilles','Gerard','Guillaume','Gordon','Gary',
  'Henri','Harry','Howard','Harold','Hugo','Hector','Harvey','Hubert','Homer','Harrison',
  'Jacques','Jean','Joey','James','Jim','Joe','Jack','Jay','Jules','Justin',
  'Louis','Laurent','Lucien','Lee','Liam','Leo','Lucas','Leon','Lance','Lester',
];
const NPC_FIRST_NAMES_F = [
  'Alice','Anne','Agnes','Amelie','Audrey','Aurore','Anita','April','Amanda','Abigail',
  'Brigitte','Beatrice','Blandine','Betty','Bonnie','Barbara','Brenda','Blanche','Bessie','Bernice',
  'Catherine','Chantal','Christiane','Claire','Colette','Celine','Carol','Cindy','Chloe','Clara',
  'Danielle','Denise','Diane','Delphine','Dorothee','Daisy','Donna','Doris','Diana','Darlene',
  'Edith','Elisabeth','Elodie','Emilie','Estelle','Emma','Emily','Evelyn','Eleanor','Edna',
  'Francine','Francoise','Florence','Fabienne','Fanny','Flora','Faye','Felicia','Fern','Fiona',
  'Genevieve','Gisele','Gaelle','Grace','Gloria','Gladys','Gail','Gwendolyn','Gwen','Georgia',
  'Helene','Hortense','Henriette','Hazel','Helen','Heather','Holly','Heidi','Hilda','Hope',
  'Jacqueline','Jeanne','Josiane','Juliette','Justine','Jane','Judy','Joyce','Joan','Janet',
  'Louise','Lucie','Laurence','Laura','Linda','Lucy','Lois','Lillian','Loretta','Lynn',
];
const NPC_LAST_NAMES = [
  'Dubois','Dupont','Durand','Martin','Bernard','Thomas','Petit','Robert','Richard','Moreau',
  'Laurent','Simon','Michel','Lefevre','Leroy','Roux','David','Bertrand','Morel','Fournier',
  'Girard','Bonnet','Lambert','Fontaine','Rousseau','Vincent','Muller','Faure','Andre','Mercier',
  'Blanc','Guerin','Boyer','Garnier','Chevalier','Francois','Legrand','Gauthier','Garcia','Perrin',
  'Robin','Clement','Morin','Nicolas','Henry','Roussel','Mathieu','Gautier','Masson','Marchand',
  'Duval','Denis','Dumont','Marie','Lemaire','Noel','Meyer','Dufour','Meunier','Brun',
  'Blanchard','Giraud','Joly','Lucas','Brunet','Gaillard','Barbier','Arnaud','Martinez','Gerard',
  'Roche','Renard','Schmitt','Roy','Leroux','Colin','Vidal','Caron','Picard','Roger',
  'Chen','Seko','Orme','Sorbier','Rocher','Caillou','Bois','Riviere','Montagne','Foret',
];

const NPC_ROLES = [
  { id:'Infiltration',   faction:'team_rocket', traits:['discret','loyal','nerveux'],      types:['poison','dark'],    sprites:['rocketgrunt','rocketgruntf'] },
  { id:'Science',        faction:'team_rocket', traits:['intelligent','froid','précis'],   types:['electric','psychic'],sprites:['scientist','scientistf'] },
  { id:'Combat',         faction:'team_rocket', traits:['agressif','courageux','brutal'],  types:['fighting','poison'],sprites:['rocketgrunt'] },
  { id:'Logistique',     faction:'team_rocket', traits:['organisé','méfiant','fiable'],    types:['normal','dark'],    sprites:['rocketgruntf'] },
  { id:'Renseignement',  faction:'team_rocket', traits:['observateur','calme','rusé'],     types:['psychic','dark'],   sprites:['scientist'] },
];

const NPC_CATCHPHRASES = [
  "Je ne me bats pas pour perdre.",
  "La Team Rocket ne pardonne pas.",
  "Tu veux jouer ? Très bien.",
  "J'ai des ordres. Tu es dans mon chemin.",
  "Ne prends pas ça personnellement.",
  "Tu aurais dû rester chez toi.",
  "On ne plaisante pas avec la Team Rocket.",
  "Ton Pokémon sera bientôt à moi.",
  "La faiblesse n'a pas sa place ici.",
  "Prêt à perdre ?",
];

// ── MISSIONS ─────────────────────────────────────────────
const MISSIONS = [
  { id:'m1', nom:'Vol dans le Centre Pokémon',    recompense:{ pokedollars:400, intel:2 },   duree:2, risque:'faible',  description:'S\'infiltrer et voler les ressources médicales du Centre.' },
  { id:'m2', nom:'Sabotage de la Mine Taupiqueur',recompense:{ pokedollars:600, capturePoints:3 }, duree:3, risque:'moyen',  description:'Perturber l\'exploitation minière de la région.' },
  { id:'m3', nom:'Capture forcée – Zone Safari',  recompense:{ pokedollars:200, capturePoints:5 }, duree:2, risque:'moyen',  description:'Infiltrer la Zone Safari pour capturer des Pokémon rares.' },
  { id:'m4', nom:'Opération Silph Co.',            recompense:{ pokedollars:1000, intel:5 },  duree:4, risque:'élevé', description:'Prendre le contrôle d\'un étage de la tour Silph.' },
  { id:'m5', nom:'Racket de dresseurs',            recompense:{ pokedollars:300, breedingPoints:2 }, duree:1, risque:'faible',  description:'Racketter les dresseurs débutants de la Route 1.' },
  { id:'m6', nom:'Trafic de Fossiles',             recompense:{ pokedollars:700, capturePoints:2, intel:1 }, duree:3, risque:'moyen', description:'Revendre des fossiles volés au Musée de Jadielle.' },
];

// ── BASE STATE ───────────────────────────────────────────
const BASE_STATE = {
  turn: 1,
  profile: { initialized:false, team:'Team Rocket', firstName:'Ari', lastName:'Voss', sprite:TRAINER_SPRITES[0] },
  resources: { pokedollars:1800, capturePoints:0, breedingPoints:0, intel:0 },
  reputation: 10, // 0→100, influence sur les recrutements et événements
  pokemonStandby: [], // surplus Pokémon au-delà du cap
  rooms: {
    command:  { nom:'Salle de commandement', level:1, baseIncome:120, upgradeCost:700 },
    capture:  { nom:'Salle de capture',      level:1, baseIncome:2,   upgradeCost:550 },
    breeding: { nom:'Nurserie / Élevage',    level:1, baseIncome:2,   upgradeCost:550 },
    training: { nom:'Salle d\'entraînement', level:1, baseIncome:1,   upgradeCost:600 },
  },
  agents: [
    { id:'ag-1', name:'Mira',   rank:'Agent',        team:[], sprite:TRAINER_SPRITES[1], personality:['loyal','discret'],      catch_phrases:['Ordre reçu.'],    pokemon_preferences:['poison'],   missions:[] },
    { id:'ag-2', name:'Nox',    rank:'Scientifique',  team:[], sprite:TRAINER_SPRITES[6], personality:['intelligent','froid'],  catch_phrases:['Fascinant.'],     pokemon_preferences:['psychic'],  missions:[] },
  ],
  npcs: [
    { name:'Riko',  mood:'méfiant', sprite:TRAINER_SPRITES[0], catch_phrases:['Je ne fais confiance à personne.'] },
    { name:'Vera',  mood:'calme',   sprite:TRAINER_SPRITES[1], catch_phrases:['Tout est sous contrôle.'] },
  ],
  pokemons: [
    { id:'pk-1', species_fr:'abo',    species_en:'ekans',   level:9,  assignedAgentId:null },
    { id:'pk-2', species_fr:'smogo',  species_en:'koffing', level:10, assignedAgentId:null },
    { id:'pk-3', species_fr:'nosferapti', species_en:'zubat', level:8, assignedAgentId:null },
  ],
  newPokemonsThisTurn: [],
  breedingQueue: [],
  missions: [],         // missions en cours : { missionId, agentId, turnsLeft, recompense }
  availableMissions: [],// missions disponibles ce tour
  recruit: null,
  selectedNpc: 'Riko',
  events: [],           // file d'événements narratifs
  log: [],
};

// ── UI ───────────────────────────────────────────────────
const ui = {
  turnValue:          document.getElementById('turnValue'),
  llmBadge:           document.getElementById('llmBadge'),
  nextTurnBtn:        document.getElementById('nextTurnBtn'),
  playerSprite:       document.getElementById('playerSprite'),
  playerName:         document.getElementById('playerName'),
  teamName:           document.getElementById('teamName'),
  resourcesGrid:      document.getElementById('resourcesGrid'),
  roomsList:          document.getElementById('roomsList'),
  pokemonOwnedList:   document.getElementById('pokemonOwnedList'),
  pokemonNewList:     document.getElementById('pokemonNewList'),
  agentSelect:        document.getElementById('agentSelect'),
  pokemonSelect:      document.getElementById('pokemonSelect'),
  assignTeamBtn:      document.getElementById('assignTeamBtn'),
  agentTeams:         document.getElementById('agentTeams'),
  difficultySelect:   document.getElementById('difficultySelect'),
  startTrainingFightBtn: document.getElementById('startTrainingFightBtn'),
  trainingResult:     document.getElementById('trainingResult'),
  agentsList:         document.getElementById('agentsList'),
  recruitCandidate:   document.getElementById('recruitCandidate'),
  recruitTranscript:  document.getElementById('recruitTranscript'),
  recruitMessage:     document.getElementById('recruitMessage'),
  sendRecruitBtn:     document.getElementById('sendRecruitBtn'),
  npcList:            document.getElementById('npcList'),
  npcMessage:         document.getElementById('npcMessage'),
  npcSendBtn:         document.getElementById('npcSendBtn'),
  logOutput:          document.getElementById('logOutput'),
  introOverlay:       document.getElementById('introOverlay'),
  teamInput:          document.getElementById('teamInput'),
  firstNameInput:     document.getElementById('firstNameInput'),
  lastNameInput:      document.getElementById('lastNameInput'),
  spriteSelect:       document.getElementById('spriteSelect'),
  spritePreview:      document.getElementById('spritePreview'),
  introStartBtn:      document.getElementById('introStartBtn'),
  challengeOverlay:   document.getElementById('challengeOverlay'),
  challengeBody:      document.getElementById('challengeBody'),
  challengeYesBtn:    document.getElementById('challengeYesBtn'),
  challengeNoBtn:     document.getElementById('challengeNoBtn'),
  settingsOverlay:    document.getElementById('settingsOverlay'),
  openSettingsBtn:    document.getElementById('openSettingsBtn'),
  closeSettingsBtn:   document.getElementById('closeSettingsBtn'),
  llmEnabledToggle:   document.getElementById('llmEnabledToggle'),
  baseUrlInput:       document.getElementById('baseUrlInput'),
  modelInput:         document.getElementById('modelInput'),
  testOllamaBtn:      document.getElementById('testOllamaBtn'),
  llmStatus:          document.getElementById('llmStatus'),
  saveBtn:            document.getElementById('saveBtn'),
  loadBtn:            document.getElementById('loadBtn'),
  resetBtn:           document.getElementById('resetBtn'),
  exportSaveBtn:      document.getElementById('exportSaveBtn'),
  importSaveBtn:      document.getElementById('importSaveBtn'),
  saveFileInput:      document.getElementById('saveFileInput'),
  exportCodeBtn:      document.getElementById('exportCodeBtn'),
  importCodeBtn:      document.getElementById('importCodeBtn'),
  exportLogsBtn:      document.getElementById('exportLogsBtn'),
};

let state    = loadState() || structuredClone(BASE_STATE);
let settings = loadSettings();
let pendingNpcChallenge = null;

// ── UTILS ────────────────────────────────────────────────
function pokeSprite(species_en) {
  return `https://play.pokemonshowdown.com/sprites/gen5/${species_en}.png`;
}
function pokeSpriteFromFR(species_fr) {
  const en = FR_TO_EN[species_fr.toLowerCase()] || species_fr;
  return `https://play.pokemonshowdown.com/sprites/gen5/${en}.png`;
}
function pick(list)   { return list[Math.floor(Math.random() * list.length)]; }
function addLog(text) { state.log.unshift(`[T${state.turn}] ${text}`); state.log = state.log.slice(0, 200); }
// saveState/loadState/loadSettings → voir bloc slot-aware en haut du fichier
function saveSettings() { localStorage.setItem('pf.settings', JSON.stringify(settings)); }

// Crée un objet Pokémon à partir d'un nom FR
function makePokemon(species_fr, level) {
  const species_en = FR_TO_EN[species_fr.toLowerCase()] || species_fr;
  return {
    id:`pk-${Date.now()}-${Math.floor(Math.random()*9999)}`,
    species_fr, species_en,
    level: level || 5+Math.floor(Math.random()*8),
    assignedAgentId: null,
    stars: 0,       // 0-3 étoiles (fusion)
    cooldown: 0,
  };
}

// ============================================================
// POKÉMON CAP + STANDBY + FUSION
// ============================================================

// Cap = 5 de base, +5 tous les 3 tours
function getPokemonCap() {
  const baseCap = 5;
  const bonusPerCycle = 5;
  const cycleLength = 3;
  return baseCap + Math.floor((state.turn - 1) / cycleLength) * bonusPerCycle;
}

// Ajoute un Pokémon en respectant le cap — surplus → standby
function addPokemonWithCap(pok) {
  if (!state.pokemonStandby) state.pokemonStandby = [];
  const cap = getPokemonCap();
  if (state.pokemons.length < cap) {
    state.pokemons.push(pok);
    state.newPokemonsThisTurn.push(pok);
  } else {
    state.pokemonStandby.push(pok);
    addLog(lang === 'fr'
      ? `📦 ${pok.species_fr} mis en attente (limite ${cap} atteinte).`
      : `📦 ${pok.species_fr} put on standby (cap ${cap} reached).`);
  }
}

// Appelé à chaque augmentation de cap : récupère les standby
function releaseStandbyPokemon() {
  if (!state.pokemonStandby?.length) return;
  const cap = getPokemonCap();
  while (state.pokemons.length < cap && state.pokemonStandby.length > 0) {
    const pok = state.pokemonStandby.shift();
    state.pokemons.push(pok);
    state.newPokemonsThisTurn.push(pok);
    addLog(lang === 'fr'
      ? `📦→ ${pok.species_fr} récupéré depuis le standby !`
      : `📦→ ${pok.species_fr} released from standby!`);
  }
}

// ── FUSION : combat même espèce ─────────────────────────
// ★0 + ★0 → ★1 (2 Pokémon)
// ★1 + ★1 → ★2 (besoin de 2 ★1)
// ★2 + ★2 + ★2 → ★3 (besoin de 3 ★2)
const STAR_BONUSES = {
  1: { label:'★',   bonusLevel: 2, trait: null },
  2: { label:'★★',  bonusLevel: 4, trait: 'résistant' },
  3: { label:'★★★', bonusLevel: 8, trait: 'élite' },
};

// Combien de Pokémon même espèce/même étoile faut-il pour monter ?
function fusionCost(currentStars) {
  if (currentStars === 0) return 2; // 2x ★0 → ★1
  if (currentStars === 1) return 2; // 2x ★1 → ★2
  if (currentStars === 2) return 3; // 3x ★2 → ★3
  return Infinity;
}

// Trouve les doublons fusionnables (même espèce, même étoile)
function findFusionCandidates(pkm) {
  const stars = pkm.stars || 0;
  if (stars >= 3) return [];
  const needed = fusionCost(stars);
  return state.pokemons.filter(p =>
    p.id !== pkm.id &&
    p.species_fr?.toLowerCase() === pkm.species_fr?.toLowerCase() &&
    (p.stars || 0) === stars
  ).slice(0, needed - 1);
}

function canFuse(pkm) {
  if (!pkm) return false;
  const stars = pkm.stars || 0;
  if (stars >= 3) return false;
  const candidates = findFusionCandidates(pkm);
  return candidates.length >= (fusionCost(stars) - 1);
}

function fusePokemon(winnerId) {
  const winner = state.pokemons.find(p => p.id === winnerId);
  if (!winner || !canFuse(winner)) return false;

  const stars = winner.stars || 0;
  const needed = fusionCost(stars) - 1; // combien sacrifier
  const sacrifices = findFusionCandidates(winner).slice(0, needed);
  if (sacrifices.length < needed) return false;

  // Sacrifier les doublons
  const sacrificeIds = sacrifices.map(s => s.id);
  sacrificeIds.forEach(sId => {
    state.agents.forEach(a => { a.team = (a.team||[]).filter(id => id !== sId); });
    const lost = state.pokemons.find(p => p.id === sId);
    if (lost) markPokedexLost(lost.species_fr);
  });
  state.pokemons = state.pokemons.filter(p => !sacrificeIds.includes(p.id));

  // Promotion
  winner.stars = stars + 1;
  const starData = STAR_BONUSES[winner.stars];
  winner.level += starData.bonusLevel;

  if (starData.trait) {
    if (!winner.fusionTraits) winner.fusionTraits = [];
    if (!winner.fusionTraits.includes(starData.trait)) {
      winner.fusionTraits.push(starData.trait);
    }
  }

  const starLabel = '★'.repeat(winner.stars);
  const costLabel = `${needed + 1}× ${sacrifices[0]?.species_fr||'?'}`;
  addLog(lang === 'fr'
    ? `⚔️ Fusion ${costLabel} → ${winner.species_fr} ${starLabel} (Niv.${winner.level}) !`
    : `⚔️ Fusion ${costLabel} → ${winner.species_fr} ${starLabel} (Lv.${winner.level})!`);

  saveState(); render();
  return true;
}

// ── LLM ─────────────────────────────────────────────────
async function callOllama(prompt, fallback) {
  if (!settings.llmEnabled) return fallback;
  try {
    const res = await fetch(`${settings.baseUrl.replace(/\/$/,'')}/api/generate`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ model:settings.model, prompt, stream:false }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.response?.trim() || fallback;
  } catch { return fallback; }
}

function buildNpcSystemPrompt(npc) {
  return `Tu incarnes un personnage dans un jeu de gestion criminelle inspiré de Pokémon.

Fiche personnage :
Nom : ${npc.name}
Rôle : ${npc.role || npc.rank || 'PNJ'}
Faction : ${npc.faction || 'Team Rocket'}
Personnalité : ${(npc.personality||[]).join(', ')}
Valeurs : ${(npc.values||[]).join(', ')}
Style : ton ${npc.speech_style?.tone || 'neutre'}
Réplique type : "${(npc.catch_phrases||['...'])[0]}"
Pokémon préférés (noms FR) : ${(npc.possible_pokemon||[]).join(', ')}

Réponds toujours en français. Reste dans le personnage. Maximum deux phrases.`;
}

// ── NPC GENERATOR ────────────────────────────────────────
function generateNPC() {
  const gender   = Math.random() > 0.5 ? 'male' : 'female';
  const firstName= pick(gender === 'male' ? NPC_FIRST_NAMES_M : NPC_FIRST_NAMES_F);
  const lastName = pick(NPC_LAST_NAMES);
  const role     = pick(NPC_ROLES);
  const primaryType = pick(role.types);
  const pool = POKEMON_FR_POOL_BY_TYPE[primaryType] || POKEMON_FR_POOL_BY_TYPE.poison;
  const possible_pokemon = [...new Set([pick(pool), pick(pool), pick(pool)])];
  const sprite = `https://play.pokemonshowdown.com/sprites/trainers/${pick(role.sprites)}.png`;

  return {
    id: `npc-${Date.now()}-${Math.floor(Math.random()*9999)}`,
    name: `${firstName} ${lastName}`,
    firstName, lastName, gender,
    age: 14 + Math.floor(Math.random() * 38),
    role: role.id, faction: role.faction,
    personality: [pick(role.traits), pick(role.traits)],
    orientation: 'villain',
    trust_level: 1 + Math.floor(Math.random() * 4),
    goals: { short_term:'Survivre et servir.', long_term:'Monter en grade.' },
    values: [pick(['argent','pouvoir','loyauté','survie']), pick(['ordre','chaos','respect','force'])],
    speech_style: { tone: pick(['froid','nerveux','confiant','agressif']), verbosity:'medium', formality:'low' },
    catch_phrases: [pick(NPC_CATCHPHRASES)],
    pokemon_preferences: [primaryType],
    possible_pokemon,
    sprite,
    missions: [],
    memories: [], relationships: {}, events_history: [],
    hiddenScore: 3 + Math.floor(Math.random() * 5),
  };
}

function initRecruit() {
  const npc = generateNPC();
  state.recruit = { npc, candidateName:npc.name, candidateRole:npc.role, interactions:0, hiddenScore:npc.hiddenScore, transcript:[], finished:false };
}

// Missions v3 supprimées — voir MISSIONS_V2 / rollAvailableMissionsV2 / resolveMissionV2

// ── ÉVÉNEMENTS ALÉATOIRES ─────────────────────────────────
const RANDOM_EVENTS = [
  { id:'ev1', texte:'Un dresseur perdu débarque dans votre base. Il veut rejoindre.', effet: (s) => { s.reputation = Math.min(100, s.reputation+1); }},
  { id:'ev2', texte:'Inspection de la police ! Vous perdez 200 Pokédollars en pots-de-vin.', effet: (s) => { s.resources.pokedollars = Math.max(0, s.resources.pokedollars-200); }},
  { id:'ev3', texte:'Un Magicarpe s\'est faufilé dans les réserves d\'eau. +1 point d\'élevage.', effet: (s) => { s.resources.breedingPoints += 1; }},
  { id:'ev4', texte:'Trafic d\'informations : +3 Intel récupérés discrètement.', effet: (s) => { s.resources.intel += 3; }},
  { id:'ev5', texte:'Rivalité interne : deux agents se disputent. Réputation -1.', effet: (s) => { s.reputation = Math.max(0, s.reputation-1); }},
  { id:'ev6', texte:'Don anonyme de la Team Rocket centrale : +500 Pokédollars.', effet: (s) => { s.resources.pokedollars += 500; }},
];

function rollRandomEvent() {
  if (Math.random() < 0.35) {
    const ev = pick(RANDOM_EVENTS);
    ev.effet(state);
    addLog(`⚡ Événement : ${ev.texte}`);
  }
}

// ── RENDER ───────────────────────────────────────────────
function renderResources() {
  const labels = { pokedollars:'💰 Pokédollars', capturePoints:'🎣 Capture', breedingPoints:'🥚 Élevage', intel:'🔍 Intel' };
  ui.resourcesGrid.innerHTML = Object.entries(state.resources)
    .map(([k,v]) => `<div class="stat"><strong>${labels[k]||k}</strong><div>${v}</div></div>`)
    .join('') + `<div class="stat"><strong>⭐ Réputation</strong><div>${state.reputation||0}/100</div></div>`;
}

// renderRooms v3 supprimée — voir renderRoomsV2

function renderPokemonPanels() {
  const cap = getPokemonCap();
  const standbyCount = (state.pokemonStandby||[]).length;
  const capLabel = lang === 'fr'
    ? `<div style="font-size:.7em;color:var(--muted);margin-bottom:6px">Pokémon : ${state.pokemons.length}/${cap}${standbyCount ? ` · 📦 ${standbyCount} en attente` : ''}</div>`
    : `<div style="font-size:.7em;color:var(--muted);margin-bottom:6px">Pokémon: ${state.pokemons.length}/${cap}${standbyCount ? ` · 📦 ${standbyCount} standby` : ''}</div>`;

  ui.pokemonOwnedList.innerHTML = capLabel + state.pokemons.map(p => {
    const agent = state.agents.find(a => a.id === p.assignedAgentId);
    const spFR = p.species_fr || p.species_en || p.species;
    const spEN = p.species_en || FR_TO_EN[spFR?.toLowerCase()] || spFR;
    const starStr = (p.stars||0) > 0 ? `<span style="color:#ffcc5a">${'★'.repeat(p.stars)}</span>` : '';
    const traitStr = (p.fusionTraits||[]).length ? `<span style="color:#70e0a4;font-size:.7em">[${p.fusionTraits.join(',')}]</span>` : '';
    const cdStr = (p.cooldown||0) > 0 ? `<span style="color:#7060a8;font-size:.7em"> [${p.cooldown}t]</span>` : '';

    // Cherche si ce Pokémon peut fusionner (assez de doublons même étoile)
    const canFuseThis = canFuse(p);
    const needed = fusionCost(p.stars||0);
    const fuseBtn = canFuseThis
      ? `<button class="small" style="font-size:.6em;padding:2px 6px" onclick="fusePokemon('${p.id}')">${lang==='fr'?`⚔️ Fusionner (${needed}x)`:`⚔️ Fuse (${needed}x)`}</button>`
      : '';

    return `<div class="card pokemon" style="flex-wrap:wrap;gap:4px">
      <img class="poke-sprite" src="${pokeSprite(spEN)}" alt="${spFR}">
      <div>
        <div>${spFR} Niv.${p.level} ${starStr} ${traitStr}${cdStr}</div>
        <small>${agent ? `→ ${agent.name}` : (lang==='fr'?'Non assigné':'Unassigned')}</small>
      </div>
      ${fuseBtn}
    </div>`;
  }).join('');

  ui.pokemonNewList.innerHTML = state.newPokemonsThisTurn.length
    ? state.newPokemonsThisTurn.map(p => {
        const spFR = p.species_fr || p.species_en || p.species;
        const spEN = p.species_en || FR_TO_EN[spFR?.toLowerCase()] || spFR;
        return `<div class="card pokemon">
          <img class="poke-sprite" src="${pokeSprite(spEN)}" alt="${spFR}">
          <div>${spFR} Niv.${p.level}</div>
        </div>`;
      }).join('')
    : `<div class="card">${lang==='fr'?'Aucun nouveau Pokémon ce tour.':'No new Pokémon this turn.'}</div>`;
}

function renderTeamBuilder() {
  ui.agentSelect.innerHTML  = state.agents.map(a => {
    const onMission = (state.missions||[]).some(mi => mi.agentId === a.id);
    const cd = (a.cooldown||0) > 0;
    const tag = onMission ? ` ⏳` : cd ? ` [${a.cooldown}t]` : '';
    return `<option value="${a.id}" ${cd||onMission?'style="color:#7060a8"':''}>${a.name} – ${a.rank}${tag}</option>`;
  }).join('');
  // Filtre : ne montre que les Pokémon non déjà assignés à un autre agent
  const assignedIds = new Set(state.agents.flatMap(a => a.team||[]));
  const selectedAgentId = ui.agentSelect?.value;
  const selectedAgentTeam = new Set((state.agents.find(a=>a.id===selectedAgentId)?.team||[]));
  const availablePkm = state.pokemons.filter(p => !assignedIds.has(p.id) || selectedAgentTeam.has(p.id));
  ui.pokemonSelect.innerHTML = availablePkm.map(p => {
    const spFR = p.species_fr || p.species;
    const cd = (p.cooldown||0) > 0;
    const cdTag = cd ? ` [${lang==='fr'?'repos':'rest'} ${p.cooldown}t]` : '';
    const starTag = (p.stars||0) > 0 ? ` ${'★'.repeat(p.stars)}` : '';
    return `<option value="${p.id}" ${cd?'style="color:#7060a8"':''}>${spFR} Nv.${p.level}${starTag}${cdTag}</option>`;
  }).join('');
  ui.agentTeams.innerHTML = state.agents.map(a => {
    const pkmInfo = a.team.map(id => {
      const p = state.pokemons.find(x => x.id === id);
      if (!p) return null;
      const name = p.species_fr || p.species;
      const cd = (p.cooldown||0) > 0 ? ` <span style="color:#7060a8;font-size:.85em">[${p.cooldown}t]</span>` : '';
      const en = FR_TO_EN[(p.species_fr||'').toLowerCase()] || p.species_en || 'pikachu';
      return `<span style="display:inline-flex;align-items:center;gap:2px"><img src="https://play.pokemonshowdown.com/sprites/gen5/${en}.png" style="width:24px;image-rendering:pixelated">${name}${cd}</span>`;
    }).filter(Boolean);
    const sprite = a.sprite ? `<img src="${a.sprite}" style="height:40px;vertical-align:middle;margin-right:6px;">` : '';
    const agentCd = (a.cooldown||0) > 0 ? ` <span style="color:#7060a8;font-size:.75em">[repos ${a.cooldown}t]</span>` : '';
    return `<div class="card">${sprite}<strong>${a.name}</strong> — ${a.rank}${agentCd}
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px"><small>${pkmInfo.length ? pkmInfo.join('') : (lang==='fr'?'Aucune équipe':'No team')}</small></div>
    </div>`;
  }).join('');
}

function renderAgentsAndRecruitment() {
  ui.agentsList.innerHTML = state.agents.map(a => {
    const enMission = (state.missions||[]).some(mi => mi.agentId === a.id);
    const sprite = a.sprite ? `<img src="${a.sprite}" style="height:36px;vertical-align:middle;margin-right:6px;">` : '';
    const traits = (a.personality||[]).join(', ');
    return `<div class="card">${sprite}<strong>${a.name}</strong> — ${a.rank}
      ${enMission ? '<span style="color:#e53"> [en mission]</span>' : ''}
      <div><small>${traits}</small></div>
    </div>`;
  }).join('');

  if (!state.recruit) initRecruit();
  if (!state.recruit.npc) initRecruit();
  const r = state.recruit;
  const npc = r.npc;

  const spriteImg = npc?.sprite ? `<img src="${npc.sprite}" style="height:48px;vertical-align:middle;margin-right:8px;">` : '';
  const traits = (npc?.personality||[]).join(', ');
  const pkmnFR  = (npc?.possible_pokemon||[]).join(', ');
  const phrase  = (npc?.catch_phrases||['...'])[0];

  ui.recruitCandidate.innerHTML = r.finished
    ? `<div class="card"><em>Recrutement terminé. Un nouveau candidat au prochain tour.</em></div>`
    : `<div class="card" style="display:flex;align-items:center;gap:8px;">
        ${spriteImg}
        <div>
          <strong>${r.candidateName}</strong> — ${r.candidateRole}<br>
          <small>Traits : ${traits}</small><br>
          <small>Pokémon : ${pkmnFR}</small><br>
          <small><em>"${phrase}"</em></small><br>
          <small>Interaction ${r.interactions}/5 — Score caché : ${'★'.repeat(Math.round(r.hiddenScore/2))}</small>
        </div>
      </div>`;

  ui.recruitTranscript.innerHTML = r.transcript.length
    ? r.transcript.map(line => `<div class="logline">${line}</div>`).join('')
    : '<div class="log">Démarre une discussion de recrutement.</div>';
}

function renderNpcs() {
  ui.npcList.innerHTML = state.npcs.map(npc => {
    const sprite = npc.sprite ? `<img src="${npc.sprite}" style="height:32px;vertical-align:middle;margin-right:6px;">` : '';
    return `<button class="card" ${npc.name===state.selectedNpc?'style="outline:2px solid #e53"':''} data-npc="${npc.name}">
      ${sprite}${npc.name} <small>${npc.mood}</small>
    </button>`;
  }).join('');
  ui.npcList.querySelectorAll('[data-npc]').forEach(btn => {
    btn.onclick = () => { state.selectedNpc = btn.dataset.npc; render(); };
  });
}

// render() et processTurn() → voir versions V5 en bas du fichier

// ── TEAM ASSIGNMENT ──────────────────────────────────────
function assignTeam() {
  const agentId = ui.agentSelect.value;
  const selectedIds = Array.from(ui.pokemonSelect.selectedOptions).map(o => o.value).slice(0,3);
  const agent = state.agents.find(a => a.id === agentId);
  if (!agent) return;

  // Warn if agent is on cooldown
  if ((agent.cooldown||0) > 0) {
    addLog(lang==='fr'
      ? `⚠️ ${agent.name} est en repos (${agent.cooldown} tour(s) restant(s)).`
      : `⚠️ ${agent.name} is resting (${agent.cooldown} turn(s) left).`);
  }

  // Warn about Pokémon on cooldown
  const cdPkm = selectedIds.map(id => state.pokemons.find(x=>x.id===id)).filter(p => p && (p.cooldown||0)>0);
  if (cdPkm.length) {
    const names = cdPkm.map(p => `${p.species_fr||p.species} (${p.cooldown}t)`).join(', ');
    addLog(lang==='fr'
      ? `⚠️ Pokémon en repos : ${names}`
      : `⚠️ Pokémon resting: ${names}`);
  }

  agent.team.forEach(id => { const p = state.pokemons.find(x => x.id===id); if (p) p.assignedAgentId=null; });
  agent.team = selectedIds;
  selectedIds.forEach(id => { const p = state.pokemons.find(x => x.id===id); if (p) p.assignedAgentId=agent.id; });
  addLog(lang==='fr'
    ? `Équipe assignée à ${agent.name} (${agent.team.length}/3).`
    : `Team assigned to ${agent.name} (${agent.team.length}/3).`);
  saveState(); render();
}

// ── TRAINING BATTLE ──────────────────────────────────────
async function runTrainingBattle() {
  const difficulty = ui.difficultySelect.value;
  const agent = state.agents.find(a => a.id === ui.agentSelect.value) || state.agents[0];
  const teamEN = agent.team.map(id => { const p = state.pokemons.find(x => x.id===id); return p?.species_en || (p ? FR_TO_EN[p.species_fr?.toLowerCase()] : null); }).filter(Boolean);
  if (!teamEN.length) { ui.trainingResult.textContent = 'Assigne au moins un Pokémon à un agent.'; return; }
  let summary;
  try {
    const res = await fetch('http://localhost:8081/api/pokellmon/resolve', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ difficulty, mode:'training-room', player:{name:agent.name,team:teamEN}, npc:{name:`Training-${difficulty}`,team:difficulty==='hard'?['alakazam','starmie','snorlax']:difficulty==='normal'?['raichu','arbok','golbat']:['rattata','pidgey','oddish']} }),
    });
    if (res.ok) summary = (await res.json()).summary;
  } catch {}
  if (!summary) summary = pick({ easy:['Victoire nette en salle d\'entraînement.','Victoire avec quelques dégâts.'], normal:['Match serré, victoire tactique.','Défaite serrée, progrès notable.'], hard:['Défaite lourde.','Victoire surprise !'] }[difficulty]);
  ui.trainingResult.textContent = summary;
  addLog(`Combat entraînement (${difficulty}) : ${summary}`);
  saveState(); render();
}

// ── RECRUITMENT ──────────────────────────────────────────
async function recruitStep() {
  const r = state.recruit;
  if (!r || r.finished) return;
  const message = ui.recruitMessage.value.trim();
  if (!message) return;
  ui.recruitMessage.value = '';
  r.interactions += 1;
  r.transcript.push(`Vous : ${message}`);

  const npc = r.npc;
  const systemPrompt = buildNpcSystemPrompt(npc);
  const fullPrompt = `${systemPrompt}\n\nMessage du recruteur : "${message}"\n\nRéponds en JSON strict : {"reply":"...","scoreDelta":-2..2}`;
  const fallback = JSON.stringify({ reply:`${r.candidateName} : Je t'écoute, mais je veux des garanties.`, scoreDelta: message.length > 25 ? 1 : 0 });
  const llmOutput = await callOllama(fullPrompt, fallback);

  let reply = `${r.candidateName} : Je t'écoute, mais je veux des garanties.`;
  let delta  = 0;
  try {
    const jsonText = llmOutput.includes('{') ? llmOutput.slice(llmOutput.indexOf('{'), llmOutput.lastIndexOf('}')+1) : llmOutput;
    const parsed = JSON.parse(jsonText);
    reply = parsed.reply || reply;
    delta = Math.max(-2, Math.min(2, Number(parsed.scoreDelta)||0));
  } catch {
    delta = message.includes('ressources')||message.includes('team')||message.includes('Rocket') ? 1 : 0;
  }

  r.hiddenScore = Math.max(1, Math.min(10, r.hiddenScore + delta));
  r.transcript.push(`${r.candidateName} : ${reply}`);

  if (r.interactions >= 5) {
    r.finished = true;
    if (r.hiddenScore >= 5) {
      const newAgent = { id:`ag-${Date.now()}`, name:r.candidateName, rank:r.candidateRole, team:[], sprite:npc.sprite, personality:npc.personality, catch_phrases:npc.catch_phrases, pokemon_preferences:npc.pokemon_preferences, missions:[] };
      state.agents.push(newAgent);
      npc.possible_pokemon.forEach(spFR => addPokemonWithCap(makePokemon(spFR)));
      state.npcs.push({ name:`${r.candidateName}-contact`, mood:'loyal', sprite:npc.sprite, catch_phrases:npc.catch_phrases });
      state.reputation = Math.min(100, (state.reputation||0)+3);
      addLog(`✅ Recrutement réussi : ${r.candidateName} rejoint la team.`);
    } else {
      addLog(`❌ Recrutement échoué : ${r.candidateName} refuse l'offre.`);
    }
  }
  saveState(); render();
}

// ── NPC CHAT ─────────────────────────────────────────────
async function talkToNpc() {
  const msg = ui.npcMessage.value.trim();
  if (!msg) return;
  ui.npcMessage.value = '';
  const npc = state.npcs.find(n => n.name===state.selectedNpc) || state.npcs[0];
  if (/défi|dfi|combat|duel|challenge/i.test(msg)) {
    pendingNpcChallenge = npc;
    ui.challengeBody.textContent = `Acceptez-vous le défi de ${npc.name} ?`;
    ui.challengeOverlay.classList.remove('hidden');
    return;
  }
  const fallback = `${npc.name} : La base tourne, reste efficace.`;
  const answer = await callOllama(`${buildNpcSystemPrompt(npc)}\n\nMessage reçu : "${msg}"\nRéponds en une phrase.`, fallback);
  addLog(`CHAT → ${msg}`); addLog(answer);
  saveState(); render();
}

async function acceptNpcChallenge() {
  ui.challengeOverlay.classList.add('hidden');
  const npc = pendingNpcChallenge; pendingNpcChallenge = null;
  if (!npc) return;
  addLog(`Défi accepté contre ${npc.name}.`);
  let result;
  try {
    const res = await fetch('http://localhost:8081/api/pokellmon/resolve', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ mode:'npc-challenge', player:{name:`${state.profile.firstName} ${state.profile.lastName}`,team:['ekans','koffing','zubat']}, npc:{name:npc.name,team:['pikachu','pidgeotto','rattata']} }),
    });
    if (res.ok) result = (await res.json()).summary;
  } catch {}
  if (!result) result = pick(['Victoire Rocket au tour 7.','Défaite Rocket, repli stratégique.','Match nul brutal.']);
  addLog(`Résultat : ${result}`);
  saveState(); render();
}
function refuseNpcChallenge() {
  ui.challengeOverlay.classList.add('hidden');
  if (pendingNpcChallenge) addLog(`Défi refusé. ${pendingNpcChallenge.name} se moque de toi.`);
  pendingNpcChallenge = null; saveState(); render();
}

// ── SAVE/EXPORT ──────────────────────────────────────────
function exportFile(filename, content) {
  const blob = new Blob([content],{type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
}

function openIntro() {
  ui.spriteSelect.innerHTML = TRAINER_SPRITES.map((src,i) => `<option value="${src}">Sprite ${i+1}</option>`).join('');
  ui.teamInput.value=state.profile.team; ui.firstNameInput.value=state.profile.firstName;
  ui.lastNameInput.value=state.profile.lastName; ui.spriteSelect.value=state.profile.sprite;
  ui.spritePreview.src=state.profile.sprite;
}

function bindEvents() {
  // Helper: safe bind — skip if element is null
  const on = (el, evt, fn) => { if (el) el[evt] = fn; };
  const listen = (el, evt, fn) => { if (el) el.addEventListener(evt, fn); };

  on(ui.nextTurnBtn,           'onclick', processTurn);
  on(ui.assignTeamBtn,         'onclick', assignTeam);
  on(ui.startTrainingFightBtn, 'onclick', runTrainingBattle);
  on(ui.sendRecruitBtn,        'onclick', recruitStep);
  listen(ui.recruitMessage, 'keydown', e => { if(e.key==='Enter') recruitStep(); });
  on(ui.npcSendBtn, 'onclick', talkToNpc);
  listen(ui.npcMessage, 'keydown', e => { if(e.key==='Enter') talkToNpc(); });
  on(ui.challengeYesBtn,  'onclick', acceptNpcChallenge);
  on(ui.challengeNoBtn,   'onclick', refuseNpcChallenge);
  on(ui.openSettingsBtn,  'onclick', () => ui.settingsOverlay.classList.remove('hidden'));
  on(ui.closeSettingsBtn, 'onclick', () => ui.settingsOverlay.classList.add('hidden'));
  on(ui.spriteSelect, 'onchange', () => { ui.spritePreview.src = ui.spriteSelect.value; });
  on(ui.introStartBtn, 'onclick', () => {
    state.profile.team=ui.teamInput.value.trim()||'Team Rocket';
    state.profile.firstName=ui.firstNameInput.value.trim()||'Ari';
    state.profile.lastName=ui.lastNameInput.value.trim()||'Voss';
    state.profile.sprite=ui.spriteSelect.value;
    state.profile.initialized=true;
    addLog(`Profil créé : ${state.profile.firstName} ${state.profile.lastName} — ${state.profile.team}`);
    saveState(); render();
  });
  on(ui.llmEnabledToggle, 'onchange', () => { settings.llmEnabled=ui.llmEnabledToggle.checked; saveSettings(); render(); });
  on(ui.baseUrlInput, 'onchange', () => { settings.baseUrl=ui.baseUrlInput.value.trim(); saveSettings(); });
  on(ui.modelInput,   'onchange', () => { settings.model=ui.modelInput.value.trim(); saveSettings(); });
  if (ui.testOllamaBtn) ui.testOllamaBtn.onclick = async () => {
    try {
      const r = await fetch(`${settings.baseUrl.replace(/\/$/,'')}/api/tags`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      ui.llmStatus.textContent = `OK — ${data.models?.map(m=>m.name.slice(0,8)).join(', ')}`;
    } catch(e) { ui.llmStatus.textContent = `Erreur Ollama : ${e.message}`; }
  };
  on(ui.saveBtn,       'onclick', () => { saveState(); if(ui.llmStatus) ui.llmStatus.textContent='Save locale OK'; });
  on(ui.loadBtn,       'onclick', () => { const l=loadState(); if(l){state=l;render();} });
  on(ui.resetBtn,      'onclick', () => { localStorage.removeItem('pokeforge.rocket-hq.state'); state=structuredClone(BASE_STATE); openIntro(); addLog('Bienvenue dans Rocket HQ.'); render(); });
  on(ui.exportSaveBtn, 'onclick', () => exportFile('rocket-hq-save.txt', JSON.stringify(state,null,2)));
  on(ui.importSaveBtn, 'onclick', () => ui.saveFileInput?.click());
  if (ui.saveFileInput) ui.saveFileInput.onchange = () => {
    const file = ui.saveFileInput.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { try { state={...structuredClone(BASE_STATE),...JSON.parse(reader.result)}; addLog('Save importée.'); saveState(); render(); } catch { if(ui.llmStatus) ui.llmStatus.textContent='Fichier invalide.'; } };
    reader.readAsText(file); ui.saveFileInput.value='';
  };
  on(ui.exportCodeBtn, 'onclick', () => { const code=btoa(unescape(encodeURIComponent(JSON.stringify(state)))); navigator.clipboard?.writeText(code); if(ui.llmStatus) ui.llmStatus.textContent=`Code copié : ${code.slice(0,36)}…`; });
  on(ui.importCodeBtn, 'onclick', () => { const code=prompt('Colle le code :'); if(!code) return; try { state={...structuredClone(BASE_STATE),...JSON.parse(decodeURIComponent(escape(atob(code.trim()))))}; addLog('Save importée via code.'); saveState(); render(); } catch { if(ui.llmStatus) ui.llmStatus.textContent='Code invalide.'; } });
  on(ui.exportLogsBtn, 'onclick', () => exportFile('rocket-hq-logs.txt', state.log.join('\n')));
}

// ── BOOT (déplacé en fin de fichier pour éviter les erreurs de hoisting) ──


// ============================================================
// MODULE v4.01 — WORLD VIEW
// ============================================================

// ============================================================
// PATCH v4.01 — WORLD VIEW MODULE
// À injecter dans app.js après les déclarations de constantes
// ============================================================

// ── WORLD VIEW CONFIG ────────────────────────────────────
const WORLD_POKEMON_POOL = [
  { fr:'abo',       en:'ekans',    rarity:0.6 },
  { fr:'nosferapti',en:'zubat',    rarity:0.6 },
  { fr:'smogo',     en:'koffing',  rarity:0.5 },
  { fr:'miaouss',   en:'meowth',   rarity:0.5 },
  { fr:'fantominus',en:'gastly',   rarity:0.3 },
  { fr:'magneti',   en:'magnemite',rarity:0.3 },
  { fr:'voltorbe',  en:'voltorb',  rarity:0.25 },
  { fr:'soporifik', en:'drowzee',  rarity:0.2 },
  { fr:'osselait',  en:'cubone',   rarity:0.2 },
  { fr:'magicarpe', en:'magikarp', rarity:0.15 },
  { fr:'nidoran♀',  en:'nidoran-f',rarity:0.15 },
  { fr:'ptéra',     en:'aerodactyl',rarity:0.04 },
  { fr:'mewtwo',    en:'mewtwo',   rarity:0.01 },
];

const ZONE_BACKGROUNDS = {
  default:   'linear-gradient(160deg,#1a0a2e 0%,#0d1a0d 60%,#0a0a1a 100%)',
  marais:    'linear-gradient(160deg,#0a1a0a 0%,#1a2a10 50%,#0a2a0a 100%)',
  grotte:    'linear-gradient(160deg,#1a1010 0%,#2a1a10 50%,#1a0808 100%)',
  silph:     'linear-gradient(160deg,#0a0a2a 0%,#1a1a3a 50%,#2a0a2a 100%)',
  safari:    'linear-gradient(160deg,#1a2a00 0%,#2a3a10 50%,#1a2a08 100%)',
  route:     'linear-gradient(160deg,#0a1a0a 0%,#1a2a1a 50%,#0a2a0a 100%)',
};

// ── WORLD VIEW STATE ─────────────────────────────────────
// Ajouté au BASE_STATE :
// worldPokemon: []  ← liste des pkm visibles dans la vue monde

function initWorldView() {
  if (!state.worldPokemon) state.worldPokemon = [];
}

// Spawn d'un Pokémon sauvage toutes les ~8s
let worldSpawnInterval = null;
function startWorldSpawner() {
  if (worldSpawnInterval) clearInterval(worldSpawnInterval);
  worldSpawnInterval = setInterval(() => {
    if (!state.profile.initialized) return;
    // Max 3 Pokémon à la fois dans la zone
    if ((state.worldPokemon||[]).length >= 3) return;
    spawnWorldPokemon();
  }, 16000);
}

function spawnWorldPokemon() {
  // Tirage pondéré par rareté
  const total = WORLD_POKEMON_POOL.reduce((s,p) => s+p.rarity, 0);
  let r = Math.random() * total;
  let chosen = WORLD_POKEMON_POOL[0];
  for (const p of WORLD_POKEMON_POOL) { r -= p.rarity; if (r <= 0) { chosen = p; break; } }

  const entry = {
    uid:    `wp-${Date.now()}-${Math.floor(Math.random()*9999)}`,
    fr:     chosen.fr,
    en:     chosen.en,
    x:      15 + Math.random() * 70, // % de la largeur de la bande
    level:  3 + Math.floor(Math.random() * 12),
    spawnedAt: Date.now(),
    ttl:    12000, // disparaît après 12s
  };
  state.worldPokemon = [...(state.worldPokemon||[]), entry];
  renderWorldView();

  // Auto-disparition
  setTimeout(() => {
    state.worldPokemon = (state.worldPokemon||[]).filter(p => p.uid !== entry.uid);
    renderWorldView();
  }, entry.ttl);
}

function tryCapture(uid) {
  const pkm = (state.worldPokemon||[]).find(p => p.uid === uid);
  if (!pkm) return;

  const cost = 50; // Pokédollars
  if (state.resources.pokedollars < cost) {
    addLog(lang==='fr' ? `Pas assez de Pokédollars pour capturer ! (50₽ requis)` : `Not enough Pokédollars to capture! (50₽ needed)`);
    return;
  }

  state.resources.pokedollars -= cost;
  state.worldPokemon = (state.worldPokemon||[]).filter(p => p.uid !== uid);

  // Taux de succès : 40% + 1% par point de réputation
  const chance = 40 + (state.reputation || 0);
  const success = Math.random() * 100 < chance;

  if (success) {
    const newPkm = makePokemon(pkm.fr, pkm.level);
    state.pokemons.push(newPkm);
    state.newPokemonsThisTurn.push(newPkm);
    updatePokedex(pkm.fr);
    addLog(lang==='fr'
      ? `⚡ Capture réussie : ${pkm.fr} Nv.${pkm.level} !`
      : `⚡ Captured: ${pkm.fr} Lv.${pkm.level}!`);
    showCaptureFlash(true, pkm.fr);
  } else {
    addLog(lang==='fr'
      ? `💨 ${pkm.fr} a fui ! (-50₽)`
      : `💨 ${pkm.fr} fled! (-50₽)`);
    showCaptureFlash(false, pkm.fr);
  }
  saveState(); render();
}

function showCaptureFlash(success, name) {
  const band = document.getElementById('worldBand');
  if (!band) return;
  const flash = document.createElement('div');
  flash.style.cssText = `
    position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
    background:${success?'rgba(112,224,164,0.9)':'rgba(255,68,102,0.85)'};
    color:#000;font-family:'Press Start 2P',monospace;font-size:.65em;
    padding:8px 14px;border-radius:8px;z-index:20;pointer-events:none;
    animation:flashFade 1.5s forwards;
  `;
  flash.textContent = success ? `✓ ${name} !` : `✗ ${name} fuit !`;
  band.appendChild(flash);
  setTimeout(() => flash.remove(), 1500);
}

function renderWorldView() {
  const band = document.getElementById('worldBand');
  if (!band) return;

  // Fond dynamique selon mission active
  const activeMission = (state.missions||[]).find(m => m.turnsLeft > 0);
  const activeDef = activeMission ? MISSIONS.find(x => x.id === activeMission.missionId) : null;
  const zoneBg = ZONE_BACKGROUNDS[activeDef?.zone || 'default'];
  band.style.background = zoneBg;

  // Nettoie les sprites existants (garder QG)
  band.querySelectorAll('.world-pokemon,.world-capture-anim').forEach(el => el.remove());

  // Pokémon dans la bande
  (state.worldPokemon||[]).forEach(pkm => {
    const el = document.createElement('div');
    el.className = 'world-pokemon';
    el.style.cssText = `left:${pkm.x}%;`;
    el.innerHTML = `
      <img src="https://play.pokemonshowdown.com/sprites/gen5/${pkm.en}.png"
           style="width:48px;height:48px;image-rendering:pixelated;">
      <div style="font-size:.45em;text-align:center;margin-top:2px;color:#ffcc5a">${pkm.fr}<br>Nv.${pkm.level}</div>
    `;
    el.onclick = () => tryCapture(pkm.uid);
    band.appendChild(el);
  });
}


// ============================================================
// MODULE v4.02 — MISSION SIMULATION
// ============================================================

// ============================================================
// PATCH v4.02 — MISSION SIMULATION MODULE
// ============================================================

const ZONE_BG_STYLES = {
  default: { bg:'#0d1a0d', label:'Kanto', stars:true },
  marais:  { bg:'linear-gradient(160deg,#0a1a06 0%,#142a08 100%)', label:'Marais Cramois', stars:false },
  grotte:  { bg:'linear-gradient(160deg,#140a06 0%,#2a1408 100%)', label:'Grotte Sombre', stars:false },
  silph:   { bg:'linear-gradient(160deg,#06060a 0%,#14143a 100%)', label:'Tour Silph Co.', stars:true },
  safari:  { bg:'linear-gradient(160deg,#0a1a00 0%,#1a2a08 100%)', label:'Zone Safari', stars:false },
  route:   { bg:'linear-gradient(160deg,#0a1a0a 0%,#182a18 100%)', label:'Route 1', stars:false },
  centre:  { bg:'linear-gradient(160deg,#180a1a 0%,#0a0a18 100%)', label:'Centre Pokémon', stars:true },
  labo:    { bg:'linear-gradient(160deg,#0a0f1a 0%,#1a2a3a 100%)', label:'Laboratoire Chen', stars:false },
  arene:   { bg:'linear-gradient(160deg,#1a0a06 0%,#3a1a08 100%)', label:'Arène de Jadielle', stars:false },
  sommet:  { bg:'linear-gradient(160deg,#1a1a2a 0%,#0a0a1a 60%,#020208 100%)', label:'Mont Argenté', stars:true },
};

const MISSION_ZONE_MAP = {
  m1:'centre', m2:'grotte', m3:'safari', m4:'silph', m5:'route', m6:'grotte',
  m_vol_centre:'centre', m_vol_dresseur:'route',
  m_raid_marais:'marais', m_raid_safari:'safari', m_raid_grotte:'grotte',
  m_trafic_fossiles:'grotte', m_silph:'silph',
  m_event_legendaire:'default',
  // Antagonistes
  m_antag_chen_labo:'labo', m_antag_chen_conf:'centre',
  m_antag_silver_embu:'route', m_antag_silver_vol:'grotte',
  m_antag_blue_arene:'arene',
  // Boss
  m_boss_red:'sommet',
};

// Dialogues de simulation par phase (FR/EN)
const SIM_DIALOGUES = {
  fr: {
    approach: [
      "On approche de la zone. Silence.",
      "La cible est en vue. On reste groupés.",
      "Aucun agent ennemi détecté. On y va.",
    ],
    combat: [
      "Allez, montre-leur ce qu'on vaut !",
      "Fonce ! Ne leur laisse pas le temps !",
      "Tiens bon ! On n'abandonne pas !",
    ],
    success: [
      "Mission accomplie. Repli immédiat.",
      "Bien joué. Giovanni sera satisfait.",
      "On a ce qu'on est venu chercher.",
    ],
    failure: [
      "Retraite ! On se retrouve au QG.",
      "Maudit soit ce jour. On se replie.",
      "On reviendra. Mais pas aujourd'hui.",
    ],
    jenny: [
      "L'Agent Jenny ! Vite, fuyez !",
      "Police ! Abandonnez le butin et courez !",
    ],
    pkm_appears: [
      "Un Pokémon sauvage surgit !",
      "Attention, Pokémon hostile !",
    ],
  },
  en: {
    approach: [
      "Approaching the zone. Silence.",
      "Target in sight. Stay together.",
      "No enemy agents detected. Let's go.",
    ],
    combat: [
      "Go, show them what we're worth!",
      "Charge! Don't give them time!",
      "Hold on! We don't give up!",
    ],
    success: [
      "Mission complete. Immediate retreat.",
      "Well done. Giovanni will be pleased.",
      "We got what we came for.",
    ],
    failure: [
      "Retreat! Meet at HQ.",
      "Damn this day. We fall back.",
      "We'll be back. But not today.",
    ],
    jenny: [
      "Officer Jenny! Run!",
      "Police! Drop everything and run!",
    ],
    pkm_appears: [
      "A wild Pokémon appears!",
      "Hostile Pokémon!",
    ],
  },
};

// ── POPUP MISSION RÉSOLUTION ──────────────────────────
function showMissionPopup(missionDef, agentObj, result) {
  const L = SIM_DIALOGUES[lang] || SIM_DIALOGUES.fr;
  const zone = MISSION_ZONE_MAP[missionDef.id] || 'default';
  const zoneDef = ZONE_BG_STYLES[zone] || ZONE_BG_STYLES.default;
  const steps = buildSimSteps(missionDef, agentObj, result, L);

  const popup = document.createElement('div');
  popup.id = 'missionSimPopup';
  popup.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:100;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:16px;font-family:'Press Start 2P',monospace;
  `;

  popup.innerHTML = `
    <div style="width:min(900px,98vw);background:#0f0c1e;border:2px solid #7866d1;border-radius:12px;overflow:hidden;">
      <!-- Bande de simulation -->
      <div id="simBand" style="
        width:100%;height:170px;position:relative;
        background:${zoneDef.bg};transition:background 0.8s;
        border-bottom:2px solid #4a3a8a;overflow:hidden;
      ">
        <div style="position:absolute;top:8px;left:12px;font-size:.45em;color:#ffcc5a;letter-spacing:.1em">${zoneDef.label}</div>
        <!-- Agent sprite -->
        ${agentObj?.sprite ? `<img id="simAgentSprite" src="${agentObj.sprite}"
          style="position:absolute;bottom:16px;left:14%;width:56px;image-rendering:pixelated;
          animation:simFloat 2.5s ease-in-out infinite;">` : ''}
        <!-- Pokémon slot allié (back sprites) -->
        <div id="simAllySlot" style="position:absolute;bottom:16px;left:28%;display:flex;gap:6px;"></div>
        <!-- Pokémon slot ennemi -->
        <div id="simEnemySlot" style="position:absolute;bottom:16px;right:14%;display:flex;gap:8px;"></div>
        <!-- Bulle de dialogue -->
        <div id="simBubble" style="
          position:absolute;top:10px;left:50%;transform:translateX(-50%);
          background:rgba(255,255,255,0.92);color:#0a0812;
          padding:6px 12px;border-radius:8px;font-size:.42em;
          max-width:55%;text-align:center;white-space:normal;line-height:1.6;
          display:none;
        "></div>
      </div>
      <!-- Corps -->
      <div style="padding:16px;display:grid;gap:10px;">
        <div style="font-size:.6em;color:#ffcc5a;letter-spacing:.1em">${missionDef.nom?.[lang]||missionDef.nom?.fr||missionDef.id}</div>
        <div id="simLog" style="font-size:.42em;color:#b9adff;line-height:2;min-height:60px;"></div>
        <div id="simRewards" style="display:none;font-size:.48em;color:#70e0a4;line-height:2;"></div>
        <div id="simContinueBtn" style="display:none;text-align:center;">
          <button onclick="closeMissionPopup()" style="
            font-family:'Press Start 2P',monospace;font-size:.55em;
            background:#ffcc5a;border:2px solid #000;padding:10px 24px;
            border-radius:8px;cursor:pointer;
          ">${lang==='fr'?'CONTINUER':'CONTINUE'} →</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  // Injection CSS animation si absente
  if (!document.getElementById('simAnimStyle')) {
    const s = document.createElement('style');
    s.id = 'simAnimStyle';
    s.textContent = `
      @keyframes simFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @keyframes simPop{0%{transform:scale(0)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
      @keyframes simShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
    `;
    document.head.appendChild(s);
  }

  // Joue les étapes de simulation
  playSimSteps(steps, 0);
}

// Génère une réplique personnalisée basée sur la personnalité de l'agent
function agentLine(agentObj, phase, L) {
  const name = agentObj?.name || '???';
  const phrases = agentObj?.catch_phrases || [];
  const traits = agentObj?.personality || [];

  const PERSONALITY_LINES = {
    fr: {
      approach: {
        loyal:        "Je ne vous décevrai pas, chef.",
        discret:      "Pas un bruit. On avance.",
        intelligent:  "J'ai analysé la zone. On est prêts.",
        froid:        "Aucune émotion. Juste l'objectif.",
        brutal:       "J'ai hâte d'en découdre.",
        rusé:         "Ils ne nous verront pas venir.",
        courageux:    "Pas de peur. En avant.",
        nerveux:      "J-j'espère que ça va aller…",
        ambitieux:    "Cette mission fera ma réputation.",
        calculateur:  "Tout est en place. Exécution.",
      },
      combat: {
        loyal:        "Pour la Team Rocket !",
        discret:      "Vite, avant qu'on nous repère !",
        intelligent:  "Exploitons leur point faible.",
        froid:        "Pas de pitié.",
        brutal:       "CHARGEZ !!!",
        rusé:         "Feinte à droite, attaque à gauche.",
        courageux:    "On n'abandonne jamais !",
        nerveux:      "T-tenez bon !",
        ambitieux:    "Je vais leur montrer !",
        calculateur:  "Phase deux. Maintenant.",
      },
      success: {
        loyal:        "Mission accomplie. Le boss sera fier.",
        discret:      "On s'éclipse avant d'être repérés.",
        intelligent:  "Résultat optimal, comme prévu.",
        froid:        "Objectif atteint. On rentre.",
        brutal:       "Haha ! Trop facile.",
        rusé:         "Ils n'ont rien compris. Parfait.",
        courageux:    "On l'a fait ! Bien joué !",
        nerveux:      "O-ouf… on a réussi.",
        ambitieux:    "Une victoire de plus à mon palmarès.",
        calculateur:  "Exactement selon le plan.",
      },
      failure: {
        loyal:        "Je suis désolé, chef…",
        discret:      "Repli silencieux. On recommencera.",
        intelligent:  "Il faut revoir notre stratégie.",
        froid:        "Échec. Inutile de s'attarder.",
        brutal:       "Raaah ! Ils me le paieront !",
        rusé:         "Hmm… je n'avais pas prévu ça.",
        courageux:    "On se relève et on repart.",
        nerveux:      "J-je savais que ça tournerait mal…",
        ambitieux:    "Ce n'est qu'un revers temporaire.",
        calculateur:  "Erreur de calcul. À corriger.",
      },
    },
    en: {
      approach: {
        loyal:        "I won't let you down, boss.",
        discret:      "Not a sound. Move forward.",
        intelligent:  "I've analyzed the zone. We're ready.",
        froid:        "No emotions. Just the target.",
        brutal:       "I can't wait to fight.",
        rusé:         "They won't see us coming.",
        courageux:    "No fear. Let's go.",
        nerveux:      "I-I hope this goes well…",
        ambitieux:    "This mission will make my name.",
        calculateur:  "Everything is in place. Execute.",
      },
      combat: {
        loyal:        "For Team Rocket!",
        discret:      "Quick, before they spot us!",
        intelligent:  "Let's exploit their weakness.",
        froid:        "No mercy.",
        brutal:       "CHARGE!!!",
        rusé:         "Feint right, strike left.",
        courageux:    "We never give up!",
        nerveux:      "H-hold on!",
        ambitieux:    "I'll show them!",
        calculateur:  "Phase two. Now.",
      },
      success: {
        loyal:        "Mission complete. The boss will be proud.",
        discret:      "Let's vanish before they notice.",
        intelligent:  "Optimal result, as expected.",
        froid:        "Target acquired. Heading back.",
        brutal:       "Haha! Too easy.",
        rusé:         "They didn't see it coming. Perfect.",
        courageux:    "We did it! Well done!",
        nerveux:      "P-phew… we made it.",
        ambitieux:    "Another victory for my record.",
        calculateur:  "Exactly according to plan.",
      },
      failure: {
        loyal:        "I'm sorry, boss…",
        discret:      "Silent retreat. We'll try again.",
        intelligent:  "We need to rethink our strategy.",
        froid:        "Failed. No point dwelling on it.",
        brutal:       "Grrr! They'll pay for this!",
        rusé:         "Hmm… I didn't see that coming.",
        courageux:    "We get back up and try again.",
        nerveux:      "I-I knew this would go wrong…",
        ambitieux:    "Just a temporary setback.",
        calculateur:  "Miscalculation. Needs correction.",
      },
    },
  };

  const pLines = PERSONALITY_LINES[lang] || PERSONALITY_LINES.fr;
  const phaseLines = pLines[phase] || {};

  // Cherche une réplique basée sur le premier trait reconnu
  for (const trait of traits) {
    if (phaseLines[trait]) return `${name} : "${phaseLines[trait]}"`;
  }

  // Fallback: catch phrase ou dialogue générique
  if (phrases.length && (phase === 'approach' || phase === 'combat')) {
    return `${name} : "${pick(phrases)}"`;
  }
  return `${name} : "${pick(L[phase])}"`;
}

function buildSimSteps(missionDef, agentObj, result, L) {
  const steps = [];
  const enemies = getMissionEnemyPokemon(missionDef);
  const name = agentObj?.name || '???';

  // Approche : dialogue générique + réplique perso de l'agent
  steps.push({ type:'log',    text: pick(L.approach) });
  steps.push({ type:'bubble', text: agentLine(agentObj, 'approach', L), speaker: name });

  if (enemies.length) {
    steps.push({ type:'log',     text: pick(L.pkm_appears) });
    steps.push({ type:'showPkm', pokemons: enemies });
    // Affiche aussi les Pokémon alliés de l'agent
    if (agentObj?.team?.length) {
      const allyPkm = agentObj.team.map(id => {
        const p = state.pokemons.find(x => x.id === id);
        return p ? (FR_TO_EN[(p.species_fr||'').toLowerCase()] || p.species_en || 'pikachu') : null;
      }).filter(Boolean);
      if (allyPkm.length) steps.push({ type:'showAllyPkm', pokemons: allyPkm });
    }
  }

  // Combat — détails de puissance
  const agentLevel = agentObj?.level || 1;
  const teamSize = agentObj?.team?.length || 0;
  const teamPower = teamSize * 10 + agentLevel * 5 + (state.reputation||0) * 0.5;
  const enemyPower = enemies.length * 15 + (missionDef.risque === 'élevé' ? 30 : missionDef.risque === 'moyen' ? 15 : 5);
  const powerRatio = teamPower / Math.max(1, enemyPower);

  const combatInfoFr = `⚡ Puissance : ${Math.round(teamPower)} vs ${Math.round(enemyPower)} · Ratio : ${powerRatio.toFixed(1)}x`;
  const combatInfoEn = `⚡ Power: ${Math.round(teamPower)} vs ${Math.round(enemyPower)} · Ratio: ${powerRatio.toFixed(1)}x`;
  steps.push({ type:'log', text: lang==='fr' ? combatInfoFr : combatInfoEn });

  steps.push({ type:'bubble', text: agentLine(agentObj, 'combat', L), speaker: name });
  steps.push({ type:'log',    text: pick(L.combat) });

  // Narration de combat détaillée
  if (teamSize > 0) {
    const combatNarrFr = [
      'Les Pokémon échangent des coups !', 'Le combat fait rage !',
      'Une attaque critique touche sa cible !', 'Esquive réussie !',
      'Les deux camps se jaugent…', 'Attaque combinée !',
    ];
    const combatNarrEn = [
      'The Pokémon exchange blows!', 'The battle rages on!',
      'A critical hit lands!', 'Dodge successful!',
      'Both sides size each other up…', 'Combined attack!',
    ];
    steps.push({ type:'log', text: `⚔️ ${pick(lang==='fr' ? combatNarrFr : combatNarrEn)}` });
  }

  // ── Antagoniste ─────────────────────────────────────
  if (result.antagonist) {
    const antag = result.antagonist;
    const antagName = antag.name[lang] || antag.name.fr;
    const antagPhrases = antag.catch_phrases[lang] || antag.catch_phrases.fr;
    const antagPkm = antag.possible_pokemon || [];

    // Apparition de l'antagoniste
    steps.push({ type:'shake' });
    const appearMsg = lang === 'fr'
      ? `⚔️ ${antagName} apparaît et bloque le chemin !`
      : `⚔️ ${antagName} appears and blocks the way!`;
    steps.push({ type:'log', text: appearMsg });
    steps.push({ type:'showAntagonist', sprite: antag.sprite, name: antagName });
    steps.push({ type:'bubble', text: `${antagName} : "${pick(antagPhrases)}"`, speaker: antagName });

    // Pokémon de l'antagoniste
    if (antagPkm.length) {
      const enPkm = antagPkm.map(fr => FR_TO_EN[fr] || fr);
      steps.push({ type:'showPkm', pokemons: enPkm.slice(0, 3) });
    }

    // Réplique de combat de l'antagoniste
    steps.push({ type:'bubble', text: `${antagName} : "${pick(antagPhrases)}"`, speaker: antagName });

    // Réaction de notre agent
    const reactMsg = result.success
      ? (lang==='fr' ? `${name} : "On ne se laissera pas faire !"` : `${name}: "We won't back down!"`)
      : (lang==='fr' ? `${name} : "Il est trop fort… Repli !"` : `${name}: "Too strong… Fall back!"`);
    steps.push({ type:'bubble', text: reactMsg, speaker: name });

    // Boss Red : dialogue spécial
    if (result.isBoss && result.bossVictory) {
      steps.push({ type:'shake' });
      const bossMsg = lang === 'fr'
        ? '🏆 RED EST VAINCU ! La Team Rocket triomphe !'
        : '🏆 RED IS DEFEATED! Team Rocket triumphs!';
      steps.push({ type:'log', text: bossMsg });
      steps.push({ type:'bubble', text: 'Red : "…"', speaker: 'Red' });
    }
  }

  // Jenny
  if (result.jennyEvent) {
    steps.push({ type:'log',    text: pick(L.jenny) });
    steps.push({ type:'bubble', text: pick(L.jenny), speaker: 'Jenny' });
    steps.push({ type:'shake' });
  }

  // Résultat
  const phase = result.success ? 'success' : 'failure';
  steps.push({ type:'log',    text: pick(L[phase]) });
  steps.push({ type:'bubble', text: agentLine(agentObj, phase, L), speaker: name });
  steps.push({ type:'rewards', result });

  return steps;
}

function getMissionEnemyPokemon(missionDef) {
  const zone = MISSION_ZONE_MAP[missionDef.id] || 'default';
  const pools = {
    marais:  ['poliwag','psyduck','tentacool','grimer','koffing','ekans','oddish'],
    grotte:  ['geodude','zubat','onix','machop','cubone','rhyhorn','diglett'],
    silph:   ['porygon','electrode','magneton','voltorb','magnemite','alakazam'],
    safari:  ['tauros','kangaskhan','scyther','pinsir','nidoran-f','nidoran-m','chansey'],
    route:   ['pidgey','rattata','spearow','caterpie','weedle','pikachu','mankey'],
    centre:  ['chansey','clefairy','jigglypuff','happiny','wigglytuff','audino'],
    labo:    ['eevee','porygon','bulbasaur','charmander','squirtle','ditto'],
    arene:   ['arcanine','machamp','alakazam','gyarados','pidgeot','exeggutor'],
    sommet:  ['pikachu','charizard','blastoise','venusaur','snorlax','lapras'],
    default: ['rattata','pidgey','zubat','meowth'],
  };
  const pool = pools[zone] || pools.default;
  // 1 à 2 Pokémon ennemis selon la difficulté
  const count = (missionDef.risque === 'élevé') ? 2 : 1;
  const result = [];
  for (let i = 0; i < count; i++) result.push(pick(pool));
  return result;
}

let simStepTimeout = null;
function playSimSteps(steps, idx) {
  if (idx >= steps.length) return;
  const step = steps[idx];
  const delay = 1200;

  const logEl    = document.getElementById('simLog');
  const bubbleEl = document.getElementById('simBubble');
  const enemyEl  = document.getElementById('simEnemySlot');

  if (step.type === 'log' && logEl) {
    logEl.innerHTML += `<div>▶ ${step.text}</div>`;
  }
  if (step.type === 'bubble' && bubbleEl) {
    const speakerTag = step.speaker ? `<span style="color:#ffcc5a;font-size:.9em;font-weight:bold">${step.speaker}</span><br>` : '';
    bubbleEl.innerHTML = speakerTag + step.text;
    bubbleEl.style.display = 'block';
    setTimeout(() => { if (bubbleEl) bubbleEl.style.display = 'none'; }, 2800);
  }
  if (step.type === 'showPkm' && enemyEl) {
    enemyEl.innerHTML = step.pokemons.map(en => `
      <div style="display:flex;flex-direction:column;align-items:center;animation:simPop .4s">
        <img src="https://play.pokemonshowdown.com/sprites/gen5/${en}.png"
             style="width:48px;image-rendering:pixelated;">
        <span style="font-size:.35em;color:#ff6b6b;margin-top:2px">${en}</span>
      </div>`).join('');
  }
  if (step.type === 'showAllyPkm') {
    // Affiche les Pokémon alliés côté gauche
    const allyEl = document.getElementById('simAllySlot');
    if (allyEl) {
      allyEl.innerHTML = step.pokemons.map(en => `
        <div style="display:flex;flex-direction:column;align-items:center;animation:simPop .4s">
          <img src="https://play.pokemonshowdown.com/sprites/gen5-back/${en}.png"
               style="width:48px;image-rendering:pixelated;">
          <span style="font-size:.35em;color:#70e0a4;margin-top:2px">${en}</span>
        </div>`).join('');
    }
  }
  if (step.type === 'showAntagonist') {
    // Affiche le sprite de l'antagoniste côté droit, au-dessus des Pokémon
    const band = document.getElementById('simBand');
    if (band) {
      let antagEl = document.getElementById('simAntagSprite');
      if (!antagEl) {
        antagEl = document.createElement('div');
        antagEl.id = 'simAntagSprite';
        antagEl.style.cssText = 'position:absolute;bottom:16px;right:5%;display:flex;flex-direction:column;align-items:center;animation:simPop .5s;';
        band.appendChild(antagEl);
      }
      antagEl.innerHTML = `
        <img src="${step.sprite}" style="width:64px;image-rendering:pixelated;">
        <span style="font-size:.4em;color:#ff4444;margin-top:2px;font-weight:bold">${step.name}</span>
      `;
    }
  }
  if (step.type === 'shake') {
    const band = document.getElementById('simBand');
    if (band) { band.style.animation='simShake .5s'; setTimeout(()=>{band.style.animation='';},600); }
  }
  if (step.type === 'rewards') {
    const rewardEl = document.getElementById('simRewards');
    const contBtn  = document.getElementById('simContinueBtn');
    if (rewardEl) {
      const r = step.result;
      let html = '';

      // Boss victory banner
      if (r.bossVictory) {
        html += `<div style="color:#ffcc5a;font-size:1.2em;margin-bottom:8px">🏆 ${lang==='fr'?'VICTOIRE ULTIME !':'ULTIMATE VICTORY!'}</div>`;
      }

      html += r.success
        ? `<div style="color:#70e0a4;font-size:1.1em;margin-bottom:4px">${lang==='fr' ? '✅ MISSION RÉUSSIE' : '✅ MISSION SUCCESS'}</div>`
        : `<div style="color:#ff4466;font-size:1.1em;margin-bottom:4px">${lang==='fr' ? '❌ MISSION ÉCHOUÉE' : '❌ MISSION FAILED'}</div>`;

      // Antagoniste info
      if (r.antagonist) {
        const antagName = r.antagonist.name[lang] || r.antagonist.name.fr;
        html += r.success
          ? `<div>⚔️ ${antagName} ${lang==='fr'?'repoussé !':'driven back!'} <span style="color:#70e0a4">+5 rep, +30 XP</span></div>`
          : `<div>⚔️ ${antagName} ${lang==='fr'?'vous a dominé.':'overpowered you.'}</div>`;
      }

      // Giovanni bonus
      if (r.giovanniComment) {
        html += `<div style="color:#ffcc5a">👔 ${r.giovanniComment}</div>`;
        if (r.giovanniBonus) html += `<div style="color:#70e0a4">💰 Bonus Giovanni : +${r.giovanniBonus}₽</div>`;
      }

      // Rewards breakdown
      html += '<div style="margin-top:6px;border-top:1px solid #4a3a8a;padding-top:4px">';
      if (r.pokedollars) html += `<div>💰 +${r.pokedollars} Pokédollars</div>`;
      if (r.intel)       html += `<div>🔍 +${r.intel} Intel</div>`;
      if (r.pokemon?.length) {
        r.pokemon.forEach(p => {
          const stars = (p.stars||0) > 0 ? ` ${'★'.repeat(p.stars)}` : '';
          html += `<div>🎯 ${lang==='fr'?'Capturé':'Captured'} : ${p.species_fr} Nv.${p.level}${stars}</div>`;
        });
      }
      if (r.losses?.length) {
        r.losses.forEach(l => {
          html += `<div style="color:#ff4466">💀 ${lang==='fr'?'Perdu':'Lost'} : ${l}</div>`;
        });
      }
      // Reputation change
      html += r.success
        ? `<div style="color:#70e0a4">📈 ${lang==='fr'?'Réputation':'Reputation'} +2</div>`
        : `<div style="color:#ff4466">📉 ${lang==='fr'?'Réputation':'Reputation'} -3</div>`;
      html += '</div>';
      rewardEl.innerHTML = html;
      rewardEl.style.display = 'block';
    }
    if (contBtn) contBtn.style.display = 'block';
    return; // stop auto-advance
  }

  simStepTimeout = setTimeout(() => playSimSteps(steps, idx+1), delay);
}

function closeMissionPopup() {
  if (simStepTimeout) clearTimeout(simStepTimeout);
  const popup = document.getElementById('missionSimPopup');
  if (popup) popup.remove();
}


// ============================================================
// MODULE v4.03 — MISSIONS V2
// ============================================================

// ============================================================
// PATCH v4.03 — MISSIONS V2
// Nouvelles missions, récompenses Pokémon, mort/capture Jenny
// Retrait salle de capture
// ============================================================

// ── MISSIONS V2 — CATALOGUE COMPLET ─────────────────────
const MISSIONS_V2 = [
  // ── VOL DE POKÉMON ────────────────────────────────────
  { id:'m_vol_centre',    zone:'centre', categorie:'vol',
    nom:      { fr:'Vol au Centre Pokémon',          en:'Pokémon Center Theft' },
    desc:     { fr:'Subtiliser les Pokémon hospitalisés.', en:'Steal hospitalized Pokémon.' },
    recompense:{ pokedollars:200, pokemon:['chansey','clefairy'], intel:1 },
    duree:2, risque:'faible', jennyRisk:0.15,
    pkmRewardPool: ['chansey','clefairy','jigglypuff'],
  },
  { id:'m_vol_dresseur',  zone:'route',  categorie:'vol',
    nom:      { fr:'Racket de dresseurs Route 1',    en:'Route 1 Trainer Mugging' },
    desc:     { fr:'Forcer les dresseurs à abandonner leurs Pokémon.', en:'Force trainers to surrender their Pokémon.' },
    recompense:{ pokedollars:300, pokemon:['pidgey','rattata'] },
    duree:1, risque:'faible', jennyRisk:0.1,
    pkmRewardPool: ['pidgey','rattata','spearow','ekans'],
  },

  // ── RAID DE ZONE ──────────────────────────────────────
  { id:'m_raid_marais',   zone:'marais', categorie:'raid',
    nom:      { fr:'Raid — Marais Cramois',           en:'Raid — Crimson Swamp' },
    desc:     { fr:'Capturer les Pokémon aquatiques du marais.', en:'Capture aquatic Pokémon from the swamp.' },
    recompense:{ pokedollars:400, capturePoints:2 },
    duree:2, risque:'moyen', jennyRisk:0.2,
    pkmRewardPool: ['psyduck','poliwag','tentacool','goldeen','slowpoke'],
  },
  { id:'m_raid_safari',   zone:'safari', categorie:'raid',
    nom:      { fr:'Infiltration — Zone Safari',     en:'Infiltration — Safari Zone' },
    desc:     { fr:'Braconner des espèces rares sous couverture.', en:'Poach rare species undercover.' },
    recompense:{ pokedollars:500, capturePoints:3 },
    duree:3, risque:'moyen', jennyRisk:0.3,
    pkmRewardPool: ['tauros','kangaskhan','scyther','pinsir','rhyhorn'],
  },
  { id:'m_raid_grotte',   zone:'grotte', categorie:'raid',
    nom:      { fr:'Fouille — Grotte Azurée',         en:'Sweep — Cerulean Cave' },
    desc:     { fr:"Explorer la grotte pour capturer ce qui s'y trouve.", en:'Explore the cave and capture whatever lurks.' },
    recompense:{ pokedollars:600, intel:2 },
    duree:3, risque:'élevé', jennyRisk:0.2,
    pkmRewardPool: ['zubat','geodude','onix','cubone','drowzee'],
  },

  // ── TRAFIC / CONTREBANDE ──────────────────────────────
  { id:'m_trafic_fossiles', zone:'grotte', categorie:'trafic',
    nom:      { fr:'Trafic de Fossiles',              en:'Fossil Trafficking' },
    desc:     { fr:'Revendre des fossiles volés au Musée de Jadielle.', en:'Resell stolen fossils at Pewter Museum.' },
    recompense:{ pokedollars:700, intel:2 },
    duree:3, risque:'moyen', jennyRisk:0.25,
    pkmRewardPool: [],
  },
  { id:'m_silph',           zone:'silph',  categorie:'trafic',
    nom:      { fr:'Opération Silph Co.',             en:'Silph Co. Operation' },
    desc:     { fr:"Prendre le contrôle d'un étage de la Tour Silph.", en:'Take control of one floor of Silph Tower.' },
    recompense:{ pokedollars:1000, intel:5, capturePoints:2 },
    duree:4, risque:'élevé', jennyRisk:0.35,
    pkmRewardPool: ['porygon','electrode','lapras'],
  },

  // ── ÉVÉNEMENTS SPÉCIAUX ───────────────────────────────
  { id:'m_event_legendaire', zone:'default', categorie:'event',
    nom:       { fr:'Rumeur — Signal Inconnu',        en:'Rumor — Unknown Signal' },
    desc:      { fr:"Un signal étrange vient d'une île au large...", en:'A strange signal from a distant island...' },
    recompense: { pokedollars:1500, intel:8 },
    duree:5, risque:'élevé', jennyRisk:0.4,
    pkmRewardPool: ['mew','mewtwo'],
    rare:true,
  },

  // ── MISSIONS ANTAGONISTES — Prof. Chen ────────────────
  { id:'m_antag_chen_labo', zone:'labo', categorie:'antagoniste',
    nom:      { fr:'Infiltration — Labo du Prof. Chen',     en:'Infiltration — Prof. Oak\'s Lab' },
    desc:     { fr:'Voler les données de recherche du Professeur Chen.', en:'Steal research data from Professor Oak\'s lab.' },
    recompense:{ pokedollars:600, intel:5 },
    duree:3, risque:'élevé', jennyRisk:0.3,
    pkmRewardPool: ['eevee','bulbasaur','charmander','squirtle'],
    antagonist: 'oak',
    antagonistChance: 0.6,
    rare: true,
  },
  { id:'m_antag_chen_conf', zone:'centre', categorie:'antagoniste',
    nom:      { fr:'Sabotage — Conférence Pokémon',         en:'Sabotage — Pokémon Conference' },
    desc:     { fr:'Perturber la conférence de Chen pour voler des prototypes.', en:'Disrupt Oak\'s conference to steal prototypes.' },
    recompense:{ pokedollars:800, intel:3 },
    duree:2, risque:'moyen', jennyRisk:0.25,
    pkmRewardPool: ['porygon','magnemite'],
    antagonist: 'oak',
    antagonistChance: 0.8,
    rare: true,
  },

  // ── MISSIONS ANTAGONISTES — Silver ────────────────────
  { id:'m_antag_silver_embu', zone:'route', categorie:'antagoniste',
    nom:      { fr:'Embuscade — Silver rôde',                en:'Ambush — Silver Lurks' },
    desc:     { fr:'Silver attaque nos agents sur la route. Ripostez.', en:'Silver is attacking our agents on the route. Strike back.' },
    recompense:{ pokedollars:500, intel:2 },
    duree:2, risque:'élevé', jennyRisk:0.1,
    pkmRewardPool: ['sneasel','murkrow','totodile'],
    antagonist: 'silver',
    antagonistChance: 1.0,
    rare: true,
  },
  { id:'m_antag_silver_vol', zone:'grotte', categorie:'antagoniste',
    nom:      { fr:'Représailles — Silver vole nos Pokémon', en:'Retaliation — Silver Steals Our Pokémon' },
    desc:     { fr:"Silver s'est introduit dans notre planque.", en:'Silver broke into our hideout.' },
    recompense:{ pokedollars:400, intel:1 },
    duree:1, risque:'élevé', jennyRisk:0.05,
    pkmRewardPool: [],
    antagonist: 'silver',
    antagonistChance: 1.0,
    rare: true,
  },

  // ── MISSIONS ANTAGONISTES — Blue ──────────────────────
  { id:'m_antag_blue_arene', zone:'arene', categorie:'antagoniste',
    nom:      { fr:'Défi — Arène de Jadielle',              en:'Challenge — Viridian Gym' },
    desc:     { fr:"Prendre le contrôle de l'Arène de Blue.", en:"Take control of Blue's Gym." },
    recompense:{ pokedollars:1200, intel:5, capturePoints:3 },
    duree:4, risque:'élevé', jennyRisk:0.35,
    pkmRewardPool: ['arcanine','alakazam','machamp'],
    antagonist: 'blue',
    antagonistChance: 1.0,
    rare: true,
  },

  // ── MISSION BOSS — Red ────────────────────────────────
  { id:'m_boss_red', zone:'sommet', categorie:'boss',
    nom:      { fr:'Assaut Final — Le Mont Argenté',         en:'Final Assault — Mt. Silver' },
    desc:     { fr:'Affronter Red au sommet du Mont Argenté. La victoire ultime.', en:'Face Red atop Mt. Silver. The ultimate victory.' },
    recompense:{ pokedollars:5000, intel:20, capturePoints:10 },
    duree:5, risque:'élevé', jennyRisk:0.1,
    pkmRewardPool: ['pikachu','charizard','blastoise','venusaur','snorlax','lapras'],
    antagonist: 'red',
    antagonistChance: 1.0,
    rare: true,
    boss: true,
  },
];

// Retire la salle de capture du state (migration douce)
function migrateRemoveCapture() {
  if (state.rooms && state.rooms.capture) {
    const pts = state.rooms.capture.level * 2;
    state.resources.pokedollars = (state.resources.pokedollars||0) + pts * 50;
    delete state.rooms.capture;
    addLog(lang==='fr'
      ? `Salle de Capture retirée — conversion : +${pts*50} Pokédollars.`
      : `Capture Room removed — converted to +${pts*50} Pokédollars.`);
  }
}

// Pool de missions disponibles — tirage parmi MISSIONS_V2
function rollAvailableMissionsV2() {
  const pool = MISSIONS_V2.filter(m => !m.rare);
  const shuffled = [...pool].sort(() => Math.random()-0.5);

  // Événement rare : 15% de chance d'apparaître
  const rares = MISSIONS_V2.filter(m => m.rare && !m.antagonist && !m.boss);
  if (Math.random() < 0.15 && rares.length) shuffled.unshift(pick(rares));

  // Missions antagonistes : injection conditionnelle
  const antagMissions = MISSIONS_V2.filter(m => m.antagonist && !m.boss);
  antagMissions.forEach(m => {
    const npcDef = LORE_NPCS[m.antagonist];
    if (!npcDef) return;
    const cond = npcDef.activation || {};
    // Conditions d'activation de l'antagoniste
    if (cond.minReputation !== undefined && (state.reputation||0) < cond.minReputation) return;
    if (cond.minTurn !== undefined && state.turn < cond.minTurn) return;
    // 20% de chance par tour qu'une mission antagoniste apparaisse
    if (Math.random() < 0.20) shuffled.unshift(m);
  });

  // Mission Boss Red : injection si conditions remplies et pas déjà vaincue
  if (!state.bossRedDefeated) {
    const bossMission = MISSIONS_V2.find(m => m.boss && m.antagonist === 'red');
    const redNpc = LORE_NPCS.red;
    if (bossMission && redNpc) {
      const cond = redNpc.activation || {};
      const repOk = cond.minReputation === undefined || (state.reputation||0) >= cond.minReputation;
      const turnOk = cond.minTurn === undefined || state.turn >= cond.minTurn;
      // 10% de chance par tour quand conditions remplies
      if (repOk && turnOk && Math.random() < 0.10) {
        shuffled.unshift(bossMission);
        addLog(lang==='fr'
          ? '⚠️ RED a été repéré au Mont Argenté ! Mission spéciale disponible.'
          : '⚠️ RED has been spotted on Mt. Silver! Special mission available.');
      }
    }
  }

  state.availableMissions = shuffled.slice(0, 4); // 4 slots pour laisser place aux missions spéciales
}

// Résolution d'une mission V2
function resolveMissionV2(mi) {
  const mDef = MISSIONS_V2.find(x => x.id === mi.missionId) || MISSIONS.find(x => x.id === mi.missionId);
  if (!mDef) return;
  const agent = state.agents.find(a => a.id === mi.agentId);

  // Succès basé sur réputation + level agent
  const agentLevel = agent?.level || 1;
  let baseChance = 35 + (state.reputation||0) * 0.6 + agentLevel * 5;

  // Malus antagoniste : les missions antagonistes sont plus dures
  const hasAntagonist = mDef.antagonist && Math.random() < (mDef.antagonistChance || 0.5);
  const antagonistNpc = hasAntagonist ? LORE_NPCS[mDef.antagonist] : null;
  if (hasAntagonist) {
    baseChance -= mDef.boss ? 25 : 15; // Boss Red est beaucoup plus dur
  }

  const success = Math.random() * 100 < Math.min(90, Math.max(5, baseChance));

  // Risque Jenny
  const jennyRisk = mDef.jennyRisk || 0.1;
  const jennyEvent = Math.random() < jennyRisk;

  const result = { success, jennyEvent, pokedollars:0, intel:0, pokemon:[], losses:[] };

  if (success) {
    // Pokédollars
    result.pokedollars = mDef.recompense?.pokedollars || 0;
    state.resources.pokedollars += result.pokedollars;
    // Intel
    result.intel = mDef.recompense?.intel || 0;
    state.resources.intel += result.intel;
    // CapturePoints
    if (mDef.recompense?.capturePoints) state.resources.capturePoints += mDef.recompense.capturePoints;

    // Pokémon en récompense
    const pkmPool = mDef.pkmRewardPool || [];
    if (pkmPool.length) {
      const numPkm = 1 + Math.floor(Math.random() * Math.min(2, pkmPool.length));
      for (let i=0; i<numPkm; i++) {
        const spEN = pick(pkmPool);
        const spFR = Object.keys(FR_TO_EN).find(k => FR_TO_EN[k]===spEN) || spEN;
        const pok = makePokemon(spFR, 8 + Math.floor(Math.random()*10));
        addPokemonWithCap(pok);
        updatePokedex(spFR);
        result.pokemon.push(pok);
      }
    }
    // XP agent
    if (agent) {
      const xpGain = mDef.risque==='élevé' ? 50 : mDef.risque==='moyen' ? 30 : 15;
      grantAgentXP(agent, xpGain);
    }
    state.reputation = Math.min(100, (state.reputation||0) + 2);
    addLog(`✅ ${mDef.nom?.[lang]||mDef.nom?.fr||mDef.id} — ${lang==='fr'?'Succès':'Success'} (${agent?.name})`);
  } else {
    state.reputation = Math.max(0, (state.reputation||0) - 3);
    addLog(`❌ ${mDef.nom?.[lang]||mDef.nom?.fr||mDef.id} — ${lang==='fr'?'Échec':'Failure'} (${agent?.name})`);
  }

  // Événement Jenny : peut saisir un Pokémon de l'équipe de l'agent
  if (jennyEvent && agent?.team?.length) {
    const pkmId = pick(agent.team);
    const pkmObj = state.pokemons.find(p => p.id===pkmId);
    if (pkmObj) {
      result.losses.push(pkmObj.species_fr || pkmObj.species_en);
      markPokedexLost(pkmObj.species_fr || pkmObj.species_en);
      state.pokemons = state.pokemons.filter(p => p.id !== pkmId);
      agent.team = agent.team.filter(id => id !== pkmId);
      addLog(`🚔 Jenny a saisi ${pkmObj.species_fr || pkmObj.species_en} !`);
    }
  }

  // Mort en mission : risque selon difficulté
  const deathRisk = mDef.risque==='élevé' ? 0.12 : mDef.risque==='moyen' ? 0.05 : 0.01;
  if (!success && agent?.team?.length && Math.random() < deathRisk) {
    const pkmId = pick(agent.team);
    const pkmObj = state.pokemons.find(p => p.id===pkmId);
    if (pkmObj) {
      result.losses.push(`${pkmObj.species_fr||pkmObj.species_en} (${lang==='fr'?'mort':'died'})`);
      markPokedexLost(pkmObj.species_fr || pkmObj.species_en);
      state.pokemons = state.pokemons.filter(p => p.id !== pkmId);
      agent.team = agent.team.filter(id => id !== pkmId);
      addLog(`💀 ${pkmObj.species_fr||pkmObj.species_en} est mort en mission.`);
    }
  }

  // Cooldown post-mission
  if (agent) {
    const hasBourreau = (agent.traits||[]).includes('bourreau_de_travail');
    agent.cooldown = hasBourreau ? 0 : 1;
  }
  // Cooldown Pokémon
  if (agent?.team) {
    agent.team.forEach(pkmId => {
      const pkmObj = state.pokemons.find(p => p.id===pkmId);
      if (pkmObj) {
        const hasBourreau = (agent.traits||[]).includes('bourreau_de_travail');
        pkmObj.cooldown = hasBourreau ? 1 : 2;
      }
    });
  }

  // Antagoniste : infos supplémentaires pour le popup
  result.antagonist = antagonistNpc || null;
  result.isBoss = !!mDef.boss;

  // Boss Red : victoire spéciale
  if (mDef.boss && mDef.antagonist === 'red' && success) {
    state.bossRedDefeated = true;
    state.reputation = 100;
    result.bossVictory = true;
    addLog(lang==='fr'
      ? '🏆 VICTOIRE ULTIME ! Red a été vaincu au Mont Argenté !'
      : '🏆 ULTIMATE VICTORY! Red has been defeated on Mt. Silver!');
  }

  // Antagoniste vaincu : bonus réputation + XP
  if (antagonistNpc && success && !mDef.boss) {
    const bonusRep = 5;
    state.reputation = Math.min(100, (state.reputation||0) + bonusRep);
    if (agent) grantAgentXP(agent, 30);
    addLog(lang==='fr'
      ? `⚔️ ${antagonistNpc.name[lang]||antagonistNpc.name.fr} a été repoussé ! +${bonusRep} réputation`
      : `⚔️ ${antagonistNpc.name[lang]||antagonistNpc.name.en} has been driven back! +${bonusRep} reputation`);
  }

  // Giovanni supervise les missions élevées s'il est actif
  if (state.giovanniActive && mDef.risque === 'élevé') {
    result.giovanniComment = getGiovanniComment(mDef.id, result.success);
    addLog(`👔 ${result.giovanniComment}`);
    // Giovanni bonus : +100₽ sur succès de missions élevées
    if (result.success) {
      state.resources.pokedollars += 100;
      result.giovanniBonus = 100;
    }
  }

  // Popup de résolution
  showMissionPopup(mDef, agent, result);

  return result;
}

// Remplacement de processMissions par processMissionsV2
function processMissionsV2() {
  if (!state.missions) state.missions = [];
  state.missions.forEach(mi => mi.turnsLeft -= 1);
  const done = state.missions.filter(mi => mi.turnsLeft <= 0);
  state.missions = state.missions.filter(mi => mi.turnsLeft > 0);
  done.forEach(mi => resolveMissionV2(mi));

  // Décrémente cooldowns agents
  state.agents.forEach(a => { if (a.cooldown > 0) a.cooldown -= 1; });
  // Décrémente cooldowns pokémons
  state.pokemons.forEach(p => { if (p.cooldown > 0) p.cooldown -= 1; });
}

function renderMissionsV2() {
  const el = document.getElementById('missionsList');
  if (!el) return;
  const T = {
    fr:{ avail:'Missions disponibles', ongoing:'Missions en cours', none:'Aucune.', send:'Envoyer', noAgent:'Aucun agent libre', turns:'tour(s)', risk:'risque', reward:'Récompense' },
    en:{ avail:'Available Missions', ongoing:'Ongoing Missions', none:'None.', send:'Send', noAgent:'No free agent', turns:'turn(s)', risk:'risk', reward:'Reward' },
  }[lang];

  let html = `<h4>${T.avail}</h4>`;
  if (!state.availableMissions?.length) html += `<div class="mission-card">${T.none}</div>`;
  else html += state.availableMissions.map(m => {
    const agentLibre = state.agents.find(a =>
      !(state.missions||[]).some(mi => mi.agentId === a.id) && !(a.cooldown > 0)
    );
    const nom = m.nom?.[lang] || m.nom || m.id;
    const desc = m.desc?.[lang] || m.desc || '';
    const rwStr = Object.entries(m.recompense||{}).map(([k,v])=>`${v} ${k}`).join(', ');

    // Badges spéciaux pour antagonistes/boss
    const isAntag = !!m.antagonist;
    const isBoss = !!m.boss;
    const antagNpc = isAntag ? LORE_NPCS[m.antagonist] : null;
    const borderColor = isBoss ? '#ff2222' : isAntag ? '#ff8800' : '#4a3a8a';
    const antagBadge = isBoss
      ? '<span style="color:#ff2222;font-size:.75em;font-weight:bold"> ★ BOSS</span>'
      : isAntag
        ? `<span style="color:#ff8800;font-size:.75em"> ⚔️ ${antagNpc?.name?.[lang]||m.antagonist}</span>`
        : '';
    const antagSprite = antagNpc?.sprite
      ? `<img src="${antagNpc.sprite}" style="width:32px;image-rendering:pixelated;float:right;margin:-4px 0 4px 8px">`
      : '';

    return `<div class="mission-card" style="border-color:${borderColor}">
      ${antagSprite}
      <strong>${nom}</strong>${antagBadge}
      <span class="badge-mission">${m.risque||'?'}</span>
      <small>${desc}</small>
      <small>${m.duree} ${T.turns} — ${T.reward} : ${rwStr}</small>
      ${agentLibre
        ? `<button class="small" onclick="assignMissionV2('${m.id}','${agentLibre.id}')">${T.send} ${agentLibre.name}</button>`
        : `<small><em>${T.noAgent}</em></small>`}
    </div>`;
  }).join('');

  html += `<h4>${T.ongoing}</h4>`;
  if (!state.missions?.length) html += `<div class="mission-card">${T.none}</div>`;
  else html += state.missions.map(mi => {
    const agent = state.agents.find(a => a.id === mi.agentId);
    const mDef = MISSIONS_V2.find(x => x.id === mi.missionId) || MISSIONS.find(x => x.id === mi.missionId);
    const nom = mDef?.nom?.[lang] || mDef?.nom || mi.missionId;
    return `<div class="mission-card"><strong>${nom}</strong> — ${agent?.name||'?'} — ${mi.turnsLeft} ${T.turns}</div>`;
  }).join('');
  el.innerHTML = html;
}

function assignMissionV2(missionId, agentId) {
  const m = MISSIONS_V2.find(x => x.id === missionId) || MISSIONS.find(x => x.id === missionId);
  const agent = state.agents.find(a => a.id === agentId);
  if (!m || !agent) return;
  if (!state.missions) state.missions = [];
  state.missions.push({ missionId, agentId, turnsLeft:m.duree, recompense:m.recompense });
  state.availableMissions = state.availableMissions.filter(x => x.id !== missionId);
  addLog(`${lang==='fr'?'Mission lancée':'Mission started'} : "${m.nom?.[lang]||m.nom}" — ${agent.name}`);
  saveState(); render();
}


// ============================================================
// MODULE v4.04 — RECRUTEMENT V2
// ============================================================

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

  let reply = `${r.candidateName} : ${lang==='fr'?"Je t'écoute.":"I'm listening."}`;
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
      npc.possible_pokemon.forEach(spFR => addPokemonWithCap(makePokemon(spFR)));
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


// ============================================================
// MODULE v4.05 — NIVEAUX AGENTS
// ============================================================

// ============================================================
// PATCH v4.05 — NIVEAUX AGENTS + COOLDOWN
// ============================================================

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


// ============================================================
// MODULE v4.06 — NIVEAUX POKÉMON + ÉVOLUTION
// ============================================================

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


// ============================================================
// MODULE v4.07 — SALLES V2
// ============================================================

// ============================================================
// PATCH v4.07 — SALLES V2
// Salle d'apprentissage du combat + Salle d'entraînement Pokémon
// ============================================================

// ── STATE ADDITIONS ───────────────────────────────────────
// Ajouté dans BASE_STATE.rooms :
// learning:  { nom, level, assignedAgentId, upgradeCost }
// pkm_train: { nom, level, assignedPokemonIds:[], upgradeCost }

const LEARNING_ROOM_DEFAULTS = {
  nom:            { fr:"Salle d'apprentissage", en:'Learning Room' },
  level:          1,
  assignedAgentId:null,
  upgradeCost:    600,
  baseXpPerFight: 5,   // XP agent par combat simulé
  pkmXpPerFight:  2,   // XP Pokémon par combat simulé
};

const PKM_TRAIN_ROOM_DEFAULTS = {
  nom:                { fr:"Salle d'entraînement Pokémon", en:'Pokémon Training Room' },
  level:              1,
  assignedPokemonIds: [],
  upgradeCost:        600,
  baseXpPerTurn:      12,   // XP Pokémon/tour au niveau 1
};

function initRoomsV2() {
  if (!state.rooms.learning) {
    state.rooms.learning  = { ...LEARNING_ROOM_DEFAULTS };
  }
  if (!state.rooms.pkm_train) {
    state.rooms.pkm_train = { ...PKM_TRAIN_ROOM_DEFAULTS, assignedPokemonIds:[] };
  }
}

// Slots Pokémon disponibles dans la salle d'entraînement selon son level
function pkmTrainSlots(room) {
  if ((room.level||1) >= 5) return 3;
  if ((room.level||1) >= 3) return 2;
  return 1;
}

// ── PROCESSING ────────────────────────────────────────────
function processLearningRoom() {
  const room = state.rooms.learning;
  if (!room || !room.assignedAgentId) return;
  const agent = state.agents.find(a => a.id === room.assignedAgentId);
  if (!agent) return;
  if ((agent.cooldown||0) > 0) return; // agent en repos

  const fights = 5;
  const agentXP = fights * room.baseXpPerFight;
  grantAgentXP(agent, agentXP);

  // XP pour les Pokémon de l'agent
  agent.team.forEach(pkmId => {
    const pkm = state.pokemons.find(p => p.id === pkmId);
    if (pkm && !(pkm.cooldown > 0)) {
      grantPokemonXP(pkm, fights * room.pkmXpPerFight);
    }
  });
  addLog(`📚 ${agent.name} ${lang==='fr'?'a fait':'did'} ${fights} ${lang==='fr'?'combats simulés':'simulated fights'} (+${agentXP} XP)`);
}

function processPkmTrainingRoom() {
  const room = state.rooms.pkm_train;
  if (!room || !room.assignedPokemonIds?.length) return;

  const xpPerTurn = (room.baseXpPerTurn||12) * (room.level||1);

  room.assignedPokemonIds.forEach(pkmId => {
    const pkm = state.pokemons.find(p => p.id === pkmId);
    if (!pkm || (pkm.cooldown||0) > 0) return;

    // XP
    grantPokemonXP(pkm, xpPerTurn);

    // Évolution ?
    checkEvolution(pkm);

    // Événement spécial ?
    const ev = rollTrainingEvent(room);
    if (ev) {
      applyTrainingEvent(pkm, ev);
      // Flash visuel dans la bande des salles
      flashRoomSprite(pkmId, ev.positive);
    }
  });
}

function flashRoomSprite(pkmId, positive) {
  const el = document.getElementById(`room-sprite-${pkmId}`);
  if (!el) return;
  el.style.filter = positive ? 'drop-shadow(0 0 10px #70e0a4)' : 'drop-shadow(0 0 10px #ff4466)';
  el.style.animation = 'simShake .5s';
  setTimeout(() => {
    el.style.filter = '';
    el.style.animation = '';
  }, 800);
}

// ── RENDER SALLES V2 ─────────────────────────────────────
function renderRoomsV2() {
  const el = document.getElementById('roomsList');
  if (!el) return;

  const T = {
    fr:{ upgrade:'Améliorer', level:'Niv.', prod:'Prod./tour', assign:'Assigner', unassign:'Retirer', agent:'Agent assigné', none:'Aucun', pkm:'Pokémon assignés', slots:'slots', fights:'5 combats/tour' },
    en:{ upgrade:'Upgrade',   level:'Lv.',  prod:'Prod/turn',  assign:'Assign',   unassign:'Remove',  agent:'Assigned agent',  none:'None',  pkm:'Assigned Pokémon', slots:'slots', fights:'5 fights/turn' },
  }[lang];

  let html = '';

  // Salles standard (command, breeding, training)
  const standardRooms = ['command','breeding','training'];
  standardRooms.filter(k => state.rooms[k]).forEach(roomId => {
    const room = state.rooms[roomId];
    const nom = typeof room.nom === 'object' ? (room.nom[lang]||room.nom.fr) : room.nom;
    html += `<div class="room">
      <div><strong>${nom}</strong> ${T.level}${room.level}</div>
      <div class="row">
        <small>${T.prod} : ${room.baseIncome * room.level}</small>
        <button data-room="${roomId}">${T.upgrade} ${room.upgradeCost}₽</button>
      </div>
    </div>`;
  });

  // Salle d'apprentissage
  const lr = state.rooms.learning;
  if (lr) {
    const nom = lr.nom?.[lang] || lr.nom?.fr || "Salle d'apprentissage";
    const assignedAgent = lr.assignedAgentId ? state.agents.find(a => a.id === lr.assignedAgentId) : null;
    const freeAgents = state.agents.filter(a => !(state.missions||[]).some(mi=>mi.agentId===a.id) && !(a.cooldown>0));

    html += `<div class="room">
      <div><strong>${nom}</strong> ${T.level}${lr.level} <small>(${T.fights})</small></div>
      <div><small>${T.agent} : ${assignedAgent ? assignedAgent.name : T.none}</small></div>
      ${assignedAgent
        ? `<button data-unassign-learning>✕ ${T.unassign}</button>`
        : `<select id="learningAgentSelect">${freeAgents.map(a=>`<option value="${a.id}">${a.name}</option>`).join('')}</select>
           <button data-assign-learning>${T.assign}</button>`}
      <div class="row" style="margin-top:4px">
        <button data-room="learning">${T.upgrade} ${lr.upgradeCost}₽</button>
      </div>
    </div>`;
  }

  // Salle d'entraînement Pokémon
  const ptr = state.rooms.pkm_train;
  if (ptr) {
    const nom   = ptr.nom?.[lang] || ptr.nom?.fr || "Salle d'entraînement Pokémon";
    const slots = pkmTrainSlots(ptr);
    const assignedPkm = (ptr.assignedPokemonIds||[]).map(id => state.pokemons.find(p=>p.id===id)).filter(Boolean);
    const freePkm = state.pokemons.filter(p => !(ptr.assignedPokemonIds||[]).includes(p.id) && !(p.cooldown>0));
    const canAdd  = assignedPkm.length < slots;

    html += `<div class="room">
      <div><strong>${nom}</strong> ${T.level}${ptr.level} <small>(${slots} ${T.slots})</small></div>
      <div style="font-size:.75em;color:var(--muted)">${T.pkm} (${assignedPkm.length}/${slots}) :</div>
      ${assignedPkm.map(p => `
        <div style="display:flex;align-items:center;gap:4px;font-size:.75em">
          <img src="https://play.pokemonshowdown.com/sprites/gen5/${p.species_en}.png" id="room-sprite-${p.id}"
               style="width:28px;image-rendering:pixelated">
          ${p.species_fr} Nv.${p.level||1}
          ${p.cooldown>0 ? `<span style="color:#7060a8">[repos ${p.cooldown}t]</span>` : ''}
          <button class="small" data-unassign-pkm="${p.id}">✕</button>
        </div>`).join('')}
      ${canAdd && freePkm.length
        ? `<select id="pkmTrainSelect">${freePkm.map(p=>`<option value="${p.id}">${p.species_fr} Nv.${p.level||1}</option>`).join('')}</select>
           <button data-assign-pkm>${T.assign}</button>`
        : ''}
      <div class="row" style="margin-top:4px">
        <button data-room="pkm_train">${T.upgrade} ${ptr.upgradeCost}₽</button>
      </div>
    </div>`;
  }

  el.innerHTML = html;

  // Events
  el.querySelectorAll('button[data-room]').forEach(btn => {
    btn.onclick = () => {
      const room = state.rooms[btn.dataset.room];
      if (!room) return;
      if (state.resources.pokedollars < room.upgradeCost) {
        addLog(lang==='fr' ? 'Pas assez de Pokédollars.' : 'Not enough Pokédollars.');
        return;
      }
      state.resources.pokedollars -= room.upgradeCost;
      room.level = (room.level||1) + 1;
      room.upgradeCost = Math.round(room.upgradeCost * 1.5);
      addLog(`${typeof room.nom==='object'?room.nom[lang]:room.nom} ${lang==='fr'?'améliorée':'upgraded'} — Nv.${room.level}`);
      saveState(); render();
    };
  });
  el.querySelectorAll('[data-unassign-learning]').forEach(btn => {
    btn.onclick = () => { state.rooms.learning.assignedAgentId=null; saveState(); render(); };
  });
  el.querySelectorAll('[data-assign-learning]').forEach(btn => {
    btn.onclick = () => {
      const sel = document.getElementById('learningAgentSelect');
      if (sel) { state.rooms.learning.assignedAgentId = sel.value; saveState(); render(); }
    };
  });
  el.querySelectorAll('[data-unassign-pkm]').forEach(btn => {
    btn.onclick = () => {
      state.rooms.pkm_train.assignedPokemonIds =
        (state.rooms.pkm_train.assignedPokemonIds||[]).filter(id => id !== btn.dataset.unassignPkm);
      saveState(); render();
    };
  });
  el.querySelectorAll('[data-assign-pkm]').forEach(btn => {
    btn.onclick = () => {
      const sel = document.getElementById('pkmTrainSelect');
      const slots = pkmTrainSlots(state.rooms.pkm_train);
      if (sel && (state.rooms.pkm_train.assignedPokemonIds||[]).length < slots) {
        state.rooms.pkm_train.assignedPokemonIds = [...(state.rooms.pkm_train.assignedPokemonIds||[]), sel.value];
        saveState(); render();
      }
    };
  });
}


// ============================================================
// MODULE v4.08 — SPRITES SALLES
// ============================================================

// ============================================================
// PATCH v4.08 — BANDE SALLES EN BAS DE PAGE (Sprites animés)
// ============================================================

function renderRoomsBand() {
  const el = document.getElementById('roomsBand');
  if (!el) return;

  const rooms = [
    {
      key: 'command',
      icon: '🏢',
      label: { fr:'Commandement', en:'Command' },
      getSprites: () => [
        state.profile.sprite,
        ...(state.agents.slice(0,2).map(a=>a.sprite).filter(Boolean)),
      ],
    },
    {
      key: 'breeding',
      icon: '🥚',
      label: { fr:'Nurserie', en:'Nursery' },
      getSprites: () => {
        const bpkm = state.breedingQueue.slice(0,3).map(e => {
          const en = FR_TO_EN[(e.species_fr||'').toLowerCase()] || e.species_fr;
          return `https://play.pokemonshowdown.com/sprites/gen5/${en}.png`;
        });
        return bpkm;
      },
    },
    {
      key: 'learning',
      icon: '📚',
      label: { fr:'Apprentissage', en:'Learning' },
      getSprites: () => {
        const lr = state.rooms.learning;
        if (!lr?.assignedAgentId) return [];
        const agent = state.agents.find(a => a.id === lr.assignedAgentId);
        const sprites = agent?.sprite ? [agent.sprite] : [];
        (agent?.team||[]).slice(0,2).forEach(pkmId => {
          const p = state.pokemons.find(x=>x.id===pkmId);
          if (p) sprites.push(`https://play.pokemonshowdown.com/sprites/gen5/${p.species_en}.png`);
        });
        return sprites;
      },
    },
    {
      key: 'pkm_train',
      icon: '⚔️',
      label: { fr:'Entraînement', en:'Training' },
      getSprites: () => {
        const ptr = state.rooms.pkm_train;
        return (ptr?.assignedPokemonIds||[]).map(id => {
          const p = state.pokemons.find(x=>x.id===id);
          return p ? `https://play.pokemonshowdown.com/sprites/gen5/${p.species_en}.png` : null;
        }).filter(Boolean);
      },
    },
  ];

  el.innerHTML = rooms.map(r => {
    const room = state.rooms[r.key];
    if (!room) return '';
    const nom = r.label[lang];
    const sprites = r.getSprites();
    const spriteHtml = sprites.length
      ? sprites.map((src,i) => `
          <img src="${src}"
               style="width:36px;height:36px;image-rendering:pixelated;object-fit:contain;
                      animation:bandFloat ${2.5+i*0.4}s ease-in-out infinite;
                      animation-delay:${i*0.3}s;">`
        ).join('')
      : `<span style="font-size:.55em;color:var(--muted)">${lang==='fr'?'Vide':'Empty'}</span>`;

    return `<div class="room-band-card" id="band-${r.key}">
      <div class="room-band-title">${r.icon} ${nom} <span style="color:var(--muted)">Nv.${room.level||1}</span></div>
      <div class="room-band-sprites">${spriteHtml}</div>
    </div>`;
  }).join('');
}


// ============================================================
// MODULE v4.09 — POKÉDEX + COMBO DEX
// ============================================================

// ============================================================
// PATCH v4.09 — POKÉDEX + COMBO DEX
// ============================================================

// ── POKÉDEX ──────────────────────────────────────────────
// state.pokedex = { [species_fr]: { count:N, lost:N, firstSeen:turn } }
function updatePokedex(species_fr) {
  if (!state.pokedex) state.pokedex = {};
  if (!state.pokedex[species_fr]) {
    state.pokedex[species_fr] = { count:0, lost:0, firstSeen: state.turn };
    addLog(`📖 ${lang==='fr'?'Pokédex':'Pokédex'} : ${species_fr} ${lang==='fr'?'enregistré !':'registered!'}`);
  }
  state.pokedex[species_fr].count += 1;
}

function markPokedexLost(species_fr) {
  if (!state.pokedex) return;
  if (!state.pokedex[species_fr]) return;
  state.pokedex[species_fr].lost = (state.pokedex[species_fr].lost||0) + 1;
}

function renderPokedex() {
  // Le Pokédex s'ouvre via un bouton overlay — rien à rendre inline
  const btn = document.getElementById('openPokedexBtn');
  if (btn) {
    const count = Object.keys(state.pokedex||{}).length;
    btn.textContent = `📖 POKÉDEX (${count})`;
    btn.onclick = openPokedexOverlay;
  }
}

function openPokedexOverlay() {
  // Ferme s'il existe déjà
  const existing = document.getElementById('pokedexOverlay');
  if (existing) { existing.remove(); return; }

  const dex = state.pokedex || {};
  const entries = Object.entries(dex);
  const comboDex = state.comboDex || {};
  const comboEntries = Object.entries(comboDex);
  const T = {
    fr:{ title:'POKÉDEX', seen:'obtenus', lost:'perdus', empty:'Aucun Pokémon enregistré.', combo:'COMBO DEX', noCombo:'Aucun combo.', close:'FERMER', wins:'victoires' },
    en:{ title:'POKÉDEX', seen:'obtained', lost:'lost',  empty:'No Pokémon registered.',  combo:'COMBO DEX', noCombo:'No combo.',   close:'CLOSE',  wins:'wins' },
  }[lang];

  const overlay = document.createElement('div');
  overlay.id = 'pokedexOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:100;
    display:flex;align-items:center;justify-content:center;padding:16px;
    font-family:'Press Start 2P',monospace;
  `;

  const pokemonGrid = entries.length
    ? entries.map(([fr, data]) => {
        const en = FR_TO_EN[fr.toLowerCase()] || fr;
        const lostTag = data.lost ? `<div style="color:#cc3333;font-size:.4em">💀×${data.lost}</div>` : '';
        return `<div style="
          background:#1a0808;border:1px solid #551111;border-radius:4px;
          padding:6px;text-align:center;display:flex;flex-direction:column;align-items:center;
        ">
          <img src="https://play.pokemonshowdown.com/sprites/gen5/${en}.png"
               style="width:40px;image-rendering:pixelated;filter:saturate(0.7) brightness(1.1);">
          <div style="font-size:.4em;color:#cc6666;margin-top:3px">${fr}</div>
          <div style="font-size:.4em;color:#888">×${data.count} ${T.seen}</div>
          ${lostTag}
        </div>`;
      }).join('')
    : `<div style="grid-column:1/-1;color:#663333;font-size:.5em;text-align:center;padding:20px">${T.empty}</div>`;

  const comboList = comboEntries.length
    ? comboEntries.map(([key, data]) => `
        <div style="display:flex;align-items:center;gap:8px;font-size:.4em;padding:4px 0;border-bottom:1px solid #331111">
          <span style="color:#cc3333;font-weight:bold">${data.label}</span>
          <span style="color:#888">${data.wins} ${T.wins}</span>
          ${data.rewardClaimed ? '<span style="color:#66aa66">✓</span>' : ''}
        </div>`).join('')
    : `<div style="color:#663333;font-size:.45em">${T.noCombo}</div>`;

  overlay.innerHTML = `
    <div style="
      width:min(700px,95vw);max-height:85vh;overflow-y:auto;
      background:#0a0404;border:3px solid #cc3333;border-radius:8px;
      box-shadow:0 0 40px rgba(204,51,51,.3),inset 0 0 60px rgba(0,0,0,.8);
    ">
      <!-- Header -->
      <div style="
        background:linear-gradient(90deg,#1a0808,#2a0a0a,#1a0808);
        padding:12px 16px;border-bottom:2px solid #cc3333;
        display:flex;justify-content:space-between;align-items:center;
      ">
        <div style="color:#cc3333;font-size:.6em;letter-spacing:.2em;text-shadow:0 0 10px rgba(204,51,51,.5)">${T.title}</div>
        <div style="color:#663333;font-size:.4em">${entries.length} / 251</div>
      </div>
      <!-- Pokémon Grid -->
      <div style="
        padding:12px;
        display:grid;grid-template-columns:repeat(auto-fill,minmax(75px,1fr));gap:6px;
      ">${pokemonGrid}</div>
      <!-- Combo Dex -->
      <div style="padding:8px 16px;border-top:1px solid #331111">
        <div style="color:#993333;font-size:.45em;letter-spacing:.15em;margin-bottom:6px">${T.combo}</div>
        ${comboList}
      </div>
      <!-- Close button -->
      <div style="text-align:center;padding:12px">
        <button onclick="document.getElementById('pokedexOverlay')?.remove()" style="
          font-family:'Press Start 2P',monospace;font-size:.45em;
          background:#1a0808;color:#cc3333;border:2px solid #cc3333;
          padding:8px 24px;border-radius:4px;cursor:pointer;
          text-transform:uppercase;
        ">${T.close}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Clic en dehors pour fermer
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

// ── COMBO DEX ─────────────────────────────────────────────
// state.comboDex = { [key]: { pattern:[], label:'', wins:0, rewardClaimed:false } }

function getTeamPattern(agent) {
  if (!agent?.team?.length) return null;
  const types = agent.team.map(pkmId => {
    const p = state.pokemons.find(x => x.id === pkmId);
    if (!p) return null;
    const fr = (p.species_fr||'').toLowerCase();
    // Type approximatif depuis les pools
    for (const [type, pool] of Object.entries(POKEMON_FR_POOL_BY_TYPE)) {
      if (pool.includes(fr)) return type;
    }
    return 'normal';
  }).filter(Boolean).sort();
  if (types.length < 2) return null;
  return types.join('-');
}

function checkComboUnlock(agent) {
  const pattern = getTeamPattern(agent);
  if (!pattern) return;
  if (!state.comboDex) state.comboDex = {};
  if (state.comboDex[pattern]) {
    if (!state.comboDex[pattern].rewardClaimed) {
      state.comboDex[pattern].rewardClaimed = true;
      state.resources.pokedollars += 10;
      addLog(`🏆 Combo "${pattern}" validé ! +10₽`);
    }
    return;
  }
  // Nouveau combo
  state.comboDex[pattern] = {
    pattern: pattern.split('-'),
    label: pattern,
    wins: 0,
    rewardClaimed: false,
    firstSeen: state.turn,
  };
  state.resources.pokedollars += 10;
  addLog(`🏆 ${lang==='fr'?'Nouveau combo débloqué':'New combo unlocked'} : "${pattern}" +10₽`);
}

function renderComboDex() {
  // Combo Dex est maintenant intégré dans l'overlay Pokédex
  // Rien à rendre inline
}

function applyCombo(key) {
  const combo = state.comboDex?.[key];
  const agent = state.agents.find(a => a.id === document.getElementById('agentSelect')?.value);
  if (!combo || !agent) return;

  const assigned = [];
  combo.pattern.forEach(type => {
    const pool = POKEMON_FR_POOL_BY_TYPE[type] || [];
    const pkm = state.pokemons.find(p =>
      pool.includes((p.species_fr||'').toLowerCase()) &&
      !p.assignedAgentId && !assigned.includes(p.id)
    );
    if (pkm) assigned.push(pkm.id);
  });

  agent.team.forEach(id => { const p = state.pokemons.find(x=>x.id===id); if(p) p.assignedAgentId=null; });
  agent.team = assigned.slice(0,3);
  assigned.forEach(id => { const p = state.pokemons.find(x=>x.id===id); if(p) p.assignedAgentId=agent.id; });
  checkComboUnlock(agent);
  addLog(`Combo "${key}" appliqué à ${agent.name}.`);
  saveState(); render();
}


// ============================================================
// MODULE v4.10 — CHAT ALLIÉ
// ============================================================

// ============================================================
// PATCH v4.10 — CHAT PNJ ALLIÉ RECENTRÉ
// 1 conversation/tour, uniquement agents recrutés
// ============================================================

// state.chatUsedThisTurn = false | agentId

function renderAllyChat() {
  const el = document.getElementById('allyChatPanel');
  if (!el) return;
  const T = {
    fr:{ title:'Briefing allié', used:'Conversation utilisée ce tour.', pick:'Choisir un allié', send:'Parler', placeholder:"Message à l'allié…", hint:'1 conversation disponible par tour.' },
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
      fr: ['Cette conversation te donne des informations utiles. +1 Intel.', "L'agent partage un tuyau. +50₽.", 'Un détail révélateur. +1 Intel.'],
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


// ============================================================
// MODULE v4.11 — LORE NPCs
// ============================================================

// ============================================================
// PATCH v4.11 — LORE NPCs
// Giovanni, Archer, Ariana, Jessie, James, Oak, Red
// ============================================================

const LORE_NPCS = {
  giovanni: {
    id: 'lore_giovanni',
    name: { fr:'Giovanni', en:'Giovanni' },
    rank: { fr:'Boss de la Team Rocket', en:'Team Rocket Boss' },
    faction: 'team_rocket',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/giovanni.png',
    personality: ['froid','calculateur','impitoyable'],
    values: ['pouvoir','argent','contrôle'],
    speech_style: { tone:'autoritaire', verbosity:'court', formality:'high' },
    catch_phrases: {
      fr:['Le pouvoir est tout.','Tu es un outil. Sois utile.',"La Team Rocket ne pardonne pas l'échec.",'Rapporte-moi des résultats, pas des excuses.'],
      en:['Power is everything.','You are a tool. Be useful.','Team Rocket does not forgive failure.','Bring me results, not excuses.'],
    },
    pokemon_preferences: ['psychic','poison'],
    possible_pokemon: ['persian','nidoking','nidoqueen'],
    activation: { minReputation: 0, alwaysPresent: true },
    role_in_game: 'npc_adjuvant', // superviseur, pas membre d'équipe
  },

  archer: {
    id: 'lore_archer',
    name: { fr:'Archer', en:'Archer' },
    rank: { fr:'Sous-Chef Rocket', en:'Team Rocket Admin' },
    faction: 'team_rocket',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/archer.png',
    personality: ['loyal','méthodique','ambitieux'],
    values: ['ordre','hiérarchie','discipline'],
    speech_style: { tone:'professionnel', verbosity:'moyen', formality:'medium' },
    catch_phrases: {
      fr:["Les ordres viennent d'en haut.",'Efficacité avant tout.','Archer surveille tout.'],
      en:['Orders come from above.','Efficiency above all.','Archer watches everything.'],
    },
    pokemon_preferences: ['dark','poison'],
    possible_pokemon: ['houndour','murkrow','weezing'],
    activation: { minReputation: 40 },
    role_in_game: 'ally_agent',
  },

  ariana: {
    id: 'lore_ariana',
    name: { fr:'Ariane', en:'Ariana' },
    rank: { fr:'Sous-Chef Rocket', en:'Team Rocket Admin' },
    faction: 'team_rocket',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/ariana.png',
    personality: ['impitoyable','directe','protectrice'],
    values: ['loyauté','force','survie'],
    speech_style: { tone:'agressif', verbosity:'court', formality:'low' },
    catch_phrases: {
      fr:['Ne me fais pas perdre mon temps.','Montre ta valeur.','Je ne fais pas dans la demi-mesure.'],
      en:["Don't waste my time.",'Prove your worth.',"I don't do things halfway."],
    },
    pokemon_preferences: ['poison','fighting'],
    possible_pokemon: ['arbok','murkrow','vileplume'],
    activation: { minReputation: 40 },
    role_in_game: 'ally_agent',
  },

  jessie: {
    id: 'lore_jessie',
    name: { fr:'Jessie', en:'Jessie' },
    rank: { fr:'Agent Rocket', en:'Rocket Agent' },
    faction: 'team_rocket',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/jessiejames-gen1.png',
    personality: ['théâtrale','orgueilleuse','déterminée'],
    values: ['gloire','beauté','vengeance'],
    speech_style: { tone:'dramatique', verbosity:'long', formality:'low' },
    catch_phrases: {
      fr:['Préparez-vous pour les ennuis !',"La beauté et la ruse, c'est notre devise.","Personne ne m'arrêtera !"],
      en:['Prepare for trouble!',"Beauty and cunning, that's our motto.",'Nobody will stop me!'],
    },
    pokemon_preferences: ['poison','normal'],
    possible_pokemon: ['ekans','arbok','wobbuffet'],
    activation: { minReputation: 20, minTurn: 5, event: true },
    role_in_game: 'recruit_event',
  },

  james: {
    id: 'lore_james',
    name: { fr:'James', en:'James' },
    rank: { fr:'Agent Rocket', en:'Rocket Agent' },
    faction: 'team_rocket',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/jessiejames-gen1.png',
    personality: ['naïf','gentil','maladroit'],
    values: ['amitié','Pokémon','appartenance'],
    speech_style: { tone:'hésitant', verbosity:'moyen', formality:'low' },
    catch_phrases: {
      fr:['Et faites-en le double !',"Je ne suis pas sûr que c'est une bonne idée…",'Mes Pokémon comptent sur moi.'],
      en:['Make it double!',"I'm not sure this is a good idea…",'My Pokémon count on me.'],
    },
    pokemon_preferences: ['poison','grass'],
    possible_pokemon: ['koffing','weezing','victreebel'],
    activation: { minReputation: 20, minTurn: 5, event: true },
    role_in_game: 'recruit_event',
  },

  oak: {
    id: 'lore_oak',
    name: { fr:'Professeur Chen', en:'Professor Oak' },
    rank: { fr:'Chercheur Pokémon', en:'Pokémon Researcher' },
    faction: 'neutral',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/oak.png',
    personality: ['sage','curieux','prudent'],
    values: ['science','nature','harmonie'],
    speech_style: { tone:'académique', verbosity:'long', formality:'high' },
    catch_phrases: {
      fr:['Les Pokémon ne sont pas des outils.','La science ne peut tolérer cela.','Vous faites fausse route.'],
      en:['Pokémon are not tools.','Science cannot tolerate this.','You are on the wrong path.'],
    },
    pokemon_preferences: ['normal','grass'],
    possible_pokemon: ['eevee','arcanine','dragonite'],
    activation: { },
    role_in_game: 'antagonist_mission',
  },

  red: {
    id: 'lore_red',
    name: { fr:'Red', en:'Red' },
    rank: { fr:'Champion de Kanto', en:'Kanto Champion' },
    faction: 'hero',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/red.png',
    personality: ['silencieux','déterminé','légendaire'],
    values: ['justice','amitié','dépassement'],
    speech_style: { tone:'minimal', verbosity:'très court', formality:'low' },
    catch_phrases: {
      fr:['…','…!','Pikachu.'],
      en:['…','…!','Pikachu.'],
    },
    pokemon_preferences: ['electric','fire','water','grass'],
    possible_pokemon: ['pikachu','charizard','blastoise','venusaur','snorlax','lapras'],
    activation: { minReputation: 70 },
    role_in_game: 'boss_mission',
  },

  // ── NOUVEAUX PERSONNAGES v5 ─────────────────────────────

  proton: {
    id: 'lore_proton',
    name: { fr:'Proton', en:'Proton' },
    rank: { fr:'Sous-Chef Rocket', en:'Team Rocket Admin' },
    faction: 'team_rocket',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/proton.png',
    personality: ['cruel','sadique','efficace'],
    values: ['terreur','résultats','intimidation'],
    speech_style: { tone:'menaçant', verbosity:'court', formality:'low' },
    catch_phrases: {
      fr:["Je suis le plus terrifiant de la Team Rocket.",'La peur est mon arme.',"N'espère aucune pitié."],
      en:["I'm the scariest guy in Team Rocket.",'Fear is my weapon.','Expect no mercy.'],
    },
    pokemon_preferences: ['poison','dark'],
    possible_pokemon: ['zubat','golbat','weezing','crobat'],
    activation: { minReputation: 30 },
    role_in_game: 'ally_agent',
  },

  silver: {
    id: 'lore_silver',
    name: { fr:'Silver', en:'Silver' },
    rank: { fr:'Rival / Fils de Giovanni', en:'Rival / Giovanni\'s Son' },
    faction: 'antagonist',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/silver.png',
    personality: ['hostile','solitaire','tourmenté'],
    values: ['force','indépendance','rejet'],
    speech_style: { tone:'agressif', verbosity:'court', formality:'low' },
    catch_phrases: {
      fr:['Les faibles ne méritent pas de Pokémon.','La Team Rocket est pathétique.',"Je n'ai besoin de personne."],
      en:["Weaklings don't deserve Pokémon.",'Team Rocket is pathetic.','I need no one.'],
    },
    pokemon_preferences: ['dark','fire','ice'],
    possible_pokemon: ['sneasel','totodile','murkrow','magneton','haunter','crobat'],
    activation: { minReputation: 35, minTurn: 8 },
    role_in_game: 'antagonist_mission',
  },

  blue: {
    id: 'lore_blue',
    name: { fr:'Blue', en:'Blue' },
    rank: { fr:'Champion de Jadielle', en:'Viridian Gym Leader' },
    faction: 'hero',
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/blue.png',
    personality: ['arrogant','compétitif','stratège'],
    values: ['victoire','prestige','défi'],
    speech_style: { tone:'condescendant', verbosity:'moyen', formality:'medium' },
    catch_phrases: {
      fr:['Vous croyez pouvoir me battre ?',"L'odeur de la défaite, c'est vous.",'Je suis imbattable.'],
      en:['You think you can beat me?','You smell like defeat.','I am unbeatable.'],
    },
    pokemon_preferences: ['normal','water','psychic'],
    possible_pokemon: ['arcanine','alakazam','gyarados','exeggutor','pidgeot','machamp'],
    activation: { minReputation: 50, minTurn: 12 },
    role_in_game: 'antagonist_mission',
  },
};

// ── INJECTION DANS LE JEU ────────────────────────────────

// Vérifie si des PNJs lore doivent devenir disponibles
function checkLoreNpcActivation() {
  if (!state.loreNpcsActivated) state.loreNpcsActivated = {};

  Object.values(LORE_NPCS).forEach(npc => {
    if (state.loreNpcsActivated[npc.id]) return;
    const cond = npc.activation || {};

    // Activation permanente (Giovanni)
    if (cond.alwaysPresent) {
      activateLoreNpc(npc);
      return;
    }
    // Activation par réputation
    if (cond.minReputation !== undefined && (state.reputation||0) < cond.minReputation) return;
    // Activation par tour
    if (cond.minTurn !== undefined && state.turn < cond.minTurn) return;
    // Activation événement : 30% de chance par tour si conditions remplies
    if (cond.event && Math.random() > 0.30) return;

    activateLoreNpc(npc);
  });
}

function activateLoreNpc(npc) {
  if (state.loreNpcsActivated[npc.id]) return;
  state.loreNpcsActivated[npc.id] = true;

  const nom = npc.name[lang] || npc.name.fr;
  const rank = npc.rank[lang] || npc.rank.fr;

  if (npc.role_in_game === 'npc_adjuvant') {
    // Giovanni = superviseur, pas membre d'équipe
    // Il apparaît comme bonus aléatoire sur les missions de haut rang
    state.giovanniActive = true;
    addLog(`⭐ ${nom} ${lang==='fr'?'supervise désormais vos opérations.':'now oversees your operations.'}`);
    // Chance de drop Persian ★★★ lors de l'activation
    if (Math.random() < 0.3) {
      const persian = makePokemon('persian', 30);
      persian.stars = 3;
      persian.fusionTraits = ['intimidation','boss'];
      addPokemonWithCap(persian);
      updatePokedex('persian');
      addLog(`🎁 ${nom} ${lang==='fr'?'vous confie son Persian ★★★ !':'entrusts you with his Persian ★★★!'}`);
    }
  }

  if (npc.role_in_game === 'ally_agent') {
    // Ajoute comme agent allié s'il n'existe pas déjà
    if (!state.agents.find(a => a.id === npc.id)) {
      state.agents.push({
        id:          npc.id,
        name:        nom,
        rank:        rank,
        level:       5,
        xp:          250,
        cooldown:    0,
        team:        [],
        traits:      ['lore'],
        sprite:      npc.sprite,
        personality: npc.personality,
        catch_phrases: npc.catch_phrases[lang] || npc.catch_phrases.fr,
        pokemon_preferences: npc.pokemon_preferences,
        possible_pokemon: npc.possible_pokemon,
        missions:    [],
        isLore:      true,
      });
      addLog(`⭐ ${nom} (${rank}) ${lang==='fr'?'rejoint votre équipe !':'joins your team!'}`);
    }
  }

  if (npc.role_in_game === 'recruit_event') {
    // Injecte comme candidat de recrutement si pas déjà en cours
    if (!state.recruit || state.recruit.finished) {
      state.recruit = {
        npc: {
          ...npc,
          name:         nom,
          role:         rank,
          personality:  npc.personality,
          catch_phrases: npc.catch_phrases[lang] || npc.catch_phrases.fr,
          possible_pokemon: npc.possible_pokemon,
          sprite:       npc.sprite,
          hiddenScore:  8, // lore = plus facile à recruter
          isLore:       true,
        },
        candidateName: nom,
        candidateRole: rank,
        interactions:  0,
        hiddenScore:   8,
        transcript:    [],
        finished:      false,
      };
      addLog(`⭐ Événement spécial : ${nom} ${lang==='fr'?'est disponible au recrutement !':'is available for recruitment!'}`);
    }
  }

  if (npc.role_in_game === 'antagonist_mission' || npc.role_in_game === 'boss_mission') {
    // Log d'alerte : un antagoniste est maintenant actif
    const icon = npc.role_in_game === 'boss_mission' ? '🔴' : '⚠️';
    const msgFR = npc.faction === 'hero'
      ? `${nom} a été repéré dans la région. Ses missions seront plus dangereuses.`
      : `${nom} rôde dans les parages. Méfiez-vous.`;
    const msgEN = npc.faction === 'hero'
      ? `${nom} has been spotted in the region. Their missions will be more dangerous.`
      : `${nom} is lurking nearby. Stay alert.`;
    addLog(`${icon} ${lang==='fr' ? msgFR : msgEN}`);
  }
}

// System prompt enrichi pour les lore NPCs
function buildLoreNpcPrompt(npcDef, message) {
  const nom  = npcDef.name[lang] || npcDef.name.fr;
  const rank = npcDef.rank[lang] || npcDef.rank.fr;
  const phrases = (npcDef.catch_phrases[lang] || npcDef.catch_phrases.fr).join(' | ');
  return `Tu incarnes ${nom}, ${rank}, dans un jeu de gestion inspiré de Pokémon.
Personnalité : ${npcDef.personality.join(', ')}.
Valeurs : ${npcDef.values.join(', ')}.
Style : ${npcDef.speech_style.tone}, ${npcDef.speech_style.verbosity}, formalité ${npcDef.speech_style.formality}.
Répliques types : "${phrases}"
Pokémon : ${npcDef.possible_pokemon.join(', ')}.
Réponds toujours en ${lang==='fr'?'français':'English'}. Reste dans le personnage. Maximum deux phrases.

Message reçu : "${message}"`;
}

// Giovanni apparaît comme superviseur sur les missions élevées
function getGiovanniComment(missionId, success) {
  const phrases = success
    ? (lang==='fr' ? ['Bien. Continue.',"C'est ce que j'attendais.",'Correct. Ne te repose pas.'] : ['Good. Continue.',"That's what I expected.","Correct. Don't rest."])
    : (lang==='fr' ? ['Décevant.','Encore un échec ? Inacceptable.','Tu me déçois.'] : ['Disappointing.','Another failure? Unacceptable.','You disappoint me.']);
  return `Giovanni : ${pick(phrases)}`;
}


// ============================================================
// RENDER PRINCIPAL v4 — override de render()
// ============================================================
function render() {
  // Topbar
  if (ui.turnValue)  ui.turnValue.textContent  = state.turn;
  if (ui.llmBadge)   ui.llmBadge.textContent   = settings.llmEnabled ? T('llmOn') : T('llmOff');
  if (ui.nextTurnBtn) ui.nextTurnBtn.textContent = T('nextTurn');

  // Profil
  if (ui.playerName)  ui.playerName.textContent  = `${state.profile.firstName} ${state.profile.lastName}`;
  if (ui.teamName)    ui.teamName.textContent     = state.profile.team;
  if (ui.playerSprite) ui.playerSprite.src        = state.profile.sprite;
  if (ui.introOverlay) ui.introOverlay.classList.toggle('hidden', state.profile.initialized);

  renderResources();
  renderRoomsV2();
  renderPokemonPanels();
  renderTeamBuilder();
  renderAgentsV2();
  renderRecruitV2();
  renderMissionsV2();
  renderAllyChat();
  renderPokedex();
  renderComboDex();
  renderWorldView();
  renderRoomsBand();

  // Logs
  if (ui.logOutput) ui.logOutput.innerHTML = state.log.map(l => `<div class="logline">${l}</div>`).join('');

  // Settings
  if (ui.llmEnabledToggle) ui.llmEnabledToggle.checked = settings.llmEnabled;
  if (ui.baseUrlInput)     ui.baseUrlInput.value        = settings.baseUrl;
  if (ui.modelInput)       ui.modelInput.value          = settings.model;
}

// ============================================================
// PROCESS TURN v4
// ============================================================
function processTurn() {
  state.turn += 1;
  state.newPokemonsThisTurn = [];

  // Revenus salles
  const roomIncome = (state.rooms.command?.baseIncome||120) * (state.rooms.command?.level||1);
  state.resources.pokedollars    += roomIncome;
  state.resources.breedingPoints += (state.rooms.breeding?.baseIncome||2) * (state.rooms.breeding?.level||1);
  state.resources.intel          += (state.rooms.training?.baseIncome||1)  * (state.rooms.training?.level||1);

  // Élevage
  while ((state.resources.breedingPoints||0) >= 4) {
    state.resources.breedingPoints -= 4;
    if (!state.breedingQueue) state.breedingQueue = [];
    state.breedingQueue.push({ turnsLeft:2, species_fr: pick(POKEDEX_POOL_FR) });
    addLog(lang==='fr' ? 'Un œuf est ajouté à la nurserie.' : 'An egg is added to the nursery.');
  }
  if (state.breedingQueue) {
    state.breedingQueue.forEach(e => e.turnsLeft -= 1);
    const hatched = state.breedingQueue.filter(e => e.turnsLeft <= 0);
    state.breedingQueue = state.breedingQueue.filter(e => e.turnsLeft > 0);
    hatched.forEach(e => {
      const pok = makePokemon(e.species_fr, 5 + Math.floor(Math.random()*6));
      addPokemonWithCap(pok);
      updatePokedex(pok.species_fr);
      addLog(`${lang==='fr'?'Éclosion':'Hatched'} : ${e.species_fr}`);
    });
  }

  // Cap Pokémon : relâche les standby si la limite augmente (tous les 3 tours)
  if ((state.turn - 1) % 3 === 0 && state.turn > 1) {
    const newCap = getPokemonCap();
    addLog(lang === 'fr'
      ? `📈 Limite Pokémon augmentée à ${newCap} !`
      : `📈 Pokémon cap increased to ${newCap}!`);
    releaseStandbyPokemon();
  }

  // Salles V2
  processLearningRoom();
  processPkmTrainingRoom();

  // Missions
  processMissionsV2();
  rollAvailableMissionsV2();

  // Événements aléatoires
  rollRandomEvent();

  // Chat allié reset
  resetAllyChat();

  // Lore NPCs check
  checkLoreNpcActivation();

  // Candidat recrutement
  if (state.recruit?.finished) {
    initRecruit();
    addLog(`${lang==='fr'?'Nouveau candidat':'New candidate'} : ${state.recruit.candidateName}`);
  }

  saveState(); render();
}

// ============================================================
// BOOT v4
// ============================================================
function bootV4() {
  // Migrations
  migrateRemoveCapture();
  initRoomsV2();
  initWorldView();

  // Lire état sauvegardé
  const saved = loadState();
  if (saved && saved.profile?.initialized) {
    state = { ...structuredClone(BASE_STATE), ...saved };
    lang  = saved.lang || lang;
  }

  // Candidat de recrutement
  if (!state.recruit) initRecruit();
  if (!state.availableMissions?.length) rollAvailableMissionsV2();
  if (!state.log?.length) addLog(lang==='fr' ? 'Bienvenue dans Rocket HQ.' : 'Welcome to Rocket HQ.');

  // Migration: remove Giovanni from agents (now NPC adjuvant, not team member)
  state.agents = (state.agents||[]).filter(a => a.id !== 'lore_giovanni');
  if (state.loreNpcsActivated?.['lore_giovanni']) state.giovanniActive = true;

  // Lore NPCs
  checkLoreNpcActivation();

  // Bind events
  bindEvents();
  // Override sendRecruit
  if (ui.sendRecruitBtn) ui.sendRecruitBtn.onclick = recruitStepV2;
  if (ui.recruitMessage) ui.recruitMessage.onkeydown = e => { if(e.key==='Enter') recruitStepV2(); };

  // World spawner
  startWorldSpawner();

  render();
}

bootV4();

// ============================================================
// PATCH v4.1.01 — OLLAMA MODEL PICKER + LOADING BAR
// ============================================================

// ── OLLAMA MODEL DISCOVERY ───────────────────────────────

async function fetchOllamaModels() {
  const el = document.getElementById('ollamaModelSelect');
  const status = document.getElementById('ollamaModelStatus');
  if (status) status.textContent = '⏳ Chargement…';
  try {
    const res = await fetch(`${settings.baseUrl}/api/tags`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const models = (data.models || []).map(m => m.name);
    if (!models.length) throw new Error('Aucun modèle trouvé');
    if (el) {
      el.innerHTML = models.map(m =>
        `<option value="${m}" ${m === settings.model ? 'selected' : ''}>${m}</option>`
      ).join('');
      el.onchange = () => {
        settings.model = el.value;
        const inp = document.getElementById('modelInput');
        if (inp) inp.value = el.value;
        localStorage.setItem('pf.settings', JSON.stringify(settings));
      };
    }
    if (status) status.textContent = `✅ ${models.length} modèle(s) disponible(s)`;
    return models;
  } catch (e) {
    if (status) status.textContent = `❌ Ollama inaccessible (${e.message})`;
    if (el) el.innerHTML = `<option value="${settings.model}">${settings.model} (local)</option>`;
    return [];
  }
}

// ── LOADING BAR ───────────────────────────────────────────

// Crée ou réutilise la barre de chargement sur un élément cible
function showLoadingBar(anchorId, label = '') {
  let bar = document.getElementById('llmLoadingBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'llmLoadingBar';
    bar.style.cssText = `
      position:fixed;bottom:0;left:0;width:100%;height:3px;z-index:9999;
      background:transparent;pointer-events:none;
    `;
    bar.innerHTML = `<div id="llmLoadingFill" style="
      height:3px;width:0%;
      background:linear-gradient(90deg,#cc2233,#ffcc5a,#70e0a4);
      transition:width .3s ease;border-radius:0 3px 3px 0;
      box-shadow:0 0 8px rgba(255,204,90,.6);
    "></div>`;
    document.body.appendChild(bar);
  }
  bar.style.display = 'block';

  // Barre au-dessus du personnage si anchorId fourni
  const anchor = anchorId ? document.getElementById(anchorId) : null;
  let avatarBar = null;
  if (anchor) {
    avatarBar = document.createElement('div');
    avatarBar.id = 'llmAvatarBar';
    avatarBar.style.cssText = `
      position:absolute;bottom:calc(100% + 4px);left:0;width:100%;
      display:flex;flex-direction:column;align-items:center;gap:2px;
      pointer-events:none;z-index:50;
    `;
    avatarBar.innerHTML = `
      ${label ? `<span style="font-family:'Press Start 2P',monospace;font-size:.32em;
        color:var(--accent);white-space:nowrap;animation:blink .8s step-end infinite">${label}</span>` : ''}
      <div style="width:64px;height:4px;background:#2a2048;border-radius:2px;overflow:hidden;">
        <div id="llmAvatarFill" style="height:4px;width:0%;
          background:linear-gradient(90deg,#cc2233,#ffcc5a);
          border-radius:2px;transition:width .4s ease;"></div>
      </div>`;
    anchor.style.position = 'relative';
    anchor.appendChild(avatarBar);
  }

  // Progression simulée (indéterminée)
  let pct = 0;
  const fill     = document.getElementById('llmLoadingFill');
  const fillAvt  = document.getElementById('llmAvatarFill');
  const interval = setInterval(() => {
    pct = pct < 85 ? pct + (Math.random() * 8) : pct + 0.5;
    pct = Math.min(pct, 92);
    if (fill)    fill.style.width    = `${pct}%`;
    if (fillAvt) fillAvt.style.width = `${pct}%`;
  }, 200);

  return { fill, fillAvt, interval, avatarBar };
}

function hideLoadingBar({ fill, fillAvt, interval, avatarBar } = {}) {
  clearInterval(interval);
  if (fill)    { fill.style.width = '100%'; setTimeout(() => { const b = document.getElementById('llmLoadingBar'); if(b) b.style.display='none'; fill.style.width='0%'; }, 400); }
  if (fillAvt) { fillAvt.style.width = '100%'; }
  if (avatarBar) setTimeout(() => avatarBar.remove(), 500);
}

// ── OVERRIDE callOllama avec loading bar ─────────────────
const _callOllamaBase = callOllama;
async function callOllamaWithBar(prompt, fallback = '', anchorId = '', speakerLabel = '') {
  if (!settings.llmEnabled) return fallback;
  const handle = showLoadingBar(anchorId, speakerLabel);
  try {
    const result = await _callOllamaBase(prompt, fallback);
    hideLoadingBar(handle);
    return result;
  } catch(e) {
    hideLoadingBar(handle);
    return fallback;
  }
}
// Remplacement global
// Les appels LLM via recrutement et ally chat utilisent callOllamaWithBar
// Les ancres : 'recruitCandidate' pour recrutement, 'allyChatPanel' pour ally chat

// ── OVERRIDE sendAllyChat pour loading bar ───────────────
const _sendAllyChatBase = sendAllyChat;
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
  state.allyChatLog = [];
  state.allyChatLog.push(`${lang==='fr'?'Vous':'You'} → ${agent.name} : ${msg}`);

  const system  = buildNpcSystemPrompt(agent);
  const prompt  = `${system}

${lang==='fr'?'Message reçu':'Message received'} : "${msg}"
${lang==='fr'?'Réponds en une ou deux phrases.':'Answer in one or two sentences.'}`;
  const fallback= `${agent.name} : ${pick(agent.catch_phrases||['...'])}`;

  const reply = await callOllamaWithBar(prompt, fallback, 'allyChatPanel', agent.name);

  state.allyChatLog.push(reply);
  if (Math.random() < 0.2) {
    const bonuses = {
      fr: ['Cette conversation te donne des informations utiles. +1 Intel.',"L'agent partage un tuyau. +50₽."],
      en: ['This conversation yields useful intel. +1 Intel.','The agent shares a tip. +50₽.'],
    };
    const bonus = pick(bonuses[lang]||bonuses.fr);
    if (bonus.includes('Intel')) state.resources.intel += 1;
    else state.resources.pokedollars += 50;
    state.allyChatLog.push(`💡 ${bonus}`);
    addLog(`💡 ${bonus}`);
  }
  addLog(`[Chat] ${agent.name} : ${reply.slice(0,80)}…`);
  saveState(); render();
}

// ── OVERRIDE recruitStepV2 pour loading bar ──────────────
async function recruitStepV2() {
  const r = state.recruit;
  if (!r || r.finished) return;
  const message = document.getElementById('recruitMessage')?.value?.trim();
  if (!message) return;
  if (state.resources.pokedollars < RECRUIT_COST_PER_STEP) {
    const msg = lang==='fr' ? `Pas assez de Pokédollars. (${RECRUIT_COST_PER_STEP}₽ requis)` : `Not enough Pokédollars. (${RECRUIT_COST_PER_STEP}₽ needed)`;
    document.getElementById('recruitTranscript').innerHTML += `<div class="logline" style="color:var(--danger)">${msg}</div>`;
    return;
  }
  state.resources.pokedollars -= RECRUIT_COST_PER_STEP;
  document.getElementById('recruitMessage').value = '';
  r.interactions += 1;
  r.transcript.push(`${lang==='fr'?'Vous':'You'} : ${message}`);

  const npc = r.npc;
  const systemPrompt = buildNpcSystemPrompt(npc);
  const fullPrompt = `${systemPrompt}

${lang==='fr'?'Message du recruteur':'Recruiter message'} : "${message}"

Réponds en JSON strict : {"reply":"...","scoreDelta":-2..2}`;
  const fallback = JSON.stringify({ reply:`${r.candidateName} : ${lang==='fr'?'Continue...':'Go on...'}`, scoreDelta:0 });

  const llmOut = await callOllamaWithBar(fullPrompt, fallback, 'recruitCandidate', r.candidateName);

  let reply = `${r.candidateName} : ${lang==='fr'?"Je t'écoute.":"I'm listening."}`;
  let delta  = 0;
  try {
    const jsonText = llmOut.includes('{') ? llmOut.slice(llmOut.indexOf('{'), llmOut.lastIndexOf('}')+1) : llmOut;
    const parsed   = JSON.parse(jsonText);
    reply = parsed.reply || reply;
    delta = Math.max(-2, Math.min(2, Number(parsed.scoreDelta)||0));
  } catch {
    delta = message.includes('Rocket') ? 1 : 0;
  }
  r.hiddenScore = Math.max(1, Math.min(10, r.hiddenScore + delta));
  r.transcript.push(reply);

  if (r.interactions >= RECRUIT_MAX_INTERACTIONS) {
    r.finished = true;
    if (r.hiddenScore >= 5) {
      const hasBourreau = Math.random() < 0.15;
      const newAgent = {
        id:`ag-${Date.now()}`, name:r.candidateName, rank:r.candidateRole,
        level:1, xp:0, cooldown:0, team:[], traits:hasBourreau?['bourreau_de_travail']:[],
        sprite:npc.sprite, personality:npc.personality,
        catch_phrases:npc.catch_phrases, pokemon_preferences:npc.pokemon_preferences,
        missions:[],
      };
      state.agents.push(newAgent);
      npc.possible_pokemon?.forEach(spFR => addPokemonWithCap(makePokemon(spFR)));
      state.reputation = Math.min(100,(state.reputation||0)+3);
      addLog(`✅ ${lang==='fr'?'Recrutement réussi':'Recruited'} : ${r.candidateName}${hasBourreau?' [Bourreau de travail]':''}`);
      r.transcript.push(`--- ${lang==='fr'?'Recrutement réussi':'Success'} ---`);
    } else {
      addLog(`❌ ${lang==='fr'?'Recrutement échoué':'Failed'} : ${r.candidateName}`);
      r.transcript.push(`--- ${lang==='fr'?'Refus':'Refused'} ---`);
    }
  }
  saveState(); render();
}

// ── RENDER SETTINGS V2 (avec model picker) ───────────────
function renderSettingsV2() {
  const overlay = document.getElementById('settingsOverlay');
  if (!overlay || overlay.classList.contains('hidden')) return;

  // Injecte le sélecteur de modèles si absent
  if (!document.getElementById('ollamaModelSelect')) {
    const modelLabel = document.getElementById('modelInput')?.closest('label');
    if (modelLabel) {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:grid;gap:4px;';
      wrapper.innerHTML = `
        <label style="font-size:.8em;color:var(--muted)">
          Modèles disponibles
          <div style="display:flex;gap:6px;align-items:center">
            <select id="ollamaModelSelect" style="flex:1"></select>
            <button id="refreshModelsBtn" class="small">🔄</button>
          </div>
          <small id="ollamaModelStatus" style="color:var(--muted)">—</small>
        </label>`;
      modelLabel.parentNode.insertBefore(wrapper, modelLabel.nextSibling);
      document.getElementById('refreshModelsBtn').onclick = fetchOllamaModels;
    }
  }
  fetchOllamaModels();
}

// CSS loading bar + blink
if (!document.getElementById('loadingBarStyle')) {
  const s = document.createElement('style');
  s.id = 'loadingBarStyle';
  s.textContent = `
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    #llmLoadingBar { display:none; }
  `;
  document.head.appendChild(s);
}

// Boot principal → bootV4() appelé plus haut
