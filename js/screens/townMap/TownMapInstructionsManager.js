import { fonts, townMap, depth } from '../../config';
import TownMapHelper from './TownMapHelper';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.mapHelper = new TownMapHelper();

    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.lineStyle(townMap.ui.borderWidth, townMap.ui.borderColor);
    this.borderGraphics.fillStyle(townMap.ui.borderColor);
    this.borderGraphics.setDepth(depth.townMap.border);
  }

  initialize() {
    this.drawBorder();
    this.createText();
  }

  drawBorder() {
    this.borderGraphics.strokeRect(
      this.scene.ui.instructionsX,
      this.scene.ui.instructionsY,
      this.scene.ui.instructionsWidth,
      this.scene.ui.instructionsHeight
    );

    this.mapHelper.drawSquares(this.borderGraphics, [
      [this.scene.ui.instructionsSquareTLX, this.scene.ui.instructionsSquareTLY],
      [this.scene.ui.instructionsSquareTRX, this.scene.ui.instructionsSquareTRY],
      [this.scene.ui.instructionsSquareBLX, this.scene.ui.instructionsSquareBLY],
      [this.scene.ui.instructionsSquareBRX, this.scene.ui.instructionsSquareBRY],
    ]);
  }

  createText() {
    this.instructionsText = this.scene.add.bitmapText(
      this.scene.ui.instructionsTextX,
      this.scene.ui.instructionsTextY,
      fonts.blueSkyWhite,
      townMap.statusMessages.instructions,
      townMap.fonts.instructionsSize
    );
    this.instructionsText.setOrigin(
      this.scene.ui.instructionsTextOriginX, this.scene.ui.instructionsTextOriginY
    );
    this.instructionsText.setCenterAlign();
  }
}
