import screens from './screens';
import modalChecks from './modalChecks';

export default [
  {
    id: 'game-intro',
    text: [
      [
        'Howdy. You awake? How ya holdin\' up?',
      ],
      [
        'Tired? Yeah, me too. We\'re all tired.',
        'I can\'t even remember how long we\'ve been on',
        'the run from them zombies. Weeks?',
        'Months? Who knows.',
      ],
      [
        'Moral is low for everyone these days.',
        'supplies are runnin\' out, and it seems',
        'like there\'s  more of them... THINGS out',
        'there every day. We\'re losin\' folks',
        'left and right.',
      ],
      [
        'But enough of that gloom and doom.',
        'I came over here to tell ya that we got some',
        'good news for a change.',
      ],
      [
        'The scouts came back and they found somethin\'.',
        'Somethin\' big.',
      ],
      [
        'It\'s a town. One of them... gated communities.',
        'They say it\'s got strong walls, housin\', medical',
        'facilities... you name it. And they say it\'s',
        'mostly intact. Could be a great place to hole',
        'up and ride this thing out.',
      ],
      [
        'Better than runnin\' around scavengin\' every',
        'day. Never knowin\' when we\'re gonna run into',
        'more of them creatures.',
      ],
      [
        'There\'s just one catch. The whole place is',
        'still crawlin\' with zombies. We\'re gonna have',
        'to clear \'em out before we can make much',
        'use of the place.',
      ],
      [
        'But I think we can do it. We\'ve got the people.',
        'We\'ve got the guns. And the scouts were able',
        'to map out the town. I\'m thinkin\' if we move in',
        'strategic-like and clear it out area by area we',
        'might just have a chance.',
      ],
      [
        'Anyway, it\'s the best hope we got. So whadda',
        'ya say? You in? The others are gearin\' up right',
        'now. Grab yer pack, get yer gun, and let\'s go',
        'put some zombies to rest.',
      ],
    ],
  },
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
