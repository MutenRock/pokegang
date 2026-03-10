# llm

Provider-agnostic LLM adapters for Pokeforge.

## Ollama adapter (v1)

`src/ollama-adapter.mjs` provides:

- `checkOllamaHealth()` to validate a local Ollama runtime.
- `generateStructuredEvent()` for pause-time major events (not per tick).

Default runtime:

- base URL: `http://127.0.0.1:11434`
- model: `llama3.1:8b`

### Example

```js
import { generateStructuredEvent } from './src/ollama-adapter.mjs';

const event = await generateStructuredEvent({
  prompt: 'Zone Safrania dropped to 35 stability. Generate one crisis event card.'
});
```
