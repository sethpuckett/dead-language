import Phaser from 'phaser';
import { fonts, endgame, screens, images, depth } from '../config';
import endgameUiHelper from './ui/endgameUiHelper';

const MAP = 'map';
const REDO = 'redo';
const PRACTICE = 'practice';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Endgame' });
  }

  init(params) {
    this.params = params;
    this.winOptions = [
      { text: 'Return to Map', key: MAP },
    ];
    this.loseOptions = [
      { text: 'Try Again', key: REDO },
      { text: 'Target Practice', key: PRACTICE },
      { text: 'Return to Map', key: MAP },
    ];
    this.currentSelection = 0;
  }

  create() {
    this.ui = endgameUiHelper(this.sys.game.config);
    this.showBackground();
    this.showStatus();
    this.createMenu();
    this.createInput();
    this.updateMenuSelection();
  }

  showBackground() {
    this.background = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.titleScreenBackground
    );
    this.background.displayWidth = this.ui.backgroundImageWidth;
    this.background.displayHeight = this.ui.backgroundImageHeight;
    this.background.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.background.setDepth(depth.endgame.background);
  }

  showStatus() {
    const statusText = this.params.status === endgame.win ? endgame.winText : endgame.loseText;
    const statusLabel = this.add.bitmapText(
      this.ui.statusLabelX,
      this.ui.statusLabelY,
      fonts.blueSkyWhite,
      statusText,
      endgame.fonts.statusSize
    );
    statusLabel.setOrigin(this.ui.statusLabelOrigin);
    statusLabel.setDepth(depth.endgame.text);
    statusLabel.setTint(endgame.fonts.statusFill);
  }

  createMenu() {
    this.options = this.params.status === endgame.win ? this.winOptions : this.loseOptions;

    this.options.forEach((o, i) => {
      const text = this.add.bitmapText(
        this.ui.menuTextX,
        this.ui.menuTextY + (this.ui.menuTextVerticalPadding * i),
        fonts.blueSkyWhite,
        o.text,
        endgame.fonts.menuSize
      );
      text.setOrigin(this.ui.menuTextOriginX, this.ui.menuTextOriginY);
      text.setDepth(depth.endgame.text);
    });

    this.selector = this.add.sprite(
      this.ui.selectX,
      this.ui.selectY,
      images.shotgun,
      images.frames.shotgunNormal
    );
    this.selector.setScale(images.scales.shotgun);
    this.selector.flipX = true;
    this.selector.setOrigin(this.ui.selectOriginX, this.ui.selectOriginY);
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys(
      'SPACE,ENTER,UP,DOWN'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.UP.keyCode) {
      this.decrementMenuSelection();
    } else if (e.keyCode === this.keys.DOWN.keyCode) {
      this.incrementMenuSelection();
    } else if (e.keyCode === this.keys.SPACE.keyCode || e.keyCode === this.keys.ENTER.keyCode) {
      this.selectedOption = this.options[this.currentSelection].key;
      this.selector.setFrame(1);
      this.cameras.main.fade(endgame.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
    }
  }

  decrementMenuSelection() {
    this.currentSelection = Math.max(this.currentSelection - 1, 0);
    this.updateMenuSelection();
  }

  incrementMenuSelection() {
    this.currentSelection = Math.min(this.currentSelection + 1, this.options.length - 1);
    this.updateMenuSelection();
  }

  updateMenuSelection() {
    this.selector.y = this.ui.selectY + (this.ui.selectVerticalPadding * this.currentSelection);
  }

  fadeCallback(_camera, progress) {
    if (progress === 1) {
      if (this.selectedOption === MAP) {
        this.scene.start(screens.townMap);
      } else if (this.selectedOption === PRACTICE) {
        this.scene.start(screens.vocabStudy, this.params.stageId);
      } else if (this.selectedOption === REDO) {
        this.scene.start(screens.minigame, this.params.stageId);
      }
    }
  }
}
