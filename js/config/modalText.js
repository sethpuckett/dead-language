import screens from './screens';
import modalChecks from './modalChecks';

export default [
  {
    id: 'minigame-intro',
    check: modalChecks.onStage,
    stage: 'intro-01',
    screen: screens.minigame,
    repeat: false,
    text: [
      [
        'Those zombies will be here any second!',
        'I sure hope ya got enough practice.',
      ],
      [
        'Try to stay calm when ya see \'em.',
        'Just focus on the vocab next to each one.',
        'Type the translation and press \'Enter\'',
        'to take \'em out.',
      ],
      [
        'But don\'t dawdle! If a zombie gets through',
        'they\'ll attack. Take too many hits and',
        'yer toast. Ya just need to survive until',
        'the timer reaches 0.',
      ],
      [
        'Okay! Here they come! Look out!',
      ],
    ],
  },
];
