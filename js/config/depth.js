export default {
  minigame: {
    background: 0,
    splatter: 1,
    // 1000 - 3999 reserved for zombies & zombie text
    zombieTextBackground: 1000,
    zombieText: 1001,
    zombie: 2000,
    shotBlast: 4000,
  },
  titleMenu: {
    sky: 0,
    backGrass: 1,
    // 2 - 10 reserved for back zombies
    backZombies: 2,
    trees: 11,
    // 12 - 20 reserved for front zombies
    frontZombies: 12,
    frontGrass: 21,
    text: 22,
  },
  hud: {
    buffer: 900,
    ui: 901,
    entryText: 902,
  },
  vocabStudy: {
    background: 0,
    objects: 1,
    bottle: 2,
    shotBlast: 3,
    wordBackground: 3,
    word: 4,
  },
  modal: {
    fade: 10000,
    bg: 10001,
    border: 10002,
    text: 10003,
  },
  choiceModal: {
    fade: 10000,
    bg: 10001,
    border: 10002,
    text: 10003,
    selector: 10003,
  },
  townMap: {
    border: 10,
    mapGrid: 10,
  },
  endgame: {
    background: 0,
    text: 1,
  },
};
