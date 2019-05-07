import uiHelper from './uiHelper';
import { hud } from '../../config';

export default (config) => {
  const u = uiHelper(config);

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
  };
};
