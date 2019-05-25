import uiHelper from './uiHelper';
import { townMap } from '../../config';

export default (config) => {
  const u = uiHelper(config);

  return {

    // Map

    mapX: u.paddingBig,
    mapY: u.paddingBig,
    mapWidth: u.w_60p - u.paddingBig * 2,
    mapHeight: u.h_66p - u.paddingBig * 2,
    mapOriginX: u.left,
    mapOriginY: u.top,

    get mapSquareTLX() { return this.mapX; },
    get mapSquareTLY() { return this.mapY; },
    get mapSquareTRX() { return this.mapX + this.mapWidth - townMap.ui.squareWidth; },
    get mapSquareTRY() { return this.mapY; },
    get mapSquareBLX() { return this.mapX; },
    get mapSquareBLY() { return this.mapY + this.mapHeight - townMap.ui.squareWidth; },
    get mapSquareBRX() { return this.mapX + this.mapWidth - townMap.ui.squareWidth; },
    get mapSquareBRY() { return this.mapY + this.mapHeight - townMap.ui.squareWidth; },

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
      return this.lessonInfoX + this.lessonInfoWidth - townMap.ui.squareWidth;
    },
    get lessonInfoSquareTRY() { return this.lessonInfoY; },
    get lessonInfoSquareBLX() { return this.lessonInfoX; },
    get lessonInfoSquareBLY() {
      return this.lessonInfoY + this.lessonInfoHeight - townMap.ui.squareWidth;
    },
    get lessonInfoSquareBRX() {
      return this.lessonInfoX + this.lessonInfoWidth - townMap.ui.squareWidth;
    },
    get lessonInfoSquareBRY() {
      return this.lessonInfoY + this.lessonInfoHeight - townMap.ui.squareWidth;
    },

    // Stage Select

    get stageX() { return this.mapX + this.mapWidth + u.paddingBig; },
    stageY: u.paddingBig,
    get stageWidth() { return u.w - this.mapWidth - u.paddingBig * 3; },
    get stageHeight() { return this.mapHeight / 3; },
    stageOriginX: u.left,
    stageOriginY: u.top,

    get stageSquareTLX() { return this.stageX; },
    get stageSquareTLY() { return this.stageY; },
    get stageSquareTRX() { return this.stageX + this.stageWidth - townMap.ui.squareWidth; },
    get stageSquareTRY() { return this.stageY; },
    get stageSquareBLX() { return this.stageX; },
    get stageSquareBLY() { return this.stageY + this.stageHeight - townMap.ui.squareWidth; },
    get stageSquareBRX() { return this.stageX + this.stageWidth - townMap.ui.squareWidth; },
    get stageSquareBRY() { return this.stageY + this.stageHeight - townMap.ui.squareWidth; },

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
      return this.stageInfoX + this.stageInfoWidth - townMap.ui.squareWidth;
    },
    get stageInfoSquareTRY() { return this.stageInfoY; },
    get stageInfoSquareBLX() { return this.stageInfoX; },
    get stageInfoSquareBLY() {
      return this.stageInfoY + this.stageInfoHeight - townMap.ui.squareWidth;
    },
    get stageInfoSquareBRX() {
      return this.stageInfoX + this.stageInfoWidth - townMap.ui.squareWidth;
    },
    get stageInfoSquareBRY() {
      return this.stageInfoY + this.stageInfoHeight - townMap.ui.squareWidth;
    },

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
      return this.instructionsX + this.instructionsWidth - townMap.ui.squareWidth;
    },
    get instructionsSquareTRY() { return this.instructionsY; },
    get instructionsSquareBLX() { return this.instructionsX; },
    get instructionsSquareBLY() {
      return this.instructionsY + this.instructionsHeight - townMap.ui.squareWidth;
    },
    get instructionsSquareBRX() {
      return this.instructionsX + this.instructionsWidth - townMap.ui.squareWidth;
    },
    get instructionsSquareBRY() {
      return this.instructionsY + this.instructionsHeight - townMap.ui.squareWidth;
    },
  };
};
