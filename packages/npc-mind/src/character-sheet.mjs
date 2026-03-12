import fs from 'node:fs';
import path from 'node:path';

const REQUIRED_KEYS = [
  'id',
  'name',
  'age',
  'gender',
  'role',
  'faction',
  'personality',
  'goals',
  'values',
  'orientation',
  'trustLevel',
  'catchPhrases',
  'speechStyle',
  'pokemonPreferences',
  'possiblePokemon',
  'sprite'
];

export function validateCharacterSheet(sheet) {
  const missing = REQUIRED_KEYS.filter((key) => !(key in sheet));
  if (missing.length) {
    return { ok: false, errors: [`Missing keys: ${missing.join(', ')}`] };
  }

  const errors = [];
  if (!Array.isArray(sheet.personality) || !sheet.personality.length) errors.push('personality must be a non-empty array.');
  if (!Array.isArray(sheet.values) || !sheet.values.length) errors.push('values must be a non-empty array.');
  if (!Array.isArray(sheet.catchPhrases) || !sheet.catchPhrases.length) errors.push('catchPhrases must be a non-empty array.');
  if (!Array.isArray(sheet.possiblePokemon) || !sheet.possiblePokemon.length) errors.push('possiblePokemon must be a non-empty array.');
  if (typeof sheet.trustLevel !== 'number' || sheet.trustLevel < 0 || sheet.trustLevel > 10) errors.push('trustLevel must be a number in range 0..10.');
  if (typeof sheet.goals !== 'object' || !sheet.goals?.shortTerm || !sheet.goals?.longTerm) {
    errors.push('goals must include shortTerm and longTerm.');
  }

  return { ok: errors.length === 0, errors };
}

export function buildCharacterPromptContext(sheet) {
  const validation = validateCharacterSheet(sheet);
  if (!validation.ok) throw new Error(`Invalid character sheet (${sheet?.id || 'unknown'}): ${validation.errors.join(' ')}`);

  return [
    `Name: ${sheet.name}`,
    `Role: ${sheet.role}`,
    `Faction: ${sheet.faction}`,
    `Personality: ${sheet.personality.join(', ')}`,
    `Values: ${sheet.values.join(', ')}`,
    `Orientation: ${sheet.orientation}`,
    `Trust level: ${sheet.trustLevel}/10`,
    `Goals: short=${sheet.goals.shortTerm}; long=${sheet.goals.longTerm}`,
    `Speech style: tone=${sheet.speechStyle.tone}, verbosity=${sheet.speechStyle.verbosity}, formality=${sheet.speechStyle.formality}`,
    `Catch phrases: ${sheet.catchPhrases.join(' | ')}`,
    `Pokemon preferences: ${sheet.pokemonPreferences.join(', ')}`,
    `Possible Pokemon: ${sheet.possiblePokemon.join(', ')}`
  ].join('\n');
}

export function buildCharacterDialoguePrompt({ sheet, playerMessage }) {
  const context = buildCharacterPromptContext(sheet);
  return [
    'You are roleplaying one Pokémon-world character. Stay in character and keep answers concise.',
    '',
    'Character sheet:',
    context,
    '',
    `Player message: ${playerMessage}`
  ].join('\n');
}

export function loadCharacterSheets(rootDir = 'data/characters') {
  const resolvedRoot = path.resolve(rootDir);
  const sheets = [];

  const categoryDirs = fs.readdirSync(resolvedRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  for (const categoryDir of categoryDirs) {
    const fullCategoryPath = path.join(resolvedRoot, categoryDir.name);
    const files = fs.readdirSync(fullCategoryPath).filter((name) => name.endsWith('.json'));
    for (const file of files) {
      const fullPath = path.join(fullCategoryPath, file);
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      sheets.push({ ...data, _meta: { category: categoryDir.name, file: fullPath } });
    }
  }

  return sheets;
}
