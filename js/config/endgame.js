import audio from './audio';

export default {
  win: 'win',
  lose: 'lose',
  winText: 'You win!',
  loseText: 'You lose!',
  spawnRows: 3,
  baseSpawnRate: 1000,
  spawnRange: 500,
  baseFrontRunSpeed: 120,
  frontRunRange: 4,
  baseBackRunSpeed: 80,
  backRunRange: 2,
  deadZombieCount: 10,
  deadZombieColumns: 12,
  deadZombieRows: 3,
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
    statSize: 15,
    statTint: 0xffff22,
  },
  stats: {
    zombieKillLabel: 'Zombies killed',
    hitsTakenLabel: 'Hits taken',
    cashCollectedLabel: 'Cash collected',
    foodEatenLabel: 'Food eaten',
    mercenaryKillsLabel: 'Merc payments',
    shotsFiredLabel: 'Shots fired',
    accuracyLabel: 'Accuracy',
    gradeLabel: 'Grade',
  },
  menu: {
    returnToMap: 'Return to Map',
    tryAgain: 'Try Again',
    targetPractice: 'Target Practice',
    returnToTitle: 'Return to Title',
  },
};
