export default {
  gameTypeText: 'Game Type',
  screenFadeTime: 750,
  ui: {
    borderColor: 0xffffff,
    borderWidth: 5,
    squareWidth: 10,
    mapGridWidth: 3,
    mapGridColor: 0x222222,
    borderDisableColor: 0x222222,
    mapPinCellWidth: 0.25,
  },
  modals: {
    start: [
      'This here\'s the town map. From here',
      'ya can see all the places ya\'ve cleared',
      'out along with the all the spots that are',
      'still infested. Yer gonna hafta clear',
      'out each location in stages. Once ya pick',
      'a location on the map ya can pick which',
      'stage to tackle. Them zombies don\'t much',
      'care fer bein\' forcibly removed, so ya',
      'should expect each location to end with',
      'one last assault from them things.',
      'Ya might call it a \'Review\', heh!',
      '',
      'I\'ll go ahead and mark the areas on yer',
      'map as ya clear \'em out. But fair warnin\',',
      'these zombies are wily. They\'ll try to',
      'sneak back in any way they can. Don\'t be',
      'surprised if ya see zombies from one location',
      'poppin\' up in other parts of town. And',
      'sometimes ya might just have to go back and',
      'clear out zombies from an area ya',
      'already captured.',
      '',
      'Well, that\'s enough ramblin\' from me.',
      'Let\'s get started!',
    ],
  },
  choiceModals: {
    stageSelected: {
      text: ['Are ya ready to start?', '', 'Or do ya need some target practice first?'],
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
    mapTitleSize: 14,
    mapTitleFill: '#ffffff',
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
