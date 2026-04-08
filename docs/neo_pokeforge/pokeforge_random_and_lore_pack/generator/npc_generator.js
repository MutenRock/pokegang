
// ==========================================
// PREDEFINED LISTS (100+ items, old-school EN/FR vibes)
// ==========================================

const FIRST_NAMES_MALE = [
  "Albert", "Arthur", "Auguste", "Alain", "Antoine", "Alfred", "Armand", "Arnold", "Anthony", "Andy",
  "Bernard", "Bill", "Bob", "Ben", "Bruno", "Bertrand", "Bruce", "Barry", "Brian", "Bastien",
  "Claude", "Charles", "Calvin", "Chad", "Carl", "Colin", "Clement", "Corentin", "Christian", "Cyril",
  "Denis", "Dan", "Don", "David", "Damien", "Didier", "Daniel", "Dylan", "Dexter", "Dustin",
  "Edouard", "Emile", "Earl", "Edward", "Eric", "Etienne", "Eugene", "Ernest", "Evan", "Edgar",
  "Francois", "Felix", "Fred", "Frank", "Fabien", "Florent", "Fernand", "Fabrice", "Floyd", "Fletcher",
  "Georges", "Gaston", "Guy", "Gene", "George", "Gilles", "Gerard", "Guillaume", "Gordon", "Gary",
  "Henri", "Harry", "Howard", "Harold", "Hugo", "Hector", "Harvey", "Hubert", "Homer", "Harrison",
  "Jacques", "Jean", "Joey", "James", "Jim", "Joe", "Jack", "Jay", "Jules", "Justin",
  "Louis", "Laurent", "Lucien", "Lee", "Liam", "Leo", "Lucas", "Leon", "Lance", "Lester",
  "Marcel", "Michel", "Maurice", "Marc", "Max", "Martin", "Mathieu", "Mickael", "Marvin", "Milton",
  "Nicolas", "Nathan", "Norman", "Nelson", "Neil", "Nolan", "Nigel", "Ned", "Noah", "Newton",
  "Olivier", "Oscar", "Oliver", "Orville", "Owen", "Oswald", "Otto", "Omar", "Orlando", "Orson",
  "Paul", "Pierre", "Philippe", "Patrick", "Pascal", "Peter", "Perry", "Philip", "Preston", "Percy",
  "Raymond", "Robert", "René", "Richard", "Raoul", "Roger", "Ralph", "Roy", "Ray", "Russell"
];

const FIRST_NAMES_FEMALE = [
  "Alice", "Anne", "Agnes", "Amelie", "Audrey", "Aurore", "Anita", "April", "Amanda", "Abigail",
  "Brigitte", "Beatrice", "Blandine", "Betty", "Bonnie", "Barbara", "Brenda", "Blanche", "Bessie", "Bernice",
  "Catherine", "Chantal", "Christiane", "Claire", "Colette", "Celine", "Carol", "Cindy", "Chloe", "Clara",
  "Danielle", "Denise", "Diane", "Delphine", "Dorothee", "Daisy", "Donna", "Doris", "Diana", "Darlene",
  "Edith", "Elisabeth", "Elodie", "Emilie", "Estelle", "Emma", "Emily", "Evelyn", "Eleanor", "Edna",
  "Francine", "Francoise", "Florence", "Fabienne", "Fanny", "Flora", "Faye", "Felicia", "Fern", "Fiona",
  "Genevieve", "Gisele", "Gaelle", "Grace", "Gloria", "Gladys", "Gail", "Gwendolyn", "Gwen", "Georgia",
  "Helene", "Hortense", "Henriette", "Hazel", "Helen", "Heather", "Holly", "Heidi", "Hilda", "Hope",
  "Jacqueline", "Jeanne", "Josiane", "Juliette", "Justine", "Jane", "Judy", "Joyce", "Joan", "Janet",
  "Louise", "Lucie", "Laurence", "Laura", "Linda", "Lucy", "Lois", "Lillian", "Loretta", "Lynn",
  "Madeleine", "Marcelle", "Marguerite", "Marie", "Martine", "Mary", "Margaret", "Martha", "Mildred", "Marjorie",
  "Nicole", "Nathalie", "Nadine", "Noemie", "Nancy", "Norma", "Nora", "Nina", "Nellie", "Naomi",
  "Odile", "Odette", "Olivia", "Opal", "Olga", "Ora", "Ollie", "Ola", "Odelia", "Octavia",
  "Pauline", "Pascale", "Peggy", "Pamela", "Patricia", "Phyllis", "Paula", "Priscilla", "Penny", "Pearl",
  "Simone", "Sophie", "Suzanne", "Sylvie", "Sandrine", "Sarah", "Shirley", "Susan", "Sharon", "Sally"
];

