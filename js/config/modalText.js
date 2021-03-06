import screens from './screens';
import modalChecks from './modalChecks';
import unlockableItems from './unlockableItems';
import lessons from './lessons';
import game from './game';

export default [
  {
    id: 'game-intro',
    text: [
      [
        '¡Hola! ¿Estás despierto?',
      ],
      [
        'Oh! Sorry! I forgot that your Spanish',
        'still needs some work. No te preocupes.',
        'You\'ll get the hang of it.',
      ],
      [
        'Anyway, how are you holding up?',
      ],
      [
        'Tired? Yo también. Everyone is tired.',
        'Running from the zombies is hard work.',
        'But it\'s better than the alternative!',
      ],
      [
        'I don\'t know how much longer we can',
        'keep it up. Supplies are running out.',
        'And there are more of those... THINGS out',
        'there every day.',
      ],
      [
        'But all that is about to change. I\'ve got some',
        'good news. The scouts came back and they found',
        'something. Something big!',
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
        'There\'s just one catch. The whole town is',
        'still crawling with muertos. We\'ll have',
        'to clear them out before we can make much',
        'use of the place.',
      ],
      [
        'But I think we can do it. We\'ve got the people',
        'and we\'ve got the firepower.',
      ],
      [
        'Anyway, it\'s the best hope we\'ve got.',
        'So, what do you say? Are you in? The others',
        'are gearing up right now. Grab your pack,',
        'get your gun, and let\'s go blast some muertos!',
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
        'all the areas we\'ve cleared out so far along',
        'with the upcoming areas we\'ve scouted.',
      ],
      [
        'Each location has it\'s own set of vocabulary',
        'words that you\'ll need to learn in order to',
        'clear out the muertos.',
      ],
      [
        'As you can see we\'ve got our work cut out',
        'for us. But I think we can do it.',
      ],
      [
        'Now, we can\'t just go running into town',
        'without a plan. We need to clear this place',
        'out area by area. Let\'s start with the "Front',
        'Gate". I\'ve marked it in yellow on your map.',
      ],
      [
        'Select the "Front Gate" on the map and',
        'let\'s get started.',
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
      { checkType: modalChecks.loggedIn },
      { checkType: modalChecks.completedStageCount, checkValue: 0 },
    ],
    repeat: true,
    text: [
      [
        'The muertos will be here any second!',
        'I sure hope you got enough practice.',
      ],
      [
        'They\'re vile creatures, but try to stay calm',
        'when you see them.',
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
        'of the screen. You just need to blast muertos',
        'until that reaches \'0\' to complete the stage.',
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
        'When you think you know the words you can test',
        'your knowledge by shooting at some bottles.',
        'Select "Practice" and I\'ll set them up for you.',
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
        'When you\'re ready to move on head back to the',
        'map and let\'s see what\'s next.',
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
        'do before you head in there.',
      ],
    ],
  },
  {
    id: 'lesson-locked',
    text: [
      [
        'Ten cuidado! That area\'s still too',
        'dangerous. We\'ll never make it there!',
        'I marked the spots we can get to in yellow on',
        'the map. Stick to those!',
      ],
    ],
  },
  {
    id: 'sprinter-unlocked',
    screen: screens.minigame,
    checks: [
      { checkType: modalChecks.loggedIn },
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
        'Well, not any more. We\'ve received reports of',
        'running muertos! You can\'t miss them. They\'re',
        'bright red and they\'re a lot faster than anything',
        'we\'ve seen before.',
      ],
      [
        'The scouts have been calling them sprinters.',
        'If you spot a sprinter take it out immediately.',
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
      { checkType: modalChecks.loggedIn },
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
      { checkType: modalChecks.loggedIn },
      { checkType: modalChecks.itemUnlocked, checkValue: unlockableItems.mercenary },
    ],
    repeat: false,
    text: [
      [
        'You\'re doing great. How are you feeling?',
        'Is your head spinning yet?',
      ],
      [
        'I know it can be hard to remember every single',
        'vocab word. And there are only going to more as',
        'we make our way into town.',
      ],
      [
        'But don\'t give up yet. Some help just arrived.',
        'It seems a mysterious stranger has seen what',
        'we\'re up to and has offered some assistance...',
        'for a price.',
      ],
      [
        'She\'s what you might call a mercenary. She\'s',
        'willing to kill any zombies that are giving you',
        'trouble, as long as you can afford her services.',
      ],
      [
        'And what does she want? The same thing that all',
        'mercenaries want... dinero! Cold, hard, cash.',
      ],
      [
        'I don\'t know what she\'s planning to do with',
        'all that money in this zombie-infested',
        'wasteland, but that\'s not really any of our',
        'business.',
      ],
      [
        'Here\'s how it works. Before you can take',
        'advantage of the mercenary\'s services you',
        'need to find some money. It\'s bound to be',
        'lying around out there. Pick it up just like',
        'you would any other item. Type the',
        'translation and it\'s yours.',
      ],
      [
        'Once you have some cash calling her is easy',
        'enough. Just type the English word under the',
        'zombie you want her to take out and press',
        '\'Enter\'. She\'ll take your cash and eliminate',
        'the muerto.',
      ],
      [
        'It\'s a good idea to keep some money on hand',
        'in case you need to call on her. Here, I\'ll',
        'give you some to get started. And remember',
        'to keep an eye out for any more lying around.',
      ],
      [
        'Alright, that\'s enough chit-chat. Time to get',
        'back out there.',
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
        'You did it! The front gate is clear.',
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
  {
    id: 'review-zombie-unlocked',
    screen: screens.minigame,
    checks: [
      { checkType: modalChecks.loggedIn },
      { checkType: modalChecks.itemUnlocked, checkValue: unlockableItems.reviewZombie },
    ],
    repeat: false,
    text: [
      [
        'Are you ready to clear out the next area?',
        'I hope you studied the new vocab.',
      ],
      [
        'And I hope you haven\'t forgotten all the',
        'vocab from the last lesson. You\'ve got to',
        'keep that fresh in your mind, too, because',
        'you will see it again.',
      ],
      [
        'The scouts are reporting that there are pale',
        'zombies in this area that have review vocab',
        'from the last area.',
      ],
      [
        'You will continue to see vocab from all cleared',
        'areas show up as review vocab later in the game.',
        'So don\'t forget it!',
      ],
    ],
  },
  {
    id: 'bruiser-unlocked',
    screen: screens.minigame,
    checks: [
      { checkType: modalChecks.loggedIn },
      { checkType: modalChecks.itemUnlocked, checkValue: unlockableItems.bruiserZombie },
    ],
    repeat: false,
    text: [
      [
        'Heads up. I\'ve got the latest from the',
        'scouts and it\'s not good.',
      ],
      [
        'There\'s a new type of zombie out there that\'s',
        'even worse than the Sprinters. Those muertos',
        'throw something new at us at every turn. ',
      ],
      [
        'They say these new zombies are big. Real big.',
        'They\'re slower than the other zombies, but a',
        'lot tougher to kill. The scouts have been',
        'calling them Bruisers. You can\'t bring down',
        'a Bruiser with just one shot like the other',
        'zombies.',
      ],
      [
        'In fact, it takes three shots to kill each one',
        'of these monsters. And three shots means three',
        'vocab words. I hope you got enough practice!',
      ],
      [
        'Thankfully there\'s not a lot of them... yet.',
        'But if you see one take it out quickly. It',
        'will take some time to bring down one of',
        'those bestias, so don\'t wait too long.',
      ],
      [
        'Alright, that\'s all the news for now.',
      ],
    ],
  },
  {
    id: 'shotgun-unlocked',
    screen: screens.minigame,
    checks: [
      { checkType: modalChecks.loggedIn },
      { checkType: modalChecks.itemUnlocked, checkValue: unlockableItems.shotgun },
    ],
    repeat: false,
    text: [
      [
        'Wow, those bruisers are pretty tough.',
      ],
      [
        'I think it\'s time for us to level the',
        'playing field. And the latest intel is that',
        'this town might have exactly what we need.',
      ],
      [
        'That pistol is great for your average muerto,',
        'but when it comes to Bruisers what we really',
        'need are shotguns! And it just so happens',
        'that this town is full of them!',
      ],
      [
        'Huh? What do you mean where did they come',
        'from? We\'re living in a zombie hellscape',
        'and you\'re worried about where the guns',
        'are coming from? Come on!',
      ],
      [
        'Anyway, you know the drill. When you see',
        'a shotgun you can pick it up just like',
        'other items. And with a shotgun you can',
        'kill Bruisers with a single blast.',
      ],
      [
        'But unlike your pistol the shotgun has limited',
        'ammo. There\'s no sense wasting good shotgun',
        'ammo on a regular zombie when your pistol works',
        'just as well. So try to save the big guns for',
        'the Bruisers.',
      ],
      [
        'Alright, that\'s enough for now. Happy',
        'hunting out there.',
      ],
    ],
  },
  {
    id: 'demo-minigame',
    screen: screens.minigame,
    checks: [
      { checkType: modalChecks.loggedOut },
    ],
    repeat: true,
    text: [
      [
        'Dead Language is a fast-paced zombie',
        'shoot-em-up and language study game. The',
        'undead hordes are on the march and it\'s up to',
        'you to keep them at bay.',
      ],
      [
        'In this game you don\'t aim and shoot',
        'directly. Instead, you blast the zombies by',
        `translating ${game.language2} vocabulary.`,
        'Under each zombie is a word written out in',
        `${game.language1}. Type out the ${game.language2}`,
        'translation and hit \'Enter\' to take \'em out.',
      ],
      [
        'This demo contains 20 basic vocabulary words',
        'for you to practice. The full game contains',
        'thousands more for you to learn and master,',
        'stage by stage.',
      ],
      [
        'The full game also includes a helpful study',
        'mode so you can learn and practice before',
        'taking on the zombies. There are tons',
        'of items and weapons to collect throughout',
        'the game as well as different types of',
        'enemies to discover.',
      ],
      [
        'If you like the demo you can unlock the full',
        'game by creating an account. It\'s completely',
        'free! Just click the Sign In button to get',
        'started.',
      ],
      [
        'Okay, that\'s enough talking.',
        'Bring on the zombies!',
      ],
    ],
  },
  {
    id: 'demo-win',
    screen: screens.endgame,
    checks: [
      { checkType: modalChecks.loggedOut },
      { checkType: modalChecks.stageWon },
    ],
    repeat: true,
    text: [
      [
        'Congratulations! You did it! you stopped',
        'the zombie horde... for now!',
      ],
      [
        'But this is just the beginning. There\'s a',
        'whole town of zombies waiting just ahead.',
        'And more zombies means more vocab to master.',
        'Not to mention additional items, weapons, and',
        'enemies to discover.',
      ],
      [
        'So what are you waiting for? Log in and let\'s',
        'get started!',
      ],
    ],
  },
  {
    id: 'demo-loss',
    screen: screens.endgame,
    checks: [
      { checkType: modalChecks.loggedOut },
      { checkType: modalChecks.stageLost },
    ],
    repeat: true,
    text: [
      [
        'Oh no! There\'s too many of them! We\'ll have',
        'to retreat... for now!',
      ],
      [
        'But this is just the beginning. There\'s a',
        'whole town of zombies waiting just ahead.',
        'And more zombies means more vocab to master.',
        'Not to mention additional items, weapons, and',
        'enemies to discover.',
      ],
      [
        'So what are you waiting for? Log in and let\'s',
        'get started!',
      ],
    ],
  },
];
