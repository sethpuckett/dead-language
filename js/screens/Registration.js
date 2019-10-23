import Phaser from 'phaser';
import { images, depth, screens, registration } from '../config';
import registrationUiHelper from './ui/registrationUiHelper';
import LogInState from '../data/LoginState';

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
    this.time.addEvent({
      loop: true,
      delay: registration.delayTime,
      callbackScope: this,
      callback: () => {
        this.sys.game.db.loadUserProfile((loginState) => {
          if (loginState !== LogInState.REGISTERING) {
            this.sys.game.web.restartGame();
          }
        }, this);
      },
    });
  }
}
