import audio from './audio';
import { join } from 'path';

export default {
  screenFadeTime: 750,
  practiceWordBuffer: 1250,
  fonts: {
    vocabSize: 11,
    vocabSizeSmall: 8,
    dotSize: 9,
    vocabTint: 0xffffff,
    menuOptionSize: 11,
    menuOptionTint: 0xffffff,
    practiceWordSize: 10,
    practiceWordTint: 0xffffff,
    practiceWordCorrectTint: 0x22dd22,
    practiceWordWrongTint: 0xdd2222,
  },
  ui: {
    practiceWordBgColor: 0x000000,
    practiceWordBgPadding: 2,
    hudConfig: {
      weapon: false,
      item: false,
      health: false,
      kills: false,
      cash: false,
      timer: false,
      message: true,
      textInput: false,
      hudBuffer: true,
      handleInput: false,
    },
  },
  audio: {
    music: {
      backgroundMusic: audio.music.inEarlyTime,
    },
    soundEffects: {
      menuMove: audio.menuMove,
      menuSelect: audio.menuSelectWave,
      practiceModalClear: audio.thud,
      guessCorrect: audio.glassBreak,
      guessWrong: audio.thud,
      quitPractice: audio.menuBackout,
    },
  },
  statusMessages: {
    start: [
      'Arrows to move',
      '',
      'Space/Enter',
      'to choose',
    ],
    practice: [
      'Type the translation',
      '',
      'Enter to shoot',
      'Esc to quit',
    ],
    hit: 'Nice shot!',
    miss: [
      'Missed!',
      'Try again!',
    ],
  },
  modals: {
    practice: [
      'I\'ll set up the bottles, then.',
      'Take your time. And good luck.',
    ],
  },
};
