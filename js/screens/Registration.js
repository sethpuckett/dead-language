import Phaser from 'phaser';
import { images, depth, screens } from '../config';
import registrationUiHelper from './ui/registrationUiHelper';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.registration });
  }

  create() {
    this.ui = registrationUiHelper(this.sys.game.config);
    this.createBackground();
    this.createText();
    this.checkRegistration();
  }

  createBackground() {
    this.background = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.titleScreenBackground
    );
    this.background.displayWidth = this.ui.backgroundImageWidth;
    this.background.displayHeight = this.ui.backgroundImageHeight;
    this.background.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.background.setDepth(depth.story.background);
  }

  createText() {

  }

  checkRegistration() {
    new Promise(res => setTimeout(res, 5000)).then(() => this.sys.game.web.restartGame());
  }
}
