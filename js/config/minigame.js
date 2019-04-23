export default {
  waves: [
    {
      baseSpawnRate: 1500,
      spawnRange: 250,
      start: 0,
      maxStart: 20,
      maxEnd: 40,
      end: 60,
    },
    {
      baseSpawnRate: 1250,
      spawnRange: 200,
      start: 60,
      maxStart: 80,
      maxEnd: 100,
      end: 120,
    },
    {
      baseSpawnRate: 1000,
      spawnRange: 150,
      start: 120,
      maxStart: 140,
      maxEnd: 160,
      end: 180,
    },
  ],
  maxHealth: 20,
  startHealth: 20,
  baseFallSpeed: 125,
  fallRange: 7,
  gameTime: 180,
  maxTextEntry: 22,
  fonts: {
    killSize: 22,
    killFill: '#ffffff',
    cashSize: 22,
    cashFill: '#ffffff',
    timerSize: 22,
    timerFill: '#ffffff',
    zombieSize: 10,
    zombieFill: '#ffffff',
    textEntrySize: 18,
    textEntryFill: '#ffffff',
  },
  ui: {
    textEntryStyle: { color: '#000000' },
    hudHeight: 120,
  },
};
