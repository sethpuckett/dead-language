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

    },
  },
  fonts: {
    zombieSize: 10,
    zombieTint: 0xffffff,
    zombieAnswerFlashTint: 0xff5555,
    itemSize: 10,
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
  },
};
