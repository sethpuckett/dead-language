import Phaser from 'phaser';
import { townMap, depth } from '../../config';
import HudStatusManager from '../HudStatusManager';
import Modal from '../Modal';
import townMapUiHelper from '../ui/townMapUiHelper';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TownMap' });
  }

  init() {
    this.ui = townMapUiHelper(this.sys.game.config);
    this.statusManager = new HudStatusManager(this);

    this.borderGraphics = this.add.graphics();
    this.borderGraphics.fillStyle(townMap.ui.borderColor);
    this.borderGraphics.lineStyle(townMap.ui.borderWidth, townMap.ui.borderColor);
    this.borderGraphics.setDepth(depth.townMap.border);
  }

  create() {
    this.createMap();
    this.createLessonInfo();
    this.createStageSelect();
    this.createStageInfo();
    this.createInstructions();
    this.createStartModal();
  }

  update() {

  }

  createMap() {
    this.borderGraphics.strokeRect(this.ui.mapX, this.ui.mapY, this.ui.mapWidth, this.ui.mapHeight);

    this.drawSquares([
      [this.ui.mapSquareTLX, this.ui.mapSquareTLY], [this.ui.mapSquareTRX, this.ui.mapSquareTRY],
      [this.ui.mapSquareBLX, this.ui.mapSquareBLY], [this.ui.mapSquareBRX, this.ui.mapSquareBRY],
    ]);
  }

  createLessonInfo() {
    this.borderGraphics.strokeRect(
      this.ui.lessonInfoX, this.ui.lessonInfoY, this.ui.lessonInfoWidth, this.ui.lessonInfoHeight
    );

    this.drawSquares([
      [this.ui.lessonInfoSquareTLX, this.ui.lessonInfoSquareTLY],
      [this.ui.lessonInfoSquareTRX, this.ui.lessonInfoSquareTRY],
      [this.ui.lessonInfoSquareBLX, this.ui.lessonInfoSquareBLY],
      [this.ui.lessonInfoSquareBRX, this.ui.lessonInfoSquareBRY],
    ]);
  }

  createStageSelect() {
    this.borderGraphics.strokeRect(
      this.ui.stageX, this.ui.stageY, this.ui.stageWidth, this.ui.stageHeight
    );

    this.drawSquares([
      [this.ui.stageSquareTLX, this.ui.stageSquareTLY],
      [this.ui.stageSquareTRX, this.ui.stageSquareTRY],
      [this.ui.stageSquareBLX, this.ui.stageSquareBLY],
      [this.ui.stageSquareBRX, this.ui.stageSquareBRY],
    ]);
  }

  createStageInfo() {
    this.borderGraphics.strokeRect(
      this.ui.stageInfoX, this.ui.stageInfoY, this.ui.stageInfoWidth, this.ui.stageInfoHeight
    );

    this.drawSquares([
      [this.ui.stageInfoSquareTLX, this.ui.stageInfoSquareTLY],
      [this.ui.stageInfoSquareTRX, this.ui.stageInfoSquareTRY],
      [this.ui.stageInfoSquareBLX, this.ui.stageInfoSquareBLY],
      [this.ui.stageInfoSquareBRX, this.ui.stageInfoSquareBRY],
    ]);
  }

  createInstructions() {
    this.borderGraphics.strokeRect(
      this.ui.instructionsX,
      this.ui.instructionsY,
      this.ui.instructionsWidth,
      this.ui.instructionsHeight
    );

    this.drawSquares([
      [this.ui.instructionsSquareTLX, this.ui.instructionsSquareTLY],
      [this.ui.instructionsSquareTRX, this.ui.instructionsSquareTRY],
      [this.ui.instructionsSquareBLX, this.ui.instructionsSquareBLY],
      [this.ui.instructionsSquareBRX, this.ui.instructionsSquareBRY],
    ]);
  }

  createStartModal() {
    // TODO: disable map input handling
    this.modal = new Modal(this, townMap.modals.start);
    this.modal.draw();
    this.modal.enableInputClose();
    this.modal.setCloseCallback(() => {
      this.modal.disableInputHandling();
      // TODO: enable map input handling
    });
  }

  drawSquares(squareCoords) {
    squareCoords.forEach((s) => {
      this.borderGraphics.fillRect(s[0], s[1], townMap.ui.squareWidth, townMap.ui.squareWidth);
    });
  }
}
