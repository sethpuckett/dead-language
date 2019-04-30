import Phaser from 'phaser';
import vocab from '../../vocab';
import { depth, minigame, images, screens } from '../../config';
import minigameUiHelper from '../ui/minigameUiHelper';
import VocabWordManager from '../../languageContent/VocabWordManager';
import MinigameZombieManager from './MinigameZombieManager';
import MinigameSpawnManager from './MinigameSpawnManager';
import MinigameStatusManager from './MinigameStatusManager';
import MinigameHudManager from './MinigameHudManager';
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
    this.hudManager = new MinigameHudManager(this);
    this.score = 0;
    this.health = minigame.startHealth;
  }

  create() {
    this.hudManager.createHud();
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

  createBackground() {
    const ui = minigameUiHelper(this.sys.game.config);

    this.background = this.add.tileSprite(
      0, 0,
      this.sys.game.config.width,
      this.sys.game.config.height - this.hudManager.getHudHeight(),
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
        this.sys.game.config.height
          - this.hudManager.getHudHeight()
          - this.hudManager.getHudBufferHeight(),
        this.sys.game.config.width,
        this.hudManager.getHudHeight()
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
