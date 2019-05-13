import Phaser from 'phaser';
import hudUiHelper from './ui/hudUiHelper';
import { depth, images, fonts, hud } from '../config';
import { keyboardHelper } from '../util';

export default class {
  constructor(scene) {
    this.scene = scene;

    this.ui = hudUiHelper(this.scene.sys.game.config);
    this.textInputShown = false;
  }

  /*
  config:{
    weapon: bool,
    item: bool,
    health: bool,
    startHealth: int,
    maxHealth: int,
    kills: bool,
    cash: bool,
    timer: bool,
    message: bool,
    textInput: bool,
    hudBuffer: bool,
    handleInput: bool,
  }
  */
  createHud(config) {
    this.hudHeight = this.ui.hudHeight;
    this.hudBufferHeight = this.ui.hudBufferHeight;
    this.maxHealth = config.maxHealth;

    if (config.weapon) {
      this.scene.weaponBorder = this.scene.add.sprite(
        this.ui.weaponBorderX, this.ui.weaponBorderY, images.hudItemBorder
      );
      this.scene.weaponBorder.displayWidth = this.ui.weaponBorderWidth;
      this.scene.weaponBorder.displayHeight = this.ui.weaponBorderWidth;
      this.scene.weaponBorder.setOrigin(this.ui.weaponBorderOriginX, this.ui.weaponBorderOriginY);
      this.scene.weaponBorder.setDepth(depth.hud.ui);
    }

    if (config.item) {
      this.scene.itemBorder = this.scene.add.sprite(
        this.ui.itemBorderX, this.ui.itemBorderY, images.hudItemBorder
      );
      this.scene.itemBorder.displayWidth = this.ui.itemBorderWidth;
      this.scene.itemBorder.displayHeight = this.ui.itemBorderWidth;
      this.scene.itemBorder.setOrigin(this.ui.itemBorderOriginX, this.ui.itemBorderOriginY);
      this.scene.itemBorder.setDepth(depth.hud.ui);
    }

    if (config.health) {
      this.scene.healthIcon = this.scene.add.sprite(
        this.ui.healthIconX, this.ui.healthIconY, images.heart
      );
      this.scene.healthIcon.displayWidth = this.ui.healthIconWidth;
      this.scene.healthIcon.displayHeight = this.ui.healthIconWidth;
      this.scene.healthIcon.setOrigin(this.ui.healthIconOriginX, this.ui.healthIconOriginY);
      this.scene.healthIcon.setDepth(depth.hud.ui);
      this.scene.healthBars = [];
      for (let i = 0; i < config.maxHealth; i += 1) {
        const prev = i !== 0 ? this.scene.healthBars[i - 1] : this.scene.healthIcon;
        const bar = this.scene.add.sprite(
          this.ui.healthValueX(prev), this.ui.healthValueY, images.health, 0
        );
        bar.displayWidth = this.ui.healthValueWidth;
        bar.displayHeight = this.ui.healthValueHeight;
        bar.setOrigin(this.ui.healthValueOriginX, this.ui.healthValueOriginY);
        bar.setDepth(depth.hud.ui);
        this.scene.healthBars.push(bar);
      }
    }

    if (config.kills) {
      this.scene.killIcon = this.scene.add.sprite(
        this.ui.killIconX, this.ui.killIconY, images.skull
      );
      this.scene.killIcon.displayWidth = this.ui.killIconWidth;
      this.scene.killIcon.displayHeight = this.ui.killIconWidth;
      this.scene.killIcon.setOrigin(this.ui.killIconOriginX, this.ui.killIconOriginY);
      this.scene.killIcon.setDepth(depth.hud.ui);
      this.scene.killValue = this.scene.add.bitmapText(
        this.ui.killValueX, this.ui.killValueY, fonts.blueSkyWhite, '000', hud.fonts.killSize
      );
      this.scene.killValue.setOrigin(this.ui.killValueOriginX, this.ui.killValueOriginY);
      this.scene.killValue.setDepth(depth.hud.ui);
    }

    if (config.cash) {
      this.scene.cashIcon = this.scene.add.sprite(
        this.ui.cashIconX, this.ui.cashIconY, images.goldCoin
      );
      this.scene.cashIcon.displayWidth = this.ui.cashIconWidth;
      this.scene.cashIcon.displayHeight = this.ui.cashIconWidth;
      this.scene.cashIcon.setOrigin(this.ui.cashIconOriginX, this.ui.cashIconOriginY);
      this.scene.cashIcon.setDepth(depth.hud.ui);
      this.scene.cashValue = this.scene.add.bitmapText(
        this.ui.cashValueX, this.ui.cashValueY, fonts.blueSkyWhite, '$100', hud.fonts.cashSize
      );
      this.scene.cashValue.setOrigin(this.ui.cashValueOriginX, this.ui.cashValueOriginY);
      this.scene.cashValue.setDepth(depth.hud.ui);
    }

    if (config.timer) {
      this.scene.timerIcon = this.scene.add.sprite(
        this.ui.timerIconX, this.ui.timerIconY, images.watch
      );
      this.scene.timerIcon.displayWidth = this.ui.timerIconWidth;
      this.scene.timerIcon.displayHeight = this.ui.timerIconWidth;
      this.scene.timerIcon.setOrigin(this.ui.timerIconOriginX, this.ui.timerIconOriginY);
      this.scene.timerIcon.setDepth(depth.hud.ui);
      this.scene.timerValue = this.scene.add.bitmapText(
        this.ui.timerValueX, this.ui.timerValueY, fonts.blueSkyWhite, '', hud.fonts.timerSize
      );
      this.scene.timerValue.setOrigin(this.ui.timerValueOriginX, this.ui.timerValueOriginY);
      this.scene.timerValue.setDepth(depth.hud.ui);
    }

    if (config.message) {
      this.scene.messageBorder = this.scene.add.sprite(
        this.ui.messageBorderX,
        this.ui.messageBorderY,
        images.hudMessageBorder
      );
      this.scene.messageBorder.displayWidth = this.ui.messageBorderWidth;
      this.scene.messageBorder.displayHeight = this.ui.messageBorderHeight;
      this.scene.messageBorder.setOrigin(
        this.ui.messageBorderOriginX, this.ui.messageBorderOriginY
      );
      this.scene.messageBorder.setDepth(depth.hud.ui);
    }

    if (config.hudBuffer) {
      this.scene.brick = this.scene.add.tileSprite(
        this.ui.brickX, this.ui.brickY,
        this.ui.brickWidth, this.ui.brickHeight,
        images.brick,
      );
      this.scene.brick.setOrigin(0, 0);
      this.scene.brick.setDepth(depth.hud.buffer);
    }

    if (config.textInput) {
      this.showTextInput();
    }

    if (config.handleInput) {
      this.inputHandled = true;
      this.createInput();
    } else {
      this.inputHandled = false;
    }
  }

