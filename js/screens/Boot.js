import Phaser from 'phaser';
import { images, fonts, screens } from '../config';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.load.bitmapFont(
      fonts.blueSkyWhite, fonts.files.blueSkyWhitePng, fonts.files.blueSkyWhiteFnt
    );
    this.load.bitmapFont(
      fonts.blueSkyBlack, fonts.files.blueSkyBlackPng, fonts.files.blueSkyBlackFnt
    );
    this.load.image(images.titleScreenBackground, images.files.titleScreenBackground);
  }

  create() {
    this.scene.start(screens.loading);
  }
}
