import audio from './audio';

export default {
  win: 'win',
  lose: 'lose',
  winText: 'You Win!',
  loseText: 'You Lose!',
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
    statusTint: 0xffff22,
    menuSize: 22,
    menuTint: 0xffffff,
  },
};
