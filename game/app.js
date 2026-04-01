// ============================================================
// POKEFORGE v6 — Gang Wars  (vanilla JS, single-file engine)
// ============================================================

'use strict';

// ════════════════════════════════════════════════════════════════
//  1.  CONFIG & CONSTANTS
// ════════════════════════════════════════════════════════════════

// ── 151 Gen 1 species ─────────────────────────────────────────
// { en, fr, dex, types, baseAtk, baseDef, baseSpd, rarity, moves[] }
// rarity: 'common' | 'uncommon' | 'rare' | 'very_rare' | 'legendary'
const POKEMON_GEN1 = [
  {en:'bulbasaur',fr:'Bulbizarre',dex:1,types:['Grass','Poison'],baseAtk:49,baseDef:49,baseSpd:45,rarity:'rare',moves:['Fouet Lianes','Vampigraine','Charge','Poudre Dodo']},
  {en:'ivysaur',fr:'Herbizarre',dex:2,types:['Grass','Poison'],baseAtk:62,baseDef:63,baseSpd:60,rarity:'very_rare',moves:['Fouet Lianes','Tranch\'Herbe','Vampigraine','Poudre Toxik']},
  {en:'venusaur',fr:'Florizarre',dex:3,types:['Grass','Poison'],baseAtk:82,baseDef:83,baseSpd:80,rarity:'very_rare',moves:['Lance-Soleil','Danse-Fleur','Tranch\'Herbe','Poudre Dodo']},
  {en:'charmander',fr:'Salamèche',dex:4,types:['Fire'],baseAtk:52,baseDef:43,baseSpd:65,rarity:'rare',moves:['Griffe','Flammèche','Brouillard','Frénésie']},
  {en:'charmeleon',fr:'Reptincel',dex:5,types:['Fire'],baseAtk:64,baseDef:58,baseSpd:80,rarity:'very_rare',moves:['Lance-Flamme','Tranche','Griffe','Frénésie']},
  {en:'charizard',fr:'Dracaufeu',dex:6,types:['Fire','Flying'],baseAtk:84,baseDef:78,baseSpd:100,rarity:'very_rare',moves:['Lance-Flamme','Déflagration','Danse Lames','Cru-Aile']},
  {en:'squirtle',fr:'Carapuce',dex:7,types:['Water'],baseAtk:48,baseDef:65,baseSpd:43,rarity:'rare',moves:['Pistolet à O','Repli','Charge','Morsure']},
  {en:'wartortle',fr:'Carabaffe',dex:8,types:['Water'],baseAtk:63,baseDef:80,baseSpd:58,rarity:'very_rare',moves:['Pistolet à O','Morsure','Abri','Surf']},
  {en:'blastoise',fr:'Tortank',dex:9,types:['Water'],baseAtk:83,baseDef:100,baseSpd:78,rarity:'very_rare',moves:['Hydrocanon','Surf','Laser Glace','Morsure']},
  {en:'caterpie',fr:'Chenipan',dex:10,types:['Bug'],baseAtk:30,baseDef:35,baseSpd:45,rarity:'common',moves:['Charge','Sécrétion','Charge','Sécrétion']},
  {en:'metapod',fr:'Chrysacier',dex:11,types:['Bug'],baseAtk:20,baseDef:55,baseSpd:30,rarity:'common',moves:['Armure','Charge','Armure','Charge']},
  {en:'butterfree',fr:'Papilusion',dex:12,types:['Bug','Flying'],baseAtk:45,baseDef:50,baseSpd:70,rarity:'uncommon',moves:['Choc Mental','Poudre Dodo','Cyclone','Ultrason']},
  {en:'weedle',fr:'Aspicot',dex:13,types:['Bug','Poison'],baseAtk:35,baseDef:30,baseSpd:50,rarity:'common',moves:['Dard-Venin','Sécrétion','Dard-Venin','Sécrétion']},
  {en:'kakuna',fr:'Coconfort',dex:14,types:['Bug','Poison'],baseAtk:25,baseDef:50,baseSpd:35,rarity:'common',moves:['Armure','Dard-Venin','Armure','Dard-Venin']},
  {en:'beedrill',fr:'Dardargnan',dex:15,types:['Bug','Poison'],baseAtk:80,baseDef:40,baseSpd:75,rarity:'uncommon',moves:['Dard-Venin','Double-Dard','Furie','Hâte']},
  {en:'pidgey',fr:'Roucool',dex:16,types:['Normal','Flying'],baseAtk:45,baseDef:40,baseSpd:56,rarity:'common',moves:['Charge','Tornade','Vive-Attaque','Jet de Sable']},
  {en:'pidgeotto',fr:'Roucoups',dex:17,types:['Normal','Flying'],baseAtk:60,baseDef:55,baseSpd:71,rarity:'uncommon',moves:['Cru-Aile','Vive-Attaque','Cyclone','Tornade']},
  {en:'pidgeot',fr:'Roucarnage',dex:18,types:['Normal','Flying'],baseAtk:80,baseDef:75,baseSpd:91,rarity:'rare',moves:['Cru-Aile','Lame d\'Air','Cyclone','Vive-Attaque']},
  {en:'rattata',fr:'Rattata',dex:19,types:['Normal'],baseAtk:56,baseDef:35,baseSpd:72,rarity:'common',moves:['Charge','Vive-Attaque','Croc de Mort','Morsure']},
  {en:'raticate',fr:'Rattatac',dex:20,types:['Normal'],baseAtk:81,baseDef:60,baseSpd:97,rarity:'uncommon',moves:['Croc de Mort','Vive-Attaque','Plaquage','Poursuite']},
  {en:'spearow',fr:'Piafabec',dex:21,types:['Normal','Flying'],baseAtk:60,baseDef:30,baseSpd:70,rarity:'common',moves:['Picpic','Furie','Poursuite','Bec Vrille']},
  {en:'fearow',fr:'Rapasdepic',dex:22,types:['Normal','Flying'],baseAtk:90,baseDef:65,baseSpd:100,rarity:'uncommon',moves:['Bec Vrille','Furie','Aéropique','Poursuite']},
  {en:'ekans',fr:'Abo',dex:23,types:['Poison'],baseAtk:60,baseDef:44,baseSpd:55,rarity:'common',moves:['Morsure','Ligotage','Acide','Regard Médusant']},
  {en:'arbok',fr:'Arbok',dex:24,types:['Poison'],baseAtk:85,baseDef:69,baseSpd:80,rarity:'uncommon',moves:['Morsure','Acide','Crocs Venin','Intimidation']},
  {en:'pikachu',fr:'Pikachu',dex:25,types:['Electric'],baseAtk:55,baseDef:40,baseSpd:90,rarity:'uncommon',moves:['Tonnerre','Vive-Attaque','Cage Éclair','Queue de Fer']},
  {en:'raichu',fr:'Raichu',dex:26,types:['Electric'],baseAtk:90,baseDef:55,baseSpd:110,rarity:'rare',moves:['Tonnerre','Fatal-Foudre','Vive-Attaque','Surf']},
  {en:'sandshrew',fr:'Sabelette',dex:27,types:['Ground'],baseAtk:75,baseDef:85,baseSpd:40,rarity:'common',moves:['Griffe','Jet de Sable','Tranche','Tunnel']},
  {en:'sandslash',fr:'Sablaireau',dex:28,types:['Ground'],baseAtk:100,baseDef:110,baseSpd:65,rarity:'uncommon',moves:['Tranche','Tunnel','Séisme','Tempête de Sable']},
  {en:'nidoran-f',fr:'Nidoran♀',dex:29,types:['Poison'],baseAtk:47,baseDef:52,baseSpd:41,rarity:'common',moves:['Griffe','Dard-Venin','Morsure','Double Pied']},
  {en:'nidorina',fr:'Nidorina',dex:30,types:['Poison'],baseAtk:62,baseDef:67,baseSpd:56,rarity:'uncommon',moves:['Morsure','Dard-Venin','Griffe','Plaquage']},
  {en:'nidoqueen',fr:'Nidoqueen',dex:31,types:['Poison','Ground'],baseAtk:82,baseDef:87,baseSpd:76,rarity:'rare',moves:['Plaquage','Séisme','Surf','Laser Glace']},
  {en:'nidoran-m',fr:'Nidoran♂',dex:32,types:['Poison'],baseAtk:57,baseDef:40,baseSpd:50,rarity:'common',moves:['Koud\'Korne','Dard-Venin','Double Pied','Furie']},
  {en:'nidorino',fr:'Nidorino',dex:33,types:['Poison'],baseAtk:72,baseDef:57,baseSpd:65,rarity:'uncommon',moves:['Koud\'Korne','Dard-Venin','Morsure','Furie']},
  {en:'nidoking',fr:'Nidoking',dex:34,types:['Poison','Ground'],baseAtk:92,baseDef:77,baseSpd:85,rarity:'rare',moves:['Séisme','Mégacorne','Surf','Lance-Flamme']},
  {en:'clefairy',fr:'Mélofée',dex:35,types:['Fairy'],baseAtk:45,baseDef:48,baseSpd:35,rarity:'uncommon',moves:['Métronome','Torgnoles','Berceuse','Reflet']},
  {en:'clefable',fr:'Mélodelfe',dex:36,types:['Fairy'],baseAtk:70,baseDef:73,baseSpd:60,rarity:'rare',moves:['Métronome','Plaquage','Berceuse','Éclat Magique']},
  {en:'vulpix',fr:'Goupix',dex:37,types:['Fire'],baseAtk:41,baseDef:40,baseSpd:65,rarity:'uncommon',moves:['Flammèche','Vive-Attaque','Danse-Flamme','Hurlement']},
  {en:'ninetales',fr:'Feunard',dex:38,types:['Fire'],baseAtk:76,baseDef:75,baseSpd:100,rarity:'rare',moves:['Lance-Flamme','Vive-Attaque','Onde Folie','Feu Follet']},
  {en:'jigglypuff',fr:'Rondoudou',dex:39,types:['Normal','Fairy'],baseAtk:45,baseDef:20,baseSpd:20,rarity:'uncommon',moves:['Berceuse','Torgnoles','Charge','Roulade']},
  {en:'wigglytuff',fr:'Grodoudou',dex:40,types:['Normal','Fairy'],baseAtk:70,baseDef:45,baseSpd:45,rarity:'rare',moves:['Plaquage','Berceuse','Torgnoles','Éclat Magique']},
  {en:'zubat',fr:'Nosferapti',dex:41,types:['Poison','Flying'],baseAtk:45,baseDef:35,baseSpd:55,rarity:'common',moves:['Vampirisme','Ultrason','Morsure','Onde Folie']},
  {en:'golbat',fr:'Nosferalto',dex:42,types:['Poison','Flying'],baseAtk:80,baseDef:70,baseSpd:90,rarity:'uncommon',moves:['Vampirisme','Cru-Aile','Morsure','Onde Folie']},
  {en:'oddish',fr:'Mystherbe',dex:43,types:['Grass','Poison'],baseAtk:50,baseDef:55,baseSpd:30,rarity:'common',moves:['Méga-Sangsue','Poudre Toxik','Acide','Poudre Dodo']},
  {en:'gloom',fr:'Ortide',dex:44,types:['Grass','Poison'],baseAtk:65,baseDef:70,baseSpd:40,rarity:'uncommon',moves:['Méga-Sangsue','Acide','Danse-Fleur','Poudre Toxik']},
  {en:'vileplume',fr:'Rafflesia',dex:45,types:['Grass','Poison'],baseAtk:80,baseDef:85,baseSpd:50,rarity:'rare',moves:['Danse-Fleur','Méga-Sangsue','Poudre Dodo','Acide']},
  {en:'paras',fr:'Paras',dex:46,types:['Bug','Grass'],baseAtk:70,baseDef:55,baseSpd:25,rarity:'common',moves:['Griffe','Spore','Vampigraine','Tranche']},
  {en:'parasect',fr:'Parasect',dex:47,types:['Bug','Grass'],baseAtk:95,baseDef:80,baseSpd:30,rarity:'uncommon',moves:['Spore','Tranche','Vampigraine','Coupe']},
  {en:'venonat',fr:'Mimitoss',dex:48,types:['Bug','Poison'],baseAtk:55,baseDef:50,baseSpd:45,rarity:'common',moves:['Choc Mental','Poudre Toxik','Ultrason','Psyko']},
  {en:'venomoth',fr:'Aéromite',dex:49,types:['Bug','Poison'],baseAtk:65,baseDef:60,baseSpd:90,rarity:'uncommon',moves:['Psyko','Poudre Toxik','Cyclone','Ultrason']},
  {en:'diglett',fr:'Taupiqueur',dex:50,types:['Ground'],baseAtk:55,baseDef:25,baseSpd:95,rarity:'common',moves:['Tunnel','Griffe','Tranche','Séisme']},
  {en:'dugtrio',fr:'Triopikeur',dex:51,types:['Ground'],baseAtk:80,baseDef:50,baseSpd:120,rarity:'uncommon',moves:['Séisme','Tunnel','Tranche','Piège de Roc']},
  {en:'meowth',fr:'Miaouss',dex:52,types:['Normal'],baseAtk:45,baseDef:35,baseSpd:90,rarity:'common',moves:['Griffe','Morsure','Jackpot','Bluff']},
  {en:'persian',fr:'Persian',dex:53,types:['Normal'],baseAtk:70,baseDef:60,baseSpd:115,rarity:'uncommon',moves:['Tranche','Jackpot','Morsure','Vive-Attaque']},
  {en:'psyduck',fr:'Psykokwak',dex:54,types:['Water'],baseAtk:52,baseDef:48,baseSpd:55,rarity:'common',moves:['Griffe','Choc Mental','Pistolet à O','Amnésie']},
  {en:'golduck',fr:'Akwakwak',dex:55,types:['Water'],baseAtk:82,baseDef:78,baseSpd:85,rarity:'uncommon',moves:['Surf','Psyko','Hydrocanon','Amnésie']},
  {en:'mankey',fr:'Férosinge',dex:56,types:['Fighting'],baseAtk:80,baseDef:35,baseSpd:70,rarity:'common',moves:['Griffe','Poing-Karaté','Frénésie','Balayage']},
  {en:'primeape',fr:'Colossinge',dex:57,types:['Fighting'],baseAtk:105,baseDef:60,baseSpd:95,rarity:'uncommon',moves:['Poing-Karaté','Frénésie','Balayage','Mania']},
  {en:'growlithe',fr:'Caninos',dex:58,types:['Fire'],baseAtk:70,baseDef:45,baseSpd:60,rarity:'uncommon',moves:['Flammèche','Morsure','Roue de Feu','Grondement']},
  {en:'arcanine',fr:'Arcanin',dex:59,types:['Fire'],baseAtk:110,baseDef:80,baseSpd:95,rarity:'rare',moves:['Lance-Flamme','Vitesse Extrême','Morsure','Déflagration']},
  {en:'poliwag',fr:'Ptitard',dex:60,types:['Water'],baseAtk:50,baseDef:40,baseSpd:90,rarity:'common',moves:['Pistolet à O','Hypnose','Torgnoles','Bulles d\'O']},
  {en:'poliwhirl',fr:'Têtarte',dex:61,types:['Water'],baseAtk:65,baseDef:65,baseSpd:90,rarity:'uncommon',moves:['Surf','Hypnose','Plaquage','Bulles d\'O']},
  {en:'poliwrath',fr:'Tartard',dex:62,types:['Water','Fighting'],baseAtk:85,baseDef:95,baseSpd:70,rarity:'rare',moves:['Surf','Soumission','Hypnose','Séisme']},
  {en:'abra',fr:'Abra',dex:63,types:['Psychic'],baseAtk:20,baseDef:15,baseSpd:90,rarity:'uncommon',moves:['Téléport','Choc Mental','Téléport','Choc Mental']},
  {en:'kadabra',fr:'Kadabra',dex:64,types:['Psychic'],baseAtk:35,baseDef:30,baseSpd:105,rarity:'rare',moves:['Psyko','Choc Mental','Téléport','Soin']},
  {en:'alakazam',fr:'Alakazam',dex:65,types:['Psychic'],baseAtk:50,baseDef:45,baseSpd:120,rarity:'very_rare',moves:['Psyko','Soin','Laser Glace','Tonnerre']},
  {en:'machop',fr:'Machoc',dex:66,types:['Fighting'],baseAtk:80,baseDef:50,baseSpd:35,rarity:'common',moves:['Poing-Karaté','Balayage','Frappe Atlas','Vendetta']},
  {en:'machoke',fr:'Machopeur',dex:67,types:['Fighting'],baseAtk:100,baseDef:70,baseSpd:45,rarity:'uncommon',moves:['Poing-Karaté','Soumission','Frappe Atlas','Balayage']},
  {en:'machamp',fr:'Mackogneur',dex:68,types:['Fighting'],baseAtk:130,baseDef:80,baseSpd:55,rarity:'rare',moves:['Soumission','Poing-Karaté','Séisme','Frappe Atlas']},
  {en:'bellsprout',fr:'Chétiflor',dex:69,types:['Grass','Poison'],baseAtk:75,baseDef:35,baseSpd:40,rarity:'common',moves:['Fouet Lianes','Acide','Vampigraine','Ligotage']},
  {en:'weepinbell',fr:'Boustiflor',dex:70,types:['Grass','Poison'],baseAtk:90,baseDef:50,baseSpd:55,rarity:'uncommon',moves:['Tranch\'Herbe','Acide','Ligotage','Poudre Dodo']},
  {en:'victreebel',fr:'Empiflor',dex:71,types:['Grass','Poison'],baseAtk:105,baseDef:65,baseSpd:70,rarity:'rare',moves:['Tranch\'Herbe','Acide','Lance-Soleil','Ligotage']},
  {en:'tentacool',fr:'Tentacool',dex:72,types:['Water','Poison'],baseAtk:40,baseDef:35,baseSpd:70,rarity:'common',moves:['Dard-Venin','Acide','Surf','Ultrason']},
  {en:'tentacruel',fr:'Tentacruel',dex:73,types:['Water','Poison'],baseAtk:70,baseDef:65,baseSpd:100,rarity:'uncommon',moves:['Surf','Dard-Venin','Acide','Siphon']},
  {en:'geodude',fr:'Racaillou',dex:74,types:['Rock','Ground'],baseAtk:80,baseDef:100,baseSpd:20,rarity:'common',moves:['Charge','Jet-Pierres','Séisme','Armure']},
  {en:'graveler',fr:'Gravalanch',dex:75,types:['Rock','Ground'],baseAtk:95,baseDef:115,baseSpd:35,rarity:'uncommon',moves:['Jet-Pierres','Séisme','Charge','Destruction']},
  {en:'golem',fr:'Golem',dex:76,types:['Rock','Ground'],baseAtk:110,baseDef:130,baseSpd:45,rarity:'rare',moves:['Séisme','Jet-Pierres','Explosion','Plaquage']},
  {en:'ponyta',fr:'Ponyta',dex:77,types:['Fire'],baseAtk:85,baseDef:55,baseSpd:90,rarity:'uncommon',moves:['Flammèche','Charge','Roue de Feu','Hâte']},
  {en:'rapidash',fr:'Galopa',dex:78,types:['Fire'],baseAtk:100,baseDef:70,baseSpd:105,rarity:'rare',moves:['Lance-Flamme','Mégacorne','Roue de Feu','Hâte']},
  {en:'slowpoke',fr:'Ramoloss',dex:79,types:['Water','Psychic'],baseAtk:65,baseDef:65,baseSpd:15,rarity:'common',moves:['Choc Mental','Pistolet à O','Amnésie','Bâillement']},
  {en:'slowbro',fr:'Flagadoss',dex:80,types:['Water','Psychic'],baseAtk:75,baseDef:110,baseSpd:30,rarity:'uncommon',moves:['Psyko','Surf','Amnésie','Lance-Flamme']},
  {en:'magnemite',fr:'Magnéti',dex:81,types:['Electric','Steel'],baseAtk:35,baseDef:70,baseSpd:45,rarity:'common',moves:['Cage Éclair','Étincelle','Ultrason','Tonnerre']},
  {en:'magneton',fr:'Magnéton',dex:82,types:['Electric','Steel'],baseAtk:60,baseDef:95,baseSpd:70,rarity:'uncommon',moves:['Tonnerre','Étincelle','Cage Éclair','Tri Attaque']},
  {en:'farfetchd',fr:'Canarticho',dex:83,types:['Normal','Flying'],baseAtk:65,baseDef:55,baseSpd:60,rarity:'rare',moves:['Tranche','Cru-Aile','Danse Lames','Hâte']},
  {en:'doduo',fr:'Doduo',dex:84,types:['Normal','Flying'],baseAtk:85,baseDef:45,baseSpd:75,rarity:'common',moves:['Picpic','Furie','Poursuite','Bec Vrille']},
  {en:'dodrio',fr:'Dodrio',dex:85,types:['Normal','Flying'],baseAtk:110,baseDef:70,baseSpd:100,rarity:'uncommon',moves:['Bec Vrille','Furie','Tri Attaque','Hâte']},
  {en:'seel',fr:'Otaria',dex:86,types:['Water'],baseAtk:45,baseDef:55,baseSpd:45,rarity:'common',moves:['Laser Glace','Aqua-Jet','Plaquage','Repos']},
  {en:'dewgong',fr:'Lamantine',dex:87,types:['Water','Ice'],baseAtk:70,baseDef:80,baseSpd:70,rarity:'uncommon',moves:['Laser Glace','Surf','Aqua-Jet','Repos']},
  {en:'grimer',fr:'Tadmorv',dex:88,types:['Poison'],baseAtk:80,baseDef:50,baseSpd:25,rarity:'common',moves:['Détritus','Acide','Plaquage','Direct Toxik']},
  {en:'muk',fr:'Grotadmorv',dex:89,types:['Poison'],baseAtk:105,baseDef:75,baseSpd:50,rarity:'uncommon',moves:['Détritus','Direct Toxik','Acide','Plaquage']},
  {en:'shellder',fr:'Kokiyas',dex:90,types:['Water'],baseAtk:65,baseDef:100,baseSpd:40,rarity:'common',moves:['Pistolet à O','Repli','Laser Glace','Claquoir']},
  {en:'cloyster',fr:'Crustabri',dex:91,types:['Water','Ice'],baseAtk:95,baseDef:180,baseSpd:70,rarity:'rare',moves:['Laser Glace','Surf','Picanon','Repli']},
  {en:'gastly',fr:'Fantominus',dex:92,types:['Ghost','Poison'],baseAtk:35,baseDef:30,baseSpd:80,rarity:'uncommon',moves:['Léchouille','Hypnose','Ombre Nocturne','Onde Folie']},
  {en:'haunter',fr:'Spectrum',dex:93,types:['Ghost','Poison'],baseAtk:50,baseDef:45,baseSpd:95,rarity:'rare',moves:['Ball\'Ombre','Hypnose','Ombre Nocturne','Onde Folie']},
  {en:'gengar',fr:'Ectoplasma',dex:94,types:['Ghost','Poison'],baseAtk:65,baseDef:60,baseSpd:110,rarity:'very_rare',moves:['Ball\'Ombre','Hypnose','Cauchemar','Tonnerre']},
  {en:'onix',fr:'Onix',dex:95,types:['Rock','Ground'],baseAtk:45,baseDef:160,baseSpd:70,rarity:'uncommon',moves:['Jet-Pierres','Ligotage','Tunnel','Charge']},
  {en:'drowzee',fr:'Soporifik',dex:96,types:['Psychic'],baseAtk:48,baseDef:45,baseSpd:42,rarity:'common',moves:['Choc Mental','Hypnose','Psyko','Coup d\'Boule']},
  {en:'hypno',fr:'Hypnomade',dex:97,types:['Psychic'],baseAtk:73,baseDef:70,baseSpd:67,rarity:'uncommon',moves:['Psyko','Hypnose','Cauchemar','Onde Folie']},
  {en:'krabby',fr:'Crabe',dex:98,types:['Water'],baseAtk:105,baseDef:90,baseSpd:50,rarity:'common',moves:['Pince-Masse','Bulles d\'O','Armure','Guillotine']},
  {en:'kingler',fr:'Krabboss',dex:99,types:['Water'],baseAtk:130,baseDef:115,baseSpd:75,rarity:'uncommon',moves:['Pince-Masse','Surf','Guillotine','Armure']},
  {en:'voltorb',fr:'Voltorbe',dex:100,types:['Electric'],baseAtk:30,baseDef:50,baseSpd:100,rarity:'common',moves:['Étincelle','Destruction','Cage Éclair','Roulade']},
  {en:'electrode',fr:'Électrode',dex:101,types:['Electric'],baseAtk:50,baseDef:70,baseSpd:140,rarity:'uncommon',moves:['Tonnerre','Explosion','Cage Éclair','Roulade']},
  {en:'exeggcute',fr:'Nœunœuf',dex:102,types:['Grass','Psychic'],baseAtk:40,baseDef:80,baseSpd:40,rarity:'uncommon',moves:['Choc Mental','Vampigraine','Pilonnage','Hypnose']},
  {en:'exeggutor',fr:'Noadkoko',dex:103,types:['Grass','Psychic'],baseAtk:95,baseDef:85,baseSpd:55,rarity:'rare',moves:['Psyko','Lance-Soleil','Pilonnage','Hypnose']},
  {en:'cubone',fr:'Osselait',dex:104,types:['Ground'],baseAtk:50,baseDef:95,baseSpd:35,rarity:'common',moves:['Osmerang','Coup d\'Boule','Charge','Frénésie']},
  {en:'marowak',fr:'Ossatueur',dex:105,types:['Ground'],baseAtk:80,baseDef:110,baseSpd:45,rarity:'uncommon',moves:['Osmerang','Séisme','Coup d\'Boule','Danse Lames']},
  {en:'hitmonlee',fr:'Tygnon',dex:106,types:['Fighting'],baseAtk:120,baseDef:53,baseSpd:87,rarity:'rare',moves:['Mawashi Geri','Pied Brûleur','Balayage','Pied Voltige']},
  {en:'hitmonchan',fr:'Kicklee',dex:107,types:['Fighting'],baseAtk:105,baseDef:79,baseSpd:76,rarity:'rare',moves:['Mach Punch','Poing de Feu','Poing Éclair','Poing Glace']},
  {en:'lickitung',fr:'Excelangue',dex:108,types:['Normal'],baseAtk:55,baseDef:75,baseSpd:30,rarity:'rare',moves:['Léchouille','Ligotage','Plaquage','Tranche']},
  {en:'koffing',fr:'Smogo',dex:109,types:['Poison'],baseAtk:65,baseDef:95,baseSpd:35,rarity:'common',moves:['Détritus','Purédpois','Destruction','Charge']},
  {en:'weezing',fr:'Smogogo',dex:110,types:['Poison'],baseAtk:90,baseDef:120,baseSpd:60,rarity:'uncommon',moves:['Détritus','Purédpois','Explosion','Lance-Flamme']},
  {en:'rhyhorn',fr:'Rhinocorne',dex:111,types:['Ground','Rock'],baseAtk:85,baseDef:95,baseSpd:25,rarity:'uncommon',moves:['Charge','Koud\'Korne','Piétisol','Séisme']},
  {en:'rhydon',fr:'Rhinoféros',dex:112,types:['Ground','Rock'],baseAtk:130,baseDef:120,baseSpd:40,rarity:'rare',moves:['Séisme','Mégacorne','Surf','Jet-Pierres']},
  {en:'chansey',fr:'Leveinard',dex:113,types:['Normal'],baseAtk:5,baseDef:5,baseSpd:50,rarity:'rare',moves:['Torgnoles','Œuf Mimique','E-Coque','Tonnerre']},
  {en:'tangela',fr:'Saquedeneu',dex:114,types:['Grass'],baseAtk:55,baseDef:115,baseSpd:60,rarity:'uncommon',moves:['Fouet Lianes','Étreinte','Vampigraine','Poudre Dodo']},
  {en:'kangaskhan',fr:'Kangourex',dex:115,types:['Normal'],baseAtk:95,baseDef:80,baseSpd:90,rarity:'rare',moves:['Mégacorne','Plaquage','Séisme','Tranche']},
  {en:'horsea',fr:'Hypotrempe',dex:116,types:['Water'],baseAtk:40,baseDef:70,baseSpd:60,rarity:'common',moves:['Pistolet à O','Cyclone','Bulles d\'O','Brouillard']},
  {en:'seadra',fr:'Hypocéan',dex:117,types:['Water'],baseAtk:65,baseDef:95,baseSpd:85,rarity:'uncommon',moves:['Hydrocanon','Laser Glace','Cyclone','Bulles d\'O']},
  {en:'goldeen',fr:'Poissirène',dex:118,types:['Water'],baseAtk:67,baseDef:60,baseSpd:63,rarity:'common',moves:['Koud\'Korne','Cascade','Hâte','Furie']},
  {en:'seaking',fr:'Poissoroy',dex:119,types:['Water'],baseAtk:92,baseDef:65,baseSpd:68,rarity:'uncommon',moves:['Cascade','Koud\'Korne','Mégacorne','Surf']},
  {en:'staryu',fr:'Stari',dex:120,types:['Water'],baseAtk:45,baseDef:55,baseSpd:85,rarity:'common',moves:['Pistolet à O','Vive-Attaque','Soin','Tonnerre']},
  {en:'starmie',fr:'Staross',dex:121,types:['Water','Psychic'],baseAtk:75,baseDef:85,baseSpd:115,rarity:'rare',moves:['Psyko','Surf','Tonnerre','Soin']},
  {en:'mr-mime',fr:'M. Mime',dex:122,types:['Psychic','Fairy'],baseAtk:45,baseDef:65,baseSpd:90,rarity:'rare',moves:['Choc Mental','Mur Lumière','Protection','Psyko']},
  {en:'scyther',fr:'Insécateur',dex:123,types:['Bug','Flying'],baseAtk:110,baseDef:80,baseSpd:105,rarity:'rare',moves:['Tranche','Cru-Aile','Danse Lames','Vive-Attaque']},
  {en:'jynx',fr:'Lippoutou',dex:124,types:['Ice','Psychic'],baseAtk:50,baseDef:35,baseSpd:95,rarity:'rare',moves:['Psyko','Laser Glace','Grobisou','Berceuse']},
  {en:'electabuzz',fr:'Élektabuzz',dex:125,types:['Electric'],baseAtk:83,baseDef:57,baseSpd:105,rarity:'rare',moves:['Tonnerre','Poing Éclair','Vive-Attaque','Cage Éclair']},
  {en:'magmar',fr:'Magmar',dex:126,types:['Fire'],baseAtk:95,baseDef:57,baseSpd:93,rarity:'rare',moves:['Lance-Flamme','Poing de Feu','Brouillard','Déflagration']},
  {en:'pinsir',fr:'Scarabrute',dex:127,types:['Bug'],baseAtk:125,baseDef:100,baseSpd:85,rarity:'rare',moves:['Plaie-Croix','Guillotine','Tranche','Soumission']},
  {en:'tauros',fr:'Tauros',dex:128,types:['Normal'],baseAtk:100,baseDef:95,baseSpd:110,rarity:'rare',moves:['Plaquage','Séisme','Bélier','Frénésie']},
  {en:'magikarp',fr:'Magicarpe',dex:129,types:['Water'],baseAtk:10,baseDef:55,baseSpd:80,rarity:'common',moves:['Trempette','Charge','Trempette','Charge']},
  {en:'gyarados',fr:'Léviator',dex:130,types:['Water','Flying'],baseAtk:125,baseDef:79,baseSpd:81,rarity:'very_rare',moves:['Hydrocanon','Morsure','Tonnerre','Ouragan']},
  {en:'lapras',fr:'Lokhlass',dex:131,types:['Water','Ice'],baseAtk:85,baseDef:80,baseSpd:60,rarity:'very_rare',moves:['Surf','Laser Glace','Plaquage','Berceuse']},
  {en:'ditto',fr:'Métamorph',dex:132,types:['Normal'],baseAtk:48,baseDef:48,baseSpd:48,rarity:'rare',moves:['Morphing','Morphing','Morphing','Morphing']},
  {en:'eevee',fr:'Évoli',dex:133,types:['Normal'],baseAtk:55,baseDef:50,baseSpd:55,rarity:'rare',moves:['Charge','Vive-Attaque','Morsure','Jet de Sable']},
  {en:'vaporeon',fr:'Aquali',dex:134,types:['Water'],baseAtk:65,baseDef:60,baseSpd:65,rarity:'very_rare',moves:['Surf','Laser Glace','Vive-Attaque','Brouillard']},
  {en:'jolteon',fr:'Voltali',dex:135,types:['Electric'],baseAtk:65,baseDef:60,baseSpd:130,rarity:'very_rare',moves:['Tonnerre','Vive-Attaque','Cage Éclair','Double Pied']},
  {en:'flareon',fr:'Pyroli',dex:136,types:['Fire'],baseAtk:130,baseDef:60,baseSpd:65,rarity:'very_rare',moves:['Lance-Flamme','Vive-Attaque','Morsure','Brouillard']},
  {en:'porygon',fr:'Porygon',dex:137,types:['Normal'],baseAtk:60,baseDef:70,baseSpd:40,rarity:'rare',moves:['Tri Attaque','Psyko','Tonnerre','Laser Glace']},
  {en:'omanyte',fr:'Amonita',dex:138,types:['Rock','Water'],baseAtk:40,baseDef:100,baseSpd:35,rarity:'rare',moves:['Pistolet à O','Morsure','Repli','Surf']},
  {en:'omastar',fr:'Amonistar',dex:139,types:['Rock','Water'],baseAtk:60,baseDef:125,baseSpd:55,rarity:'very_rare',moves:['Surf','Jet-Pierres','Laser Glace','Picanon']},
  {en:'kabuto',fr:'Kabuto',dex:140,types:['Rock','Water'],baseAtk:80,baseDef:90,baseSpd:55,rarity:'rare',moves:['Griffe','Pistolet à O','Armure','Tranche']},
  {en:'kabutops',fr:'Kabutops',dex:141,types:['Rock','Water'],baseAtk:115,baseDef:105,baseSpd:80,rarity:'very_rare',moves:['Tranche','Surf','Séisme','Danse Lames']},
  {en:'aerodactyl',fr:'Ptéra',dex:142,types:['Rock','Flying'],baseAtk:105,baseDef:65,baseSpd:130,rarity:'very_rare',moves:['Cru-Aile','Morsure','Hâte','Bec Vrille']},
  {en:'snorlax',fr:'Ronflex',dex:143,types:['Normal'],baseAtk:110,baseDef:65,baseSpd:30,rarity:'rare',moves:['Plaquage','Repos','Séisme','Coup d\'Boule']},
  {en:'articuno',fr:'Artikodin',dex:144,types:['Ice','Flying'],baseAtk:85,baseDef:100,baseSpd:85,rarity:'legendary',moves:['Blizzard','Laser Glace','Cru-Aile','Brume']},
  {en:'zapdos',fr:'Électhor',dex:145,types:['Electric','Flying'],baseAtk:90,baseDef:85,baseSpd:100,rarity:'legendary',moves:['Fatal-Foudre','Tonnerre','Bec Vrille','Cage Éclair']},
  {en:'moltres',fr:'Sulfura',dex:146,types:['Fire','Flying'],baseAtk:100,baseDef:90,baseSpd:90,rarity:'legendary',moves:['Déflagration','Lance-Flamme','Cru-Aile','Hâte']},
  {en:'dratini',fr:'Minidraco',dex:147,types:['Dragon'],baseAtk:64,baseDef:45,baseSpd:50,rarity:'rare',moves:['Ligotage','Cage Éclair','Surf','Hâte']},
  {en:'dragonair',fr:'Draco',dex:148,types:['Dragon'],baseAtk:84,baseDef:65,baseSpd:70,rarity:'very_rare',moves:['Draco-Rage','Surf','Tonnerre','Hâte']},
  {en:'dragonite',fr:'Dracolosse',dex:149,types:['Dragon','Flying'],baseAtk:134,baseDef:95,baseSpd:80,rarity:'very_rare',moves:['Draco-Rage','Surf','Tonnerre','Déflagration']},
  {en:'mewtwo',fr:'Mewtwo',dex:150,types:['Psychic'],baseAtk:110,baseDef:90,baseSpd:130,rarity:'legendary',moves:['Psyko','Laser Glace','Tonnerre','Soin']},
  {en:'mew',fr:'Mew',dex:151,types:['Psychic'],baseAtk:100,baseDef:100,baseSpd:100,rarity:'legendary',moves:['Psyko','Métronome','Surf','Lance-Flamme']},
];

