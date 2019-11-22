import audio from './audio';

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
  answerFlashDelay: 75,
  answerDisplayTime: 1250,
  bigZombieSizeModifier: 1.25,
  audio: {
    music: {
      zombieAssaultBackgroundMusicIntro: audio.music.zombieAssaultIntro,
      zombieAssaultBackgroundMusicLoop: audio.music.zombieAssaultLoop,
      zombieAssaultReviewBackgroundMusicIntro: audio.music.zombieAssaultReviewIntro,
      zombieAssaultReviewBackgroundMusicLoop: audio.music.zombieAssaultReviewLoop,
    },
    soundEffects: {
      shotMiss: audio.shotMiss,
      pistolHit: audio.hitPistol,
      shotgunHit: audio.hitShotgun,
      itemSpawn: audio.itemSpawn,
      itemGet: audio.itemGet,
      zombieAttack: audio.zombieAttack,
      mercenaryAttack: audio.mercHit,
      mercenaryRefuse: audio.buzz,
      outOfAmmo: audio.none,
      normalZombieSpawn: audio.none,
      specialZombieSpawn: audio.none,
    },
    config: [
      { key: audio.outOfAmmo, value: { detune: -1200, rate: 2 } },
    ],
  },
  fonts: {
    zombieSize: 13,
    zombieSizeLarge: 18,
    zombieTint: 0xffffff,
    zombieAnswerFlashTint: 0xff5555,
    itemSize: 13,
    itemSizeLarge: 18,
    itemTint: 0xffffff,
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
    winTexts: [
      'That\'s another area cleared! Great job.',
      'Area clear. Nice work out there.',
      [
        'Those zombies didn\'t stand a chance! That',
        'does it for this area.',
      ],
      [
        '¡Felicidades! This area is clear. Let\'s head',
        'back to camp.',
      ],
      [
        'We\'ve cleared another area. That was some',
        'great shooting out there.',
      ],
      [
        '¡Buen trabajo! The area is clear. Let\'s head',
        'back to camp.',
      ],
    ],
    loseTexts: [
      'There\'s too many of them! Run!',
      '¡Dios mio! They\'re everywhere! Retreat!',
      '¡Ay ay ay! We\'re not gonna make it! Run away!',
      [
        'They\'re everywhere! We\'ve got to get out',
        'of here!',
      ],
      [
        'Argh! We can\'t stop them all! Retreat and',
        'regroup!',
      ],
      [
        '¡Madre mía! Let\'s get back to camp while we',
        'still can!',
      ],
    ],
  },
};
