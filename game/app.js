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
  pewter_gym:      'url(https://play.pokemonshowdown.com/fx/bg-rocky.png)',
  mt_moon:         'url(https://play.pokemonshowdown.com/fx/bg-cave.png)',
  diglett_cave:    'url(https://play.pokemonshowdown.com/fx/bg-cave.png)',
  nugget_bridge:   'url(https://play.pokemonshowdown.com/fx/bg-river.png)',
  cerulean_gym:    'url(https://play.pokemonshowdown.com/fx/bg-beach.png)',
  ss_anne:         'url(https://play.pokemonshowdown.com/fx/bg-ocean.png)',
  pallet_town:     'url(https://play.pokemonshowdown.com/fx/bg-meadow.png)',
  rock_tunnel:     'url(https://play.pokemonshowdown.com/fx/bg-cave.png)',
  celadon_gym:     'url(https://play.pokemonshowdown.com/fx/bg-forest.png)',
  safari_zone:     'url(https://play.pokemonshowdown.com/fx/bg-forest.png)',
  fighting_dojo:   'url(https://play.pokemonshowdown.com/fx/bg-rocky.png)',
  celadon_casino:  'url(https://play.pokemonshowdown.com/fx/bg-city.png)',
  pokemon_tower:   'url(https://play.pokemonshowdown.com/fx/bg-space.png)',
  fuchsia_gym:     'url(https://play.pokemonshowdown.com/fx/bg-swamp.png)',
  power_plant:     'url(https://play.pokemonshowdown.com/fx/bg-city.png)',
  seafoam_islands: 'url(https://play.pokemonshowdown.com/fx/bg-beach.png)',
  saffron_gym:     'url(https://play.pokemonshowdown.com/fx/bg-space.png)',
  cinnabar_gym:    'url(https://play.pokemonshowdown.com/fx/bg-volcano.png)',
  silph_co:        'url(https://play.pokemonshowdown.com/fx/bg-city.png)',
  victory_road:    'url(https://play.pokemonshowdown.com/fx/bg-rocky.png)',
  indigo_plateau:  'url(https://play.pokemonshowdown.com/fx/bg-sky.png)',
  unknown_cave:    'url(https://play.pokemonshowdown.com/fx/bg-cave.png)',
};

const ZONES = [
  // --- Early game ---
  { id:'route1',        fr:'Route 1',           en:'Route 1',           rep:0,   spawnRate:0.15,
    pool:['rattata','pidgey','caterpie','weedle','spearow','nidoran-f','nidoran-m'],
    trainers:['youngster','lass'], eliteTrainer:'acetrainer', investCost:0 },
  { id:'viridian_forest',fr:'Forêt de Jade',    en:'Viridian Forest',   rep:10,  spawnRate:0.12,
    pool:['pikachu','caterpie','metapod','butterfree','weedle','kakuna','beedrill','oddish'],
    trainers:['bugcatcher','youngster'], eliteTrainer:'acetrainer', investCost:3000 },
  { id:'pewter_gym',    fr:'Arène d\'Argenta',  en:'Pewter Gym',        rep:15,  spawnRate:0.08,
    pool:['geodude','onix','graveler','sandshrew'],
    trainers:['hiker','camper'], eliteTrainer:'brock', investCost:4000 },
  // --- Mid-early ---
  { id:'mt_moon',       fr:'Mont Sélénite',     en:'Mt. Moon',          rep:20,  spawnRate:0.10,
    pool:['zubat','geodude','clefairy','paras','clefable','jigglypuff'],
    trainers:['hiker','supernerd','rocketgrunt'], eliteTrainer:'ariana', investCost:5000 },
  { id:'diglett_cave',  fr:'Grotte Taupiqueur', en:'Diglett\'s Cave',   rep:25,  spawnRate:0.10,
    pool:['diglett','dugtrio','geodude','zubat','onix'],
    trainers:['hiker','camper'], eliteTrainer:'hiker', investCost:5000 },
  { id:'nugget_bridge', fr:'Pont Pépite',       en:'Nugget Bridge',     rep:30,  spawnRate:0.12,
    pool:['abra','pidgey','oddish','bellsprout','mankey','goldeen'],
    trainers:['youngster','lass','acetrainer','rocketgrunt'], eliteTrainer:'acetrainer', investCost:6000 },
  { id:'cerulean_gym',  fr:'Arène d\'Azuria',   en:'Cerulean Gym',      rep:30,  spawnRate:0.08,
    pool:['staryu','psyduck','goldeen','horsea','seel'],
    trainers:['swimmer','picnicker'], eliteTrainer:'misty', investCost:6000 },
  // --- Mid game ---
  { id:'ss_anne',       fr:'Océane',             en:'S.S. Anne',         rep:35,  spawnRate:0.10,
    pool:['tentacool','machop','shellder','raticate','pidgeotto'],
    trainers:['sailor','gentleman','beauty'], eliteTrainer:'ltsurge', investCost:8000 },
  { id:'pallet_town',   fr:'Bourg Palette',     en:'Pallet Town',       rep:40,  spawnRate:0.08,
    pool:['rattata','pidgey','bulbasaur','charmander','squirtle'],
    trainers:['acetrainer'], eliteTrainer:'acetrainer', investCost:8000 },
  { id:'rock_tunnel',   fr:'Grotte',            en:'Rock Tunnel',       rep:40,  spawnRate:0.10,
    pool:['zubat','geodude','machop','onix','cubone','kangaskhan'],
    trainers:['hiker','blackbelt'], eliteTrainer:'blackbelt', investCost:8000 },
  { id:'celadon_gym',   fr:'Arène de Céladopole',en:'Celadon Gym',      rep:45,  spawnRate:0.08,
    pool:['bellsprout','oddish','gloom','weepinbell','victreebel','vileplume'],
    trainers:['lass','beauty','acetrainer'], eliteTrainer:'erika', investCost:10000 },
  // --- Mid-late ---
  { id:'safari_zone',   fr:'Parc Safari',       en:'Safari Zone',       rep:50,  spawnRate:0.10,
    pool:['kangaskhan','tauros','scyther','pinsir','nidoran-f','nidoran-m','chansey','dratini','exeggcute'],
    trainers:['acetrainer','gentleman'], eliteTrainer:'gentleman', investCost:12000 },
  { id:'fighting_dojo', fr:'Dojo de Safrania',  en:'Fighting Dojo',     rep:55,  spawnRate:0.08,
    pool:['machop','machoke','machamp','mankey','primeape','hitmonlee','hitmonchan'],
    trainers:['blackbelt','blackbelt'], eliteTrainer:'blackbelt', investCost:12000 },
  { id:'celadon_casino',fr:'Casino de Céladopole',en:'Celadon Casino',  rep:60,  spawnRate:0.10,
    pool:['porygon','abra','clefairy','meowth','voltorb','dratini'],
    trainers:['rocketgrunt','rocketgruntf','gentleman','juggler'], eliteTrainer:'archer', investCost:15000 },
  { id:'pokemon_tower', fr:'Tour Pokémon',      en:'Pokémon Tower',     rep:65,  spawnRate:0.08,
    pool:['gastly','haunter','gengar','cubone','marowak','zubat'],
    trainers:['channeler','psychic','rocketgrunt'], eliteTrainer:'agatha', investCost:18000 },
  { id:'fuchsia_gym',   fr:'Arène de Parmanie', en:'Fuchsia Gym',       rep:70,  spawnRate:0.08,
    pool:['venonat','venomoth','koffing','weezing','grimer','muk'],
    trainers:['juggler','psychic'], eliteTrainer:'koga', investCost:18000 },
  // --- Late game ---
  { id:'power_plant',   fr:'Centrale',          en:'Power Plant',       rep:75,  spawnRate:0.08,
    pool:['voltorb','electrode','magnemite','magneton','electabuzz','pikachu','raichu','zapdos'],
    trainers:['scientist','supernerd'], eliteTrainer:'ltsurge', investCost:20000 },
  { id:'seafoam_islands',fr:'Îles Écume',       en:'Seafoam Islands',   rep:80,  spawnRate:0.10,
    pool:['tentacool','shellder','staryu','seel','dewgong','horsea','seadra','lapras','articuno'],
    trainers:['swimmer','acetrainer'], eliteTrainer:'lorelei', investCost:22000 },
  { id:'saffron_gym',   fr:'Arène de Safrania', en:'Saffron Gym',       rep:80,  spawnRate:0.06,
    pool:['abra','kadabra','alakazam','mr-mime','jynx','hypno'],
    trainers:['psychic','channeler'], eliteTrainer:'sabrina', investCost:25000 },
  { id:'cinnabar_gym',  fr:'Arène de Cramois\'île',en:'Cinnabar Gym',   rep:85,  spawnRate:0.06,
    pool:['growlithe','ponyta','rapidash','magmar','vulpix','ninetales','flareon','moltres'],
    trainers:['supernerd','scientist','acetrainer'], eliteTrainer:'blaine', investCost:25000 },
  { id:'silph_co',      fr:'Sylphe SARL',       en:'Silph Co.',         rep:90,  spawnRate:0.12,
    pool:['porygon','electrode','magnemite','magneton','voltorb','lapras'],
    trainers:['rocketgrunt','rocketgruntf','scientist','archer','proton'], eliteTrainer:'giovanni', investCost:30000 },
  // --- End game ---
  { id:'victory_road',  fr:'Route Victoire',    en:'Victory Road',      rep:95,  spawnRate:0.06,
    pool:['machoke','geodude','graveler','onix','marowak','golbat'],
    trainers:['acetrainer','blackbelt'], eliteTrainer:'lance', investCost:40000 },
  { id:'indigo_plateau',fr:'Plateau Indigo',    en:'Indigo Plateau',    rep:100, spawnRate:0.05,
    pool:['dragonair','dragonite','gyarados','lapras','snorlax'],
    trainers:['acetrainer'], eliteTrainer:'blue', investCost:50000 },
  { id:'unknown_cave',  fr:'Grotte Inconnue',   en:'Cerulean Cave',     rep:110, spawnRate:0.04,
    pool:['mewtwo','ditto','kadabra','alakazam','electrode','rhydon','chansey','wigglytuff'],
    trainers:[], eliteTrainer:'red', investCost:75000 },
];

