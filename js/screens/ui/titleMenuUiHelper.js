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

    startTextX: u.w_2,
    startTextY: u.h_50p,
    startTextOrigin: u.center,

    minBackSpawnY: u.h * 0.70,
    maxBackSpawnY: u.h_80p,
    minFrontSpawnY: u.h_85p,
    maxFrontSpawnY: u.h_95p,
  };
};