// Quick lookup maps
const SPECIES_BY_EN = {};
const SPECIES_BY_DEX = {};
POKEMON_GEN1.forEach(s => { SPECIES_BY_EN[s.en] = s; SPECIES_BY_DEX[s.dex] = s; });

// FR→EN / EN→FR name maps
const FR_TO_EN = {};
const EN_TO_FR = {};
POKEMON_GEN1.forEach(s => {
  FR_TO_EN[s.fr.toLowerCase()] = s.en;
  EN_TO_FR[s.en] = s.fr;
});

// ── Natures (10) ─────────────────────────────────────────────
const NATURES = {
  hardy:   { fr:'Hardi',    en:'Hardy',   atk:1,   def:1,   spd:1   },
  brave:   { fr:'Brave',    en:'Brave',   atk:1.1, def:1,   spd:0.9 },
  timid:   { fr:'Timide',   en:'Timid',   atk:0.9, def:1,   spd:1.1 },
  bold:    { fr:'Assuré',   en:'Bold',    atk:0.9, def:1.1, spd:1   },
  jolly:   { fr:'Jovial',   en:'Jolly',   atk:1,   def:0.9, spd:1.1 },
  adamant: { fr:'Rigide',   en:'Adamant', atk:1.1, def:1,   spd:0.9 },
  calm:    { fr:'Calme',    en:'Calm',    atk:1,   def:1.1, spd:0.9 },
  modest:  { fr:'Modeste',  en:'Modest',  atk:0.9, def:1,   spd:1.1 },
  careful: { fr:'Prudent',  en:'Careful', atk:1,   def:1.1, spd:0.9 },
  naive:   { fr:'Naïf',     en:'Naive',   atk:1,   def:0.9, spd:1.1 },
};
const NATURE_KEYS = Object.keys(NATURES);

