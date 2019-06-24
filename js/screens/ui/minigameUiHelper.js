import uiHelper from './uiHelper';

export default (config) => {
  const u = uiHelper(config);

  return {
    itemWidth: u.h_5p,
    itemOriginX: u.center,
    itemOriginY: u.bottom,
    itemWordBuffer: u.padding,
    itemWordOriginX: u.center,
    itemWordOriginY: u.top,

    itemLeftX: u.w_10p,
    itemRightX: u.w_90p,
    itemRow1Y: u.h_15p,
    itemRow2Y: u.h_30p,
    itemRow3Y: u.h_45p,
    itemRow4Y: u.h_60p,

    itemPopOrigin: u.center,
    get itemPopWidth() { return this.itemWidth * 1.25; },
  };
};
