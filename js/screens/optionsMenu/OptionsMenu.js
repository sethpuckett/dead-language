import Phaser from 'phaser';
import { screens, images, depth, fonts, optionsMenu } from '../../config';
import optionsMenuUiHelper from '../ui/optionsMenuUiHelper';

const ON = 'On';
const OFF = 'Off';
const NORMAL = 'Normal';
const LARGE = 'Large';
const RED = 'Red';
const GREEN = 'Green';

const MUSIC = 'music';
const MUSIC_VALUES = [ON, OFF];
const SOUND_EFFECTS = 'sound-effects';
const SOUND_EFFECTS_VALUES = [ON, OFF];
const TEXT_SIZE = 'text-size';
const TEXT_SIZE_VALUES = [NORMAL, LARGE];
const BLOOD = 'blood';
const BLOOD_VALUES = [RED, GREEN, OFF];
const RETURN = 'return';


export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.optionsMenu });
  }

  init() {
    this.currentSelection = 0;
    this.menuOptions = [
      { key: MUSIC, label: optionsMenu.labels.music, values: MUSIC_VALUES },
      { key: SOUND_EFFECTS, label: optionsMenu.labels.soundEffects, values: SOUND_EFFECTS_VALUES },
      { key: TEXT_SIZE, label: optionsMenu.labels.textSize, values: TEXT_SIZE_VALUES },
      { key: BLOOD, label: optionsMenu.labels.blood, values: BLOOD_VALUES },
    ];
  }

  create() {
    this.ui = optionsMenuUiHelper(this.sys.game.config);
    this.createBackground();
    this.createMenu();
    this.createInput();
    this.updateMenuSelection();
    // this.scene.start(screens.townMap);
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

  createMenu() {
    this.menuOptions.forEach((option, i) => {
      const labelY = this.ui.menuBaseY + (this.ui.menuVerticalPadding * i);
      const labelText = this.add.bitmapText(
        this.ui.menuLabelBaseX, labelY,
        fonts.blueSkyWhite,
        option.label,
        optionsMenu.fonts.textSize
      );
      labelText.setOrigin(this.ui.menuLabelOriginX, this.ui.menuLabelOriginY);
      labelText.setDepth(depth.optionsMenu.text);
      labelText.setTintFill(optionsMenu.fonts.textTint);

      let totalValueWidth = 0;
      option.values.forEach((value) => {
        const valueX = this.ui.menuValueBaseX + totalValueWidth;
        const valueY = this.ui.menuBaseY + (this.ui.menuVerticalPadding * i);
        const valueText = this.add.bitmapText(
          valueX, valueY,
          fonts.blueSkyWhite,
          value,
          optionsMenu.fonts.textSize
        );
        valueText.setOrigin(this.ui.menuValueOriginX, this.ui.menuValueOriginY);
        valueText.setDepth(depth.optionsMenu.text);
        valueText.setTintFill(optionsMenu.fonts.textTint);
        const bounds = valueText.getTextBounds().global;

        totalValueWidth += bounds.width + this.ui.menuValueHorizontalPadding;
      });
    });

    const returnY = this.ui.menuBaseY + (this.ui.menuVerticalPadding * this.menuOptions.length)
                    + this.ui.returnOptionVerticalPadding;
    const returnText = this.add.bitmapText(
      this.ui.returnOptionX, returnY,
      fonts.blueSkyWhite,
      optionsMenu.labels.return,
      optionsMenu.fonts.textSize
    );
    returnText.setOrigin(this.ui.returnOptionOriginX, this.ui.returnOptionOriginY);
    returnText.setDepth(depth.optionsMenu.text);
    returnText.setTintFill(optionsMenu.fonts.textTint);
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys(
      'SPACE,ENTER,UP,DOWN,LEFT,RIGHT,TAB'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.UP.keyCode) {
      this.decrementMenuSelection();
    } else if (e.keyCode === this.keys.DOWN.keyCode) {
      this.incrementMenuSelection();
    } else if (e.keyCode === this.keys.SPACE.keyCode
              || e.keyCode === this.keys.ENTER.keyCode
              || e.keyCode === this.keys.RIGHT.keyCode) {
      // TODO: increment selected option
    } else if (e.keyCode === this.keys.LEFT.keyCode) {
      // TODO: decrement selected options
    }
  }

  decrementMenuSelection() {
    this.currentSelection = Math.max(this.currentSelection - 1, 0);
    this.updateMenuSelection();
  }

  incrementMenuSelection() {
    this.currentSelection = Math.min(this.currentSelection + 1, this.menuOptions.length - 1);
    this.updateMenuSelection();
  }

  updateMenuSelection() {
    // this.selector.y = this.ui.selectY + (this.ui.selectVerticalPadding * this.currentSelection);
  }
}
