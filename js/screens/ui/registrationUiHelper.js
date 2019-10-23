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

    loadingLabelX: u.w_2,
    loadingLabelY: u.h_2,
    loadingLabelOriginX: u.left,
    loadingLabelOriginY: u.center,
  };
};