  getHudHeight() {
    return this.hudHeight;
  }

  getHudBufferHeight() {
    return this.hudBufferHeight;
  }

  setSubmitCallback(callback) {
    this.submitCallback = callback.bind(this.scene);
  }

  getTextEntry() {
    return this.scene.textEntry.text;
  }

  clearTextEntry() {
    this.scene.textEntry.text = '';
  }

  setKillValue(value) {
    this.scene.killValue.text = String(value).padStart(3, '0');
  }

  setGameTime(value) {
    this.scene.timerValue.text = value.toFixed(1);
  }

  setHealth(value) {
    for (let i = 0; i < this.maxHealth; i += 1) {
      if (i < value) {
        this.scene.healthBars[i].setFrame(images.frames.healthFull);
      } else {
        this.scene.healthBars[i].setFrame(images.frames.healthEmpty);
      }
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

  showTextInput() {
    if (!this.textInputShown) {
      this.textInputShown = true;
      this.scene.textEntryGraphics = this.scene.add.graphics({
        fillStyle: hud.ui.textEntryStyle,
      });
      this.scene.textEntryArea = new Phaser.Geom.Rectangle(
        this.ui.textEntryAreaX,
        this.ui.textEntryAreaY,
        this.ui.textEntryAreaWidth,
        this.ui.textEntryAreaHeight
      );
      this.scene.textEntryGraphics.fillRectShape(this.scene.textEntryArea);
      this.scene.textEntryGraphics.setDepth(depth.hud.ui);
      this.scene.textEntry = this.scene.add.bitmapText(
        this.ui.textEntryX, this.ui.textEntryY, fonts.blueSkyWhite, '', hud.fonts.textEntrySize
      );
      this.scene.textEntry.setOrigin(this.ui.textEntryOriginX, this.ui.textEntryOriginY);
      this.scene.textEntry.setDepth(depth.hud.entryText);
    }
  }

  hideTextInput() {
    if (this.textInputShown) {
      this.textInputShown = false;
      this.scene.textEntryGraphics.destroy();
      this.scene.textEntryGraphics = null;
      this.scene.textEntryArea = null;
      this.scene.textEntry.destroy();
      this.scene.textEntry = null;
    }
  }

  // Private

  createInput() {
    this.keys = this.scene.input.keyboard.addKeys(
      'SPACE,BACKSPACE, ENTER, A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
    );
    this.scene.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.BACKSPACE.keyCode && this.scene.textEntry.text.length > 0) {
      this.scene.textEntry.text = this.scene.textEntry.text.substr(
        0, this.scene.textEntry.text.length - 1
      );
    } else if ((keyboardHelper.isLetter(e.keyCode)
                || e.keyCode === this.keys.SPACE.keyCode)
                && this.scene.textEntry.text.length <= hud.maxTextEntry) {
      this.scene.textEntry.text += e.key;
    } else if (e.keyCode === this.keys.ENTER.keyCode) {
      this.submitCallback();
    }
  }
}
