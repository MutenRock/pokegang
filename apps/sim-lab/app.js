(function () {
  const SAVE_KEY = 'pokeforge-sim-lab-save-v1';

  const LOCALES = {
    en: {
      title: 'First Gameplay Prototype',
      subtitle: 'A living micro-sandbox with persistent NPCs, creatures, events, and player choices.',
      statusTitle: 'Status',
      mapTitle: 'World map',
      actionsTitle: 'Actions',
      rosterTitle: 'People & creatures',
      logTitle: 'Event log',
      newRun: 'New run',
      save: 'Save',
      load: 'Load',
      goalPrefix: 'Current direction',
      goalSubtle: 'This is a soft objective for the current run. It nudges the sandbox without locking it down.',
      turn: 'Turn',
      weather: 'Weather',
      seed: 'Seed',
      location: 'Location',
      energy: 'Energy',
      hunger: 'Hunger',
      trust: 'Camp trust',
      materials: 'Materials',
      berries: 'Berries',
      insight: 'Insight',
      safety: 'Safety',
      danger: 'Danger',
      resources: 'Resources',
      connections: 'Connections',
      mood: 'Mood',
      trustLevel: 'Trust',
      memory: 'Recent memory',
      role: 'Role',
      species: 'Species',
      noMemory: 'Nothing notable yet.',
      talkNoTarget: 'No one is here to talk to.',
      chooseAction: 'Choose your next move. Every action advances the world by one turn.',
      actionTravel: 'Travel',
      actionForage: 'Forage',
      actionRest: 'Rest',
      actionTalk: 'Talk',
      actionObserve: 'Observe',
      actionSearch: 'Search ruins',
      actionBond: 'Bond with creature',
      moveHere: 'Move here',
      moveBlocked: 'Too far away right now.',
      saveOk: 'Run saved locally.',
      loadMissing: 'No saved run found.',
      loadOk: 'Saved run loaded.',
      statHigh: 'High',
      statMedium: 'Medium',
      statLow: 'Low',
      weatherClear: 'Clear skies',
      weatherStorm: 'Static storm',
      weatherMist: 'Silver mist',
      weatherHeat: 'Dry heat',
      weatherRain: 'Soft rain',
      goal1: 'Stabilize the camp and reach 8 trust before turn 12.',
      goal2: 'Learn two creature behaviors and gather 6 insight before turn 12.',
      goal3: 'Recover enough materials to make the frontier safe again.',
      logIntro: 'A new expedition begins around the Forgecamp frontier.',
      logSaved: 'The camp ledger was updated.',
      logLoaded: 'The camp ledger was restored.',
      bondFail: 'The nearby creature watches you carefully but stays distant.',
      bondNone: 'No creature is close enough to bond with.',
      talkGood: '{name} shares a useful lead and seems more open to your guidance.',
      talkNeutral: '{name} talks briefly but keeps some distance.',
      talkBad: '{name} is tense and avoids giving clear answers.',
      observeText: 'You take time to read the area. Patterns begin to emerge.',
      restText: 'You step back, eat a little, and let the world move without you.',
      forageText: 'You gather what the land is willing to give right now.',
      searchText: 'You dig through old structures for scraps, clues, and trouble.',
      travelText: 'You move toward {place}, leaving traces behind.',
      trustWordLow: 'fragile',
      trustWordMid: 'steady',
      trustWordHigh: 'solid',
      rolePlayer: 'Player',
      roleNpc: 'NPC',
      roleCreature: 'Creature',
      btnDisabled: 'Unavailable now',
    },
    fr: {
      title: 'Premier prototype de gameplay',
      subtitle: 'Un micro-sandbox vivant avec PNJ persistants, créatures, événements et choix du joueur.',
      statusTitle: 'État',
      mapTitle: 'Carte du monde',
      actionsTitle: 'Actions',
      rosterTitle: 'Personnes & créatures',
      logTitle: 'Journal des événements',
      newRun: 'Nouvelle partie',
      save: 'Sauvegarder',
      load: 'Charger',
      goalPrefix: 'Direction actuelle',
      goalSubtle: 'C’est un objectif souple pour la partie en cours. Il oriente le bac à sable sans le verrouiller.',
      turn: 'Tour',
      weather: 'Météo',
      seed: 'Seed',
      location: 'Lieu',
      energy: 'Énergie',
      hunger: 'Faim',
      trust: 'Confiance du camp',
      materials: 'Matériaux',
      berries: 'Baies',
      insight: 'Intuition',
      safety: 'Sécurité',
      danger: 'Danger',
      resources: 'Ressources',
      connections: 'Connexions',
      mood: 'Humeur',
      trustLevel: 'Confiance',
      memory: 'Mémoire récente',
      role: 'Rôle',
      species: 'Espèce',
      noMemory: 'Rien de notable pour le moment.',
      talkNoTarget: 'Personne n’est là pour discuter.',
      chooseAction: 'Choisis ton prochain mouvement. Chaque action fait avancer le monde d’un tour.',
      actionTravel: 'Voyager',
      actionForage: 'Récupérer',
      actionRest: 'Se reposer',
      actionTalk: 'Discuter',
      actionObserve: 'Observer',
      actionSearch: 'Fouiller les ruines',
      actionBond: 'Créer un lien',
      moveHere: 'Aller ici',
      moveBlocked: 'Trop loin pour l’instant.',
      saveOk: 'Partie sauvegardée en local.',
      loadMissing: 'Aucune sauvegarde trouvée.',
      loadOk: 'Sauvegarde chargée.',
      statHigh: 'Élevé',
      statMedium: 'Moyen',
      statLow: 'Faible',
      weatherClear: 'Ciel clair',
      weatherStorm: 'Orage statique',
      weatherMist: 'Brume argentée',
      weatherHeat: 'Chaleur sèche',
      weatherRain: 'Pluie légère',
      goal1: 'Stabiliser le camp et atteindre 8 de confiance avant le tour 12.',
      goal2: 'Comprendre deux comportements de créatures et atteindre 6 d’intuition avant le tour 12.',
      goal3: 'Récupérer assez de matériaux pour sécuriser de nouveau la frontière.',
      logIntro: 'Une nouvelle expédition débute autour de la frontière du Forgecamp.',
      logSaved: 'Le registre du camp a été mis à jour.',
      logLoaded: 'Le registre du camp a été restauré.',
      bondFail: 'La créature proche t’observe attentivement mais garde ses distances.',
      bondNone: 'Aucune créature assez proche pour créer un lien.',
      talkGood: '{name} partage une piste utile et semble plus réceptif à tes choix.',
      talkNeutral: '{name} parle brièvement mais garde une certaine distance.',
      talkBad: '{name} est tendu et évite de donner des réponses claires.',
      observeText: 'Tu prends le temps de lire le terrain. Des schémas commencent à émerger.',
      restText: 'Tu prends du recul, manges un peu, et laisses le monde bouger sans toi.',
      forageText: 'Tu récupères ce que le terrain accepte de te donner pour l’instant.',
      searchText: 'Tu fouilles les structures anciennes pour des matériaux, des indices et des ennuis.',
      travelText: 'Tu te déplaces vers {place}, en laissant des traces derrière toi.',
      trustWordLow: 'fragile',
      trustWordMid: 'stable',
      trustWordHigh: 'solide',
      rolePlayer: 'Joueur',
      roleNpc: 'PNJ',
      roleCreature: 'Créature',
      btnDisabled: 'Indisponible',
    },
  };

  const LOCATIONS = [
    {
      id: 'forgecamp',
      x: 0,
      y: 0,
      name: { en: 'Forgecamp', fr: 'Forgecamp' },
      flavor: {
        en: 'A rough frontier camp where ideas, scraps, and rumors keep circulating.',
        fr: 'Un camp frontalier brut où idées, ferraille et rumeurs circulent sans cesse.',
      },
      resources: { materials: 1, berries: 1, insight: 0 },
      safety: 8,
    },
    {
      id: 'glowwood',
      x: 1,
      y: 0,
      name: { en: 'Glowwood', fr: 'Bois-Lueur' },
      flavor: {
        en: 'A bright forest where shy creatures watch from the roots.',
        fr: 'Une forêt lumineuse où des créatures discrètes observent depuis les racines.',
      },
      resources: { materials: 0, berries: 2, insight: 1 },
      safety: 6,
    },
    {
      id: 'glasslake',
      x: 2,
      y: 0,
      name: { en: 'Glasslake', fr: 'Lac de Verre' },
      flavor: {
        en: 'Clear water, reflective silence, and traces of something electric beneath the surface.',
        fr: 'Eau claire, silence réfléchissant, et traces de quelque chose d’électrique sous la surface.',
      },
      resources: { materials: 0, berries: 1, insight: 2 },
      safety: 7,
    },
    {
      id: 'redmeadow',
      x: 0,
      y: 1,
      name: { en: 'Red Meadow', fr: 'Prairie Rouge' },
      flavor: {
        en: 'Open ground, old tracks, and the easiest route for travelers and trouble alike.',
        fr: 'Terrain ouvert, vieilles traces, et itinéraire le plus simple pour les voyageurs comme les ennuis.',
      },
      resources: { materials: 1, berries: 1, insight: 0 },
      safety: 5,
    },
    {
      id: 'oldtower',
      x: 1,
      y: 1,
      name: { en: 'Old Tower', fr: 'Vieille Tour' },
      flavor: {
        en: 'Half-collapsed ruins that seem to remember more than the people nearby do.',
        fr: 'Des ruines à moitié effondrées qui semblent se souvenir de plus de choses que les habitants alentours.',
      },
      resources: { materials: 2, berries: 0, insight: 2 },
      safety: 3,
    },
    {
      id: 'thunderpass',
      x: 2,
      y: 1,
      name: { en: 'Thunder Pass', fr: 'Passe du Tonnerre' },
      flavor: {
        en: 'A harsh ridge crossed by bursts of static and restless winds.',
        fr: 'Une crête rude traversée par des salves statiques et des vents agités.',
      },
      resources: { materials: 1, berries: 0, insight: 2 },
      safety: 2,
    },
    {
      id: 'mossden',
      x: 0,
      y: 2,
      name: { en: 'Moss Den', fr: 'Tanière Mousse' },
      flavor: {
        en: 'A low and humid refuge where creatures feed and heal.',
        fr: 'Un refuge bas et humide où les créatures se nourrissent et récupèrent.',
      },
      resources: { materials: 0, berries: 2, insight: 1 },
      safety: 6,
    },
    {
      id: 'emberpit',
      x: 1,
      y: 2,
      name: { en: 'Ember Pit', fr: 'Fosse aux Braises' },
      flavor: {
        en: 'Warm stone, sparks underfoot, and signs of territorial behavior.',
        fr: 'Pierre chaude, étincelles sous les pieds, et signes de comportements territoriaux.',
      },
      resources: { materials: 2, berries: 0, insight: 1 },
      safety: 4,
    },
    {
      id: 'windhollow',
      x: 2,
      y: 2,
      name: { en: 'Wind Hollow', fr: 'Creux du Vent' },
      flavor: {
        en: 'A quiet basin ideal for scouting, listening, and watching routes converge.',
        fr: 'Une cuvette calme idéale pour l’éclaireur, l’écoute et l’observation des routes qui convergent.',
      },
      resources: { materials: 1, berries: 1, insight: 1 },
      safety: 7,
    },
  ];

  const NPC_TEMPLATES = [
    {
      id: 'rowan',
      name: 'Rowan',
      role: { en: 'Scout', fr: 'Éclaireur' },
      mood: 6,
      trust: 5,
      locationId: 'redmeadow',
      goal: { en: 'map safe routes', fr: 'cartographier les routes sûres' },
    },
    {
      id: 'mira',
      name: 'Mira',
      role: { en: 'Medic', fr: 'Soigneuse' },
      mood: 7,
      trust: 6,
      locationId: 'forgecamp',
      goal: { en: 'keep the camp stable', fr: 'garder le camp stable' },
    },
    {
      id: 'bastion',
      name: 'Bastion',
      role: { en: 'Tinkerer', fr: 'Bricoleur' },
      mood: 5,
      trust: 4,
      locationId: 'oldtower',
      goal: { en: 'recover old components', fr: 'récupérer de vieux composants' },
    },
  ];

  const CREATURE_TEMPLATES = [
    {
      id: 'embercub',
      name: 'Embercub',
      species: { en: 'Fire cub', fr: 'Petit braisard' },
      temperament: 6,
      bond: 2,
      locationId: 'emberpit',
      memory: [],
    },
    {
      id: 'mossling',
      name: 'Mossling',
      species: { en: 'Moss grazer', fr: 'Broute-mousse' },
      temperament: 4,
      bond: 3,
      locationId: 'mossden',
      memory: [],
    },
    {
      id: 'voltfin',
      name: 'Voltfin',
      species: { en: 'Static glider', fr: 'Planeur statique' },
      temperament: 7,
      bond: 1,
      locationId: 'glasslake',
      memory: [],
    },
  ];

  const ACTIONS = [
    { id: 'travel', type: 'movement' },
    { id: 'forage', type: 'resource' },
    { id: 'rest', type: 'recovery' },
    { id: 'talk', type: 'social' },
    { id: 'observe', type: 'knowledge' },
    { id: 'search', type: 'risk' },
    { id: 'bond', type: 'creature' },
  ];

  const app = {
    state: null,
    lang: 'en',
    selectedLocationId: 'forgecamp',
  };

  const nodes = {
    title: document.getElementById('title'),
    subtitle: document.getElementById('subtitle'),
    statusTitle: document.getElementById('statusTitle'),
    mapTitle: document.getElementById('mapTitle'),
    actionsTitle: document.getElementById('actionsTitle'),
    rosterTitle: document.getElementById('rosterTitle'),
    logTitle: document.getElementById('logTitle'),
    statusGrid: document.getElementById('statusGrid'),
    activeGoal: document.getElementById('activeGoal'),
    mapGrid: document.getElementById('mapGrid'),
    locationCard: document.getElementById('locationCard'),
    actionsGrid: document.getElementById('actionsGrid'),
    rosterList: document.getElementById('rosterList'),
    logList: document.getElementById('logList'),
    turnLabel: document.getElementById('turnLabel'),
    weatherChip: document.getElementById('weatherChip'),
    seedLabel: document.getElementById('seedLabel'),
    newRunButton: document.getElementById('newRunButton'),
    saveButton: document.getElementById('saveButton'),
    loadButton: document.getElementById('loadButton'),
    langToggle: document.getElementById('langToggle'),
  };

  function t(key, vars) {
    const table = LOCALES[app.lang] || LOCALES.en;
    let text = table[key] || LOCALES.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach((name) => {
        text = text.replace(`{${name}}`, vars[name]);
      });
    }
    return text;
  }

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function choice(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function createState() {
    const seed = Math.random().toString(36).slice(2, 8).toUpperCase();
    const goals = ['goal1', 'goal2', 'goal3'];
    return {
      seed,
      turn: 1,
      weather: choice(['weatherClear', 'weatherMist', 'weatherRain']),
      goalKey: choice(goals),
      player: {
        locationId: 'forgecamp',
        energy: 7,
        hunger: 3,
        trust: 5,
        materials: 1,
        berries: 2,
        insight: 0,
      },
      world: {
        tension: 2,
        safety: 6,
      },
      npcs: clone(NPC_TEMPLATES).map((npc) => ({ ...npc, memory: [] })),
      creatures: clone(CREATURE_TEMPLATES),
      logs: [
        {
          turn: 1,
          tone: 'neutral',
          text: t('logIntro'),
        },
      ],
    };
  }

  function getLocation(locationId) {
    return LOCATIONS.find((location) => location.id === locationId);
  }

  function getNeighbors(locationId) {
    const current = getLocation(locationId);
    return LOCATIONS.filter((location) => {
      const dx = Math.abs(location.x - current.x);
      const dy = Math.abs(location.y - current.y);
      return dx + dy === 1;
    });
  }

  function getEntitiesAt(locationId) {
    const npcs = app.state.npcs.filter((npc) => npc.locationId === locationId);
    const creatures = app.state.creatures.filter((creature) => creature.locationId === locationId);
    return { npcs, creatures };
  }

  function addLog(text, tone) {
    app.state.logs.unshift({ turn: app.state.turn, tone: tone || 'neutral', text });
    app.state.logs = app.state.logs.slice(0, 28);
  }

  function updateMemory(entity, entry) {
    entity.memory = entity.memory || [];
    entity.memory.unshift(entry);
    entity.memory = entity.memory.slice(0, 4);
  }

  function moodLabel(value) {
    if (value >= 7) return t('statHigh');
    if (value >= 4) return t('statMedium');
    return t('statLow');
  }

  function trustWord(value) {
    if (value >= 8) return t('trustWordHigh');
    if (value >= 5) return t('trustWordMid');
    return t('trustWordLow');
  }

  function simulateNpcTurn() {
    app.state.npcs.forEach((npc) => {
      const localSafety = getLocation(npc.locationId).safety;
      const decisions = [];

      if (npc.mood <= 4) decisions.push('rest');
      if (localSafety <= 4) decisions.push('move-safe');
      decisions.push('search', 'assist', 'move-random');

      const decision = choice(decisions);
      if (decision === 'move-safe') {
        const safer = getNeighbors(npc.locationId)
          .sort((a, b) => b.safety - a.safety)[0];
        if (safer) npc.locationId = safer.id;
      } else if (decision === 'move-random') {
        const next = choice(getNeighbors(npc.locationId));
        if (next) npc.locationId = next.id;
      } else if (decision === 'search') {
        npc.mood = clamp(npc.mood - 1 + Math.round(Math.random()), 1, 10);
        if (Math.random() > 0.5) {
          app.state.player.materials += 1;
          updateMemory(npc, `${npc.name} recovered useful scraps.`);
          addLog(`${npc.name} returns with salvage for the camp.`, 'good');
        }
      } else if (decision === 'assist') {
        app.state.player.trust = clamp(app.state.player.trust + 1, 0, 10);
        npc.trust = clamp(npc.trust + 1, 0, 10);
        updateMemory(npc, `${npc.name} helped steady the camp.`);
      } else if (decision === 'rest') {
        npc.mood = clamp(npc.mood + 2, 1, 10);
      }
    });
  }

  function simulateCreatureTurn() {
    app.state.creatures.forEach((creature) => {
      const options = ['stay', 'move', 'react'];
      const decision = choice(options);
      if (decision === 'move') {
        const neighbors = getNeighbors(creature.locationId);
        const next = choice(neighbors);
        if (next) creature.locationId = next.id;
      }
      if (decision === 'react' && Math.random() > 0.55) {
        creature.bond = clamp(creature.bond + 1, 0, 10);
        updateMemory(creature, `${creature.name} seems less wary today.`);
      }
    });
  }

  function simulateWorldTurn() {
    const weatherOptions = ['weatherClear', 'weatherStorm', 'weatherMist', 'weatherHeat', 'weatherRain'];
    if (Math.random() > 0.4) {
      app.state.weather = choice(weatherOptions);
    }

    if (Math.random() > 0.6) {
      const location = choice(LOCATIONS);
      const events = [
        `A strange signal rolls through ${location.name.en}.`,
        `Tracks multiply around ${location.name.en}.`,
        `Something valuable may be hidden near ${location.name.en}.`,
      ];
      addLog(renderFlavor(choice(events)), Math.random() > 0.72 ? 'alert' : 'neutral');
      app.state.world.tension = clamp(app.state.world.tension + 1, 0, 10);
    } else {
      app.state.world.tension = clamp(app.state.world.tension - 1, 0, 10);
    }

    app.state.world.safety = clamp(10 - app.state.world.tension + Math.floor(app.state.player.trust / 2), 0, 10);
  }

  function endTurn() {
    app.state.turn += 1;
    app.state.player.hunger = clamp(app.state.player.hunger + 1, 0, 10);
    app.state.player.energy = clamp(app.state.player.energy - 1, 0, 10);

    if (app.state.player.hunger >= 7) {
      app.state.player.trust = clamp(app.state.player.trust - 1, 0, 10);
      addLog(app.lang === 'fr' ? 'Le manque de nourriture pèse sur le moral du camp.' : 'Food shortages begin to hurt camp morale.', 'alert');
    }

    simulateNpcTurn();
    simulateCreatureTurn();
    simulateWorldTurn();

    render();
  }

  function renderFlavor(baseText) {
    // Future LLM hook: rewrite these lines with an API or local model.
    if (app.lang === 'fr') {
      return baseText
        .replace('A strange signal rolls through', 'Un signal étrange traverse')
        .replace('Tracks multiply around', 'Des traces se multiplient autour de')
        .replace('Something valuable may be hidden near', 'Quelque chose de précieux pourrait être caché près de');
    }
    return baseText;
  }

  function travelTo(locationId) {
    if (locationId === app.state.player.locationId) return;
    const neighbors = getNeighbors(app.state.player.locationId);
    const isReachable = neighbors.some((location) => location.id === locationId);
    if (!isReachable) {
      addLog(t('moveBlocked'), 'alert');
      render();
      return;
    }
    app.state.player.locationId = locationId;
    app.selectedLocationId = locationId;
    addLog(t('travelText', { place: getLocation(locationId).name[app.lang] }), 'neutral');
    endTurn();
  }

  function doForage() {
    const location = getLocation(app.state.player.locationId);
    app.state.player.berries += location.resources.berries;
    app.state.player.materials += location.resources.materials;
    if (location.resources.insight > 0 && Math.random() > 0.45) {
      app.state.player.insight += location.resources.insight;
    }
    addLog(t('forageText'), 'good');
    endTurn();
  }

  function doRest() {
    app.state.player.energy = clamp(app.state.player.energy + 3, 0, 10);
    app.state.player.hunger = clamp(app.state.player.hunger - 1, 0, 10);
    addLog(t('restText'), 'good');
    endTurn();
  }

  function doObserve() {
    app.state.player.insight = clamp(app.state.player.insight + 2, 0, 99);
    addLog(t('observeText'), 'good');
    endTurn();
  }

  function doSearch() {
    const location = getLocation(app.state.player.locationId);
    const success = Math.random() + location.resources.materials * 0.15;
    app.state.player.energy = clamp(app.state.player.energy - 1, 0, 10);
    if (success > 0.75) {
      app.state.player.materials += 2;
      app.state.player.insight += 1;
      addLog(t('searchText'), 'good');
    } else {
      app.state.world.tension = clamp(app.state.world.tension + 2, 0, 10);
      app.state.player.trust = clamp(app.state.player.trust - 1, 0, 10);
      addLog(app.lang === 'fr' ? 'Tu remues quelque chose qui aurait mieux valu laisser tranquille.' : 'You disturb something that may have been better left alone.', 'alert');
    }
    endTurn();
  }

  function doTalk() {
    const candidates = getEntitiesAt(app.state.player.locationId).npcs;
    const target = candidates.sort((a, b) => b.trust - a.trust)[0];
    if (!target) {
      addLog(t('talkNoTarget'), 'alert');
      render();
      return;
    }

    if (target.trust >= 6) {
      target.trust = clamp(target.trust + 1, 0, 10);
      target.mood = clamp(target.mood + 1, 0, 10);
      app.state.player.trust = clamp(app.state.player.trust + 1, 0, 10);
      updateMemory(target, app.lang === 'fr' ? 'Conversation utile avec le joueur.' : 'A useful exchange with the player.');
      addLog(t('talkGood', { name: target.name }), 'good');
    } else if (target.trust >= 4) {
      target.trust = clamp(target.trust + 1, 0, 10);
      addLog(t('talkNeutral', { name: target.name }), 'neutral');
    } else {
      target.mood = clamp(target.mood - 1, 0, 10);
      addLog(t('talkBad', { name: target.name }), 'alert');
    }
    endTurn();
  }

  function doBond() {
    const creatures = getEntitiesAt(app.state.player.locationId).creatures;
    const target = creatures.sort((a, b) => a.bond - b.bond)[0];
    if (!target) {
      addLog(t('bondNone'), 'alert');
      render();
      return;
    }

    const chance = Math.random() + app.state.player.insight * 0.07 + app.state.player.berries * 0.03;
    if (chance > 0.95) {
      target.bond = clamp(target.bond + 3, 0, 10);
      app.state.player.trust = clamp(app.state.player.trust + 1, 0, 10);
      app.state.player.berries = clamp(app.state.player.berries - 1, 0, 99);
      updateMemory(target, app.lang === 'fr' ? 'Un lien s’est renforcé avec le joueur.' : 'A bond with the player has grown stronger.');
      addLog(app.lang === 'fr' ? `${target.name} accepte de rester près du camp pour le moment.` : `${target.name} decides to remain near the camp for now.`, 'good');
    } else {
      addLog(t('bondFail'), 'neutral');
    }
    endTurn();
  }

  function getActionDefinitions() {
    const neighbors = getNeighbors(app.state.player.locationId);
    const selectedLocation = getLocation(app.selectedLocationId);
    const canTravel = neighbors.some((location) => location.id === app.selectedLocationId);
    const onRuins = app.state.player.locationId === 'oldtower';
    const localCreatures = getEntitiesAt(app.state.player.locationId).creatures.length > 0;

    return [
      {
        id: 'travel',
        title: t('actionTravel'),
        note: selectedLocation
          ? `${t('moveHere')}: ${selectedLocation.name[app.lang]}`
          : t('chooseAction'),
        enabled: !!selectedLocation && canTravel && selectedLocation.id !== app.state.player.locationId,
        run: () => travelTo(app.selectedLocationId),
      },
      {
        id: 'forage',
        title: t('actionForage'),
        note: app.lang === 'fr' ? 'Baies, matériaux et parfois intuition.' : 'Berries, materials, and sometimes insight.',
        enabled: true,
        run: doForage,
      },
      {
        id: 'rest',
        title: t('actionRest'),
        note: app.lang === 'fr' ? 'Récupère de l’énergie, réduit légèrement la faim.' : 'Recover energy and slightly reduce hunger.',
        enabled: true,
        run: doRest,
      },
      {
        id: 'talk',
        title: t('actionTalk'),
        note: app.lang === 'fr' ? 'Renforce ou fragilise la confiance locale.' : 'Strengthen or weaken local trust.',
        enabled: getEntitiesAt(app.state.player.locationId).npcs.length > 0,
        run: doTalk,
      },
      {
        id: 'observe',
        title: t('actionObserve'),
        note: app.lang === 'fr' ? 'Accroît l’intuition et prépare les futurs liens.' : 'Build insight and prepare future bonds.',
        enabled: true,
        run: doObserve,
      },
      {
        id: 'search',
        title: t('actionSearch'),
        note: onRuins
          ? (app.lang === 'fr' ? 'Plus rentable ici, mais plus risqué.' : 'More rewarding here, but riskier.')
          : (app.lang === 'fr' ? 'Action à risque, meilleure dans la tour.' : 'A risky action, strongest in the tower.'),
        enabled: true,
        run: doSearch,
      },
      {
        id: 'bond',
        title: t('actionBond'),
        note: localCreatures
          ? (app.lang === 'fr' ? 'Plus facile avec intuition + baies.' : 'Easier with insight + berries.')
          : t('bondNone'),
        enabled: localCreatures,
        run: doBond,
      },
    ];
  }

  function renderStatus() {
    const location = getLocation(app.state.player.locationId);
    const stats = [
      ['location', location.name[app.lang]],
      ['energy', app.state.player.energy],
      ['hunger', app.state.player.hunger],
      ['trust', `${app.state.player.trust}/10 (${trustWord(app.state.player.trust)})`],
      ['materials', app.state.player.materials],
      ['berries', app.state.player.berries],
      ['insight', app.state.player.insight],
      ['safety', `${app.state.world.safety}/10`],
    ];

    nodes.statusGrid.innerHTML = stats
      .map(([labelKey, value]) => {
        const numeric = typeof value === 'number' ? value : null;
        let valueClass = '';
        if (numeric !== null) {
          valueClass = numeric >= 7 ? 'value-good' : numeric >= 4 ? 'value-warn' : 'value-bad';
        }
        return `
          <div class="stat-card">
            <small>${t(labelKey)}</small>
            <div class="${valueClass}" style="font-size:1.35rem;font-weight:700;margin-top:0.35rem;">${value}</div>
          </div>
        `;
      })
      .join('');

    nodes.activeGoal.innerHTML = `
      <strong>${t('goalPrefix')}</strong>
      <p>${t(app.state.goalKey)}</p>
      <small class="goal-subtle">${t('goalSubtle')}</small>
    `;
  }

  function renderMap() {
    const { player } = app.state;
    nodes.mapGrid.innerHTML = LOCATIONS.map((location) => {
      const entities = getEntitiesAt(location.id);
      const isCurrent = location.id === player.locationId;
      const isSelected = location.id === app.selectedLocationId;
      const buttonLabel = isCurrent ? t('location') : t('moveHere');
      const safeWord = moodLabel(location.safety);
      return `
        <button type="button" class="map-tile ${isCurrent ? 'current' : ''} ${isSelected ? 'selected' : ''}" data-location-id="${location.id}">
          <div class="section-head">
            <strong>${location.name[app.lang]}</strong>
            <span class="chip">${t('safety')}: ${safeWord}</span>
          </div>
          <p class="location-flavor">${location.flavor[app.lang]}</p>
          <div class="tile-icons">${isCurrent ? '★' : ''}${entities.npcs.length ? '◈'.repeat(entities.npcs.length) : ''}${entities.creatures.length ? '✦'.repeat(entities.creatures.length) : ''}</div>
          <small class="location-flavor">${buttonLabel}</small>
        </button>
      `;
    }).join('');

    Array.from(nodes.mapGrid.querySelectorAll('[data-location-id]')).forEach((button) => {
      button.addEventListener('click', () => {
        app.selectedLocationId = button.getAttribute('data-location-id');
        render();
      });
    });
  }

  function renderLocationCard() {
    const location = getLocation(app.selectedLocationId);
    const neighbors = getNeighbors(location.id).map((place) => place.name[app.lang]).join(', ');
    nodes.locationCard.innerHTML = `
      <h3>${location.name[app.lang]}</h3>
      <p class="location-flavor">${location.flavor[app.lang]}</p>
      <div class="roster-meta">
        ${t('resources')}: +${location.resources.materials} ${t('materials').toLowerCase()}, +${location.resources.berries} ${t('berries').toLowerCase()}, +${location.resources.insight} ${t('insight').toLowerCase()}<br />
        ${t('connections')}: ${neighbors || '—'}
      </div>
    `;
  }

  function renderActions() {
    nodes.actionsGrid.innerHTML = getActionDefinitions().map((action) => `
      <div class="action-card">
        <div class="action-head">
          <div>
            <div class="action-tag">${action.id}</div>
            <strong>${action.title}</strong>
          </div>
          <button type="button" data-action-id="${action.id}" ${action.enabled ? '' : 'disabled'}>${action.enabled ? action.title : t('btnDisabled')}</button>
        </div>
        <div class="action-note">${action.note}</div>
      </div>
    `).join('');

    Array.from(nodes.actionsGrid.querySelectorAll('[data-action-id]')).forEach((button) => {
      button.addEventListener('click', () => {
        const action = getActionDefinitions().find((item) => item.id === button.getAttribute('data-action-id'));
        if (action && action.enabled) action.run();
      });
    });
  }

  function renderRoster() {
    const playerCard = `
      <div class="roster-card">
        <div>
          <strong>Forgekeeper</strong>
          <div class="roster-meta">${t('role')}: ${t('rolePlayer')} · ${t('location')}: ${getLocation(app.state.player.locationId).name[app.lang]}</div>
          <div class="roster-meta">${t('memory')}: ${app.lang === 'fr' ? 'Observe, décide, maintient l’équilibre du camp.' : 'Observes, decides, and tries to keep the camp balanced.'}</div>
        </div>
        <div class="roster-pill">${t('rolePlayer')}</div>
      </div>
    `;

    const npcCards = app.state.npcs.map((npc) => `
      <div class="roster-card">
        <div>
          <strong>${npc.name}</strong>
          <div class="roster-meta">${t('role')}: ${npc.role[app.lang]} · ${t('location')}: ${getLocation(npc.locationId).name[app.lang]}</div>
          <div class="roster-meta">${t('mood')}: ${moodLabel(npc.mood)} · ${t('trustLevel')}: ${npc.trust}/10</div>
          <div class="roster-meta">${t('memory')}: ${(npc.memory && npc.memory[0]) || t('noMemory')}</div>
        </div>
        <div class="roster-pill">${t('roleNpc')}</div>
      </div>
    `).join('');

    const creatureCards = app.state.creatures.map((creature) => `
      <div class="roster-card">
        <div>
          <strong>${creature.name}</strong>
          <div class="roster-meta">${t('species')}: ${creature.species[app.lang]} · ${t('location')}: ${getLocation(creature.locationId).name[app.lang]}</div>
          <div class="roster-meta">Bond: ${creature.bond}/10 · Temperament: ${moodLabel(creature.temperament)}</div>
          <div class="roster-meta">${t('memory')}: ${(creature.memory && creature.memory[0]) || t('noMemory')}</div>
        </div>
        <div class="roster-pill">${t('roleCreature')}</div>
      </div>
    `).join('');

    nodes.rosterList.innerHTML = playerCard + npcCards + creatureCards;
  }

  function renderLog() {
    nodes.logList.innerHTML = app.state.logs.map((entry) => `
      <div class="log-entry ${entry.tone === 'alert' ? 'alert' : entry.tone === 'good' ? 'good' : ''}">
        <div class="log-meta">${t('turn')} ${entry.turn}</div>
        <div>${entry.text}</div>
      </div>
    `).join('');
  }

  function renderText() {
    nodes.title.textContent = t('title');
    nodes.subtitle.textContent = t('subtitle');
    nodes.statusTitle.textContent = t('statusTitle');
    nodes.mapTitle.textContent = t('mapTitle');
    nodes.actionsTitle.textContent = t('actionsTitle');
    nodes.rosterTitle.textContent = t('rosterTitle');
    nodes.logTitle.textContent = t('logTitle');
    nodes.newRunButton.textContent = t('newRun');
    nodes.saveButton.textContent = t('save');
    nodes.loadButton.textContent = t('load');
    nodes.langToggle.textContent = app.lang === 'en' ? 'FR' : 'EN';
  }

  function renderMeta() {
    nodes.turnLabel.textContent = `${t('turn')} ${app.state.turn}`;
    nodes.weatherChip.textContent = `${t('weather')}: ${t(app.state.weather)}`;
    nodes.seedLabel.textContent = `${t('seed')}: ${app.state.seed}`;
  }

  function render() {
    renderText();
    renderMeta();
    renderStatus();
    renderMap();
    renderLocationCard();
    renderActions();
    renderRoster();
    renderLog();
  }

  function saveRun() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ state: app.state, lang: app.lang, selectedLocationId: app.selectedLocationId }));
    addLog(t('logSaved'), 'neutral');
    render();
    window.alert(t('saveOk'));
  }

  function loadRun() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      window.alert(t('loadMissing'));
      return;
    }
    try {
      const payload = JSON.parse(raw);
      app.state = payload.state;
      app.lang = payload.lang || 'en';
      app.selectedLocationId = payload.selectedLocationId || app.state.player.locationId;
      addLog(t('logLoaded'), 'neutral');
      render();
      window.alert(t('loadOk'));
    } catch (error) {
      console.error(error);
      window.alert('Save corrupted.');
    }
  }

  function newRun() {
    app.state = createState();
    app.selectedLocationId = app.state.player.locationId;
    render();
  }

  function bindEvents() {
    nodes.newRunButton.addEventListener('click', newRun);
    nodes.saveButton.addEventListener('click', saveRun);
    nodes.loadButton.addEventListener('click', loadRun);
    nodes.langToggle.addEventListener('click', () => {
      app.lang = app.lang === 'en' ? 'fr' : 'en';
      render();
    });
  }

  bindEvents();
  newRun();
})();
