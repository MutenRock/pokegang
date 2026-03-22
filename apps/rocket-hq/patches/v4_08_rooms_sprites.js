
// ============================================================
// PATCH v4.08 — BANDE SALLES EN BAS DE PAGE (Sprites animés)
// ============================================================

function renderRoomsBand() {
  const el = document.getElementById('roomsBand');
  if (!el) return;

  const rooms = [
    {
      key: 'command',
      icon: '🏢',
      label: { fr:'Commandement', en:'Command' },
      getSprites: () => [
        state.profile.sprite,
        ...(state.agents.slice(0,2).map(a=>a.sprite).filter(Boolean)),
      ],
    },
    {
      key: 'breeding',
      icon: '🥚',
      label: { fr:'Nurserie', en:'Nursery' },
      getSprites: () => {
        const bpkm = state.breedingQueue.slice(0,3).map(e => {
          const en = FR_TO_EN[(e.species_fr||'').toLowerCase()] || e.species_fr;
          return `https://play.pokemonshowdown.com/sprites/gen5/${en}.png`;
        });
        return bpkm;
      },
    },
    {
      key: 'learning',
      icon: '📚',
      label: { fr:'Apprentissage', en:'Learning' },
      getSprites: () => {
        const lr = state.rooms.learning;
        if (!lr?.assignedAgentId) return [];
        const agent = state.agents.find(a => a.id === lr.assignedAgentId);
        const sprites = agent?.sprite ? [agent.sprite] : [];
        (agent?.team||[]).slice(0,2).forEach(pkmId => {
          const p = state.pokemons.find(x=>x.id===pkmId);
          if (p) sprites.push(`https://play.pokemonshowdown.com/sprites/gen5/${p.species_en}.png`);
        });
        return sprites;
      },
    },
    {
      key: 'pkm_train',
      icon: '⚔️',
      label: { fr:'Entraînement', en:'Training' },
      getSprites: () => {
        const ptr = state.rooms.pkm_train;
        return (ptr?.assignedPokemonIds||[]).map(id => {
          const p = state.pokemons.find(x=>x.id===id);
          return p ? `https://play.pokemonshowdown.com/sprites/gen5/${p.species_en}.png` : null;
        }).filter(Boolean);
      },
    },
  ];

  el.innerHTML = rooms.map(r => {
    const room = state.rooms[r.key];
    if (!room) return '';
    const nom = r.label[lang];
    const sprites = r.getSprites();
    const spriteHtml = sprites.length
      ? sprites.map((src,i) => `
          <img src="${src}"
               style="width:36px;height:36px;image-rendering:pixelated;object-fit:contain;
                      animation:bandFloat ${2.5+i*0.4}s ease-in-out infinite;
                      animation-delay:${i*0.3}s;">`
        ).join('')
      : `<span style="font-size:.55em;color:var(--muted)">${lang==='fr'?'Vide':'Empty'}</span>`;

    return `<div class="room-band-card" id="band-${r.key}">
      <div class="room-band-title">${r.icon} ${nom} <span style="color:var(--muted)">Nv.${room.level||1}</span></div>
      <div class="room-band-sprites">${spriteHtml}</div>
    </div>`;
  }).join('');
}
