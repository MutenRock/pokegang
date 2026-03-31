# POKEFORGE v6 — Game Design Document (EN)

> **Version**: 6.0.0-draft
> **Last updated**: 2026-03-31
> **Genre**: Idle Clicker / Gang Management
> **Stack**: Vanilla JS, single-page, localStorage, Pokemon Showdown sprites
> **LLM**: Optional integration (local Ollama or remote API)

---

## 1. Pitch

You lead a **rival gang** trying to **overthrow Team Rocket** in the Kanto region. Catch Pokemon, recruit agents, conquer zones, and become the most powerful gang in the region.

The game is **click-based**: Pokemon and trainers appear in visual environments. Click to catch, fight, interact. As you progress, you recruit agents that automate the grind in conquered zones.

---

## 2. Identity and tone

- **Player**: Boss of a Pokemon gang rivaling Team Rocket
- **Tone**: Dark, humorous, parodic — we're the bad guys, but with style
- **Team Rocket**: Recurring antagonist, not our faction
- **Narrative progression**: Small local gang → serious rival → we supplant the Rockets
- **Bilingual**: All text exists in FR and EN, dynamic switching

---

## 3. Core Loop

```
Environment (spawn) → Click (catch/fight) → Collection → Sell/Assign
     ↑                                                       ↓
  Agents automate  ←  Recruitment  ←  Money/Progression  ←──┘
```

**Phase 1 — Solo farming**: The player manually clicks in zones to catch Pokemon and win fights.

**Phase 2 — Automation**: Recruited agents are assigned to mastered zones and grind automatically.

**Phase 3 — Empire**: The player manages their gang (black market, promotions, expansion, Rocket confrontation).

---

## 4. Interface

### 4.1. Tab navigation

| Tab | Content |
|-----|---------|
| 💀 Gang | Boss profile, agent list, promotions, gang stats |
| 🗺️ Zones | Zone navigation, mini-windows of open zones |
| 💰 Market | Black market (sell), shop (balls, lures, items) |
| 💻 PC | Grid of all owned Pokemon, sort/filter |
| 📖 Pokedex | Collection, progress, global stats |

### 4.2. Zone mini-windows

- Each open zone displays as a **mini-window** in the Zones tab
- The player can open **multiple zones** simultaneously
- Each mini-window shows:
  - Zone scenery (background + visual elements)
  - Spawning Pokemon/trainers/events
  - Assigned agent (if applicable)
  - Zone stats (mastery, remaining spawns)

---

## 5. Zone system

### 5.1. Zone types

**Simple zones**: Generic environments (forest, cave, swamp, plains)
**Lore zones**: Iconic Kanto locations (Route 1, Pallet Town, Celadon Casino, Pokemon Tower)

### 5.2. Unlocking

Each zone unlocks at a **reputation threshold**.

### 5.3. Mastery

- **Unmastered**: Only the player can go (manual clicks only)
- **Mastered (10 fights won)**: Can assign 1 agent
- **High mastery (50 fights)**: Can assign 2 agents
- **Max capacity**: 3 people per zone (player + 2 agents, or 3 agents without player)

### 5.4. Zone catalog (Gen 1 Kanto)

| Zone | Reputation | Pokemon Pool | Spawn/s | Events |
|------|-----------|-------------|---------|--------|
| Route 1 | 0 | Rattata, Pidgey, Caterpie | 0.15 | Youngsters, Lasses |
| Viridian Forest | 10 | Pikachu, Butterfree, Beedrill, Metapod | 0.12 | Bug catchers, rare bugs |
| Diglett's Cave | 25 | Diglett, Onix, Geodude, Zubat | 0.10 | Miners, cave-ins |
| Route 24/25 (Nugget Bridge) | 35 | Abra, Pidgey, Oddish | 0.12 | Trainer gauntlet |
| Pallet Town | 40 | Rattata, Pidgey + ultra rare starters | 0.08 | Prof Oak |
| Safari Zone | 50 | Kangaskhan, Tauros, Scyther, Pinsir | 0.10 | Wardens |
| Celadon Casino | 60 | Porygon, Abra, Clefairy | 0.10 | Team Rocket! |
| Pokemon Tower (Lavender) | 75 | Gastly, Haunter, Cubone | 0.08 | Channelers, ghosts |
| Seafoam Islands | 80 | Tentacool, Shellder, Staryu, Lapras (rare) | 0.10 | Swimmers |
| Silph Co. | 90 | Porygon, Electrode, Magnemite | 0.12 | Team Rocket raid |
| Unknown Cave | 100 | Mewtwo (ultra rare), Ditto, Kadabra | 0.05 | Nothing — endgame zone |