// ── Zones ────────────────────────────────────────────────────
// Showdown background sprites
const ZONE_BG_URL = (name) => `https://play.pokemonshowdown.com/sprites/gen5-back/${name}.png`;
const ZONE_BGS = {
  route1:          'url(https://play.pokemonshowdown.com/fx/bg-meadow.png)',
  viridian_forest: 'url(https://play.pokemonshowdown.com/fx/bg-forest.png)',
  diglett_cave:    'url(https://play.pokemonshowdown.com/fx/bg-cave.png)',
  nugget_bridge:   'url(https://play.pokemonshowdown.com/fx/bg-river.png)',
  pallet_town:     'url(https://play.pokemonshowdown.com/fx/bg-meadow.png)',
  safari_zone:     'url(https://play.pokemonshowdown.com/fx/bg-forest.png)',
  celadon_casino:  'url(https://play.pokemonshowdown.com/fx/bg-city.png)',
  pokemon_tower:   'url(https://play.pokemonshowdown.com/fx/bg-space.png)',
  seafoam_islands: 'url(https://play.pokemonshowdown.com/fx/bg-beach.png)',
  silph_co:        'url(https://play.pokemonshowdown.com/fx/bg-city.png)',
  unknown_cave:    'url(https://play.pokemonshowdown.com/fx/bg-cave.png)',
};

const ZONES = [
  { id:'route1',        fr:'Route 1',           en:'Route 1',           rep:0,   spawnRate:0.15,
    pool:['rattata','pidgey','caterpie','weedle','spearow','nidoran-f','nidoran-m'],
    trainers:['youngster','lass'], eliteTrainer:'acetrainer', investCost:0 },
  { id:'viridian_forest',fr:'Forêt de Jade',    en:'Viridian Forest',   rep:10,  spawnRate:0.12,
    pool:['pikachu','caterpie','metapod','butterfree','weedle','kakuna','beedrill'],
    trainers:['bugcatcher','youngster'], eliteTrainer:'acetrainer', investCost:3000 },
  { id:'diglett_cave',  fr:'Grotte Taupiqueur', en:'Diglett\'s Cave',   rep:25,  spawnRate:0.10,
    pool:['diglett','dugtrio','geodude','zubat','onix'],
    trainers:['hiker','camper'], eliteTrainer:'hiker', investCost:5000 },
  { id:'nugget_bridge', fr:'Pont Pépite',       en:'Nugget Bridge',     rep:35,  spawnRate:0.12,
    pool:['abra','pidgey','oddish','bellsprout','mankey','goldeen'],
    trainers:['youngster','lass','acetrainer'], eliteTrainer:'acetrainer', investCost:6000 },
  { id:'pallet_town',   fr:'Bourg Palette',     en:'Pallet Town',       rep:40,  spawnRate:0.08,
    pool:['rattata','pidgey','bulbasaur','charmander','squirtle'],
    trainers:['acetrainer'], eliteTrainer:'acetrainer', investCost:8000 },
  { id:'safari_zone',   fr:'Parc Safari',       en:'Safari Zone',       rep:50,  spawnRate:0.10,
    pool:['kangaskhan','tauros','scyther','pinsir','nidoran-f','nidoran-m','chansey','dratini'],
    trainers:['acetrainer','gentleman'], eliteTrainer:'gentleman', investCost:12000 },
  { id:'celadon_casino',fr:'Casino de Céladopole',en:'Celadon Casino',  rep:60,  spawnRate:0.10,
    pool:['porygon','abra','clefairy','meowth','voltorb'],
    trainers:['rocketgrunt','rocketgruntf','gentleman'], eliteTrainer:'rocketgrunt', investCost:15000 },
  { id:'pokemon_tower', fr:'Tour Pokémon',      en:'Pokémon Tower',     rep:75,  spawnRate:0.08,
    pool:['gastly','haunter','cubone','zubat'],
    trainers:['psychic','rocketgrunt'], eliteTrainer:'psychic', investCost:18000 },
  { id:'seafoam_islands',fr:'Îles Écume',       en:'Seafoam Islands',   rep:80,  spawnRate:0.10,
    pool:['tentacool','shellder','staryu','seel','horsea','lapras'],
    trainers:['swimmer','acetrainer'], eliteTrainer:'acetrainer', investCost:20000 },
  { id:'silph_co',      fr:'Sylphe SARL',       en:'Silph Co.',         rep:90,  spawnRate:0.12,
    pool:['porygon','electrode','magnemite','magneton','voltorb'],
    trainers:['rocketgrunt','rocketgruntf','scientist'], eliteTrainer:'giovanni', investCost:30000 },
  { id:'unknown_cave',  fr:'Grotte Inconnue',   en:'Unknown Cave',      rep:100, spawnRate:0.05,
    pool:['mewtwo','ditto','kadabra','alakazam','electrode'],
    trainers:[], eliteTrainer:'giovanni', investCost:50000 },
];

// ── Special Events ────────────────────────────────────────────
const SPECIAL_EVENTS = [
  { id:'rocket_invasion', fr:'Invasion Rocket !', en:'Rocket Invasion!', icon:'🚀',
    trainerKey:'giovanni', chance:0.03, minRep:40,
    reward: { money:[3000,8000], rep:15, unlockZone:null },
    desc_fr:'Giovanni envoie ses meilleurs sbires ! Battez-le pour un gros bonus.',
    desc_en:'Giovanni sends his best grunts! Defeat him for a big bonus.' },
  { id:'shiny_swarm', fr:'Nuée Shiny !', en:'Shiny Swarm!', icon:'✨',
    trainerKey:null, chance:0.04, minRep:20,
    reward: { shinyBoost:60000 }, // 60s of shiny boost
    desc_fr:'Les Pokémon brillent dans cette zone ! Taux Shiny x10 pendant 60s.',
    desc_en:'Pokémon sparkle in this zone! Shiny rate x10 for 60s.' },
  { id:'rare_migration', fr:'Migration Rare !', en:'Rare Migration!', icon:'🦅',
    trainerKey:null, chance:0.05, minRep:15,
    reward: { rareBoost:60000 }, // 60s of rare boost
    desc_fr:'Des Pokémon rares migrent ici ! Spawns rares x5 pendant 60s.',
    desc_en:'Rare Pokémon are migrating here! Rare spawns x5 for 60s.' },
  { id:'treasure_rain', fr:'Pluie de Trésors !', en:'Treasure Rain!', icon:'💎',
    trainerKey:null, chance:0.04, minRep:10,
    reward: { chestBoost:45000 }, // 45s of extra chests
    desc_fr:'Des coffres apparaissent partout pendant 45s !',
    desc_en:'Treasure chests appear everywhere for 45s!' },
  { id:'elite_challenge', fr:'Défi Élite !', en:'Elite Challenge!', icon:'🏆',
    trainerKey:null, chance:0.03, minRep:30, // uses zone's eliteTrainer
    reward: { money:[2000,5000], rep:10, xpBonus:50 },
    desc_fr:'Un dresseur d\'élite vous défie ! Récompenses doublées.',
    desc_en:'An elite trainer challenges you! Double rewards.' },
];

// ── Treasure Chest Loot Table ──────────────────────────────────
const CHEST_LOOT = [
  { weight:30, type:'balls',    qty:[3,8],   ballType:'pokeball',  fr:'Poké Balls',     en:'Poké Balls'     },
  { weight:20, type:'balls',    qty:[2,5],   ballType:'greatball', fr:'Super Balls',    en:'Great Balls'    },
  { weight:10, type:'balls',    qty:[1,3],   ballType:'ultraball', fr:'Hyper Balls',    en:'Ultra Balls'    },
  { weight:15, type:'money',    qty:[500,2000],                    fr:'PokéDollars',    en:'PokéDollars'    },
  { weight:10, type:'rare_pokemon',                                fr:'Pokémon Rare !', en:'Rare Pokémon!'  },
  { weight:8,  type:'item',     itemId:'incense',  qty:1,         fr:'Encens Chance',  en:'Lucky Incense'  },
  { weight:4,  type:'item',     itemId:'rarescope', qty:1,        fr:'Rarioscope',     en:'Rare Scope'     },
  { weight:2,  type:'item',     itemId:'aura',     qty:1,         fr:'Aura Shiny',     en:'Shiny Aura'     },
  { weight:1,  type:'event',                                       fr:'Événement !',    en:'Event!'         },
];
const ZONE_BY_ID = {};
ZONES.forEach(z => ZONE_BY_ID[z.id] = z);

// ── Trainers ──────────────────────────────────────────────────
const TRAINER_TYPES = {
  youngster:    { fr:'Gamin',        en:'Youngster',    sprite:'youngster',    diff:1, reward:[50,150],   rep:1  },
  lass:         { fr:'Fillette',     en:'Lass',         sprite:'lass',         diff:1, reward:[50,150],   rep:1  },
  bugcatcher:   { fr:'Chasseur',     en:'Bug Catcher',  sprite:'bugcatcher',   diff:1, reward:[50,150],   rep:1  },
  camper:       { fr:'Campeur',      en:'Camper',       sprite:'camper',       diff:1, reward:[80,200],   rep:1  },
  hiker:        { fr:'Montagnard',   en:'Hiker',        sprite:'hiker',        diff:2, reward:[200,500],  rep:3  },
  swimmer:      { fr:'Nageur',       en:'Swimmer',      sprite:'swimmer',      diff:2, reward:[200,500],  rep:3  },
  psychic:      { fr:'Médium',       en:'Psychic',      sprite:'psychic',      diff:2, reward:[200,500],  rep:3  },
  gentleman:    { fr:'Gentleman',    en:'Gentleman',    sprite:'gentleman',    diff:2, reward:[300,800],  rep:3  },
  acetrainer:   { fr:'Topdresseur',  en:'Ace Trainer',  sprite:'acetrainer',   diff:3, reward:[500,1500], rep:5  },
  scientist:    { fr:'Scientifique', en:'Scientist',    sprite:'scientist',    diff:3, reward:[500,1500], rep:5  },
  rocketgrunt:  { fr:'Sbire Rocket', en:'Rocket Grunt', sprite:'rocketgrunt',  diff:4, reward:[1000,3000],rep:10 },
  rocketgruntf: { fr:'Sbire Rocket', en:'Rocket Grunt', sprite:'rocketgruntf', diff:4, reward:[1000,3000],rep:10 },
  giovanni:     { fr:'Giovanni',     en:'Giovanni',     sprite:'giovanni',     diff:5, reward:[5000,10000],rep:25},
};

// ── Items & Balls ─────────────────────────────────────────────
const BALLS = {
  pokeball:  { fr:'Poké Ball',  en:'Poké Ball',  cost:200,  potential:[40,30,20,8,2]  },
  greatball: { fr:'Super Ball', en:'Great Ball',  cost:600,  potential:[15,30,30,18,7] },
  ultraball: { fr:'Hyper Ball', en:'Ultra Ball',  cost:2000, potential:[5,15,30,30,20] },
  duskball:  { fr:'Sombre Ball',en:'Dusk Ball',   cost:1500, potential:[20,20,20,20,20]},
};

const SHOP_ITEMS = [
  { id:'pokeball',  qty:10, cost:2000,  icon:'⚪' },
  { id:'greatball', qty:10, cost:6000,  icon:'🔵' },
  { id:'ultraball', qty:5,  cost:10000, icon:'🟡' },
  { id:'duskball',  qty:5,  cost:7500,  icon:'🟣' },
  { id:'lure',      qty:1,  cost:500,   icon:'🪝', fr:'Leurre',     en:'Lure',       desc_fr:'x2 spawns 60s', desc_en:'x2 spawns 60s' },
  { id:'superlure', qty:1,  cost:2000,  icon:'🪝', fr:'Super Leurre',en:'Super Lure', desc_fr:'x3 spawns 60s', desc_en:'x3 spawns 60s' },
  { id:'potion',    qty:1,  cost:300,   icon:'💊', fr:'Potion',     en:'Potion',     desc_fr:'Retire cooldown', desc_en:'Remove cooldown' },
  { id:'incense',   qty:1,  cost:1500,  icon:'🔮', fr:'Encens Chance',en:'Lucky Incense', desc_fr:'★+1 potentiel 90s', desc_en:'★+1 potential 90s' },
  { id:'rarescope', qty:1,  cost:3000,  icon:'🔭', fr:'Rarioscope', en:'Rare Scope',   desc_fr:'Spawns rares x3 90s', desc_en:'Rare spawns x3 90s' },
  { id:'aura',      qty:1,  cost:5000,  icon:'✨', fr:'Aura Shiny', en:'Shiny Aura',   desc_fr:'Shiny x5 90s',        desc_en:'Shiny x5 90s' },
];

// ── Potential multipliers (for market price) ─────────────────
const POTENTIAL_MULT = [0.5, 1, 2, 5, 15]; // index 0=★1 .. 4=★5

// ── Base prices by rarity ─────────────────────────────────────
const BASE_PRICE = { common:100, uncommon:250, rare:600, very_rare:1500, legendary:5000 };

// ── Boss sprites to pick from ─────────────────────────────────
const BOSS_SPRITES = [
  'rocketgrunt','rocketgruntf','giovanni','archer','ariana','proton',
  'scientist','red','silver','blue',
];

// ── Agent name pools ──────────────────────────────────────────
const AGENT_NAMES_M = ['Marco','Léo','Jin','Viktor','Dante','Axel','Zane','Kai','Nero','Blaze','Rex','Ash','Saul','Ren','Hugo'];
const AGENT_NAMES_F = ['Mira','Luna','Jade','Nova','Aria','Ivy','Nyx','Zara','Kira','Elsa','Rosa','Saki','Lena','Yuki','Tess'];
const AGENT_SPRITES = ['rocketgrunt','rocketgruntf','scientist','archer','ariana','proton','camper','picnicker','acetrainer','psychic'];
const AGENT_PERSONALITIES = ['loyal','nervous','reckless','calm','cunning','lazy','fierce','quiet','greedy','brave','curious','stubborn'];

const TITLE_REQUIREMENTS = {
  lieutenant: { level: 50, combatsWon: 25 },
  captain:    { level: 75, combatsWon: 200 },
};
const TITLE_BONUSES = { grunt: 0, lieutenant: 0.15, captain: 0.30 };

