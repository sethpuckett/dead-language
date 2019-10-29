import { townMap, depth } from '../../config';
import TownMapHelper from './TownMapHelper';
import UserOptionsManager from '../../data/UserOptionsManager';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.mapHelper = new TownMapHelper();
    this.optionsManager = new UserOptionsManager(this.scene.sys.game);

    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.setDepth(depth.townMap.border);

    this.lessonId = null;
  }

  initialize() {
    this.lessonId = null;
    this.drawBorder(false);
    this.clearLessonInfo();
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

  drawBorder() {
    this.borderGraphics.clear();

    const color = townMap.ui.borderColor;
    this.borderGraphics.lineStyle(this.scene.ui.borderWidth, color);
    this.borderGraphics.fillStyle(color);

    this.borderGraphics.strokeRect(
      this.scene.ui.lessonInfoX,
      this.scene.ui.lessonInfoY,
      this.scene.ui.lessonInfoWidth,
      this.scene.ui.lessonInfoHeight
    );

    this.mapHelper.drawSquares(this.borderGraphics, this.scene.ui.squareWidth, [
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
        this.scene.ui.lessonInfoTitleY + this.optionsManager.getSelectedFontYOffset(),
        this.optionsManager.getSelectedFont(),
        lesson.name,
        townMap.fonts.lessonInfoTitleSize
      );
      this.lessonInfoTitle.setOrigin(
        this.scene.ui.lessonInfoTitleOriginX, this.scene.ui.lessonInfoTitleOriginY
      );
      this.lessonInfoTitle.setTintFill(townMap.fonts.lessonInfoTitleTint);
      this.lessonInfoTitle.setCenterAlign();

      this.lessonInfoText = this.scene.add.bitmapText(
        this.scene.ui.lessonInfoTextX,
        this.scene.ui.lessonInfoTextY + this.optionsManager.getSelectedFontYOffset(),
        this.optionsManager.getSelectedFont(),
        lesson.info,
        townMap.fonts.lessonInfoTextSize
      );
      this.lessonInfoText.setOrigin(
        this.scene.ui.lessonInfoTextOriginX, this.scene.ui.lessonInfoTextOriginY
      );
      this.lessonInfoText.setTintFill(townMap.fonts.lessonInfoTextTint);
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
