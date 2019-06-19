import uiHelper from './uiHelper';

export default (config) => {
  const u = uiHelper(config);

  return {
    itemWidth: u.h_5p,
    itemOrigin: u.center,
    itemWordBuffer: u.padding,
    itemWordOriginX: u.center,
    itemWordOriginY: u.top,
  };
};
