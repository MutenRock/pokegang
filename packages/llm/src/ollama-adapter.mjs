const DEFAULT_MODEL = 'llama3.1:8b';

function resolveBaseUrl(baseUrl) {
  return (baseUrl || process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
}

export async function checkOllamaHealth({ baseUrl } = {}) {
  const resolvedBaseUrl = resolveBaseUrl(baseUrl);
  let response;
  try {
    response = await fetch(`${resolvedBaseUrl}/api/tags`, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error?.message || 'Network error',
      baseUrl: resolvedBaseUrl
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: `HTTP ${response.status}`,
      baseUrl: resolvedBaseUrl
    };
  }

  const data = await response.json();
  return {
    ok: true,
    status: response.status,
    baseUrl: resolvedBaseUrl,
    modelCount: Array.isArray(data.models) ? data.models.length : 0,
    models: Array.isArray(data.models) ? data.models.map((model) => model.name) : []
  };
}

export async function generateStructuredEvent({
  prompt,
  system,
  model = process.env.OLLAMA_MODEL || DEFAULT_MODEL,
  baseUrl,
  temperature = 0.4
}) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('generateStructuredEvent requires a non-empty prompt string.');
  }

  const resolvedBaseUrl = resolveBaseUrl(baseUrl);
  const body = {
    model,
    stream: false,
    options: { temperature },
    format: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        summary: { type: 'string' },
        choices: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              label: { type: 'string' },
              risk: { type: 'string' }
            },
            required: ['id', 'label', 'risk']
          }
        }
      },
      required: ['title', 'summary', 'choices']
    },
    messages: [
      {
        role: 'system',
        content:
          system ||
          'You generate concise mission event cards for a criminal management sim. Keep output grounded and game-usable.'
      },
      { role: 'user', content: prompt }
    ]
  };

  const response = await fetch(`${resolvedBaseUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(`Ollama generation failed with HTTP ${response.status}: ${raw}`);
  }

  const payload = await response.json();
  const content = payload?.message?.content;

  if (!content) {
    throw new Error('Ollama response did not include message.content.');
  }

  return JSON.parse(content);
}