// ── Special Events ────────────────────────────────────────────
const SPECIAL_EVENTS = [
  // --- Team Rocket events ---
  { id:'rocket_invasion', fr:'Invasion Rocket !', en:'Rocket Invasion!', icon:'🚀',
    trainerKey:'giovanni', chance:0.03, minRep:40,
    reward: { money:[3000,8000], rep:15 },
    desc_fr:'Giovanni envoie ses meilleurs sbires ! Battez-le pour un gros bonus.',
    desc_en:'Giovanni sends his best grunts! Defeat him for a big bonus.' },
  { id:'rocket_heist', fr:'Casse Rocket !', en:'Rocket Heist!', icon:'💣',
    trainerKey:'archer', chance:0.04, minRep:30,
    reward: { money:[2000,5000], rep:10 },
    desc_fr:'Les Rockets tentent un vol ! Interceptez Archer pour récupérer le butin.',
    desc_en:'Rockets attempt a heist! Intercept Archer to recover the loot.' },
  { id:'rocket_experiment', fr:'Expérience Rocket !', en:'Rocket Experiment!', icon:'🧪',
    trainerKey:'proton', chance:0.03, minRep:50,
    reward: { money:[3000,7000], rep:12 },
    desc_fr:'Lambda mène des expériences sur les Pokémon ! Arrêtez-le !',
    desc_en:'Proton is experimenting on Pokémon! Stop him!' },
  // --- Boost events ---
  { id:'shiny_swarm', fr:'Nuée Shiny !', en:'Shiny Swarm!', icon:'✨',
    trainerKey:null, chance:0.04, minRep:20,
    reward: { shinyBoost:60000 },
    desc_fr:'Les Pokémon brillent dans cette zone ! Taux Shiny x10 pendant 60s.',
    desc_en:'Pokémon sparkle in this zone! Shiny rate x10 for 60s.' },
  { id:'rare_migration', fr:'Migration Rare !', en:'Rare Migration!', icon:'🦅',
    trainerKey:null, chance:0.05, minRep:15,
    reward: { rareBoost:60000 },
    desc_fr:'Des Pokémon rares migrent ici ! Spawns rares x5 pendant 60s.',
    desc_en:'Rare Pokémon are migrating here! Rare spawns x5 for 60s.' },
  { id:'treasure_rain', fr:'Pluie de Trésors !', en:'Treasure Rain!', icon:'💎',
    trainerKey:null, chance:0.04, minRep:10,
    reward: { chestBoost:45000 },
    desc_fr:'Des coffres apparaissent partout pendant 45s !',
    desc_en:'Treasure chests appear everywhere for 45s!' },
  { id:'elite_challenge', fr:'Défi Élite !', en:'Elite Challenge!', icon:'🏆',
    trainerKey:null, chance:0.03, minRep:30,
    reward: { money:[2000,5000], rep:10, xpBonus:50 },
    desc_fr:'Un dresseur d\'élite vous défie ! Récompenses doublées.',
    desc_en:'An elite trainer challenges you! Double rewards.' },
  // --- Gym Leader events ---
  { id:'brock_challenge', fr:'Défi de Pierre !', en:'Brock\'s Challenge!', icon:'🪨',
    trainerKey:'brock', chance:0.03, minRep:15,
    reward: { money:[2000,4000], rep:15, xpBonus:30 },
    desc_fr:'Pierre, le Champion d\'Argenta, défend son territoire !',
    desc_en:'Brock, the Pewter City Gym Leader, defends his territory!' },
  { id:'misty_challenge', fr:'Défi d\'Ondine !', en:'Misty\'s Challenge!', icon:'🌊',
    trainerKey:'misty', chance:0.03, minRep:25,
    reward: { money:[2500,5000], rep:15, xpBonus:35 },
    desc_fr:'Ondine, la Sirène d\'Azuria, vous provoque en duel !',
    desc_en:'Misty, the Tomboyish Mermaid, challenges you!' },
  { id:'surge_challenge', fr:'Défi de Maj. Bob !', en:'Lt. Surge\'s Challenge!', icon:'⚡',
    trainerKey:'ltsurge', chance:0.03, minRep:35,
    reward: { money:[3000,6000], rep:18, xpBonus:40 },
    desc_fr:'Maj. Bob, le Lightning American, fait trembler la zone !',
    desc_en:'Lt. Surge, the Lightning American, shocks the area!' },
  { id:'erika_challenge', fr:'Défi d\'Érika !', en:'Erika\'s Challenge!', icon:'🌸',
    trainerKey:'erika', chance:0.03, minRep:45,
    reward: { money:[3000,6000], rep:18, xpBonus:40 },
    desc_fr:'Érika, la Princesse de la Nature, protège ses fleurs !',
    desc_en:'Erika, the Nature-Loving Princess, protects her flowers!' },
  { id:'koga_challenge', fr:'Défi de Koga !', en:'Koga\'s Challenge!', icon:'🥷',
    trainerKey:'koga', chance:0.02, minRep:60,
    reward: { money:[4000,8000], rep:20, xpBonus:50 },
    desc_fr:'Koga, le Maître Ninja, surgit de l\'ombre !',
    desc_en:'Koga, the Poisonous Ninja Master, strikes from the shadows!' },
  { id:'sabrina_challenge', fr:'Défi de Morgane !', en:'Sabrina\'s Challenge!', icon:'🔮',
    trainerKey:'sabrina', chance:0.02, minRep:70,
    reward: { money:[5000,10000], rep:22, xpBonus:60 },
    desc_fr:'Morgane, la Maîtresse de la Psyché, lit dans vos pensées !',
    desc_en:'Sabrina, the Master of Psychic Pokémon, reads your mind!' },
  { id:'blaine_challenge', fr:'Défi d\'Auguste !', en:'Blaine\'s Challenge!', icon:'🔥',
    trainerKey:'blaine', chance:0.02, minRep:80,
    reward: { money:[5000,10000], rep:22, xpBonus:60 },
    desc_fr:'Auguste, le Quiz Master Enflammé, vous met à l\'épreuve !',
    desc_en:'Blaine, the Hotheaded Quiz Master, tests your strength!' },
  // --- Elite Four events ---
  { id:'lorelei_appears', fr:'Olga apparaît !', en:'Lorelei Appears!', icon:'❄️',
    trainerKey:'lorelei', chance:0.02, minRep:85,
    reward: { money:[8000,15000], rep:30, xpBonus:80 },
    desc_fr:'Olga du Conseil 4 fait irruption avec ses Pokémon Glace !',
    desc_en:'Lorelei of the Elite Four arrives with her Ice Pokémon!' },
  { id:'bruno_appears', fr:'Aldo apparaît !', en:'Bruno Appears!', icon:'💪',
    trainerKey:'bruno', chance:0.02, minRep:85,
    reward: { money:[8000,15000], rep:30, xpBonus:80 },
    desc_fr:'Aldo du Conseil 4 cherche un adversaire digne de lui !',
    desc_en:'Bruno of the Elite Four seeks a worthy opponent!' },
  { id:'lance_arrives', fr:'Peter surgit !', en:'Lance Arrives!', icon:'🐉',
    trainerKey:'lance', chance:0.015, minRep:95,
    reward: { money:[10000,20000], rep:40, xpBonus:100 },
    desc_fr:'Peter, le Maître des Dragons, vous défie au sommet !',
    desc_en:'Lance, the Dragon Master, challenges you at the summit!' },
  // --- Legendary events ---
  { id:'legendary_bird_sighting', fr:'Oiseau Légendaire !', en:'Legendary Bird!', icon:'🦅',
    trainerKey:null, chance:0.02, minRep:70,
    reward: { rareBoost:90000, shinyBoost:30000 },
    desc_fr:'Un oiseau légendaire survole la zone ! Les Pokémon rares affluent !',
    desc_en:'A legendary bird flies over the area! Rare Pokémon flock in!' },
  { id:'mewtwo_signal', fr:'Signal Mewtwo !', en:'Mewtwo Signal!', icon:'🧬',
    trainerKey:null, chance:0.01, minRep:100,
    reward: { rareBoost:120000, shinyBoost:60000, chestBoost:60000 },
    desc_fr:'Une énergie psychique inconnue émane de la zone ! Tous les boosts activés !',
    desc_en:'An unknown psychic energy radiates from the area! All boosts activated!' },
  // --- Lore events ---
  { id:'bills_experiment', fr:'Expérience de Léo !', en:'Bill\'s Experiment!', icon:'🔬',
    trainerKey:null, chance:0.04, minRep:25,
    reward: { rareBoost:45000 },
    desc_fr:'Léo a accidentellement fusionné avec un Pokémon ! Des raretés apparaissent !',
    desc_en:'Bill accidentally fused with a Pokémon! Rare spawns appear!' },
  { id:'prof_oak_visit', fr:'Visite du Prof. Chen !', en:'Prof. Oak\'s Visit!', icon:'👨‍🔬',
    trainerKey:null, chance:0.04, minRep:5,
    reward: { xpBonus:30, chestBoost:30000 },
    desc_fr:'Le Prof. Chen inspecte la zone et laisse des récompenses !',
    desc_en:'Prof. Oak inspects the area and leaves rewards!' },
  { id:'rival_ambush', fr:'Embuscade du Rival !', en:'Rival Ambush!', icon:'⚔️',
    trainerKey:'blue', chance:0.02, minRep:60,
    reward: { money:[5000,12000], rep:20, xpBonus:50 },
    desc_fr:'Blue surgit de nulle part ! "Tu es encore trop faible !"',
    desc_en:'Blue appears out of nowhere! "You\'re still too weak!"' },
  { id:'red_descends', fr:'Red descend de la montagne !', en:'Red Descends!', icon:'🗻',
    trainerKey:'red', chance:0.01, minRep:100,
    reward: { money:[15000,30000], rep:60, xpBonus:150 },
    desc_fr:'Red, le Maître Pokémon ultime, quitte le Mont Argenté pour vous affronter !',
    desc_en:'Red, the ultimate Pokémon Master, descends from Mt. Silver to battle you!' },
  { id:'ghost_marowak', fr:'Spectre d\'Osselait !', en:'Ghost Marowak!', icon:'👻',
    trainerKey:null, chance:0.03, minRep:50,
    reward: { shinyBoost:45000, rareBoost:30000 },
    desc_fr:'Le fantôme de la mère Ossatueur hante la zone... Des spectres apparaissent !',
    desc_en:'The ghost of Marowak\'s mother haunts the area... Ghosts appear!' },
  { id:'safari_stampede', fr:'Stampede Safari !', en:'Safari Stampede!', icon:'🦬',
    trainerKey:null, chance:0.04, minRep:40,
    reward: { rareBoost:60000, chestBoost:30000 },
    desc_fr:'Les Pokémon du Parc Safari s\'échappent ! Captures rares garanties !',
    desc_en:'Safari Zone Pokémon are escaping! Guaranteed rare catches!' },
];

// ── Treasure Chest Loot Table ──────────────────────────────────
const CHEST_LOOT = [
  { weight:30, type:'balls',    qty:[3,8],   ballType:'pokeball',  fr:'Poké Balls',     en:'Poké Balls'     },
  { weight:20, type:'balls',    qty:[2,5],   ballType:'greatball', fr:'Super Balls',    en:'Great Balls'    },
  { weight:10, type:'balls',    qty:[1,3],   ballType:'ultraball', fr:'Hyper Balls',    en:'Ultra Balls'    },
  { weight:5,  type:'balls',    qty:[1,2],   ballType:'duskball',  fr:'Sombre Balls',   en:'Dusk Balls'     },
  { weight:18, type:'money',    qty:[500,2000],                    fr:'PokéDollars',    en:'PokéDollars'    },
  { weight:5,  type:'money',    qty:[3000,8000],                   fr:'Jackpot !',      en:'Jackpot!'       },
  { weight:10, type:'rare_pokemon',                                fr:'Pokémon Rare !', en:'Rare Pokémon!'  },
  { weight:8,  type:'item',     itemId:'incense',  qty:1,         fr:'Encens Chance',  en:'Lucky Incense'  },
  { weight:5,  type:'item',     itemId:'rarescope', qty:1,        fr:'Rarioscope',     en:'Rare Scope'     },
  { weight:3,  type:'item',     itemId:'aura',     qty:1,         fr:'Aura Shiny',     en:'Shiny Aura'     },
  { weight:4,  type:'item',     itemId:'potion',   qty:3,         fr:'Potions',        en:'Potions'        },
  { weight:3,  type:'item',     itemId:'lure',     qty:1,         fr:'Leurre',         en:'Lure'           },
  { weight:2,  type:'item',     itemId:'evostone', qty:1,         fr:'Pierre Évolution',en:'Evolution Stone'},
  { weight:2,  type:'item',     itemId:'rarecandy',qty:1,         fr:'Super Bonbon',   en:'Rare Candy'     },
  { weight:1,  type:'masterball',                                  fr:'Master Ball !',  en:'Master Ball!'   },
  { weight:2,  type:'event',                                       fr:'Événement !',    en:'Event!'         },
];
// Gang Base — special zone (no spawns, management only)
const GANG_BASE = {
  id: 'gang_base',
  fr: 'Base du Gang',
  en: 'Gang Base',
  rep: 0,
  spawnRate: 0,
  pool: [],
  trainers: [],
  eliteTrainer: null,
  investCost: 0,
};

