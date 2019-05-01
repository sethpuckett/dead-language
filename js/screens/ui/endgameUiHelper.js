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

    killLabelX: u.w_2,
    killLabelY: u.h_50p,
    killLabelOrigin: u.center,
  };
};