// ── I18N ──────────────────────────────────────────────────────
const I18N = {
  // Tabs
  gang_tab:      { fr:'💀 Gang',     en:'💀 Gang'     },
  zones_tab:     { fr:'🗺️ Zones',   en:'🗺️ Zones'   },
  market_tab:    { fr:'💰 Marché',   en:'💰 Market'   },
  pc_tab:        { fr:'💻 PC',       en:'💻 PC'       },
  pokedex_tab:   { fr:'📖 Pokédex',  en:'📖 Pokédex'  },
  // Gang
  boss:          { fr:'Boss',        en:'Boss'        },
  reputation:    { fr:'Réputation',  en:'Reputation'  },
  agents:        { fr:'Agents',      en:'Agents'      },
  no_agents:     { fr:'Aucun agent recruté', en:'No agents recruited' },
  recruit_agent: { fr:'Recruter',    en:'Recruit'     },
  promote:       { fr:'Promouvoir',  en:'Promote'     },
  // Zone
  mastery:       { fr:'Maîtrise',    en:'Mastery'     },
  fights_won:    { fr:'Combats gagnés', en:'Fights won' },
  locked:        { fr:'🔒 Verrouillé (rep {rep})', en:'🔒 Locked (rep {rep})' },
  open_zone:     { fr:'Ouvrir',      en:'Open'        },
  close_zone:    { fr:'Fermer',      en:'Close'       },
  zone_mastered: { fr:'Zone maîtrisée !', en:'Zone mastered!' },
  // Capture
  catch_success: { fr:'{name} capturé !', en:'{name} caught!' },
  catch_shiny:   { fr:'✨ {name} SHINY capturé !', en:'✨ SHINY {name} caught!' },
  no_balls:      { fr:'Plus de {ball} !', en:'No {ball} left!' },
  // Combat
  combat_win:    { fr:'Victoire ! +{money}₽ +{rep} rep', en:'Victory! +{money}₽ +{rep} rep' },
  combat_lose:   { fr:'Défaite...', en:'Defeat...' },
  combat_title:  { fr:'Combat',     en:'Combat'     },
  // Market
  sell:          { fr:'Vendre',      en:'Sell'        },
  buy:           { fr:'Acheter',     en:'Buy'         },
  sold:          { fr:'Vendu {n} Pokémon pour {price}₽', en:'Sold {n} Pokémon for {price}₽' },
  bought:        { fr:'{item} acheté !', en:'{item} purchased!' },
  not_enough:    { fr:'Pas assez de ₽', en:'Not enough ₽' },
  // PC
  level:         { fr:'Niv.',        en:'Lv.'         },
  nature:        { fr:'Nature',      en:'Nature'      },
  potential:     { fr:'Potentiel',   en:'Potential'    },
  moves:         { fr:'Capacités',   en:'Moves'       },
  zone_caught:   { fr:'Zone',        en:'Zone'        },
  assign:        { fr:'Assigner',    en:'Assign'      },
  release:       { fr:'Relâcher',    en:'Release'     },
  // Agent
  agent_catch:   { fr:'{agent} a capturé {pokemon} !', en:'{agent} caught {pokemon}!' },
  agent_win:     { fr:'{agent} a vaincu un dresseur !', en:'{agent} defeated a trainer!' },
  agent_lose:    { fr:'{agent} a perdu un combat...', en:'{agent} lost a fight...' },
  agent_promo:   { fr:'{agent} promu {title} !', en:'{agent} promoted to {title}!' },
  // Stats
  total_caught:  { fr:'Capturés',    en:'Caught'      },
  total_sold:    { fr:'Vendus',      en:'Sold'        },
  total_fights:  { fr:'Combats',     en:'Fights'      },
  total_money:   { fr:'₽ gagnés',    en:'₽ earned'    },
  shiny_caught:  { fr:'Shinies',     en:'Shinies'     },
  // Settings
  settings:      { fr:'Paramètres',  en:'Settings'    },
  language:      { fr:'Langue',      en:'Language'    },
  save_export:   { fr:'Exporter',    en:'Export'      },
  save_import:   { fr:'Importer',    en:'Import'      },
  reset_all:     { fr:'Tout effacer',en:'Reset all'   },
  reset_confirm: { fr:'Vraiment tout supprimer ?', en:'Really delete everything?' },
  // Intro
  intro_title:   { fr:'PokéForge',   en:'PokéForge'   },
  intro_sub:     { fr:'Crée ton gang. Conquiers Kanto.', en:'Build your gang. Conquer Kanto.' },
  boss_name:     { fr:'Nom du Boss', en:'Boss Name'   },
  gang_name:     { fr:'Nom du Gang', en:'Gang Name'   },
  avatar:        { fr:'Avatar',      en:'Avatar'      },
  start_game:    { fr:'Commencer',   en:'Start'       },
  // LLM
  llm_connected: { fr:'LLM connecté', en:'LLM connected' },
  llm_off:       { fr:'LLM hors-ligne', en:'LLM offline' },
  // Misc
  pokedex_progress:{ fr:'{caught}/{total} capturés', en:'{caught}/{total} caught' },
};

function t(key, vars = {}) {
  const entry = I18N[key];
  if (!entry) return key;
  let str = entry[state.lang] || entry.fr || key;
  for (const [k, v] of Object.entries(vars)) {
    str = str.replace(`{${k}}`, v);
  }
  return str;
}

// ════════════════════════════════════════════════════════════════
//  2.  STATE MANAGEMENT
// ════════════════════════════════════════════════════════════════

const SAVE_KEY = 'pokeforge.v6';

const DEFAULT_STATE = {
  version: '6.0.0',
  lang: 'fr',
  gang: {
    name: 'Team ???',
    bossName: 'Boss',
    bossSprite: '',
    bossZone: null, // the zone the boss is currently in
    reputation: 0,
    money: 5000,
    initialized: false,
  },
  inventory: {
    pokeball: 20,
    greatball: 0,
    ultraball: 0,
    duskball: 0,
    lure: 0,
    superlure: 0,
    potion: 0,
    incense: 0,
    rarescope: 0,
    aura: 0,
  },
  activeBall: 'pokeball',
  activeBoosts: {
    incense:   0, // timestamp when expires (0 = inactive)
    rarescope: 0,
    aura:      0,
    lure:      0,
    superlure: 0,
    chestBoost:0,
  },
  pokemons: [],
  agents: [],
  zones: {},
  pokedex: {},
  activeEvents: {}, // zoneId -> { eventId, expiresAt, data }
  stats: {
    totalCaught: 0,
    totalSold: 0,
    totalFights: 0,
    totalFightsWon: 0,
    totalMoneyEarned: 0,
    totalMoneySpent: 0,
    shinyCaught: 0,
    rocketDefeated: 0,
    chestsOpened: 0,
    eventsCompleted: 0,
  },
  settings: {
    llmEnabled: false,
    llmProvider: 'none',
    llmUrl: 'http://localhost:11434',
    llmModel: 'llama3',
    llmApiKey: '',
    sfxEnabled: true,
    musicEnabled: false,
  },
  log: [],
};

let state = structuredClone(DEFAULT_STATE);

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const saved = JSON.parse(raw);
    return migrate(saved);
  } catch { return null; }
}

function migrate(saved) {
  if (!saved.version) saved.version = '6.0.0';
  const merged = { ...structuredClone(DEFAULT_STATE), ...saved };
  merged.gang = { ...structuredClone(DEFAULT_STATE.gang), ...saved.gang };
  merged.inventory = { ...structuredClone(DEFAULT_STATE.inventory), ...saved.inventory };
  merged.stats = { ...structuredClone(DEFAULT_STATE.stats), ...saved.stats };
  merged.settings = { ...structuredClone(DEFAULT_STATE.settings), ...saved.settings };
  merged.activeBoosts = { ...structuredClone(DEFAULT_STATE.activeBoosts), ...(saved.activeBoosts || {}) };
  merged.activeEvents = saved.activeEvents || {};
  return merged;
}

function exportSave() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pokeforge-v6-save-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      state = migrate(JSON.parse(e.target.result));
      saveState();
      renderAll();
      notify(t('save_import'), 'success');
    } catch {
      notify('Import failed', 'error');
    }
  };
  reader.readAsText(file);
}

// ════════════════════════════════════════════════════════════════
//  3.  CORE UTILS
// ════════════════════════════════════════════════════════════════

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function uid() { return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function addLog(msg) {
  state.log.unshift({ msg, ts: Date.now() });
  if (state.log.length > 50) state.log.length = 50;
}

function sanitizeSpriteName(en) {
  // Showdown sprites use no hyphens for nidoran: nidoranf, nidoranm
  // and some others like mr-mime -> mrmime, farfetchd, etc.
  return en.replace(/[^a-z0-9]/g, '');
}

function pokeSprite(en, shiny = false) {
  const base = shiny ? 'gen5-shiny' : 'gen5';
  return `https://play.pokemonshowdown.com/sprites/${base}/${sanitizeSpriteName(en)}.png`;
}

function pokeSpriteBack(en, shiny = false) {
  const base = shiny ? 'gen5-back-shiny' : 'gen5-back';
  return `https://play.pokemonshowdown.com/sprites/${base}/${sanitizeSpriteName(en)}.png`;
}

function trainerSprite(name) {
  return `https://play.pokemonshowdown.com/sprites/trainers/${name}.png`;
}

function speciesName(en) {
  if (!SPECIES_BY_EN[en]) return en;
  return state.lang === 'fr' ? SPECIES_BY_EN[en].fr : en.charAt(0).toUpperCase() + en.slice(1);
}

// ── Boost helpers ─────────────────────────────────────────────
function isBoostActive(boostId) {
  return (state.activeBoosts[boostId] || 0) > Date.now();
}
function boostRemaining(boostId) {
  const exp = state.activeBoosts[boostId] || 0;
  return Math.max(0, Math.ceil((exp - Date.now()) / 1000));
}
function activateBoost(boostId) {
  if ((state.inventory[boostId] || 0) <= 0) return false;
  state.inventory[boostId]--;
  state.activeBoosts[boostId] = Date.now() + 90000; // 90 seconds
  saveState();
  return true;
}

// Ball sprites from Showdown
const BALL_SPRITES = {
  pokeball:  'https://play.pokemonshowdown.com/sprites/itemicons/poke-ball.png',
  greatball: 'https://play.pokemonshowdown.com/sprites/itemicons/great-ball.png',
  ultraball: 'https://play.pokemonshowdown.com/sprites/itemicons/ultra-ball.png',
  duskball:  'https://play.pokemonshowdown.com/sprites/itemicons/dusk-ball.png',
};

// ── SFX Engine (Web Audio API) ────────────────────────────────
const SFX = (() => {
  let ctx;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }
  function playTone(freq, duration, type = 'square', volume = 0.15) {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    gain.gain.setValueAtTime(volume, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration);
  }
  return {
    ballThrow() {
      // Whoosh sound: descending noise
      playTone(800, 0.15, 'sawtooth', 0.08);
      setTimeout(() => playTone(400, 0.1, 'sawtooth', 0.06), 80);
    },
    capture(potential, shiny) {
      // Base capture jingle
      const base = 520;
      playTone(base, 0.12, 'square', 0.12);
      setTimeout(() => playTone(base * 1.25, 0.12, 'square', 0.12), 100);
      setTimeout(() => playTone(base * 1.5, 0.15, 'square', 0.12), 200);
      // Extra notes for high potential
      if (potential >= 4) {
        setTimeout(() => playTone(base * 2, 0.2, 'square', 0.15), 320);
      }
      if (potential >= 5 || shiny) {
        setTimeout(() => playTone(base * 2.5, 0.25, 'sine', 0.18), 440);
        setTimeout(() => playTone(base * 3, 0.3, 'sine', 0.15), 580);
      }
      if (shiny) {
        // Sparkle effect
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            setTimeout(() => playTone(1200 + i * 200, 0.08, 'sine', 0.1), i * 60);
          }
        }, 700);
      }
    },
    error() {
      playTone(200, 0.2, 'sawtooth', 0.1);
    },
  };
})();

// ════════════════════════════════════════════════════════════════
//  4.  POKEMON MODULE
// ════════════════════════════════════════════════════════════════

function rollNature() { return pick(NATURE_KEYS); }

function rollPotential(ballType) {
  const dist = BALLS[ballType]?.potential || BALLS.pokeball.potential;
  const r = Math.random() * 100;
  let acc = 0;
  let result = 1;
  for (let i = 0; i < dist.length; i++) {
    acc += dist[i];
    if (r < acc) { result = i + 1; break; }
  }
  // Lucky Incense: +1 potential (capped at 5)
  if (isBoostActive('incense') && result < 5) result++;
  return result;
}

function rollShiny() {
  // Shiny Aura: x5 rate (1/40 instead of 1/200)
  const rate = isBoostActive('aura') ? 0.025 : 0.005;
  return Math.random() < rate;
}

function rollMoves(speciesEN) {
  const sp = SPECIES_BY_EN[speciesEN];
  if (!sp) return ['Charge', 'Griffe'];
  const pool = [...sp.moves];
  // Shuffle and pick 2 unique (or as many as available)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const unique = [...new Set(pool)];
  return unique.slice(0, 2);
}

function calculateStats(pokemon) {
  const sp = SPECIES_BY_EN[pokemon.species_en];
  if (!sp) return { atk: 10, def: 10, spd: 10 };
  const nat = NATURES[pokemon.nature] || NATURES.hardy;
  const potMult = 1 + pokemon.potential * 0.1;
  const lvlMult = 1 + pokemon.level / 100;
  return {
    atk: Math.round(sp.baseAtk * potMult * nat.atk * lvlMult),
    def: Math.round(sp.baseDef * potMult * nat.def * lvlMult),
    spd: Math.round(sp.baseSpd * potMult * nat.spd * lvlMult),
  };
}

function makePokemon(speciesEN, zoneId, ballType = 'pokeball') {
  const sp = SPECIES_BY_EN[speciesEN];
  if (!sp) return null;
  const nature = rollNature();
  const potential = rollPotential(ballType);
  const shiny = rollShiny();
  const level = randInt(3, 12);
  const pokemon = {
    id: `pk-${uid()}`,
    species_fr: sp.fr,
    species_en: sp.en,
    dex: sp.dex,
    level,
    xp: 0,
    nature,
    potential,
    shiny,
    moves: rollMoves(speciesEN),
    capturedIn: zoneId,
    stats: {},
    assignedTo: null,
    cooldown: 0,
  };
  pokemon.stats = calculateStats(pokemon);
  return pokemon;
}

function getPokemonPower(pokemon) {
  const s = pokemon.stats;
  return s.atk + s.def + s.spd;
}

function levelUpPokemon(pokemon, xpGain) {
  pokemon.xp += xpGain;
  const xpNeeded = pokemon.level * 20;
  let leveled = false;
  while (pokemon.xp >= xpNeeded && pokemon.level < 100) {
    pokemon.xp -= xpNeeded;
    pokemon.level++;
    leveled = true;
  }
  if (leveled) pokemon.stats = calculateStats(pokemon);
  return leveled;
}

// ════════════════════════════════════════════════════════════════
//  5.  ZONE MODULE
// ════════════════════════════════════════════════════════════════

function initZone(zoneId) {
  if (!state.zones[zoneId]) {
    state.zones[zoneId] = {
      unlocked: false,
      combatsWon: 0,
      assignedAgents: [],
      invested: false, // zone investment (unlock elite + events)
      investPower: 0,  // total pokemon power committed
    };
  }
  // Migration: add fields if missing
  if (state.zones[zoneId].invested === undefined) state.zones[zoneId].invested = false;
  if (state.zones[zoneId].investPower === undefined) state.zones[zoneId].investPower = 0;
  return state.zones[zoneId];
}

function isZoneUnlocked(zoneId) {
  const zone = ZONE_BY_ID[zoneId];
  return zone && state.gang.reputation >= zone.rep;
}

function getZoneMastery(zoneId) {
  const z = state.zones[zoneId];
  if (!z) return 0;
  if (z.combatsWon >= 50) return 3;
  if (z.combatsWon >= 10) return 2;
  return 1;
}

function getZoneAgentSlots(zoneId) {
  const m = getZoneMastery(zoneId);
  if (m >= 3) return 2;
  if (m >= 2) return 1;
  return 0;
}

// Open zone windows tracking
const openZones = new Set();
const zoneSpawnTimers = {};
const zoneSpawns = {}; // zoneId -> [{ type, data, el, timeout }]

function makeTrainerTeam(zone, trainerKey) {
  const trainer = TRAINER_TYPES[trainerKey];
  if (!trainer) return [];
  const teamSize = clamp(trainer.diff, 1, 3);
  const team = [];
  for (let i = 0; i < teamSize; i++) {
    const sp = pick(zone.pool);
    const level = randInt(5 + trainer.diff * 3, 10 + trainer.diff * 5);
    team.push({ species_en: sp, level, stats: calculateStats({ species_en: sp, level, nature: 'hardy', potential: 2 }) });
  }
  return team;
}