const ZONE_BY_ID = {};
ZONES.forEach(z => ZONE_BY_ID[z.id] = z);
ZONE_BY_ID[GANG_BASE.id] = GANG_BASE;

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
    desc_en:'5 Rocket Grunts defeated. They won\'t forget you.' },
  { id:'story_rocket_25',type:'story',fr:'Fléau de la Team Rocket',    en:'Rocket\'s Bane',
    stat:'rocketDefeated',target:25,reward:{ money:15000,rep:30 },icon:'📜',
    desc_fr:'25 Rockets mis hors d\'état de nuire. Giovanni est furieux.',
    desc_en:'25 Rockets put out of commission. Giovanni is furious.' },
  { id:'story_agent_recruit',type:'story',fr:'Premier Recrue',         en:'First Recruit',
    stat:'_agentCount',  target:1,  reward:{ money:1000 }, icon:'📜',
    desc_fr:'Votre premier agent a rejoint le gang !',
    desc_en:'Your first agent joined the gang!' },
  { id:'story_agent_5',  type:'story',fr:'Organisation Criminelle',    en:'Criminal Organization',
    stat:'_agentCount',  target:5,  reward:{ money:10000,rep:20 },icon:'📜',
    desc_fr:'5 agents ! Votre gang est une vraie organisation.',
    desc_en:'5 agents! Your gang is a real organization.' },
  { id:'story_pokedex_50',type:'story',fr:'Semi Pokédex',              en:'Half Pokédex',
    stat:'_pokedexCaught',target:50,reward:{ money:15000,rep:25 },icon:'📜',
    desc_fr:'50 espèces capturées. Le Prof. Chen est fier.',
    desc_en:'50 species caught. Prof. Oak is proud.' },
  { id:'story_pokedex_100',type:'story',fr:'Maître du Pokédex',        en:'Pokédex Master',
    stat:'_pokedexCaught',target:100,reward:{money:50000,rep:50},icon:'📜',
    desc_fr:'100 espèces ! Vous approchez de la complétion !',
    desc_en:'100 species! You\'re nearing completion!' },
  { id:'story_pokedex_151',type:'story',fr:'Légende Vivante',          en:'Living Legend',
    stat:'_pokedexCaught',target:151,reward:{money:100000,rep:100},icon:'👑',
    desc_fr:'151 espèces capturées. Vous êtes un MAÎTRE Pokémon !',
    desc_en:'151 species caught. You are a Pokémon MASTER!' },
];

// ── Trainers ──────────────────────────────────────────────────
const TRAINER_TYPES = {
  // Basic trainers
  youngster:    { fr:'Gamin',        en:'Youngster',    sprite:'youngster',    diff:1, reward:[50,150],   rep:1  },
  lass:         { fr:'Fillette',     en:'Lass',         sprite:'lass',         diff:1, reward:[50,150],   rep:1  },
  bugcatcher:   { fr:'Chasseur',     en:'Bug Catcher',  sprite:'bugcatcher',   diff:1, reward:[50,150],   rep:1  },
  camper:       { fr:'Campeur',      en:'Camper',       sprite:'camper',       diff:1, reward:[80,200],   rep:1  },
  picnicker:    { fr:'Pique-niqueuse',en:'Picnicker',   sprite:'picnicker',    diff:1, reward:[80,200],   rep:1  },
  fisherman:    { fr:'Pêcheur',      en:'Fisherman',    sprite:'fisherman',    diff:1, reward:[100,250],  rep:2  },
  // Mid-tier trainers
  hiker:        { fr:'Montagnard',   en:'Hiker',        sprite:'hiker',        diff:2, reward:[200,500],  rep:3  },
  swimmer:      { fr:'Nageur',       en:'Swimmer',      sprite:'swimmer',      diff:2, reward:[200,500],  rep:3  },
  psychic:      { fr:'Médium',       en:'Psychic',      sprite:'psychic',      diff:2, reward:[200,500],  rep:3  },
  gentleman:    { fr:'Gentleman',    en:'Gentleman',    sprite:'gentleman',    diff:2, reward:[300,800],  rep:3  },
  beauty:       { fr:'Canon',        en:'Beauty',       sprite:'beauty',       diff:2, reward:[300,800],  rep:3  },
  sailor:       { fr:'Marin',        en:'Sailor',       sprite:'sailor',       diff:2, reward:[250,600],  rep:3  },
  blackbelt:    { fr:'Karatéka',     en:'Black Belt',   sprite:'blackbelt',    diff:2, reward:[300,700],  rep:3  },
  supernerd:    { fr:'Intello',      en:'Super Nerd',   sprite:'supernerd',    diff:2, reward:[250,600],  rep:3  },
  // High-tier trainers
  acetrainer:   { fr:'Topdresseur',  en:'Ace Trainer',  sprite:'acetrainer',   diff:3, reward:[500,1500], rep:5  },
  scientist:    { fr:'Scientifique', en:'Scientist',    sprite:'scientist',    diff:3, reward:[500,1500], rep:5  },
  channeler:    { fr:'Mystimana',    en:'Channeler',    sprite:'channeler',    diff:3, reward:[400,1200], rep:5  },
  juggler:      { fr:'Jongleur',     en:'Juggler',      sprite:'juggler',      diff:3, reward:[500,1200], rep:5  },
  // Team Rocket
  rocketgrunt:  { fr:'Sbire Rocket', en:'Rocket Grunt', sprite:'rocketgrunt',  diff:4, reward:[1000,3000],rep:10 },
  rocketgruntf: { fr:'Sbire Rocket', en:'Rocket Grunt', sprite:'rocketgruntf', diff:4, reward:[1000,3000],rep:10 },
  archer:       { fr:'Archer',       en:'Archer',       sprite:'archer',       diff:4, reward:[1500,4000],rep:12 },
  ariana:       { fr:'Ariane',       en:'Ariana',       sprite:'ariana',       diff:4, reward:[1500,4000],rep:12 },
  proton:       { fr:'Lambda',       en:'Proton',       sprite:'proton',       diff:4, reward:[1500,4000],rep:12 },
  giovanni:     { fr:'Giovanni',     en:'Giovanni',     sprite:'giovanni',     diff:5, reward:[5000,10000],rep:25},
  // Gym Leaders
  brock:        { fr:'Pierre',       en:'Brock',        sprite:'brock',        diff:3, reward:[2000,4000],rep:15 },
  misty:        { fr:'Ondine',       en:'Misty',        sprite:'misty',        diff:3, reward:[2000,5000],rep:15 },
  ltsurge:      { fr:'Maj. Bob',     en:'Lt. Surge',    sprite:'ltsurge',      diff:4, reward:[3000,6000],rep:18 },
  erika:        { fr:'Érika',        en:'Erika',        sprite:'erika',        diff:4, reward:[3000,6000],rep:18 },
  koga:         { fr:'Koga',         en:'Koga',         sprite:'koga',         diff:4, reward:[4000,8000],rep:20 },
  sabrina:      { fr:'Morgane',      en:'Sabrina',      sprite:'sabrina',      diff:5, reward:[5000,10000],rep:22},
  blaine:       { fr:'Auguste',      en:'Blaine',       sprite:'blaine',       diff:5, reward:[5000,10000],rep:22},
  // Elite Four & Champion
  lorelei:      { fr:'Olga',         en:'Lorelei',      sprite:'lorelei',      diff:6, reward:[8000,15000],rep:30},
  bruno:        { fr:'Aldo',         en:'Bruno',        sprite:'bruno',        diff:6, reward:[8000,15000],rep:30},
  agatha:       { fr:'Agatha',       en:'Agatha',       sprite:'agatha',       diff:6, reward:[8000,15000],rep:30},
  lance:        { fr:'Peter',        en:'Lance',        sprite:'lance',        diff:7, reward:[10000,20000],rep:40},
  blue:         { fr:'Blue',         en:'Blue',         sprite:'blue',         diff:7, reward:[12000,25000],rep:50},
  red:          { fr:'Red',          en:'Red',          sprite:'red',          diff:8, reward:[15000,30000],rep:60},
};

// ── Items & Balls ─────────────────────────────────────────────
const BALLS = {
  pokeball:   { fr:'Poké Ball',  en:'Poké Ball',  cost:200,  potential:[40,30,20,8,2]  },
  greatball:  { fr:'Super Ball', en:'Great Ball',  cost:600,  potential:[15,30,30,18,7] },
  ultraball:  { fr:'Hyper Ball', en:'Ultra Ball',  cost:2000, potential:[5,15,30,30,20] },
  duskball:   { fr:'Sombre Ball',en:'Dusk Ball',   cost:1500, potential:[20,20,20,20,20]},
  masterball: { fr:'Master Ball',en:'Master Ball', cost:99999,potential:[0,0,0,10,90]  },
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
  { id:'evostone',  qty:1,  cost:5000,  icon:'💎', fr:'Pierre Évolution', en:'Evolution Stone', desc_fr:'Évoluer un Pokémon (échange/pierre)', desc_en:'Evolve a Pokémon (trade/stone)' },
  { id:'rarecandy', qty:1,  cost:3000,  icon:'🍬', fr:'Super Bonbon', en:'Rare Candy', desc_fr:'+5 niveaux à un Pokémon', desc_en:'+5 levels to a Pokémon' },
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
  agents_tab:    { fr:'👥 Agents',   en:'👥 Agents'   },
  zones_tab:     { fr:'🗺️ Zones',   en:'🗺️ Zones'   },
  bag_tab:       { fr:'🎒 Sac',      en:'🎒 Bag'      },
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
    bossTeam: [], // array of up to 3 pokemon IDs for boss combat
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
    evostone: 0,
    rarecandy: 0,
    masterball: 0,
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
  missions: {
    completed: [],       // IDs of completed story missions
    daily: { reset: 0, progress: {}, claimed: [] },   // daily reset timestamp
    weekly: { reset: 0, progress: {}, claimed: [] },   // weekly reset timestamp
  },
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
    autoCombat: true,
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
  // Migration: bossTeam
  if (!merged.gang.bossTeam) merged.gang.bossTeam = [];
  // Migration: agent notifyCaptures
  for (const agent of (merged.agents || [])) {
    if (agent.notifyCaptures === undefined) agent.notifyCaptures = true;
  }
  // Migration: pokemon history
  for (const p of (merged.pokemons || [])) {
    if (!p.history) p.history = [];
  }
  // Migration: missions
  if (!merged.missions) {
    merged.missions = structuredClone(DEFAULT_STATE.missions);
  }
  if (!merged.missions.daily) merged.missions.daily = { reset: 0, progress: {}, claimed: [] };
  if (!merged.missions.weekly) merged.missions.weekly = { reset: 0, progress: {}, claimed: [] };
  if (!merged.missions.completed) merged.missions.completed = [];
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

// Ball sprites — Showdown primary, PokeAPI fallback
const BALL_SPRITES = {
  pokeball:  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
  greatball: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
  ultraball: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
  duskball:  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dusk-ball.png',
};

// Chest sprite URL
const CHEST_SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png';

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
    history: [],
  };
  pokemon.stats = calculateStats(pokemon);
  // Initial history entry
  pokemon.history.push({ type: 'captured', ts: Date.now(), zone: zoneId, ball: ballType });
  return pokemon;
}

function getPokemonPower(pokemon) {
  const s = pokemon.stats;
  return s.atk + s.def + s.spd;
}

// ── Evolution Data ────────────────────────────────────────────
// level evolutions: [from, to, level]
// item evolutions: [from, to, 'item'] (needs Evolution Stone from shop)
const EVOLUTIONS = [
  // Starters
  ['bulbasaur','ivysaur',16],['ivysaur','venusaur',32],
  ['charmander','charmeleon',16],['charmeleon','charizard',36],
  ['squirtle','wartortle',16],['wartortle','blastoise',36],
  // Bugs
  ['caterpie','metapod',7],['metapod','butterfree',10],
  ['weedle','kakuna',7],['kakuna','beedrill',10],
  // Birds
  ['pidgey','pidgeotto',18],['pidgeotto','pidgeot',36],
  ['spearow','fearow',20],
  // Poison
  ['ekans','arbok',22],
  ['nidoran-f','nidorina',16],['nidorina','nidoqueen','item'],
  ['nidoran-m','nidorino',16],['nidorino','nidoking','item'],
  // Electric
  ['pikachu','raichu','item'],['voltorb','electrode',30],['magnemite','magneton',30],
  // Ground
  ['sandshrew','sandslash',22],['diglett','dugtrio',26],
  // Fairy
  ['clefairy','clefable','item'],['jigglypuff','wigglytuff','item'],
  // Fire
  ['vulpix','ninetales','item'],['growlithe','arcanine','item'],
  // Water
  ['poliwag','poliwhirl',25],['poliwhirl','poliwrath','item'],
  ['psyduck','golduck',33],['tentacool','tentacruel',30],
  ['seel','dewgong',34],['shellder','cloyster','item'],
  ['horsea','seadra',32],['goldeen','seaking',33],
  ['staryu','starmie','item'],['magikarp','gyarados',20],
  // Fighting
  ['mankey','primeape',28],['machop','machoke',28],['machoke','machamp','item'],
  // Psychic
  ['abra','kadabra',16],['kadabra','alakazam','item'],
  ['slowpoke','slowbro',37],['drowzee','hypno',26],
  // Grass/Poison
  ['oddish','gloom',21],['gloom','vileplume','item'],
  ['bellsprout','weepinbell',21],['weepinbell','victreebel','item'],
  ['paras','parasect',24],['venonat','venomoth',31],
  // Normal
  ['meowth','persian',28],['rattata','raticate',20],
  // Rock
  ['geodude','graveler',25],['graveler','golem','item'],
  // Ghost
  ['gastly','haunter',25],['haunter','gengar','item'],
  // Misc
  ['ponyta','rapidash',40],['krabby','kingler',28],
  ['exeggcute','exeggutor','item'],
  ['cubone','marowak',28],['rhyhorn','rhydon',42],
  ['grimer','muk',38],['koffing','weezing',35],
  ['omanyte','omastar',40],['kabuto','kabutops',40],
  ['dratini','dragonair',30],['dragonair','dragonite',55],
  ['eevee','vaporeon','item'], // will use the single item for all trade evos
  ['zubat','golbat',22],
];

