import { fonts, townMap, images, depth, gameTypes } from '../../config';
import TownMapHelper from './TownMapHelper';
import GameProgressManager from '../../data/GameProgressManager';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.mapHelper = new TownMapHelper();
    this.progressManager = new GameProgressManager(this.scene.sys.game.db);
    this.selectedStageIndex = 0;
    this.inputHandled = false;
    this.enabled = false;
    this.lesson = null;
    this.selectorFlashOn = false;
  }

  initialize() {
    this.enabled = false;
    this.lesson = null;
    this.selectedStageIndex = 0;

    this.drawBorder(false);
    this.clear();
  }

  enable() {
    this.enabled = true;
    this.flashBorder();
    this.createTitle();
    this.createStageSelector();
    this.enableInputHandling();
  }

  disable() {
    this.enabled = false;
    this.clearFlashTimer();
    this.clearTitle();
    this.clearStageSelector();
    this.drawBorder(false);
    this.disableInputHandling();
  }

  setLesson(lessonId) {
    this.lesson = this.scene.sys.game.db.getLesson(lessonId);
    this.selectedStageIndex = 0;
    this.createStageIcons();
  }

  setStage(stageId) {
    if (stageId != null) {
      this.selectedStageIndex = 0;
      if (this.lesson != null) {
        for (let i = 0; i < this.lesson.stages.length; i += 1) {
          if (this.lesson.stages[i] === stageId) {
            this.selectedStageIndex = i;
            if (this.enabled) {
              this.updateStageSelector();
            }
            break;
          }
        }
      }
    }
  }

  resetStage() {
    this.selectedStageIndex = 0;
    if (this.enabled) {
      this.updateStageSelector();
    }
  }

  clear() {
    this.clearTitle();
    this.clearStageIcons();
    this.clearStageSelector();
    this.clearFlashTimer();
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

  getStageId() {
    if (this.lesson != null) {
      return this.lesson.stages[this.selectedStageIndex];
    }
    return null;
  }

  getStageNumber() {
    return this.selectedStageIndex + 1;
  }

  // Private

  flashBorder() {
    this.clearFlashTimer();
    this.drawBorder(true);
    this.selectorFlashOn = true;
    this.flashTimer = this.scene.time.addEvent({
      delay: townMap.selectorFlashDelay,
      callback: () => {
        this.selectorFlashOn = !this.selectorFlashOn;
        this.drawBorder(this.selectorFlashOn);
      },
      callbackScope: this,
      repeat: -1,
    });
  }

  drawBorder(enabled) {
    this.clearBorder();
    const color = enabled ? townMap.ui.borderColor : townMap.ui.borderDisableColor;
    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.setDepth(depth.townMap.border);
    this.borderGraphics.lineStyle(this.scene.ui.borderWidth, color);
    this.borderGraphics.fillStyle(color);

    this.borderGraphics.strokeRect(
      this.scene.ui.stageX,
      this.scene.ui.stageY,
      this.scene.ui.stageWidth,
      this.scene.ui.stageHeight
    );

    this.mapHelper.drawSquares(this.borderGraphics, this.scene.ui.squareWidth, [
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
    this.stageTitle.setTintFill(townMap.fonts.stageTitleTint);
    this.stageTitle.setCenterAlign();
  }

  clearTitle() {
    if (this.stageTitle != null) {
      this.stageTitle.destroy();
      this.stageTitle = null;
    }
  }

  createStageIcons() {
    this.clearStageIcons();

    if (this.lesson != null) {
      // evenly space stage dots in stage select section
      this.stageIcons = [];
      this.lesson.stages.forEach((stageId, index) => {
        const dot = this.scene.add.sprite(
          this.getStageXPosition(index), this.scene.ui.stageDotY, images.yellowBubble
        );
        if (this.progressManager.isStageCompleted(stageId)) {
          dot.setFrame(images.frames.yellowBubbleFull);
        } else {
          dot.setFrame(images.frames.yellowBubbleEmpty);
        }
        dot.setOrigin(this.scene.ui.stageDotOriginX, this.scene.ui.stageDotOriginY);
        this.stageIcons.push(dot);

        const gameType = this.scene.game.db.getStage(stageId).type;
        if (gameType === gameTypes.zombieAssault.id) {
          dot.displayWidth = this.scene.ui.stageDotWidth;
          dot.displayHeight = this.scene.ui.stageDotWidth;
        } else if (gameType === gameTypes.zombieAssaultReview.id) {
          dot.displayWidth = this.scene.ui.stageReviewDotWidth;
          dot.displayHeight = this.scene.ui.stageReviewDotWidth;
        }
      });
    }
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
      this.getStageXPosition(this.selectedStageIndex) - this.scene.ui.stageSelectorXBuffer,
      this.scene.ui.stageDotY, images.hudItemBorder
    );
    this.stageSelector.setOrigin(this.scene.ui.stageDotOriginX, this.scene.ui.stageDotOriginY);
    this.setSelectorSize();
  }

  clearStageSelector() {
    if (this.stageSelector != null) {
      this.stageSelector.destroy();
      this.stageSelector = null;
    }
  }

  clearFlashTimer() {
    this.selectorFlashOn = false;
    if (this.flashTimer != null) {
      this.flashTimer.destroy();
      this.flashTimer = null;
    }
  }

  clearBorder() {
    if (this.borderGraphics != null) {
      this.borderGraphics.destroy();
      this.borderGraphics = null;
    }
  }

  updateStageSelector() {
    this.stageSelector.x = this.getStageXPosition(this.selectedStageIndex)
      - this.scene.ui.stageSelectorXBuffer;
    this.setSelectorSize();

    this.stageChangedCallback(this.getStageId(), this.getStageNumber());
  }

  setSelectorSize() {
    if (this.getStageType() === gameTypes.zombieAssaultReview.id) {
      this.stageSelector.displayWidth = this.scene.ui.stageSelectorReviewWidth;
      this.stageSelector.displayHeight = this.scene.ui.stageSelectorReviewWidth;
    } else {
      this.stageSelector.displayWidth = this.scene.ui.stageSelectorWidth;
      this.stageSelector.displayHeight = this.scene.ui.stageSelectorWidth;
    }
  }

  getStageXPosition(index) {
    const stageCount = this.lesson.stages.length;
    const totalDotWidth = stageCount * this.scene.ui.stageDotSpaceWidth;
    const baseX = this.scene.ui.stageX + this.scene.ui.stageWidth / 2 - totalDotWidth / 2;
    const percentX = index / (this.lesson.stages.length);
    return baseX + totalDotWidth * percentX;
  }

  getStageType() {
    return this.scene.game.db.getStage(this.getStageId()).type;
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
      this.stageSelectedCallback(this.getStageId());
    } else if (e.keyCode === this.keys.ESC.keyCode) {
      this.cancelCallback();
    }
  }

  decrementSelectedStage() {
    this.selectedStageIndex = Math.max(this.selectedStageIndex - 1, 0);
    this.updateStageSelector();
  }

  incrementSelectedStage() {
    this.selectedStageIndex = Math.min(this.selectedStageIndex + 1, this.lesson.stages.length - 1);
    this.updateStageSelector();
  }
}
