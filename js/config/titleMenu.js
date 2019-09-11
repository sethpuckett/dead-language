import audio from './audio';

export default {
  spawnRows: 3,
  baseSpawnRate: 3000,
  spawnRange: 1500,
  baseFrontRunSpeed: 60,
  frontRunRange: 4,
  baseBackRunSpeed: 35,
  backRunRange: 2,
  screenFadeTime: 750,
  loginPointerRotation: 0.08 * Math.PI,
  loginPointerExpansionFactor: 1.5,
  loginPointerExpansionDuration: 500,
  loginText: ['Sign in or register', 'to play the full game!'],
  audio: {
    menuMove: audio.menuMove,
    menuSelect: audio.menuSelectShoot,
  },
  menu: {
    newGame: 'New Game',
    continueGame: 'Continue Game',
    playDemo: 'Play Demo',
    options: 'Options',
  },
  fonts: {
    textSize: 22,
    textTint: 0xffffff,
    instructionsSize: 12,
    instructionsTint: 0xffffff,
    loginSize: 12,
    loginTint: 0xffff22,
  },
  instructions: 'Use arrow keys and Spacebar to choose',
};