const EVO_BY_SPECIES = {};
EVOLUTIONS.forEach(([from, to, req]) => {
  if (!EVO_BY_SPECIES[from]) EVO_BY_SPECIES[from] = [];
  EVO_BY_SPECIES[from].push({ to, req });
});

function checkEvolution(pokemon) {
  const evos = EVO_BY_SPECIES[pokemon.species_en];
  if (!evos) return null;
  for (const evo of evos) {
    if (evo.req === 'item') continue; // item evolutions handled separately
    if (typeof evo.req === 'number' && pokemon.level >= evo.req) {
      return evo;
    }
  }
  return null;
}

function evolvePokemon(pokemon, targetEN) {
  const sp = SPECIES_BY_EN[targetEN];
  if (!sp) return false;
  const oldName = speciesName(pokemon.species_en);
  pokemon.species_en = sp.en;
  pokemon.species_fr = sp.fr;
  pokemon.dex = sp.dex;
  pokemon.stats = calculateStats(pokemon);
  pokemon.moves = rollMoves(sp.en);
  if (pokemon.history) {
    pokemon.history.push({ type: 'evolved', ts: Date.now(), from: oldName, to: speciesName(sp.en) });
  }
  // Update pokedex
  if (!state.pokedex[sp.en]) {
    state.pokedex[sp.en] = { seen: true, caught: true, shiny: pokemon.shiny, count: 1 };
  } else {
    state.pokedex[sp.en].caught = true;
    state.pokedex[sp.en].count++;
  }
  notify(`${oldName} ${state.lang === 'fr' ? 'évolue en' : 'evolved into'} ${speciesName(sp.en)} !`, 'gold');
  try { SFX.capture(5, true); } catch {} // Evolution fanfare
  saveState();
  return true;
}

function tryAutoEvolution(pokemon) {
  const evo = checkEvolution(pokemon);
  if (evo) {
    evolvePokemon(pokemon, evo.to);
    return true;
  }
  return false;
}

function levelUpPokemon(pokemon, xpGain) {
  pokemon.xp += xpGain;
  const xpNeeded = pokemon.level * 20;
  let leveled = false;
  while (pokemon.xp >= xpNeeded && pokemon.level < 100) {
    pokemon.xp -= xpNeeded;
    pokemon.level++;
    leveled = true;
    if (pokemon.history) {
      pokemon.history.push({ type: 'levelup', ts: Date.now(), level: pokemon.level });
    }
  }
  if (leveled) {
    pokemon.stats = calculateStats(pokemon);
    tryAutoEvolution(pokemon);
  }
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
      return { msg: `📦 ${loot.qty}x ${name}`, type: 'gold' };
    }
    case 'masterball': {
      state.inventory.masterball = (state.inventory.masterball || 0) + 1;
      return { msg: `📦 MASTER BALL !!`, type: 'gold' };
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
      if (p) {
        levelUpPokemon(p, xpEach);
        if (p.history) p.history.push({ type: 'combat', ts: Date.now(), won: true });
      }
    }
  } else {
    state.gang.reputation = Math.max(0, state.gang.reputation + result.repGain);
    // Cooldown on team
    for (const id of playerTeamIds) {
      const p = state.pokemons.find(pk => pk.id === id);
      if (p) {
        p.cooldown = 3;
        if (p.history) p.history.push({ type: 'combat', ts: Date.now(), won: false });
      }
    }
  }
  saveState();
}

// ════════════════════════════════════════════════════════════════
//  7b. MISSIONS MODULE
// ════════════════════════════════════════════════════════════════

function getMissionStat(statKey) {
  if (statKey === '_reputation') return state.gang.reputation;
  if (statKey === '_agentCount') return state.agents.length;
  if (statKey === '_pokedexCaught') {
    return Object.values(state.pokedex).filter(e => e.caught).length;
  }
  return state.stats[statKey] || 0;
}

function initMissions() {
  if (!state.missions) {
    state.missions = { completed: [], daily: { reset: 0, progress: {}, claimed: [] }, weekly: { reset: 0, progress: {}, claimed: [] } };
  }
  // Reset daily/weekly if expired
  const now = Date.now();
  const DAY = 86400000;
  const WEEK = 604800000;
  if (now - state.missions.daily.reset >= DAY) {
    // Snapshot current stats as baseline
    const baseline = {};
    for (const m of MISSIONS.filter(m => m.type === 'daily')) {
      baseline[m.stat] = getMissionStat(m.stat);
    }
    state.missions.daily = { reset: now, progress: baseline, claimed: [] };
  }
  if (now - state.missions.weekly.reset >= WEEK) {
    const baseline = {};
    for (const m of MISSIONS.filter(m => m.type === 'weekly')) {
      baseline[m.stat] = getMissionStat(m.stat);
    }
    state.missions.weekly = { reset: now, progress: baseline, claimed: [] };
  }
}

function getMissionProgress(mission) {
  const current = getMissionStat(mission.stat);
  if (mission.type === 'story') {
    return Math.min(current, mission.target);
  }
  const period = mission.type === 'daily' ? state.missions.daily : state.missions.weekly;
  const baseline = period.progress[mission.stat] || 0;
  return Math.min(current - baseline, mission.target);
}

function isMissionComplete(mission) {
  return getMissionProgress(mission) >= mission.target;
}

function isMissionClaimed(mission) {
  if (mission.type === 'story') return state.missions.completed.includes(mission.id);
  const period = mission.type === 'daily' ? state.missions.daily : state.missions.weekly;
  return period.claimed.includes(mission.id);
}

