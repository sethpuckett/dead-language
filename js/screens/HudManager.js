import Phaser from 'phaser';
import hudUiHelper from './ui/hudUiHelper';
import { depth, images, fonts, hud } from '../config';
import { keyboardHelper, weaponHelper } from '../util';

export default class {
  constructor(scene) {
    this.scene = scene;

    this.ui = hudUiHelper(this.scene.sys.game.config);
    this.textInputShown = false;
    this.inputHandled = false;

    this.itemBgGraphics = this.scene.add.graphics();
    this.itemBgGraphics.fillStyle(hud.ui.itemBackgroundColor);
    this.itemBgGraphics.setDepth(depth.hud.uiBackground);
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
    startCash: int,
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
      this.itemBgGraphics.fillRect(
        this.ui.weaponBorderX,
        this.ui.weaponBorderY,
        this.ui.weaponBorderWidth,
        this.ui.weaponBorderWidth
      );

      this.weaponBorder = this.scene.add.sprite(
        this.ui.weaponBorderX,
        this.ui.weaponBorderY,
        images.hudItemBorder,
        images.frames.hudItemDark
      );
      this.weaponBorder.displayWidth = this.ui.weaponBorderWidth;
      this.weaponBorder.displayHeight = this.ui.weaponBorderWidth;
      this.weaponBorder.setOrigin(this.ui.weaponBorderOriginX, this.ui.weaponBorderOriginY);
      this.weaponBorder.setDepth(depth.hud.ui);

      this.weapon = this.scene.add.sprite(
        this.ui.weaponX,
        this.ui.weaponY,
        images.weapon,
        images.frames.weaponShotgun
      );
      this.weapon.displayWidth = this.ui.weaponWidth;
      this.weapon.displayHeight = this.ui.weaponHeight;
      this.weapon.setOrigin(this.ui.weaponOrigin);
      this.weapon.setDepth(depth.hud.ui);
      this.weapon.visible = false;
    }

    if (config.item) {
      this.itemBgGraphics.fillRect(
        this.ui.itemBorderX,
        this.ui.itemBorderY,
        this.ui.itemBorderWidth,
        this.ui.itemBorderWidth
      );

      this.itemBorder = this.scene.add.sprite(
        this.ui.itemBorderX, this.ui.itemBorderY, images.hudItemBorder, images.frames.hudItemDark
      );
      this.itemBorder.displayWidth = this.ui.itemBorderWidth;
      this.itemBorder.displayHeight = this.ui.itemBorderWidth;
      this.itemBorder.setOrigin(this.ui.itemBorderOriginX, this.ui.itemBorderOriginY);
      this.itemBorder.setDepth(depth.hud.ui);
    }

    if (config.health) {
      this.healthIcon = this.scene.add.sprite(
        this.ui.healthIconX, this.ui.healthIconY, images.heart
      );
      this.healthIcon.displayWidth = this.ui.healthIconWidth;
      this.healthIcon.displayHeight = this.ui.healthIconWidth;
      this.healthIcon.setOrigin(this.ui.healthIconOriginX, this.ui.healthIconOriginY);
      this.healthIcon.setDepth(depth.hud.ui);
      this.healthBars = [];
      for (let i = 0; i < config.maxHealth; i += 1) {
        const prev = i !== 0 ? this.healthBars[i - 1] : this.healthIcon;
        // TODO: this needs to take startHealth into account
        const bar = this.scene.add.sprite(
          this.ui.healthValueX(prev), this.ui.healthValueY, images.health, 0
        );
        bar.displayWidth = this.ui.healthValueWidth;
        bar.displayHeight = this.ui.healthValueHeight;
        bar.setOrigin(this.ui.healthValueOriginX, this.ui.healthValueOriginY);
        bar.setDepth(depth.hud.ui);
        this.healthBars.push(bar);
      }
    }

