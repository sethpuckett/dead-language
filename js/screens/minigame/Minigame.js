import Phaser from 'phaser';
import vocab from '../../vocab';
import { depth, minigame, images, screens, fonts } from '../../config';
import minigameUiHelper from '../ui/minigameUiHelper';
import VocabWordManager from '../../languageContent/VocabWordManager';
import MinigameZombieManager from './MinigameZombieManager';
import MinigameSpawnManager from './MinigameSpawnManager';
import MinigameStatusManager from './MinigameStatusManager';
import keyboardHelper from '../../util/keyboardHelper';

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
    this.spawnManager = new MinigameSpawnManager(this, minigame.waves, this.vocab);
    this.statusManager = new MinigameStatusManager(this);
    this.score = 0;
    this.health = minigame.startHealth;
  }

  create() {
    this.createUi();
    this.createBackground();
    this.createCollisions();
    this.createInput();
    this.createTimers();

    this.startGame();
  }

  update(_time, delta) {
    this.updateGameTime();
    const spawn = this.spawnManager.getSpawn(this.gameTimer.getElapsedSeconds());
    if (spawn.canSpawn) {
      this.zombieManager.spawnZombie(spawn);
    }
    this.zombieManager.moveZombies(delta);
    const releasedWords = this.zombieManager.destroyDeadZombies();
    releasedWords.forEach(w => this.vocab.releaseWord(w));
    this.changeHealth(this.zombieManager.checkZombieAttack());
    if (this.health <= 0) {
      this.loseGame();
    }
  }

  createUi() {
    const ui = minigameUiHelper(this.sys.game.config);
    this.hudHeight = ui.hudHeight;
    this.hudBufferHeight = ui.hudBufferHeight;

    // HUD
    this.weaponBorder = this.add.sprite(ui.weaponBorderX, ui.weaponBorderY, images.hudItemBorder);
    this.weaponBorder.displayWidth = ui.weaponBorderWidth;
    this.weaponBorder.displayHeight = ui.weaponBorderWidth;
    this.weaponBorder.setOrigin(ui.weaponBorderOriginX, ui.weaponBorderOriginY);
    this.weaponBorder.setDepth(depth.minigame.hud);
    this.itemBorder = this.add.sprite(ui.itemBorderX, ui.itemBorderY, images.hudItemBorder);
    this.itemBorder.displayWidth = ui.itemBorderWidth;
    this.itemBorder.displayHeight = ui.itemBorderWidth;
    this.itemBorder.setOrigin(ui.itemBorderOriginX, ui.itemBorderOriginY);
    this.itemBorder.setDepth(depth.minigame.hud);
    this.healthIcon = this.add.sprite(ui.healthIconX, ui.healthIconY, images.heart);
    this.healthIcon.displayWidth = ui.healthIconWidth;
    this.healthIcon.displayHeight = ui.healthIconWidth;
    this.healthIcon.setOrigin(ui.healthIconOriginX, ui.healthIconOriginY);
    this.healthIcon.setDepth(depth.minigame.hud);
    this.healthBars = [];
    for (let i = 0; i < minigame.maxHealth; i += 1) {
      const prev = i !== 0 ? this.healthBars[i - 1] : this.healthIcon;
      const bar = this.add.sprite(ui.healthValueX(prev), ui.healthValueY, images.health, 0);
      bar.displayWidth = ui.healthValueWidth;
      bar.displayHeight = ui.healthValueHeight;
      bar.setOrigin(ui.healthValueOriginX, ui.healthValueOriginY);
      bar.setDepth(depth.minigame.hud);
      this.healthBars.push(bar);
    }

    this.healthIcon.setOrigin(ui.healthIconOriginX, ui.healthIconOriginY);
    this.healthIcon.setDepth(depth.minigame.hud);
    this.killIcon = this.add.sprite(ui.killIconX, ui.killIconY, images.skull);
    this.killIcon.displayWidth = ui.killIconWidth;
    this.killIcon.displayHeight = ui.killIconWidth;
    this.killIcon.setOrigin(ui.killIconOriginX, ui.killIconOriginY);
    this.killIcon.setDepth(depth.minigame.hud);
    this.killValue = this.add.bitmapText(
      ui.killValueX, ui.killValueY, fonts.blueSkyWhite, '000', minigame.fonts.killSize
    );
    this.killValue.setOrigin(ui.killValueOriginX, ui.killValueOriginY);
    this.killValue.setDepth(depth.minigame.hud);
    this.cashIcon = this.add.sprite(ui.cashIconX, ui.cashIconY, images.goldCoin);
    this.cashIcon.displayWidth = ui.cashIconWidth;
    this.cashIcon.displayHeight = ui.cashIconWidth;
    this.cashIcon.setOrigin(ui.cashIconOriginX, ui.cashIconOriginY);
    this.cashIcon.setDepth(depth.minigame.hud);
    this.cashValue = this.add.bitmapText(
      ui.cashValueX, ui.cashValueY, fonts.blueSkyWhite, '$100', minigame.fonts.cashSize
    );
    this.cashValue.setOrigin(ui.cashValueOriginX, ui.cashValueOriginY);
    this.cashValue.setDepth(depth.minigame.hud);
    this.timerIcon = this.add.sprite(ui.timerIconX, ui.timerIconY, images.watch);
    this.timerIcon.displayWidth = ui.timerIconWidth;
    this.timerIcon.displayHeight = ui.timerIconWidth;
    this.timerIcon.setOrigin(ui.timerIconOriginX, ui.timerIconOriginY);
    this.timerIcon.setDepth(depth.minigame.hud);
    this.timerValue = this.add.bitmapText(
      ui.timerValueX, ui.timerValueY, fonts.blueSkyWhite, '', minigame.fonts.timerSize
    );
    this.timerValue.setOrigin(ui.timerValueOriginX, ui.timerValueOriginY);
    this.timerValue.setDepth(depth.minigame.hud);
    this.messageBorder = this.add.sprite(
      ui.messageBorderX,
      ui.messageBorderY,
      images.hudMessageBorder
    );
    this.messageBorder.displayWidth = ui.messageBorderWidth;
    this.messageBorder.displayHeight = ui.messageBorderHeight;
    this.messageBorder.setOrigin(ui.messageBorderOriginX, ui.messageBorderOriginY);
    this.messageBorder.setDepth(depth.minigame.hud);

    // Text Entry
    this.textEntryGraphics = this.add.graphics({ fillStyle: minigame.ui.textEntryStyle });
    this.textEntryArea = new Phaser.Geom.Rectangle(
      ui.textEntryAreaX, ui.textEntryAreaY, ui.textEntryAreaWidth, ui.textEntryAreaHeight
    );
    this.textEntryGraphics.fillRectShape(this.textEntryArea);
    this.textEntryGraphics.setDepth(depth.minigame.hud);
    this.textEntry = this.add.bitmapText(
      ui.textEntryX, ui.textEntryY, fonts.blueSkyWhite, '', minigame.fonts.textEntrySize
    );
    this.textEntry.setOrigin(ui.textEntryOriginX, ui.textEntryOriginY);
    this.textEntry.setDepth(depth.minigame.entryText);
  }

  createBackground() {
    const ui = minigameUiHelper(this.sys.game.config);

    this.background = this.add.tileSprite(
      0, 0,
      this.sys.game.config.width,
      this.sys.game.config.height - this.hudHeight,
      images.grass,
    );
    this.background.setOrigin(0, 0);
    this.background.setDepth(depth.minigame.background);

    this.brick = this.add.tileSprite(
      ui.brickX, ui.brickY,
      ui.brickWidth, ui.brickHeight,
      images.brick,
    );
    this.brick.setOrigin(0, 0);
    this.brick.setDepth(depth.minigame.wall);
  }

  createCollisions() {
    this.zombieManager.setHitArea(
      new Phaser.Geom.Rectangle(
        0,
        this.sys.game.config.height - this.hudHeight - this.hudBufferHeight,
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
  }

  startGame() {
    this.gameTimer.paused = false;
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.BACKSPACE.keyCode && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1);
    } else if ((keyboardHelper.isLetter(e.keyCode)
                || e.keyCode === this.keys.SPACE.keyCode)
                && this.textEntry.text.length < minigame.maxTextEntry) {
      this.textEntry.text += e.key;
    } else if (e.keyCode === this.keys.ENTER.keyCode) {
      this.submitAnswer();
    }
  }

  gameTimerFinish() {
    this.scene.start(screens.endgame, { kills: this.score });
  }

  changeHealth(amount) {
    if (amount < 0) {
      this.cameraDamageEffect();
      this.statusManager.damageStatus();
    }

    this.health += amount;
    this.health = Math.min(this.health, minigame.maxHealth);

    for (let i = 0; i < minigame.maxHealth; i += 1) {
      if (i < this.health) {
        this.healthBars[i].setFrame(images.frames.healthFull);
      } else {
        this.healthBars[i].setFrame(images.frames.healthEmpty);
      }
    }
  }

  cameraDamageEffect() {
    this.cameras.main.flash(
      minigame.damageFlashDuration,
      minigame.damageFlashColor.red,
      minigame.damageFlashColor.green,
      minigame.damageFlashColor.blue,
      true
    );
    this.cameras.main.shake(minigame.damageShakeDuration, minigame.damageShakeIntensity);
  }

  loseGame() {
    this.scene.start(screens.endgame, { kills: this.score });
  }

  updateGameTime() {
    const remaining = minigame.gameTime - this.gameTimer.getElapsedSeconds();
    this.timerValue.text = remaining.toFixed(1);
  }

  submitAnswer() {
    const points = this.zombieManager.scoreSubmittedAnswer(this.textEntry.text);
    this.score += points;
    this.killValue.text = String(this.score).padStart(3, '0');
    this.textEntry.text = '';
  }
}
