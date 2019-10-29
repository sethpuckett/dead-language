import Phaser from 'phaser';
import { animations, loading, debug, screens, images, fonts, audio } from '../config';
import loadingUiHelper from './ui/loadingUiHelper';
import { animationHelper } from '../util';
import UserOptionsManager from '../data/UserOptionsManager';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.loading });
  }

  preload() {
    this.optionsManager = new UserOptionsManager(this.sys.game);
    this.sys.game.db.loadLessons(this.tryStart, this);
    this.sys.game.db.loadStages(this.tryStart, this);
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
    this.sys.game.fullyLoaded = true;
    this.tryStart();
  }

  tryStart() {
    if (this.sys.game.fullyLoaded && this.sys.game.db.isFullyLoaded()) {
      this.scene.start(screens.titleMenu);
    }
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
      this.optionsManager.getSelectedFont(),
      'LOADING',
      loading.fonts.loadingTextSize,
    );
    loadingText.setOrigin(this.ui.loadingTextOrigin);
    loadingText.setTintFill(loading.fonts.loadingTextTint);

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

    this.load.audio(audio.music.carousingEveryNight, audio.music.files.carousingEveryNight);
    this.load.audio(audio.music.inTheBackPocket, audio.music.files.inTheBackPocket);
    this.load.audio(audio.music.catchTheMystery, audio.music.files.catchTheMystery);
    this.load.audio(audio.music.inEarlyTime, audio.music.files.inEarlyTime);
    this.load.audio(audio.music.zombieAssaultIntro, audio.music.files.zombieAssaultIntro);
    this.load.audio(audio.music.zombieAssaultLoop, audio.music.files.zombieAssaultLoop);
    this.load.audio(
      audio.music.zombieAssaultReviewIntro, audio.music.files.zombieAssaultReviewIntro
    );
    this.load.audio(audio.music.zombieAssaultReviewLoop, audio.music.files.zombieAssaultReviewLoop);
    this.load.audio(audio.music.cheerfulPiano, audio.music.files.cheerfulPiano);
    this.load.audio(audio.music.outOfMyDreams, audio.music.files.outOfMyDreams);
    this.load.audio(audio.music.theLameDuck, audio.music.files.theLameDuck);

    this.load.audio(audio.menuMove, audio.files.menuMove);
    this.load.audio(audio.menuSelectShoot, audio.files.menuSelectShoot);
    this.load.audio(audio.menuSelectWave, audio.files.menuSelectWave);
    this.load.audio(audio.menuBackout, audio.files.menuBackout);
    this.load.audio(audio.buzz, audio.files.buzz);
    this.load.audio(audio.click, audio.files.click);
    this.load.audio(audio.thud, audio.files.thud);
    this.load.audio(audio.glassBreak, audio.files.glassBreak);
    this.load.audio(audio.hitPistol, audio.files.hitPistol);
    this.load.audio(audio.hitShotgun, audio.files.hitShotgun);
    this.load.audio(audio.itemGet, audio.files.itemGet);
    this.load.audio(audio.itemSpawn, audio.files.itemSpawn);
    this.load.audio(audio.zombieAttack, audio.files.zombieAttack);
    this.load.audio(audio.mercHit, audio.files.mercHit);
    this.load.audio(audio.shotMiss, audio.files.shotMiss);
    this.load.audio(audio.outOfAmmo, audio.files.outOfAmmo);

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
    this.load.image(images.cash, images.files.cash);
    this.load.image(images.storyScreenBackground, images.files.storyScreenBackground);
    this.load.image(images.pointingHand, images.files.pointingHand);
    this.load.spritesheet(images.zombieNormal1, images.files.zombieNormal1, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.zombieNormal2, images.files.zombieNormal2, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.zombieNormal3, images.files.zombieNormal3, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.zombieNormal4, images.files.zombieNormal4, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.zombieNormal5, images.files.zombieNormal5, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.zombieNormal6, images.files.zombieNormal6, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.zombieSpecial1, images.files.zombieSpecial1, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.zombieSpecial2, images.files.zombieSpecial2, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.zombieReview1, images.files.zombieReview1, {
      frameWidth: images.frameSizes.zombie.width,
      frameHeight: images.frameSizes.zombie.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.zombieReview2, images.files.zombieReview2, {
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
    this.load.spritesheet(images.shotgunBlast, images.files.shotgunBlast, {
      frameWidth: images.frameSizes.shotgunBlast.width,
      frameHeight: images.frameSizes.shotgunBlast.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.shotBlastGreen, images.files.shotBlastGreen, {
      frameWidth: images.frameSizes.shotBlast.width,
      frameHeight: images.frameSizes.shotBlast.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.shotgunBlastGreen, images.files.shotgunBlastGreen, {
      frameWidth: images.frameSizes.shotgunBlast.width,
      frameHeight: images.frameSizes.shotgunBlast.height,
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
    this.load.spritesheet(images.yellowBubble, images.files.yellowBubble, {
      frameWidth: images.frameSizes.yellowBubble.width,
      frameHeight: images.frameSizes.yellowBubble.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.colorSquare, images.files.colorSquare, {
      frameWidth: images.frameSizes.colorSquare.width,
      frameHeight: images.frameSizes.colorSquare.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.mercenary, images.files.mercenary, {
      frameWidth: images.frameSizes.mercenary.width,
      frameHeight: images.frameSizes.mercenary.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.weapon, images.files.weapon, {
      frameWidth: images.frameSizes.weapon.width,
      frameHeight: images.frameSizes.weapon.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.popWhite, images.files.popWhite, {
      frameWidth: images.frameSizes.popWhite.width,
      frameHeight: images.frameSizes.popWhite.height,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet(images.foodTier1, images.files.foodTier1, {
      frameWidth: images.frameSizes.foodTier1.width,
      frameHeight: images.frameSizes.foodTier1.height,
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

    const ims = [
      im.zombieNormal1, im.zombieNormal2, im.zombieNormal3, im.zombieNormal4, im.zombieNormal5,
      im.zombieNormal6, im.zombieSpecial1, im.zombieSpecial2, im.zombieReview1, im.zombieReview2,
    ];

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
      key: animations.shotgunBlastExplode,
      frames: this.anims.generateFrameNames(
        images.shotgunBlast, { frames: animations.frames.shotgunBlastExplode }
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
      key: animations.shotgunBlastGreenExplode,
      frames: this.anims.generateFrameNames(
        images.shotgunBlastGreen, { frames: animations.frames.shotgunBlastGreenExplode }
      ),
      frameRate: animations.frameRates.shotBlastExplode,
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

    this.anims.create({
      key: animations.popWhitePop,
      frames: this.anims.generateFrameNames(
        images.popWhite, { frames: animations.frames.popWhitePop }
      ),
      frameRate: animations.frameRates.popWhitePop,
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
