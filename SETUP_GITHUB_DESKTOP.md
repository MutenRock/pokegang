# Pokeforge setup with GitHub Desktop

## Option A — start from an empty GitHub repo

1. Create a new empty repository on GitHub named `pokeforge`.
2. In GitHub Desktop, choose **File > Clone repository**.
3. Clone it to a local folder.
4. Extract the contents of this starter zip into that local folder.
5. Go back to GitHub Desktop: it should detect all new files.
6. Create your first commit, for example:
   - `chore: bootstrap Pokeforge monorepo structure`
7. Publish / push.
8. Create a `dev` branch from GitHub Desktop.

## Option B — create locally from GitHub Desktop

1. In GitHub Desktop, choose **File > New repository**.
2. Name it `pokeforge`.
3. Choose a local folder.
4. Tick initialization with README only if you want, but it is cleaner to keep it almost empty.
5. Extract this starter pack into the new repo folder.
6. Commit all files.
7. Publish repository to GitHub.

## Recommended first branches

- `main`
- `dev`
- `docs/core-vision`
- `spike/world-sim-kenshi`
- `spike/pokemon-life-loop`
- `spike/4x-region-loop`

## Recommended first labels on GitHub

- `type:feature`
- `type:spike`
- `type:docs`
- `type:refactor`
- `area:world-sim`
- `area:llm`
- `area:battle`
- `area:i18n`
- `prototype:character-sim`
- `prototype:pokemon-life`
- `prototype:4x`

## First commit sequence

1. bootstrap structure
2. write core vision docs
3. define prototype comparison sheet
4. add first simulation loop stub
