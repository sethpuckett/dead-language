import { modal, fonts, depth } from '../config';
import modalUiHelper from './ui/modalUiHelper';

export default class {
  constructor(scene, width, height, text) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.text = text;

    this.ui = modalUiHelper(this.scene.sys.game.config);
  }

  draw() {
    this.createFade();
    this.createBackground();
    this.createBorder();
    this.createText();
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
      this.ui.h / 2 + this.height / 2 - this.ui.padding
        - this.ui.paddingBig - this.ui.cornerSquareWidth,
      fonts.blueSkyWhite,
      'PRESS ANY KEY TO CONTINUE',
      modal.fontSize
    );
    this.anyKeyText.setOrigin(0.5, 0); // TODO: move to cnofig
    this.anyKeyText.setCenterAlign();
    this.anyKeyText.setDepth(depth.modal.text);
    this.anyKeyText.setTint(modal.textColor);
    this.pressShown = true;
    this.flashTimer = this.scene.time.addEvent({
      delay: modal.flashDelay,
      callback: () => {
        this.pressShown = !this.pressShown;
        this.anyKeyText.visible = this.pressShown;
      },
      callbackScope: this,
      repeat: -1,
    });
  }

  createFade() {
    this.fade = this.scene.add.graphics();
    this.fade.fillStyle(modal.fadeColor, modal.fadeAlpha);
    this.fade.fillRect(
      0, 0, this.ui.w, this.ui.h
    );
    this.fade.setDepth(depth.modal.fade);
  }

  createBackground() {
    this.backgroundGraphics = this.scene.add.graphics();
    this.backgroundGraphics.fillStyle(modal.backgroundColor);
    this.backgroundGraphics.fillRect(
      this.ui.w / 2 - this.width / 2,
      this.ui.h / 2 - this.height / 2,
      this.width,
      this.height
    );
    this.backgroundGraphics.setDepth(depth.modal.bg);
  }

  createBorder() {
    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.fillStyle(modal.borderColor);
    this.borderGraphics.setDepth(depth.modal.border);

    this.borderGraphics.fillRect(
      this.ui.w / 2 - this.width / 2 + this.ui.padding,
      this.ui.h / 2 - this.height / 2 + this.ui.padding,
      this.ui.cornerSquareWidth,
      this.ui.cornerSquareWidth
    );
    this.borderGraphics.fillRect(
      this.ui.w / 2 + this.width / 2 - this.ui.cornerSquareWidth - this.ui.padding,
      this.ui.h / 2 - this.height / 2 + this.ui.padding,
      this.ui.cornerSquareWidth,
      this.ui.cornerSquareWidth
    );
    this.borderGraphics.fillRect(
      this.ui.w / 2 - this.width / 2 + this.ui.padding,
      this.ui.h / 2 + this.height / 2 - this.ui.cornerSquareWidth - this.ui.padding,
      this.ui.cornerSquareWidth,
      this.ui.cornerSquareWidth
    );
    this.borderGraphics.fillRect(
      this.ui.w / 2 + this.width / 2 - this.ui.cornerSquareWidth - this.ui.padding,
      this.ui.h / 2 + this.height / 2 - this.ui.cornerSquareWidth - this.ui.padding,
      this.ui.cornerSquareWidth,
      this.ui.cornerSquareWidth
    );

    this.borderGraphics.fillRect(
      this.ui.w / 2 - this.width / 2 + this.ui.cornerSquareWidth + this.ui.padding * 2,
      this.ui.h / 2 - this.height / 2 + this.ui.padding
        + this.ui.cornerSquareWidth / 2 - this.ui.borderWidth / 2,
      this.width - this.ui.cornerSquareWidth * 2 - this.ui.padding * 4,
      this.ui.borderWidth
    );
    this.borderGraphics.fillRect(
      this.ui.w / 2 - this.width / 2 + this.ui.cornerSquareWidth + this.ui.padding * 2,
      this.ui.h / 2 + this.height / 2 - this.ui.padding
        - this.ui.cornerSquareWidth / 2 - this.ui.borderWidth / 2,
      this.width - this.ui.cornerSquareWidth * 2 - this.ui.padding * 4,
      this.ui.borderWidth
    );
    this.borderGraphics.fillRect(
      this.ui.w / 2 - this.width / 2 + this.ui.padding
        + this.ui.cornerSquareWidth / 2 - this.ui.borderWidth / 2,
      this.ui.h / 2 - this.height / 2 + this.ui.cornerSquareWidth + this.ui.padding * 2,
      this.ui.borderWidth,
      this.height - this.ui.cornerSquareWidth * 2 - this.ui.padding * 4
    );
    this.borderGraphics.fillRect(
      this.ui.w / 2 + this.width / 2 - this.ui.padding
        - this.ui.cornerSquareWidth / 2 - this.ui.borderWidth / 2,
      this.ui.h / 2 - this.height / 2 + this.ui.cornerSquareWidth + this.ui.padding * 2,
      this.ui.borderWidth,
      this.height - this.ui.cornerSquareWidth * 2 - this.ui.padding * 4
    );
  }

  createText() {
    this.text = this.scene.add.bitmapText(
      this.ui.w / 2, this.ui.h / 2, fonts.blueSkyWhite, this.text, modal.fontSize
    );
    this.text.setOrigin(0.5);
    this.text.setCenterAlign();
    this.text.setDepth(depth.modal.text);
    this.text.setTint(modal.textColor);
  }
}
