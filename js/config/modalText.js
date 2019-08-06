import screens from './screens';
import modalChecks from './modalChecks';
import unlockableItems from './unlockableItems';
import lessons from './lessons';

export default [
  {
    id: 'game-intro',
    text: [
      [
        '¡Hola! ¿Estás despierto?',
      ],
      [
        'Oops! Sorry! I forgot that your Spanish',
        'still needs some work. No te preocupes.',
        'You\'ll get the hang of it.',
      ],
      [
        'Anyway, how are you holding up?',
      ],
      [
        'Tired? Yo también. Everyone is tired.',
        'Running from the zombies is hard work.',
        'But I suppose it\'s better than',
        'the alternative!',
      ],
      [
        'I don\'t know how much longer we can',
        'keep it up. Supplies are running out.',
        'And there are more of those... THINGS out',
        'there every day.',
      ],
      [
        'But enough gloom and doom. I came over here',
        'to tell you that we\'ve got some good news',
        'for a change.',
      ],
      [
        'The scouts came back and they found something.',
        'Something big!',
      ],
      [
        'It\'s a town. Some kind of gated community.',
        'They say it\'s got strong walls, food, housing',
        'medical facilities... you name it. And they',
        'say it\'s mostly intact. It could be a',
        'great place to hole up and ride this',
        'thing out.',
      ],
      [
        'It\'s better than running around out here',
        'in the open, scavenging for food, and never',
        'knowing when we\'re going to run into more of',
        'those creatures.',
      ],
      [
        'There\'s just one catch. The whole town is',
        'still crawling with muertos. We\'ll have',
        'to clear them out before we can make much',
        'use of the place.',
      ],
      [
        'But I think we can do it. We\'ve got the people.',
        'We\'ve got the guns. And the scouts were able',
        'to map out the whole town. If we move in',
        'strategically and clear it out area by area',
        'we might just have a chance.',
      ],
      [
        'Anyway, it\'s the best hope we\'ve got.',
        'So, what do you say? Are you in? The others',
        'are gearing up right now. Grab your pack,',
        'get your gun, and let\'s go kill some zombies!',
        '¡Vamos!',
      ],
    ],
  },
  {
    id: 'map-intro',
    screen: screens.townMap,
    checks: [
      { checkType: modalChecks.completedStageCount, checkValue: 0 },
    ],
    repeat: false,
    text: [
      [
        'This is the town map. From here you can see',
        'all the areas we\'ve cleared out along with',
        'all the areas that are still infested.',
      ],
      [
        'Each area has it\'s own category of vocab',
        'that you\'ll need to learn if you want to',
        'stand a chance against those muertos.',
      ],
      [
        'As you can see we\'ve got our work cut out',
        'for us. But I think we can do it.',
      ],
      [
        'Now, we can\'t just go running into town',
        'without a plan. We need to clear this place',
        'out area by area. Let\'s start with the "Front',
        'Gate. I\'ve marked it in yellow on your map.',
      ],
      [
        'Try selecting the "Front Gate" on the map and',
        'I\'ll show you what we need to do.',
      ],
    ],
  },
  {
    id: 'stage-select-intro',
    text: [
      [
        'Each area on the map contains one or more',
        'stages. Now that you\'ve selected an area',
        'you need to pick a stage. Each one has',
        'its own challenges and its own vocab.',
      ],
      [
        'Go ahead and pick the first stage. You\'ll',
        'have the opportunity to do some target',
        'practice before you take on the zombies.',
        'I recommend that you take advantage',
        'of it.',
      ],
    ],
  },
  {
    id: 'first-stage-game-locked',
    text: [
      [
        'It\'s a bad idea to go in unprepared.',
        'Why don\'t you try some target practice first?',
      ],
    ],
  },
  {
    id: 'minigame-intro',
    screen: screens.minigame,
    checks: [
      { checkType: modalChecks.completedStageCount, checkValue: 0 },
    ],
    repeat: true,
    text: [
      [
        'The muertos will be here any second!',
        'I sure hope you got enough practice.',
      ],
      [
        'They\'re vile, disgusting creatures, but',
        'try to stay calm when you see them.',
      ],
      [
        'Remember your target practice. Shooting a',
        'zombie is the same as shooting a bottle. Just',
        'focus on the vocab next to each one,',
        'type the translation, and press \'Enter\'',
        'to take \'em out.',
      ],
      [
        'But don\'t take too long! If a zombie gets through',
        'they\'ll attack. Take too many hits and you\'re',
        'a goner.',
      ],
      [
        'And keep an eye on that timer at the bottom',
        'of the screen. You just need to survive',
        'until that reaches \'0\'.',
      ],
      [
        'Okay! Here they come! ¡Ten cuidado!',
      ],
    ],
  },
  {
    id: 'vocab-study-intro',
    screen: screens.vocabStudy,
    checks: [
      { checkType: modalChecks.completedStageCount, checkValue: 0 },
    ],
    repeat: true,
    text: [
      [
        'This is target practice. You\'re going to need',
        'it. You won\'t stand a chance against those',
        'zombies if you\'re not prepared.',
      ],
      [
        'From this screen you can see all of the vocab',
        'for the current stage. Some stages will have',
        'more than others. It looks like we should have',
        'it pretty easy for our first go.',
      ],
      [
        'Before you start the stage you should memorize',
        'all the translations on this screen. You can',
        'use the controls at the bottom of the screen to',
        'hide either language if it helps you study.',
      ],
      [
        'You can also practice if you want to test',
        'your skills before taking on the zombies.',
        'Select "Practice" and I\'ll set up some',
        'bottles for your to shoot at.',
      ],
      [
        'Just type the translation for the word under',
        'the bottle and press "Enter". You don\'t have',
        'to worry about time and you don\'t have to',
        'worry about missing.',
      ],
      [
        'If you get tired of target practice you can stop',
        'at any time by pressing "Esc".',
      ],
      [
        'Okay, I\'ll leave you to it. Practice as much',
        'as you need. When you\'re ready you can start',
        'the game with the controls at the bottom.',
      ],
    ],
  },
  {
    id: 'first-win',
    screen: screens.endgame,
    checks: [
      { checkType: modalChecks.completedStageCount, checkValue: 1 },
      { checkType: modalChecks.stageWon },
    ],
    repeat: false,
    text: [
      [
        '¡Felicidades! You did it!',
      ],
      [
        'We\'ve got a long way to go, but this is a great',
        'start. I really think we have a chance!',
      ],
      [
        'On this screen you can check out your stats for',
        'the last stage. When you\'re ready to move',
        'on head back to the map and see what\'s next.',
      ],
      [
        'Oh, and just a heads up... I got some news',
        'from the scouts. They\'ve seen something in the',
        'the next area. Something bad. I\'ll tell you',
        'all about it when we get there.',
      ],
    ],
  },
  {
    id: 'first-loss',
    screen: screens.endgame,
    checks: [
      { checkType: modalChecks.stageLost },
    ],
    repeat: false,
    text: [
      [
        'Oh no! There\'s too many of them!',
      ],
      [
        'We\'ve got to fall back, but don\'t give up.',
        'This is just a minor setback.',
      ],
      [
        'Maybe you should get in some more target',
        'practice. Study that vocab a little longer',
        'and then get back out there.',
      ],
      [
        'I know you can do it, amigo.',
      ],
    ],
  },
  {
    id: 'stage-locked',
    text: [
      [
        'Whoa, slow down! The enthusiasm is great,',
        'but we should clear these stages out in',
        'order. You\'ve still got some work to',
        'do before you take this one on.',
      ],
    ],
  },
  {
    id: 'lesson-locked',
    text: [
      [
        'Ten cuidado! That area\'s still too',
        'dangerous. You\'ll never make it there alive!',
        'I marked the spots we can get to in yellow on',
        'the map. Stick to those!',
      ],
    ],
  },
  {
    id: 'sprinter-unlocked',
    screen: screens.minigame,
    checks: [
      { checkType: modalChecks.itemUnlocked, checkValue: unlockableItems.sprinterZombie },
    ],
    repeat: false,
    text: [
      [
        'Welcome back. I hope you got enough practice.',
        'The scouts are reporting something new out there.',
      ],
      [
        'The only good thing about fighting zombies is',
        'that they\'re slow, right?',
      ],
      [
        'Well, not any more. We\'ve gotten reports of',
        'running zombies! You can\'t miss them. They\'re',
        'bright red and they\'re a lot faster than anything',
        'we\'ve seen before.',
      ],
      [
        'The scouts have been calling them Sprinters.',
        'If you spot a Sprinter take it out immediately.',
        'If you hesitate they\'ll be right on top of us.',
      ],
      [
        'You\'ll need to think strategically from',
        'now on. Sometimes you\'ll have to ignore a slow',
        'zombie for a bit to focus on a bigger threat',
        'in the back.',
      ],
      [
        'Okay, get ready. Here they come. ¡Buena suerte!',
      ],
    ],
  },
  {
    id: 'food-unlocked',
    screen: screens.minigame,
    checks: [
      { checkType: modalChecks.itemUnlocked, checkValue: unlockableItems.foodTier1 },
    ],
    repeat: false,
    text: [
      [
        'Keep up the good work. Just a few more stages',
        'to clear.',
      ],
      [
        'By the way, are you getting hungry yet? The',
        'scouts have reported that there is still',
        'quite a bit of food in town. Picking some up',
        'should give you a health boost if those',
        'zombies are getting to you.',
      ],
      [
        'Keep an eye out for food while you\'re taking',
        'care of business out there. Picking it up',
        'should be familiar. Each food item will have',
        'a word next to it. Type the translation to',
        'grab it.',
      ],
      [
        'Each piece of food will give you some health',
        'back. But be quick about it, food won\'t last',
        'long out there.',
      ],
    ],
  },
  {
    id: 'mercenary-unlocked',
    screen: screens.minigame,
    checks: [
      { checkType: modalChecks.itemUnlocked, checkValue: unlockableItems.mercenary },
    ],
    repeat: false,
    text: [
      [
        'You\'re doing great. How are you feeling?',
        'Is your head spinning yet?',
      ],
      [
        'I know it can be hard to remember every',
        'single vocab word all by yourself. And',
        'there are only going to be more as we',
        'make our way into town.',
      ],
      [
        'But don\'t give up just yet. Some help just',
        'arrived. It seems a mysterious stranger',
        'has seen what we\'re up to and has offered',
        'some assistance... for a price.',
      ],
      [
        'She\'s what you might call a mercenary.',
        'She\'s willing to kill any zombies that',
        'are giving you trouble, as long as you can',
        'afford her services.',
      ],
      [
        'And what does she want, you ask? The same',
        'thing that all mercenaries want... dinero!',
        'Cold, hard, cash.',
      ],
      [
        'I don\'t know what she\'s planning to do with',
        'all that money in this zombie-infested',
        'wasteland, but that\'s not really any of our',
        'business.',
      ],
      [
        'So here\'s how it works. Before you can take',
        'advantage of the mercenary\'s services you',
        'need to find some cash. It\'s bound to be',
        'lying around out there. Pick it up just like',
        'you would any other item. Type the',
        'translation and it\'s yours.',
      ],
      [
        'The mercenary\'s standard rate is $100 per',
        'zombie. Once you have enough cash you can',
        'call on her to shoot any zombie that you can',
        'see. This could be helpful if there\'s some',
        'vocab that you just can\'t remember.',
      ],
      [
        'Calling her is easy enough. Just type the English',
        'word under the zombie you want her to take out',
        'and press \'Enter\'. She\'ll take your cash',
        'and eliminate the zombie.',
      ],
      [
        'It\'s a good idea to keep some money on hand',
        'in case you need to call on her. Here, I\'ll',
        'give you some to get started. And remember',
        'to keep an eye out for any more lying around.',
      ],
      [
        'Alright, that\'s enough chit-chat. Get out',
        'there kill some zombies.',
      ],
    ],
  },
  {
    id: 'review-intro',
    screen: screens.townMap,
    checks: [
      { checkType: modalChecks.stageCompleted, checkValue: lessons.basicVocab.stage4 },
    ],
    repeat: false,
    text: [
      [
        'The front gate is almost clear. You\'re doing',
        'a great job out there.',
      ],
      [
        'The last stage won\'t be easy, though.',
        'It\'s packed with zombies and it covers',
        'vocab from the entire lesson.',
      ],
      [
        'That means you\'ll have to know all the',
        'vocab from the previous stages if you want',
        'to stand a chance.',
      ],
      [
        'You can go back to target practice for any',
        'stage, or just replay the stages if you need',
        'more practice.',
      ],
      [
        'We\'re all rooting for you, amigo. Now get',
        'out there and do your best.',
      ],
    ],
  },
  {
    id: 'lesson-unlocked-intro',
    screen: screens.townMap,
    checks: [
      { checkType: modalChecks.lessonCompleted, checkValue: lessons.basicVocab.name },
    ],
    repeat: false,
    text: [
      [
        '¡Hurra! You did it! The front gate is clear.',
      ],
      [
        'But we can\'t stop now. There\'s still a lot',
        'of work to do.',
      ],
      [
        'I\'ve marked the areas on your map that we',
        'should check out next. Whenever you\'re',
        'ready head to one of the locations in yellow.',
      ],
      [
        'Oh, and you\'re welcome to go back and check',
        'out a location that we\'ve already cleared',
        'if you want to review old vocab. I\'m sure',
        'there are still a few zombies prowling',
        'around back there.',
      ],
    ],
  },
];