### 5.5. Spawns

- Each zone has a **spawn rate** (Pokemon appear at regular intervals)
- Pokemon have a **TTL** (time before disappearing, ~10-15s)
- Trainers spawn less often (~20% of spawns)
- Special events are rare (~5% of spawns)
- **Lures** (purchasable item): double spawn rate for X seconds

---

## 6. Pokemon — Variability

### 6.1. Each specimen is unique

```
{
  id, species_fr, species_en,
  level,          // 1-100
  nature,         // 1 of 10
  potential,      // ★1-5 (rolled at capture)
  shiny,          // bool (~1/200)
  moves,          // 2 from species pool
  capturedIn,     // capture zone
  stats,          // derived from base_stats + nature + potential
}
```

### 6.2. Natures (10)

| Nature | Bonus | Penalty |
|--------|-------|---------|
| Hardy | — | — |
| Brave | ATK +10% | SPD -10% |
| Timid | SPD +10% | ATK -10% |
| Bold | DEF +10% | ATK -10% |
| Jolly | SPD +10% | DEF -10% |
| Adamant | ATK +10% | SPD -10% |
| Calm | DEF +10% | SPD -10% |
| Modest | SPE +10% | ATK -10% |
| Careful | DEF +10% | SPE -10% |
| Naive | SPD +10% | DEF -10% |

### 6.3. Potential (★1-5) and Balls

Ball type affects the potential distribution at capture.

| Ball | Cost | ★1 | ★2 | ★3 | ★4 | ★5 |
|------|------|----|----|----|----|-----|
| Poke Ball | 200₽ | 40% | 30% | 20% | 8% | 2% |
| Great Ball | 600₽ | 15% | 30% | 30% | 18% | 7% |
| Ultra Ball | 2000₽ | 5% | 15% | 30% | 30% | 20% |
| Dusk Ball | 1500₽ | 20% | 20% | 20% | 20% | 20% |

### 6.4. Shiny

- Rate: ~1/200 (0.5%)
- Alternate sprite via Showdown (`/sprites/gen5-shiny/`)
- Special visual effect (particles, glow)
- Black market value x10
- Purely cosmetic (no stat bonus)

### 6.5. Moves

- 2 moves randomly drawn from the species pool at capture
- Each Gen1 species has a pool of 4-6 defined moves
- Moves influence combat power

### 6.6. Derived stats

```
final_stat = base_stat × (1 + potential × 0.1) × nature_modifier × (1 + level/100)
```

3 main stats: **ATK**, **DEF**, **SPD**

---

## 7. Catching

- **Click on a Pokemon** = instant capture (no failure)
- **Cost**: 1 ball consumed of the selected type
- **Active ball**: Player chooses which ball is "equipped" (quick switch)
- If player has no balls → can't catch (must buy more)
- Caught Pokemon receives random stats (nature, potential, shiny, moves)

---

## 8. Combat

### 8.1. Trigger

- A **trainer** spawns in the zone (appears with sprite + visible team)
- Player clicks to start the fight
- OR an assigned agent resolves it automatically

### 8.2. Resolution

- **Auto-resolution** based on stats
- Player/agent sends their team (1-3 Pokemon)
- Power = sum of team stats + agent bonus
- Quick animation (~3-5s): face-to-face sprites, HP bars, attacks, KOs
- Victory → XP (agent + Pokemon), money, reputation
- Defeat → Pokemon injured (cooldown), minor reputation loss

