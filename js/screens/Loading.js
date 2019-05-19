import Phaser from 'phaser';
import { animations, loading, debug, screens, images, fonts } from '../config';
import loadingUiHelper from './ui/loadingUiHelper';
import { animationHelper } from '../util';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Loading' });
  }

  preload() {
    this.ui = loadingUiHelper(this.sys.game.config);
    this.showBackground();
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

  showBackground() {
    this.background = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.titleScreenBackground
    );
    this.background.displayWidth = this.ui.backgroundImageWidth;
    this.background.displayHeight = this.ui.backgroundImageHeight;
    this.background.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
  }

  showProgressBar() {
    const loadingText = this.add.bitmapText(
      this.ui.loadingTextX,
      this.ui.loadingTextY,
      fonts.blueSkyWhite,
      'LOADING',
      loading.fonts.loadingTextSize
    );
    loadingText.setOrigin(this.ui.loadingTextOrigin);

    const barBg = this.add.graphics();
    barBg.setPosition(this.ui.barBackgroundX, this.ui.barBackgroundY);
    barBg.fillStyle(loading.progressBgColor);
    barBg.fillRect(0, 0, this.ui.barBackgroundW, this.ui.barBackgroundH);

    const bar = this.add.graphics();
    bar.setPosition(this.ui.barX, this.ui.barY);

    this.load.on('progress', (value) => {
      bar.clear();
      bar.fillStyle(loading.progressFillColor);
      bar.fillRect(0, 0, (this.ui.barW) * value, this.ui.barH);
    });
  }

  loadAssets() {
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
    this.load.image(images.grass, images.files.grass);
    this.load.image(images.brick, images.files.brick);
    this.load.image(images.bloodSplatter1, images.files.bloodSplatter1);
    this.load.image(images.bloodSplatter2, images.files.bloodSplatter2);
    this.load.image(images.bloodSplatter3, images.files.bloodSplatter3);
    this.load.image(images.bloodSplatter4, images.files.bloodSplatter4);
    this.load.image(images.bloodSplatter5, images.files.bloodSplatter5);
    this.load.image(images.bloodSplatter6, images.files.bloodSplatter6);
    this.load.image(images.bloodSplatterGreen1, images.files.bloodSplatterGreen1);
    this.load.image(images.bloodSplatterGreen2, images.files.bloodSplatterGreen2);
    this.load.image(images.bloodSplatterGreen3, images.files.bloodSplatterGreen3);
    this.load.image(images.bloodSplatterGreen4, images.files.bloodSplatterGreen4);
    this.load.image(images.bloodSplatterGreen5, images.files.bloodSplatterGreen5);
    this.load.image(images.bloodSplatterGreen6, images.files.bloodSplatterGreen6);
    this.load.image(images.zombieFace, images.files.zombieFace);
    this.load.image(images.titleScreenBgFrontGrass, images.files.titleScreenBgFrontGrass);
    this.load.image(images.titleScreenBgTrees, images.files.titleScreenBgTrees);
    this.load.image(images.titleScreenBgBackGrass, images.files.titleScreenBgBackGrass);
    this.load.image(images.titleScreenBgSky, images.files.titleScreenBgSky);
    this.load.image(images.crate, images.files.crate);
    this.load.image(images.bottle1, images.files.bottle1);
    this.load.image(images.dirtPile, images.files.dirtPile);
    this.load.spritesheet(images.greenZombie, images.files.greenZombie, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.grayZombie, images.files.grayZombie, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.lightGreenZombie, images.files.lightGreenZombie, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.redZombie, images.files.redZombie, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.shotBlast, images.files.shotBlast, {
      frameWidth: images.frameSizes.shotBlast.width,
      frameHeight: images.frameSizes.shotBlast.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.shotBlastGreen, images.files.shotBlastGreen, {
      frameWidth: images.frameSizes.shotBlast.width,
      frameHeight: images.frameSizes.shotBlast.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.shotBlastBottle, images.files.shotBlastBottle, {
      frameWidth: images.frameSizes.shotBlast.width,
      frameHeight: images.frameSizes.shotBlast.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.shotBlastDirt, images.files.shotBlastDirt, {
      frameWidth: images.frameSizes.shotBlast.width,
      frameHeight: images.frameSizes.shotBlast.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.shotgun, images.files.shotgun, {
      frameWidth: images.frameSizes.shotgun.width,
      frameHeight: images.frameSizes.shotgun.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.hudMenuBorder, images.files.hudMenuBorder, {
      frameWidth: images.frameSizes.hudMenuBorder.width,
      frameHeight: images.frameSizes.hudMenuBorder.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.hudItemBorder, images.files.hudItemBorder, {
      frameWidth: images.frameSizes.hudItemBorder.width,
      frameHeight: images.frameSizes.hudItemBorder.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.hudMessageBorder, images.files.hudMessageBorder, {
      frameWidth: images.frameSizes.hudMessageBorder.width,
      frameHeight: images.frameSizes.hudMessageBorder.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.bottle1Explode, images.files.bottle1Explode, {
      frameWidth: images.frameSizes.bottle1Explode.width,
      frameHeight: images.frameSizes.bottle1Explode.height,
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
      frames: this.anims.generateFrameNames(
        images.shotBlast, { frames: animations.frames.shotBlastExplode }
      ),
      frameRate: animations.frameRates.shotBlastExplode,
      repeat: 0,
    });

    this.anims.create({
      key: animations.shotBlastGreenExplode,
      frames: this.anims.generateFrameNames(
        images.shotBlastGreen, { frames: animations.frames.shotBlastGreenExplode }
      ),
      frameRate: animations.frameRates.shotBlastGreenExplode,
      repeat: 0,
    });

    this.anims.create({
      key: animations.shotBlastBottleExplode,
      frames: this.anims.generateFrameNames(
        images.shotBlastBottle, { frames: animations.frames.shotBlastBottleExplode }
      ),
      frameRate: animations.frameRates.shotBlastBottleExplode,
      repeat: 0,
    });

    this.anims.create({
      key: animations.shotBlastDirtExplode,
      frames: this.anims.generateFrameNames(
        images.shotBlastDirt, { frames: animations.frames.shotBlastDirtExplode }
      ),
      frameRate: animations.frameRates.shotBlastDirtExplode,
      repeat: 0,
    });

    this.anims.create({
      key: animations.bottle1Explode,
      frames: this.anims.generateFrameNames(
        images.bottle1Explode, { frames: animations.frames.bottle1Explode }
      ),
      frameRate: animations.frameRates.bottle1Explode,
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
