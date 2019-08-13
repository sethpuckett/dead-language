import Phaser from 'phaser';
import { depth, minigame, images, screens, endgame, gameTypes, unlockableItems } from '../../config';
import VocabWordManager from '../../languageContent/VocabWordManager';
import MinigameZombieManager from './MinigameZombieManager';
import MinigameSpawnManager from './MinigameSpawnManager';
import HudStatusManager from '../HudStatusManager';
import HudManager from '../HudManager';
import Modal from '../modal/Modal';
import GameProgressManager from '../../data/GameProgressManager';
import MinigameItemSpawnManager from './MinigameItemSpawnManager';
import MinigameItemManager from './MinigameItemManager';
import minigameUiHelper from '../ui/minigameUiHelper';
import MinigameItemEffectManager from './MinigameItemEffectManager';
import MinigameMercenaryManager from './MinigameMercenaryManager';
import ModalChecker from '../modal/ModalChecker';
import UnlockableManager from '../../data/UnlockableManager';
import StageParameterManager from '../../gameContent/StageParameterManager';
import ReviewVocabManager from '../../languageContent/ReviewVocabManager';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.minigame });
  }

  init(stageId) {
    this.stageId = stageId;
    this.statusManager = new HudStatusManager(this);
    this.hudManager = new HudManager(this);
    this.progressManager = new GameProgressManager(this.sys.game.db);
    this.vocab = new VocabWordManager(this.getVocab());
    this.itemManager = new MinigameItemManager(this);
    this.itemEffectManager = new MinigameItemEffectManager(this);
    this.mercenaryManager = new MinigameMercenaryManager(this);
    this.modalChecker = new ModalChecker(this, stageId);
    this.unlockableManager = new UnlockableManager(this.sys.game.db);
    this.stageParameterManager = new StageParameterManager();
    this.reviewVocabManager = new ReviewVocabManager(this.sys.game.db);

    this.currentLevel = this.stageParameterManager.getParameters(this.stageId);

    this.zombieManager = new MinigameZombieManager(this, this.currentLevel);
    this.spawnManager = new MinigameSpawnManager(
      this, this.currentLevel, this.vocab, this.reviewVocabManager
    );
    this.itemSpawnManager = new MinigameItemSpawnManager(this, this.currentLevel.items, this.vocab);
    this.ui = minigameUiHelper(this.sys.game.config);

    this.score = 0;
    this.cash = this.currentLevel.startCash;
    this.health = this.currentLevel.startHealth;
    this.weapon = this.currentLevel.weapons.default;
    this.ammo = 0;
    this.maxAmmo = 0;
    this.mercenaryEnabled = this.unlockableManager.isUnlocked(unlockableItems.mercenary)
      && this.currentLevel.mercenaryEnabled;
    this.inputHandled = false;
  }

  create() {
    this.createHud();
    this.createBackground();
    this.createCollisions();
    this.createTimers();
    this.checkStartModal();
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
      releasedWords.forEach((w) => {
        if (w.review) {
          this.reviewVocabManager.releaseWord(w);
        } else {
          this.vocab.releaseWord(w);
        }
      });
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

  createHud() {
    const hudConfig = { ...minigame.ui.hudConfig };
    if (!this.unlockableManager.isUnlocked(unlockableItems.cash)) {
      hudConfig.cash = false;
    }
    this.hudManager.createHud({
      ...hudConfig,
      startHealth: this.currentLevel.startHealth,
      maxHealth: this.currentLevel.maxHealth,
      startCash: this.currentLevel.startCash,
    });
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.hudManager.setWeapon(this.currentLevel.weapons.default, 0);
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

  checkStartModal() {
    this.modalChecker.setBeforeStartCallback(() => {
      this.disableInputHandling();
      this.hudManager.disableInputHandling();
    });

    this.modalChecker.setCompletedCallback(() => {
      this.hudManager.enableInputHandling();
      this.enableInputHandling();
      this.startGame();
    });

    this.modalChecker.checkModal();
  }

  startGame() {
    this.gameTimer.paused = false;
  }

  gameTimerFinish() {
    // destroy zombies so player doesn't take damage before callback fires
    const releasedWords = this.zombieManager.destroyAllZombies();
    releasedWords.forEach(w => this.vocab.releaseWord(w));
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
    const isCorrect = this.zombieManager.checkGuess(guess, this.weapon);
    let shotFired = true;

    // if guess did not match, check mercenary
    let mercKill = false;
    let mercAttempt = false;
    if (!isCorrect && this.mercenaryEnabled) {
      const canAffordMerc = this.cash >= this.currentLevel.mercenaryCost;
      mercAttempt = this.mercenaryManager.checkGuess(guess, canAffordMerc);
      if (mercAttempt) {
        shotFired = false;
        if (canAffordMerc) {
          mercKill = true;
        }
      }
    }

    // if no match & no mercenary, check items
    if (!isCorrect && !mercKill) {
      const itemConfig = this.itemManager.checkGuess(guess);
      if (itemConfig != null) {
        this.itemEffectManager.applyItem(itemConfig.itemType);
        shotFired = false;
      }
    }

    if (isCorrect) {
      this.score += 1;
    }
    this.hudManager.setKillValue(this.score);
    this.hudManager.clearTextEntry();

    if (shotFired) {
      this.updateAmmo(this.ammo - 1);
    }
  }

  getVocab() {
    const stageType = this.progressManager.getStageType(this.stageId);
    if (stageType !== gameTypes.zombieAssaultReview.id) {
      return this.sys.game.db.getStage(this.stageId).vocab;
    }

    const lesson = this.sys.game.db.getLessonForStage(this.stageId);
    const raw = lesson.stages.reduce((a, c) => a.concat(this.sys.game.db.getStage(c).vocab), []);
    return raw.filter(v => v != null);
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

  updateAmmo(newCount) {
    this.ammo = newCount;
    this.hudManager.updateAmmo(this.ammo, this.maxAmmo);
    if (this.ammo <= 0) {
      this.maxAmmo = 0;
      this.weapon = this.currentLevel.weapons.default;
      this.hudManager.setWeapon(this.weapon, 0);
    }
  }
}
