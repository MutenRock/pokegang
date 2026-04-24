# PokéForge — Supabase Setup

Guide complet pour créer et configurer la base de données Supabase.  
Toutes les commandes sont à exécuter dans **Supabase → SQL Editor**.

---

## 1. Prérequis

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Récupérer dans **Project Settings → API** :
   - `Project URL` → à coller dans `game/config.js` (`SUPABASE_URL`)
   - `anon / public` key → à coller dans `game/config.js` (`SUPABASE_ANON_KEY`)
   - `service_role` key → à coller dans `.env` (scripts admin uniquement, jamais côté client)
3. Copier `game/config.example.js` → `game/config.js` et remplir les valeurs

---

## 2. Tables

### 2.1 `player_saves` — Sauvegarde cloud

Stocke l'état complet du jeu (le JSON de `state`) par joueur et par slot.

```sql
CREATE TABLE public.player_saves (
  user_id   uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slot      smallint    NOT NULL DEFAULT 0 CHECK (slot BETWEEN 0 AND 2),
  state     jsonb       NOT NULL DEFAULT '{}'::jsonb,
  saved_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, slot)
);

COMMENT ON TABLE  public.player_saves        IS 'Sauvegarde cloud du jeu par joueur et par slot (0-2)';
COMMENT ON COLUMN public.player_saves.state  IS 'JSON complet du state du jeu (même format que localStorage)';
COMMENT ON COLUMN public.player_saves.slot   IS 'Numéro de slot : 0, 1 ou 2 (correspond aux SAVE_KEYS)';
```

---

### 2.2 `players` — Stats publiques (leaderboard)

Données publiques mises à jour à chaque save. Sert de base pour les classements.

```sql
CREATE TABLE public.players (
  user_id           uuid        NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  gang_name         text        NOT NULL DEFAULT 'Team ???',
  boss_name         text        NOT NULL DEFAULT 'Boss',
  reputation        integer     NOT NULL DEFAULT 0,
  money             integer     NOT NULL DEFAULT 0,
  total_caught      integer     NOT NULL DEFAULT 0,
  total_sold        integer     NOT NULL DEFAULT 0,
  shiny_count       integer     NOT NULL DEFAULT 0,
  pokedex_count     integer     NOT NULL DEFAULT 0,
  pokemon_count     integer     NOT NULL DEFAULT 0,
  total_fights_won  integer     NOT NULL DEFAULT 0,
  eggs_hatched      integer     NOT NULL DEFAULT 0,
  events_completed  integer     NOT NULL DEFAULT 0,
  updated_at        timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.players                   IS 'Stats publiques des joueurs pour le leaderboard';
COMMENT ON COLUMN public.players.reputation        IS 'Réputation totale du gang (principal critère de classement)';
COMMENT ON COLUMN public.players.shiny_count       IS 'Total shinies capturés depuis le début (state.stats.shinyCaught)';
COMMENT ON COLUMN public.players.total_caught      IS 'Total Pokémon capturés (state.stats.totalCaught)';
COMMENT ON COLUMN public.players.total_sold        IS 'Total Pokémon vendus (state.stats.totalSold)';
COMMENT ON COLUMN public.players.pokemon_count     IS 'Pokémon actuellement dans le PC';
COMMENT ON COLUMN public.players.total_fights_won  IS 'Combats remportés (state.stats.totalFightsWon)';
COMMENT ON COLUMN public.players.eggs_hatched      IS 'Œufs éclos (state.stats.eggsHatched)';
COMMENT ON COLUMN public.players.events_completed  IS 'Événements complétés (state.stats.eventsCompleted)';
```

> ⚠️ **Migration** — si la table existe déjà, ajouter les nouvelles colonnes :
> ```sql
> ALTER TABLE public.players
>   ADD COLUMN IF NOT EXISTS money            integer NOT NULL DEFAULT 0,
>   ADD COLUMN IF NOT EXISTS pokemon_count    integer NOT NULL DEFAULT 0,
>   ADD COLUMN IF NOT EXISTS total_fights_won integer NOT NULL DEFAULT 0,
>   ADD COLUMN IF NOT EXISTS eggs_hatched     integer NOT NULL DEFAULT 0,
>   ADD COLUMN IF NOT EXISTS events_completed integer NOT NULL DEFAULT 0;
> ```

---

### 2.3 `world_prices` — Prix marché partagé

