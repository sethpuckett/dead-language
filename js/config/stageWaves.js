import enemyTypes from './enemyTypes';

export default [
  {
    id: 'waves-base-180',
    waves: [
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 0,
        maxStart: 15,
        maxEnd: 45,
        end: 60,
        probabilities: [
          { min: 1, max: 50, enemyType: enemyTypes.normalZombie }, // 50%
          { min: 51, max: 80, enemyType: enemyTypes.reviewZombie }, // 30%
          { min: 81, max: 90, enemyType: enemyTypes.sprinterZombie }, // 10%
          { min: 91, max: 100, enemyType: enemyTypes.bruiserZombie }, // 10%
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
          { min: 1, max: 45, enemyType: enemyTypes.normalZombie }, // 45%
          { min: 46, max: 75, enemyType: enemyTypes.reviewZombie }, // 30%
          { min: 76, max: 90, enemyType: enemyTypes.sprinterZombie }, // 15%
          { min: 91, max: 100, enemyType: enemyTypes.bruiserZombie }, // 10%
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
          { min: 1, max: 40, enemyType: enemyTypes.normalZombie }, // 40%
          { min: 41, max: 70, enemyType: enemyTypes.reviewZombie }, // 30%
          { min: 71, max: 85, enemyType: enemyTypes.sprinterZombie }, // 15%
          { min: 86, max: 100, enemyType: enemyTypes.bruiserZombie }, // 15%
        ],
      },
    ],
  },
  {
    id: 'waves-base-210-review',
    waves: [
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 0,
        maxStart: 10,
        maxEnd: 50,
        end: 60,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie }, // 60%
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie }, // 20%
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie }, // 20%
        ],
      },
      {
        baseSpawnRate: 2200,
        spawnRange: 500,
        start: 60,
        maxStart: 70,
        maxEnd: 110,
        end: 120,
        probabilities: [
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie }, // 60%
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie }, // 20%
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie }, // 20%
        ],
      },
      {
        baseSpawnRate: 1800,
        spawnRange: 500,
        start: 120,
        maxStart: 130,
        maxEnd: 190,
        end: 210,
        probabilities: [
          { min: 1, max: 55, enemyType: enemyTypes.normalZombie }, // 55%
          { min: 56, max: 80, enemyType: enemyTypes.sprinterZombie }, // 25%
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie }, // 20%
        ],
      },
    ],
  },
  {
    id: 'waves-demo',
    waves: [
      {
        baseSpawnRate: 3000,
        spawnRange: 500,
        start: 0,
        maxStart: 0,
        maxEnd: 55,
        end: 60,
        probabilities: [
          { min: 1, max: 85, enemyType: enemyTypes.normalZombie }, // 85%
          { min: 86, max: 100, enemyType: enemyTypes.sprinterZombie }, // 15%
        ],
      },
      {
        baseSpawnRate: 2400,
        spawnRange: 500,
        start: 60,
        maxStart: 65,
        maxEnd: 115,
        end: 120,
        probabilities: [
          { min: 1, max: 80, enemyType: enemyTypes.normalZombie }, // 80%
          { min: 81, max: 100, enemyType: enemyTypes.sprinterZombie }, // 20%
        ],
      },
      {
        baseSpawnRate: 1700,
        spawnRange: 500,
        start: 120,
        maxStart: 125,
        maxEnd: 175,
        end: 180,
        probabilities: [
          { min: 1, max: 75, enemyType: enemyTypes.normalZombie }, // 75%
          { min: 76, max: 100, enemyType: enemyTypes.sprinterZombie }, // 25%
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
          { min: 1, max: 80, enemyType: enemyTypes.normalZombie }, // 80%
          { min: 81, max: 90, enemyType: enemyTypes.sprinterZombie }, // 10%
          { min: 91, max: 100, enemyType: enemyTypes.bruiserZombie }, // 10%
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
          { min: 1, max: 70, enemyType: enemyTypes.normalZombie }, // 75%
          { min: 71, max: 85, enemyType: enemyTypes.sprinterZombie }, // 15%
          { min: 86, max: 100, enemyType: enemyTypes.bruiserZombie }, // 15%
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
          { min: 1, max: 70, enemyType: enemyTypes.normalZombie }, // 70%
          { min: 71, max: 85, enemyType: enemyTypes.sprinterZombie }, // 15%
          { min: 86, max: 100, enemyType: enemyTypes.bruiserZombie }, // 15%
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
          { min: 1, max: 65, enemyType: enemyTypes.normalZombie }, // 65%
          { min: 66, max: 85, enemyType: enemyTypes.sprinterZombie }, // 20%
          { min: 86, max: 100, enemyType: enemyTypes.bruiserZombie }, // 15%
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
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie }, // 60%
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie }, // 20%
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie }, // 20%
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
          { min: 1, max: 65, enemyType: enemyTypes.normalZombie }, // 65%
          { min: 66, max: 80, enemyType: enemyTypes.reviewZombie }, // 15%
          { min: 81, max: 90, enemyType: enemyTypes.sprinterZombie }, // 10%
          { min: 91, max: 100, enemyType: enemyTypes.bruiserZombie }, // 10%
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
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie }, // 60%
          { min: 61, max: 75, enemyType: enemyTypes.reviewZombie }, // 15%
          { min: 76, max: 90, enemyType: enemyTypes.sprinterZombie }, // 15%
          { min: 91, max: 100, enemyType: enemyTypes.bruiserZombie }, // 10%
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
          { min: 1, max: 55, enemyType: enemyTypes.normalZombie }, // 55%
          { min: 56, max: 70, enemyType: enemyTypes.reviewZombie }, // 15%
          { min: 71, max: 85, enemyType: enemyTypes.sprinterZombie }, // 15%
          { min: 86, max: 100, enemyType: enemyTypes.bruiserZombie }, // 15%
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
          { min: 1, max: 70, enemyType: enemyTypes.normalZombie }, // 70%
          { min: 71, max: 85, enemyType: enemyTypes.sprinterZombie }, // 15%
          { min: 86, max: 100, enemyType: enemyTypes.bruiserZombie }, // 15%
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
          { min: 1, max: 70, enemyType: enemyTypes.normalZombie }, // 70%
          { min: 71, max: 85, enemyType: enemyTypes.sprinterZombie }, // 15%
          { min: 86, max: 100, enemyType: enemyTypes.bruiserZombie }, // 15%
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
          { min: 1, max: 65, enemyType: enemyTypes.normalZombie }, // 65%
          { min: 66, max: 85, enemyType: enemyTypes.sprinterZombie }, // 20%
          { min: 86, max: 100, enemyType: enemyTypes.bruiserZombie }, // 15%
        ],
      },
    ],
  },
];
