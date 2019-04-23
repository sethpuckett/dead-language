import uiHelper from './uiHelper';
import { minigame } from '../../config';

export default (config) => {
  const u = uiHelper(config);

  return {
    hudHeight: u.h_25p,
    weaponContainerX: u.padding,
    get weaponContainerY() { return u.h - this.hudHeight + u.padding },
    get weaponContainerWidth() { return this.hudHeight / 2 - u.padding * 2; },
    weaponContainerOriginX: u.left,
    weaponContainerOriginY: u.Top,
    itemContainerX: u.padding,
    get itemContainerWidth() { return this.hudHeight / 2 - u.padding * 2; },
    get itemContainerY() { return this.weaponContainerY + this.itemContainerWidth + u.padding * 2; },
    itemContainerOriginX: u.left,
    itemContainerOriginY: u.top,

    get healthIconX() { return this.weaponContainerX + this.weaponContainerWidth + u.paddingBig; },
    get healthIconY() { return u.h - this.hudHeight + u.padding + this.weaponContainerWidth / 2; },
    healthIconWidth: u.w_5p,
    healthIconOriginX: u.left,
    healthIconOriginY: u.center,
    get healthValue1X() { return this.healthIconX + this.healthIconWidth + u.padding; },
    get healthValue2X() { return this.healthValue1X + this.healthValueWidth + this.healthValueWidth / 2 },
    get healthValue3X() { return this.healthValue2X + this.healthValueWidth + this.healthValueWidth / 2; },
    get healthValue4X() { return this.healthValue3X + this.healthValueWidth + this.healthValueWidth / 2; },
    get healthValue5X() { return this.healthValue4X + this.healthValueWidth + this.healthValueWidth / 2; },
    get healthValue6X() { return this.healthValue5X + this.healthValueWidth + this.healthValueWidth / 2; },
    get healthValue7X() { return this.healthValue6X + this.healthValueWidth + this.healthValueWidth / 2; },
    get healthValue8X() { return this.healthValue7X + this.healthValueWidth + this.healthValueWidth / 2; },
    get healthValue9X() { return this.healthValue8X + this.healthValueWidth + this.healthValueWidth / 2; },
    get healthValue10X() { return this.healthValue9x + this.healthValueWidth + this.healthValueWidth / 2; },
    get healthValueY() { return u.h - this.hudHeight + u.padding + this.weaponContainerWidth / 2; },
    healthValueWidth: u.w_1p,
    healthValueHeight: u.w_5p,
    healthValueOriginX: u.left,
    healthValueOriginY: u.center,

    get killIconX() { return this.weaponContainerX + this.weaponContainerWidth + u.paddingBig; },
    get killIconY() { return u.h - this.hudHeight + u.padding * 3 + this.weaponContainerWidth + this.itemContainerWidth / 2; },
    killIconWidth: u.w_5p,
    killIconOriginX: u.left,
    killIconOriginY: u.center,

    get killValueX() { return this.killIconX + this.killIconWidth + u.padding; },
    get killValueY() { return this.killIconY; },
    killValueOriginX: u.left,
    killValueOriginY: u.center,

    get cashIconX() { return this.killValueX + u.h_15p },
    get cashIconY() { return u.h - this.hudHeight + u.padding * 3 + this.weaponContainerWidth + this.itemContainerWidth / 2; },
    cashIconWidth: u.w_5p,
    cashIconOriginX: u.left,
    cashIconOriginY: u.center,

    get cashValueX() { return this.cashIconX + this.cashIconWidth + u.padding; },
    get cashValueY() { return this.cashIconY; },
    cashValueOriginX: u.left,
    cashValueOriginY: u.center,

    get timerIconX() { return this.cashValueX + u.h_20p },
    get timerIconY() { return u.h - this.hudHeight + u.padding * 3 + this.weaponContainerWidth + this.itemContainerWidth / 2; },
    timerIconWidth: u.w_5p,
    timerIconOriginX: u.left,
    timerIconOriginY: u.center,

    get timerValueX() { return this.timerIconX + this.timerIconWidth + u.padding; },
    get timerValueY() { return this.timerIconY; },
    timerValueOriginX: u.left,
    timerValueOriginY: u.center,

    get messageContainerX() { return this.timerValueX + u.h_20p; },
    get messageContainerY() { return u.h - this.hudHeight + u.padding },
    get messageContainerWidth() { return u.w - this.messageContainerX - u.padding; },
    get messageContainerHeight() { return this.hudHeight - u.padding * 2; },
    messageContainerOriginX: u.left,
    messageContainerOriginY: u.Top,



    missLabelX: u.w_80p,
    missLabelY: u.padding,
    missValueX: label => u.w_80p + label.width,
    missValueY: u.padding,
    missOriginX: u.left,
    missOriginY: u.top,

    textEntryX: u.padding,
    textEntryY: u.h - minigame.ui.entryHeight / 2,
    textEntryOriginX: u.left,
    textEntryOriginY: u.center
  };
};
