export default {
  gameTypeText: 'Game Type',
  screenFadeTime: 750,
  ui: {
    borderColor: 0xffffff,
    borderWidth: 5,
    squareWidth: 10,
  },
  modals: {
    start: ['Welcome to the map!'],
  },
  choiceModals: {
    stageSelected: {
      text: ['Are you ready to start?', '', 'Or do you need some target practice first?'],
      choices: [
        'Start Game',
        'Target Practice',
      ],
    },
  },
  statusMessages: {
    instructions: [
      'Arrows to move',
      '',
      '',
      'Space/Enter to choose',
      '',
      '',
      'Esc to go back',
    ],
  },
  fonts: {
    instructionsSize: 11,
    instructionsFill: '#ffffff',
    lessonInfoTitleSize: 16,
    lessonInfoTitleColor: 0xffff22,
    lessonInfoTextSize: 11,
    lessonInfoTextFill: '#ffffff',
    stageTitleSize: 14,
    stageTitleFill: '#ffffff',
    stageInfoTitleSize: 14,
    stageInfoTitleFill: '#ffffff',
    stageInfoTypeSize: 18,
    stageInfoTypeColor: 0xffff22,
    stageInfoSubtitleSize: 11,
    stageInfoSubtitleFill: '#ffffff',
  },
};
