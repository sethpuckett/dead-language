import Phaser from 'phaser';
import { depth, minigame, levels, images, screens, endgame, gameTypes } from '../../config';
import VocabWordManager from '../../languageContent/VocabWordManager';
import MinigameZombieManager from './MinigameZombieManager';
import MinigameSpawnManager from './MinigameSpawnManager';
import HudStatusManager from '../HudStatusManager';
import HudManager from '../HudManager';
import Modal from '../Modal';
import GameProgressManager from '../../data/GameProgressManager';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Minigame' });
  }

  init(stageId) {
    this.stageId = stageId;
    this.currentLevel = levels.find(l => l.id === 1); // Only 1 level for now
    this.statusManager = new HudStatusManager(this);
    this.hudManager = new HudManager(this);
    this.progressManager = new GameProgressManager(this.sys.game.db);
    this.vocab = new VocabWordManager(this.getVocab());
    this.zombieManager = new MinigameZombieManager(this, this.vocab);
    this.spawnManager = new MinigameSpawnManager(this, this.currentLevel.waves, this.vocab);

    this.score = 0;
    this.health = this.currentLevel.startHealth;
  }

  create() {
    this.hudManager.createHud({
      ...minigame.ui.hudConfig,
      startHealth: this.currentLevel.startHealth,
      maxHealth: this.currentLevel.maxHealth,
    });
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.createBackground();
    this.createCollisions();
    this.createTimers();
    this.createStartModal();
  }

  update(_time, delta) {
    if (!this.gameTimer.paused) {
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
  }

  createBackground() {
    this.background = this.add.tileSprite(
      0, 0,
      this.sys.game.config.width,
      this.sys.game.config.height - this.hudManager.getHudHeight(),
      images.grass,
    );
    this.background.setOrigin(0, 0);
    this.background.setDepth(depth.minigame.background);
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

  createStartModal() {
    this.hudManager.disableInputHandling();
    this.modal = new Modal(this, minigame.modals.start);
    this.modal.draw();
    this.modal.enableInputClose();
    this.modal.setCloseCallback(() => {
      this.modal.disableInputHandling();
      this.hudManager.enableInputHandling();
      this.startGame();
    });
  }

  startGame() {
    this.gameTimer.paused = false;
  }

  gameTimerFinish() {
    this.progressManager.saveStageCompleted(this.stageId, () => {
      this.scene.start(screens.endgame, { status: endgame.win, stageId: this.stageId });
    });
  }

  changeHealth(amount) {
    if (amount < 0) {
      this.cameraDamageEffect();
      this.statusManager.setStatus({
        image: images.zombieFace,
        message: minigame.statusMessages.damage,
        displayTime: minigame.statusTime,
      });
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
    this.scene.start(screens.endgame, { status: endgame.lose, stageId: this.stageId });
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

  getVocab() {
    const stageType = this.progressManager.getStageType(this.stageId);
    if (stageType !== gameTypes.zombieAssaultReview.id) {
      return this.sys.game.db.getStage(this.stageId).vocab;
    }

    const lesson = this.sys.game.db.getLessonForStage(this.stageId);
    return lesson.stages.reduce((agg, cur) => agg.concat(this.sys.game.db.getStage(cur).vocab), []);
  }
}