function claimMission(mission) {
  if (!isMissionComplete(mission) || isMissionClaimed(mission)) return;
  // Grant rewards
  if (mission.reward.money) {
    state.gang.money += mission.reward.money;
    state.stats.totalMoneyEarned += mission.reward.money;
  }
  if (mission.reward.rep) {
    state.gang.reputation += mission.reward.rep;
  }
  // Mark as claimed
  if (mission.type === 'story') {
    state.missions.completed.push(mission.id);
  } else {
    const period = mission.type === 'daily' ? state.missions.daily : state.missions.weekly;
    period.claimed.push(mission.id);
  }
  const name = state.lang === 'fr' ? mission.fr : mission.en;
  notify(`${mission.icon} ${name} — ${state.lang === 'fr' ? 'Récompense récupérée !' : 'Reward claimed!'}`, 'gold');
  saveState();
  updateTopBar();
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
    notifyCaptures: true,
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

// Agent automation tick — agents interact with VISIBLE spawns in zone windows
function agentTick() {
  if (!state.settings.autoCombat) return; // auto-combat off = agents idle
  const zoneDone = new Set(); // track zones already processed this tick
  for (const agent of state.agents) {
    if (!agent.assignedZone) continue;
    const zoneId = agent.assignedZone;
    if (!openZones.has(zoneId)) continue; // only act in open zone windows
    const spawns = zoneSpawns[zoneId];
    if (!spawns || spawns.length === 0) continue;
    if (zoneDone.has(zoneId)) continue; // one action per zone per tick
    // Chance to act this tick based on agent capture stat (higher = more active)
    const actChance = 0.5 + agent.stats.capture / 60;
    if (Math.random() > actChance) continue;

    // Priority: trainers first (combat), then pokemon (capture), then chests
    const trainerSpawn = spawns.find(s => s.type === 'trainer' && !s._agentClaimed);
    const pokemonSpawn = spawns.find(s => s.type === 'pokemon' && !s._agentClaimed);
    const chestSpawn = spawns.find(s => s.type === 'chest' && !s._agentClaimed);

    if (trainerSpawn) {
      // Mark claimed so other agents don't try
      trainerSpawn._agentClaimed = true;
      zoneDone.add(zoneId);
      // Open combat popup with auto-execute
      agentAutoCombat(zoneId, trainerSpawn, agent);
    } else if (pokemonSpawn) {
      pokemonSpawn._agentClaimed = true;
      zoneDone.add(zoneId);
      // Agent throws ball at visible pokemon spawn
      agentCaptureVisibleSpawn(agent, zoneId, pokemonSpawn);
    } else if (chestSpawn) {
      chestSpawn._agentClaimed = true;
      zoneDone.add(zoneId);
      // Agent opens chest
      agentOpenChest(agent, zoneId, chestSpawn);
    }
  }
}

// Agent captures a visible pokemon spawn with ball throw animation
function agentCaptureVisibleSpawn(agent, zoneId, spawnObj) {
  const win = document.getElementById(`zw-${zoneId}`);
  if (!win) return;
  const viewport = win.querySelector('.zone-viewport');
  if (!viewport) return;
  const spawnEl = viewport.querySelector(`[data-spawn-id="${spawnObj.id}"]`);
  if (!spawnEl) return;

  // Mark as catching to prevent player clicks
  spawnEl.classList.add('catching');

  // Find agent sprite position in zone
  const agentEls = viewport.querySelectorAll('.zone-agent');
  let agentEl = null;
  for (const el of agentEls) {
    const label = el.querySelector('.agent-label');
    if (label && label.textContent === agent.name) { agentEl = el; break; }
  }
  let startX = 40, startY = 150;
  if (agentEl) {
    const r = agentEl.getBoundingClientRect();
    const wr = viewport.getBoundingClientRect();
    startX = r.left - wr.left + r.width / 2;
    startY = r.top - wr.top;
  }
  const targetX = parseInt(spawnEl.style.left) + 28;
  const targetY = parseInt(spawnEl.style.top) + 28;

  // Ball projectile
  const ball = document.createElement('div');
  ball.className = 'ball-projectile';
  ball.innerHTML = `<img src="${BALL_SPRITES.pokeball}">`;
  ball.style.left = startX + 'px';
  ball.style.top = startY + 'px';
  viewport.appendChild(ball);

  try { SFX.ballThrow(); } catch {}
  requestAnimationFrame(() => {
    ball.style.transition = 'left .35s ease-out, top .35s ease-in';
    ball.style.left = targetX + 'px';
    ball.style.top = targetY + 'px';
  });

  setTimeout(() => {
    ball.remove();
    // Try capture using tryCapture (uses balls from inventory)
    const caught = tryCapture(zoneId, spawnObj.species_en);
    if (caught) {
      // Luck reroll for agents
      if (agent.stats.luck > 8 && caught.potential < 3 && Math.random() < 0.3) {
        caught.potential = randInt(3, 5);
        caught.stats = calculateStats(caught);
      }
      showCaptureBurst(viewport, targetX, targetY, caught.potential, caught.shiny);
      grantAgentXP(agent, 2);
      if (agent.notifyCaptures !== false) {
        notify(t('agent_catch', { agent: agent.name, pokemon: speciesName(spawnObj.species_en) }), 'success');
      }
      addLog(t('agent_catch', { agent: agent.name, pokemon: speciesName(spawnObj.species_en) }));
      removeSpawn(zoneId, spawnObj.id);
      updateTopBar();
      updateZoneTimers(zoneId);
    } else {
      // No balls left — release spawn
      spawnEl.classList.remove('catching');
      spawnObj._agentClaimed = false;
    }
  }, 380);
}

// Agent auto-fights a trainer — opens inline combat and auto-executes
function agentAutoCombat(zoneId, spawnObj, agent) {
  // Don't start if a combat is already running
  if (currentCombat) return;
  // Open combat popup (same as player click)
  openCombatPopup(zoneId, spawnObj);
  // Auto-execute after a brief delay so the player can see it
  setTimeout(() => {
    if (!currentCombat) return;
    executeCombat();
    // Auto-close after showing result
    setTimeout(() => {
      const inlineCombat = document.getElementById(`zc-${zoneId}`);
      if (inlineCombat && inlineCombat.classList.contains('active')) {
        inlineCombat.classList.remove('active');
        removeSpawn(zoneId, spawnObj.id);
        updateTopBar();
        currentCombat = null;
        if (activeTab === 'tabGang') renderGangTab();
      }
    }, 1500);
  }, 800);
}

// Agent opens a chest
function agentOpenChest(agent, zoneId, spawnObj) {
  state.stats.chestsOpened = (state.stats.chestsOpened || 0) + 1;
  const loot = rollChestLoot(zoneId);
  notify(`${agent.name}: ${loot.msg}`, loot.type);
  grantAgentXP(agent, 1);
  try { SFX.capture(3, false); } catch {}
  removeSpawn(zoneId, spawnObj.id);
  updateTopBar();
  updateZoneTimers(zoneId);
  saveState();
}

// (Agent capture animation is now handled by agentCaptureVisibleSpawn above)

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
    'Et fais-le double !',
    'Tu oses défier notre gang ?',
    'Tes Pokémon ne font pas le poids !',
    'La Team Rocket va t\'écraser !',
    'Tu n\'as aucune chance contre nous !',
    'Ton gang est une blague !',
    'Je vais te montrer la vraie puissance !',
    'Quoi ? Tu veux te battre ? Très bien !',
    'Je suis un dresseur ! J\'affronte tout ceux que je croise !',
    'Hé ! Ne me sous-estime pas !',
    'Les insectes sont les meilleurs Pokémon !',
    'Je me suis entraîné dur pour ce moment !',
    'Tu as l\'air fort... intéressant !',
    'Mon Pokémon est le plus fort de la route !',
    'Tu vas regretter d\'être venu ici !',
    'J\'ai perdu mon chemin... mais je vais te battre !',
    'Je suis imbattable ! Enfin je crois...',
  ],
  en: [
    'Prepare for trouble!',
    'And make it double!',
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
    case 'tabAgents': renderAgentsTab(); break;
    case 'tabBag':    renderBagTab(); break;
    case 'tabMissions': renderMissionsTab(); break;
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

// Track headbar expanded state per zone
const headbarExpanded = {};

function renderZoneWindows() {
  const container = document.getElementById('zoneWindows');
  if (!container) return;
  if (openZones.size === 0) {
    container.innerHTML = renderGangBaseWindow() + '<div style="color:var(--text-dim);padding:40px;text-align:center">Sélectionnez une zone pour commencer</div>';
    bindGangBase(container);
    return;
  }
  container.innerHTML = renderGangBaseWindow();
  bindGangBase(container);

  for (const zoneId of openZones) {
    const zone = ZONE_BY_ID[zoneId];
    if (!zone) continue;
    const zState = state.zones[zoneId] || {};
    const mastery = getZoneMastery(zoneId);
    const name = state.lang === 'fr' ? zone.fr : zone.en;
    const invested = zState.invested;
    const spawnRate = zone.spawnRate;

    const win = document.createElement('div');
    win.className = 'zone-window';
    win.id = `zw-${zoneId}`;

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

    // Headbar (collapsible)
    const isExpanded = headbarExpanded[zoneId] || false;
    win.innerHTML = `
      <div class="zone-headbar" data-zone-hb="${zoneId}">
        <span class="headbar-name">${invested ? '🏴 ' : ''}${name}</span>
        <span class="headbar-stats">${'★'.repeat(mastery)} ${(spawnRate * 100).toFixed(0)}%/s ${boosts.join('')}</span>
        <span class="headbar-toggle">${isExpanded ? '▲' : '▼'}</span>
      </div>
      <div class="zone-headbar-content ${isExpanded ? 'expanded' : ''}" id="zt-${zoneId}"></div>
      <div class="zone-viewport" style="background-image:${ZONE_BGS[zoneId] || 'none'};background-size:cover;background-position:center bottom">
        ${boosts.length ? `<div class="zone-boosts">${boosts.map(b => `<span class="boost-badge">${b}</span>`).join('')}</div>` : ''}
        ${eventActive && eventDef ? `<div class="zone-event-banner">${eventDef.icon} ${state.lang === 'fr' ? eventDef.fr : eventDef.en}</div>` : ''}
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
      </div>
      <div class="zone-combat" id="zc-${zoneId}"></div>
    `;
    container.appendChild(win);

    // Headbar toggle click
    const headbar = win.querySelector(`[data-zone-hb="${zoneId}"]`);
    if (headbar) {
      headbar.addEventListener('click', () => {
        headbarExpanded[zoneId] = !headbarExpanded[zoneId];
        const content = document.getElementById(`zt-${zoneId}`);
        if (content) content.classList.toggle('expanded', headbarExpanded[zoneId]);
        const toggle = headbar.querySelector('.headbar-toggle');
        if (toggle) toggle.textContent = headbarExpanded[zoneId] ? '▲' : '▼';
      });
    }

    // Double-click zone to move boss there
    const viewport = win.querySelector('.zone-viewport');
    if (viewport) {
      viewport.addEventListener('dblclick', (e) => {
        if (e.target.closest('.zone-spawn') || e.target.closest('.zone-invest-btn')) return;
        state.gang.bossZone = zoneId;
        saveState();
        renderZoneWindows();
      });
    }

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

// ── Gang Base Window (always first in zone windows) ─────────
function renderGangBaseWindow() {
  const bossTeamHtml = [0, 1, 2].map(i => {
    const pkId = state.gang.bossTeam[i];
    const pk = pkId ? state.pokemons.find(p => p.id === pkId) : null;
    if (pk) {
      return `<div class="base-team-slot filled" data-boss-slot="${i}" title="${speciesName(pk.species_en)} Lv.${pk.level}">
        <img src="${pokeSprite(pk.species_en, pk.shiny)}" alt="${speciesName(pk.species_en)}">
      </div>`;
    }
    return `<div class="base-team-slot" data-boss-slot="${i}" title="${state.lang === 'fr' ? 'Assigner un Pokémon' : 'Assign a Pokémon'}">+</div>`;
  }).join('');

  return `<div class="gang-base-window" id="gangBaseWin">
    ${state.gang.bossSprite ? `<img class="base-boss-sprite" src="${trainerSprite(state.gang.bossSprite)}" alt="Boss">` : '<div style="width:64px;height:64px;background:var(--bg);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:24px">💀</div>'}
    <div style="font-family:var(--font-pixel);font-size:10px;color:var(--text)">${state.gang.bossName}</div>
    <div style="font-size:9px;color:var(--red)">${state.gang.name}</div>
    <div class="base-team-slots">${bossTeamHtml}</div>
    <div class="base-actions">
      <button class="base-action-btn" data-base-action="bag">🎒 Sac</button>
      <button class="base-action-btn" data-base-action="agents">👥 Agents</button>
      <button class="base-action-btn" data-base-action="pc">🖥 PC</button>
      <button class="base-action-btn" data-base-action="gang">📊 Gang</button>
    </div>
  </div>`;
}

function bindGangBase(container) {
  // Boss team slot clicks
  container.querySelectorAll('[data-boss-slot]').forEach(slot => {
    slot.addEventListener('click', () => {
      const idx = parseInt(slot.dataset.bossSlot);
      const pkId = state.gang.bossTeam[idx];
      if (pkId) {
        // Remove from boss team
        state.gang.bossTeam.splice(idx, 1);
        saveState();
        renderZoneWindows();
      } else {
        // Show picker
        openTeamPicker('boss', null, () => renderZoneWindows());
      }
    });
  });
  // Quick nav buttons
  container.querySelectorAll('[data-base-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.baseAction;
      const tabMap = { bag: 'tabBag', agents: 'tabAgents', pc: 'tabPC', gang: 'tabGang' };
      if (tabMap[action]) switchTab(tabMap[action]);
    });
  });
}

// ── Team Picker Modal ────────────────────────────────────────
// type: 'boss' | 'agent', targetId: agentId or null for boss
function openTeamPicker(type, targetId, onDone) {
  // Get all already-assigned IDs
  const assignedIds = new Set([...state.gang.bossTeam]);
  for (const a of state.agents) a.team.forEach(id => assignedIds.add(id));
  const available = state.pokemons
    .filter(p => !assignedIds.has(p.id))
    .sort((a, b) => getPokemonPower(b) - getPokemonPower(a));

  if (available.length === 0) {
    notify(state.lang === 'fr' ? 'Aucun Pokémon disponible' : 'No Pokémon available');
    return;
  }

  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'teamPickerOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease';

  const targetLabel = type === 'boss'
    ? (state.lang === 'fr' ? 'Équipe du Boss' : 'Boss Team')
    : (state.agents.find(a => a.id === targetId)?.name || 'Agent');

  let listHtml = available.slice(0, 30).map(p => {
    const power = getPokemonPower(p);
    return `<div class="picker-pokemon" data-pick-id="${p.id}" style="display:flex;align-items:center;gap:8px;padding:8px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s">
      <img src="${pokeSprite(p.species_en, p.shiny)}" style="width:40px;height:40px">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px">${speciesName(p.species_en)} ${'★'.repeat(p.potential)}${p.shiny ? ' ✨' : ''}</div>
        <div style="font-size:10px;color:var(--text-dim)">Lv.${p.level} — PC: ${power}</div>
      </div>
    </div>`;
  }).join('');

  overlay.innerHTML = `<div style="background:var(--bg-panel);border:2px solid var(--border);border-radius:var(--radius);width:90%;max-width:400px;max-height:70vh;display:flex;flex-direction:column">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:2px solid var(--border)">
      <div style="font-family:var(--font-pixel);font-size:10px;color:var(--gold)">${state.lang === 'fr' ? 'Choisir un Pokémon' : 'Choose a Pokémon'} → ${targetLabel}</div>
      <button id="btnClosePicker" style="background:none;border:none;color:var(--text-dim);font-size:20px;cursor:pointer;line-height:1">&times;</button>
    </div>
    <div style="overflow-y:auto;flex:1">${listHtml}</div>
  </div>`;

  document.body.appendChild(overlay);

  // Close
  overlay.querySelector('#btnClosePicker').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  // Pick handler
  overlay.querySelectorAll('[data-pick-id]').forEach(el => {
    el.addEventListener('click', () => {
      const pkId = el.dataset.pickId;
      const pk = state.pokemons.find(p => p.id === pkId);
      if (!pk) return;
      if (type === 'boss') {
        if (state.gang.bossTeam.length < 3) {
          state.gang.bossTeam.push(pkId);
        }
      } else {
        const agent = state.agents.find(a => a.id === targetId);
        if (agent && agent.team.length < 3) {
          agent.team.push(pkId);
        }
      }
      saveState();
      overlay.remove();
      notify(`${speciesName(pk.species_en)} → ${targetLabel}`, 'success');
      if (onDone) onDone();
    });
  });
}

