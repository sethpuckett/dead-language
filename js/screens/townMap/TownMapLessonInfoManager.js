import { fonts, townMap } from '../../config';
import TownMapHelper from './TownMapHelper';

export default class {
  constructor(scene, borderGraphics) {
    this.scene = scene;
    this.borderGraphics = borderGraphics;
    this.mapHelper = new TownMapHelper();
  }

  drawBorder() {
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

  createLessonInfo(lesson) {
    this.clearLessonInfo();

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
