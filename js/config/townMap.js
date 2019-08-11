export default {
  mapTitleText: 'Choose a Location',
  stageTitleText: 'Choose a Stage',
  clearedText: 'Cleared!',
  lockedText: 'Locked!',
  screenFadeTime: 750,
  selectorFlashDelay: 350,
  showAllLessons: false,
  ui: {
    borderColor: 0xffffff,
    mapGridColor: 0x222222,
    borderDisableColor: 0x222222,
    mapPinCellRatio: 0.5,
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
    instructionsTint: 0xffffff,
    mapTitleSize: 14,
    mapTitleTint: 0xffffff,
    mapLocationSize: 12,
    mapLocationTint: 0xffffff,
    lessonInfoTitleSize: 16,
    lessonInfoTitleTint: 0xffff22,
    lessonInfoTextSize: 11,
    lessonInfoTextTint: 0xffffff,
    stageTitleSize: 14,
    stageTitleTint: 0xffffff,
    stageInfoTitleSize: 14,
    stageInfoTitleTint: 0xffffff,
    stageInfoTypeSize: 18,
    stageInfoTypeColor: 0xffff22,
    stageInfoSubtitleSize: 11,
    stageInfoSubtitleTint: 0xffffff,
  },
};