// Assign a pokemon to a team from PC (shows picker for destination)
function openAssignToPicker(pokemonId) {
  const pk = state.pokemons.find(p => p.id === pokemonId);
  if (!pk) return;

  // Check if already assigned
  const assignedIds = new Set([...state.gang.bossTeam]);
  for (const a of state.agents) a.team.forEach(id => assignedIds.add(id));
  if (assignedIds.has(pokemonId)) {
    notify(state.lang === 'fr' ? 'Déjà dans une équipe !' : 'Already in a team!');
    return;
  }

  // Build list of destinations (Boss + all agents with < 3 team members)
  const destinations = [];
  if (state.gang.bossTeam.length < 3) {
    destinations.push({ type: 'boss', id: null, label: state.gang.bossName + ' (Boss)', sprite: state.gang.bossSprite ? trainerSprite(state.gang.bossSprite) : null });
  }
  for (const a of state.agents) {
    if (a.team.length < 3) {
      destinations.push({ type: 'agent', id: a.id, label: a.name, sprite: a.sprite });
    }
  }

  if (destinations.length === 0) {
    notify(state.lang === 'fr' ? 'Toutes les équipes sont pleines !' : 'All teams are full!');
    return;
  }

  const overlay = document.createElement('div');
  overlay.id = 'teamPickerOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease';

  let listHtml = destinations.map(d => `
    <div class="picker-dest" data-dest-type="${d.type}" data-dest-id="${d.id || ''}" style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s">
      ${d.sprite ? `<img src="${d.sprite}" style="width:40px;height:40px;image-rendering:pixelated">` : '<div style="width:40px;height:40px;background:var(--bg);border-radius:4px;display:flex;align-items:center;justify-content:center">👤</div>'}
      <div style="font-size:12px">${d.label}</div>
      <div style="font-size:10px;color:var(--text-dim);margin-left:auto">${d.type === 'boss' ? state.gang.bossTeam.length : state.agents.find(a => a.id === d.id)?.team.length || 0}/3</div>
    </div>
  `).join('');

  overlay.innerHTML = `<div style="background:var(--bg-panel);border:2px solid var(--border);border-radius:var(--radius);width:90%;max-width:360px;max-height:60vh;display:flex;flex-direction:column">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:2px solid var(--border)">
      <div style="font-family:var(--font-pixel);font-size:10px;color:var(--gold)">${speciesName(pk.species_en)} → ?</div>
      <button id="btnClosePicker" style="background:none;border:none;color:var(--text-dim);font-size:20px;cursor:pointer;line-height:1">&times;</button>
    </div>
    <div style="overflow-y:auto;flex:1">${listHtml}</div>
  </div>`;

  document.body.appendChild(overlay);
  overlay.querySelector('#btnClosePicker').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  overlay.querySelectorAll('.picker-dest').forEach(el => {
    el.addEventListener('click', () => {
      const destType = el.dataset.destType;
      const destId = el.dataset.destId;
      if (destType === 'boss') {
        if (state.gang.bossTeam.length < 3) state.gang.bossTeam.push(pokemonId);
      } else {
        const agent = state.agents.find(a => a.id === destId);
        if (agent && agent.team.length < 3) agent.team.push(pokemonId);
      }
      saveState();
      overlay.remove();
      const destLabel = destType === 'boss' ? state.gang.bossName : (state.agents.find(a => a.id === destId)?.name || 'Agent');
      notify(`${speciesName(pk.species_en)} → ${destLabel}`, 'success');
      renderPCTab();
    });
  });
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
  const viewport = win.querySelector('.zone-viewport') || win;

  const el = document.createElement('div');
  el.className = 'zone-spawn pop';
  el.dataset.spawnId = spawnObj.id;

  // Random position (relative to viewport size)
  const x = randInt(10, 310);
  const y = randInt(10, 160);
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
    el.innerHTML = `<div class="chest-sprite">📦</div>`;
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

  viewport.appendChild(el);
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
  const viewport = win.querySelector('.zone-viewport') || win;

  // Find thrower position (boss or agent sprite in zone)
  const bossEl = viewport.querySelector('.zone-boss');
  const agentEl = viewport.querySelector('.zone-agent');
  const thrower = bossEl || agentEl;
  let startX, startY;
  if (thrower) {
    const r = thrower.getBoundingClientRect();
    const wr = viewport.getBoundingClientRect();
    startX = r.left - wr.left + r.width / 2;
    startY = r.top - wr.top;
  } else {
    // Default: bottom-right corner
    startX = 340;
    startY = 190;
  }
  const targetX = parseInt(spawnEl.style.left) + 28;
  const targetY = parseInt(spawnEl.style.top) + 28;

  // Create ball projectile
  const ball = document.createElement('div');
  ball.className = 'ball-projectile';
  ball.innerHTML = `<img src="${BALL_SPRITES[state.activeBall] || BALL_SPRITES.pokeball}">`;
  ball.style.left = startX + 'px';
  ball.style.top = startY + 'px';
  viewport.appendChild(ball);

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
      showCaptureBurst(viewport, targetX, targetY, caught.potential, caught.shiny);
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
  // Pick player team: combine all agents in zone + boss team (up to 3 per person)
  const zoneAgents = state.agents.filter(a => a.assignedZone === zoneId);
  let allAllyIds = [];
  // Boss team first
  if (state.gang.bossZone === zoneId && state.gang.bossTeam.length > 0) {
    allAllyIds.push(...state.gang.bossTeam);
  }
  // Agent teams
  for (const agent of zoneAgents) {
    allAllyIds.push(...agent.team);
  }
  // Fallback: top 3 available pokemon if no team assigned
  if (allAllyIds.length === 0) {
    allAllyIds = state.pokemons
      .filter(p => p.cooldown <= 0)
      .sort((a, b) => getPokemonPower(b) - getPokemonPower(a))
      .slice(0, 3)
      .map(p => p.id);
  }
  const available = allAllyIds
    .map(id => state.pokemons.find(p => p.id === id))
    .filter(p => p && p.cooldown <= 0);

  if (available.length === 0) {
    notify(state.lang === 'fr' ? 'Aucun Pokémon disponible !' : 'No Pokémon available!');
    return;
  }

  currentCombat = { zoneId, spawnObj, playerTeam: available };

  const dialogue = getTrainerDialogue();
  const trainerName = state.lang === 'fr' ? spawnObj.trainer.fr : spawnObj.trainer.en;

  // Show ally (first pokemon) vs enemy (first enemy)
  const ally = available[0];
  const enemy = spawnObj.team[0];

  // Try inline combat first
  const inlineCombat = document.getElementById(`zc-${zoneId}`);
  if (inlineCombat) {
    // Build multi-ally sprite display
    const allySprites = available.slice(0, 3).map(p =>
      `<img src="${pokeSpriteBack(p.species_en, p.shiny)}" style="width:48px;height:48px" alt="${speciesName(p.species_en)}">`
    ).join('');

    inlineCombat.innerHTML = `
      <div class="combat-title" data-zone-combat-toggle="${zoneId}">⚔ ${trainerName}</div>
      <div class="combat-arena">
        <div class="combatant" id="inlineAlly-${zoneId}">
          ${allySprites}
          <div class="hp-bar"><div class="hp-fill" style="width:100%"></div></div>
        </div>
        <div class="combat-vs">VS</div>
        <div class="combatant" id="inlineEnemy-${zoneId}">
          <img src="${pokeSprite(enemy.species_en)}" style="width:64px;height:64px">
          <div class="hp-bar"><div class="hp-fill" style="width:100%"></div></div>
        </div>
      </div>
      <div class="combat-log-inline" id="inlineLog-${zoneId}"><div>"${dialogue}"</div></div>
      <div class="combat-actions-inline" id="inlineActions-${zoneId}">
        <button class="inline-fight-btn" data-zone-fight="${zoneId}">${state.lang === 'fr' ? '⚔ Combattre' : '⚔ Fight'}</button>
        <button class="inline-flee-btn" data-zone-flee="${zoneId}">${state.lang === 'fr' ? '🏃 Fuir' : '🏃 Flee'}</button>
      </div>
      <div class="combat-summary"></div>
    `;
    inlineCombat.classList.add('active');
    inlineCombat.classList.remove('collapsed');

    // Bind inline fight/flee
    inlineCombat.querySelector(`[data-zone-fight="${zoneId}"]`)?.addEventListener('click', executeCombat);
    inlineCombat.querySelector(`[data-zone-flee="${zoneId}"]`)?.addEventListener('click', closeCombatPopup);
    inlineCombat.querySelector(`[data-zone-combat-toggle="${zoneId}"]`)?.addEventListener('click', () => {
      inlineCombat.classList.toggle('collapsed');
    });
    return;
  }

  // Fallback: use the overlay popup
  const popup = document.getElementById('combatPopup');
  if (!popup) return;

  const allyImg = popup.querySelector('#combatAlly img');
  const enemyImg = popup.querySelector('#combatEnemy img');
  if (allyImg) allyImg.src = pokeSpriteBack(ally.species_en, ally.shiny);
  if (enemyImg) enemyImg.src = pokeSprite(enemy.species_en);

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

  // Check for inline combat first
  const inlineCombat = document.getElementById(`zc-${zoneId}`);
  if (inlineCombat && inlineCombat.classList.contains('active')) {
    const logEl = document.getElementById(`inlineLog-${zoneId}`);
    const actionsEl = document.getElementById(`inlineActions-${zoneId}`);
    const summary = inlineCombat.querySelector('.combat-summary');

    if (result.win) {
      const enemyCombatant = document.getElementById(`inlineEnemy-${zoneId}`);
      if (enemyCombatant) enemyCombatant.classList.add('shake');
      const enemyHp = enemyCombatant?.querySelector('.hp-fill');
      if (enemyHp) { enemyHp.style.width = '0%'; enemyHp.classList.add('critical'); }
      if (logEl) logEl.innerHTML += `<div style="color:var(--green)">${t('combat_win', { money: result.reward, rep: result.repGain })}</div>`;
      if (summary) summary.innerHTML = `<span style="color:var(--green)">⚔ VICTOIRE +${result.reward}₽</span>`;
    } else {
      const allyCombatant = document.getElementById(`inlineAlly-${zoneId}`);
      if (allyCombatant) allyCombatant.classList.add('shake');
      const allyHp = allyCombatant?.querySelector('.hp-fill');
      if (allyHp) { allyHp.style.width = '0%'; allyHp.classList.add('critical'); }
      if (logEl) logEl.innerHTML += `<div style="color:var(--red)">${t('combat_lose')}</div>`;
      if (summary) summary.innerHTML = `<span style="color:var(--red)">⚔ DEFAITE</span>`;
    }

    if (actionsEl) {
      actionsEl.innerHTML = `<button class="inline-close-btn" data-zone-close="${zoneId}">OK</button>`;
      actionsEl.querySelector(`[data-zone-close="${zoneId}"]`)?.addEventListener('click', () => {
        inlineCombat.classList.remove('active');
        removeSpawn(zoneId, spawnObj.id);
        updateTopBar();
        currentCombat = null;
        if (activeTab === 'tabGang') renderGangTab();
      });
    }
    return;
  }

  // Fallback: overlay popup
  const popup = document.getElementById('combatPopup');
  const logEl = document.getElementById('combatLog');
  const actionsEl = document.getElementById('combatActions');

  if (result.win) {
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
  // Close inline combat if active
  if (currentCombat) {
    const inlineCombat = document.getElementById(`zc-${currentCombat.zoneId}`);
    if (inlineCombat) inlineCombat.classList.remove('active');
  }
  const popup = document.getElementById('combatPopup');
  if (popup) popup.classList.remove('active');
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

  // Build set of pokemon IDs assigned to teams
  const teamPokemonIds = new Set();
  for (const agent of state.agents) {
    agent.team.forEach(id => teamPokemonIds.add(id));
  }
  if (state.gang.bossTeam) {
    state.gang.bossTeam.forEach(id => teamPokemonIds.add(id));
  }

  // Filter OUT team pokemon entirely
  const sellable = state.pokemons.filter(p => !teamPokemonIds.has(p.id));

  const sortFns = {
    price:     (a, b) => calculatePrice(b) - calculatePrice(a),
    name:      (a, b) => speciesName(a.species_en).localeCompare(speciesName(b.species_en)),
    level:     (a, b) => b.level - a.level,
    potential: (a, b) => (b.potential + (b.shiny ? 10 : 0)) - (a.potential + (a.shiny ? 10 : 0)),
    recent:    (a, b) => state.pokemons.indexOf(b) - state.pokemons.indexOf(a),
  };
  const sorted = [...sellable].sort(sortFns[sellSort] || sortFns.price);

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
  if (sorted.length === 0) {
    panel.innerHTML = sortBar + '<div style="color:var(--text-dim);padding:12px;text-align:center">' + (state.lang === 'fr' ? 'Aucun Pokémon à vendre (hors équipes)' : 'No Pokémon to sell (excluding teams)') + '</div>';
  } else {
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
  }

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
        if (selectedForSale.size >= sorted.length) {
          selectedForSale.clear();
        } else {
          sorted.forEach(p => selectedForSale.add(p.id));
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

function renderEvolutionPanel(p) {
  const evos = EVO_BY_SPECIES[p.species_en];
  if (!evos || evos.length === 0) return '';
  let html = '<div style="margin-top:12px;padding-top:8px;border-top:1px solid var(--border)">';
  html += '<div style="font-size:10px;color:var(--text-dim);margin-bottom:6px">' + (state.lang === 'fr' ? 'Évolution' : 'Evolution') + '</div>';
  for (const evo of evos) {
    const targetSp = SPECIES_BY_EN[evo.to];
    if (!targetSp) continue;
    const targetName = state.lang === 'fr' ? targetSp.fr : evo.to;
    if (evo.req === 'item') {
      const hasStone = (state.inventory.evostone || 0) > 0;
      html += '<div style="display:flex;align-items:center;gap:8px;margin-top:6px">'
        + '<img src="' + pokeSprite(evo.to) + '" style="width:32px;height:32px;opacity:' + (hasStone ? 1 : 0.4) + '">'
        + '<div style="flex:1;font-size:10px">' + targetName + '</div>'
        + '<button class="btn-evolve-item" data-evo-target="' + evo.to + '" style="font-size:9px;padding:4px 10px;background:' + (hasStone ? 'var(--gold-dim)' : 'var(--bg)') + ';border:1px solid ' + (hasStone ? 'var(--gold)' : 'var(--border)') + ';border-radius:var(--radius-sm);color:' + (hasStone ? 'var(--bg)' : 'var(--text-dim)') + ';cursor:' + (hasStone ? 'pointer' : 'default') + '"' + (hasStone ? '' : ' disabled') + '>💎 ' + (state.lang === 'fr' ? 'Évoluer' : 'Evolve') + '</button>'
        + '</div>';
    } else {
      const ready = p.level >= evo.req;
      html += '<div style="display:flex;align-items:center;gap:8px;margin-top:6px">'
        + '<img src="' + pokeSprite(evo.to) + '" style="width:32px;height:32px;opacity:' + (ready ? 1 : 0.4) + '">'
        + '<div style="flex:1;font-size:10px">' + targetName + ' (Lv.' + evo.req + ')</div>';
      if (ready) {
        html += '<button class="btn-evolve-level" data-evo-target="' + evo.to + '" style="font-size:9px;padding:4px 10px;background:var(--green);border:1px solid var(--green);border-radius:var(--radius-sm);color:var(--bg);cursor:pointer">' + (state.lang === 'fr' ? 'Évoluer!' : 'Evolve!') + '</button>';
      } else {
        html += '<span style="font-size:9px;color:var(--text-dim)">Lv.' + p.level + '/' + evo.req + '</span>';
      }
      html += '</div>';
    }
  }
  html += '</div>';
  return html;
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
    ${(() => {
      // Check if in a team
      const inBossTeam = state.gang.bossTeam.includes(p.id);
      const inAgentTeam = state.agents.find(a => a.team.includes(p.id));
      const teamLabel = inBossTeam ? (state.lang === 'fr' ? 'Équipe Boss' : 'Boss Team')
        : inAgentTeam ? (state.lang === 'fr' ? 'Équipe ' + inAgentTeam.name : inAgentTeam.name + ' Team')
        : null;
      if (teamLabel) {
        return '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px"><button style="flex:1;font-size:10px;padding:6px;background:var(--bg);border:1px solid var(--gold-dim);border-radius:var(--radius-sm);color:var(--gold);cursor:pointer" id="btnRemoveFromTeam">🔓 ' + (state.lang === 'fr' ? 'Retirer de ' : 'Remove from ') + teamLabel + '</button></div>';
      }
      return '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px"><button style="flex:1;font-size:10px;padding:6px;background:var(--bg);border:1px solid var(--green);border-radius:var(--radius-sm);color:var(--green);cursor:pointer" id="btnAssignTo">📋 ' + (state.lang === 'fr' ? 'Attribuer à...' : 'Assign to...') + '</button></div>';
    })()}
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button style="flex:1;font-size:10px;padding:6px;background:var(--red-dark);border:1px solid var(--red);border-radius:var(--radius-sm);color:var(--text);cursor:pointer" id="btnSellOne">${t('sell')} (${price}₽)</button>
      <button style="flex:1;font-size:10px;padding:6px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-dim);cursor:pointer" id="btnRelease">${t('release')}</button>
    </div>
    ${renderEvolutionPanel(p)}
    ${renderPokemonHistory(p)}
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
    state.gang.bossTeam = state.gang.bossTeam.filter(id => id !== p.id);
    state.pokemons = state.pokemons.filter(pk => pk.id !== p.id);
    pcSelectedId = null;
    saveState();
    renderPCTab();
  });
  document.getElementById('btnAssignTo')?.addEventListener('click', () => {
    openAssignToPicker(p.id);
  });
  document.getElementById('btnRemoveFromTeam')?.addEventListener('click', () => {
    // Remove from all teams
    state.gang.bossTeam = state.gang.bossTeam.filter(id => id !== p.id);
    for (const agent of state.agents) {
      agent.team = agent.team.filter(id => id !== p.id);
    }
    saveState();
    renderPCTab();
    notify(state.lang === 'fr' ? 'Retiré de l\'équipe' : 'Removed from team', 'success');
  });

  // Evolution buttons
  panel.querySelectorAll('.btn-evolve-level').forEach(btn => {
    btn.addEventListener('click', () => {
      evolvePokemon(p, btn.dataset.evoTarget);
      renderPCTab();
    });
  });
  panel.querySelectorAll('.btn-evolve-item').forEach(btn => {
    btn.addEventListener('click', () => {
      if ((state.inventory.evostone || 0) <= 0) return;
      state.inventory.evostone--;
      evolvePokemon(p, btn.dataset.evoTarget);
      renderPCTab();
    });
  });
}

// ── Pokemon History ──────────────────────────────────────────
function renderPokemonHistory(pokemon) {
  if (!pokemon.history || pokemon.history.length === 0) return '';
  const entries = pokemon.history.slice(-10).reverse().map(h => {
    const date = new Date(h.ts);
    const timeStr = date.toLocaleTimeString(state.lang === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    switch (h.type) {
      case 'captured': {
        const zDef = ZONE_BY_ID[h.zone];
        const zName = zDef ? (state.lang === 'fr' ? zDef.fr : zDef.en) : h.zone;
        const ballName = BALLS[h.ball] ? (state.lang === 'fr' ? BALLS[h.ball].fr : BALLS[h.ball].en) : h.ball;
        return `<div class="history-entry">${timeStr} — ${state.lang === 'fr' ? 'Capturé' : 'Captured'} (${ballName}) @ ${zName}</div>`;
      }
      case 'combat':
        return `<div class="history-entry">${timeStr} — ${h.won ? (state.lang === 'fr' ? 'Combat gagné' : 'Won battle') : (state.lang === 'fr' ? 'Combat perdu' : 'Lost battle')}</div>`;
      case 'levelup':
        return `<div class="history-entry">${timeStr} — ${state.lang === 'fr' ? 'Niveau' : 'Level'} ${h.level}</div>`;
      case 'evolved':
        return `<div class="history-entry" style="color:var(--gold)">${timeStr} — ${h.from} → ${h.to} ✨</div>`;
      default:
        return `<div class="history-entry">${timeStr} — ${h.type}</div>`;
    }
  }).join('');
  return `<div class="pokemon-history">
    <div class="history-title">${state.lang === 'fr' ? '📜 Historique' : '📜 History'}</div>
    ${entries}
  </div>`;
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
// 18b. UI — AGENTS TAB
// ════════════════════════════════════════════════════════════════

function renderAgentsTab() {
  const grid = document.getElementById('agentsGrid');
  if (!grid) return;

  const unlockedZones = ZONES.filter(z => isZoneUnlocked(z.id));
  const RECRUIT_COST = 2000 + state.agents.length * 1500;

  let html = '';
  // Existing agents
  for (const a of state.agents) {
    const xpNeeded = a.level * 30;
    const xpPct = Math.min(100, (a.xp / xpNeeded) * 100);
    const zoneOptions = unlockedZones.map(z =>
      `<option value="${z.id}" ${a.assignedZone === z.id ? 'selected' : ''}>${state.lang === 'fr' ? z.fr : z.en}</option>`
    ).join('');

    // Team slots
    const teamSlots = [0, 1, 2].map(i => {
      const pkId = a.team[i];
      const pk = pkId ? state.pokemons.find(p => p.id === pkId) : null;
      if (pk) {
        return `<div class="agent-team-slot filled" data-agent-team="${a.id}" data-slot="${i}" title="${speciesName(pk.species_en)} Lv.${pk.level}">
          <img src="${pokeSprite(pk.species_en, pk.shiny)}">
        </div>`;
      }
      return `<div class="agent-team-slot" data-agent-team="${a.id}" data-slot="${i}" title="${state.lang === 'fr' ? 'Assigner' : 'Assign'}">+</div>`;
    }).join('');

    html += `<div class="agent-card-full" data-agent-id="${a.id}">
      <div class="agent-header">
        <img src="${a.sprite}" alt="${a.name}">
        <div class="agent-meta">
          <div class="agent-name">${a.name}</div>
          <div class="agent-title">${a.title} — Lv.${a.level}</div>
          <div class="agent-xp-bar"><div class="agent-xp-fill" style="width:${xpPct}%"></div></div>
        </div>
      </div>
      <div class="agent-stats-row">
        <span>⚔ ${a.stats.combat}</span>
        <span>🎯 ${a.stats.capture}</span>
        <span>🍀 ${a.stats.luck}</span>
      </div>
      <div style="font-size:9px">
        <select class="agents-zone-select" data-agent-id="${a.id}" style="background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:4px;font-size:9px;padding:2px 4px;width:100%">
          <option value="">— ${state.lang === 'fr' ? 'Aucune zone' : 'No zone'} —</option>
          ${zoneOptions}
        </select>
      </div>
      <div class="agent-team-slots">${teamSlots}</div>
      <div class="agent-personality">${a.personality.join(', ')}</div>
      <label class="agent-notify-toggle">
        <input type="checkbox" class="agent-notify-cb" data-agent-id="${a.id}" ${a.notifyCaptures !== false ? 'checked' : ''}>
        ${a.notifyCaptures !== false ? '🔔' : '🔕'} Notifications
      </label>
    </div>`;
  }

  // Recruit button at end
  html += `<div class="agent-card-full" style="display:flex;align-items:center;justify-content:center;cursor:pointer;border:2px dashed var(--border-light);min-height:120px" id="btnRecruitAgentFull">
    <div style="text-align:center">
      <div style="font-size:28px">➕</div>
      <div style="font-family:var(--font-pixel);font-size:9px;color:var(--text);margin-top:6px">${state.lang === 'fr' ? 'Recruter' : 'Recruit'}</div>
      <div style="font-size:10px;color:var(--gold)">₽ ${RECRUIT_COST.toLocaleString()}</div>
    </div>
  </div>`;

  grid.innerHTML = html;

  // Bind events
  // Recruit
  document.getElementById('btnRecruitAgentFull')?.addEventListener('click', () => {
    const cost = 2000 + state.agents.length * 1500;
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
    renderAgentsTab();
  });

  // Zone assignment
  grid.querySelectorAll('.agents-zone-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      assignAgentToZone(e.target.dataset.agentId, e.target.value || null);
      if (activeTab === 'tabZones') renderZoneWindows();
    });
  });

  // Team slot clicks
  grid.querySelectorAll('[data-agent-team]').forEach(slot => {
    slot.addEventListener('click', () => {
      const agentId = slot.dataset.agentTeam;
      const slotIdx = parseInt(slot.dataset.slot);
      const agent = state.agents.find(a => a.id === agentId);
      if (!agent) return;
      const pkId = agent.team[slotIdx];
      if (pkId) {
        // Remove from team
        agent.team.splice(slotIdx, 1);
        saveState();
        renderAgentsTab();
      } else {
        // Show picker
        openTeamPicker('agent', agentId, () => renderAgentsTab());
      }
    });
  });

  // Notification toggle
  grid.querySelectorAll('.agent-notify-cb').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const agent = state.agents.find(a => a.id === e.target.dataset.agentId);
      if (agent) {
        agent.notifyCaptures = e.target.checked;
        saveState();
        renderAgentsTab();
      }
    });
  });
}

