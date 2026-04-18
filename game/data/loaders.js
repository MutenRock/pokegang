const POKEMON_SPRITES_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/";
const ITEM_SPRITES_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/";
const TRAINER_SPRITES_BASE = "https://play.pokemonshowdown.com/sprites/trainers/";

let POKEMON_SPRITES = null;
let ITEM_SPRITES = null;
let TRAINER_GROUPS = null;
let ZONE_TRAINER_POOLS = null;

async function loadPokemonSprites() {
  if (POKEMON_SPRITES) return POKEMON_SPRITES;
  const res = await fetch("data/pokemon-sprites-kanto.json");
  if (!res.ok) throw new Error("Impossible de charger pokemon-sprites-kanto.json");
  POKEMON_SPRITES = await res.json();
  return POKEMON_SPRITES;
}

async function loadItemSprites() {
  if (ITEM_SPRITES) return ITEM_SPRITES;
  const res = await fetch("data/item-sprites.json");
  if (!res.ok) throw new Error("Impossible de charger item-sprites.json");
  ITEM_SPRITES = await res.json();
  return ITEM_SPRITES;
}

async function loadTrainerGroups() {
  if (TRAINER_GROUPS) return TRAINER_GROUPS;
  const res = await fetch("data/trainer-sprites-grouped.json");
  if (!res.ok) throw new Error("Impossible de charger trainer-sprites-grouped.json");
  TRAINER_GROUPS = await res.json();
  return TRAINER_GROUPS;
}

async function loadZoneTrainerPools() {
  if (ZONE_TRAINER_POOLS) return ZONE_TRAINER_POOLS;
  const res = await fetch("data/zone-trainer-pools.json");
  if (!res.ok) throw new Error("Impossible de charger zone-trainer-pools.json");
  ZONE_TRAINER_POOLS = await res.json();
  return ZONE_TRAINER_POOLS;
}

function getPokemonEntry(id) {
  return POKEMON_SPRITES?.pokemon?.find(p => p.id === Number(id)) || null;
}

function getPokemonSprite(id, key = "main") {
  const entry = getPokemonEntry(id);
  const rel = entry?.sprites?.[key];
  return rel ? POKEMON_SPRITES_BASE + rel : null;
}

function getItemSprite(key) {
  const rel = ITEM_SPRITES?.items?.[key];
  return rel ? ITEM_SPRITES_BASE + rel : null;
}

function getTrainerSprite(groupName, key) {
  const group = TRAINER_GROUPS?.trainers?.[groupName];
  if (!group || Array.isArray(group)) return null;
  const rel = group[key];
  return rel ? TRAINER_SPRITES_BASE + rel : null;
}

function getFactionSpriteList(factionName) {
  const arr = TRAINER_GROUPS?.trainers?.factions?.[factionName];
  if (!Array.isArray(arr)) return [];
  return arr.map(rel => TRAINER_SPRITES_BASE + rel);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickTrainerForZone(zoneId) {
  const zone = ZONE_TRAINER_POOLS?.zones?.[zoneId];
  if (!zone) return null;

  const commonKey = zone.commons?.length ? pickRandom(zone.commons) : null;
  if (commonKey) {
    const rel = TRAINER_GROUPS?.trainers?.common?.[commonKey];
    if (rel) return TRAINER_SPRITES_BASE + rel;
  }
  return null;
}
