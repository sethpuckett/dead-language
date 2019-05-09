import Phaser from 'phaser';
import hudUiHelper from './ui/hudUiHelper';
import { depth, images, fonts, hud } from '../config';
import { keyboardHelper } from '../util';

export default class {
  constructor(scene) {
    this.scene = scene;
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
  }
  */
  createHud(config) {
    this.createInput();

    const ui = hudUiHelper(this.scene.sys.game.config);
    this.hudHeight = ui.hudHeight;
    this.hudBufferHeight = ui.hudBufferHeight;
    this.maxHealth = config.maxHealth;

    if (config.weapon) {
      this.scene.weaponBorder = this.scene.add.sprite(
        ui.weaponBorderX, ui.weaponBorderY, images.hudItemBorder
      );
      this.scene.weaponBorder.displayWidth = ui.weaponBorderWidth;
      this.scene.weaponBorder.displayHeight = ui.weaponBorderWidth;
      this.scene.weaponBorder.setOrigin(ui.weaponBorderOriginX, ui.weaponBorderOriginY);
      this.scene.weaponBorder.setDepth(depth.hud.ui);
    }

    if (config.item) {
      this.scene.itemBorder = this.scene.add.sprite(
        ui.itemBorderX, ui.itemBorderY, images.hudItemBorder
      );
      this.scene.itemBorder.displayWidth = ui.itemBorderWidth;
      this.scene.itemBorder.displayHeight = ui.itemBorderWidth;
      this.scene.itemBorder.setOrigin(ui.itemBorderOriginX, ui.itemBorderOriginY);
      this.scene.itemBorder.setDepth(depth.hud.ui);
    }

    if (config.health) {
      this.scene.healthIcon = this.scene.add.sprite(ui.healthIconX, ui.healthIconY, images.heart);
      this.scene.healthIcon.displayWidth = ui.healthIconWidth;
      this.scene.healthIcon.displayHeight = ui.healthIconWidth;
      this.scene.healthIcon.setOrigin(ui.healthIconOriginX, ui.healthIconOriginY);
      this.scene.healthIcon.setDepth(depth.hud.ui);
      this.scene.healthBars = [];
      for (let i = 0; i < config.maxHealth; i += 1) {
        const prev = i !== 0 ? this.scene.healthBars[i - 1] : this.scene.healthIcon;
        const bar = this.scene.add.sprite(ui.healthValueX(prev), ui.healthValueY, images.health, 0);
        bar.displayWidth = ui.healthValueWidth;
        bar.displayHeight = ui.healthValueHeight;
        bar.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);
        bar.setDepth(depth.hud.ui);
        this.scene.healthBars.push(bar);
      }
    }

    if (config.kills) {
      this.scene.killIcon = this.scene.add.sprite(ui.killIconX, ui.killIconY, images.skull);
      this.scene.killIcon.displayWidth = ui.killIconWidth;
      this.scene.killIcon.displayHeight = ui.killIconWidth;
      this.scene.killIcon.setOrigin(ui.killIconOriginX, ui.killIconOriginY);
      this.scene.killIcon.setDepth(depth.hud.ui);
      this.scene.killValue = this.scene.add.bitmapText(
        ui.killValueX, ui.killValueY, fonts.blueSkyWhite, '000', hud.fonts.killSize
      );
      this.scene.killValue.setOrigin(ui.killValueOriginX, ui.killValueOriginY);
      this.scene.killValue.setDepth(depth.hud.ui);
    }

    if (config.cash) {
      this.scene.cashIcon = this.scene.add.sprite(ui.cashIconX, ui.cashIconY, images.goldCoin);
      this.scene.cashIcon.displayWidth = ui.cashIconWidth;
      this.scene.cashIcon.displayHeight = ui.cashIconWidth;
      this.scene.cashIcon.setOrigin(ui.cashIconOriginX, ui.cashIconOriginY);
      this.scene.cashIcon.setDepth(depth.hud.ui);
      this.scene.cashValue = this.scene.add.bitmapText(
        ui.cashValueX, ui.cashValueY, fonts.blueSkyWhite, '$100', hud.fonts.cashSize
      );
      this.scene.cashValue.setOrigin(ui.cashValueOriginX, ui.cashValueOriginY);
      this.scene.cashValue.setDepth(depth.hud.ui);
    }

    if (config.timer) {
      this.scene.timerIcon = this.scene.add.sprite(ui.timerIconX, ui.timerIconY, images.watch);
      this.scene.timerIcon.displayWidth = ui.timerIconWidth;
      this.scene.timerIcon.displayHeight = ui.timerIconWidth;
      this.scene.timerIcon.setOrigin(ui.timerIconOriginX, ui.timerIconOriginY);
      this.scene.timerIcon.setDepth(depth.hud.ui);
      this.scene.timerValue = this.scene.add.bitmapText(
        ui.timerValueX, ui.timerValueY, fonts.blueSkyWhite, '', hud.fonts.timerSize
      );
      this.scene.timerValue.setOrigin(ui.timerValueOriginX, ui.timerValueOriginY);
      this.scene.timerValue.setDepth(depth.hud.ui);
    }

    if (config.message) {
      this.scene.messageBorder = this.scene.add.sprite(
        ui.messageBorderX,
        ui.messageBorderY,
        images.hudMessageBorder
      );
      this.scene.messageBorder.displayWidth = ui.messageBorderWidth;
      this.scene.messageBorder.displayHeight = ui.messageBorderHeight;
      this.scene.messageBorder.setOrigin(ui.messageBorderOriginX, ui.messageBorderOriginY);
      this.scene.messageBorder.setDepth(depth.hud.ui);
    }

    if (config.hudBuffer) {
      this.scene.brick = this.scene.add.tileSprite(
        ui.brickX, ui.brickY,
        ui.brickWidth, ui.brickHeight,
        images.brick,
      );
      this.scene.brick.setOrigin(0, 0);
      this.scene.brick.setDepth(depth.hud.buffer);
    }

    if (config.textInput) {
      this.scene.textEntryGraphics = this.scene.add.graphics({
        fillStyle: hud.ui.textEntryStyle,
      });
      this.scene.textEntryArea = new Phaser.Geom.Rectangle(
        ui.textEntryAreaX, ui.textEntryAreaY, ui.textEntryAreaWidth, ui.textEntryAreaHeight
      );
      this.scene.textEntryGraphics.fillRectShape(this.scene.textEntryArea);
      this.scene.textEntryGraphics.setDepth(depth.hud.ui);
      this.scene.textEntry = this.scene.add.bitmapText(
        ui.textEntryX, ui.textEntryY, fonts.blueSkyWhite, '', hud.fonts.textEntrySize
      );
      this.scene.textEntry.setOrigin(ui.textEntryOriginX, ui.textEntryOriginY);
      this.scene.textEntry.setDepth(depth.hud.entryText);
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
