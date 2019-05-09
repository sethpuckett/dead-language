export default [
  {
    id: 1,
    waves: [
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 0,
        maxStart: 20,
        maxEnd: 40,
        end: 60,
      },
      {
        baseSpawnRate: 2000,
        spawnRange: 500,
        start: 60,
        maxStart: 80,
        maxEnd: 100,
        end: 120,
      },
      {
        baseSpawnRate: 1500,
        spawnRange: 500,
        start: 120,
        maxStart: 140,
        maxEnd: 160,
        end: 170,
      },
    ],
    maxHealth: 20,
    startHealth: 20,
    baseFallSpeed: 175,
    fallRange: 10,
    gameTime: 180,
  },
];
