import uiHelper from './uiHelper';
import { minigame } from '../../config';

export default (config) => {
  const u = uiHelper(config);

  return {
    hudHeight: minigame.ui.hudHeight,
    hudBufferHeight: minigame.ui.hudBufferHeight,
    weaponBorderX: u.padding,
    get weaponBorderY() { return u.h - this.hudHeight + u.padding; },
    get weaponBorderWidth() { return this.hudHeight / 2 - u.padding * 2; },
    weaponBorderOriginX: u.left,
    weaponBorderOriginY: u.Top,
    itemBorderX: u.padding,
    get itemBorderWidth() { return this.hudHeight / 2 - u.padding * 2; },
    get itemBorderY() { return this.weaponBorderY + this.itemBorderWidth + u.padding * 2; },
    itemBorderOriginX: u.left,
    itemBorderOriginY: u.top,

    get healthIconX() { return this.weaponBorderX + this.weaponBorderWidth + u.paddingBig; },
    get healthIconY() { return u.h - this.hudHeight + u.padding + this.weaponBorderWidth / 2; },
    healthIconWidth: u.w_5p,
    healthIconOriginX: u.left,
    healthIconOriginY: u.center,
    healthValueX: prev => prev.x + prev.displayWidth + u.w_1p / 2,
    get healthValueY() { return u.h - this.hudHeight + u.padding + this.weaponBorderWidth / 2; },
    healthValueWidth: u.w_1p * 1.5,
    healthValuePadding: u.w_1p / 2,
    healthValueHeight: u.w_5p,
    healthValueOriginX: u.left,
    healthValueOriginY: u.center,

    get killIconX() { return this.weaponBorderX + this.weaponBorderWidth + u.paddingBig; },
    get killIconY() {
      return u.h - this.hudHeight + u.padding * 3
        + this.weaponBorderWidth + this.itemBorderWidth / 2;
    },
    killIconWidth: u.w_5p,
    killIconOriginX: u.left,
    killIconOriginY: u.center,

    get killValueX() { return this.killIconX + this.killIconWidth + u.padding; },
    get killValueY() { return this.killIconY; },
    killValueOriginX: u.left,
    killValueOriginY: u.center,

    get cashIconX() { return this.killValueX + u.w_10p; },
    get cashIconY() {
      return u.h - this.hudHeight + u.padding * 3
        + this.weaponBorderWidth + this.itemBorderWidth / 2;
    },
    cashIconWidth: u.w_5p,
    cashIconOriginX: u.left,
    cashIconOriginY: u.center,

    get cashValueX() { return this.cashIconX + this.cashIconWidth + u.padding; },
    get cashValueY() { return this.cashIconY; },
    cashValueOriginX: u.left,
    cashValueOriginY: u.center,

    get timerIconX() { return this.cashValueX + u.w_15p; },
    get timerIconY() {
      return u.h - this.hudHeight + u.padding * 3
        + this.weaponBorderWidth + this.itemBorderWidth / 2;
    },
    timerIconWidth: u.w_5p,
    timerIconOriginX: u.left,
    timerIconOriginY: u.center,

    get timerValueX() { return this.timerIconX + this.timerIconWidth + u.padding; },
    get timerValueY() { return this.timerIconY; },
    timerValueOriginX: u.left,
    timerValueOriginY: u.center,

    get messageBorderX() { return this.timerValueX + u.h_20p; },
    get messageBorderY() { return u.h - this.hudHeight + u.padding; },
    get messageBorderWidth() { return u.w - this.messageBorderX - u.padding; },
    get messageBorderHeight() { return this.hudHeight - u.padding * 2; },
    messageBorderOriginX: u.left,
    messageBorderOriginY: u.Top,

    textEntryAreaX: u.w_25p - u.padding,
    get textEntryAreaY() { return u.h - this.hudHeight - u.h_5p - u.padding * 3; },
    textEntryAreaWidth: u.w_50p + u.padding * 2,
    textEntryAreaHeight: u.h_5p + u.padding * 2,

    textEntryX: u.w_25p,
    get textEntryY() { return u.h - this.hudHeight - u.h_5p - u.padding; },
    textEntryWidth: u.w_50p,
    textEntryHeight: u.h_5p,
    textEntryOriginX: u.left,
    textEntryOriginY: u.top,

    brickX: 0,
    get brickY() { return u.h - this.hudHeight - this.hudBufferHeight; },
    brickWidth: u.w,
    get brickHeight() { return this.hudBufferHeight; },
  };
};
