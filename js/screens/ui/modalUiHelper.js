import uiHelper from './uiHelper';

export default (config) => {
  const u = uiHelper(config);

  return {
    w: u.w,
    h: u.h,
    padding: u.padding,
    paddingBig: u.paddingBig,
    textMargin: u.w * 0.07,
    bottomBuffer: u.h * 0.035,
    cornerSquareWidth: u.w * 0.04,
    borderWidth: u.w * 0.015,
    textOrigin: u.center,
    anyKeyTextOriginX: u.center,
    anyKeyTextOriginY: u.bottom,
  };
};
