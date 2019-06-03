import { fonts, townMap, images } from '../../config';
import TownMapHelper from './TownMapHelper';

export default class {
  constructor(scene, borderGraphics, lesson) {
    this.scene = scene;
    this.borderGraphics = borderGraphics;
    this.lesson = lesson;
    this.mapHelper = new TownMapHelper();
    this.selectedStage = 0;
    this.inputHandled = false;
  }

  drawBorder() {
    this.borderGraphics.strokeRect(
      this.scene.ui.stageX,
      this.scene.ui.stageY,
      this.scene.ui.stageWidth,
      this.scene.ui.stageHeight
    );

    this.mapHelper.drawSquares(this.borderGraphics, [
      [this.scene.ui.stageSquareTLX, this.scene.ui.stageSquareTLY],
      [this.scene.ui.stageSquareTRX, this.scene.ui.stageSquareTRY],
      [this.scene.ui.stageSquareBLX, this.scene.ui.stageSquareBLY],
      [this.scene.ui.stageSquareBRX, this.scene.ui.stageSquareBRY],
    ]);
  }

  createTitle() {
    this.stageTitle = this.scene.add.bitmapText(
      this.scene.ui.stageTitleX,
      this.scene.ui.stageTitleY,
      fonts.blueSkyWhite,
      'Choose a stage',
      townMap.fonts.stageTitleSize
    );
    this.stageTitle.setOrigin(
      this.scene.ui.stageTitleOriginX, this.scene.ui.stageTitleOriginY
    );
    this.stageTitle.setCenterAlign();
  }

  createStageIcons() {
    // evenly space stage dots in stage select section
    this.stageDots = [];
    this.lesson.stages.forEach((stage, index) => {
      const dot = this.scene.add.sprite(
        this.getStageXPosition(index), this.scene.ui.stageDotY, images.yellowBubble
      );
      // TODO: set this based on completion status of stage
      dot.setFrame(images.frames.yellowBubbleEmpty);
      dot.setOrigin(this.scene.ui.stageDotOriginX, this.scene.ui.stageDotOriginY);
      dot.displayWidth = this.scene.ui.stageDotWidth;
      dot.displayHeight = this.scene.ui.stageDotWidth;
    });

    // draw review stage dot
    const reviewDot = this.scene.add.sprite(
      this.getStageXPosition(this.lesson.stages.length),
      this.scene.ui.stageDotY,
      images.yellowBubble
    );
    // TODO: set this based on completion status of stage
    reviewDot.setFrame(images.frames.yellowBubbleEmpty);
    reviewDot.setOrigin(this.scene.ui.stageDotOriginX, this.scene.ui.stageDotOriginY);
    reviewDot.displayWidth = this.scene.ui.stageReviewDotWidth;
    reviewDot.displayHeight = this.scene.ui.stageReviewDotWidth;
  }

  createStageSelector() {
    this.stageSelector = this.scene.add.sprite(
      this.getStageXPosition(this.selectedStage) - this.scene.ui.stageSelectorXBuffer,
      this.scene.ui.stageDotY, images.hudItemBorder
    );
    this.stageSelector.displayWidth = this.scene.ui.stageSelectorWidth;
    this.stageSelector.displayHeight = this.scene.ui.stageSelectorWidth;
    this.stageSelector.setOrigin(this.scene.ui.stageDotOriginX, this.scene.ui.stageDotOriginY);
  }

  updateStageSelector() {
    this.stageSelector.x = this.getStageXPosition(this.selectedStage)
      - this.scene.ui.stageSelectorXBuffer;
    if (this.selectedStage === this.lesson.stages.length) { // review stage selected
      this.stageSelector.displayWidth = this.scene.ui.stageSelectorReviewWidth;
      this.stageSelector.displayHeight = this.scene.ui.stageSelectorReviewWidth;
    } else {
      this.stageSelector.displayWidth = this.scene.ui.stageSelectorWidth;
      this.stageSelector.displayHeight = this.scene.ui.stageSelectorWidth;
    }
  }

  enableInputHandling() {
    if (!this.inputHandled) {
      this.inputHandled = true;
      this.createInput();
    }
  }

  disableInputHandling() {
    if (this.inputHandled) {
      this.inputHandled = false;
      this.keys = null;
      this.scene.input.keyboard.off('keydown', this.handleKeyDown);
    }
  }

  // Private

  getStageXPosition(index) {
    const stageCount = this.lesson.stages.length;
    const totalDotWidth = stageCount * this.scene.ui.stageDotWidth
      + this.scene.ui.stageReviewDotWidth;
    const baseX = this.scene.ui.stageX + this.scene.ui.stageWidth / 2 - totalDotWidth / 2;
    const percentX = index / (this.lesson.stages.length + 1);
    return baseX + totalDotWidth * percentX;
  }

  createInput() {
    this.keys = this.scene.input.keyboard.addKeys(
      'SPACE,ENTER,LEFT,RIGHT,ESC'
    );
    this.scene.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.LEFT.keyCode) {
      this.decrementSelectedStage();
    } else if (e.keyCode === this.keys.RIGHT.keyCode) {
      this.incrementSelectedStage();
    }
  }

  decrementSelectedStage() {
    this.selectedStage = Math.max(this.selectedStage - 1, 0);
    this.updateStageSelector();
  }

  incrementSelectedStage() {
    this.selectedStage = Math.min(this.selectedStage + 1, this.lesson.stages.length);
    this.updateStageSelector();
  }
}
