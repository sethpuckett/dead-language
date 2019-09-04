import Phaser from 'phaser';
import { screens, images, depth, fonts, optionsMenu, userOptions } from '../../config';
import optionsMenuUiHelper from '../ui/optionsMenuUiHelper';
import UserOptionsManager from '../../data/UserOptionsManager';
import AudioManager from '../../audio/AudioManager';

const MUSIC_VALUES = [userOptions.values.on, userOptions.values.off];
const SOUND_EFFECTS_VALUES = [userOptions.values.on, userOptions.values.off];
const TEXT_SIZE_VALUES = [userOptions.values.normal, userOptions.values.large];
const BLOOD_VALUES = [userOptions.values.red, userOptions.values.green, userOptions.values.off];
const RETURN = 'return';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.optionsMenu });
  }

  init() {
    this.userOptionsManager = new UserOptionsManager(this.sys.game.db);
    this.AudioManager = new AudioManager(this);

    this.selectedOption = 0;
    this.menuOptions = [
      { key: userOptions.music, label: optionsMenu.labels.music, values: MUSIC_VALUES },
      {
        key: userOptions.soundEffects,
        label: optionsMenu.labels.soundEffects,
        values: SOUND_EFFECTS_VALUES,
      },
      { key: userOptions.textSize, label: optionsMenu.labels.textSize, values: TEXT_SIZE_VALUES },
      { key: userOptions.blood, label: optionsMenu.labels.blood, values: BLOOD_VALUES },
    ];
  }

  create() {
    this.ui = optionsMenuUiHelper(this.sys.game.config);
    this.loadUserOptions();
    this.createGraphics();
    this.createBackground();
    this.createMenu();
    this.createOptionSelector();
    this.createAllValueSelectors();
    this.createInput();
    this.createAudio();

    this.AudioManager.playMusic();
  }

  createAudio() {
    this.AudioManager.setMusic(optionsMenu.audio.backgroundMusic);
    this.AudioManager.addSound(optionsMenu.audio.menuMove);
  }

  createBackground() {
    this.background = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.storyScreenBackground
    );
    this.background.displayWidth = this.ui.backgroundImageWidth;
    this.background.displayHeight = this.ui.backgroundImageHeight;
    this.background.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.background.setDepth(depth.optionsMenu.background);
  }

  createGraphics() {
    this.optionSelectorGraphics = this.add.graphics();
    this.optionSelectorGraphics.setDepth(depth.optionsMenu.selector);

    this.selectedValues.forEach((value) => {
      const valueSelectedGraphics = this.add.graphics();
      valueSelectedGraphics.setDepth(depth.optionsMenu.selector);
      value.graphics = valueSelectedGraphics;
    });
  }

  createMenu() {
    this.menuStates = [];
    this.menuOptions.forEach((option, i) => {
      const labelY = this.ui.menuBaseY + (this.ui.menuVerticalPadding * i);
      const labelText = this.add.bitmapText(
        this.ui.menuLabelBaseX, labelY,
        fonts.blueSkyWhite,
        option.label,
        optionsMenu.fonts.labelSize
      );
      labelText.setOrigin(this.ui.menuLabelOriginX, this.ui.menuLabelOriginY);
      labelText.setDepth(depth.optionsMenu.text);
      labelText.setTintFill(optionsMenu.fonts.labelTint);

      const valueTexts = [];
      let totalValueWidth = 0;
      option.values.forEach((value) => {
        const valueX = this.ui.menuValueBaseX + totalValueWidth;
        const valueY = this.ui.menuBaseY + (this.ui.menuVerticalPadding * i);
        const valueText = this.add.bitmapText(
          valueX, valueY,
          fonts.blueSkyWhite,
          value,
          optionsMenu.fonts.optionSize
        );
        valueText.setOrigin(this.ui.menuValueOriginX, this.ui.menuValueOriginY);
        valueText.setDepth(depth.optionsMenu.text);
        valueText.setTintFill(optionsMenu.fonts.optionTint);
        const bounds = valueText.getTextBounds().global;

        totalValueWidth += bounds.width + this.ui.menuValueHorizontalPadding;

        valueTexts.push(valueText);
      });
      const menuState = { key: option.key, label: labelText, values: valueTexts };
      this.menuStates.push(menuState);
    });

    const returnY = this.ui.menuBaseY + (this.ui.menuVerticalPadding * this.menuOptions.length)
                    + this.ui.returnOptionVerticalPadding;
    const returnText = this.add.bitmapText(
      this.ui.returnOptionX, returnY,
      fonts.blueSkyWhite,
      optionsMenu.labels.return,
      optionsMenu.fonts.labelSize
    );
    returnText.setOrigin(this.ui.returnOptionOriginX, this.ui.returnOptionOriginY);
    returnText.setDepth(depth.optionsMenu.text);
    returnText.setTintFill(optionsMenu.fonts.labelTint);

    this.menuStates.push({ key: RETURN, label: returnText });
  }

  loadUserOptions() {
    this.selectedValues = [
      { key: userOptions.music },
      { key: userOptions.soundEffects },
      { key: userOptions.textSize },
      { key: userOptions.blood },
    ];

    this.selectedValues.forEach((v) => {
      const value = this.userOptionsManager.getOptionValue(v.key);
      const menuOption = this.menuOptions.find(o => o.key === v.key);
      const index = menuOption.values.findIndex(o => o === value);

      v.selectedIndex = index;
      v.value = value;
    });
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys(
      'SPACE,ENTER,UP,DOWN,LEFT,RIGHT,TAB'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.UP.keyCode) {
      this.decrementOptionSelection();
    } else if (e.keyCode === this.keys.DOWN.keyCode) {
      this.incrementOptionSelection();
    } else if (e.keyCode === this.keys.RIGHT.keyCode) {
      this.incrementValueSelection();
    } else if (e.keyCode === this.keys.LEFT.keyCode) {
      this.decrementValueSelection();
    } else if (e.keyCode === this.keys.SPACE.keyCode || e.keyCode === this.keys.ENTER.keyCode) {
      this.optionSelected();
    }
  }

  decrementOptionSelection() {
    this.selectedOption = Math.max(this.selectedOption - 1, 0);
    this.playMenuMove();
    this.createOptionSelector();
  }

  incrementOptionSelection() {
    this.selectedOption = Math.min(this.selectedOption + 1, this.menuStates.length - 1);
    this.playMenuMove();
    this.createOptionSelector();
  }

  decrementValueSelection() {
    const menuState = this.menuStates[this.selectedOption];
    const selectedValue = this.selectedValues.find(v => v.key === menuState.key);
    selectedValue.selectedIndex = Math.max(selectedValue.selectedIndex - 1, 0);
    selectedValue.value = menuState.values[selectedValue.selectedIndex].text;
    this.playMenuMove();
    if (menuState.key === userOptions.music) {
      this.setMusicState();
    }
    this.createValueSelector(menuState.key);
  }

  incrementValueSelection() {
    const menuState = this.menuStates[this.selectedOption];
    const selectedValue = this.selectedValues.find(v => v.key === menuState.key);
    selectedValue.selectedIndex = Math.min(
      selectedValue.selectedIndex + 1, menuState.values.length - 1
    );
    selectedValue.value = menuState.values[selectedValue.selectedIndex].text;
    this.playMenuMove();
    if (menuState.key === userOptions.music) {
      this.setMusicState();
    }
    this.createValueSelector(menuState.key);
  }

  clearOptionSelector() {
    this.optionSelectorGraphics.clear();
  }

  createOptionSelector() {
    this.clearOptionSelector();

    const menuLabel = this.menuStates[this.selectedOption].label;
    const bounds = menuLabel.getTextBounds().global;

    const startX = bounds.x;
    const endX = bounds.x + bounds.width;
    const startY = bounds.y + bounds.height + this.ui.selectorPadding;
    const endY = startY;

    this.optionSelectorGraphics.lineStyle(
      this.ui.selectorWidth, optionsMenu.ui.optionSelectorColor
    );
    this.optionSelectorGraphics.beginPath();
    this.optionSelectorGraphics.moveTo(startX, startY);
    this.optionSelectorGraphics.lineTo(endX, endY);
    this.optionSelectorGraphics.closePath();
    this.optionSelectorGraphics.strokePath();
  }

  clearAllValueSelectors() {
    this.menuOptions.forEach(o => this.clearValueSelector(o.key));
  }

  createAllValueSelectors() {
    this.menuOptions.forEach(o => this.createValueSelector(o.key));
  }

  clearValueSelector(key) {
    this.selectedValues.find(v => v.key === key).graphics.clear();
  }

  createValueSelector(key) {
    this.clearValueSelector(key);
    const menuState = this.menuStates.find(m => m.key === key);
    const selected = this.selectedValues.find(s => s.key === key);
    const value = menuState.values.find(v => v.text === selected.value);
    const valueBounds = value.getTextBounds().global;

    const startX = valueBounds.x;
    const endX = valueBounds.x + valueBounds.width;
    const startY = valueBounds.y + valueBounds.height + this.ui.selectorPadding;
    const endY = startY;

    selected.graphics.lineStyle(this.ui.selectorWidth, optionsMenu.ui.valueSelectorColor);
    selected.graphics.beginPath();
    selected.graphics.moveTo(startX, startY);
    selected.graphics.lineTo(endX, endY);
    selected.graphics.closePath();
    selected.graphics.strokePath();
  }

  optionSelected() {
    if (this.getSelectedOptionKey() === RETURN) {
      this.userOptionsManager.setOptions(this.selectedValues, () => {
        this.cameras.main.fade(optionsMenu.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
      });
    }
  }

  getSelectedOptionKey() {
    return this.menuStates[this.selectedOption].key;
  }

  fadeCallback(_camera, progress) {
    if (progress === 1) {
      this.AudioManager.stopMusic();
      this.scene.start(screens.titleMenu);
    }
  }

  setMusicState() {
    const musicValue = this.selectedValues.find(v => v.key === userOptions.music).value;
    if (musicValue === userOptions.values.on) {
      this.AudioManager.resumeMusic();
    } else if (musicValue === userOptions.values.off) {
      this.AudioManager.pauseMusic();
    }
  }

  playMenuMove() {
    const soundValue = this.selectedValues.find(v => v.key === userOptions.soundEffects).value;
    if (soundValue === userOptions.values.on) {
      this.AudioManager.playSound(optionsMenu.audio.menuMove, true);
    }
  }
}