### 8.3. Trainer types

| Type | Difficulty | Reward |
|------|-----------|--------|
| Youngster/Lass | Easy | 50-150₽, +1 rep |
| Trainer | Medium | 200-500₽, +3 rep |
| Ranger/Expert | Hard | 500-1500₽, +5 rep |
| Rocket Grunt | Hard+ | 1000-3000₽, +10 rep, possible loot |
| Rocket Executive | Zone boss | 5000₽+, +25 rep, event unlock |
| Giovanni | Final boss | Huge, special title |

### 8.4. Team Rocket as enemy

- Rocket Grunts spawn in certain zones (Casino, Silph Co.)
- Frequency increases with player reputation (Rocket notices us)
- Beating Rockets = big rep + loot + narrative progression
- Special events: Rocket raids on zones we control

---

## 9. Agents — Gacha System

### 9.1. Recruitment

- **Random event**: a potential agent appears in a zone
- Player sees their stats and decides to recruit or not
- **Recruitment cost**: variable based on agent rarity
- Stats randomly rolled (gacha) — some agents are better than others

### 9.2. Agent stats

```
{
  id, name, sprite,
  title: 'Grunt',          // Grunt → Lieutenant → Captain
  level: 1,                // 1-100
  xp: 0,
  combatsWon: 0,
  stats: {
    capture: X,            // auto-capture speed
    combat: X,             // combat power
    luck: X,               // better drops/potential chance
  },
  team: [],                // max 3 Pokemon
  assignedZone: null,
  personality: ['...'],    // for LLM / flavor text
}
```

### 9.3. Titles and promotions

| Title | Condition | Bonus |
|-------|----------|-------|
| Grunt | — | None |
| Lieutenant | Lvl 50 + 25 fights won | +15% all stats |
| Captain | Lvl 75 + 200 fights won | +30% all stats |

### 9.4. Automation

An agent assigned to a zone:
- **Auto-catch**: 1 Pokemon every `base_interval / (1 + capture_stat/50)` seconds
- **Auto-fight**: Resolves trainers automatically (win rate based on combat + team)
- **Auto-event**: Resolves simple events
- Player receives notifications of agent catches/fights

### 9.5. Agent team

- Max 3 assigned Pokemon
- Agent's Pokemon influence their combat power
- A Pokemon can only be assigned to one agent at a time

---

## 10. Black Market

### 10.1. Selling

Player selects Pokemon to sell and receives Pokedollars.

```
Price = BASE_PRICE[species] × POTENTIAL_MULT[★] × (shiny ? 10 : 1) × NATURE_MULT
```

| Potential | Multiplier |
|-----------|-----------|
| ★1 | x0.5 |
| ★2 | x1 |
| ★3 | x2 |
| ★4 | x5 |
| ★5 | x15 |

### 10.2. Design tension

- Selling earns money → buy more balls → catch more
- But the best specimens are rare → selling them = potential loss
- Constant decision: keep or sell?

---

## 11. Shop

| Item | Price | Effect |
|------|-------|--------|
| Poke Ball (x10) | 2,000₽ | Standard capture |
| Great Ball (x10) | 6,000₽ | Better potential |
| Ultra Ball (x5) | 10,000₽ | Much better potential |
| Dusk Ball (x5) | 7,500₽ | Uniform distribution |
| Lure | 500₽ | x2 spawn rate for 60s (active zone) |
| Super Lure | 2,000₽ | x3 spawn rate for 60s |
| Potion | 300₽ | Remove cooldown from one Pokemon |

---

## 12. Economy

### 12.1. Revenue sources

| Source | Volume | Frequency |
|--------|--------|-----------|
| Black market (sell Pokemon) | Variable, main | At will |
| Combat victories | 50-5000₽ | Per fight |
| Special events | Bonus | Rare |
| Quests/objectives | Fixed rewards | One-time |

