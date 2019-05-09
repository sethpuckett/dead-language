import uiHelper from './uiHelper';
import hudUiHelper from './hudUiHelper';
import { hud } from '../../config';

export default (config) => {
  const u = uiHelper(config);
  const hudUi = hudUiHelper(config);

  return {
    vocabLeft1X: u.padding,
    vocabLeft2X: u.w_33p - u.padding,
    vocabRight1X: u.w_66p + u.padding,
    vocabRight2X: u.w - u.padding,
    vocab1OriginX: u.left,
    vocab1OriginY: u.top,
    vocab2OriginX: u.right,
    vocab2OriginY: u.top,
    vocabY: u.padding,
    get vocabVerticalPadding() { return (u.h - hud.height - hud.bufferHeight) / 10; },
    dotsOriginX: u.center,
    dotsOriginY: u.top,

    grassX: u.w_33p + u.padding,
    grassY: 0,
    grassWidth: u.w_33p - (u.padding * 2),
    get grassHeight() { return (u.h - hud.height - hud.bufferHeight); },
    grassOriginX: u.left,
    grassOriginY: u.top,

    crateX: u.w_2,
    crateY: u.h_15p,
    crateOriginX: u.center,
    crateOriginY: u.center,

    bottleX: u.w_2,
    get bottleY() { return this.crateY - (u.h * 0.0425); },
    bottleOriginX: u.center,
    bottleOriginY: u.center,

    menuOption1X: u.padding,
    menuOption1Y: u.h - hud.height + u.padding,
    get menuOption2X() { return this.menuOption1X + this.menuOptionWidth + u.padding; },
    menuOption2Y: u.h - hud.height + u.padding,
    get menuOption3X() { return this.menuOption2X + this.menuOptionWidth + u.padding; },
    menuOption3Y: u.h - hud.height + u.padding,
    menuOption4X: u.padding,
    get menuOption4Y() { return this.menuOption1Y + this.menuOptionHeight + u.padding * 2; },
    get menuOption5X() { return this.menuOption1X + this.menuOptionWidth + u.padding; },
    get menuOption5Y() { return this.menuOption1Y + this.menuOptionHeight + u.padding * 2; },

    menuOptionWidth: hudUi.messageBorderX / 3 - u.padding * 2,
    menuOptionHeight: hud.height / 2 - u.padding * 2,
    menuOptionOriginX: u.top,
    menuOptionOriginY: u.left,

    get menuOption1TextX() { return this.menuOption1X + this.menuOptionWidth / 2; },
    get menuOption1TextY() { return this.menuOption1Y + this.menuOptionHeight / 2; },
    get menuOption2TextX() { return this.menuOption2X + this.menuOptionWidth / 2; },
    get menuOption2TextY() { return this.menuOption2Y + this.menuOptionHeight / 2; },
    get menuOption3TextX() { return this.menuOption3X + this.menuOptionWidth / 2; },
    get menuOption3TextY() { return this.menuOption3Y + this.menuOptionHeight / 2; },
    get menuOption4TextX() { return this.menuOption4X + this.menuOptionWidth / 2; },
    get menuOption4TextY() { return this.menuOption4Y + this.menuOptionHeight / 2; },
    get menuOption5TextX() { return this.menuOption5X + this.menuOptionWidth / 2; },
    get menuOption5TextY() { return this.menuOption5Y + this.menuOptionHeight / 2; },
    menuOptionTextOrigin: u.center,
  };
};