const LAST_NAMES = [
  "Chen", "Seko", "Orme", "Sorbier", "Keteleeria", "Platane", "Rocher", "Caillou", "Bois", "Foret",
  "Riviere", "Montagne", "Dubois", "Dupont", "Durand", "Martin", "Bernard", "Thomas", "Petit", "Robert",
  "Richard", "Moreau", "Laurent", "Simon", "Michel", "Lefevre", "Leroy", "Roux", "David", "Bertrand",
  "Morel", "Fournier", "Girard", "Bonnet", "Lambert", "Fontaine", "Rousseau", "Vincent", "Muller", "Faure",
  "Andre", "Mercier", "Blanc", "Guerin", "Boyer", "Garnier", "Chevalier", "Francois", "Legrand", "Gauthier",
  "Garcia", "Perrin", "Robin", "Clement", "Morin", "Nicolas", "Henry", "Roussel", "Mathieu", "Gautier",
  "Masson", "Marchand", "Duval", "Denis", "Dumont", "Marie", "Lemaire", "Noel", "Meyer", "Dufour",
  "Meunier", "Brun", "Blanchard", "Giraud", "Joly", "Lucas", "Brunet", "Gaillard", "Barbier", "Arnaud",
  "Martinez", "Gerard", "Roche", "Renard", "Schmitt", "Roy", "Leroux", "Colin", "Vidal", "Caron",
  "Picard", "Roger", "Fabre", "Aubert", "Lemoine", "Renaud", "Dumas", "Lacroix", "Olivier", "Philippe",
  "Oak", "Elm", "Birch", "Rowan", "Juniper", "Sycamore", "Stone", "Water", "Smith", "Johnson",
  "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson", "Anderson", "Taylor", "Moore", "Jackson"
];

const ROLES = [
  { id: "rocket_grunt", faction: "team_rocket", orientation: "villain", sprites: ["rocketgrunt", "rocketgruntf"], types: ["poison", "dark", "normal"] },
  { id: "rocket_scientist", faction: "team_rocket", orientation: "villain", sprites: ["scientist", "scientistf"], types: ["electric", "psychic", "poison"] },
  { id: "burglar", faction: "criminal", orientation: "villain", sprites: ["burglar"], types: ["fire", "poison"] },
  { id: "youngster", faction: "civilian", orientation: "neutral", sprites: ["youngster", "schoolboy"], types: ["normal", "bug"] },
  { id: "lass", faction: "civilian", orientation: "neutral", sprites: ["lass", "schoolgirl"], types: ["normal", "fairy", "grass"] },
  { id: "hiker", faction: "civilian", orientation: "neutral", sprites: ["hiker"], types: ["rock", "ground", "fighting"] },
  { id: "camper", faction: "civilian", orientation: "neutral", sprites: ["camper", "picnicker"], types: ["grass", "bug", "water"] },
  { id: "sailor", faction: "civilian", orientation: "neutral", sprites: ["sailor"], types: ["water", "fighting"] },
  { id: "biker", faction: "gang", orientation: "neutral", sprites: ["biker", "roughneck"], types: ["poison", "fire"] },
  { id: "blackbelt", faction: "dojo", orientation: "neutral", sprites: ["blackbelt"], types: ["fighting"] }
];

const TRAITS = ["loyal", "nervous", "confident", "lazy", "energetic", "greedy", "stubborn", "smart", "cowardly", "aggressive", "cheerful", "gloomy"];
const VALUES = ["money", "power", "friendship", "strength", "survival", "respect", "family", "fun", "chaos", "order"];