Prix du marché affectés par les ventes de tous les joueurs.

```sql
CREATE TABLE public.world_prices (
  species_en     text        NOT NULL PRIMARY KEY,
  price_modifier float       NOT NULL DEFAULT 1.0 CHECK (price_modifier > 0),
  total_sold     integer     NOT NULL DEFAULT 0,
  updated_at     timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.world_prices                IS 'Prix du marché global influencé par toutes les ventes';
COMMENT ON COLUMN public.world_prices.price_modifier IS 'Multiplicateur de prix (1.0 = base, <1 = dévalorisé par les ventes)';
```

---

## 3. Row Level Security (RLS)

⚠️ **Obligatoire** — sans RLS, n'importe quel joueur peut lire/modifier les données des autres.

```sql
-- Activer RLS sur toutes les tables
ALTER TABLE public.player_saves  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.world_prices  ENABLE ROW LEVEL SECURITY;
```

### Policies — `player_saves`

```sql
-- Un joueur peut seulement lire ses propres saves
CREATE POLICY "player_saves: lecture personnelle"
  ON public.player_saves FOR SELECT
  USING (auth.uid() = user_id);

-- Un joueur peut seulement écrire/modifier ses propres saves
CREATE POLICY "player_saves: écriture personnelle"
  ON public.player_saves FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "player_saves: mise à jour personnelle"
  ON public.player_saves FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "player_saves: suppression personnelle"
  ON public.player_saves FOR DELETE
  USING (auth.uid() = user_id);
```

### Policies — `players` (leaderboard)

```sql
-- Tout le monde peut lire le leaderboard (public)
CREATE POLICY "players: lecture publique"
  ON public.players FOR SELECT
  USING (true);

-- Un joueur peut seulement créer/modifier sa propre ligne
CREATE POLICY "players: création personnelle"
  ON public.players FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "players: mise à jour personnelle"
  ON public.players FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### Policies — `world_prices`

```sql
-- Tout le monde peut lire les prix (public)
CREATE POLICY "world_prices: lecture publique"
  ON public.world_prices FOR SELECT
  USING (true);

-- Tout joueur connecté peut mettre à jour les prix (via upsert après vente)
CREATE POLICY "world_prices: mise à jour connecté"
  ON public.world_prices FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "world_prices: update connecté"
  ON public.world_prices FOR UPDATE
  USING (auth.role() = 'authenticated');
```

---

## 4. Index (performances)

```sql
-- Leaderboard trié par réputation
CREATE INDEX idx_players_reputation   ON public.players (reputation DESC);

-- Leaderboard secondaire par shinies
CREATE INDEX idx_players_shiny        ON public.players (shiny_count DESC);

-- Autres critères de classement
CREATE INDEX idx_players_caught       ON public.players (total_caught DESC);
CREATE INDEX idx_players_fights       ON public.players (total_fights_won DESC);
CREATE INDEX idx_players_pokedex      ON public.players (pokedex_count DESC);

-- Lookup rapide des saves par slot
CREATE INDEX idx_player_saves_slot   ON public.player_saves (user_id, slot);

-- Récupération rapide des prix par espèce
CREATE INDEX idx_world_prices_species ON public.world_prices (species_en);
```

---

## 5. Realtime (optionnel — prix live)

Pour que les prix du marché se mettent à jour en temps réel chez tous les joueurs :

```sql
-- Activer la réplication realtime sur world_prices
ALTER PUBLICATION supabase_realtime ADD TABLE public.world_prices;
```

> ℹ️ À activer aussi dans Supabase → **Database → Replication** pour la table `world_prices`.

---

## 6. Vérification

Après avoir exécuté tous les scripts, vérifier dans **Table Editor** que :

- [ ] Les 3 tables existent (`player_saves`, `players`, `world_prices`)
- [ ] RLS est activé (icône cadenas visible dans Table Editor)
- [ ] Les policies apparaissent dans **Authentication → Policies**
- [ ] Les index sont visibles dans **Database → Indexes**

---

## 7. Résumé des droits

| Table | Anonyme | Connecté (soi) | Connecté (autre) |
|-------|---------|----------------|------------------|
| `player_saves` | ❌ | ✅ CRUD | ❌ |
| `players` | 👁️ lecture | ✅ CRUD | 👁️ lecture |
| `world_prices` | 👁️ lecture | ✅ lecture + update | ✅ lecture + update |