function spawnInZone(zoneId) {
  const zone = ZONE_BY_ID[zoneId];
  if (!zone) return null;
  const zState = initZone(zoneId);
  const isChestBoosted = isBoostActive('chestBoost');
  const r = Math.random();

  // 1. Treasure chest (5% base, 25% during chest event)
  const chestChance = isChestBoosted ? 0.25 : 0.05;
  if (r < chestChance) {
    return { type: 'chest' };
  }

  // 2. Special event (3-5% each, only in invested zones or high mastery)
  const canEvent = zState.invested || getZoneMastery(zoneId) >= 2;
  if (canEvent && r < chestChance + 0.08) {
    const eligible = SPECIAL_EVENTS.filter(ev =>
      state.gang.reputation >= ev.minRep &&
      !state.activeEvents[zoneId] // no stacking
    );
    if (eligible.length > 0) {
      const event = pick(eligible);
      return { type: 'event', event };
    }
  }

  // 3. Elite trainer (in invested zones, 5% chance, harder)
  if (zState.invested && zone.eliteTrainer && r < chestChance + 0.13) {
    const trainerKey = zone.eliteTrainer;
    const trainer = TRAINER_TYPES[trainerKey];
    if (trainer) {
      // Elite: boosted difficulty (diff+2), bigger team, better rewards
      const eliteDiff = trainer.diff + 2;
      const teamSize = clamp(eliteDiff, 2, 4);
      const team = [];
      for (let i = 0; i < teamSize; i++) {
        const sp = pick(zone.pool);
        const level = randInt(10 + eliteDiff * 4, 20 + eliteDiff * 6);
        team.push({ species_en: sp, level, stats: calculateStats({ species_en: sp, level, nature: 'hardy', potential: 3 }) });
      }
      const eliteTrainer = {
        ...trainer,
        fr: '⭐ ' + trainer.fr,
        en: '⭐ ' + trainer.en,
        diff: eliteDiff,
        reward: [trainer.reward[0] * 3, trainer.reward[1] * 3],
        rep: trainer.rep * 2,
      };
      return { type: 'trainer', trainerKey, trainer: eliteTrainer, team, elite: true };
    }
  }

  // 4. Normal trainer (20%)
  if (r < 0.30 && zone.trainers.length > 0) {
    const trainerKey = pick(zone.trainers);
    const trainer = TRAINER_TYPES[trainerKey];
    const team = makeTrainerTeam(zone, trainerKey);
    return { type: 'trainer', trainerKey, trainer, team };
  }

  // 5. Pokemon spawn — Rare Scope triples chance of rare+ species
  let speciesEN;
  if (isBoostActive('rarescope') && Math.random() < 0.5) {
    const rarePool = zone.pool.filter(en => {
      const sp = SPECIES_BY_EN[en];
      return sp && (sp.rarity === 'rare' || sp.rarity === 'very_rare' || sp.rarity === 'legendary');
    });
    speciesEN = rarePool.length > 0 ? pick(rarePool) : pick(zone.pool);
  } else {
    speciesEN = pick(zone.pool);
  }
  return { type: 'pokemon', species_en: speciesEN };
}

// ── Chest loot resolution ─────────────────────────────────────
function rollChestLoot(zoneId) {
  const totalWeight = CHEST_LOOT.reduce((s, l) => s + l.weight, 0);
  let roll = Math.random() * totalWeight;
  let loot = CHEST_LOOT[0];
  for (const l of CHEST_LOOT) {
    roll -= l.weight;
    if (roll <= 0) { loot = l; break; }
  }
  const zone = ZONE_BY_ID[zoneId];
  const name = state.lang === 'fr' ? loot.fr : loot.en;

  switch (loot.type) {
    case 'balls': {
      const qty = randInt(loot.qty[0], loot.qty[1]);
      state.inventory[loot.ballType] = (state.inventory[loot.ballType] || 0) + qty;
      return { msg: `📦 ${qty}x ${name}`, type: 'success' };
    }
    case 'money': {
      const amount = randInt(loot.qty[0], loot.qty[1]);
      state.gang.money += amount;
      state.stats.totalMoneyEarned += amount;
      return { msg: `📦 ${amount}₽`, type: 'gold' };
    }
    case 'rare_pokemon': {
      if (zone) {
        const rarePool = zone.pool.filter(en => {
          const sp = SPECIES_BY_EN[en];
          return sp && sp.rarity !== 'common';
        });
        const speciesEN = rarePool.length > 0 ? pick(rarePool) : pick(zone.pool);
        const pokemon = makePokemon(speciesEN, zoneId, 'ultraball');
        if (pokemon) {
          pokemon.potential = Math.max(pokemon.potential, 3); // guaranteed 3+ stars
          pokemon.stats = calculateStats(pokemon);
          state.pokemons.push(pokemon);
          state.stats.totalCaught++;
          const pName = speciesName(pokemon.species_en);
          const stars = '★'.repeat(pokemon.potential);
          if (!state.pokedex[pokemon.species_en]) {
            state.pokedex[pokemon.species_en] = { seen: true, caught: true, shiny: pokemon.shiny, count: 1 };
          } else {
            state.pokedex[pokemon.species_en].caught = true;
            state.pokedex[pokemon.species_en].count++;
          }
          return { msg: `📦 ${pName} ${stars}${pokemon.shiny ? ' ✨' : ''}!`, type: 'gold' };
        }
      }
      // Fallback
      state.gang.money += 1000;
      return { msg: `📦 1000₽`, type: 'gold' };
    }
    case 'item': {
      state.inventory[loot.itemId] = (state.inventory[loot.itemId] || 0) + loot.qty;
      return { msg: `📦 ${name}`, type: 'gold' };
    }
    case 'event': {
      // Trigger a random event
      const eligible = SPECIAL_EVENTS.filter(ev => state.gang.reputation >= ev.minRep);
      if (eligible.length > 0 && zone) {
        const event = pick(eligible);
        activateEvent(zoneId, event);
        return { msg: `📦 ${state.lang === 'fr' ? event.fr : event.en}`, type: 'gold' };
      }
      state.gang.money += 2000;
      return { msg: `📦 2000₽`, type: 'gold' };
    }
    default:
      state.gang.money += 500;
      return { msg: `📦 500₽`, type: 'success' };
  }
}

// ── Event activation/resolution ───────────────────────────────
function activateEvent(zoneId, event) {
  const reward = event.reward;
  state.stats.eventsCompleted++;

  if (reward.shinyBoost) {
    state.activeBoosts.aura = Math.max(state.activeBoosts.aura || 0, Date.now() + reward.shinyBoost);
    notify(`${event.icon} ${state.lang === 'fr' ? event.fr : event.en}`, 'gold');
  }
  if (reward.rareBoost) {
    state.activeBoosts.rarescope = Math.max(state.activeBoosts.rarescope || 0, Date.now() + reward.rareBoost);
    notify(`${event.icon} ${state.lang === 'fr' ? event.fr : event.en}`, 'gold');
  }
  if (reward.chestBoost) {
    if (!state.activeBoosts.chestBoost) state.activeBoosts.chestBoost = 0;
    state.activeBoosts.chestBoost = Math.max(state.activeBoosts.chestBoost, Date.now() + reward.chestBoost);
    notify(`${event.icon} ${state.lang === 'fr' ? event.fr : event.en}`, 'gold');
  }
  if (reward.money) {
    const amount = randInt(reward.money[0], reward.money[1]);
    state.gang.money += amount;
    state.stats.totalMoneyEarned += amount;
    if (reward.rep) state.gang.reputation += reward.rep;
    notify(`${event.icon} ${state.lang === 'fr' ? event.fr : event.en} +${amount}₽`, 'gold');
  }
  if (reward.xpBonus) {
    // Grant XP to all pokemon in zone agents
    for (const agent of state.agents) {
      if (agent.assignedZone === zoneId) {
        grantAgentXP(agent, reward.xpBonus);
        for (const pkId of agent.team) {
          const p = state.pokemons.find(pk => pk.id === pkId);
          if (p) levelUpPokemon(p, reward.xpBonus);
        }
      }
    }
  }

  // Track active event on zone
  state.activeEvents[zoneId] = { eventId: event.id, expiresAt: Date.now() + 60000 };
  saveState();
}

// ── Zone Investment ───────────────────────────────────────────
function investInZone(zoneId) {
  const zone = ZONE_BY_ID[zoneId];
  if (!zone) return false;
  const zState = initZone(zoneId);
  if (zState.invested) return false;
  const cost = zone.investCost || 0;
  if (state.gang.money < cost) {
    notify(state.lang === 'fr' ? 'Pas assez d\'argent !' : 'Not enough money!');
    try { SFX.error(); } catch {}
    return false;
  }
  // Need minimum team power in zone
  const minPower = zone.rep * 10;
  let zonePower = 0;
  for (const agent of state.agents) {
    if (agent.assignedZone === zoneId) {
      zonePower += getAgentCombatPower(agent);
    }
  }
  if (zonePower < minPower && minPower > 0) {
    notify(state.lang === 'fr'
      ? `Puissance insuffisante ! (${zonePower}/${minPower}) Assignez des agents avec des Pokémon.`
      : `Not enough power! (${zonePower}/${minPower}) Assign agents with Pokémon.`);
    try { SFX.error(); } catch {}
    return false;
  }
  state.gang.money -= cost;
  state.stats.totalMoneySpent += cost;
  zState.invested = true;
  zState.investPower = zonePower;
  notify(state.lang === 'fr'
    ? `🏴 Zone investie ! Événements & élites débloqués.`
    : `🏴 Zone invested! Events & elites unlocked.`, 'gold');
  saveState();
  return true;
}

// ════════════════════════════════════════════════════════════════
//  6.  CAPTURE MODULE
// ════════════════════════════════════════════════════════════════

function tryCapture(zoneId, speciesEN) {
  const ball = state.activeBall;
  if ((state.inventory[ball] || 0) <= 0) {
    notify(t('no_balls', { ball: BALLS[ball]?.fr || ball }));
    try { SFX.error(); } catch {}
    return null;
  }
  state.inventory[ball]--;
  const pokemon = makePokemon(speciesEN, zoneId, ball);
  if (!pokemon) return null;
  state.pokemons.push(pokemon);
  state.stats.totalCaught++;
  // Pokedex
  if (!state.pokedex[pokemon.species_en]) {
    state.pokedex[pokemon.species_en] = { seen: true, caught: true, shiny: pokemon.shiny, count: 1 };
  } else {
    state.pokedex[pokemon.species_en].caught = true;
    state.pokedex[pokemon.species_en].count++;
    if (pokemon.shiny) state.pokedex[pokemon.species_en].shiny = true;
  }
  if (pokemon.shiny) state.stats.shinyCaught++;
  const name = speciesName(pokemon.species_en);
  const stars = '★'.repeat(pokemon.potential) + '☆'.repeat(5 - pokemon.potential);
  const shinyTag = pokemon.shiny ? ' ✨SHINY✨' : '';
  if (pokemon.shiny) {
    notify(`${name} ${stars}${shinyTag}`, 'gold');
  } else {
    notify(`${name} ${stars}`, pokemon.potential >= 4 ? 'gold' : 'success');
  }
  addLog(t('catch_success', { name }) + ` [${stars}]`);
  // SFX
  try { SFX.capture(pokemon.potential, pokemon.shiny); } catch {}
  saveState();
  return pokemon;
}

// ════════════════════════════════════════════════════════════════
//  7.  COMBAT MODULE
// ════════════════════════════════════════════════════════════════

function getTeamPower(pokemonIds) {
  let power = 0;
  for (const id of pokemonIds) {
    const p = state.pokemons.find(pk => pk.id === id);
    if (p && p.cooldown <= 0) power += getPokemonPower(p);
  }
  return power;
}

function resolveCombat(playerTeamIds, trainerData) {
  const playerPower = getTeamPower(playerTeamIds);
  let enemyPower = 0;
  for (const t of trainerData.team) {
    enemyPower += (t.stats.atk + t.stats.def + t.stats.spd);
  }
  // Add some randomness (±20%)
  const pRoll = playerPower * (0.8 + Math.random() * 0.4);
  const eRoll = enemyPower * (0.8 + Math.random() * 0.4);
  const win = pRoll >= eRoll;
  const reward = win ? randInt(trainerData.trainer.reward[0], trainerData.trainer.reward[1]) : 0;
  const repGain = win ? trainerData.trainer.rep : -1;
  return { win, playerPower, enemyPower, reward, repGain };
}

function applyCombatResult(result, playerTeamIds, trainerData) {
  state.stats.totalFights++;
  if (result.win) {
    state.stats.totalFightsWon++;
    state.gang.money += result.reward;
    state.gang.reputation += result.repGain;
    state.stats.totalMoneyEarned += result.reward;
    if (trainerData.trainerKey === 'rocketgrunt' || trainerData.trainerKey === 'rocketgruntf' || trainerData.trainerKey === 'giovanni') {
      state.stats.rocketDefeated++;
    }
    // XP to team
    const xpEach = 10 + trainerData.trainer.diff * 5;
    for (const id of playerTeamIds) {
      const p = state.pokemons.find(pk => pk.id === id);
      if (p) levelUpPokemon(p, xpEach);
    }
  } else {
    state.gang.reputation = Math.max(0, state.gang.reputation + result.repGain);
    // Cooldown on team
    for (const id of playerTeamIds) {
      const p = state.pokemons.find(pk => pk.id === id);
      if (p) p.cooldown = 3;
    }
  }
  saveState();
}

// ════════════════════════════════════════════════════════════════
//  8.  AGENT MODULE
// ════════════════════════════════════════════════════════════════

function rollNewAgent() {
  const isFemale = Math.random() < 0.5;
  const name = pick(isFemale ? AGENT_NAMES_F : AGENT_NAMES_M);
  const sprite = pick(AGENT_SPRITES);
  const personality = [];
  const pool = [...AGENT_PERSONALITIES];
  for (let i = 0; i < 2; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    personality.push(pool.splice(idx, 1)[0]);
  }
  return {
    id: `ag-${uid()}`,
    name,
    sprite: trainerSprite(sprite),
    spriteKey: sprite,
    title: 'grunt',
    level: 1,
    xp: 0,
    combatsWon: 0,
    stats: {
      capture: randInt(3, 18),
      combat: randInt(3, 18),
      luck: randInt(1, 12),
    },
    personality,
    team: [],
    assignedZone: null,
  };
}

function recruitAgent(agentData) {
  state.agents.push(agentData);
  addLog(t('recruit_agent') + ': ' + agentData.name);
  saveState();
}

function assignAgentToZone(agentId, zoneId) {
  const agent = state.agents.find(a => a.id === agentId);
  if (!agent) return;
  // Remove from old zone
  if (agent.assignedZone) {
    const oldZ = state.zones[agent.assignedZone];
    if (oldZ) {
      oldZ.assignedAgents = oldZ.assignedAgents.filter(id => id !== agentId);
    }
  }
  agent.assignedZone = zoneId;
  if (zoneId) {
    const z = initZone(zoneId);
    if (!z.assignedAgents.includes(agentId)) {
      z.assignedAgents.push(agentId);
    }
  }
  saveState();
}

function grantAgentXP(agent, amount) {
  agent.xp += amount;
  const needed = agent.level * 30;
  while (agent.xp >= needed && agent.level < 100) {
    agent.xp -= needed;
    agent.level++;
  }
  checkPromotion(agent);
}

function checkPromotion(agent) {
  if (agent.title === 'grunt' &&
      agent.level >= TITLE_REQUIREMENTS.lieutenant.level &&
      agent.combatsWon >= TITLE_REQUIREMENTS.lieutenant.combatsWon) {
    agent.title = 'lieutenant';
    notify(t('agent_promo', { agent: agent.name, title: 'Lieutenant' }), 'gold');
    addLog(t('agent_promo', { agent: agent.name, title: 'Lieutenant' }));
  }
  if (agent.title === 'lieutenant' &&
      agent.level >= TITLE_REQUIREMENTS.captain.level &&
      agent.combatsWon >= TITLE_REQUIREMENTS.captain.combatsWon) {
    agent.title = 'captain';
    notify(t('agent_promo', { agent: agent.name, title: 'Captain' }), 'gold');
    addLog(t('agent_promo', { agent: agent.name, title: 'Captain' }));
  }
}

function getAgentCombatPower(agent) {
  const bonus = 1 + (TITLE_BONUSES[agent.title] || 0);
  let teamPower = 0;
  for (const pkId of agent.team) {
    const p = state.pokemons.find(pk => pk.id === pkId);
    if (p) teamPower += getPokemonPower(p);
  }
  return Math.round((agent.stats.combat * 10 + teamPower) * bonus);
}

// Agent automation tick
function agentTick() {
  for (const agent of state.agents) {
    if (!agent.assignedZone) continue;
    const zone = ZONE_BY_ID[agent.assignedZone];
    if (!zone) continue;
    // Auto-capture (chance per tick based on capture stat)
    const captureChance = agent.stats.capture / 200;
    if (Math.random() < captureChance) {
      const speciesEN = pick(zone.pool);
      const pokemon = makePokemon(speciesEN, agent.assignedZone, 'pokeball');
      if (pokemon) {
        // Luck affects potential — reroll if lucky
        if (agent.stats.luck > 8 && pokemon.potential < 3 && Math.random() < 0.3) {
          pokemon.potential = randInt(3, 5);
          pokemon.stats = calculateStats(pokemon);
        }
        state.pokemons.push(pokemon);
        state.stats.totalCaught++;
        if (!state.pokedex[pokemon.species_en]) {
          state.pokedex[pokemon.species_en] = { seen: true, caught: true, shiny: pokemon.shiny, count: 1 };
        } else {
          state.pokedex[pokemon.species_en].caught = true;
          state.pokedex[pokemon.species_en].count++;
        }
        if (pokemon.shiny) state.stats.shinyCaught++;
        notify(t('agent_catch', { agent: agent.name, pokemon: speciesName(pokemon.species_en) }), 'success');
      }
    }
    // Auto-combat (chance per tick)
    if (Math.random() < 0.05 && zone.trainers.length > 0) {
      const trainerKey = pick(zone.trainers);
      const trainer = TRAINER_TYPES[trainerKey];
      const agentPower = getAgentCombatPower(agent);
      const enemyPower = trainer.diff * 80 + randInt(0, 50);
      const win = agentPower * (0.8 + Math.random() * 0.4) >= enemyPower * (0.8 + Math.random() * 0.4);
      state.stats.totalFights++;
      if (win) {
        state.stats.totalFightsWon++;
        const reward = randInt(trainer.reward[0], trainer.reward[1]);
        state.gang.money += reward;
        state.gang.reputation += trainer.rep;
        state.stats.totalMoneyEarned += reward;
        agent.combatsWon++;
        const z = state.zones[agent.assignedZone];
        if (z) z.combatsWon++;
        grantAgentXP(agent, 5 + trainer.diff * 3);
        // XP to agent's pokemon
        for (const pkId of agent.team) {
          const p = state.pokemons.find(pk => pk.id === pkId);
          if (p) levelUpPokemon(p, 5 + trainer.diff * 2);
        }
        if (trainerKey === 'rocketgrunt' || trainerKey === 'rocketgruntf') state.stats.rocketDefeated++;
        notify(t('agent_win', { agent: agent.name }), 'success');
      } else {
        notify(t('agent_lose', { agent: agent.name }));
      }
    }
  }
  saveState();
}

