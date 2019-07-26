import uiHelper from './uiHelper';

export default (config) => {
  const u = uiHelper(config);

  return {
    w: u.w,
    h: u.h,
    modalWidth: u.w_85p,
    get modalX() { return this.w / 2 - this.modalWidth / 2; },
    padding: u.padding,
    paddingBig: u.paddingBig,
    textMargin: u.w * 0.07,
    bottomBuffer: u.h * 0.075,
    cornerSquareWidth: u.w * 0.04,
    borderWidth: u.w * 0.015,
    textOrigin: u.center,
    anyKeyTextOriginX: u.center,
    anyKeyTextOriginY: u.bottom,
  };
};
