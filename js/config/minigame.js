export default {
  zombieColumns: 18,
  sidePaddingPercent: 20,
  splatterBase: -5,
  splatterRange: 8,
  splatterVarieties: 6,
  damageFlashDuration: 100,
  damageFlashColor: { red: 180, green: 15, blue: 15 },
  damageShakeDuration: 200,
  damageShakeIntensity: 0.005,
  statusTime: 1500,
  fonts: {
    zombieSize: 10,
    zombieFill: '#ffffff',
  },
  ui: {
    zombieWordBgStyle: { color: '#000000' },
    zombieWordBgPadding: 2,
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
    },
  },
  statusMessages: {
    damage: ['Cerebros', 'ricos!'],
  },
};
