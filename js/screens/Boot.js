import Phaser from 'phaser';
import { images, fonts, screens } from '../config';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.boot });
  }

  preload() {
    this.load.bitmapFont(
      fonts.blueSkyWhite, fonts.files.blueSkyWhitePng, fonts.files.blueSkyWhiteFnt
    );

    this.load.image(images.titleScreenBackground, images.files.titleScreenBackground);
  }

  create() {
    this.scene.start(screens.loading);
  }
}
