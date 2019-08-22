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

    menuHorizontalPadding: u.w_5p,
    get menuLabelBaseX() { return u.w_2 - this.menuHorizontalPadding; },
    get menuValueBaseX() { return u.w_2 + this.menuHorizontalPadding; },
    menuBaseY: u.h_25p,
    menuVerticalPadding: u.h_10p,
    menuLabelOriginX: u.right,
    menuLabelOriginY: u.top,
    menuValueOriginX: u.left,
    menuValueOriginY: u.top,
    menuValueHorizontalPadding: u.w * 0.03,

    returnOptionX: u.w_2,
    returnOptionOriginX: u.center,
    returnOptionOriginY: u.top,
    returnOptionVerticalPadding: u.h_10p,

    valueSelectorRatio: 1.15,
  };
};