// ════════════════════════════════════════════════════════════════
// 18c. UI — MISSIONS TAB
// ════════════════════════════════════════════════════════════════

function renderMissionsTab() {
  const el = document.getElementById('tabMissions');
  if (!el) return;
  initMissions();

  const renderSection = (title, missions) => {
    let html = `<div style="margin-bottom:20px">
      <h3 style="font-family:var(--font-pixel);font-size:11px;color:var(--gold);margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--border)">${title}</h3>`;
    for (const m of missions) {
      const progress = getMissionProgress(m);
      const complete = isMissionComplete(m);
      const claimed = isMissionClaimed(m);
      const pct = Math.min(100, (progress / m.target) * 100);
      const name = state.lang === 'fr' ? m.fr : m.en;
      const rewardStr = [];
      if (m.reward.money) rewardStr.push(m.reward.money.toLocaleString() + '₽');
      if (m.reward.rep) rewardStr.push('+' + m.reward.rep + ' rep');

      html += `<div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:1px solid var(--border);opacity:${claimed ? '.5' : '1'}">
        <span style="font-size:20px">${m.icon}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;${claimed ? 'text-decoration:line-through' : ''}">${name}</div>
          ${m.desc_fr ? `<div style="font-size:9px;color:var(--text-dim);margin-top:2px">${state.lang === 'fr' ? m.desc_fr : m.desc_en}</div>` : ''}
          <div style="background:var(--bg);border-radius:3px;height:6px;margin-top:4px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:${complete ? 'var(--green)' : 'var(--red)'};transition:width .3s"></div>
          </div>
          <div style="font-size:9px;color:var(--text-dim);margin-top:2px">${progress}/${m.target} — ${rewardStr.join(', ')}</div>
        </div>
        ${complete && !claimed
          ? `<button class="btn-claim-mission" data-mission-id="${m.id}" style="font-family:var(--font-pixel);font-size:9px;padding:6px 12px;background:var(--green);border:1px solid var(--green);border-radius:var(--radius-sm);color:var(--bg);cursor:pointer;white-space:nowrap;animation:glow 1.5s ease-in-out infinite">${state.lang === 'fr' ? 'Récupérer' : 'Claim'}</button>`
          : claimed
          ? '<span style="font-size:9px;color:var(--green)">✓</span>'
          : ''}
      </div>`;
    }
    html += '</div>';
    return html;
  };

  // Daily reset countdown
  const dailyRem = Math.max(0, 86400000 - (Date.now() - state.missions.daily.reset));
  const dailyH = Math.floor(dailyRem / 3600000);
  const dailyM = Math.floor((dailyRem % 3600000) / 60000);
  const weeklyRem = Math.max(0, 604800000 - (Date.now() - state.missions.weekly.reset));
  const weeklyD = Math.floor(weeklyRem / 86400000);
  const weeklyH = Math.floor((weeklyRem % 86400000) / 3600000);

  const dailyMissions = MISSIONS.filter(m => m.type === 'daily');
  const weeklyMissions = MISSIONS.filter(m => m.type === 'weekly');
  const storyMissions = MISSIONS.filter(m => m.type === 'story');
  const unclaimedStory = storyMissions.filter(m => !isMissionClaimed(m));
  const claimedStory = storyMissions.filter(m => isMissionClaimed(m));

  let content = '';
  content += renderSection(
    `${state.lang === 'fr' ? 'Missions Quotidiennes' : 'Daily Missions'} (${dailyH}h${String(dailyM).padStart(2,'0')})`,
    dailyMissions
  );
  content += renderSection(
    `${state.lang === 'fr' ? 'Missions Hebdomadaires' : 'Weekly Missions'} (${weeklyD}j ${weeklyH}h)`,
    weeklyMissions
  );
  if (unclaimedStory.length > 0) {
    content += renderSection(
      state.lang === 'fr' ? 'Histoire & Objectifs' : 'Story & Objectives',
      unclaimedStory
    );
  }
  if (claimedStory.length > 0) {
    content += renderSection(
      state.lang === 'fr' ? 'Terminés' : 'Completed',
      claimedStory
    );
  }

  el.innerHTML = `<div style="padding:12px">${content}</div>`;

  // Claim buttons
  el.querySelectorAll('.btn-claim-mission').forEach(btn => {
    btn.addEventListener('click', () => {
      const mission = MISSIONS.find(m => m.id === btn.dataset.missionId);
      if (mission) {
        claimMission(mission);
        renderMissionsTab();
      }
    });
  });
}

