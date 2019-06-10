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

  initialize(enabled, lesson, stageIndex) {
    this.drawBorder(enabled);
    this.lesson = lesson;
    this.selectedStage = stageIndex;

    if (lesson != null) {
      this.createStageIcons();
    } else {
      this.clearStageIcons();
    }

    if (enabled) {
      this.createTitle();
      this.createStageSelector();
    } else {
      this.clearTitle();
      this.clearStageSelector();
    }
  }

  enable() {
    this.drawBorder(true);
    this.createTitle();
    this.createStageSelector();
    this.enableInputHandling();
  }

  disable() {
    this.drawBorder(false);
    this.clearTitle();
    this.clearStageSelector();
    this.disableInputHandling();
  }

  setLesson(lesson) {
    this.lesson = lesson;
    this.selectedStage = 0;
    this.createStageIcons();
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
      townMap.stageTitleText,
      townMap.fonts.stageTitleSize
    );
    this.stageTitle.setOrigin(
      this.scene.ui.stageTitleOriginX, this.scene.ui.stageTitleOriginY
    );
    this.stageTitle.setCenterAlign();
  }

  clearTitle() {
    if (this.stageTitle != null) {
      this.stageTitle.destroy();
      this.stageTitle = null;
    }
  }

  clearAll() {
    this.clearTitle();
    this.clearStageIcons();
    this.clearStageSelector();
  }

  createStageIcons() {
    this.clearStageIcons();

    // evenly space stage dots in stage select section
    this.stageIcons = [];
    this.lesson.stages.forEach((stageId, index) => {
      const dot = this.scene.add.sprite(
        this.getStageXPosition(index), this.scene.ui.stageDotY, images.yellowBubble
      );
      if (this.scene.game.db.isStageCompleted(stageId)) {
        dot.setFrame(images.frames.yellowBubbleFull);
      } else {
        dot.setFrame(images.frames.yellowBubbleEmpty);
      }
      dot.setOrigin(this.scene.ui.stageDotOriginX, this.scene.ui.stageDotOriginY);
      dot.displayWidth = this.scene.ui.stageDotWidth;
      dot.displayHeight = this.scene.ui.stageDotWidth;
      this.stageIcons.push(dot);
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
    this.stageIcons.push(reviewDot);
  }

  clearStageIcons() {
    if (this.stageIcons != null) {
      this.stageIcons.forEach(d => d.destroy());
      this.stageIcons = null;
    }
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

  clearStageSelector() {
    if (this.stageSelector != null) {
      this.stageSelector.destroy();
      this.stageSelector = null;
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

  // This will be called with the id of the selected stage
  setStageChangedCallback(callback) {
    this.stageChangedCallback = callback.bind(this.scene);
  }

  // This will be called with the id of the selected stage
  setStageSelectedCallback(callback) {
    this.stageSelectedCallback = callback.bind(this.scene);
  }

  setCancelCallback(callback) {
    this.cancelCallback = callback.bind(this.scene);
  }

  setSelectedStage(stageId) {
    this.selectedStage = 0;
    if (this.lesson != null && stageId != null) {
      for (let i = 0; i < this.lesson.stages.length; i += 1) {
        if (this.lesson.stages[i] === stageId) {
          this.selectedStage = i;
          break;
        }
      }
    }
  }

  getSelectedStageId() {
    if (this.lesson != null) {
      if (this.selectedStage < this.lesson.stages.length) {
        return this.lesson.stages[this.selectedStage];
      }

      // TODO: handle review
      return 'review';
    }
    return null;
  }

  getSelectedStageNumber() {
    return this.selectedStage + 1;
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

    this.stageChangedCallback(this.getSelectedStageId(), this.getSelectedStageNumber());
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
        this.stageSelectedCallback(this.getSelectedStageId());
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