    if (config.kills) {
      this.killIcon = this.scene.add.sprite(
        this.ui.killIconX, this.ui.killIconY, images.skull
      );
      this.killIcon.displayWidth = this.ui.killIconWidth;
      this.killIcon.displayHeight = this.ui.killIconWidth;
      this.killIcon.setOrigin(this.ui.killIconOriginX, this.ui.killIconOriginY);
      this.killIcon.setDepth(depth.hud.ui);
      this.killValue = this.scene.add.bitmapText(
        this.ui.killValueX, this.ui.killValueY, fonts.blueSkyWhite, '000', hud.fonts.killSize
      );
      this.killValue.setOrigin(this.ui.killValueOriginX, this.ui.killValueOriginY);
      this.killValue.setDepth(depth.hud.ui);
      this.killValue.setTintFill(hud.fonts.killTint);
    }

    if (config.cash) {
      this.cashIcon = this.scene.add.sprite(
        this.ui.cashIconX, this.ui.cashIconY, images.goldCoin
      );
      this.cashIcon.displayWidth = this.ui.cashIconWidth;
      this.cashIcon.displayHeight = this.ui.cashIconWidth;
      this.cashIcon.setOrigin(this.ui.cashIconOriginX, this.ui.cashIconOriginY);
      this.cashIcon.setDepth(depth.hud.ui);
      this.cashValue = this.scene.add.bitmapText(
        this.ui.cashValueX, this.ui.cashValueY, fonts.blueSkyWhite, `$${config.startCash}`, hud.fonts.cashSize
      );
      this.cashValue.setOrigin(this.ui.cashValueOriginX, this.ui.cashValueOriginY);
      this.cashValue.setDepth(depth.hud.ui);
      this.cashValue.setTintFill(hud.fonts.cashTint);
    }

    if (config.timer) {
      this.timerIcon = this.scene.add.sprite(
        this.ui.timerIconX, this.ui.timerIconY, images.watch
      );
      this.timerIcon.displayWidth = this.ui.timerIconWidth;
      this.timerIcon.displayHeight = this.ui.timerIconWidth;
      this.timerIcon.setOrigin(this.ui.timerIconOriginX, this.ui.timerIconOriginY);
      this.timerIcon.setDepth(depth.hud.ui);
      this.timerValue = this.scene.add.bitmapText(
        this.ui.timerValueX, this.ui.timerValueY, fonts.blueSkyWhite, '', hud.fonts.timerSize
      );
      this.timerValue.setOrigin(this.ui.timerValueOriginX, this.ui.timerValueOriginY);
      this.timerValue.setDepth(depth.hud.ui);
      this.timerValue.setTintFill(hud.fonts.timerTint);
    }

    if (config.message) {
      this.itemBgGraphics.fillRect(
        this.ui.messageBorderX,
        this.ui.messageBorderY,
        this.ui.messageBorderWidth,
        this.ui.messageBorderWidth
      );

      this.messageBorder = this.scene.add.sprite(
        this.ui.messageBorderX,
        this.ui.messageBorderY,
        images.hudMessageBorder,
        images.frames.hudMessageDark
      );
      this.messageBorder.displayWidth = this.ui.messageBorderWidth;
      this.messageBorder.displayHeight = this.ui.messageBorderHeight;
      this.messageBorder.setOrigin(
        this.ui.messageBorderOriginX, this.ui.messageBorderOriginY
      );
      this.messageBorder.setDepth(depth.hud.ui);
    }

    if (config.hudBuffer) {
      this.brick = this.scene.add.tileSprite(
        this.ui.brickX, this.ui.brickY,
        this.ui.brickWidth, this.ui.brickHeight,
        images.brick,
      );
      this.brick.setOrigin(0, 0);
      this.brick.setDepth(depth.hud.buffer);
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
    return this.textEntry.text;
  }

  clearTextEntry() {
    this.textEntry.text = '';
  }

  setKillValue(value) {
    this.killValue.text = String(value).padStart(3, '0');
  }

