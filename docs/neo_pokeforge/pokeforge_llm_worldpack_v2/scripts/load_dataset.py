import json
from pathlib import Path

def load_json_files(folder):
    out = []
    for path in Path(folder).rglob("*.json"):
        try:
            out.append(json.loads(path.read_text(encoding="utf-8")))
        except Exception as e:
            print(f"Skipped {path}: {e}")
    return out

def load_all_characters(base_dir="data/characters"):
    return load_json_files(base_dir)

def load_pokedex(path="data/pokedex/pokemon_1025_en.json"):
    return json.loads(Path(path).read_text(encoding="utf-8"))

if __name__ == "__main__":
    chars = load_all_characters()
    dex = load_pokedex()
    print(f"Loaded {len(chars)} characters")
    print(f"Loaded {len(dex)} Pokémon entries")