// ════════════════════════════════════════════════════════════════
// 18d. UI — BAG TAB
// ════════════════════════════════════════════════════════════════

function renderBagTab() {
  const grid = document.getElementById('bagGrid');
  if (!grid) return;

  const items = [
    { id: 'pokeball',  icon: '⚪', fr: 'Poké Ball',      en: 'Poké Ball',      desc_fr: 'Ball standard',         desc_en: 'Standard ball' },
    { id: 'greatball', icon: '🔵', fr: 'Super Ball',     en: 'Great Ball',     desc_fr: 'Meilleur potentiel',    desc_en: 'Better potential' },
    { id: 'ultraball', icon: '🟡', fr: 'Hyper Ball',     en: 'Ultra Ball',     desc_fr: 'Excellent potentiel',   desc_en: 'Excellent potential' },
    { id: 'duskball',  icon: '🟣', fr: 'Sombre Ball',    en: 'Dusk Ball',      desc_fr: 'Potentiel équilibré',   desc_en: 'Balanced potential' },
    { id: 'lure',      icon: '🪝', fr: 'Leurre',         en: 'Lure',           desc_fr: 'x2 spawns 60s',         desc_en: 'x2 spawns 60s',      usable: true },
    { id: 'superlure', icon: '🪝', fr: 'Super Leurre',   en: 'Super Lure',     desc_fr: 'x3 spawns 60s',         desc_en: 'x3 spawns 60s',      usable: true },
    { id: 'potion',    icon: '💊', fr: 'Potion',         en: 'Potion',         desc_fr: 'Retire cooldown',       desc_en: 'Remove cooldown',    usable: true },
    { id: 'incense',   icon: '🔮', fr: 'Encens Chance',  en: 'Lucky Incense',  desc_fr: '★+1 potentiel 90s',     desc_en: '★+1 potential 90s',  usable: true },
    { id: 'rarescope', icon: '🔭', fr: 'Rarioscope',     en: 'Rare Scope',     desc_fr: 'Spawns rares x3 90s',   desc_en: 'Rare spawns x3 90s', usable: true },
    { id: 'aura',      icon: '✨', fr: 'Aura Shiny',     en: 'Shiny Aura',     desc_fr: 'Shiny x5 90s',          desc_en: 'Shiny x5 90s',      usable: true },
    { id: 'evostone',  icon: '💎', fr: 'Pierre Évolution',en:'Evolution Stone', desc_fr: 'Évolution par pierre',  desc_en: 'Stone evolution' },
    { id: 'rarecandy', icon: '🍬', fr: 'Super Bonbon',   en: 'Rare Candy',     desc_fr: '+5 niveaux',             desc_en: '+5 levels',          usable: true },
    { id: 'masterball',icon: '🔴', fr: 'Master Ball',    en: 'Master Ball',    desc_fr: '★★★★★ garanti',         desc_en: '★★★★★ guaranteed' },
  ];

  grid.innerHTML = items.map(item => {
    const qty = state.inventory[item.id] || 0;
    const name = state.lang === 'fr' ? item.fr : item.en;
    const desc = state.lang === 'fr' ? item.desc_fr : item.desc_en;
    const active = isBoostActive(item.id);
    const remaining = active ? boostRemaining(item.id) : 0;
    return `<div class="bag-item" ${active ? 'style="border-color:var(--gold)"' : ''}>
      <span class="bag-icon">${item.icon}</span>
      <div class="bag-info">
        <div class="bag-name">${name}</div>
        <div class="bag-qty">x${qty}${active ? ` (${remaining}s)` : ''}</div>
        <div class="bag-desc">${desc}</div>
      </div>
      ${item.usable && qty > 0 ? `<button class="bag-use-btn" data-use-item="${item.id}">${state.lang === 'fr' ? 'Utiliser' : 'Use'}</button>` : ''}
    </div>`;
  }).join('');

  // Active ball selector
  grid.innerHTML += `
    <div class="bag-item" style="grid-column:1/-1;border-color:var(--gold-dim)">
      <span class="bag-icon">🎯</span>
      <div class="bag-info">
        <div class="bag-name">${state.lang === 'fr' ? 'Ball active' : 'Active Ball'}</div>
        <div class="bag-desc">${state.lang === 'fr' ? 'Ball utilisée pour les captures' : 'Ball used for captures'}</div>
      </div>
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        ${Object.entries(BALLS).map(([key, ball]) => `
          <button style="font-size:9px;padding:3px 8px;border-radius:4px;cursor:pointer;
            background:${state.activeBall === key ? 'var(--red-dark)' : 'var(--bg)'};
            border:1px solid ${state.activeBall === key ? 'var(--red)' : 'var(--border)'};
            color:var(--text)" data-bag-ball="${key}">
            ${state.lang === 'fr' ? ball.fr : ball.en} (${state.inventory[key] || 0})
          </button>
        `).join('')}
      </div>
    </div>`;

  // Bind use buttons
  grid.querySelectorAll('[data-use-item]').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.dataset.useItem;
      if (itemId === 'potion') {
        // Remove cooldown from all pokemon
        let removed = 0;
        for (const p of state.pokemons) {
          if (p.cooldown > 0) { p.cooldown = 0; removed++; }
        }
        if (removed > 0) {
          state.inventory.potion--;
          notify(state.lang === 'fr' ? `Cooldown retiré de ${removed} Pokémon` : `Cooldown removed from ${removed} Pokémon`, 'success');
          saveState();
        } else {
          notify(state.lang === 'fr' ? 'Aucun Pokémon en cooldown' : 'No Pokémon on cooldown');
        }
      } else if (itemId === 'rarecandy') {
        // Use on strongest uncapped pokemon, or let player choose via team picker
        const best = state.pokemons
          .filter(p => p.level < 100)
          .sort((a, b) => getPokemonPower(b) - getPokemonPower(a));
        if (best.length > 0) {
          // Use on first available (strongest)
          const p = best[0];
          const oldLv = p.level;
          for (let i = 0; i < 5; i++) levelUpPokemon(p, p.level * 5);
          state.inventory.rarecandy--;
          notify(`🍬 ${speciesName(p.species_en)} Lv.${oldLv} → Lv.${p.level}`, 'gold');
          saveState();
        } else {
          notify(state.lang === 'fr' ? 'Tous les Pokémon sont au max !' : 'All Pokémon are maxed!');
        }
      } else if (activateBoost(itemId)) {
        notify(state.lang === 'fr' ? 'Boost activé !' : 'Boost activated!', 'success');
      }
      renderBagTab();
    });
  });

  // Ball selector
  grid.querySelectorAll('[data-bag-ball]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeBall = btn.dataset.bagBall;
      saveState();
      renderBagTab();
    });
  });
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
      const autoCombat = document.getElementById('settingAutoCombat');
      if (autoCombat) autoCombat.checked = state.settings.autoCombat !== false;
      const sfx = document.getElementById('settingSFX');
      if (sfx) sfx.checked = state.settings.sfxEnabled !== false;
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
    const autoCombat = document.getElementById('settingAutoCombat');
    if (autoCombat) state.settings.autoCombat = autoCombat.checked;
    const sfx = document.getElementById('settingSFX');
    if (sfx) state.settings.sfxEnabled = sfx.checked;
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
  // Agent automation every 2 seconds (agents interact with visible spawns)
  agentTickInterval = setInterval(agentTick, 2000);

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

  // Init missions
  initMissions();

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
