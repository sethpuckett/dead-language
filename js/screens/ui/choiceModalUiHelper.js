import uiHelper from './uiHelper';

export default (config) => {
  const u = uiHelper(config);

  return {
    w: u.w,
    h: u.h,
    padding: u.padding,
    paddingBig: u.paddingBig,
    textMargin: u.w * 0.07,
    cornerSquareWidth: u.w * 0.04,
    borderWidth: u.w * 0.015,

    choiceTextX: u.w_2,
    choiceTextOriginX: u.left,
    choiceTextOriginY: u.center,
    choiceTextVerticalPadding: u.h * 0.075,

    textOriginX: u.center,
    textOriginY: u.bottom,

    selectX: u.w_2 - u.paddingBig,
    selectOriginX: u.right,
    selectOriginY: u.center,
  };
};
