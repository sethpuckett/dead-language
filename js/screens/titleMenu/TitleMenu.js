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
  }

  create() {
    this.ui = titleMenuUiHelper(this.sys.game.config);
    this.showBackground();
    this.showStartText();

    this.input.keyboard.on('keydown', this.startGame, this);
  }

  update(time, delta) {
    const spawn = this.spawnManager.getSpawn(time);
    if (spawn.canSpawn) {
      this.zombieManager.spawnZombie(spawn);
    }
    this.zombieManager.moveZombies(delta);
    this.zombieManager.destroyDeadZombies();
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
      images.titleScreenBgSky
    );
    this.bgSky.displayWidth = this.ui.backgroundImageWidth;
    this.bgSky.displayHeight = this.ui.backgroundImageHeight;
    this.bgSky.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.bgSky.setDepth(depth.titleMenu.sky);
  }

  showStartText() {
    const startText = this.add.bitmapText(
      this.ui.startTextX,
      this.ui.startTextY,
      fonts.blueSkyWhite,
      'PRESS ANY KEY TO START',
      titleMenu.fonts.startTextSize
    );
    startText.setOrigin(this.ui.startTextOrigin);
    startText.setDepth(depth.titleMenu.text);
  }

  startGame() {
    this.scene.start(screens.minigame);
  }
}
