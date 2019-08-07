export default {
  zombieColumns: 18,
  sidePaddingPercent: 20,
  splatterRange: 8,
  splatterVarieties: 6,
  damageFlashDuration: 100,
  damageFlashColor: { red: 180, green: 15, blue: 15 },
  damageShakeDuration: 200,
  damageShakeIntensity: 0.005,
  statusTime: 1500,
  itemFlashDelay: 125,
  normalZombieHealth: 1,
  sprinterZombieSpeedModifier: 2,
  bruiserZombieSpeedModifier: 0.66,
  bruiserZombieSizeModifier: 1.25,
  bruiserZombieHealth: 3,
  fonts: {
    zombieSize: 10,
    zombieTint: 0xffff00,
    itemSize: 10,
    itemTint: 0xffff00,
  },
  ui: {
    zombieWordBgColor: 0x000000,
    itemWordBgColor: 0x000000,
    itemWordBgPadding: 2,
    hudConfig: {
      weapon: true,
      item: true,
      health: true,
      kills: true,
      cash: true,
      timer: true,
      message: true,
      textInput: true,
      hudBuffer: true,
      handleInput: true,
    },
  },
  statusMessages: {
    damage: ['¡Cerebros', 'ricos!'],
    useMercenary: ['Mi placer.'],
    mercenaryUnavailable: ['No trabajo', 'gratis,', 'muchachos.'],
    cashReceived: ['¡Mas dinero!'],
    foodTier1Received: ['¡Delicioso!'],
  },
  modals: {
    quit: [
      'Press ESC again to quit.',
      'Press any other key to continue.',
    ],
  },
};
