import { fonts, townMap, depth } from '../../config';
import TownMapHelper from './TownMapHelper';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.mapHelper = new TownMapHelper();

    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.setDepth(depth.townMap.border);

    this.enabled = false;
    this.lessonId = null;
  }

  initialize() {
    this.enabled = false;
    this.lessonId = null;
    this.drawBorder(false);
    this.clearLessonInfo();
  }

  enable() {
    this.drawBorder(true);
  }

  disable() {
    this.drawBorder(false);
  }

  setLesson(lessonId) {
    this.lessonId = lessonId;
    this.createLessonInfo();
  }

  clear() {
    this.lessonId = null;
    this.clearLessonInfo();
  }

  // Private

  drawBorder(enabled) {
    this.borderGraphics.clear();

    const color = enabled ? townMap.ui.borderColor : townMap.ui.borderDisableColor;
    this.borderGraphics.lineStyle(townMap.ui.borderWidth, color);
    this.borderGraphics.fillStyle(color);

    this.borderGraphics.strokeRect(
      this.scene.ui.lessonInfoX,
      this.scene.ui.lessonInfoY,
      this.scene.ui.lessonInfoWidth,
      this.scene.ui.lessonInfoHeight
    );

    this.mapHelper.drawSquares(this.borderGraphics, [
      [this.scene.ui.lessonInfoSquareTLX, this.scene.ui.lessonInfoSquareTLY],
      [this.scene.ui.lessonInfoSquareTRX, this.scene.ui.lessonInfoSquareTRY],
      [this.scene.ui.lessonInfoSquareBLX, this.scene.ui.lessonInfoSquareBLY],
      [this.scene.ui.lessonInfoSquareBRX, this.scene.ui.lessonInfoSquareBRY],
    ]);
  }

  createLessonInfo() {
    this.clearLessonInfo();

    if (this.lessonId != null) {
      const lesson = this.scene.sys.game.db.getLesson(this.lessonId);
      this.lessonInfoTitle = this.scene.add.bitmapText(
        this.scene.ui.lessonInfoTitleX,
        this.scene.ui.lessonInfoTitleY,
        fonts.blueSkyWhite,
        lesson.name,
        townMap.fonts.lessonInfoTitleSize
      );
      this.lessonInfoTitle.setOrigin(
        this.scene.ui.lessonInfoTitleOriginX, this.scene.ui.lessonInfoTitleOriginY
      );
      this.lessonInfoTitle.setCenterAlign();
      this.lessonInfoTitle.setTint(townMap.fonts.lessonInfoTitleColor);

      this.lessonInfoText = this.scene.add.bitmapText(
        this.scene.ui.lessonInfoTextX,
        this.scene.ui.lessonInfoTextY,
        fonts.blueSkyWhite,
        lesson.info,
        townMap.fonts.lessonInfoTextSize
      );
      this.lessonInfoText.setOrigin(
        this.scene.ui.lessonInfoTextOriginX, this.scene.ui.lessonInfoTextOriginY
      );
    }
  }

  clearLessonInfo() {
    if (this.lessonInfoTitle != null) {
      this.lessonInfoTitle.destroy();
      this.lessonInfoTitle = null;
    }

    if (this.lessonInfoText != null) {
      this.lessonInfoText.destroy();
      this.lessonInfoText = null;
    }
  }
}
