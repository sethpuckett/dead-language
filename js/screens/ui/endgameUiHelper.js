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

    statusLabelX: u.w_2,
    statusLabelY: u.h_15p,
    statusLabelOrigin: u.center,

    leftStatLabelX: u.w_5p,
    leftStatValueX: u.w_45p,
    rightStatLabelX: u.w_50p,
    rightStatValueX: u.w_90p,
    get statBaseY() { return this.statusLabelY + u.h_10p; },
    statVerticalPadding: u.h * 0.075,
    statOriginX: u.left,
    statOriginY: u.top,

    menuTextX: u.w_40p,
    menuTextY: u.h_75p,
    menuTextOriginX: u.left,
    menuTextOriginY: u.top,
    menuTextVerticalPadding: u.h * 0.075,

    selectX: u.w_40p,
    get selectY() { return this.menuTextY - u.h * 0.01; },
    selectOriginX: u.right,
    selectOriginY: u.top,
    selectWidth: u.w_10p,
    selectHeight: u.w_5p,
    get selectVerticalPadding() { return this.menuTextVerticalPadding; },
  };
};
