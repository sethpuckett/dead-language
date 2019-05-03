import Phaser from 'phaser';
import vocab from '../../vocab';
import { depth, minigame, levels, images, screens } from '../../config';
import minigameUiHelper from '../ui/minigameUiHelper';
import VocabWordManager from '../../languageContent/VocabWordManager';
import MinigameZombieManager from './MinigameZombieManager';
import MinigameSpawnManager from './MinigameSpawnManager';
import MinigameStatusManager from './MinigameStatusManager';
import MinigameHudManager from './MinigameHudManager';

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
    this.currentLevel = levels.find(l => l.id === 1); // Only 1 level for now
    this.vocab = new VocabWordManager(vocab.words);
    this.zombieManager = new MinigameZombieManager(this, this.vocab);
    this.spawnManager = new MinigameSpawnManager(this, this.currentLevel.waves, this.vocab);
    this.statusManager = new MinigameStatusManager(this);
    this.hudManager = new MinigameHudManager(this);
    this.score = 0;
    this.health = this.currentLevel.startHealth;
  }

  create() {
    this.hudManager.createHud();
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.createBackground();
    this.createCollisions();
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

  createTimers() {
    this.gameTimer = this.time.addEvent({
      delay: this.currentLevel.gameTime * 1000,
      callback: this.gameTimerFinish,
      callbackScope: this,
      paused: true,
    });
  }

  startGame() {
    this.gameTimer.paused = false;
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
    this.health = Math.min(this.health, this.currentLevel.maxHealth);
    this.hudManager.setHealth(this.health);
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
    const remaining = this.currentLevel.gameTime - this.gameTimer.getElapsedSeconds();
    this.hudManager.setGameTime(remaining);
  }

  submitAnswer() {
    const points = this.zombieManager.scoreSubmittedAnswer(this.hudManager.getTextEntry());
    this.score += points;
    this.hudManager.setKillValue(this.score);
    this.hudManager.clearTextEntry();
  }
}
