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

    this.load.image(images.titleScreenBgFrontGrass, images.files.titleScreenBgFrontGrass);
    this.load.image(images.titleScreenBgTrees, images.files.titleScreenBgTrees);
    this.load.image(images.titleScreenBgBackGrass, images.files.titleScreenBgBackGrass);
    this.load.image(images.titleScreenBgSky, images.files.titleScreenBgSky);
  }

  create() {
    this.scene.start(screens.loading);
  }
}
