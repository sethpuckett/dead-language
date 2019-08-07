import minigameItems from './minigameItems';

export default [
  {
    id: 'base',
    gameTime: 120,
    waveId: 'base-180',
    waves: [],
    maxHealth: 20,
    startHealth: 20,
    startCash: 100,
    baseFallSpeed: 75,
    fallRange: 10,
    mercenaryEnabled: true,
    mercenaryCost: 100,
    enemies: {
      attackDamage: 1,
      normalZombieHealth: 1,
      sprinterZombieSpeedModifier: 2,
      bruiserZombieSpeedModifier: 0.66,
      bruiserZombieSizeModifier: 1.25,
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
        { min: 1, max: 25, itemType: minigameItems.cash },
        { min: 26, max: 50, itemType: minigameItems.foodTier1 },
        { min: 51, max: 100, itemType: minigameItems.shotgun },
      ],
    },
  },
];
