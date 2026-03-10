const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

async function run() {
  const url = `${baseUrl.replace(/\/$/, "")}/api/tags`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${url}`);
  }

  const data = await response.json();
  const modelCount = Array.isArray(data.models) ? data.models.length : 0;
  console.log(`Ollama reachable at ${baseUrl}. Models available: ${modelCount}.`);

  if (modelCount > 0) {
    const first = data.models[0];
    console.log(`First model: ${first.name || "unknown"}`);
  }
}

run().catch((error) => {
  console.error(`Ollama check failed: ${error.message}`);
  process.exitCode = 1;
});