  setGameTime(value) {
    this.timerValue.text = value.toFixed(1);
  }

  setHealth(value) {
    for (let i = 0; i < this.maxHealth; i += 1) {
      if (i < value) {
        this.healthBars[i].setFrame(images.frames.healthFull);
      } else {
        this.healthBars[i].setFrame(images.frames.healthEmpty);
      }
    }
  }

  setCash(value) {
    this.cashValue.text = `$${value}`;
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
      this.textEntryGraphics = this.scene.add.graphics();
      this.textEntryGraphics.fillStyle(hud.ui.textEntryBackgroundColor);
      this.textEntryArea = new Phaser.Geom.Rectangle(
        this.ui.textEntryAreaX,
        this.ui.textEntryAreaY,
        this.ui.textEntryAreaWidth,
        this.ui.textEntryAreaHeight
      );
      this.textEntryGraphics.fillRectShape(this.textEntryArea);
      this.textEntryGraphics.setDepth(depth.hud.ui);
      this.textEntry = this.scene.add.bitmapText(
        this.ui.textEntryX, this.ui.textEntryY, fonts.blueSkyWhite, '', hud.fonts.textEntrySize
      );
      this.textEntry.setOrigin(this.ui.textEntryOriginX, this.ui.textEntryOriginY);
      this.textEntry.setDepth(depth.hud.entryText);
      this.textEntry.setTintFill(hud.fonts.textEntryTint);
    }
  }

  hideTextInput() {
    if (this.textInputShown) {
      this.textInputShown = false;
      this.textEntryGraphics.destroy();
      this.textEntryGraphics = null;
      this.textEntryArea = null;
      this.textEntry.destroy();
      this.textEntry = null;
    }
  }

  setWeapon(weapon, totalAmmo) {
    this.weapon.visible = true;
    this.weapon.setFrame(weaponHelper.getImageFrame(weapon));
    this.createAmmoIcons(totalAmmo, totalAmmo);
  }

  updateAmmo(count, totalAmmo) {
    this.createAmmoIcons(count, totalAmmo);
  }

  // Private

  createInput() {
    this.keys = this.scene.input.keyboard.addKeys(
      'SPACE,BACKSPACE, ENTER, A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
    );
    this.scene.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.BACKSPACE.keyCode && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(
        0, this.textEntry.text.length - 1
      );
    } else if ((keyboardHelper.isLetter(e.keyCode)
                || e.keyCode === this.keys.SPACE.keyCode)
                && this.textEntry.text.length <= hud.maxTextEntry) {
      this.textEntry.text += e.key;
    } else if (e.keyCode === this.keys.ENTER.keyCode) {
      this.submitCallback();
    }
  }

  createAmmoIcons(count, totalAmmo) {
    this.clearAmmoIcons();
    this.ammoGraphics = this.scene.add.graphics();
    this.ammoGraphics.fillStyle(hud.ui.ammoIconColor);
    this.ammoGraphics.setDepth(depth.hud.ui);

    for (let i = 0; i < totalAmmo; i += 1) {
      const x = this.getAmmoIconXPosition(i, totalAmmo);
      const y = this.ui.ammoIconY;

      if (i < count) {
        this.ammoGraphics.fillRect(x, y, this.ui.ammoIconWidth, this.ui.ammoIconWidth);
      }
    }
  }

  clearAmmoIcons() {
    if (this.ammoGraphics != null) {
      this.ammoGraphics.clear();
      this.ammoGraphics = null;
    }
  }

  getAmmoIconXPosition(current, total) {
    const totalIconWidth = total * this.ui.ammoIconWidth
      + (total - 1) * this.ui.ammoIconPadding;
    const baseX = this.ui.weaponBorderX + this.ui.weaponBorderWidth / 2 - totalIconWidth / 2;
    return baseX + (this.ui.ammoIconWidth + this.ui.ammoIconPadding) * current;
  }
}
