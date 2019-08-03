import minigameItems from './minigameItems';
import enemyTypes from './enemyTypes';

export default [
  {
    id: 1,
    waves: [
      {
        baseSpawnRate: 2500,
        spawnRange: 500,
        start: 0,
        maxStart: 10,
        maxEnd: 50,
        end: 60,
        probabilities: [
          { min: 1, max: 49, enemyType: enemyTypes.normalZombie },
          // { min: 81, max: 90, enemyType: enemyTypes.sprinterZombie },
          { min: 50, max: 100, enemyType: enemyTypes.bruiserZombie },
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
          { min: 1, max: 70, enemyType: enemyTypes.normalZombie },
          { min: 71, max: 85, enemyType: enemyTypes.sprinterZombie },
          { min: 86, max: 100, enemyType: enemyTypes.bruiserZombie },
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
          { min: 1, max: 60, enemyType: enemyTypes.normalZombie },
          { min: 61, max: 80, enemyType: enemyTypes.sprinterZombie },
          { min: 81, max: 100, enemyType: enemyTypes.bruiserZombie },
        ],
      },
    ],
    maxHealth: 20,
    startHealth: 20,
    startCash: 200,
    baseFallSpeed: 75,
    fallRange: 10,
    gameTime: 2,
    mercenaryEnabled: true,
    mercenaryCost: 100,
    weapons: {
      default: 'pistol',
      shotgunAmmo: 6,
    },
    items: {
      cashAmount: 50,
      foodTier1HealAmount: 1,
      baseSpawnRate: 8000,
      spawnRange: 1500,
      lifeTime: 8000,
      warnTime: 2500,
      probabilities: [
        { min: 1, max: 25, itemType: minigameItems.cash },
        // { min: 26, max: 50, itemType: minigameItems.foodTier1 },
        { min: 26, max: 100, itemType: minigameItems.shotgun },
      ],
    },
  },
];
