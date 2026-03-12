import { loadCharacterSheets, validateCharacterSheet } from '../../packages/npc-mind/src/character-sheet.mjs';

const sheets = loadCharacterSheets('data/characters');

if (!sheets.length) {
  console.error('No character sheets found in data/characters.');
  process.exit(1);
}

const invalid = [];
for (const sheet of sheets) {
  const validation = validateCharacterSheet(sheet);
  if (!validation.ok) {
    invalid.push({ id: sheet.id, file: sheet._meta?.file, errors: validation.errors });
  }
}

if (invalid.length) {
  console.error('Character sheet validation failed:');
  invalid.forEach((entry) => {
    console.error(`- ${entry.id || 'unknown'} (${entry.file})`);
    entry.errors.forEach((error) => console.error(`  • ${error}`));
  });
  process.exit(1);
}

console.log(`Character sheets valid: ${sheets.length}`);
