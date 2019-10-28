import audio from './audio';

export default {
  screenFadeTime: 750,
  labels: {
    music: 'Music',
    soundEffects: 'Sound Effects',
    font: 'Font',
    textSize: 'Text Size',
    blood: 'Blood',
    return: 'Save and Exit',
  },
  audio: {
    backgroundMusic: audio.music.catchTheMystery,
    menuMove: audio.menuMove,
  },
  ui: {
    optionSelectorColor: 0xffff22,
    valueSelectorColor: 0xffff22,
  },
  fonts: {
    labelSize: 22,
    labelTint: 0xffffff,
    optionSize: 22,
    optionTint: 0xffffff,
  },
};
