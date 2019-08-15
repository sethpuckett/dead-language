import minigameItems from './minigameItems';

export default [
  {
    id: 'base',
    gameTime: 180,
    waveId: 'base-180',
    waves: [],
    maxHealth: 20,
    startHealth: 20,
    startCash: 500,
    baseFallSpeed: 60,
    fallRange: 8,
    mercenaryEnabled: true,
    mercenaryCost: 100,
    enemies: {
      problemVocabPercentage: 0.25,
      showAnswerOnAttack: true,
      showAnswerOnMerc: true,
      attackDamage: 2,
      normalZombieHealth: 1,
      sprinterZombieSpeedModifier: 2,
      sprinterZombieHealth: 1,
      bruiserZombieSpeedModifier: 0.66,
      bruiserZombieHealth: 3,
    },
    weapons: {
      default: 'pistol',
      shotgunAmmo: 5,
    },
    items: {
      cashAmount: 50,
      foodTier1HealAmount: 1,
      baseSpawnRate: 8000,
      spawnRange: 1500,
      lifeTime: 8000,
      warnTime: 2500,
      probabilities: [
        { min: 1, max: 33, itemType: minigameItems.cash },
        { min: 34, max: 66, itemType: minigameItems.foodTier1 },
        { min: 67, max: 100, itemType: minigameItems.shotgun },
      ],
    },
  },
  {
    id: 'basic-vocab',
    waveId: 'waves-basic-vocab',
    gameTime: 120,
  },
  {
    id: 'basic-vocab-review',
    waveId: 'waves-basic-vocab-review',
  },
  {
    id: 'lesson-2',
    waveId: 'waves-lesson-2',
  },
  {
    id: 'lesson-2-review',
    waveId: 'waves-lesson-2-review',
    gameTime: 210,
  },
];
