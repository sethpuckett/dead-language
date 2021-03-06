import Phaser from 'phaser';
import { images, titleMenu, screens, depth, lessons } from '../../config';
import titleMenuUiHelper from '../ui/titleMenuUiHelper';
import TitleZombieManager from './TitleZombieManager';
import TitleSpawnManager from './TitleSpawnManager';
import ModalHelper from '../modal/ModalHelper';
import GameProgressManager from '../../data/GameProgressManager';
import AudioManager from '../../audio/AudioManager';
import UserOptionsManager from '../../data/UserOptionsManager';

const START = 'start';
const OPTIONS = 'options';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.titleMenu });
  }

  init() {
    this.zombieManager = new TitleZombieManager(this);
    this.spawnManager = new TitleSpawnManager(this);
    this.progressManager = new GameProgressManager(this.sys.game.db);
    this.modalHelper = new ModalHelper(this);
    this.audioManager = new AudioManager(this);
    this.optionsManager = new UserOptionsManager(this.sys.game);
    this.menuOptions = [];
    this.currentSelection = 0;
    this.selectedOption = '';
    this.inputHandled = false;

    if (!this.sys.game.db.isUserLoggedIn()) {
      this.menuOptions.push({ text: titleMenu.menu.playDemo, key: START });
    } else if (this.progressManager.isNewGame()) {
      this.menuOptions.push({ text: titleMenu.menu.newGame, key: START });
    } else {
      this.menuOptions.push({ text: titleMenu.menu.continueGame, key: START });
    }
    this.menuOptions.push({ text: titleMenu.menu.options, key: OPTIONS });
  }

  create() {
    this.ui = titleMenuUiHelper(this.sys.game.config);
    this.createBackground();
    this.createMenu();
    this.createInstructions();
    this.createAudio();
    this.createLoginPrompt();
    this.updateMenuSelection();
    this.enableInputHandling();
  }

  update(time, delta) {
    const spawn = this.spawnManager.getSpawn(time);
    if (spawn.canSpawn) {
      this.zombieManager.spawnZombie(spawn);
    }
    this.zombieManager.moveZombies(delta);
    this.zombieManager.destroyDeadZombies();
  }

  createLoginPrompt() {
    if (!this.sys.game.db.isUserLoggedIn()) {
      this.loginPointer = this.add.sprite(
        this.ui.loginPointerX,
        this.ui.loginPointerY,
        images.pointingHand,
      );
      this.loginPointer.setOrigin(this.ui.loginPointerOriginX, this.ui.loginPointerOriginY);
      this.loginPointer.setDisplaySize(this.ui.loginPointerWidth, this.ui.loginPointerWidth);
      this.loginPointer.setRotation(titleMenu.loginPointerRotation);

      this.tweens.add({
        targets: this.loginPointer,
        yoyo: true,
        repeat: -1,
        ease: 'Power1',
        duration: titleMenu.loginPointerExpansionDuration,
        displayWidth: this.ui.loginPointerWidth * titleMenu.loginPointerExpansionFactor,
        displayHeight: this.ui.loginPointerWidth * titleMenu.loginPointerExpansionFactor,
      });

      this.loginText = this.add.bitmapText(
        this.ui.loginTextX,
        this.ui.loginTextY,
        this.optionsManager.getSelectedFont(),
        titleMenu.loginText,
        titleMenu.fonts.loginSize
      );
      this.loginText.setOrigin(this.ui.loginTextOriginX, this.ui.loginTextOriginY);
      this.loginText.setDepth(depth.titleMenu.text);
      this.loginText.setTintFill(titleMenu.fonts.loginTint);
      this.loginText.setRightAlign();
    }
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
      'SPACE,ENTER,UP,DOWN,TAB'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  createAudio() {
    this.audioManager.addSound(titleMenu.audio.menuMove);
    this.audioManager.addSound(titleMenu.audio.menuSelect);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.UP.keyCode) {
      this.decrementMenuSelection();
    } else if (e.keyCode === this.keys.DOWN.keyCode) {
      this.incrementMenuSelection();
    } else if (e.keyCode === this.keys.SPACE.keyCode || e.keyCode === this.keys.ENTER.keyCode) {
      this.disableInputHandling();
      this.selectedOption = this.menuOptions[this.currentSelection].key;
      this.audioManager.playSound(titleMenu.audio.menuSelect);
      this.selector.setFrame(1);
      this.cameras.main.fade(titleMenu.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
    }
  }

  decrementMenuSelection() {
    this.currentSelection = Math.max(this.currentSelection - 1, 0);
    this.audioManager.playSound(titleMenu.audio.menuMove);
    this.updateMenuSelection();
  }

  incrementMenuSelection() {
    this.currentSelection = Math.min(this.currentSelection + 1, this.menuOptions.length - 1);
    this.audioManager.playSound(titleMenu.audio.menuMove);
    this.updateMenuSelection();
  }

  updateMenuSelection() {
    this.selector.y = this.ui.selectY + (this.ui.selectVerticalPadding * this.currentSelection);
  }

  fadeCallback(_camera, progress) {
    if (progress === 1) {
      if (this.selectedOption === START) {
        this.startGame();
      } else if (this.selectedOption === OPTIONS) {
        this.scene.start(screens.optionsMenu);
      }
    }
  }

  createInstructions() {
    this.instructionText = this.add.bitmapText(
      this.ui.instructionsX,
      this.ui.instructionsY,
      this.optionsManager.getSelectedFont(),
      titleMenu.instructions,
      titleMenu.fonts.instructionsSize
    );
    this.instructionText.setOrigin(this.ui.instructionsOrigin);
    this.instructionText.setDepth(depth.titleMenu.text);
    this.instructionText.setTintFill(titleMenu.fonts.instructionsTint);
  }

  createMenu() {
    this.menuOptions.forEach((o, i) => {
      const text = this.add.bitmapText(
        this.ui.textX,
        this.ui.textY
          + (this.ui.textVerticalPadding * i)
          + this.optionsManager.getSelectedFontYOffset(),
        this.optionsManager.getSelectedFont(),
        o.text,
        titleMenu.fonts.textSize
      );
      text.setOrigin(this.ui.textOriginX, this.ui.textOriginY);
      text.setDepth(depth.titleMenu.text);
      text.setTintFill(titleMenu.fonts.textTint);
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
  }

  startGame() {
    if (!this.sys.game.db.isUserLoggedIn()) {
      // demo mode
      this.scene.start(screens.minigame, lessons.demo.stage1);
    } else if (this.progressManager.isNewGame()) {
      this.scene.start(screens.story, {
        // TODO: don't hard code the id here
        modalConfig: this.modalHelper.getModalConfig('game-intro'),
        nextScreen: screens.townMap,
      });
    } else {
      this.scene.start(screens.townMap);
    }
  }

  createBackground() {
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
      images.titleScreenBgSky
    );
    this.bgSky.displayWidth = this.ui.backgroundImageWidth;
    this.bgSky.displayHeight = this.ui.backgroundImageHeight;
    this.bgSky.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.bgSky.setDepth(depth.titleMenu.sky);
  }
}