// ════════════════════════════════════════════════════════════════
//  9.  MARKET MODULE
// ════════════════════════════════════════════════════════════════

function calculatePrice(pokemon) {
  const sp = SPECIES_BY_EN[pokemon.species_en];
  if (!sp) return 50;
  const base = BASE_PRICE[sp.rarity] || 100;
  const potMult = POTENTIAL_MULT[pokemon.potential - 1] || 1;
  const shinyMult = pokemon.shiny ? 10 : 1;
  const nat = NATURES[pokemon.nature];
  const natMult = nat ? (nat.atk + nat.def + nat.spd) / 3 : 1;
  return Math.round(base * potMult * shinyMult * natMult);
}

function sellPokemon(pokemonIds) {
  let total = 0;
  const toRemove = new Set(pokemonIds);
  // Unassign from agents
  for (const agent of state.agents) {
    agent.team = agent.team.filter(id => !toRemove.has(id));
  }
  for (const id of pokemonIds) {
    const idx = state.pokemons.findIndex(p => p.id === id);
    if (idx === -1) continue;
    total += calculatePrice(state.pokemons[idx]);
    state.pokemons.splice(idx, 1);
    state.stats.totalSold++;
  }
  state.gang.money += total;
  state.stats.totalMoneyEarned += total;
  notify(t('sold', { n: pokemonIds.length, price: total }), 'gold');
  addLog(t('sold', { n: pokemonIds.length, price: total }));
  saveState();
  return total;
}

function buyItem(itemDef) {
  if (state.gang.money < itemDef.cost) {
    notify(t('not_enough'));
    return false;
  }
  state.gang.money -= itemDef.cost;
  state.stats.totalMoneySpent += itemDef.cost;
  state.inventory[itemDef.id] = (state.inventory[itemDef.id] || 0) + itemDef.qty;
  // Auto-activate boost items
  if (['incense', 'rarescope', 'aura', 'lure', 'superlure'].includes(itemDef.id)) {
    activateBoost(itemDef.id);
  }
  const name = itemDef.fr || itemDef.id;
  notify(t('bought', { item: `${itemDef.qty}x ${name}` }), 'success');
  saveState();
  return true;
}

// ════════════════════════════════════════════════════════════════
// 10.  LLM MODULE
// ════════════════════════════════════════════════════════════════

async function detectLLM() {
  if (state.settings.llmProvider === 'none') {
    state.settings.llmEnabled = false;
    return;
  }
  if (state.settings.llmProvider === 'local') {
    try {
      const res = await fetch(`${state.settings.llmUrl}/api/tags`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        state.settings.llmEnabled = true;
        addLog(t('llm_connected'));
        return;
      }
    } catch { /* ignore */ }
  }
  if ((state.settings.llmProvider === 'openai' || state.settings.llmProvider === 'anthropic') && state.settings.llmApiKey) {
    state.settings.llmEnabled = true;
    addLog(t('llm_connected'));
    return;
  }
  state.settings.llmEnabled = false;
}

const FALLBACK_DIALOGUES = {
  fr: [
    'Prépare-toi à avoir des problèmes !',
    'Tu oses défier notre gang ?',
    'Tes Pokémon ne font pas le poids !',
    'La Team Rocket va t\'écraser !',
    'Tu n\'as aucune chance contre nous !',
    'Ton gang est une blague !',
    'Je vais te montrer la vraie puissance !',
  ],
  en: [
    'Prepare for trouble!',
    'You dare challenge our gang?',
    'Your Pokémon don\'t stand a chance!',
    'Team Rocket will crush you!',
    'You have no chance against us!',
    'Your gang is a joke!',
    'I\'ll show you real power!',
  ],
};

function getTrainerDialogue() {
  return pick(FALLBACK_DIALOGUES[state.lang] || FALLBACK_DIALOGUES.fr);
}

// ════════════════════════════════════════════════════════════════
// 11.  UI — NOTIFICATIONS
// ════════════════════════════════════════════════════════════════

function notify(msg, type = '') {
  const container = document.getElementById('notifications');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

// ════════════════════════════════════════════════════════════════
// 12.  UI — TABS & LAYOUT
// ════════════════════════════════════════════════════════════════

let activeTab = 'tabGang';

function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === tabId);
  });
  renderActiveTab();
}

function updateTopBar() {
  const gangEl = document.getElementById('gangNameDisplay');
  const moneyEl = document.getElementById('moneyDisplay');
  if (gangEl) gangEl.textContent = state.gang.name;
  if (moneyEl) moneyEl.innerHTML = `<span>₽</span> ${state.gang.money.toLocaleString()}`;
}

function renderAll() {
  updateTopBar();
  renderActiveTab();
}

function renderActiveTab() {
  switch (activeTab) {
    case 'tabGang':   renderGangTab(); break;
    case 'tabZones':  renderZonesTab(); break;
    case 'tabMarket': renderMarketTab(); break;
    case 'tabPC':     renderPCTab(); break;
    case 'tabPokedex':renderPokedexTab(); break;
  }
}

// ════════════════════════════════════════════════════════════════
// 13.  UI — GANG TAB
// ════════════════════════════════════════════════════════════════

function renderGangTab() {
  // Boss profile
  const prof = document.getElementById('bossProfile');
  if (prof) {
    const spriteDiv = prof.querySelector('.boss-sprite');
    if (spriteDiv && state.gang.bossSprite) {
      spriteDiv.innerHTML = `<img src="${trainerSprite(state.gang.bossSprite)}" style="width:100%;height:100%;object-fit:contain">`;
    }
    const nameEl = prof.querySelector('.boss-name');
    if (nameEl) nameEl.textContent = state.gang.bossName;
    const gangEl = prof.querySelector('.boss-gang');
    if (gangEl) gangEl.textContent = state.gang.name;
    const repFill = prof.querySelector('.rep-fill');
    if (repFill) {
      const pct = Math.min(100, state.gang.reputation);
      repFill.style.width = pct + '%';
    }
  }
  // Agent list
  const agentListEl = document.getElementById('agentList');
  if (agentListEl) {
    const RECRUIT_COST = 2000 + state.agents.length * 1500; // escalating cost
    let html = '';
    // Recruit button
    html += `<div class="stat-card" style="text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;border:2px dashed var(--border-light)" id="btnRecruitAgent">
      <div style="font-size:28px">➕</div>
      <div style="font-family:var(--font-pixel);font-size:9px;color:var(--text)">${state.lang === 'fr' ? 'Recruter' : 'Recruit'}</div>
      <div style="font-size:10px;color:var(--gold)">₽ ${RECRUIT_COST.toLocaleString()}</div>
    </div>`;
    // Existing agents
    const unlockedZones = ZONES.filter(z => isZoneUnlocked(z.id));
    html += state.agents.map(a => {
      const zoneName = a.assignedZone ? (ZONE_BY_ID[a.assignedZone]?.[state.lang === 'fr' ? 'fr' : 'en'] || a.assignedZone) : '—';
      const zoneOptions = unlockedZones.map(z =>
        `<option value="${z.id}" ${a.assignedZone === z.id ? 'selected' : ''}>${state.lang === 'fr' ? z.fr : z.en}</option>`
      ).join('');
      return `
        <div class="stat-card" style="text-align:left;display:flex;gap:10px;align-items:center" data-agent-id="${a.id}">
          <img src="${a.sprite}" style="width:48px;height:48px;image-rendering:pixelated" alt="${a.name}">
          <div style="flex:1;min-width:0">
            <div style="font-family:var(--font-pixel);font-size:10px;color:var(--text)">${a.name}</div>
            <div style="font-size:10px;color:var(--gold);text-transform:uppercase">${a.title} — Lv.${a.level}</div>
            <div style="font-size:10px;color:var(--text-dim)">⚔${a.stats.combat} 🎯${a.stats.capture} 🍀${a.stats.luck}</div>
            <div style="font-size:9px;margin-top:4px">
              <select class="agent-zone-select" data-agent-id="${a.id}" style="background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:4px;font-size:9px;padding:2px 4px;width:100%">
                <option value="">— ${state.lang === 'fr' ? 'Aucune zone' : 'No zone'} —</option>
                ${zoneOptions}
              </select>
            </div>
          </div>
        </div>`;
    }).join('');
    agentListEl.innerHTML = html;

    // Recruit button handler
    document.getElementById('btnRecruitAgent')?.addEventListener('click', () => {
      const cost = 2000 + (state.agents.length) * 1500;
      if (state.gang.money < cost) {
        notify(state.lang === 'fr' ? 'Pas assez d\'argent !' : 'Not enough money!');
        try { SFX.error(); } catch {}
        return;
      }
      state.gang.money -= cost;
      const agent = rollNewAgent();
      recruitAgent(agent);
      notify(`${state.lang === 'fr' ? 'Recruté' : 'Recruited'}: ${agent.name}!`, 'gold');
      updateTopBar();
      renderGangTab();
    });

    // Zone assignment dropdowns
    agentListEl.querySelectorAll('.agent-zone-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const agentId = e.target.dataset.agentId;
        const zoneId = e.target.value || null;
        assignAgentToZone(agentId, zoneId);
        if (activeTab === 'tabZones') renderZoneWindows();
      });
    });
  }
  // Gang stats
  const statsEl = document.getElementById('gangStats');
  if (statsEl) {
    const s = state.stats;
    statsEl.innerHTML = [
      [s.totalCaught, t('total_caught')],
      [s.totalSold, t('total_sold')],
      [s.totalFightsWon + '/' + s.totalFights, t('total_fights')],
      [s.totalMoneyEarned.toLocaleString(), t('total_money')],
      [s.shinyCaught, t('shiny_caught')],
      [state.gang.reputation, t('reputation')],
    ].map(([val, label]) => `
      <div class="stat-card">
        <div class="stat-value">${val}</div>
        <div class="stat-label">${label}</div>
      </div>
    `).join('');
  }
}

// ════════════════════════════════════════════════════════════════
// 14.  UI — ZONES TAB
// ════════════════════════════════════════════════════════════════

function renderZonesTab() {
  renderZoneSelector();
  renderZoneWindows();
}

function renderZoneSelector() {
  const el = document.getElementById('zoneSelector');
  if (!el) return;
  el.innerHTML = ZONES.map(z => {
    const unlocked = isZoneUnlocked(z.id);
    const isOpen = openZones.has(z.id);
    const name = state.lang === 'fr' ? z.fr : z.en;
    return `<button class="zone-btn ${isOpen ? 'active' : ''} ${!unlocked ? 'locked' : ''}"
      data-zone="${z.id}" ${!unlocked ? 'disabled' : ''}>
      ${unlocked ? name : `🔒 ${z.rep}`}
    </button>`;
  }).join('');
  // Click handlers
  el.querySelectorAll('.zone-btn:not(.locked)').forEach(btn => {
    btn.addEventListener('click', () => {
      const zid = btn.dataset.zone;
      if (openZones.has(zid)) {
        closeZoneWindow(zid);
      } else {
        openZoneWindow(zid);
      }
    });
  });
}

function openZoneWindow(zoneId) {
  openZones.add(zoneId);
  initZone(zoneId);
  zoneSpawns[zoneId] = [];
  // Boss auto-moves to first opened zone if not set
  if (!state.gang.bossZone || !openZones.has(state.gang.bossZone)) {
    state.gang.bossZone = zoneId;
  }
  // Start spawn timer
  const zone = ZONE_BY_ID[zoneId];
  if (zone) {
    const interval = Math.round(1000 / zone.spawnRate);
    zoneSpawnTimers[zoneId] = setInterval(() => tickZoneSpawn(zoneId), interval);
  }
  renderZonesTab();
}

function closeZoneWindow(zoneId) {
  openZones.delete(zoneId);
  if (zoneSpawnTimers[zoneId]) {
    clearInterval(zoneSpawnTimers[zoneId]);
    delete zoneSpawnTimers[zoneId];
  }
  // Clean up spawns
  if (zoneSpawns[zoneId]) {
    for (const s of zoneSpawns[zoneId]) {
      if (s.timeout) clearTimeout(s.timeout);
    }
    delete zoneSpawns[zoneId];
  }
  renderZonesTab();
}

function renderZoneWindows() {
  const container = document.getElementById('zoneWindows');
  if (!container) return;
  if (openZones.size === 0) {
    container.innerHTML = '<div style="color:var(--text-dim);padding:40px;text-align:center">Sélectionnez une zone pour commencer</div>';
    return;
  }
  container.innerHTML = '';
  for (const zoneId of openZones) {
    const zone = ZONE_BY_ID[zoneId];
    if (!zone) continue;
    const zState = state.zones[zoneId] || {};
    const mastery = getZoneMastery(zoneId);
    const name = state.lang === 'fr' ? zone.fr : zone.en;

    const win = document.createElement('div');
    win.className = 'zone-window';
    win.id = `zw-${zoneId}`;
    // Use Showdown background or fallback gradient
    const bgImg = ZONE_BGS[zoneId];
    if (bgImg) {
      win.style.backgroundImage = bgImg;
      win.style.backgroundSize = 'cover';
      win.style.backgroundPosition = 'center bottom';
    }
    // Active boosts
    const boosts = [];
    if (isBoostActive('incense'))   boosts.push('🔮');
    if (isBoostActive('rarescope')) boosts.push('🔭');
    if (isBoostActive('aura'))      boosts.push('✨');
    if (isBoostActive('chestBoost')) boosts.push('💎');

    // Active event on zone?
    const activeEvt = state.activeEvents[zoneId];
    const eventActive = activeEvt && activeEvt.expiresAt > Date.now();
    const eventDef = eventActive ? SPECIAL_EVENTS.find(e => e.id === activeEvt.eventId) : null;

    // Agents assigned to this zone
    const assignedAgents = state.agents.filter(a => a.assignedZone === zoneId);
    const invested = zState.invested;

    win.innerHTML = `
      ${boosts.length ? `<div class="zone-boosts">${boosts.map(b => `<span class="boost-badge">${b}</span>`).join('')}</div>` : ''}
      ${eventActive && eventDef ? `<div class="zone-event-banner">${eventDef.icon} ${state.lang === 'fr' ? eventDef.fr : eventDef.en}</div>` : ''}
      <div class="zone-timers" id="zt-${zoneId}"></div>
      ${assignedAgents.map((a, i) => `
        <div class="zone-agent" style="left:${8 + i * 44}px">
          <img src="${a.sprite}" alt="${a.name}">
          <span class="agent-label">${a.name}</span>
        </div>
      `).join('')}
      ${state.gang.bossSprite && state.gang.bossZone === zoneId ? `<div class="zone-boss"><img src="${trainerSprite(state.gang.bossSprite)}" alt="Boss"></div>` : ''}
      <div class="zone-info">
        <span class="zone-name">${invested ? '🏴 ' : ''}${name}</span>
        <span class="zone-level">${'★'.repeat(mastery)} ${zState.combatsWon || 0}W</span>
        ${!invested && zone.investCost > 0 ? `<button class="zone-invest-btn" data-zone="${zoneId}" title="${state.lang === 'fr' ? 'Investir' : 'Invest'}: ${zone.investCost}₽">🏴 ${zone.investCost}₽</button>` : ''}
      </div>
    `;
    container.appendChild(win);

    // Click zone to move boss there
    win.addEventListener('dblclick', (e) => {
      if (e.target.closest('.zone-spawn') || e.target.closest('.zone-invest-btn')) return;
      state.gang.bossZone = zoneId;
      saveState();
      renderZoneWindows();
    });

    // Invest button
    const investBtn = win.querySelector('.zone-invest-btn');
    if (investBtn) {
      investBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (investInZone(zoneId)) {
          updateTopBar();
          renderZoneWindows();
        }
      });
    }

    // Initial timer render
    updateZoneTimers(zoneId);

    // Render existing spawns
    if (zoneSpawns[zoneId]) {
      for (const spawn of zoneSpawns[zoneId]) {
        renderSpawnInWindow(zoneId, spawn);
      }
    }
  }
}

// ── Zone timers & probability display ─────────────────────────
const zoneNextSpawn = {}; // zoneId -> { countdown, lastSpawnType }
const zoneSpawnHistory = {}; // zoneId -> { pokemon:N, trainer:N, total:N }

