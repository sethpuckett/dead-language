import { townMap, depth, lessonMap, images, fonts } from '../../config';
import TownMapHelper from './TownMapHelper';
import GameProgressManager from '../../data/GameProgressManager';

const MAP_X_CELL_COUNT = 9;
const MAP_Y_CELL_COUNT = 6;

export default class {
  constructor(scene) {
    this.scene = scene;
    this.mapHelper = new TownMapHelper();
    this.progressManager = new GameProgressManager(this.scene.sys.game.db);

    this.selectedCell = { x: 0, y: 0 };
    this.inputHandled = false;
    this.enabled = false;

    this.requirementGraphics = this.scene.add.graphics();
    this.requirementGraphics.setDepth(depth.townMap.requirementLine);
    this.requirementGraphics.lineStyle(
      townMap.ui.requirementLineWidth, townMap.ui.requirementLineColor
    );
  }

  initialize() {
    this.enabled = false;
    this.selectedCell = { x: 0, y: 0 };
    this.inputHandled = false;

    this.drawBorder(false);
    this.createLocation();
    this.createMapGrid();
    this.createLessonPins();
    this.createLessonSelector();
    this.drawRequirementLines();
    this.clearTitle();
    this.clearFlashTimer();
  }

  enable() {
    this.enabled = true;
    this.flashBorder();
    this.createTitle();
    this.enableInputHandling();
  }

