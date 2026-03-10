import { checkOllamaHealth } from '../../packages/llm/src/ollama-adapter.mjs';

const health = await checkOllamaHealth();

if (!health.ok) {
  console.error(`❌ Ollama unavailable at ${health.baseUrl}: ${health.error}`);
  process.exit(1);
}

console.log(`✅ Ollama reachable at ${health.baseUrl}`);
console.log(`Models (${health.modelCount}): ${health.models.join(', ') || 'none'}`);
