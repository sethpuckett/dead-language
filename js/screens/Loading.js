import Phaser from 'phaser';
import { loading, debug, screens, images, fonts } from '../config';
import loadingUiHelper from './ui/loadingUiHelper';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Loading' });
  }

  preload() {
    this.showProgressBar();
    this.loadAssets();

    if (debug.slowLoad) {
      this.loadDummyAssets();
    }
  }

  create() {
    this.scene.start(screens.titleMenu);
  }

  showProgressBar() {
    const ui = loadingUiHelper(this.sys.game.config);
    const loadingSprite = this.add.sprite(ui.loadingImageX, ui.loadingImageY, images.loading);
    loadingSprite.setOrigin(ui.loadingImageOrigin, ui.loadingImageOrigin);

    const barBg = this.add.graphics();
    barBg.setPosition(ui.barBackgroundX, ui.barBackgroundY);
    barBg.fillStyle(loading.progressBgColor);
    barBg.fillRect(0, 0, ui.barBackgroundW, ui.barBackgroundH);

    const bar = this.add.graphics();
    bar.setPosition(ui.barX, ui.barY);

    this.load.on('progress', (value) => {
      bar.clear();
      bar.fillStyle(loading.progressFillColor);
      bar.fillRect(0, 0, (ui.barW) * value, ui.barH);
    });
  }

  loadAssets() {
    this.load.bitmapFont(
      fonts.blueSkyWhite, fonts.files.blueSkyWhitePng, fonts.files.blueSkyWhiteFnt
    );
    this.load.bitmapFont(
      fonts.blueSkyBlack, fonts.files.blueSkyBlackPng, fonts.files.blueSkyBlackFnt
    );
    this.load.spritesheet(images.health, images.files.health, {
      frameWidth: 5,
      frameHeight: 20,
      margin: 0,
      spacing: 0,
    });
    this.load.image(images.watch, images.files.watch);
    this.load.image(images.goldCoin, images.files.goldCoin);
    this.load.image(images.skull, images.files.skull);
    this.load.image(images.heart, images.files.heart);
    this.load.image(images.hudItemBorder, images.files.hudItemBorder);
    this.load.image(images.hudMessageBorder, images.files.hudMessageBorder);
    this.load.image(images.start, images.files.start);
    this.load.image(images.return, images.files.return);
    this.load.image(images.grass, images.files.grass);
    this.load.spritesheet(images.greenZombie, images.files.greenZombie, {
      frameWidth: 25,
      frameHeight: 25,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.grayZombie, images.files.grayZombie, {
      frameWidth: 25,
      frameHeight: 25,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.lightGreenZombie, images.files.lightGreenZombie, {
      frameWidth: 25,
      frameHeight: 25,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.redZombie, images.files.redZombie, {
      frameWidth: 25,
      frameHeight: 25,
      margin: 0,
      spacing: 0,
    });
  }

  loadDummyAssets() {
    for (let i = 0; i < 250; i += 1) {
      this.load.image(`test${i}`, images.files.loading);
    }
  }
}
