import Phaser from 'phaser';
import vocab from '../../vocab';
import { minigame, animations, images, screens, fonts } from '../../config';
import minigameUiHelper from '../ui/minigameUiHelper';
import VocabWordManager from '../../languageContent/VocabWordManager';
import MinigameZombieManager from './MinigameZombieManager';
import keyboardHelper from '../../util/keyboardHelper';
import animationHelper from '../../util/animationHelper'

const SPAWN_PADDING_PERCENT = 10;

// let firestore = firebase.firestore()
// const lessonRef =
//   firestore.collection('lessons').where('name', '==', 'Basic Phrases').get().then((snap) => {
//   snap.forEach(function(doc) {
//     minigame.wordPool = [...doc.data().vocab]
//   })
// });

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Minigame' });
  }

  init() {
    this.vocab = new VocabWordManager(vocab.words);
    this.zombieManager = new MinigameZombieManager(this, this.vocab);
    this.score = 0;
    this.damage = 0;

    this.spawnPadding = this.sys.game.config.width * SPAWN_PADDING_PERCENT / 100;
  }

  create() {
    this.createUi();
    this.createBackground();
    this.createAnimations();
    this.createCollisions();
    this.createInput();
    this.createTimers();

    this.startGame();
  }

  update(_time, delta) {
    this.zombieManager.moveZombies(delta);
    this.updateGameTime();
    this.changeDamage(this.zombieManager.checkZombieAttack());
    this.zombieManager.destroyDeadZombies();
  }

  createUi() {
    const ui = minigameUiHelper(this.sys.game.config);
    this.hudHeight = ui.hudHeight;

    // HUD
    this.weaponBorder = this.add.sprite(ui.weaponContainerX, ui.weaponContainerY, images.hudItemBorder);
    this.weaponBorder.displayWidth = ui.weaponContainerWidth;
    this.weaponBorder.displayHeight = ui.weaponContainerWidth;
    this.weaponBorder.setOrigin(ui.weaponContainerOriginX, ui.weaponContainerOriginY)
    this.itemBorder = this.add.sprite(ui.itemContainerX, ui.itemContainerY, images.hudItemBorder);
    this.itemBorder.displayWidth = ui.itemContainerWidth;
    this.itemBorder.displayHeight = ui.itemContainerWidth;
    this.itemBorder.setOrigin(ui.itemContainerOriginX, ui.itemContainerOriginY);
    this.healthIcon = this.add.sprite(ui.healthIconX, ui.healthIconY, images.heart);
    this.healthIcon.displayWidth = ui.healthIconWidth;
    this.healthIcon.displayHeight = ui.healthIconWidth;

    this.healthValue1 = this.add.sprite(ui.healthValue1X, ui.healthValueY, images.healthFull);
    this.healthValue1.displayWidth = ui.healthValueWidth;
    this.healthValue1.displayHeight = ui.healthValueHeight;
    this.healthValue1.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthValue2 = this.add.sprite(ui.healthValue2X, ui.healthValueY, images.healthFull);
    this.healthValue2.displayWidth = ui.healthValueWidth;
    this.healthValue2.displayHeight = ui.healthValueHeight;
    this.healthValue2.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthValue3 = this.add.sprite(ui.healthValue3X, ui.healthValueY, images.healthFull);
    this.healthValue3.displayWidth = ui.healthValueWidth;
    this.healthValue3.displayHeight = ui.healthValueHeight;
    this.healthValue3.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthValue4 = this.add.sprite(ui.healthValue4X, ui.healthValueY, images.healthFull);
    this.healthValue4.displayWidth = ui.healthValueWidth;
    this.healthValue4.displayHeight = ui.healthValueHeight;
    this.healthValue4.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthValue5 = this.add.sprite(ui.healthValue5X, ui.healthValueY, images.healthFull);
    this.healthValue5.displayWidth = ui.healthValueWidth;
    this.healthValue5.displayHeight = ui.healthValueHeight;
    this.healthValue5.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthValue6 = this.add.sprite(ui.healthValue6X, ui.healthValueY, images.healthFull);
    this.healthValue6.displayWidth = ui.healthValueWidth;
    this.healthValue6.displayHeight = ui.healthValueHeight;
    this.healthValue6.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthValue7 = this.add.sprite(ui.healthValue7X, ui.healthValueY, images.healthFull);
    this.healthValue7.displayWidth = ui.healthValueWidth;
    this.healthValue7.displayHeight = ui.healthValueHeight;
    this.healthValue7.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthValue8 = this.add.sprite(ui.healthValue8X, ui.healthValueY, images.healthFull);
    this.healthValue8.displayWidth = ui.healthValueWidth;
    this.healthValue8.displayHeight = ui.healthValueHeight;
    this.healthValue8.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthValue9 = this.add.sprite(ui.healthValue9X, ui.healthValueY, images.healthEmpty);
    this.healthValue9.displayWidth = ui.healthValueWidth;
    this.healthValue9.displayHeight = ui.healthValueHeight;
    this.healthValue9.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthValue10 = this.add.sprite(ui.healthValue10X, ui.healthValueY, images.healthEmpty);
    this.healthValue10.displayWidth = ui.healthValueWidth;
    this.healthValue10.displayHeight = ui.healthValueHeight;
    this.healthValue10.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);

    this.healthIcon.setOrigin(ui.healthIconOriginX, ui.healthIconOriginY)
    this.killIcon = this.add.sprite(ui.killIconX, ui.killIconY, images.skull);
    this.killIcon.displayWidth = ui.killIconWidth;
    this.killIcon.displayHeight = ui.killIconWidth;
    this.killIcon.setOrigin(ui.killIconOriginX, ui.killIconOriginY)
    this.killValue = this.add.bitmapText(
      ui.killValueX, ui.killValueY, fonts.blueSkyWhite, '000', minigame.fonts.killSize
    );
    this.killValue.setOrigin(ui.killValueOriginX, ui.killValueOriginY);
    this.cashIcon = this.add.sprite(ui.cashIconX, ui.cashIconY, images.goldCoin);
    this.cashIcon.displayWidth = ui.cashIconWidth;
    this.cashIcon.displayHeight = ui.cashIconWidth;
    this.cashIcon.setOrigin(ui.cashIconOriginX, ui.cashIconOriginY)
    this.cashValue = this.add.bitmapText(
      ui.cashValueX, ui.cashValueY, fonts.blueSkyWhite, '$100', minigame.fonts.cashSize
    );
    this.cashValue.setOrigin(ui.cashValueOriginX, ui.cashValueOriginY);
    this.timerIcon = this.add.sprite(ui.timerIconX, ui.timerIconY, images.watch);
    this.timerIcon.displayWidth = ui.timerIconWidth;
    this.timerIcon.displayHeight = ui.timerIconWidth;
    this.timerIcon.setOrigin(ui.timerIconOriginX, ui.timerIconOriginY)
    this.timerValue = this.add.bitmapText(
      ui.timerValueX, ui.timerValueY, fonts.blueSkyWhite, '', minigame.fonts.timerSize
    );
    this.timerValue.setOrigin(ui.timerValueOriginX, ui.timerValueOriginY);
    this.messageBorder = this.add.sprite(ui.messageContainerX, ui.messageContainerY, images.hudMessageBorder);
    this.messageBorder.displayWidth = ui.messageContainerWidth;
    this.messageBorder.displayHeight = ui.messageContainerHeight;
    this.messageBorder.setOrigin(ui.messageContainerOriginX, ui.messageContainerOriginY)

    // Text Entry
    this.textEntry = this.add.text(ui.textEntryX, ui.textEntryY, '', minigame.fonts.entry);
    this.textEntry.setOrigin(ui.textEntryOriginX, ui.textEntryOriginY);

    // Misses
    this.missLabel = this.add.text(ui.missLabelX, ui.missLabelY, 'Misses:', minigame.fonts.label);
    this.missLabel.setOrigin(ui.missOriginX, ui.missOriginY);
    this.missValue = this.add.text(
      ui.missValueX(this.missLabel), ui.missValueY, this.damage, minigame.fonts.value
    );
    this.missValue.setOrigin(ui.missOriginX, ui.missOriginY);




    // Fail Line
    this.lineGraphics = this.add.graphics({ lineStyle: minigame.ui.failLineStyle });
    this.failLine = new Phaser.Geom.Line(
      0,
      this.sys.game.config.height - ui.hudHeight,
      this.sys.game.config.width,
      this.sys.game.config.height - ui.hudHeight
    );
    this.lineGraphics.strokeLineShape(this.failLine);
  }

  createBackground() {
    this.background = this.add.tileSprite(
      0, 0,
      this.sys.game.config.width,
      this.sys.game.config.height - this.hudHeight,
      'grass'
    );
    this.background.setOrigin(0, 0);
    this.background.setDepth(-1);
  }

  zombieAnimation(key, image, frames, frameRate, repeat) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNames(image, { frames: frames }),
      frameRate: frameRate,
      repeat: repeat ? -1 : 0
    })
  }

  createAnimations() {
    const im = images;
    const a = animations;
    const af = animations.frames;
    const afr = animations.frameRates;
    const za = animationHelper.zombieAnimation

    var ims = [im.redZombie, im.grayZombie, im.greenZombie, im.lightGreenZombie];

    ims.forEach( i => {
      // TODO: add a reusable function to generate these keys, use here & zombie manager
      this.zombieAnimation(za(i, a.zombieBounce), i, af.zombieBounce, afr.zombieBounce, true);
      this.zombieAnimation(za(i, a.zombieWalk), i, af.zombieWalk, afr.zombieWalk, true);
      this.zombieAnimation(za(i, a.zombieRun), i, af.zombieRun, afr.zombieRun, true);
      this.zombieAnimation(za(i, a.zombieFall), i, af.zombieFall, afr.zombieFall, false);
      this.zombieAnimation(za(i, a.zombieDamage), i, af.zombieDamage, afr.zombieDamage, false);
      this.zombieAnimation(za(i, a.zombieStun), i, af.zombieStun, afr.zombieStun, true);
      this.zombieAnimation(za(i, a.zombieAttack), i, af.zombieAttack, afr.zombieAttack, true);
    });
  }

  createCollisions() {
    this.zombieManager.setHitArea(
      new Phaser.Geom.Rectangle(
        0,
        this.sys.game.config.height - this.hudHeight,
        this.sys.game.config.width,
        this.hudHeight
      )
    );
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys(
      'SPACE,BACKSPACE, ENTER, A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  createTimers() {
    this.gameTimer = this.time.addEvent({
      delay: minigame.gameTime * 1000,
      callback: this.gameTimerFinish,
      callbackScope: this,
      paused: true,
    });

    this.spawnTimer = this.time.addEvent({
      delay: this.getSpawnDelay(),
      callback: this.spawnZombie,
      callbackScope: this,
      paused: true,
    });
  }

  startGame() {
    this.gameTimer.paused = false;
    this.spawnTimer.paused = false;
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.BACKSPACE.keyCode && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1);
    } else if (keyboardHelper.isLetter(e.keyCode) || e.keyCode === this.keys.SPACE.keyCode) {
      this.textEntry.text += e.key;
    } else if (e.keyCode === this.keys.ENTER.keyCode) {
      this.submitAnswer();
    }
  }

  gameTimerFinish() {
    this.scene.start(screens.endgame, { kills: this.score, misses: this.damage });
  }

  changeDamage(amount) {
    this.damage += amount;
    this.missValue.text = this.damage;
  }

  updateGameTime() {
    const remaining = minigame.gameTime - this.gameTimer.getElapsedSeconds();
    this.timerValue.text = remaining.toFixed(1);
  }

  activateSpawnTimer() {
    this.spawnTimer.reset({
      delay: this.getSpawnDelay(),
      callback: this.spawnZombie,
      callbackScope: this,
      repeat: 1,
    });
  }

  getSpawnLocation() {
    return Phaser.Math.RND.between(
      this.spawnPadding, this.sys.game.config.width - this.spawnPadding
    );
  }

  getSpawnDelay() {
    const wave = this.getCurrentWave();
    let percentToMax = 1;
    let easedPercent = 1;
    const curTime = this.gameTimer.getElapsedSeconds();
    if (curTime < wave.maxStart) {
      percentToMax = (curTime - wave.start) / (wave.maxStart - wave.start);
      easedPercent = Phaser.Math.Easing.Cubic.InOut(percentToMax);
    } else if (curTime > wave.maxEnd) {
      percentToMax = (curTime - wave.maxEnd) / (wave.end - wave.maxEnd);
      easedPercent = 1 - Phaser.Math.Easing.Cubic.InOut(percentToMax);
    }

    const delay = 1000 * (1 - easedPercent);

    return delay + wave.baseSpawnRate + Phaser.Math.RND.between(
      -wave.spawnRange, wave.spawnRange
    );
  }

  getCurrentWave() {
    const { waves } = minigame;
    const curTime = this.gameTimer.getElapsedSeconds();
    return waves.find(el => el.start <= curTime && el.end > curTime);
  }

  getFallSpeed() {
    return (minigame.baseFallSpeed + Phaser.Math.RND.between(
      -minigame.fallRange, minigame.fallRange
    ));
  }

  spawnZombie() {
    const spawnX = this.getSpawnLocation();
    const speed = this.getFallSpeed();
    this.zombieManager.spawnZombie(spawnX, speed);

    // TODO: Wrap spawning in a higher level process. Starting timer should not be here.
    this.activateSpawnTimer();
  }

  submitAnswer() {
    const points = this.zombieManager.checkSubmittedAnswer(this.textEntry.text);
    this.score += points;
    this.killValue.text = String(this.score).padStart(3, '0');
    this.textEntry.text = '';
  }
}