function updateZoneTimers(zoneId) {
  const el = document.getElementById(`zt-${zoneId}`);
  if (!el) return;
  const zone = ZONE_BY_ID[zoneId];
  if (!zone) return;

  const history = zoneSpawnHistory[zoneId] || { pokemon: 0, trainer: 0, total: 0 };
  const lureActive = isBoostActive('lure') || isBoostActive('superlure');
  const lureMult = isBoostActive('superlure') ? 3 : (isBoostActive('lure') ? 2 : 1);
  const interval = Math.round(1000 / (zone.spawnRate * lureMult));
  const nextIn = zoneNextSpawn[zoneId]?.countdown || 0;

  // Rarity breakdown of the pool
  const poolStats = { common: 0, uncommon: 0, rare: 0, very_rare: 0, legendary: 0 };
  for (const en of zone.pool) {
    const sp = SPECIES_BY_EN[en];
    if (sp) poolStats[sp.rarity]++;
  }
  const total = zone.pool.length;
  const rareChance = ((poolStats.rare + poolStats.very_rare + poolStats.legendary) / total * 100).toFixed(0);
  const rareScopeOn = isBoostActive('rarescope');

  // Last spawn type
  const last = zoneNextSpawn[zoneId]?.lastSpawnType || '';
  const isEventNow = last === 'event' || last === 'trainer';
  const isChestNow = last === 'chest';
  const zState = initZone(zoneId);
  const invested = zState.invested;
  const chestChance = isBoostActive('chestBoost') ? 25 : 5;

  let html = `
    <div class="timer-row">
      <span class="timer-label">Spawn</span>
      <span class="timer-val">${(interval / 1000).toFixed(1)}s${lureActive ? ' ⚡' : ''}</span>
    </div>
    <div class="timer-row">
      <span class="timer-label">🎯 Rare</span>
      <span class="timer-chance">${rareScopeOn ? '~' + Math.min(99, rareChance * 3) + '%' : rareChance + '%'}</span>
    </div>
    <div class="timer-row ${isEventNow ? 'event-now' : ''}">
      <span class="timer-label">⚔ Combat</span>
      <span class="timer-chance">${invested ? '30%+⭐' : '30%'}</span>
    </div>
    <div class="timer-row ${isChestNow ? 'event-now' : ''}">
      <span class="timer-label">📦 Coffre</span>
      <span class="timer-chance">${chestChance}%</span>
    </div>`;

  // Active event on zone
  const activeEvt = state.activeEvents[zoneId];
  if (activeEvt && activeEvt.expiresAt > Date.now()) {
    const evtDef = SPECIAL_EVENTS.find(e => e.id === activeEvt.eventId);
    const rem = Math.ceil((activeEvt.expiresAt - Date.now()) / 1000);
    if (evtDef) {
      html += `<div class="timer-row event-now"><span class="timer-label">${evtDef.icon}</span><span class="timer-val">${rem}s</span></div>`;
    }
  }

  // Active boosts remaining
  for (const bid of ['incense', 'rarescope', 'aura', 'chestBoost']) {
    if (isBoostActive(bid)) {
      const rem = boostRemaining(bid);
      const icons = { incense: '🔮', rarescope: '🔭', aura: '✨', chestBoost: '💎' };
      html += `<div class="timer-row"><span class="timer-label">${icons[bid]}</span><span class="timer-val">${rem}s</span></div>`;
    }
  }

  // Player odds this session
  if (history.total > 0) {
    html += `<div class="timer-row"><span class="timer-label">Session</span><span class="timer-chance">${history.pokemon}🟢 ${history.trainer}⚔ ${history.chest || 0}📦</span></div>`;
  }

  el.innerHTML = html;
}

function tickZoneSpawn(zoneId) {
  if (!openZones.has(zoneId)) return;
  const spawns = zoneSpawns[zoneId];
  if (!spawns) return;
  // Max 5 spawns at once
  if (spawns.length >= 5) { updateZoneTimers(zoneId); return; }

  const entry = spawnInZone(zoneId);
  if (!entry) return;

  // Track history
  if (!zoneSpawnHistory[zoneId]) zoneSpawnHistory[zoneId] = { pokemon: 0, trainer: 0, chest: 0, event: 0, total: 0 };
  zoneSpawnHistory[zoneId].total++;
  if (entry.type === 'pokemon') zoneSpawnHistory[zoneId].pokemon++;
  else if (entry.type === 'trainer') zoneSpawnHistory[zoneId].trainer++;
  else if (entry.type === 'chest') zoneSpawnHistory[zoneId].chest++;
  else if (entry.type === 'event') zoneSpawnHistory[zoneId].event++;

  // Track for timer
  if (!zoneNextSpawn[zoneId]) zoneNextSpawn[zoneId] = {};
  zoneNextSpawn[zoneId].lastSpawnType = entry.type;

  const spawnObj = { ...entry, id: uid() };
  spawns.push(spawnObj);

  // TTL: 10-15 seconds
  const ttl = randInt(10000, 15000);
  spawnObj.timeout = setTimeout(() => {
    removeSpawn(zoneId, spawnObj.id);
  }, ttl);

  renderSpawnInWindow(zoneId, spawnObj);
  updateZoneTimers(zoneId);
}

function renderSpawnInWindow(zoneId, spawnObj) {
  const win = document.getElementById(`zw-${zoneId}`);
  if (!win) return;

  const el = document.createElement('div');
  el.className = 'zone-spawn pop';
  el.dataset.spawnId = spawnObj.id;

  // Random position
  const x = randInt(10, 250);
  const y = randInt(10, 150);
  el.style.left = x + 'px';
  el.style.top = y + 'px';

  if (spawnObj.type === 'pokemon') {
    const sp = SPECIES_BY_EN[spawnObj.species_en];
    el.innerHTML = `<img src="${pokeSprite(spawnObj.species_en)}" style="width:56px;height:56px" alt="${sp?.fr || spawnObj.species_en}">`;
    el.title = sp ? (state.lang === 'fr' ? sp.fr : sp.en) : spawnObj.species_en;
    el.addEventListener('click', () => {
      if (el.classList.contains('catching')) return;
      el.classList.add('catching');
      animateCapture(zoneId, spawnObj, el);
    });
  } else if (spawnObj.type === 'trainer') {
    const eliteTag = spawnObj.elite ? ' style="filter:drop-shadow(0 0 6px gold)"' : '';
    el.innerHTML = `<img src="${trainerSprite(spawnObj.trainer.sprite)}"${eliteTag} style="width:56px;height:56px${spawnObj.elite ? ';filter:drop-shadow(0 0 6px gold)' : ''}" alt="${spawnObj.trainer.fr}">`;
    el.title = (state.lang === 'fr' ? spawnObj.trainer.fr : spawnObj.trainer.en) + (spawnObj.elite ? ' ⭐' : '');
    if (spawnObj.elite) el.style.animation = 'glow 1.5s ease-in-out infinite, float 3s ease-in-out infinite';
    el.addEventListener('click', () => {
      openCombatPopup(zoneId, spawnObj);
    });
  } else if (spawnObj.type === 'chest') {
    el.innerHTML = `<div style="font-size:36px;line-height:1;filter:drop-shadow(0 0 4px rgba(255,204,90,.6))">📦</div>`;
    el.title = state.lang === 'fr' ? 'Coffre au trésor !' : 'Treasure Chest!';
    el.style.animation = 'float 2s ease-in-out infinite';
    el.addEventListener('click', () => {
      if (el.classList.contains('catching')) return;
      el.classList.add('catching');
      // Opening animation
      el.innerHTML = `<div style="font-size:36px;line-height:1;animation:pop .3s ease-out">🎁</div>`;
      state.stats.chestsOpened = (state.stats.chestsOpened || 0) + 1;
      setTimeout(() => {
        const loot = rollChestLoot(zoneId);
        notify(loot.msg, loot.type);
        try { SFX.capture(3, false); } catch {} // Loot jingle
        removeSpawn(zoneId, spawnObj.id);
        updateTopBar();
        updateZoneTimers(zoneId);
        saveState();
      }, 400);
    });
  } else if (spawnObj.type === 'event') {
    const evt = spawnObj.event;
    el.innerHTML = `<div style="font-size:32px;line-height:1;filter:drop-shadow(0 0 8px rgba(255,204,90,.8))">${evt.icon}</div>`;
    el.title = state.lang === 'fr' ? evt.fr : evt.en;
    el.style.animation = 'glow 1s ease-in-out infinite, float 2s ease-in-out infinite';
    el.addEventListener('click', () => {
      if (el.classList.contains('catching')) return;
      el.classList.add('catching');
      if (evt.trainerKey) {
        // Event with combat
        const trainer = TRAINER_TYPES[evt.trainerKey];
        if (trainer) {
          const zone = ZONE_BY_ID[zoneId];
          const team = makeTrainerTeam(zone, evt.trainerKey);
          // Boosted difficulty
          team.forEach(t => {
            t.level += 10;
            t.stats = calculateStats({ species_en: t.species_en, level: t.level, nature: 'hardy', potential: 4 });
          });
          const combatSpawn = {
            ...spawnObj,
            type: 'trainer',
            trainerKey: evt.trainerKey,
            trainer: { ...trainer, fr: evt.icon + ' ' + trainer.fr, en: evt.icon + ' ' + trainer.en, diff: trainer.diff + 2, reward: [trainer.reward[0] * 4, trainer.reward[1] * 4], rep: trainer.rep * 3 },
            team,
            elite: true,
          };
          openCombatPopup(zoneId, combatSpawn);
        }
      } else {
        // Non-combat event: activate immediately
        activateEvent(zoneId, evt);
        removeSpawn(zoneId, spawnObj.id);
        updateZoneTimers(zoneId);
      }
    });
  }

  win.appendChild(el);
}

function removeSpawn(zoneId, spawnId) {
  const spawns = zoneSpawns[zoneId];
  if (!spawns) return;
  const idx = spawns.findIndex(s => s.id === spawnId);
  if (idx !== -1) {
    if (spawns[idx].timeout) clearTimeout(spawns[idx].timeout);
    spawns.splice(idx, 1);
  }
  // Remove DOM
  const el = document.querySelector(`[data-spawn-id="${spawnId}"]`);
  if (el) {
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 300);
  }
}

// ── Ball throw + capture burst animation ──────────────────────

function animateCapture(zoneId, spawnObj, spawnEl) {
  const win = document.getElementById(`zw-${zoneId}`);
  if (!win) return;

  // Find thrower position (boss or agent sprite in zone)
  const bossEl = win.querySelector('.zone-boss');
  const agentEl = win.querySelector('.zone-agent');
  const thrower = bossEl || agentEl;
  let startX, startY;
  if (thrower) {
    const r = thrower.getBoundingClientRect();
    const wr = win.getBoundingClientRect();
    startX = r.left - wr.left + r.width / 2;
    startY = r.top - wr.top;
  } else {
    // Default: bottom-right corner
    startX = 280;
    startY = 180;
  }
  const targetX = parseInt(spawnEl.style.left) + 28;
  const targetY = parseInt(spawnEl.style.top) + 28;

  // Create ball projectile
  const ball = document.createElement('div');
  ball.className = 'ball-projectile';
  ball.innerHTML = `<img src="${BALL_SPRITES[state.activeBall] || BALL_SPRITES.pokeball}">`;
  ball.style.left = startX + 'px';
  ball.style.top = startY + 'px';
  win.appendChild(ball);

  // Animate ball flight with CSS transition + SFX
  try { SFX.ballThrow(); } catch {}
  requestAnimationFrame(() => {
    ball.style.transition = 'left .35s ease-out, top .35s ease-in';
    ball.style.left = targetX + 'px';
    ball.style.top = targetY + 'px';
  });

  setTimeout(() => {
    ball.remove();
    // Try capture
    const caught = tryCapture(zoneId, spawnObj.species_en);
    if (caught) {
      showCaptureBurst(win, targetX, targetY, caught.potential, caught.shiny);
      removeSpawn(zoneId, spawnObj.id);
      updateTopBar();
      if (activeTab === 'tabPC') renderPCTab();
      // Update zone timers display
      updateZoneTimers(zoneId);
    } else {
      // No balls — just un-freeze the spawn
      spawnEl.classList.remove('catching');
    }
  }, 380);
}

function showCaptureBurst(container, x, y, potential, shiny) {
  const burst = document.createElement('div');
  burst.className = 'capture-burst';
  if (shiny) burst.classList.add('shiny');
  else if (potential >= 5) burst.classList.add('stars-5');
  else if (potential >= 4) burst.classList.add('stars-4');
  else if (potential >= 3) burst.classList.add('stars-3');
  burst.style.left = x + 'px';
  burst.style.top = y + 'px';

  // Ring
  const ring = document.createElement('div');
  ring.className = 'burst-ring';
  burst.appendChild(ring);

  // Particles
  const numParticles = shiny ? 16 : (potential >= 4 ? 12 : 8);
  for (let i = 0; i < numParticles; i++) {
    const p = document.createElement('div');
    p.className = 'burst-particle';
    const angle = (i / numParticles) * Math.PI * 2;
    const dist = 30 + Math.random() * 30;
    p.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--by', Math.sin(angle) * dist + 'px');
    burst.appendChild(p);
  }

  container.appendChild(burst);
  setTimeout(() => burst.remove(), 800);
}

// ════════════════════════════════════════════════════════════════
// 15.  UI — COMBAT POPUP
// ════════════════════════════════════════════════════════════════

let currentCombat = null;

function openCombatPopup(zoneId, spawnObj) {
  // Pick player team (up to 3 best non-cooldown pokemon)
  const available = state.pokemons
    .filter(p => p.cooldown <= 0)
    .sort((a, b) => getPokemonPower(b) - getPokemonPower(a))
    .slice(0, 3);

  if (available.length === 0) {
    notify(state.lang === 'fr' ? 'Aucun Pokémon disponible !' : 'No Pokémon available!');
    return;
  }

  currentCombat = { zoneId, spawnObj, playerTeam: available };

  const popup = document.getElementById('combatPopup');
  if (!popup) return;

  const dialogue = getTrainerDialogue();
  const trainerName = state.lang === 'fr' ? spawnObj.trainer.fr : spawnObj.trainer.en;

  // Show ally (first pokemon) vs enemy (first enemy)
  const ally = available[0];
  const enemy = spawnObj.team[0];
  const enemySp = SPECIES_BY_EN[enemy.species_en];

  const allyImg = popup.querySelector('#combatAlly img');
  const enemyImg = popup.querySelector('#combatEnemy img');
  if (allyImg) allyImg.src = pokeSpriteBack(ally.species_en, ally.shiny);
  if (enemyImg && enemySp) enemyImg.src = pokeSprite(enemy.species_en);

  // Reset HP bars
  popup.querySelectorAll('.hp-fill').forEach(f => f.style.width = '100%');

  const titleEl = popup.querySelector('.combat-title');
  if (titleEl) titleEl.textContent = `⚔ ${trainerName}`;

  const logEl = document.getElementById('combatLog');
  if (logEl) logEl.innerHTML = `<div>"${dialogue}"</div>`;

  const actionsEl = document.getElementById('combatActions');
  if (actionsEl) {
    actionsEl.innerHTML = `<button id="btnFight">${state.lang === 'fr' ? '⚔ Combattre' : '⚔ Fight'}</button>
      <button id="btnFlee">${state.lang === 'fr' ? '🏃 Fuir' : '🏃 Flee'}</button>`;
    document.getElementById('btnFight')?.addEventListener('click', executeCombat);
    document.getElementById('btnFlee')?.addEventListener('click', closeCombatPopup);
  }

  popup.classList.add('active');
}

function executeCombat() {
  if (!currentCombat) return;
  const { zoneId, spawnObj, playerTeam } = currentCombat;
  const teamIds = playerTeam.map(p => p.id);
  const result = resolveCombat(teamIds, spawnObj);
  applyCombatResult(result, teamIds, spawnObj);

  // Update zone combats
  if (result.win) {
    const z = state.zones[zoneId];
    if (z) z.combatsWon = (z.combatsWon || 0) + 1;
  }

  // Animate
  const popup = document.getElementById('combatPopup');
  const logEl = document.getElementById('combatLog');
  const actionsEl = document.getElementById('combatActions');

  if (result.win) {
    // Animate enemy defeat
    const enemyCombatant = popup?.querySelector('#combatEnemy');
    if (enemyCombatant) enemyCombatant.classList.add('shake');
    const enemyHp = popup?.querySelector('#combatEnemy .hp-fill');
    if (enemyHp) { enemyHp.style.width = '0%'; enemyHp.classList.add('critical'); }

    if (logEl) logEl.innerHTML += `<div style="color:var(--green)">${t('combat_win', { money: result.reward, rep: result.repGain })}</div>`;
  } else {
    const allyCombatant = popup?.querySelector('#combatAlly');
    if (allyCombatant) allyCombatant.classList.add('shake');
    const allyHp = popup?.querySelector('#combatAlly .hp-fill');
    if (allyHp) { allyHp.style.width = '0%'; allyHp.classList.add('critical'); }

    if (logEl) logEl.innerHTML += `<div style="color:var(--red)">${t('combat_lose')}</div>`;
  }

  if (actionsEl) {
    actionsEl.innerHTML = `<button id="btnCloseCombat">OK</button>`;
    document.getElementById('btnCloseCombat')?.addEventListener('click', () => {
      closeCombatPopup();
      removeSpawn(zoneId, spawnObj.id);
      updateTopBar();
      if (activeTab === 'tabGang') renderGangTab();
    });
  }
}

function closeCombatPopup() {
  const popup = document.getElementById('combatPopup');
  if (popup) popup.classList.remove('active');
  // Reset shake
  popup?.querySelectorAll('.shake').forEach(el => el.classList.remove('shake'));
  currentCombat = null;
}

// ════════════════════════════════════════════════════════════════
// 16.  UI — MARKET TAB
// ════════════════════════════════════════════════════════════════

const selectedForSale = new Set();

function renderMarketTab() {
  renderSellPanel();
  renderShopPanel();
}

let sellSort = 'price'; // price, name, level, potential, recent

