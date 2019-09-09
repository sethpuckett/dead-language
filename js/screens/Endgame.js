import Phaser from 'phaser';
import { fonts, endgame, screens, images, depth, gameTypes } from '../config';
import endgameUiHelper from './ui/endgameUiHelper';
import ModalChecker from './modal/ModalChecker';
import GameProgressManager from '../data/GameProgressManager';
import AudioManager from '../audio/AudioManager';

const MAP = 'map';
const REDO = 'redo';
const PRACTICE = 'practice';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.endgame });
  }

  init(params) {
    this.progressManager = new GameProgressManager(this.sys.game.db);
    this.params = params;
    this.currentSelection = 0;
    this.inputHandled = false;
    this.won = this.params.status === endgame.win;
    this.stageId = this.params.stageId;

    this.winOptions = [{ text: 'Return to Map', key: MAP }];
    this.loseOptions = [{ text: 'Try Again', key: REDO }, { text: 'Return to Map', key: MAP }];
    if (this.allowTargetPractice()) {
      this.loseOptions.push({ text: 'Target Practice', key: PRACTICE });
    }

    this.ModalChecker = new ModalChecker(this, this.stageId, this.won);
    this.audioManager = new AudioManager(this);
  }

  create() {
    this.ui = endgameUiHelper(this.sys.game.config);
    this.showBackground();
    this.showStatus();
    this.createMenu();
    this.createAudio();
    this.enableInputHandling();
    this.updateMenuSelection();

    this.audioManager.playMusic();
    this.checkStartModal();
  }

  showBackground() {
    this.background = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.storyScreenBackground
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
    statusLabel.setTintFill(endgame.fonts.statusTint);
  }

  createAudio() {
    if (this.won) {
      this.audioManager.setMusic(endgame.audio.music.winMusic, endgame.audio.musicConfig.winMusic);
    } else {
      this.audioManager.setMusic(
        endgame.audio.music.loseMusic, endgame.audio.musicConfig.loseMusic
      );
    }

    this.audioManager.addAllSounds(endgame.audio.soundEffects);
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
      text.setTintFill(endgame.fonts.menuTint);
    });

    this.selector = this.add.sprite(
      this.ui.selectX,
      this.ui.selectY,
      images.shotgun,
      images.frames.shotgunNormal
    );
    this.selector.displayWidth = this.ui.selectWidth;
    this.selector.displayHeight = this.ui.selectHeight;
    this.selector.flipX = true;
    this.selector.setOrigin(this.ui.selectOriginX, this.ui.selectOriginY);
  }

  checkStartModal() {
    this.ModalChecker.setBeforeStartCallback(() => {
      this.disableInputHandling();
    });

    this.ModalChecker.setCompletedCallback(() => {
      this.enableInputHandling();
    });

    this.ModalChecker.checkModal();
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
      this.audioManager.playSound(endgame.audio.soundEffects.menuSelect);
      this.selectedOption = this.options[this.currentSelection].key;
      this.selector.setFrame(1);
      this.cameras.main.fade(endgame.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
    }
  }

  decrementMenuSelection() {
    this.audioManager.playSound(endgame.audio.soundEffects.menuMove);
    this.currentSelection = Math.max(this.currentSelection - 1, 0);
    this.updateMenuSelection();
  }

  incrementMenuSelection() {
    this.audioManager.playSound(endgame.audio.soundEffects.menuMove);
    this.currentSelection = Math.min(this.currentSelection + 1, this.options.length - 1);
    this.updateMenuSelection();
  }

  updateMenuSelection() {
    this.selector.y = this.ui.selectY + (this.ui.selectVerticalPadding * this.currentSelection);
  }

  fadeCallback(_camera, progress) {
    if (progress === 1) {
      this.audioManager.stopMusic();
      if (this.selectedOption === MAP) {
        this.scene.start(screens.townMap);
      } else if (this.selectedOption === PRACTICE) {
        this.scene.start(screens.vocabStudy, this.params.stageId);
      } else if (this.selectedOption === REDO) {
        this.scene.start(screens.minigame, this.params.stageId);
      }
    }
  }

  allowTargetPractice() {
    return this.progressManager.getStageType(this.stageId) === gameTypes.zombieAssault;
  }
}
