import fs from 'node:fs';
import path from 'node:path';

const base = path.resolve('data/locales');
const locales = ['en-US', 'fr-FR'];
const fileName = 'common.json';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function flatten(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return acc.concat(flatten(value, next));
    }
    return acc.concat(next);
  }, []);
}

const localeMaps = locales.map((locale) => {
  const filePath = path.join(base, locale, fileName);
  return { locale, keys: flatten(readJson(filePath)).sort() };
});

const reference = localeMaps[0].keys.join('|');
const mismatches = localeMaps.filter((entry) => entry.keys.join('|') !== reference);

if (mismatches.length > 0) {
  console.error('Locale key mismatch detected:');
  for (const entry of localeMaps) {
    console.error(`- ${entry.locale}: ${entry.keys.join(', ')}`);
  }
  process.exit(1);
}

console.log('Locale keys are aligned.');
