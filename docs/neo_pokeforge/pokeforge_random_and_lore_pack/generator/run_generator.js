
import { generateRandomNPC } from './npc_generator.js';
import fs from 'fs';

// Generate 5 random NPCs
const npcs = [];
for (let i = 0; i < 5; i++) {
  npcs.push(generateRandomNPC());
}

console.log(JSON.stringify(npcs, null, 2));

// You can pipe this to a file:
// node run_generator.js > output.json