  disable() {
    this.enabled = false;
    this.clearFlashTimer();
    this.drawBorder(false);
    this.clearTitle();
    this.disableInputHandling();
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

  // This will be called with the id of the selected lesson
  setLessonChangedCallback(callback) {
    this.lessonChangedCallback = callback.bind(this.scene);
  }

  // This will be called with the id of the selected lesson
  setLessonSelectedCallback(callback) {
    this.lessonSelectedCallback = callback.bind(this.scene);
  }

  setCancelCallback(callback) {
    this.cancelCallback = callback.bind(this.scene);
  }

  getLesson() {
    const lesson = lessonMap.find(
      l => l.position.x === this.selectedCell.x && l.position.y === this.selectedCell.y
    );

    if (lesson != null) {
      return lesson;
    }

    return null;
  }

  getLessonId() {
    const lesson = this.getLesson();
    if (lesson != null) {
      return lesson.id;
    }
    return null;
  }

  getLessonLocation() {
    const lesson = this.getLesson();
    if (lesson != null) {
      const cleared = this.progressManager.isLessonCompleted(lesson.id);
      const locked = this.progressManager.isLessonLocked(lesson.id);
      let text = lesson.location;
      if (cleared) {
        text += ` - ${townMap.clearedText}`;
      } else if (locked) {
        text += ` - ${townMap.lockedText}`;
      }
      return text;
    }
    return null;
  }

  setLesson(lessonId) {
    lessonMap.some((lesson) => {
      if (lesson.id === lessonId) {
        this.selectedCell.x = lesson.position.x;
        this.selectedCell.y = lesson.position.y;
        this.updateLessonSelector();
        return true;
      }
      return false;
    });
  }

  resetLesson() {
    this.selectedCell.x = 0;
    this.selectedCell.y = 0;
    this.updateLessonSelector();
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
    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.setDepth(depth.townMap.border);
    const color = enabled ? townMap.ui.borderColor : townMap.ui.borderDisableColor;
    this.borderGraphics.lineStyle(townMap.ui.borderWidth, color);
    this.borderGraphics.fillStyle(color);

    this.borderGraphics.strokeRect(
      this.scene.ui.mapX, this.scene.ui.mapY, this.scene.ui.mapWidth, this.scene.ui.mapHeight
    );
    this.mapHelper.drawSquares(this.borderGraphics, [
      [this.scene.ui.mapSquareTLX, this.scene.ui.mapSquareTLY],
      [this.scene.ui.mapSquareTRX, this.scene.ui.mapSquareTRY],
      [this.scene.ui.mapSquareBLX, this.scene.ui.mapSquareBLY],
      [this.scene.ui.mapSquareBRX, this.scene.ui.mapSquareBRY],
    ]);
  }

  createTitle() {
    this.clearTitle();

    this.mapTitle = this.scene.add.bitmapText(
      this.scene.ui.mapTitleX,
      this.scene.ui.mapTitleY,
      fonts.blueSkyWhite,
      townMap.mapTitleText,
      townMap.fonts.mapTitleSize
    );
    this.mapTitle.setOrigin(
      this.scene.ui.mapTitleOriginX, this.scene.ui.mapTitleOriginY
    );
    this.mapTitle.setTintFill(townMap.fonts.mapTitleTint);
  }

  clearTitle() {
    if (this.mapTitle != null) {
      this.mapTitle.destroy();
      this.mapTitle = null;
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

  createLocation() {
    this.clearLocation();
    const location = this.getLessonLocation();
    if (location != null) {
      this.mapLocation = this.scene.add.bitmapText(
        this.scene.ui.mapLocationX,
        this.scene.ui.mapLocationY,
        fonts.blueSkyWhite,
        location,
        townMap.fonts.mapLocationSize
      );
      this.mapLocation.setOrigin(
        this.scene.ui.mapLocationOriginX, this.scene.ui.mapLocationOriginY
      );
      this.mapLocation.setTintFill(townMap.fonts.mapLocationTint);
    }
  }

  clearLocation() {
    if (this.mapLocation != null) {
      this.mapLocation.destroy();
      this.mapLocation = null;
    }
  }

  createMapGrid() {
    this.clearMapGrid();
    this.gridGraphics = this.scene.add.graphics();
    this.gridGraphics.lineStyle(townMap.ui.mapGridWidth, townMap.ui.mapGridColor);
    this.gridGraphics.setDepth(depth.townMap.mapGrid);

    this.cellWidth = (this.scene.ui.mapGridWidth - townMap.ui.squareWidth * 2
      - this.scene.ui.padding * 2) / MAP_X_CELL_COUNT;
    this.cellHeight = (this.scene.ui.mapGridHeight - townMap.ui.squareWidth * 2
      - this.scene.ui.padding * 2) / MAP_Y_CELL_COUNT;
    this.baseX = this.scene.ui.mapGridX + townMap.ui.squareWidth + this.scene.ui.padding;
    this.baseY = this.scene.ui.mapGridY + townMap.ui.squareWidth + this.scene.ui.padding;

    for (let x = 0; x < MAP_X_CELL_COUNT; x += 1) {
      for (let y = 0; y < MAP_Y_CELL_COUNT; y += 1) {
        this.gridGraphics.strokeRect(
          this.baseX + this.cellWidth * x,
          this.baseY + this.cellHeight * y,
          this.cellWidth,
          this.cellHeight
        );
      }
    }
  }

  clearMapGrid() {
    if (this.gridGraphics != null) {
      this.gridGraphics.clear();
      this.gridGraphics = null;
    }
  }

  createLessonPins() {
    this.clearLessonPins();
    this.pins = [];
    lessonMap.forEach((lesson) => {
      const xPos = this.baseX + lesson.position.x * this.cellWidth + this.cellWidth / 2;
      const yPos = this.baseY + lesson.position.y * this.cellHeight + this.cellHeight / 2;

      const completed = this.progressManager.isLessonCompleted(lesson.id);
      const locked = this.progressManager.isLessonLocked(lesson.id);
      let pinFrame = images.frames.colorSquareYellow;
      if (completed) {
        pinFrame = images.frames.colorSquareGreen;
      } else if (locked) {
        pinFrame = images.frames.colorSquareRed;
      }

      const pin = this.scene.add.sprite(xPos, yPos, images.colorSquare, pinFrame);
      pin.setOrigin(this.scene.ui.mapPinOrigin);
      pin.setDepth(depth.townMap.lessonPin);
      pin.displayWidth = this.cellWidth * townMap.ui.mapPinCellWidth;
      pin.displayHeight = this.cellHeight * townMap.ui.mapPinCellWidth;
      this.pins.push(pin);
    });
  }

  clearLessonPins() {
    if (this.pins != null) {
      this.pins.forEach(p => p.destroy());
      this.pins = null;
    }
  }

  createLessonSelector() {
    this.lessonSelector = this.scene.add.sprite(
      this.getSelectorXPosition(),
      this.getSelectorYPosition(),
      images.hudItemBorder
    );
    this.lessonSelector.displayWidth = this.cellWidth - this.scene.ui.padding * 2;
    this.lessonSelector.displayHeight = this.cellHeight - this.scene.ui.padding * 2;
    this.lessonSelector.setOrigin(this.scene.ui.mapSelectorOrigin);
  }

  clearLessonSelector() {
    if (this.lessonSelector != null) {
      this.lessonSelector.destroy();
      this.lessonSelector = null;
    }
  }

  createInput() {
    this.keys = this.scene.input.keyboard.addKeys(
      'SPACE,ENTER,LEFT,RIGHT,UP,DOWN,ESC'
    );
    this.scene.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.LEFT.keyCode) {
      this.moveSelectedCellLeft();
    } else if (e.keyCode === this.keys.RIGHT.keyCode) {
      this.moveSelectedCellRight();
    } else if (e.keyCode === this.keys.UP.keyCode) {
      this.moveSelectedCellUp();
    } else if (e.keyCode === this.keys.DOWN.keyCode) {
      this.moveSelectedCellDown();
    } else if (e.keyCode === this.keys.SPACE.keyCode || e.keyCode === this.keys.ENTER.keyCode) {
      const lessonId = this.getLessonId();
      if (lessonId != null) {
        this.lessonSelectedCallback(lessonId);
      }
    } else if (e.keyCode === this.keys.ESC.keyCode) {
      this.cancelCallback();
    }
  }

  moveSelectedCellUp() {
    this.selectedCell.y = Math.max(this.selectedCell.y - 1, 0);
    this.updateLessonSelector();
  }

  moveSelectedCellDown() {
    this.selectedCell.y = Math.min(this.selectedCell.y + 1, MAP_Y_CELL_COUNT - 1);
    this.updateLessonSelector();
  }

  moveSelectedCellLeft() {
    this.selectedCell.x = Math.max(this.selectedCell.x - 1, 0);
    this.updateLessonSelector();
  }

  moveSelectedCellRight() {
    this.selectedCell.x = Math.min(this.selectedCell.x + 1, MAP_X_CELL_COUNT - 1);
    this.updateLessonSelector();
  }

  updateLessonSelector() {
    this.lessonSelector.x = this.getSelectorXPosition();
    this.lessonSelector.y = this.getSelectorYPosition();
    this.createLocation();
    this.lessonChangedCallback(this.getLessonId());
  }

  getSelectorXPosition() {
    return this.baseX + this.selectedCell.x * this.cellWidth + this.cellWidth / 2;
  }

  getSelectorYPosition() {
    return this.baseY + this.selectedCell.y * this.cellHeight + this.cellHeight / 2;
  }

  drawRequirementLines() {
    lessonMap.forEach((mapInfo) => {
      const lesson = this.scene.sys.game.db.getLesson(mapInfo.id);
      if (lesson.requirements != null) {
        lesson.requirements.forEach((requiredLessonId) => {
          const requireInfo = lessonMap.find(mi => mi.id === requiredLessonId);
          const fromX = this.baseX + mapInfo.position.x * this.cellWidth + this.cellWidth / 2;
          const fromY = this.baseY + mapInfo.position.y * this.cellHeight + this.cellHeight / 2;
          const toX = this.baseX + requireInfo.position.x * this.cellWidth + this.cellWidth / 2;
          const toY = this.baseY + requireInfo.position.y * this.cellHeight + this.cellHeight / 2;
          this.requirementGraphics.beginPath();
          this.requirementGraphics.moveTo(fromX, fromY);
          this.requirementGraphics.lineTo(toX, toY);
          this.requirementGraphics.closePath();
          this.requirementGraphics.strokePath();
        });
      }
    });
  }
}
