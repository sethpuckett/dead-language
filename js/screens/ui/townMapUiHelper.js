import uiHelper from './uiHelper';

export default (config) => {
  const u = uiHelper(config);

  return {

    // Shared

    padding: u.padding,
    borderWidth: u.w * 0.005,
    squareWidth: u.w * 0.02,
    flashLineWidth: u.w * 0.005,
    mapGridLineWidth: u.w * 0.0025,

    // Map

    mapX: u.paddingBig,
    mapY: u.paddingBig,
    mapWidth: u.w_60p - u.paddingBig * 2,
    mapHeight: u.h_60p - u.paddingBig * 2,
    mapOriginX: u.left,
    mapOriginY: u.top,

    get mapSquareTLX() { return this.mapX; },
    get mapSquareTLY() { return this.mapY; },
    get mapSquareTRX() { return this.mapX + this.mapWidth - this.squareWidth; },
    get mapSquareTRY() { return this.mapY; },
    get mapSquareBLX() { return this.mapX; },
    get mapSquareBLY() { return this.mapY + this.mapHeight - this.squareWidth; },
    get mapSquareBRX() { return this.mapX + this.mapWidth - this.squareWidth; },
    get mapSquareBRY() { return this.mapY + this.mapHeight - this.squareWidth; },

    get mapFlashLineLTX() { return this.mapSquareTLX + this.squareWidth / 2; },
    get mapFlashLineLBX() { return this.mapSquareBLX + this.squareWidth / 2; },
    get mapFlashLineLTY() { return this.mapSquareTLY + this.squareWidth + u.padding; },
    get mapFlashLineLBY() { return this.mapSquareBLY - u.padding; },
    get mapFlashLineRTX() { return this.mapSquareTRX + this.squareWidth / 2; },
    get mapFlashLineRBX() { return this.mapSquareBRX + this.squareWidth / 2; },
    get mapFlashLineRTY() { return this.mapSquareTRY + this.squareWidth + u.padding; },
    get mapFlashLineRBY() { return this.mapSquareBRY - u.padding; },
    get mapFlashLineTLX() { return this.mapSquareTLX + this.squareWidth + u.padding; },
    get mapFlashLineTRX() { return this.mapSquareTRX - u.padding; },
    get mapFlashLineTLY() { return this.mapSquareTLY + this.squareWidth / 2; },
    get mapFlashLineTRY() { return this.mapSquareTRY + this.squareWidth / 2; },
    get mapFlashLineBLX() { return this.mapSquareBLX + this.squareWidth + u.padding; },
    get mapFlashLineBRX() { return this.mapSquareBRX - u.padding; },
    get mapFlashLineBLY() { return this.mapSquareBLY + this.squareWidth / 2; },
    get mapFlashLineBRY() { return this.mapSquareBRY + this.squareWidth / 2; },

    get mapTitleX() { return this.mapX + this.mapWidth / 2; },
    get mapTitleY() { return this.mapY + this.squareWidth + u.padding; },
    mapTitleOriginX: u.center,
    mapTitleOriginY: u.top,

    get mapLocationX() { return this.mapX + this.mapWidth / 2; },
    get mapLocationY() { return this.mapY + this.mapHeight - this.squareWidth - u.padding; },
    mapLocationOriginX: u.center,
    mapLocationOriginY: u.bottom,

    get mapGridX() { return this.mapX; },
    get mapGridY() { return this.mapY + u.h * 0.06; },
    get mapGridWidth() { return this.mapWidth; },
    get mapGridHeight() { return this.mapHeight + this.mapY - this.mapGridY - u.h * 0.06; },

    mapPinOrigin: u.center,
    mapSelectorOrigin: u.center,
    requirementLineWidth: u.w * 0.004,

    // Lesson Info

    lessonInfoX: u.paddingBig,
    get lessonInfoY() { return this.mapY + this.mapHeight + u.paddingBig; },
    lessonInfoWidth: u.w_60p - u.paddingBig * 2,
    get lessonInfoHeight() { return u.h - this.mapHeight - u.paddingBig * 3; },
    lessonInfoOriginX: u.left,
    lessonInfoOriginY: u.top,

    get lessonInfoSquareTLX() { return this.lessonInfoX; },
    get lessonInfoSquareTLY() { return this.lessonInfoY; },
    get lessonInfoSquareTRX() {
      return this.lessonInfoX + this.lessonInfoWidth - this.squareWidth;
    },
    get lessonInfoSquareTRY() { return this.lessonInfoY; },
    get lessonInfoSquareBLX() { return this.lessonInfoX; },
    get lessonInfoSquareBLY() {
      return this.lessonInfoY + this.lessonInfoHeight - this.squareWidth;
    },
    get lessonInfoSquareBRX() {
      return this.lessonInfoX + this.lessonInfoWidth - this.squareWidth;
    },
    get lessonInfoSquareBRY() {
      return this.lessonInfoY + this.lessonInfoHeight - this.squareWidth;
    },

    get lessonInfoTitleX() { return this.lessonInfoX + this.lessonInfoWidth / 2; },
    get lessonInfoTitleY() { return this.lessonInfoY + this.squareWidth + u.padding; },
    lessonInfoTitleOriginX: u.center,
    lessonInfoTitleOriginY: u.top,

    get lessonInfoTextX() { return this.lessonInfoX + u.paddingBig; },
    get lessonInfoTextY() { return this.lessonInfoY + u.h * 0.09; }, // TODO: this should be based on titleY
    lessonInfoTextOriginX: u.left,
    lessonInfoTextOriginY: u.top,

    // Stage Select

    get stageX() { return this.mapX + this.mapWidth + u.paddingBig; },
    stageY: u.paddingBig,
    get stageWidth() { return u.w - this.mapWidth - u.paddingBig * 3; },
    get stageHeight() { return this.mapHeight / 3; },
    stageOriginX: u.left,
    stageOriginY: u.top,

    get stageSquareTLX() { return this.stageX; },
    get stageSquareTLY() { return this.stageY; },
    get stageSquareTRX() { return this.stageX + this.stageWidth - this.squareWidth; },
    get stageSquareTRY() { return this.stageY; },
    get stageSquareBLX() { return this.stageX; },
    get stageSquareBLY() { return this.stageY + this.stageHeight - this.squareWidth; },
    get stageSquareBRX() { return this.stageX + this.stageWidth - this.squareWidth; },
    get stageSquareBRY() { return this.stageY + this.stageHeight - this.squareWidth; },

    get stageFlashLineLTX() { return this.stageSquareTLX + this.squareWidth / 2; },
    get stageFlashLineLBX() { return this.stageSquareBLX + this.squareWidth / 2; },
    get stageFlashLineLTY() { return this.stageSquareTLY + this.squareWidth + u.padding; },
    get stageFlashLineLBY() { return this.stageSquareBLY - u.padding; },
    get stageFlashLineRTX() { return this.stageSquareTRX + this.squareWidth / 2; },
    get stageFlashLineRBX() { return this.stageSquareBRX + this.squareWidth / 2; },
    get stageFlashLineRTY() { return this.stageSquareTRY + this.squareWidth + u.padding; },
    get stageFlashLineRBY() { return this.stageSquareBRY - u.padding; },
    get stageFlashLineTLX() { return this.stageSquareTLX + this.squareWidth + u.padding; },
    get stageFlashLineTRX() { return this.stageSquareTRX - u.padding; },
    get stageFlashLineTLY() { return this.stageSquareTLY + this.squareWidth / 2; },
    get stageFlashLineTRY() { return this.stageSquareTRY + this.squareWidth / 2; },
    get stageFlashLineBLX() { return this.stageSquareBLX + this.squareWidth + u.padding; },
    get stageFlashLineBRX() { return this.stageSquareBRX - u.padding; },
    get stageFlashLineBLY() { return this.stageSquareBLY + this.squareWidth / 2; },
    get stageFlashLineBRY() { return this.stageSquareBRY + this.squareWidth / 2; },

    get stageTitleX() { return this.stageX + this.stageWidth / 2; },
    get stageTitleY() { return this.stageY + this.squareWidth + u.padding; },
    stageTitleOriginX: u.center,
    stageTitleOriginY: u.top,

    get stageDotY() { return this.stageY + this.stageHeight * 0.6; },
    stageDotWidth: u.w_5p,
    stageReviewDotWidth: u.w * 0.065,
    stageDotSpaceWidth: u.w * 0.058,
    stageDotOriginX: u.left,
    stageDotOriginY: u.center,

    get stageSelectorWidth() { return this.stageDotSpaceWidth; },
    get stageSelectorReviewWidth() { return u.w * 0.075; },

    get stageSelectorXBuffer() { return (this.stageSelectorWidth - this.stageDotWidth) / 2; },

    // Stage Info

    get stageInfoX() { return this.mapX + this.mapWidth + u.paddingBig; },
    get stageInfoY() { return this.stageY + this.stageHeight + u.paddingBig; },
    get stageInfoWidth() { return u.w - this.mapWidth - u.paddingBig * 3; },
    get stageInfoHeight() { return this.mapHeight - this.stageHeight - u.paddingBig; },
    stageInfoOriginX: u.left,
    stageInfoOriginY: u.top,

    get stageInfoSquareTLX() { return this.stageInfoX; },
    get stageInfoSquareTLY() { return this.stageInfoY; },
    get stageInfoSquareTRX() {
      return this.stageInfoX + this.stageInfoWidth - this.squareWidth;
    },
    get stageInfoSquareTRY() { return this.stageInfoY; },
    get stageInfoSquareBLX() { return this.stageInfoX; },
    get stageInfoSquareBLY() {
      return this.stageInfoY + this.stageInfoHeight - this.squareWidth;
    },
    get stageInfoSquareBRX() {
      return this.stageInfoX + this.stageInfoWidth - this.squareWidth;
    },
    get stageInfoSquareBRY() {
      return this.stageInfoY + this.stageInfoHeight - this.squareWidth;
    },

    get stageInfoTitleX() { return this.stageInfoX + this.stageInfoWidth / 2; },
    get stageInfoTitleY() { return this.stageInfoY + this.squareWidth + u.padding; },
    stageInfoTitleOriginX: u.center,
    stageInfoTitleOriginY: u.top,

    get stageInfoTypeX() { return this.stageInfoX + this.stageInfoWidth / 2; },
    get stageInfoTypeY() { return this.stageInfoY + u.h * 0.075; },
    stageInfoTypeOriginX: u.center,
    stageInfoTypeOriginY: u.top,

    get stageInfoSubtitleX() { return this.stageInfoX + this.stageInfoWidth / 2; },
    get stageInfoSubtitleY() { return this.stageInfoY + u.h * 0.14; },
    stageInfoSubtitleOriginX: u.center,
    stageInfoSubtitleOriginY: u.top,

    get stageInfoZombie1X() { return this.stageInfoX + this.stageInfoWidth / 2; },
    get stageInfoZombie1Y() { return this.stageInfoY + this.stageInfoHeight * 0.80; },
    get stageInfoZombie2X() { return this.stageInfoX + this.stageInfoWidth * 0.20; },
    get stageInfoZombie2Y() { return this.stageInfoY + this.stageInfoHeight * 0.64; },
    get stageInfoZombie3X() { return this.stageInfoX + this.stageInfoWidth * 0.80; },
    get stageInfoZombie3Y() { return this.stageInfoY + this.stageInfoHeight * 0.72; },

    get stageInfoReviewZombie1X() { return this.stageInfoX + this.stageInfoWidth * 0.15; },
    get stageInfoReviewZombie1Y() { return this.stageInfoY + this.stageInfoHeight * 0.65; },
    get stageInfoReviewZombie2X() { return this.stageInfoX + this.stageInfoWidth * 0.33; },
    get stageInfoReviewZombie2Y() { return this.stageInfoY + this.stageInfoHeight * 0.81; },
    get stageInfoReviewZombie3X() { return this.stageInfoX + this.stageInfoWidth * 0.47; },
    get stageInfoReviewZombie3Y() { return this.stageInfoY + this.stageInfoHeight * 0.59; },
    get stageInfoReviewZombie4X() { return this.stageInfoX + this.stageInfoWidth * 0.62; },
    get stageInfoReviewZombie4Y() { return this.stageInfoY + this.stageInfoHeight * 0.78; },
    get stageInfoReviewZombie5X() { return this.stageInfoX + this.stageInfoWidth * 0.83; },
    get stageInfoReviewZombie5Y() { return this.stageInfoY + this.stageInfoHeight * 0.69; },

    // Instructions

    get instructionsX() { return this.lessonInfoX + this.lessonInfoWidth + u.paddingBig; },
    get instructionsY() { return this.stageInfoY + this.stageInfoHeight + u.paddingBig; },
    get instructionsWidth() { return u.w - this.mapWidth - u.paddingBig * 3; },
    get instructionsHeight() { return u.h - this.instructionsY - u.paddingBig; },
    instructionsOriginX: u.left,
    instructionsOriginY: u.top,

    get instructionsSquareTLX() { return this.instructionsX; },
    get instructionsSquareTLY() { return this.instructionsY; },
    get instructionsSquareTRX() {
      return this.instructionsX + this.instructionsWidth - this.squareWidth;
    },
    get instructionsSquareTRY() { return this.instructionsY; },
    get instructionsSquareBLX() { return this.instructionsX; },
    get instructionsSquareBLY() {
      return this.instructionsY + this.instructionsHeight - this.squareWidth;
    },
    get instructionsSquareBRX() {
      return this.instructionsX + this.instructionsWidth - this.squareWidth;
    },
    get instructionsSquareBRY() {
      return this.instructionsY + this.instructionsHeight - this.squareWidth;
    },

    get instructionsTextX() { return this.instructionsX + this.instructionsWidth / 2; },
    get instructionsTextY() { return this.instructionsY + this.instructionsHeight / 2; },
    instructionsTextOriginX: u.center,
    instructionsTextOriginY: u.center,
  };
};
