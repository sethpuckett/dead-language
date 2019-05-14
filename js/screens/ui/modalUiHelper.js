import uiHelper from './uiHelper';

export default (config) => {
  const u = uiHelper(config);

  return {
    w: u.w,
    h: u.h,
    padding: u.padding,
    paddingBig: u.paddingBig,
    cornerSquareWidth: u.w_5p,
    borderWidth: u.w * 0.02,
  };
};
