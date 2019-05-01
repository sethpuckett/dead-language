import uiHelper from './uiHelper';

export default (config) => {
  const u = uiHelper(config);

  return {
    backgroundImageX: 0,
    backgroundImageY: 0,
    backgroundImageWidth: u.w,
    backgroundImageHeight: u.h,
    backgroundImageOriginX: u.left,
    backgroundImageOriginY: u.top,

    loadingTextX: u.w_2,
    loadingTextY: u.h_40p,
    loadingTextOrigin: u.center,

    barBackgroundW: u.w_25p + u.padding,
    barBackgroundH: u.w_5p + u.padding,
    get barBackgroundX() { return u.w_2 - this.barBackgroundW / 2; },
    get barBackgroundY() { return u.h_2 - this.barBackgroundH / 2; },

    barW: u.w_25p,
    barH: u.w_5p,
    get barX() { return u.w_2 - this.barW / 2; },
    get barY() { return u.h_2 - this.barH / 2; },
  };
};
