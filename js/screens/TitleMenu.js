import Phaser from 'phaser';
import { images, titleMenu, fonts, screens } from '../config';
import titleMenuUiHelper from './ui/titleMenuUiHelper';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleMenu' });
  }

  create() {
    this.ui = titleMenuUiHelper(this.sys.game.config);
    this.showBackground();
    this.showStartText();

    this.input.keyboard.on('keydown', this.startGame, this);
  }

  showBackground() {
    this.background = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.titleScreenBackground
    );
    this.background.displayWidth = this.ui.backgroundImageWidth;
    this.background.displayHeight = this.ui.backgroundImageHeight;
    this.background.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
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
  }

  startGame() {
    this.scene.start(screens.minigame);
  }
}
