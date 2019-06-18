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
  mercenaryCost: 100,
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
      handleInput: true,
    },
  },
  statusMessages: {
    damage: ['Cerebros', 'ricos!'],
    useMercenary: ['Happy', 'to help.'],
    mercenaryUnavailable: ['My services', 'aren\'t free,', 'friend.'],
  },
  modals: {
    start: [
      'Those zombies will be here any second!',
      '',
      'Try to stay calm when ya see \'em.',
      'Just focus on the vocab next to each one.',
      'Type the translation and press \'Enter\'',
      'to take \'em out.',
      '',
      'But don\'t dawdle! If a zombie gets through',
      'they\'ll attack. Take too many hits and',
      'yer toast. Ya just need to survive until',
      'the timer reaches 0.',
      '',
      'Uh oh! Here they come! Look out!',
    ],
    quit: [
      'Press ESC again to quit.',
      'Press any other key to continue.',
    ],
  },
};
