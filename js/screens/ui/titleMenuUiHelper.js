import uiHelper from './uiHelper';

export default (config) => {
  const u = uiHelper(config);

  return {
    startButtonX: u.w_2,
    startButtonY: u.h_2,
    startButtonOrigin: u.center,
  };
};