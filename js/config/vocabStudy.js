export default {
  screenFadeTime: 750,
  practiceWordBuffer: 1250,
  fonts: {
    vocabSize: 11,
    vocabSizeSmall: 8,
    dotSize: 9,
    vocabFill: '#ffffff',
    menuOptionSize: 11,
    menuOptionFill: '#ffffff',
    practiceWordSize: 10,
    practiceWordFill: '#ffffff',
    practiceWordCorrectFill: '0x22dd22',
    practiceWordWrongFill: '0xdd2222',
  },
  ui: {
    practiceWordBgStyle: { color: '#000000' },
    practiceWordBgPadding: 2,
    textEntryStyle: { color: '#000000' },
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
