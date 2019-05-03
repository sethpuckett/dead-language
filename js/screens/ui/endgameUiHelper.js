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
    statusLabelY: u.h_50p,
    statusLabelOrigin: u.center,

    killLabelX: u.w_2,
    get killLabelY() { return this.statusLabelY + u.h_10p; },
    killLabelOrigin: u.center,
  };
};
