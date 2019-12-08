import Phaser from 'phaser';
import { endgame, screens, images, depth, gameTypes } from '../../config';
import endgameUiHelper from '../ui/endgameUiHelper';
import ModalChecker from '../modal/ModalChecker';
import GameProgressManager from '../../data/GameProgressManager';
import AudioManager from '../../audio/AudioManager';
import UserOptionsManager from '../../data/UserOptionsManager';
import EndgameStatManager from './EndgameStatManager';
import EndgameZombieManager from './EndgameZombieManager';
import EndgameSpawnManager from './EndgameSpawnManager';
import EndgameDeadZombieManager from './EndgameDeadZombieManager';

const MAP = 'map';
const REDO = 'redo';
const PRACTICE = 'practice';
const TITLE = 'title';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.endgame });
  }

  /*
    params: {
      stageId
      status
      zombiesKilled
      hitsTaken
      cashCollected
      foodEaten
      mercenaryKills
      shotsFired
      shotsHit
      grade
    }
  */
  init(params) {
    this.progressManager = new GameProgressManager(this.sys.game.db);
    this.optionsManager = new UserOptionsManager(this.sys.game);
    this.statManager = new EndgameStatManager(this, params);
    this.zombieManager = new EndgameZombieManager(this);
    this.spawnManager = new EndgameSpawnManager(this);
    this.deadZombieManager = new EndgameDeadZombieManager(this);
    this.params = params;
    this.currentSelection = 0;
    this.inputHandled = false;
    this.won = this.params.status === endgame.win;
    this.stageId = this.params.stageId;

    if (this.sys.game.db.isUserLoggedIn()) {
      this.winOptions = [{ text: endgame.menu.returnToMap, key: MAP }];
      this.loseOptions = [
        { text: endgame.menu.tryAgain, key: REDO }, { text: endgame.menu.returnToMap, key: MAP },
      ];
      if (this.allowTargetPractice()) {
        this.loseOptions.push({ text: endgame.menu.targetPractice, key: PRACTICE });
      }
    } else {
      this.winOptions = [{ text: endgame.menu.returnToTitle, key: TITLE }];
      this.loseOptions = [{ text: endgame.menu.returnToTitle, key: TITLE }];
    }

    this.ModalChecker = new ModalChecker(this, this.stageId, this.won);
    this.audioManager = new AudioManager(this);
  }

  create() {
    this.ui = endgameUiHelper(this.sys.game.config);
    this.showBackground();
    this.showStatus();
    this.statManager.drawStats();
    this.createMenu();
    this.createAudio();
    this.enableInputHandling();
    this.updateMenuSelection();
    if (this.won) {
      this.deadZombieManager.spawnZombies();
    }

    this.audioManager.playMusic();
    this.checkStartModal();
  }

  update(time, delta) {
    if (!this.won) {
      const spawn = this.spawnManager.getSpawn(time);
      if (spawn.canSpawn) {
        this.zombieManager.spawnZombie(spawn);
      }
      this.zombieManager.moveZombies(delta);
      this.zombieManager.destroyDeadZombies();
    }
  }

  showBackground() {
    this.bgFrontGrass = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.titleScreenBgFrontGrass
    );
    this.bgFrontGrass.displayWidth = this.ui.backgroundImageWidth;
    this.bgFrontGrass.displayHeight = this.ui.backgroundImageHeight;
    this.bgFrontGrass.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.bgFrontGrass.setDepth(depth.titleMenu.frontGrass);

    this.bgTrees = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.titleScreenBgTrees
    );
    this.bgTrees.displayWidth = this.ui.backgroundImageWidth;
    this.bgTrees.displayHeight = this.ui.backgroundImageHeight;
    this.bgTrees.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.bgTrees.setDepth(depth.titleMenu.trees);

    this.bgBackGrass = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.titleScreenBgBackGrass
    );
    this.bgBackGrass.displayWidth = this.ui.backgroundImageWidth;
    this.bgBackGrass.displayHeight = this.ui.backgroundImageHeight;
    this.bgBackGrass.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.bgBackGrass.setDepth(depth.titleMenu.backGrass);

    this.bgSky = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.endgameScreenBgSky
    );
    this.bgSky.displayWidth = this.ui.backgroundImageWidth;
    this.bgSky.displayHeight = this.ui.backgroundImageHeight;
    this.bgSky.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.bgSky.setDepth(depth.titleMenu.sky);
  }

  showStatus() {
    const statusText = this.params.status === endgame.win ? endgame.winText : endgame.loseText;
    const statusLabel = this.add.bitmapText(
      this.ui.statusLabelX,
      this.ui.statusLabelY,
      this.optionsManager.getSelectedFont(),
      statusText,
      endgame.fonts.statusSize,
    );
    statusLabel.setOrigin(this.ui.statusLabelOrigin);
    statusLabel.setDepth(depth.endgame.text);
    statusLabel.setTintFill(endgame.fonts.statusTint);
  }

  createAudio() {
    if (this.won) {
      this.audioManager.setMusic(endgame.audio.music.winMusic, endgame.audio.musicConfig.winMusic);
    } else {
      this.audioManager.setMusic(
        endgame.audio.music.loseMusic, endgame.audio.musicConfig.loseMusic
      );
    }

    this.audioManager.addAllSounds(endgame.audio.soundEffects);
  }

  createMenu() {
    this.options = this.params.status === endgame.win ? this.winOptions : this.loseOptions;

    this.options.forEach((o, i) => {
      const text = this.add.bitmapText(
        this.ui.menuTextX,
        this.ui.menuTextY
          + (this.ui.menuTextVerticalPadding * i)
          + this.optionsManager.getSelectedFontYOffset(),
        this.optionsManager.getSelectedFont(),
        o.text,
        endgame.fonts.menuSize,
      );
      text.setOrigin(this.ui.menuTextOriginX, this.ui.menuTextOriginY);
      text.setDepth(depth.endgame.text);
      text.setTintFill(endgame.fonts.menuTint);
    });

    this.selector = this.add.sprite(
      this.ui.selectX,
      this.ui.selectY,
      images.shotgun,
      images.frames.shotgunNormal
    );
    this.selector.displayWidth = this.ui.selectWidth;
    this.selector.displayHeight = this.ui.selectHeight;
    this.selector.flipX = true;
    this.selector.setOrigin(this.ui.selectOriginX, this.ui.selectOriginY);
    this.selector.setDepth(depth.endgame.selector);
  }

  checkStartModal() {
    this.ModalChecker.setBeforeStartCallback(() => {
      this.disableInputHandling();
    });

    this.ModalChecker.setCompletedCallback(() => {
      this.enableInputHandling();
    });

    this.ModalChecker.checkModal();
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
    this.keys = this.input.keyboard.addKeys(
      'SPACE,ENTER,UP,DOWN'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.UP.keyCode) {
      this.decrementMenuSelection();
    } else if (e.keyCode === this.keys.DOWN.keyCode) {
      this.incrementMenuSelection();
    } else if (e.keyCode === this.keys.SPACE.keyCode || e.keyCode === this.keys.ENTER.keyCode) {
      this.disableInputHandling();
      this.audioManager.playSound(endgame.audio.soundEffects.menuSelect);
      this.selectedOption = this.options[this.currentSelection].key;
      this.selector.setFrame(1);
      this.cameras.main.fade(endgame.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
    }
  }

  decrementMenuSelection() {
    this.audioManager.playSound(endgame.audio.soundEffects.menuMove);
    this.currentSelection = Math.max(this.currentSelection - 1, 0);
    this.updateMenuSelection();
  }

  incrementMenuSelection() {
    this.audioManager.playSound(endgame.audio.soundEffects.menuMove);
    this.currentSelection = Math.min(this.currentSelection + 1, this.options.length - 1);
    this.updateMenuSelection();
  }

  updateMenuSelection() {
    this.selector.y = this.ui.selectY + (this.ui.selectVerticalPadding * this.currentSelection);
  }

  fadeCallback(_camera, progress) {
    this.audioManager.setMusicVolume(1 - progress);
    if (progress === 1) {
      this.audioManager.stopMusic();
      if (this.selectedOption === MAP) {
        this.scene.start(screens.townMap);
      } else if (this.selectedOption === PRACTICE) {
        this.scene.start(screens.vocabStudy, this.params.stageId);
      } else if (this.selectedOption === REDO) {
        this.scene.start(screens.minigame, this.params.stageId);
      } else if (this.selectedOption === TITLE) {
        this.scene.start(screens.titleMenu);
      }
    }
  }

  allowTargetPractice() {
    return this.progressManager.getStageType(this.stageId) === gameTypes.zombieAssault;
  }
}