### 12.2. Expenses

| Expense | Volume | Frequency |
|---------|--------|-----------|
| Poke Balls | 200₽+ per catch | Continuous |
| Lures | 500-2000₽ | Optional |
| Agent recruitment | Variable | One-time |
| Zone unlock | Free (reputation) | Progression |

### 12.3. Starting money

Player starts with **5,000₽** and **20 Poke Balls**.

---

## 13. Progression and reputation

### 13.1. Reputation

- Main progression resource
- Earned through fights, events, objectives
- Unlocks zones and features
- Rocket reacts as reputation grows (more enemies, harder)

### 13.2. Milestones

| Reputation | Unlock |
|-----------|--------|
| 0 | Route 1, tutorial |
| 10 | Viridian Forest |
| 25 | Diglett's Cave |
| 35 | Nugget Bridge |
| 40 | Pallet Town |
| 50 | Safari Zone, upgraded Black Market |
| 60 | Celadon Casino |
| 75 | Pokemon Tower |
| 80 | Seafoam Islands |
| 90 | Silph Co. |
| 100 | Unknown Cave |

---

## 14. LLM Integration (optional)

### 14.1. Principle

If an LLM is connected (local Ollama or remote API), NPCs and trainers have **dynamically generated dialogue** based on game state context.

### 14.2. Contextual prompt

```
You are a Pokemon lore-accurate NPC in Kanto.
You are a [ROLE] in [ZONE].

Context:
- You are facing a member of [GANG_NAME] (a rival gang to Team Rocket)
- Their gang reputation is [REP] (they are [REP_DESCRIPTION])
- They have: [PLAYER_POKEMON_LIST]
- You have: [NPC_POKEMON_LIST]

Character sheet:
[CHARACTER_JSON]

Respond in character. Keep it short (2-3 sentences max).
The player says: "[MESSAGE]"
```

### 14.3. Technical integration

- **Detection**: At boot, game pings `localhost:11434` (Ollama) or a configured API URL
- **Fallback**: If no LLM, uses pre-written dialogue (phrase pool)
- **Cache**: LLM responses cached by context to avoid redundant calls
- **Configuration**: URL + model configurable in game settings

### 14.4. When LLM is used

| Situation | With LLM | Without LLM |
|-----------|---------|-------------|
| Trainer encounter | Generated contextual dialogue | Random pre-written phrase |
| Special event | Generated narration | Fixed text |
| Rocket encounter | Adaptive dialogue | Generic Rocket phrases |
| Agent recruitment | Dynamic conversation | Fixed script |

---

## 15. Save system

- **Single slot** (simplified UX)
- **localStorage** with key `pokeforge.v6`
- **Auto-save** on every significant action (catch, fight, sell)
- **Export/Import**: Button to export as JSON, import from file
- **Purge cache**: Button in settings

---

## 16. Assets and sprites

### 16.1. Pokemon

- Front sprites: `https://play.pokemonshowdown.com/sprites/gen5/{name}.png`
- Back sprites: `https://play.pokemonshowdown.com/sprites/gen5-back/{name}.png`
- Shiny sprites: `https://play.pokemonshowdown.com/sprites/gen5-shiny/{name}.png`

### 16.2. Trainers

- Sprites: `https://play.pokemonshowdown.com/sprites/trainers/{name}.png`
- Verified valid names: youngster, lass, fisherman, hiker, blackbelt, acetrainer, psychic, gentleman, swimmer, bugcatcher, camper, picnicker, rocketgrunt, rocketgruntf, giovanni, archer, ariana, proton, oak, red, silver, blue, nurse, scientist

### 16.3. Gen 1 only

- 151 species (Bulbasaur → Mew)
- Complete FR↔EN dictionary
- Pool of 4-6 moves per species

---

## 17. Out of scope v6.0 (future versions)

- PvP between players
- Other regions (Johto, Hoenn...)
- Breeding
- Player trading
- Achievements / trophies
- Advanced quest system
- Linear story mode
