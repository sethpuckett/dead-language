import Phaser from 'phaser';
import { fonts, depth, choiceModal, images } from '../../config';
import choiceModalUiHelper from '../ui/choiceModalUiHelper';
import AudioManager from '../../audio/AudioManager';
import { util } from '../../util';
import UserOptionsManager from '../../data/UserOptionsManager';

const MIN_WIDTH = 450;

export default class {
  constructor(scene, textContent, choices) {
    this.scene = scene;
    this.textContent = textContent;
    this.choices = choices;
    this.ui = choiceModalUiHelper(this.scene.sys.game.config);
    this.audioManager = new AudioManager(this.scene);
    this.optionsManager = new UserOptionsManager(this.scene.sys.game);

    this.selectedIndex = 0;
  }

  draw() {
    this.createChoices();
    this.createText();
    this.createFade();
    this.createBackground();
    this.createBorder();
    this.createAudio();
    this.createSelector();
  }

  close() {
    if (this.fade != null) {
      this.fade.destroy();
      this.fade = null;
    }
    if (this.backgroundGraphics != null) {
      this.backgroundGraphics.destroy();
      this.backgroundGraphics = null;
    }
    if (this.borderGraphics != null) {
      this.borderGraphics.destroy();
      this.borderGraphics = null;
    }
    if (this.choiceTexts != null) {
      this.choiceTexts.forEach(t => t.destroy());
      this.choiceTexts = null;
    }
    if (this.selector != null) {
      this.selector.destroy();
      this.selector = null;
    }
    if (this.text != null) {
      this.text.destroy();
      this.text = null;
    }
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
      this.scene.input.keyboard.off('keydown', this.handleKeyDown);
    }
  }

  // Callback will be called with the index of the option selected
  setCloseCallback(callback) {
    this.closeCallback = callback.bind(this.scene);
  }

  setCancelCallback(callback) {
    this.cancelCallback = callback.bind(this.scene);
  }

  // private

  createAudio() {
    const sounds = util.unique(Object.values(choiceModal.audio));
    sounds.forEach(s => this.audioManager.addSound(s));
  }

  createFade() {
    this.fade = this.scene.add.graphics();
    this.fade.fillStyle(choiceModal.fadeColor, choiceModal.fadeAlpha);
    this.fade.fillRect(0, 0, this.ui.w, this.ui.h);
    this.fade.setDepth(depth.choiceModal.fade);
  }

  createBackground() {
    this.backgroundGraphics = this.scene.add.graphics();
    this.backgroundGraphics.fillStyle(choiceModal.backgroundColor);
    const width = Math.max(this.getMaxTextWidth() + this.ui.textMargin * 2, MIN_WIDTH);
    this.bgRect = new Phaser.Geom.Rectangle(
      this.ui.w / 2 - width / 2,
      this.getChoiceTextYBase() - this.getTextHeightOffset() - this.ui.textMargin,
      width,
      this.getTextHeightOffset() + this.ui.choiceTextVerticalPadding * (this.choices.length - 1)
        + this.ui.textMargin * 2
    );
    this.backgroundGraphics.fillRectShape(this.bgRect);
    this.backgroundGraphics.setDepth(depth.choiceModal.bg);
  }

  createBorder() {
    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.fillStyle(choiceModal.borderColor);
    this.borderGraphics.setDepth(depth.choiceModal.border);

    this.borderGraphics.fillRect(
      this.bgRect.x + this.ui.padding,
      this.bgRect.y + this.ui.padding,
      this.ui.cornerSquareWidth, this.ui.cornerSquareWidth
    );
    this.borderGraphics.fillRect(
      this.bgRect.x + this.bgRect.width - this.ui.cornerSquareWidth - this.ui.padding,
      this.bgRect.y + this.ui.padding,
      this.ui.cornerSquareWidth, this.ui.cornerSquareWidth
    );
    this.borderGraphics.fillRect(
      this.bgRect.x + this.ui.padding,
      this.bgRect.y + this.bgRect.height - this.ui.cornerSquareWidth - this.ui.padding,
      this.ui.cornerSquareWidth, this.ui.cornerSquareWidth
    );
    this.borderGraphics.fillRect(
      this.bgRect.x + this.bgRect.width - this.ui.cornerSquareWidth - this.ui.padding,
      this.bgRect.y + this.bgRect.height - this.ui.cornerSquareWidth - this.ui.padding,
      this.ui.cornerSquareWidth, this.ui.cornerSquareWidth
    );

    this.borderGraphics.fillRect(
      this.bgRect.x + this.ui.cornerSquareWidth + this.ui.padding * 2,
      this.bgRect.y + this.ui.padding + this.ui.cornerSquareWidth / 2 - this.ui.borderWidth / 2,
      this.bgRect.width - this.ui.cornerSquareWidth * 2 - this.ui.padding * 4,
      this.ui.borderWidth
    );
    this.borderGraphics.fillRect(
      this.bgRect.x + this.ui.cornerSquareWidth + this.ui.padding * 2,
      this.bgRect.y + this.bgRect.height - this.ui.padding
        - this.ui.cornerSquareWidth / 2 - this.ui.borderWidth / 2,
      this.bgRect.width - this.ui.cornerSquareWidth * 2 - this.ui.padding * 4,
      this.ui.borderWidth
    );
    this.borderGraphics.fillRect(
      this.bgRect.x + this.ui.padding + this.ui.cornerSquareWidth / 2 - this.ui.borderWidth / 2,
      this.bgRect.y + this.ui.cornerSquareWidth + this.ui.padding * 2,
      this.ui.borderWidth,
      this.bgRect.height - this.ui.cornerSquareWidth * 2 - this.ui.padding * 4
    );
    this.borderGraphics.fillRect(
      this.bgRect.x + this.bgRect.width - this.ui.padding
        - this.ui.cornerSquareWidth / 2 - this.ui.borderWidth / 2,
      this.bgRect.y + this.ui.cornerSquareWidth + this.ui.padding * 2,
      this.ui.borderWidth,
      this.bgRect.height - this.ui.cornerSquareWidth * 2 - this.ui.padding * 4
    );
  }

  createText() {
    const yBase = this.getChoiceTextYBase() - this.ui.textMargin;
    this.text = this.scene.add.bitmapText(
      this.ui.w / 2,
      yBase,
      this.optionsManager.getSelectedFont(),
      this.textContent, choiceModal.textFontSize
    );
    this.text.setOrigin(this.ui.textOriginX, this.ui.textOriginY);
    this.text.setCenterAlign();
    this.text.setDepth(depth.choiceModal.text);
    this.text.setTintFill(choiceModal.textTint);
  }

  createChoices() {
    this.choiceTexts = [];

    this.choices.forEach((choice, index) => {
      const yOffset = this.ui.choiceTextVerticalPadding * index;
      const text = this.scene.add.bitmapText(
        this.ui.choiceTextX,
        this.getChoiceTextYBase() + yOffset,
        this.optionsManager.getSelectedFont(),
        choice,
        choiceModal.choiceFontSize
      );
      text.setOrigin(this.ui.choiceTextOriginX, this.ui.choiceTextOriginY);
      text.setDepth(depth.choiceModal.text);
      text.setTintFill(choiceModal.choiceColor);

      this.choiceTexts.push(text);
    });
  }

  createSelector() {
    this.selector = this.scene.add.sprite(
      this.ui.selectX,
      this.getChoiceTextYBase() + this.ui.choiceTextVerticalPadding * this.selectedIndex,
      images.shotgun,
      images.frames.shotgunNormal
    );
    this.selector.displayWidth = this.ui.selectWidth;
    this.selector.displayHeight = this.ui.selectHeight;
    this.selector.setDepth(depth.choiceModal.selector);
    this.selector.flipX = true;
    this.selector.setOrigin(this.ui.selectOriginX, this.ui.selectOriginY);
  }

  updateSelector() {
    this.selector.y = this.getChoiceTextYBase()
      + this.ui.choiceTextVerticalPadding * this.selectedIndex;
  }

  getMaxTextWidth() {
    let maxWidth = 0;
    this.choiceTexts.forEach((text) => {
      maxWidth = Math.max(maxWidth, text.getTextBounds().global.width * 2);
    });
    if (this.text != null) {
      maxWidth = Math.max(maxWidth, this.text.getTextBounds().global.width);
    }
    return maxWidth;
  }

  getTextHeightOffset() {
    let h = 0;
    if (this.text != null) {
      h = this.text.getTextBounds().global.height + this.ui.textMargin;
    }
    return h;
  }

  getChoiceTextYBase() {
    return this.ui.h / 2 - (this.ui.choiceTextVerticalPadding * (this.choices.length - 1) / 2);
  }

  optionSelected() {
    this.audioManager.playSound(choiceModal.audio.menuSelect);
    this.close();
    this.closeCallback(this.selectedIndex);
  }

  createInput() {
    this.keys = this.scene.input.keyboard.addKeys(
      'SPACE,ENTER,UP,DOWN,ESC'
    );
    this.scene.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.UP.keyCode) {
      this.decrementSelection();
    } else if (e.keyCode === this.keys.DOWN.keyCode) {
      this.incrementSelection();
    } else if (e.keyCode === this.keys.SPACE.keyCode || e.keyCode === this.keys.ENTER.keyCode) {
      this.optionSelected();
    } else if (e.keyCode === this.keys.ESC.keyCode) {
      this.cancelCallback();
    }
  }

  decrementSelection() {
    this.audioManager.playSound(choiceModal.audio.menuMove);
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    this.updateSelector();
  }

  incrementSelection() {
    this.audioManager.playSound(choiceModal.audio.menuMove);
    this.selectedIndex = Math.min(this.selectedIndex + 1, this.choices.length - 1);
    this.updateSelector();
  }
}
