import uiHelper from './uiHelper';
import { minigame } from '../../config';

export default (config) => {
  const u = uiHelper(config);

  return {
    hudHeight: u.h_20p,
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
    healthValueX: prev => prev.x + prev.displayWidth + u.w_1p / 2,
    get healthValueY() { return u.h - this.hudHeight + u.padding + this.weaponContainerWidth / 2; },
    healthValueWidth: u.w_1p * 1.5,
    healthValuePadding: u.w_1p / 2,
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

    get cashIconX() { return this.killValueX + u.w_10p },
    get cashIconY() { return u.h - this.hudHeight + u.padding * 3 + this.weaponContainerWidth + this.itemContainerWidth / 2; },
    cashIconWidth: u.w_5p,
    cashIconOriginX: u.left,
    cashIconOriginY: u.center,

    get cashValueX() { return this.cashIconX + this.cashIconWidth + u.padding; },
    get cashValueY() { return this.cashIconY; },
    cashValueOriginX: u.left,
    cashValueOriginY: u.center,

    get timerIconX() { return this.cashValueX + u.w_15p },
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

    textEntryX: u.padding,
    textEntryY: u.h - minigame.ui.entryHeight / 2,
    textEntryOriginX: u.left,
    textEntryOriginY: u.center
  };
};
