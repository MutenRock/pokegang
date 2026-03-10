import fs from 'node:fs';
import path from 'node:path';

const requiredPaths = [
  'apps/web',
  'apps/api',
  'apps/sim-lab',
  'apps/rocket-hq',
  'packages/core',
  'packages/llm',
  'packages/i18n',
  'packages/npc-mind',
  'packages/battle-adapter',
  'packages/content-schema',
  'docs/vision.md',
  'docs/gameplay-pillars.md',
  'docs/technical-decisions.md',
  'data/locales/en-US/common.json',
  'data/locales/fr-FR/common.json'
];

const missing = requiredPaths.filter((p) => !fs.existsSync(path.resolve(p)));

if (missing.length) {
  console.error('Missing required paths:');
  missing.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log('Repository structure looks good.');
