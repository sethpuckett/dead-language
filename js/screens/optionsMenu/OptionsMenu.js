import Phaser from 'phaser';
import { screens, images, depth, optionsMenu, userOptions } from '../../config';
import optionsMenuUiHelper from '../ui/optionsMenuUiHelper';
import UserOptionsManager from '../../data/UserOptionsManager';
import AudioManager from '../../audio/AudioManager';

const MUSIC_VALUES = [userOptions.values.on, userOptions.values.off];
const SOUND_EFFECTS_VALUES = [userOptions.values.on, userOptions.values.off];
const TEXT_SIZE_VALUES = [userOptions.values.normal, userOptions.values.large];
const BLOOD_VALUES = [userOptions.values.red, userOptions.values.green, userOptions.values.off];
const FONT_VALUES = [userOptions.values.pixel, userOptions.values.smooth];
const RETURN = 'return';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.optionsMenu });
  }

  init() {
    this.optionsManager = new UserOptionsManager(this.sys.game);
    this.audioManager = new AudioManager(this);
    this.inputHandled = false;

    this.selectedOption = 0;
    this.menuOptions = [
      { key: userOptions.music, label: optionsMenu.labels.music, values: MUSIC_VALUES },
      {
        key: userOptions.soundEffects,
        label: optionsMenu.labels.soundEffects,
        values: SOUND_EFFECTS_VALUES,
      },
      { key: userOptions.font, label: optionsMenu.labels.font, values: FONT_VALUES },
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
    this.createAudio();
    this.enableInputHandling();

    this.audioManager.playMusic();
  }

  createAudio() {
    this.audioManager.setMusic(optionsMenu.audio.backgroundMusic);
    this.audioManager.addSound(optionsMenu.audio.menuMove);
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

  clearMenu() {
    if (this.menuBitmapTexts != null) {
      this.menuBitmapTexts.forEach((text) => {
        text.destroy();
      });

      this.menuBitmapTexts = null;
    }
  }

  createMenu() {
    this.clearMenu();

    const fontValue = this.selectedValues.find(v => v.key === userOptions.font).value;
    this.menuBitmapTexts = [];
    this.menuStates = [];
    this.menuOptions.forEach((option, i) => {
      const labelY = this.ui.menuBaseY + (this.ui.menuVerticalPadding * i);
      const labelText = this.add.bitmapText(
        this.ui.menuLabelBaseX,
        labelY,
        this.optionsManager.getFontForUserOption(fontValue),
        option.label,
        optionsMenu.fonts.labelSize
      );
      labelText.setOrigin(this.ui.menuLabelOriginX, this.ui.menuLabelOriginY);
      labelText.setDepth(depth.optionsMenu.text);
      labelText.setTintFill(optionsMenu.fonts.labelTint);
      this.menuBitmapTexts.push(labelText);

      const valueTexts = [];
      let totalValueWidth = 0;
      option.values.forEach((value) => {
        const valueX = this.ui.menuValueBaseX + totalValueWidth;
        const valueY = this.ui.menuBaseY + (this.ui.menuVerticalPadding * i);
        const valueText = this.add.bitmapText(
          valueX,
          valueY,
          this.optionsManager.getFontForUserOption(fontValue),
          value,
          optionsMenu.fonts.optionSize
        );
        valueText.setOrigin(this.ui.menuValueOriginX, this.ui.menuValueOriginY);
        valueText.setDepth(depth.optionsMenu.text);
        valueText.setTintFill(optionsMenu.fonts.optionTint);
        const bounds = valueText.getTextBounds().global;

        totalValueWidth += bounds.width + this.ui.menuValueHorizontalPadding;

        valueTexts.push(valueText);
        this.menuBitmapTexts.push(valueText);
      });
      const menuState = { key: option.key, label: labelText, values: valueTexts };
      this.menuStates.push(menuState);
    });

    const returnY = this.ui.menuBaseY + (this.ui.menuVerticalPadding * this.menuOptions.length)
                    + this.ui.returnOptionVerticalPadding;
    const returnText = this.add.bitmapText(
      this.ui.returnOptionX, returnY,
      this.optionsManager.getFontForUserOption(fontValue),
      optionsMenu.labels.return,
      optionsMenu.fonts.labelSize
    );
    returnText.setOrigin(this.ui.returnOptionOriginX, this.ui.returnOptionOriginY);
    returnText.setDepth(depth.optionsMenu.text);
    returnText.setTintFill(optionsMenu.fonts.labelTint);
    this.menuBitmapTexts.push(returnText);

    this.menuStates.push({ key: RETURN, label: returnText });
  }

  loadUserOptions() {
    this.selectedValues = [
      { key: userOptions.music },
      { key: userOptions.soundEffects },
      { key: userOptions.font },
      { key: userOptions.textSize },
      { key: userOptions.blood },
    ];

    this.selectedValues.forEach((v) => {
      const value = this.optionsManager.getOptionValue(v.key);
      const menuOption = this.menuOptions.find(o => o.key === v.key);
      const index = menuOption.values.findIndex(o => o === value);

      v.selectedIndex = index;
      v.value = value;
    });
  }

  enableInputHandling() {
    if (!this.inputHandled) {
      this.inputHandled = true;
      this.createInput();
    }
  }

  disableInputHandling() {
    if (this.inputHandled) {
      this.inputHandled = false;
      this.keys = null;
      this.input.keyboard.off('keydown', this.handleKeyDown);
    }
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
    } else if (menuState.key === userOptions.font) {
      this.createMenu();
      this.createOptionSelector();
      this.createAllValueSelectors();
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
    } else if (menuState.key === userOptions.font) {
      this.createMenu();
      this.createOptionSelector();
      this.createAllValueSelectors();
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
    let startX = 0;
    let endX = 0;

    if (menuLabel.originX === 1) {
      startX = bounds.x - bounds.width;
      endX = bounds.x;
    } else if (menuLabel.originX === 0.5) {
      startX = bounds.x - (bounds.width / 2.0);
      endX = bounds.x + (bounds.width / 2.0);
    }

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
      this.disableInputHandling();
      this.optionsManager.setOptions(this.selectedValues, () => {
        this.cameras.main.fade(optionsMenu.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
      });
    }
  }

  getSelectedOptionKey() {
    return this.menuStates[this.selectedOption].key;
  }

  fadeCallback(_camera, progress) {
    this.audioManager.setMusicVolume(1 - progress);
    if (progress === 1) {
      this.audioManager.stopMusic();
      this.scene.start(screens.titleMenu);
    }
  }

  setMusicState() {
    const musicValue = this.selectedValues.find(v => v.key === userOptions.music).value;
    if (musicValue === userOptions.values.on) {
      this.audioManager.playMusic(true);
    } else if (musicValue === userOptions.values.off) {
      this.audioManager.pauseMusic();
    }
  }

  playMenuMove() {
    const soundValue = this.selectedValues.find(v => v.key === userOptions.soundEffects).value;
    if (soundValue === userOptions.values.on) {
      this.audioManager.playSound(optionsMenu.audio.menuMove, true);
    }
  }
}