function renderSellPanel() {
  const panel = document.querySelector('#sellPanel .sell-list');
  if (!panel) return;

  if (state.pokemons.length === 0) {
    panel.innerHTML = '<div style="color:var(--text-dim);padding:12px">Aucun Pokémon à vendre</div>';
    return;
  }

  const sortFns = {
    price:     (a, b) => calculatePrice(b) - calculatePrice(a),
    name:      (a, b) => speciesName(a.species_en).localeCompare(speciesName(b.species_en)),
    level:     (a, b) => b.level - a.level,
    potential: (a, b) => (b.potential + (b.shiny ? 10 : 0)) - (a.potential + (a.shiny ? 10 : 0)),
    recent:    (a, b) => state.pokemons.indexOf(b) - state.pokemons.indexOf(a),
  };
  const sorted = [...state.pokemons].sort(sortFns[sellSort] || sortFns.price);

  // Sort bar
  const sortLabels = state.lang === 'fr'
    ? { price: 'Prix', name: 'Nom', level: 'Niveau', potential: 'Potentiel', recent: 'Récent' }
    : { price: 'Price', name: 'Name', level: 'Level', potential: 'Potential', recent: 'Recent' };
  let sortBar = '<div style="display:flex;gap:4px;padding:4px 4px 8px;border-bottom:1px solid var(--border);flex-wrap:wrap">';
  for (const [key, label] of Object.entries(sortLabels)) {
    sortBar += `<button class="sell-sort-btn" data-sort="${key}" style="font-size:9px;padding:3px 8px;border-radius:4px;border:1px solid ${sellSort === key ? 'var(--red)' : 'var(--border)'};background:${sellSort === key ? 'var(--red-dark)' : 'var(--bg)'};color:var(--text);cursor:pointer">${label}</button>`;
  }
  sortBar += `<button class="sell-sort-btn" data-sort="select-all" style="font-size:9px;padding:3px 8px;border-radius:4px;border:1px solid var(--border);background:var(--bg);color:var(--gold);cursor:pointer;margin-left:auto">${state.lang === 'fr' ? '☑ Tout' : '☑ All'}</button>`;
  sortBar += '</div>';
  panel.innerHTML = sortBar + sorted.map(p => {
    const price = calculatePrice(p);
    const sel = selectedForSale.has(p.id);
    return `<div style="display:flex;align-items:center;gap:8px;padding:6px 4px;border-bottom:1px solid var(--border);cursor:pointer;background:${sel ? 'var(--bg-hover)' : 'transparent'}"
      data-sell-id="${p.id}">
      <img src="${pokeSprite(p.species_en, p.shiny)}" style="width:40px;height:40px">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px">${speciesName(p.species_en)} ${'★'.repeat(p.potential)}${p.shiny ? ' ✨' : ''}</div>
        <div style="font-size:10px;color:var(--text-dim)">Lv.${p.level}</div>
      </div>
      <div style="font-family:var(--font-pixel);font-size:10px;color:var(--gold)">${price}₽</div>
    </div>`;
  }).join('');

  // Total + sell button
  let total = 0;
  for (const id of selectedForSale) {
    const p = state.pokemons.find(pk => pk.id === id);
    if (p) total += calculatePrice(p);
  }
  panel.innerHTML += `
    <div style="padding:10px;text-align:center;border-top:2px solid var(--border);margin-top:8px">
      <div style="font-family:var(--font-pixel);font-size:12px;color:var(--gold);margin-bottom:8px">
        ${selectedForSale.size > 0 ? `${selectedForSale.size} sélectionné(s) — ${total}₽` : 'Cliquez pour sélectionner'}
      </div>
      ${selectedForSale.size > 0 ? `<button style="font-family:var(--font-pixel);font-size:10px;padding:8px 20px;background:var(--red-dark);border:1px solid var(--red);border-radius:var(--radius);color:var(--text);cursor:pointer" id="btnSellSelected">${t('sell')}</button>` : ''}
    </div>`;

  // Click handlers
  panel.querySelectorAll('[data-sell-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.sellId;
      if (selectedForSale.has(id)) selectedForSale.delete(id);
      else selectedForSale.add(id);
      renderSellPanel();
    });
  });
  document.getElementById('btnSellSelected')?.addEventListener('click', () => {
    if (selectedForSale.size > 0) {
      sellPokemon([...selectedForSale]);
      selectedForSale.clear();
      updateTopBar();
      renderMarketTab();
    }
  });

  // Sort button handlers
  panel.querySelectorAll('.sell-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = btn.dataset.sort;
      if (s === 'select-all') {
        // Toggle select all
        if (selectedForSale.size === state.pokemons.length) {
          selectedForSale.clear();
        } else {
          state.pokemons.forEach(p => selectedForSale.add(p.id));
        }
      } else {
        sellSort = s;
      }
      renderSellPanel();
    });
  });
}

function renderShopPanel() {
  const panel = document.querySelector('#shopPanel .shop-list');
  if (!panel) return;

  panel.innerHTML = SHOP_ITEMS.map(item => {
    const ballInfo = BALLS[item.id];
    const name = ballInfo ? (state.lang === 'fr' ? ballInfo.fr : ballInfo.en) : (state.lang === 'fr' ? (item.fr || item.id) : (item.en || item.id));
    const desc = item.desc_fr ? (state.lang === 'fr' ? item.desc_fr : item.desc_en) : `x${item.qty}`;
    const owned = state.inventory[item.id] || 0;
    return `<div style="display:flex;align-items:center;gap:8px;padding:8px 4px;border-bottom:1px solid var(--border)">
      <span style="font-size:20px">${item.icon}</span>
      <div style="flex:1">
        <div style="font-size:12px">${name} <span style="color:var(--text-dim)">(${desc})</span></div>
        <div style="font-size:10px;color:var(--text-dim)">En stock: ${owned}</div>
      </div>
      <button style="font-family:var(--font-pixel);font-size:9px;padding:6px 12px;background:var(--bg);border:1px solid var(--gold-dim);border-radius:var(--radius-sm);color:var(--gold);cursor:pointer"
        data-shop-idx="${SHOP_ITEMS.indexOf(item)}">${item.cost}₽</button>
    </div>`;
  }).join('');

  // Active ball selector
  panel.innerHTML += `
    <div style="padding:10px;border-top:2px solid var(--border);margin-top:8px">
      <div style="font-family:var(--font-pixel);font-size:9px;color:var(--gold);margin-bottom:8px">Ball active</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${Object.entries(BALLS).map(([key, ball]) => `
          <button style="font-size:10px;padding:4px 10px;border-radius:var(--radius-sm);cursor:pointer;
            background:${state.activeBall === key ? 'var(--red-dark)' : 'var(--bg)'};
            border:1px solid ${state.activeBall === key ? 'var(--red)' : 'var(--border)'};
            color:var(--text)" data-ball="${key}">
            ${state.lang === 'fr' ? ball.fr : ball.en} (${state.inventory[key] || 0})
          </button>
        `).join('')}
      </div>
    </div>`;

  // Click handlers
  panel.querySelectorAll('[data-shop-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = SHOP_ITEMS[parseInt(btn.dataset.shopIdx)];
      if (item) {
        buyItem(item);
        updateTopBar();
        renderShopPanel();
      }
    });
  });
  panel.querySelectorAll('[data-ball]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeBall = btn.dataset.ball;
      saveState();
      renderShopPanel();
    });
  });
}

// ════════════════════════════════════════════════════════════════
// 17.  UI — PC TAB
// ════════════════════════════════════════════════════════════════

let pcSelectedId = null;

function renderPCTab() {
  renderPokemonGrid();
  renderPokemonDetail();
}

function renderPokemonGrid() {
  const grid = document.getElementById('pokemonGrid');
  if (!grid) return;

  let list = [...state.pokemons];

  // Search filter
  const search = document.getElementById('pcSearch')?.value?.toLowerCase() || '';
  if (search) {
    list = list.filter(p => {
      const name = speciesName(p.species_en).toLowerCase();
      return name.includes(search) || p.species_en.includes(search);
    });
  }

  // Type filter
  const filter = document.getElementById('pcFilter')?.value || 'all';
  if (filter === 'shiny') list = list.filter(p => p.shiny);

  // Sort
  const sort = document.getElementById('pcSort')?.value || 'recent';
  switch (sort) {
    case 'id':   list.sort((a, b) => a.dex - b.dex); break;
    case 'name': list.sort((a, b) => speciesName(a.species_en).localeCompare(speciesName(b.species_en))); break;
    case 'cp':   list.sort((a, b) => getPokemonPower(b) - getPokemonPower(a)); break;
    case 'recent': break; // Already in insertion order
  }

  grid.innerHTML = list.map(p => `
    <div class="pc-pokemon ${p.shiny ? 'shiny' : ''} ${pcSelectedId === p.id ? 'selected' : ''}" data-pk-id="${p.id}">
      <img src="${pokeSprite(p.species_en, p.shiny)}" alt="${speciesName(p.species_en)}">
    </div>
  `).join('');

  grid.querySelectorAll('.pc-pokemon').forEach(el => {
    el.addEventListener('click', () => {
      pcSelectedId = el.dataset.pkId;
      renderPCTab();
    });
  });
}

function renderPokemonDetail() {
  const panel = document.getElementById('pokemonDetail');
  if (!panel) return;

  if (!pcSelectedId) {
    panel.classList.add('hidden');
    return;
  }

  const p = state.pokemons.find(pk => pk.id === pcSelectedId);
  if (!p) {
    panel.classList.add('hidden');
    pcSelectedId = null;
    return;
  }

  panel.classList.remove('hidden');
  const sp = SPECIES_BY_EN[p.species_en];
  const nat = NATURES[p.nature];
  const natName = nat ? (state.lang === 'fr' ? nat.fr : nat.en) : p.nature;
  const zoneDef = ZONE_BY_ID[p.capturedIn];
  const zoneName = zoneDef ? (state.lang === 'fr' ? zoneDef.fr : zoneDef.en) : p.capturedIn;
  const power = getPokemonPower(p);
  const price = calculatePrice(p);

  panel.innerHTML = `
    <div style="text-align:center;margin-bottom:12px">
      <img src="${pokeSprite(p.species_en, p.shiny)}" style="width:96px;height:96px;${p.shiny ? 'filter:drop-shadow(0 0 6px var(--gold))' : ''}">
      <div style="font-family:var(--font-pixel);font-size:12px;margin-top:4px">${speciesName(p.species_en)}${p.shiny ? ' ✨' : ''}</div>
      <div style="font-size:10px;color:var(--text-dim)">#${String(p.dex).padStart(3, '0')} — ${sp?.types.join('/') || '?'}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px;margin-bottom:12px">
      <div>${t('level')}: <b>${p.level}</b></div>
      <div>${t('nature')}: <b>${natName}</b></div>
      <div>${t('potential')}: <b style="color:var(--gold)">${'★'.repeat(p.potential)}</b></div>
      <div>PC: <b>${power}</b></div>
    </div>
    <div style="font-size:11px;margin-bottom:8px">
      <div style="color:var(--text-dim);margin-bottom:4px">${t('moves')}:</div>
      ${p.moves.map(m => `<div style="padding:2px 0">▸ ${m}</div>`).join('')}
    </div>
    <div style="font-size:11px;margin-bottom:8px">
      <div>ATK: <b>${p.stats.atk}</b> — DEF: <b>${p.stats.def}</b> — SPD: <b>${p.stats.spd}</b></div>
    </div>
    <div style="font-size:10px;color:var(--text-dim);margin-bottom:12px">${t('zone_caught')}: ${zoneName}</div>
    <div style="font-size:10px;color:var(--gold);margin-bottom:12px">Valeur: ${price}₽</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button style="flex:1;font-size:10px;padding:6px;background:var(--red-dark);border:1px solid var(--red);border-radius:var(--radius-sm);color:var(--text);cursor:pointer" id="btnSellOne">${t('sell')} (${price}₽)</button>
      <button style="flex:1;font-size:10px;padding:6px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-dim);cursor:pointer" id="btnRelease">${t('release')}</button>
    </div>
  `;

  document.getElementById('btnSellOne')?.addEventListener('click', () => {
    sellPokemon([p.id]);
    pcSelectedId = null;
    updateTopBar();
    renderPCTab();
  });
  document.getElementById('btnRelease')?.addEventListener('click', () => {
    // Unassign from agent
    for (const agent of state.agents) {
      agent.team = agent.team.filter(id => id !== p.id);
    }
    state.pokemons = state.pokemons.filter(pk => pk.id !== p.id);
    pcSelectedId = null;
    saveState();
    renderPCTab();
  });
}

// ════════════════════════════════════════════════════════════════
// 18.  UI — POKEDEX TAB
// ════════════════════════════════════════════════════════════════

function renderPokedexTab() {
  const grid = document.getElementById('pokedexGrid');
  if (!grid) return;

  grid.innerHTML = POKEMON_GEN1.map(sp => {
    const entry = state.pokedex[sp.en];
    const caught = entry?.caught;
    const seen = entry?.seen;
    return `<div class="dex-entry ${caught ? 'caught' : ''} ${!seen && !caught ? 'unseen' : ''}">
      ${caught || seen
        ? `<img src="${pokeSprite(sp.en, entry?.shiny)}" style="width:40px;height:40px;${!caught ? 'filter:brightness(0)' : ''}">`
        : `<div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:var(--text-dim)">?</div>`
      }
      <div class="dex-number">#${String(sp.dex).padStart(3, '0')}</div>
    </div>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════════
// 19.  UI — INTRO OVERLAY
// ════════════════════════════════════════════════════════════════

function showIntro() {
  const overlay = document.getElementById('introOverlay');
  if (!overlay) return;
  overlay.classList.add('active');

  // Populate sprite picker
  const picker = document.getElementById('spritePicker');
  if (picker) {
    picker.innerHTML = BOSS_SPRITES.map(s => `
      <div class="sprite-option" data-sprite="${s}">
        <img src="${trainerSprite(s)}" alt="${s}">
      </div>
    `).join('');
    picker.querySelectorAll('.sprite-option').forEach(opt => {
      opt.addEventListener('click', () => {
        picker.querySelectorAll('.sprite-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
    // Select first by default
    picker.querySelector('.sprite-option')?.classList.add('selected');
  }

  // Start button
  document.getElementById('btnStartGame')?.addEventListener('click', () => {
    const bossName = document.getElementById('inputBossName')?.value.trim() || 'Boss';
    const gangName = document.getElementById('inputGangName')?.value.trim() || 'Team Fury';
    const selectedSprite = picker?.querySelector('.sprite-option.selected')?.dataset.sprite || 'rocketgrunt';

    state.gang.bossName = bossName;
    state.gang.name = gangName;
    state.gang.bossSprite = selectedSprite;
    state.gang.initialized = true;
    saveState();
    overlay.classList.remove('active');
    renderAll();
  });
}

// ════════════════════════════════════════════════════════════════
// 20.  UI — SETTINGS MODAL
// ════════════════════════════════════════════════════════════════

function initSettings() {
  document.getElementById('btnSettings')?.addEventListener('click', () => {
    const modal = document.getElementById('settingsModal');
    if (modal) {
      // Sync values
      const langSel = document.getElementById('settingLang');
      if (langSel) langSel.value = state.lang;
      const llmSel = document.getElementById('settingLLM');
      if (llmSel) llmSel.value = state.settings.llmProvider;
      const apiKey = document.getElementById('settingAPIKey');
      if (apiKey) apiKey.value = state.settings.llmApiKey;
      modal.classList.add('active');
    }
  });

  document.getElementById('btnCloseSettings')?.addEventListener('click', () => {
    // Save settings
    const langSel = document.getElementById('settingLang');
    if (langSel) state.lang = langSel.value;
    const llmSel = document.getElementById('settingLLM');
    if (llmSel) state.settings.llmProvider = llmSel.value;
    const apiKey = document.getElementById('settingAPIKey');
    if (apiKey) state.settings.llmApiKey = apiKey.value;
    saveState();
    detectLLM();
    document.getElementById('settingsModal')?.classList.remove('active');
    // Update i18n
    renderAll();
  });

  document.getElementById('btnExportSave')?.addEventListener('click', exportSave);

  document.getElementById('btnImportSave')?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', () => {
      if (input.files[0]) importSave(input.files[0]);
    });
    input.click();
  });

  document.getElementById('btnResetAll')?.addEventListener('click', () => {
    if (confirm(t('reset_confirm'))) {
      localStorage.removeItem(SAVE_KEY);
      state = structuredClone(DEFAULT_STATE);
      // Close all zone windows
      for (const zid of [...openZones]) closeZoneWindow(zid);
      pcSelectedId = null;
      selectedForSale.clear();
      showIntro();
    }
  });

  document.getElementById('btnPurgeSprites')?.addEventListener('click', () => {
    notify(state.lang === 'fr' ? 'Cache navigateur purgé' : 'Browser cache purged', 'success');
  });
}

// ════════════════════════════════════════════════════════════════
// 21.  GAME LOOP & BOOT
// ════════════════════════════════════════════════════════════════

let agentTickInterval = null;
let autoSaveInterval = null;
let cooldownInterval = null;

function startGameLoop() {
  // Agent automation every 3 seconds
  agentTickInterval = setInterval(agentTick, 3000);

  // Auto-save every 10 seconds
  autoSaveInterval = setInterval(saveState, 10000);

  // Cooldown tick every 10 seconds (decrement pokemon cooldowns)
  cooldownInterval = setInterval(() => {
    let changed = false;
    for (const p of state.pokemons) {
      if (p.cooldown > 0) {
        p.cooldown--;
        changed = true;
      }
    }
    if (changed) saveState();
  }, 10000);

  // Zone timers refresh every second (for boost countdowns + stats)
  setInterval(() => {
    for (const zoneId of openZones) {
      updateZoneTimers(zoneId);
    }
  }, 1000);
}

function boot() {
  // Try to load saved state
  const saved = loadState();
  if (saved) {
    state = saved;
  }

  // Init tab navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Init filter/sort listeners for PC
  document.getElementById('pcSearch')?.addEventListener('input', () => {
    if (activeTab === 'tabPC') renderPokemonGrid();
  });
  document.getElementById('pcSort')?.addEventListener('change', () => {
    if (activeTab === 'tabPC') renderPokemonGrid();
  });
  document.getElementById('pcFilter')?.addEventListener('change', () => {
    if (activeTab === 'tabPC') renderPokemonGrid();
  });

  // Init settings
  initSettings();

  // Detect LLM
  detectLLM();

  // Show intro if not initialized
  if (!state.gang.initialized) {
    showIntro();
  }

  // Initial render
  renderAll();

  // Start game loop
  startGameLoop();
}

window.addEventListener('DOMContentLoaded', boot);
