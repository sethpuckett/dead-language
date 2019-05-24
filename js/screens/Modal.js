import Phaser from 'phaser';
import { modal, fonts, depth } from '../config';
import modalUiHelper from './ui/modalUiHelper';

const MIN_WIDTH = 450;

export default class {
  constructor(scene, text) {
    this.scene = scene;
    this.text = text;
    this.ui = modalUiHelper(this.scene.sys.game.config);
  }

  draw() {
    this.createText();
    this.createFade();
    this.createBackground();
    this.createBorder();
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
    if (this.text != null) {
      this.text.destroy();
      this.text = null;
    }
    if (this.flashTimer != null) {
      this.flashTimer.destroy();
      this.flashTimer = null;
    }
    if (this.anyKeyText != null) {
      this.anyKeyText.destroy();
      this.anyKeyText = null;
    }

    this.closeCallback();
  }

  enableInputClose() {
    this.createPressAnyKey();
    this.scene.input.keyboard.on('keydown', this.close, this);
  }

  disableInputHandling() {
    this.scene.input.keyboard.off('keydown', this.close);
  }

  setCloseCallback(callback) {
    this.closeCallback = callback.bind(this.scene);
  }

  // private

  createPressAnyKey() {
    this.anyKeyText = this.scene.add.bitmapText(
      this.ui.w / 2,
      this.bgRect.y + this.bgRect.height - this.ui.cornerSquareWidth,
      fonts.blueSkyWhite,
      modal.pressAnyKeyText,
      modal.fontSize
    );
    this.anyKeyText.setOrigin(this.ui.anyKeyTextOriginX, this.ui.anyKeyTextOriginY);
    this.anyKeyText.setDepth(depth.modal.text);
    this.anyKeyText.setTint(modal.textColor);
    this.pressAnyKeyShown = true;
    this.flashTimer = this.scene.time.addEvent({
      delay: modal.flashDelay,
      callback: () => {
        this.pressAnyKeyShown = !this.pressAnyKeyShown;
        this.anyKeyText.visible = this.pressAnyKeyShown;
      },
      callbackScope: this,
      repeat: -1,
    });
  }

  createFade() {
    this.fade = this.scene.add.graphics();
    this.fade.fillStyle(modal.fadeColor, modal.fadeAlpha);
    this.fade.fillRect(0, 0, this.ui.w, this.ui.h);
    this.fade.setDepth(depth.modal.fade);
  }

  createBackground() {
    this.backgroundGraphics = this.scene.add.graphics();
    this.backgroundGraphics.fillStyle(modal.backgroundColor);
    const bounds = this.text.getTextBounds().global;
    const width = Math.max(bounds.width + this.ui.textMargin * 2, MIN_WIDTH);
    this.bgRect = new Phaser.Geom.Rectangle(
      this.ui.w / 2 - width / 2,
      bounds.y - this.ui.textMargin,
      width,
      bounds.height + this.ui.textMargin * 2 + this.ui.bottomBuffer
    );
    this.backgroundGraphics.fillRectShape(this.bgRect);
    this.backgroundGraphics.setDepth(depth.modal.bg);
  }

  createBorder() {
    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.fillStyle(modal.borderColor);
    this.borderGraphics.setDepth(depth.modal.border);

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
    this.text = this.scene.add.bitmapText(
      this.ui.w / 2, this.ui.h / 2, fonts.blueSkyWhite, this.text, modal.fontSize
    );
    this.text.setOrigin(this.ui.textOrigin);
    this.text.setCenterAlign();
    this.text.setDepth(depth.modal.text);
    this.text.setTint(modal.textColor);
  }
}
