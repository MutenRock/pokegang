# Pokémon battle AI notes

Initial direction:

- keep battle logic behind an adapter
- prototype against a mature external simulator first
- test deterministic bots before LLM-controlled action selection
- use LLMs mainly for commentary, tactical framing, or higher-level planning unless benchmarks justify deeper control

Questions to answer later:

- rule-based or search-based baseline?
- where does partial information live in the state model?
- how much battle context can be exposed to the LLM safely?
- should LLMs be optional for battle decisions?
