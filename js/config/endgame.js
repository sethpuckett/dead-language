import audio from './audio';

export default {
  win: 'win',
  lose: 'lose',
  winText: 'You did it!',
  loseText: 'Let\'s get out of here!',
  screenFadeTime: 750,
  audio: {
    music: {
      winMusic: audio.music.cheerfulPiano,
      loseMusic: audio.music.theLameDuck,
    },
    soundEffects: {
      menuMove: audio.menuMove,
      menuSelect: audio.menuSelectShoot,
    },
    musicConfig: {
      winMusic: { rate: 1.25 },
      loseMusic: { detune: -300 },
    },
  },
  fonts: {
    statusSize: 32,
    statusTint: 0xffffff,
    menuSize: 22,
    menuTint: 0xffffff,
    statSize: 18,
    statTint: 0xffff22,
  },
  stats: {
    zombieKillLabel: 'Zombies killed',
    hitsTakenLabel: 'Hits taken',
    cashCollectedLabel: 'Cash collected',
    foodEatenLabel: 'Food eaten',
    mercenaryKillsLabel: 'Mercenary kills',
  },
  menu: {
    returnToMap: 'Return to Map',
    tryAgain: 'Try Again',
    targetPractice: 'Target Practice',
    returnToTitle: 'Return to Title',
  },
};
