import enemyTypes from './enemyTypes';

export default [
  {
    id: 'base-180',
    waves: [
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 0,
        maxStart: 10,
        maxEnd: 50,
        end: 60,
        probabilities: [
          { min: 1, max: 50, enemyType: enemyTypes.normalZombie },
          { min: 51, max: 75, enemyType: enemyTypes.sprinterZombie },
          { min: 76, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 2000,
        spawnRange: 500,
        start: 60,
        maxStart: 70,
        maxEnd: 110,
        end: 120,
        probabilities: [
          { min: 1, max: 50, enemyType: enemyTypes.normalZombie },
          { min: 51, max: 75, enemyType: enemyTypes.sprinterZombie },
          { min: 76, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 1500,
        spawnRange: 500,
        start: 120,
        maxStart: 130,
        maxEnd: 160,
        end: 180,
        probabilities: [
          { min: 1, max: 50, enemyType: enemyTypes.normalZombie },
          { min: 51, max: 75, enemyType: enemyTypes.sprinterZombie },
          { min: 76, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
    ],
  },
  {
    id: 'normal-only-180',
    waves: [
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 0,
        maxStart: 10,
        maxEnd: 50,
        end: 60,
        probabilities: [
          { min: 1, max: 100, enemyType: enemyTypes.normalZombie },
        ],
      },
      {
        baseSpawnRate: 2000,
        spawnRange: 500,
        start: 60,
        maxStart: 70,
        maxEnd: 110,
        end: 120,
        probabilities: [
          { min: 1, max: 100, enemyType: enemyTypes.normalZombie },
        ],
      },
      {
        baseSpawnRate: 1500,
        spawnRange: 500,
        start: 120,
        maxStart: 130,
        maxEnd: 160,
        end: 180,
        probabilities: [
          { min: 1, max: 100, enemyType: enemyTypes.normalZombie },
        ],
      },
    ],
  },
];
