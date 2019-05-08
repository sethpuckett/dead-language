import Phaser from 'phaser';
import { images, titleMenu, fonts, screens, depth } from '../../config';
import titleMenuUiHelper from '../ui/titleMenuUiHelper';
import TitleZombieManager from './TitleZombieManager';
import TitleSpawnManager from './TitleSpawnManager';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleMenu' });
  }

  init() {
    this.zombieManager = new TitleZombieManager(this);
    this.spawnManager = new TitleSpawnManager(this);
    this.menuOptions = [
      { text: 'Start Game', key: 'start' },
      { text: 'Target Practice', key: 'practice' },
    ];
    this.currentSelection = 0;
    this.selectedOption = '';
  }

  create() {
    this.ui = titleMenuUiHelper(this.sys.game.config);
    this.createBackground();
    this.createMenu();
    this.createInput();
    this.updateMenuSelection();
  }

  update(time, delta) {
    const spawn = this.spawnManager.getSpawn(time);
    if (spawn.canSpawn) {
      this.zombieManager.spawnZombie(spawn);
    }
    this.zombieManager.moveZombies(delta);
    this.zombieManager.destroyDeadZombies();
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys(
      'SPACE,ENTER,UP,DOWN,TAB'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.UP.keyCode
        || e.keyCode === this.keys.DOWN.keyCode
        || e.keyCode === this.keys.TAB.keyCode) {
      this.currentSelection = this.currentSelection === 0 ? 1 : 0;
      this.updateMenuSelection();
    } else if (e.keyCode === this.keys.SPACE.keyCode || e.keyCode === this.keys.ENTER.keyCode) {
      this.selectedOption = this.menuOptions[this.currentSelection].key;
      this.selector.setFrame(1);
      this.cameras.main.fade(titleMenu.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
    }
  }

  updateMenuSelection() {
    this.selector.y = this.ui.selectY + (this.ui.selectVerticalPadding * this.currentSelection);
  }

  fadeCallback(_camera, progress) {
    if (progress === 1) {
      if (this.selectedOption === 'start') {
        this.startGame();
      } else if (this.selectedOption === 'practice') {
        this.startPractice();
      }
    }
  }

  createMenu() {
    this.menuOptions.forEach((o, i) => {
      const text = this.add.bitmapText(
        this.ui.textX,
        this.ui.textY + (this.ui.textVerticalPadding * i),
        fonts.blueSkyWhite,
        o.text,
        titleMenu.fonts.textSize
      );
      text.setOrigin(this.ui.textOriginX, this.ui.textOriginY);
      text.setDepth(depth.titleMenu.text);
    });

    this.selector = this.add.sprite(
      this.ui.selectX,
      this.ui.selectY,
      images.shotgun,
      images.frames.shotgunNormal
    );
    this.selector.setScale(images.scales.shotgun);
    this.selector.flipX = true;
    this.selector.setOrigin(this.ui.selectOriginX, this.ui.selectOriginY);
  }

  startGame() {
    this.scene.start(screens.minigame);
  }

  startPractice() {
    this.scene.start(screens.vocabStudy);
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
