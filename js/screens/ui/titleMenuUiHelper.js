import uiHelper from './uiHelper';
import { titleMenu } from '../../config';

export default (config) => {
  const u = uiHelper(config);

  return {
    backgroundImageX: 0,
    backgroundImageY: 0,
    backgroundImageWidth: u.w,
    backgroundImageHeight: u.h,
    backgroundImageOriginX: u.left,
    backgroundImageOriginY: u.top,

    textX: u.w_40p,
    textY: u.h_40p,
    textOriginX: u.left,
    textOriginY: u.top,
    textVerticalPadding: u.h_10p,

    instructionsX: u.w_2,
    instructionsY: u.h_95p,
    instructionsOrigin: u.center,

    selectX: u.w_40p,
    get selectY() { return this.textY + this.textVerticalPadding / 3; },
    selectWidth: u.w_10p,
    selectHeight: u.w_5p,
    selectOriginX: u.right,
    selectOriginY: u.center,
    get selectVerticalPadding() { return this.textVerticalPadding; },

    minBackSpawnY: u.h * 0.75,
    maxBackSpawnY: u.h * 0.84,
    minFrontSpawnY: u.h * 0.88,
    maxFrontSpawnY: u.h * 0.95,

    zombieFrontWidth: u.w * 0.09,
    zombieBackWidth: u.w * 0.05,
    zombieOrigin: u.center,

    get loginPointerX() { return u.w - u.w * 0.02 - this.loginPointerWidth / 2; },
    get loginPointerY() { return u.w * 0.02 + this.loginPointerWidth / 2; },
    loginPointerWidth: u.w * 0.06,
    loginPointerOriginX: u.center,
    loginPointerOriginY: u.center,

    get loginTextX() {
      return this.loginPointerX
        - (this.loginPointerWidth * titleMenu.loginPointerExpansionFactor) / 2
        - (u.w * 0.02);
    },
    get loginTextY() { return u.w * 0.03; },
    loginTextOriginX: u.right,
    loginTextOriginY: u.top,
  };
};
