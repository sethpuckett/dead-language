import enemyTypes from './enemyTypes';

export default [
  {
    id: 'base-180',
    waves: [
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 0,
        maxStart: 15,
        maxEnd: 45,
        end: 60,
        probabilities: [
          { min: 1, max: 50, enemyType: enemyTypes.normalZombie },
          { min: 51, max: 75, enemyType: enemyTypes.sprinterZombie },
          { min: 76, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 2200,
        spawnRange: 500,
        start: 60,
        maxStart: 75,
        maxEnd: 95,
        end: 120,
        probabilities: [
          { min: 1, max: 50, enemyType: enemyTypes.normalZombie },
          { min: 51, max: 75, enemyType: enemyTypes.sprinterZombie },
          { min: 76, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 1800,
        spawnRange: 500,
        start: 120,
        maxStart: 135,
        maxEnd: 165,
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
    id: 'waves-basic-vocab',
    waves: [
      {
        baseSpawnRate: 3000,
        spawnRange: 500,
        start: 0,
        maxStart: 20,
        maxEnd: 40,
        end: 60,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 60,
        maxStart: 80,
        maxEnd: 100,
        end: 120,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
    ],
  },
  {
    id: 'waves-basic-vocab-review',
    waves: [
      {
        baseSpawnRate: 3000,
        spawnRange: 500,
        start: 0,
        maxStart: 20,
        maxEnd: 40,
        end: 60,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 60,
        maxStart: 80,
        maxEnd: 100,
        end: 120,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 120,
        maxStart: 140,
        maxEnd: 160,
        end: 180,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
    ],
  },
  {
    id: 'waves-lesson-2',
    waves: [
      {
        baseSpawnRate: 2800,
        spawnRange: 500,
        start: 0,
        maxStart: 20,
        maxEnd: 40,
        end: 60,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 2400,
        spawnRange: 500,
        start: 60,
        maxStart: 80,
        maxEnd: 100,
        end: 120,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 2000,
        spawnRange: 500,
        start: 120,
        maxStart: 140,
        maxEnd: 160,
        end: 180,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
    ],
  },
  {
    id: 'waves-lesson-2-review',
    waves: [
      {
        baseSpawnRate: 2800,
        spawnRange: 500,
        start: 0,
        maxStart: 20,
        maxEnd: 40,
        end: 60,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 2400,
        spawnRange: 500,
        start: 60,
        maxStart: 80,
        maxEnd: 100,
        end: 120,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
      {
        baseSpawnRate: 2000,
        spawnRange: 500,
        start: 120,
        maxStart: 150,
        maxEnd: 190,
        end: 210,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
    ],
  },
];
