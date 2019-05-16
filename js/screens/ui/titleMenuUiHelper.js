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

    textX: u.w_40p,
    textY: u.h_40p,
    textOriginX: u.left,
    textOriginY: u.top,
    textVerticalPadding: u.h_10p,

    instructionsX: u.w_2,
    instructionsY: u.h_95p,
    instructionsOrigin: u.center,

    selectX: u.w_40p,
    get selectY() { return this.textY - u.h * 0.01; },
    selectOriginX: u.right,
    selectOriginY: u.top,
    get selectVerticalPadding() { return this.textVerticalPadding; },

    minBackSpawnY: u.h * 0.75,
    maxBackSpawnY: u.h * 0.84,
    minFrontSpawnY: u.h * 0.88,
    maxFrontSpawnY: u.h * 0.95,
  };
};
