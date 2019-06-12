import { townMap, depth, lessonMap, images, fonts } from '../../config';
import TownMapHelper from './TownMapHelper';
import GameProgressManager from '../../data/GameProgressManager';

const MAP_X_CELL_COUNT = 8;
const MAP_Y_CELL_COUNT = 5;

export default class {
  constructor(scene) {
    this.scene = scene;
    this.mapHelper = new TownMapHelper();
    this.progressManager = new GameProgressManager(this.scene.sys.game.db);

    this.selectedCell = { x: 0, y: 0 };
    this.inputHandled = false;

    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.setDepth(depth.townMap.border);
  }

  initialize(enabled) {
    this.enabled = enabled;
    this.drawBorder(enabled);
    this.createLocation();
    this.createMapGrid();
    this.createLessonPins();
    this.createLessonSelector();

    if (enabled) {
      this.createTitle();
    } else {
      this.clearTitle();
    }
  }

  enable() {
    this.enabled = true;
    this.drawBorder(true);
    this.createTitle();
    this.enableInputHandling();
  }

  disable() {
    this.enabled = false;
    this.drawBorder(false);
    this.clearTitle();
    this.disableInputHandling();
  }

  drawBorder(enabled) {
    this.borderGraphics.clear();

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
  }

  clearTitle() {
    if (this.mapTitle != null) {
      this.mapTitle.destroy();
      this.mapTitle = null;
    }
  }

  createLocation() {
    this.clearLocation();
    const location = this.getSelectedLessonLocation();
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
      let pinFrame = images.frames.colorSquareYellow;
      if (completed) {
        pinFrame = images.frames.colorSquareGreen;
      }

      const pin = this.scene.add.sprite(xPos, yPos, images.colorSquare, pinFrame);
      pin.setOrigin(this.scene.ui.mapPinOrigin);
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

  getSelectedLesson() {
    const lesson = lessonMap.find(
      l => l.position.x === this.selectedCell.x && l.position.y === this.selectedCell.y
    );

    if (lesson != null) {
      return lesson;
    }

    return null;
  }

  getSelectedLessonId() {
    const lesson = this.getSelectedLesson();
    if (lesson != null) {
      return lesson.id;
    }
    return null;
  }

  getSelectedLessonLocation() {
    const lesson = this.getSelectedLesson();
    if (lesson != null) {
      return lesson.location;
    }
    return null;
  }

  setSelectedLesson(lessonId) {
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

  // Private

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
      const lessonId = this.getSelectedLessonId();
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
    this.lessonChangedCallback(this.getSelectedLessonId());
  }

  getSelectorXPosition() {
    return this.baseX + this.selectedCell.x * this.cellWidth + this.cellWidth / 2;
  }

  getSelectorYPosition() {
    return this.baseY + this.selectedCell.y * this.cellHeight + this.cellHeight / 2;
  }
}
