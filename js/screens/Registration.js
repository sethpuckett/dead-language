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
  }

  createBackground() {
    this.background = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.storyScreenBackground
    );
    this.background.displayWidth = this.ui.backgroundImageWidth;
    this.background.displayHeight = this.ui.backgroundImageHeight;
    this.background.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.background.setDepth(depth.story.background);
  }
}
