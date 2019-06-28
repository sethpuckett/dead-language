import Phaser from 'phaser';
import { depth, minigame, levels, images, screens, endgame, gameTypes, minigameItems, weapons } from '../../config';
import VocabWordManager from '../../languageContent/VocabWordManager';
import MinigameZombieManager from './MinigameZombieManager';
import MinigameSpawnManager from './MinigameSpawnManager';
import HudStatusManager from '../HudStatusManager';
import HudManager from '../HudManager';
import Modal from '../Modal';
import GameProgressManager from '../../data/GameProgressManager';
import MinigameItemSpawnManager from './MinigameItemSpawnManager';
import MinigameItemManager from './MinigameItemManager';
import minigameUiHelper from '../ui/minigameUiHelper';

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
    this.itemSpawnManager = new MinigameItemSpawnManager(this, this.currentLevel.items, this.vocab);
    this.itemManager = new MinigameItemManager(this);
    this.ui = minigameUiHelper(this.sys.game.config);

    this.score = 0;
    this.cash = this.currentLevel.startCash;
    this.health = this.currentLevel.startHealth;
    this.weapon = this.currentLevel.defaultWeapon;
    this.mercenaryEnabled = this.currentLevel.mercenaryEnabled;
    this.inputHandled = false;
  }

  create() {
    this.hudManager.createHud({
      ...minigame.ui.hudConfig,
      startHealth: this.currentLevel.startHealth,
      maxHealth: this.currentLevel.maxHealth,
      startCash: this.currentLevel.startCash,
    });
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.hudManager.setWeapon(this.currentLevel.defaultWeapon);
    this.createBackground();
    this.createCollisions();
    this.createTimers();
    this.createStartModal();
  }

  update(_time, delta) {
    if (!this.gameTimer.paused) {
      this.updateGameTime();
      const zombieSpawn = this.spawnManager.getSpawn(this.gameTimer.getElapsedSeconds());
      if (zombieSpawn.canSpawn) {
        this.zombieManager.spawnZombie(zombieSpawn);
      }

      const itemSpawn = this.itemSpawnManager.getItemSpawn(this.gameTimer.getElapsedSeconds());
      if (itemSpawn.canSpawn) {
        this.itemManager.spawnItem(itemSpawn);
      }

      this.zombieManager.moveZombies(delta);
      const releasedWords = this.zombieManager.destroyDeadZombies();
      releasedWords.forEach(w => this.vocab.releaseWord(w));
      this.changeHealth(this.zombieManager.checkZombieAttack());
      if (this.health <= 0) {
        this.loseGame();
      }

      const releasedItems = this.itemManager.clearDestroyedItems();
      releasedItems.forEach((i) => {
        this.vocab.releaseWord(i.word);
        this.itemSpawnManager.releaseSlot(i.slotNumber);
      });
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
    this.disableInputHandling();
    this.hudManager.disableInputHandling();
    this.modal = new Modal(this, minigame.modals.start);
    this.modal.draw();
    this.modal.enableInputClose();
    this.modal.setCloseCallback(() => {
      this.modal.disableInputHandling();
      this.hudManager.enableInputHandling();
      this.enableInputHandling();
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
    const guess = this.hudManager.getTextEntry();
    const points = this.zombieManager.scoreSubmittedAnswer(guess, this.weapon);

    let mercKill = false;
    if (points === 0 && this.mercenaryEnabled) {
      mercKill = this.checkMercenary(guess);
    }

    if (points === 0 && !mercKill) {
      const itemConfig = this.itemManager.checkGuess(guess);
      if (itemConfig != null) {
        this.applyItem(itemConfig.itemType);
      }
    }

    this.score += points;
    this.hudManager.setKillValue(this.score);
    this.hudManager.clearTextEntry();
  }

  checkMercenary(guess) {
    let mercKill = false;
    const canUseMercenary = this.cash >= minigame.mercenaryCost;
    const mercenaryAttempt = this.zombieManager.checkMercenary(guess, canUseMercenary);
    // TODO: move all this to a helper method
    if (mercenaryAttempt) {
      if (canUseMercenary) {
        this.statusManager.setStatus({
          image: images.mercenary,
          frame: images.frames.mercenaryStatusShoot,
          message: minigame.statusMessages.useMercenary,
          displayTime: minigame.statusTime,
        });
        this.cash -= minigame.mercenaryCost;
        this.hudManager.setCash(this.cash);
        mercKill = true;
      } else {
        this.statusManager.setStatus({
          image: images.mercenary,
          frame: images.frames.mercenaryStatusRefuse,
          message: minigame.statusMessages.mercenaryUnavailable,
          displayTime: minigame.statusTime,
        });
      }
    }
    return mercKill;
  }

  getVocab() {
    const stageType = this.progressManager.getStageType(this.stageId);
    if (stageType !== gameTypes.zombieAssaultReview.id) {
      return this.sys.game.db.getStage(this.stageId).vocab;
    }

    const lesson = this.sys.game.db.getLessonForStage(this.stageId);
    return lesson.stages.reduce((agg, cur) => agg.concat(this.sys.game.db.getStage(cur).vocab), []);
  }

  enableInputHandling() {
    if (!this.inputHandled) {
      this.inputHandled = true;
      this.createInput();
    }
  }

  disableInputHandling() {
    if (this.inputHandled) {
      this.inputHandled = false;
      this.keys = null;
      this.input.keyboard.off('keydown', this.handleKeyDown);
    }
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys('ESC');
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.ESC.keyCode) {
      this.createQuitModal();
    }
  }

  createQuitModal() {
    this.disableInputHandling();
    this.hudManager.disableInputHandling();
    this.quitModal = new Modal(this, minigame.modals.quit);
    this.quitModal.draw();
    this.quitModal.enableInputClose();
    this.quitModal.setCloseCallback((keyCode) => {
      this.quitModal.disableInputHandling();
      this.hudManager.enableInputHandling();
      this.enableInputHandling();
      if (keyCode === this.keys.ESC.keyCode) {
        this.scene.start(screens.endgame, { status: endgame.lose, stageId: this.stageId });
      }
    });
  }

  applyItem(itemType) {
    switch (itemType) {
      case minigameItems.cash:
        this.cash += this.currentLevel.items.cashAmount;
        this.hudManager.setCash(this.cash);
        this.statusManager.setStatus({
          message: minigame.statusMessages.cashReceived,
          displayTime: minigame.statusTime,
        });
        break;
      case minigameItems.foodTier1:
        this.changeHealth(this.currentLevel.items.foodTier1HealAmount);
        this.statusManager.setStatus({
          message: minigame.statusMessages.foodTier1Received,
          displayTime: minigame.statusTime,
        });
        break;
      case minigameItems.shotgun:
        this.weapon = weapons.shotgun;
        this.hudManager.setWeapon(weapons.shotgun);
        break;
      default:
        throw Error('invalid itemType');
    }
  }
}
