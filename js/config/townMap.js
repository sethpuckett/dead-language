export default {
  mapTitleText: 'Choose a Location',
  stageTitleText: 'Choose a Stage',
  clearedText: 'Cleared!',
  lockedText: 'Locked!',
  screenFadeTime: 750,
  ui: {
    borderColor: 0xffffff,
    borderWidth: 5,
    squareWidth: 10,
    mapGridWidth: 3,
    mapGridColor: 0x222222,
    borderDisableColor: 0x222222,
    mapPinCellWidth: 0.5,
    requirementLineWidth: 3,
    requirementLineColor: 0xffffff,
  },
  choiceModals: {
    stageSelected: {
      text: ['Are you ready to start?', '', 'Or do you need some target practice first?'],
      choices: [
        'Start Game',
        'Target Practice',
      ],
    },
    clearedStageSelected: {
      text: [
        'You already cleared this stage!',
        '',
        'But there might still be some zombies',
        'around if you want to check it out.'],
      choices: [
        'Start Game',
        'Target Practice',
      ],
    },
    reviewStageSelected: {
      text: [
        'Alright, this is it. The final push to clear',
        'out this location. You\'re going to see vocab',
        'from every stage in this lesson.',
        'I hope you\'re ready!',
      ],
      choices: [
        'Start Game',
      ],
    },
    clearedReviewStageSelected: {
      text: [
        'You already cleared this whole area,',
        'but it\'s a good idea to check back in.',
        '',
        'I\'m sure there\'s still some zombies around,',
        'and more practice never hurt.',
      ],
      choices: [
        'Start Game',
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
    mapTitleSize: 14,
    mapTitleFill: '#ffffff',
    mapLocationSize: 12,
    mapLocationFill: '#ffffff',
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
