import { fonts } from '../../config';
import TownMapHelper from './TownMapHelper';

export default class {
  constructor(scene, borderGraphics) {
    this.scene = scene;
    this.borderGraphics = borderGraphics;
    this.mapHelper = new TownMapHelper();
  }

  drawBorder() {
    this.borderGraphics.strokeRect(
      this.scene.ui.mapX, this.scene.ui.mapY, this.scene.ui.mapWidth, this.scene.ui.mapHeight
    );
    this.mapHelper.drawSquares(this.borderGraphics, [
      [this.scene.ui.mapSquareTLX, this.scene.ui.mapSquareTLY],
      [this.scene.ui.mapSquareTRX, this.scene.ui.mapSquareTRY],
      [this.scene.ui.mapSquareBLX, this.scene.ui.mapSquareBLY],
      [this.scene.ui.mapSquareBRX, this.scene.ui.mapSquareBRY],
    ]);

    this.mapText = this.scene.add.bitmapText(
      this.scene.ui.mapX + this.scene.ui.mapWidth / 2,
      this.scene.ui.mapY + this.scene.ui.mapHeight / 2,
      fonts.blueSkyWhite,
      'TODO: ADD MAP',
      18
    );
    this.mapText.setOrigin(0.5);
  }
}
