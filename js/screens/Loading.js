import Phaser from 'phaser';
import { animations, loading, debug, screens, images, fonts } from '../config';
import loadingUiHelper from './ui/loadingUiHelper';
import animationHelper from '../util/animationHelper';

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
    this.createAnimations();
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
    this.load.image(images.brick, images.files.brick);
    this.load.image(images.bloodSplatter1, images.files.bloodSplatter1);
    this.load.image(images.bloodSplatter2, images.files.bloodSplatter2);
    this.load.image(images.bloodSplatter3, images.files.bloodSplatter3);
    this.load.image(images.bloodSplatter4, images.files.bloodSplatter4);
    this.load.image(images.bloodSplatter5, images.files.bloodSplatter5);
    this.load.image(images.bloodSplatter6, images.files.bloodSplatter6);
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
    this.load.spritesheet(images.shotBlast, images.files.shotBlast, {
      frameWidth: 32,
      frameHeight: 32,
      margin: 0,
      spacing: 0,
    });
  }

  createAnimations() {
    const im = images;
    const a = animations;
    const af = animations.frames;
    const afr = animations.frameRates;
    const za = animationHelper.zombieAnimation;

    const ims = [im.redZombie, im.grayZombie, im.greenZombie, im.lightGreenZombie];

    ims.forEach((i) => {
      this.zombieAnimation(za(i, a.zombieBounce), i, af.zombieBounce, afr.zombieBounce, true);
      this.zombieAnimation(za(i, a.zombieWalk), i, af.zombieWalk, afr.zombieWalk, true);
      this.zombieAnimation(za(i, a.zombieRun), i, af.zombieRun, afr.zombieRun, true);
      this.zombieAnimation(za(i, a.zombieFall), i, af.zombieFall, afr.zombieFall, false);
      this.zombieAnimation(za(i, a.zombieDamage), i, af.zombieDamage, afr.zombieDamage, false);
      this.zombieAnimation(za(i, a.zombieDie), i, af.zombieDie, afr.zombieDie, false);
      this.zombieAnimation(za(i, a.zombieStun), i, af.zombieStun, afr.zombieStun, true);
      this.zombieAnimation(za(i, a.zombieAttack), i, af.zombieAttack, afr.zombieAttack, false);
    });

    this.anims.create({
      key: animations.shotBlastExplode,
      frames: this.anims.generateFrameNames(images.shotBlast, { frames: animations.frames.shotBlastExplode }),
      frameRate: animations.frameRates.shotBlastExplode,
      repeat: 0,
    });
  }

  zombieAnimation(key, image, frames, frameRate, repeat) {
    this.anims.create({
      key,
      frames: this.anims.generateFrameNames(image, { frames }),
      frameRate,
      repeat: repeat ? -1 : 0,
    });
  }

  loadDummyAssets() {
    for (let i = 0; i < 250; i += 1) {
      this.load.image(`test${i}`, images.files.loading);
    }
  }
}