const CATCHPHRASES = {
  "villain": [
    "Give me your Pokémon!", "You can't stop Team Rocket!", "Hand over the loot!", "I'm doing this for the boss.", 
    "Don't get in my way!", "You're gonna regret this.", "Hah! You think you can beat me?"
  ],
  "neutral": [
    "Our eyes met, we must battle!", "My Pokémon are top percentage!", "I like shorts! They're comfy and easy to wear!",
    "Let's have a good match.", "I've been training hard.", "Don't hold back!"
  ]
};

const POKEMON_POOL = {
  "normal": ["rattata", "raticate", "meowth", "persian", "pidgey", "spearow"],
  "bug": ["caterpie", "weedle", "paras", "venonat", "pinsir", "scyther"],
  "poison": ["ekans", "arbok", "koffing", "weezing", "zubat", "golbat", "grimer", "muk"],
  "dark": ["houndour", "houndoom", "murkrow", "poochyena", "sneasel"],
  "electric": ["magnemite", "magneton", "voltorb", "electrode", "electabuzz"],
  "psychic": ["abra", "kadabra", "drowzee", "hypno"],
  "fire": ["growlithe", "vulpix", "ponyta", "magmar"],
  "water": ["squirtle", "poliwag", "tentacool", "krabby", "magikarp", "goldeen"],
  "grass": ["oddish", "bellsprout", "tangela", "exeggcute"],
  "rock": ["geodude", "graveler", "onix", "rhyhorn", "rhydon"],
  "ground": ["sandshrew", "sandslash", "diglett", "cubone"],
  "fighting": ["mankey", "machop", "machoke", "hitmonlee", "hitmonchan"],
  "fairy": ["clefairy", "jigglypuff", "snubbull", "marill"]
};

// ==========================================
// GENERATOR FUNCTION
// ==========================================

function getRandomEl(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNPC(options = {}) {
  const gender = options.gender || (Math.random() > 0.5 ? "male" : "female");
  const roleObj = options.roleObj || getRandomEl(ROLES);

  const firstName = gender === "male" ? getRandomEl(FIRST_NAMES_MALE) : getRandomEl(FIRST_NAMES_FEMALE);
  const lastName = getRandomEl(LAST_NAMES);
  const fullName = `${firstName} ${lastName}`;

  const spriteBase = getRandomEl(roleObj.sprites);
  const spriteUrl = `https://play.pokemonshowdown.com/sprites/trainers/${spriteBase}.png`;

  const primaryType = getRandomEl(roleObj.types);
  const possiblePokemon = [];
  const pool = POKEMON_POOL[primaryType] || POKEMON_POOL["normal"];
  for(let i=0; i < getRandomInt(2, 4); i++) {
    possiblePokemon.push(getRandomEl(pool));
  }

  const orientation = roleObj.orientation;
  const catchphraseList = CATCHPHRASES[orientation] || CATCHPHRASES["neutral"];

  const npc = {
    id: `npc_gen_${Date.now()}_${Math.floor(Math.random()*1000)}`,
    name: fullName,
    age: getRandomInt(14, 55),
    gender: gender,
    role: roleObj.id,
    faction: roleObj.faction,
    region: "kanto",
    personality: [getRandomEl(TRAITS), getRandomEl(TRAITS)],
    orientation: orientation,
    trust_level: orientation === "villain" ? getRandomInt(1, 3) : getRandomInt(3, 5),
    goals: {
      short_term: "Win the next battle.",
      long_term: "Become stronger."
    },
    values: [getRandomEl(VALUES), getRandomEl(VALUES)],
    speech_style: {
      tone: getRandomEl(["casual", "aggressive", "nervous", "confident"]),
      verbosity: getRandomEl(["low", "medium", "high"]),
      formality: getRandomEl(["low", "medium"]),
      language: "bilingual_en_fr"
    },
    catch_phrases: [getRandomEl(catchphraseList)],
    pokemon_preferences: [primaryType, "balanced"],
    possible_pokemon: [...new Set(possiblePokemon)], // remove duplicates
    sprite: spriteUrl,
    knowledge: ["local area", `${primaryType} pokemon basics`],
    memories: [],
    relationships: {},
    events_history: []
  };

  return npc;
}
