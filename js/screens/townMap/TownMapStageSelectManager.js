import { fonts, townMap, images, depth } from '../../config';
import TownMapHelper from './TownMapHelper';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.mapHelper = new TownMapHelper();
    this.selectedStage = 0;
    this.inputHandled = false;

    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.setDepth(depth.townMap.border);
  }

  drawBorder(enabled) {
    const color = enabled ? townMap.ui.borderColor : townMap.ui.borderDisableColor;
    this.borderGraphics.lineStyle(townMap.ui.borderWidth, color);
    this.borderGraphics.fillStyle(color);

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
    this.clearTitle();

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

  setLesson(lesson) {
    this.lesson = lesson;
    this.selectedStage = 0;
    // this.createTitle();
    this.createStageIcons();
    // this.createStageSelector();
  }

  clearAll() {
    this.clearTitle();
    this.clearStageIcons();
    this.clearStageSelector();
  }

  clearTitle() {
    if (this.stageTitle != null) {
      this.stageTitle.destroy();
      this.stageTitle = null;
    }
  }

  clearStageIcons() {
    if (this.stageDots != null) {
      this.stageDots.forEach(d => d.destroy());
      this.stageDots = null;
    }
  }

  clearStageSelector() {
    if (this.stageSelector != null) {
      this.stageSelector.destroy();
      this.stageSelector = null;
    }
  }

  createStageIcons() {
    this.clearStageIcons();

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
      this.stageDots.push(dot);
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
    this.stageDots.push(reviewDot);
  }

  createStageSelector() {
    this.clearStageSelector();

    this.stageSelector = this.scene.add.sprite(
      this.getStageXPosition(this.selectedStage) - this.scene.ui.stageSelectorXBuffer,
      this.scene.ui.stageDotY, images.hudItemBorder
    );
    this.stageSelector.displayWidth = this.scene.ui.stageSelectorWidth;
    this.stageSelector.displayHeight = this.scene.ui.stageSelectorWidth;
    this.stageSelector.setOrigin(this.scene.ui.stageDotOriginX, this.scene.ui.stageDotOriginY);
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

  // This will be called with the index of the selected stage for this lesson
  setStageSelectedCallback(callback) {
    this.stageSelectedCallback = callback.bind(this.scene);
  }

  setCancelCallback(callback) {
    this.cancelCallback = callback.bind(this.scene);
  }

  // Private

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
    } else if (e.keyCode === this.keys.SPACE.keyCode || e.keyCode === this.keys.ENTER.keyCode) {
      if (this.selectedStage < this.lesson.stages.length) {
        this.stageSelectedCallback(this.selectedStage);
      } else {
        // TODO: add review stage
      }
    } else if (e.keyCode === this.keys.ESC.keyCode) {
      this.cancelCallback();
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
