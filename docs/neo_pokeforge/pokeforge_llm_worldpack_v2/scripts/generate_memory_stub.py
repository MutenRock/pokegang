import json, random
from pathlib import Path

def generate_memory_stub(npc_id, player_id="player_001"):
    return {
        "npc_id": npc_id,
        "player_id": player_id,
        "relationship": {"trust": 0, "fear": 0, "respect": 0, "affection": 0, "faction_alignment": 0},
        "events": []
    }

def random_character(folder="data/characters/procedural"):
    files = list(Path(folder).rglob("*.json"))
    if not files:
        raise RuntimeError("No procedural character files found.")
    return json.loads(random.choice(files).read_text(encoding="utf-8"))

if __name__ == "__main__":
    c = random_character()
    m = generate_memory_stub(c["id"])
    print(json.dumps({"character": c, "memory": m}, ensure_ascii=False, indent=2))
