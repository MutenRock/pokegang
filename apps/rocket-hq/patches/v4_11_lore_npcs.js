
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
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/giovanni-gen2.png',
    personality: ['froid','calculateur','impitoyable'],
    values: ['pouvoir','argent','contrôle'],
    speech_style: { tone:'autoritaire', verbosity:'court', formality:'high' },
    catch_phrases: {
      fr:['Le pouvoir est tout.','Tu es un outil. Sois utile.','La Team Rocket ne pardonne pas l'échec.','Rapporte-moi des résultats, pas des excuses.'],
      en:['Power is everything.','You are a tool. Be useful.','Team Rocket does not forgive failure.','Bring me results, not excuses.'],
    },
    pokemon_preferences: ['psychic','poison'],
    possible_pokemon: ['persian','nidoking','nidoqueen'],
    activation: { minReputation: 0, alwaysPresent: true },
    role_in_game: 'supervisor', // apparaît sur missions élevées
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
      fr:['Les ordres viennent d'en haut.','Efficacité avant tout.','Archer surveille tout.'],
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
      en:['Don't waste my time.','Prove your worth.','I don't do things halfway.'],
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
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/jessie.png',
    personality: ['théâtrale','orgueilleuse','déterminée'],
    values: ['gloire','beauté','vengeance'],
    speech_style: { tone:'dramatique', verbosity:'long', formality:'low' },
    catch_phrases: {
      fr:['Préparez-vous pour les ennuis !','La beauté et la ruse, c'est notre devise.','Personne ne m'arrêtera !'],
      en:['Prepare for trouble!','Beauty and cunning, that's our motto.','Nobody will stop me!'],
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
    sprite: 'https://play.pokemonshowdown.com/sprites/trainers/james.png',
    personality: ['naïf','gentil','maladroit'],
    values: ['amitié','Pokémon','appartenance'],
    speech_style: { tone:'hésitant', verbosity:'moyen', formality:'low' },
    catch_phrases: {
      fr:['Et faites-en le double !','Je ne suis pas sûr que c'est une bonne idée…','Mes Pokémon comptent sur moi.'],
      en:['Make it double!','I'm not sure this is a good idea…','My Pokémon count on me.'],
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
    activation: { minReputation: 70 }, // boss final
    role_in_game: 'boss_mission',
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

  if (npc.role_in_game === 'ally_agent' || npc.role_in_game === 'supervisor') {
    // Ajoute comme agent allié s'il n'existe pas déjà
    if (!state.agents.find(a => a.id === npc.id)) {
      state.agents.push({
        id:          npc.id,
        name:        nom,
        rank:        rank,
        level:       npc.id === 'lore_giovanni' ? 10 : 5,
        xp:          npc.id === 'lore_giovanni' ? 999 : 250,
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
    ? (lang==='fr' ? ['Bien. Continue.','C'est ce que j'attendais.','Correct. Ne te repose pas.'] : ['Good. Continue.','That's what I expected.','Correct. Don't rest.'])
    : (lang==='fr' ? ['Décevant.','Encore un échec ? Inacceptable.','Tu me déçois.'] : ['Disappointing.','Another failure? Unacceptable.','You disappoint me.']);
  return `Giovanni : ${pick(phrases)}`;
}
