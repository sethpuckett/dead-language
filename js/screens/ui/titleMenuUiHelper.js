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

    minBackSpawnY: u.h * 0.75,
    maxBackSpawnY: u.h * 0.84,
    minFrontSpawnY: u.h * 0.88,
    maxFrontSpawnY: u.h * 0.95,
  };
};
