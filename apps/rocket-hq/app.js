// ============================================================
// POKEFORGE — ROCKET HQ  app.js  v3  (Full FR + Gameplay+)
// ============================================================

// ── SPRITES ─────────────────────────────────────────────
const TRAINER_SPRITES = [
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunt.png',
  'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunf.png',
  'https://play.pokemonshowdown.com/sprites/trainers/giovanni-gen2.png',
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
  'roucool':'pidgey','roucoups':'pidgeotto','ronflex':'snorlax',
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
  'loupio':'ledyba','coxy':'ledian',
  'arakdo':'spinarak','migalos':'ariados',
  'vipélierre':'crobat',
  'coudlangue':'chinchou','lanturn':'lanturn',
  'pichu':'pichu','mélofée bébé':'cleffa','toudoudou':'igglybuff',
  'togepi':'togepi','togetic':'togetic',
  'natu':'natu','xatu':'xatu',
  'floravol':'mareep','lainergie':'flaaffy','pharamp':'ampharos',
  'maronille':'marill','azumarill':'azumarill',
  'granivol':'hoppip','entobulle':'skiploom','cotovol':'jumpluff',
  'écho':'aipom',
  'hocotat':'sunkern','hélionceau':'sunflora',
  'yanma':'yanma',
  'phanpy':'phanpy','donphan':'donphan',
  'noctali':'espeon','mentali':'umbreon',
  'munja':'murkrow',
  'lentsaï':'slowking','manzaï':'misdreavus',
  'farfuret':'sneasel',
  'magby':'magby','élébébé':'elekid','bébé-gato':'smoochum',
  'rémaid':'remoraid','octillery':'octillery',
  'coquiperl':'corsola','qwilfish':'qwilfish',
  'cizayox':'scizor','méga-lence':'shuckle','feuforêve':'houndour','démolosse':'houndoom',
  'magnéton':'magneton',
  'porygon2':'porygon2',
  'steelix':'steelix',
  'agildo':'heracross',
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
  dark:     ['munja','farfuret','feuforêve','démolosse'],
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
  { id:'Infiltration',   faction:'team_rocket', traits:['discret','loyal','nerveux'],      types:['poison','dark'],    sprites:['rocketgrunt','rocketgrunf'] },
  { id:'Science',        faction:'team_rocket', traits:['intelligent','froid','précis'],   types:['electric','psychic'],sprites:['scientist','scientistf'] },
  { id:'Combat',         faction:'team_rocket', traits:['agressif','courageux','brutal'],  types:['fighting','poison'],sprites:['rocketgrunt'] },
  { id:'Logistique',     faction:'team_rocket', traits:['organisé','méfiant','fiable'],    types:['normal','dark'],    sprites:['rocketgrunf'] },
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

const DEFAULT_SETTINGS = { llmEnabled:false, baseUrl:'http://localhost:11434', model:'gemma3:4b' };

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
function saveState()    { localStorage.setItem('pokeforge.rocket-hq.state', JSON.stringify(state)); }
function saveSettings() { localStorage.setItem('pokeforge.rocket-hq.settings', JSON.stringify(settings)); }
function loadState() { const r = localStorage.getItem('pokeforge.rocket-hq.state'); if (!r) return null; try { return JSON.parse(r); } catch { return null; } }
function loadSettings() { const r = localStorage.getItem('pokeforge.rocket-hq.settings'); if (!r) return {...DEFAULT_SETTINGS}; try { return {...DEFAULT_SETTINGS,...JSON.parse(r)}; } catch { return {...DEFAULT_SETTINGS}; } }

// Crée un objet Pokémon à partir d'un nom FR
function makePokemon(species_fr, level) {
  const species_en = FR_TO_EN[species_fr.toLowerCase()] || species_fr;
  return { id:`pk-${Date.now()}-${Math.floor(Math.random()*9999)}`, species_fr, species_en, level: level || 5+Math.floor(Math.random()*8), assignedAgentId:null };
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

// ── MISSIONS ─────────────────────────────────────────────
function rollAvailableMissions() {
  const shuffled = [...MISSIONS].sort(() => Math.random() - 0.5);
  state.availableMissions = shuffled.slice(0, 3);
}

function renderMissions() {
  let html = '<h4>Missions disponibles</h4>';
  if (!state.availableMissions?.length) { html += '<div class="card">Aucune mission disponible.</div>'; }
  else {
    html += state.availableMissions.map(m => {
      const agentLibre = state.agents.find(a => !(state.missions||[]).some(mi => mi.agentId === a.id));
      return `<div class="card">
        <strong>${m.nom}</strong> <small>[${m.risque}]</small><br>
        <small>${m.description}</small><br>
        <small>Durée : ${m.duree} tours — Récompense : ${Object.entries(m.recompense).map(([k,v])=>`${v} ${k}`).join(', ')}</small><br>
        ${agentLibre
          ? `<button onclick="assignMission('${m.id}','${agentLibre.id}')">Envoyer ${agentLibre.name}</button>`
          : '<small><em>Aucun agent disponible</em></small>'}
      </div>`;
    }).join('');
  }
  html += '<h4>Missions en cours</h4>';
  if (!state.missions?.length) { html += '<div class="card">Aucune mission en cours.</div>'; }
  else {
    html += state.missions.map(mi => {
      const agent = state.agents.find(a => a.id === mi.agentId);
      const m = MISSIONS.find(x => x.id === mi.missionId);
      return `<div class="card"><strong>${m?.nom || mi.missionId}</strong> — Agent : ${agent?.name || '?'} — ${mi.turnsLeft} tour(s) restant(s)</div>`;
    }).join('');
  }
  const missionsEl = document.getElementById('missionsList');
  if (missionsEl) missionsEl.innerHTML = html;
}

function assignMission(missionId, agentId) {
  const m = MISSIONS.find(x => x.id === missionId);
  if (!m) return;
  if (!state.missions) state.missions = [];
  state.missions.push({ missionId, agentId, turnsLeft: m.duree, recompense: m.recompense });
  state.availableMissions = state.availableMissions.filter(x => x.id !== missionId);
  const agent = state.agents.find(a => a.id === agentId);
  addLog(`Mission lancée : "${m.nom}" — Agent ${agent?.name} envoyé.`);
  saveState(); render();
}

function processMissions() {
  if (!state.missions) state.missions = [];
  state.missions.forEach(mi => mi.turnsLeft -= 1);
  const terminées = state.missions.filter(mi => mi.turnsLeft <= 0);
  state.missions = state.missions.filter(mi => mi.turnsLeft > 0);
  terminées.forEach(mi => {
    const m = MISSIONS.find(x => x.id === mi.missionId);
    const agent = state.agents.find(a => a.id === mi.agentId);
    // Succès ou échec selon réputation
    const success = Math.random() * 100 < (40 + state.reputation);
    if (success) {
      Object.entries(mi.recompense).forEach(([k,v]) => { if (state.resources[k] !== undefined) state.resources[k] += v; });
      state.reputation = Math.min(100, state.reputation + 2);
      addLog(`✅ Mission "${m?.nom}" réussie par ${agent?.name}. Récompenses perçues.`);
    } else {
      state.reputation = Math.max(0, state.reputation - 3);
      addLog(`❌ Mission "${m?.nom}" échouée. ${agent?.name} revient bredouille.`);
    }
  });
}

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

function renderRooms() {
  ui.roomsList.innerHTML = Object.entries(state.rooms).map(([roomId, room]) => `
    <div class="room">
      <div><strong>${room.nom}</strong> Niv.${room.level}</div>
      <div class="row"><small>Prod./tour : ${room.baseIncome * room.level}</small>
      <button data-room="${roomId}">Améliorer ${room.upgradeCost}$</button></div>
    </div>`).join('');
  ui.roomsList.querySelectorAll('button[data-room]').forEach(btn => {
    btn.onclick = () => {
      const room = state.rooms[btn.dataset.room];
      if (state.resources.pokedollars < room.upgradeCost) return addLog(`Pas assez de Pokédollars pour ${room.nom}.`);
      state.resources.pokedollars -= room.upgradeCost;
      room.level += 1;
      room.upgradeCost = Math.round(room.upgradeCost * 1.5);
      addLog(`${room.nom} améliorée — niveau ${room.level}.`);
      saveState(); render();
    };
  });
}

function renderPokemonPanels() {
  ui.pokemonOwnedList.innerHTML = state.pokemons.map(p => {
    const agent = state.agents.find(a => a.id === p.assignedAgentId);
    const spFR = p.species_fr || p.species_en || p.species;
    const spEN = p.species_en || FR_TO_EN[spFR?.toLowerCase()] || spFR;
    return `<div class="card pokemon">
      <img class="poke-sprite" src="${pokeSprite(spEN)}" alt="${spFR}">
      <div>${spFR} Niv.${p.level}</div>
      <small>${agent ? `→ ${agent.name}` : 'Non assigné'}</small>
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
    : '<div class="card">Aucun nouveau Pokémon ce tour.</div>';
}

function renderTeamBuilder() {
  ui.agentSelect.innerHTML  = state.agents.map(a => `<option value="${a.id}">${a.name} – ${a.rank}</option>`).join('');
  ui.pokemonSelect.innerHTML = state.pokemons.map(p => {
    const spFR = p.species_fr || p.species;
    return `<option value="${p.id}">${spFR} Niv.${p.level}</option>`;
  }).join('');
  ui.agentTeams.innerHTML = state.agents.map(a => {
    const names = a.team.map(id => { const p = state.pokemons.find(x => x.id === id); return p?.species_fr || p?.species; }).filter(Boolean);
    const sprite = a.sprite ? `<img src="${a.sprite}" style="height:40px;vertical-align:middle;margin-right:6px;">` : '';
    return `<div class="card">${sprite}<strong>${a.name}</strong> — ${a.rank}
      <div><small>${names.length ? names.join(', ') : 'Aucune équipe'}</small></div>
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

function render() {
  ui.turnValue.textContent = state.turn;
  ui.llmBadge.textContent  = settings.llmEnabled ? 'ON' : 'OFF';
  ui.playerName.textContent = `${state.profile.firstName} ${state.profile.lastName}`;
  ui.teamName.textContent   = state.profile.team;
  ui.playerSprite.src       = state.profile.sprite;
  ui.introOverlay.classList.toggle('hidden', state.profile.initialized);
  renderResources();
  renderRooms();
  renderPokemonPanels();
  renderTeamBuilder();
  renderAgentsAndRecruitment();
  renderNpcs();
  renderMissions();
  ui.logOutput.innerHTML = state.log.map(l => `<div class="logline">${l}</div>`).join('');
  ui.llmEnabledToggle.checked = settings.llmEnabled;
  ui.baseUrlInput.value = settings.baseUrl;
  ui.modelInput.value   = settings.model;
}

// ── GAME LOOP ────────────────────────────────────────────
function processTurn() {
  state.turn += 1;
  state.newPokemonsThisTurn = [];

  state.resources.pokedollars    += state.rooms.command.baseIncome  * state.rooms.command.level;
  state.resources.capturePoints  += state.rooms.capture.baseIncome  * state.rooms.capture.level;
  state.resources.breedingPoints += state.rooms.breeding.baseIncome * state.rooms.breeding.level;
  state.resources.intel          += state.rooms.training.baseIncome * state.rooms.training.level;

  while (state.resources.capturePoints >= 3) {
    state.resources.capturePoints -= 3;
    const pFR = pick(POKEDEX_POOL_FR);
    const pok = makePokemon(pFR, 6 + Math.floor(Math.random()*7));
    state.pokemons.push(pok); state.newPokemonsThisTurn.push(pok);
    addLog(`Capture réussie : ${pFR}.`);
  }
  while (state.resources.breedingPoints >= 4) {
    state.resources.breedingPoints -= 4;
    state.breedingQueue.push({ turnsLeft:2, species_fr: pick(POKEDEX_POOL_FR) });
    addLog('Un œuf est ajouté à la nurserie.');
  }
  state.breedingQueue.forEach(e => e.turnsLeft -= 1);
  const hatched = state.breedingQueue.filter(e => e.turnsLeft <= 0);
  state.breedingQueue = state.breedingQueue.filter(e => e.turnsLeft > 0);
  hatched.forEach(e => {
    const pok = makePokemon(e.species_fr, 5 + Math.floor(Math.random()*6));
    state.pokemons.push(pok); state.newPokemonsThisTurn.push(pok);
    addLog(`Éclosion : ${e.species_fr} rejoint la base.`);
  });

  processMissions();
  rollRandomEvent();
  rollAvailableMissions();

  if (state.recruit?.finished) {
    initRecruit();
    addLog(`Nouveau candidat disponible : ${state.recruit.candidateName} (${state.recruit.candidateRole}).`);
  }

  saveState(); render();
}

// ── TEAM ASSIGNMENT ──────────────────────────────────────
function assignTeam() {
  const agentId = ui.agentSelect.value;
  const selectedIds = Array.from(ui.pokemonSelect.selectedOptions).map(o => o.value).slice(0,3);
  const agent = state.agents.find(a => a.id === agentId);
  if (!agent) return;
  agent.team.forEach(id => { const p = state.pokemons.find(x => x.id===id); if (p) p.assignedAgentId=null; });
  agent.team = selectedIds;
  selectedIds.forEach(id => { const p = state.pokemons.find(x => x.id===id); if (p) p.assignedAgentId=agent.id; });
  addLog(`Équipe assignée à ${agent.name} (${agent.team.length}/3).`);
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
      npc.possible_pokemon.forEach(spFR => { state.pokemons.push(makePokemon(spFR)); });
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
  ui.nextTurnBtn.onclick = processTurn;
  ui.assignTeamBtn.onclick = assignTeam;
  ui.startTrainingFightBtn.onclick = runTrainingBattle;
  ui.sendRecruitBtn.onclick = recruitStep;
  ui.recruitMessage.addEventListener('keydown', e => { if(e.key==='Enter') recruitStep(); });
  ui.npcSendBtn.onclick = talkToNpc;
  ui.npcMessage.addEventListener('keydown', e => { if(e.key==='Enter') talkToNpc(); });
  ui.challengeYesBtn.onclick = acceptNpcChallenge;
  ui.challengeNoBtn.onclick  = refuseNpcChallenge;
  ui.openSettingsBtn.onclick  = () => ui.settingsOverlay.classList.remove('hidden');
  ui.closeSettingsBtn.onclick = () => ui.settingsOverlay.classList.add('hidden');
  ui.spriteSelect.onchange = () => { ui.spritePreview.src = ui.spriteSelect.value; };
  ui.introStartBtn.onclick = () => {
    state.profile.team=ui.teamInput.value.trim()||'Team Rocket';
    state.profile.firstName=ui.firstNameInput.value.trim()||'Ari';
    state.profile.lastName=ui.lastNameInput.value.trim()||'Voss';
    state.profile.sprite=ui.spriteSelect.value;
    state.profile.initialized=true;
    addLog(`Profil créé : ${state.profile.firstName} ${state.profile.lastName} — ${state.profile.team}`);
    saveState(); render();
  };
  ui.llmEnabledToggle.onchange = () => { settings.llmEnabled=ui.llmEnabledToggle.checked; saveSettings(); render(); };
  ui.baseUrlInput.onchange = () => { settings.baseUrl=ui.baseUrlInput.value.trim(); saveSettings(); };
  ui.modelInput.onchange   = () => { settings.model=ui.modelInput.value.trim(); saveSettings(); };
  ui.testOllamaBtn.onclick = async () => {
    try {
      const r = await fetch(`${settings.baseUrl.replace(/\/$/,'')}/api/tags`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      ui.llmStatus.textContent = `OK — ${data.models?.map(m=>m.name.slice(0,8)).join(', ')}`;
    } catch(e) { ui.llmStatus.textContent = `Erreur Ollama : ${e.message}`; }
  };
  ui.saveBtn.onclick  = () => { saveState(); ui.llmStatus.textContent='Save locale OK'; };
  ui.loadBtn.onclick  = () => { const l=loadState(); if(l){state=l;render();} };
  ui.resetBtn.onclick = () => { localStorage.removeItem('pokeforge.rocket-hq.state'); state=structuredClone(BASE_STATE); openIntro(); addLog('Bienvenue dans Rocket HQ.'); render(); };
  ui.exportSaveBtn.onclick = () => exportFile('rocket-hq-save.txt', JSON.stringify(state,null,2));
  ui.importSaveBtn.onclick = () => ui.saveFileInput.click();
  ui.saveFileInput.onchange = () => {
    const file = ui.saveFileInput.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { try { state={...structuredClone(BASE_STATE),...JSON.parse(reader.result)}; addLog('Save importée.'); saveState(); render(); } catch { ui.llmStatus.textContent='Fichier invalide.'; } };
    reader.readAsText(file); ui.saveFileInput.value='';
  };
  ui.exportCodeBtn.onclick = () => { const code=btoa(unescape(encodeURIComponent(JSON.stringify(state)))); navigator.clipboard?.writeText(code); ui.llmStatus.textContent=`Code copié : ${code.slice(0,36)}…`; };
  ui.importCodeBtn.onclick = () => { const code=prompt('Colle le code :'); if(!code) return; try { state={...structuredClone(BASE_STATE),...JSON.parse(decodeURIComponent(escape(atob(code.trim()))))}; addLog('Save importée via code.'); saveState(); render(); } catch { ui.llmStatus.textContent='Code invalide.'; } };
  ui.exportLogsBtn.onclick = () => exportFile('rocket-hq-logs.txt', state.log.join('\n'));
}

// ── BOOT ─────────────────────────────────────────────────
openIntro();
bindEvents();
if (!state.recruit) initRecruit();
if (!state.availableMissions?.length) rollAvailableMissions();
if (!state.log.length) addLog('Bienvenue dans Rocket HQ.');
render();
