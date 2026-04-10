from pathlib import Path

def build_prompt(character_path, memory_path=None, lang="en", player_message="Hello"):
    character_json = Path(character_path).read_text(encoding="utf-8")
    memory_json = "{}"
    if memory_path:
        memory_json = Path(memory_path).read_text(encoding="utf-8")

    if lang == "fr":
        return f"Fiche personnage :\n{character_json}\n\nMémoire :\n{memory_json}\n\nMessage du joueur :\n{player_message}"
    return f"Character Sheet:\n{character_json}\n\nMemory:\n{memory_json}\n\nPlayer message:\n{player_message}"

if __name__ == "__main__":
    sample = build_prompt(
        "data/characters/lore/rocket/npc_giovanni.json",
        "data/memory/example_memory_giovanni.json",
        "fr",
        "Je veux rejoindre la Team Rocket."
    )
    print(sample)
