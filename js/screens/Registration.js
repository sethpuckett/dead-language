import Phaser from 'phaser';
import { images, depth, screens, registration, fonts } from '../config';
import registrationUiHelper from './ui/registrationUiHelper';
import LogInState from '../data/LoginState';
import UserOptionsManager from '../data/UserOptionsManager';

const ELLIPSES_STATES = ['', '.', '..', '...'];

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.registration });
  }

  create() {
    this.ellipsesStateIndex = 0;

    this.optionsManager = new UserOptionsManager(this.sys.game);
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
    this.background.setDepth(depth.registration.background);
  }

  createText() {
    this.loadingLabel = this.add.bitmapText(
      0, // X is calculated below (dynamic due to animated ellipses)
      this.ui.loadingLabelY,
      this.optionsManager.getSelectedFont(),
      registration.loadingText,
      registration.fonts.loadingSize
    );
    const bounds = this.loadingLabel.getTextBounds().global;
    this.loadingLabel.x = this.ui.loadingLabelX - bounds.width / 2;
    this.loadingLabel.setOrigin(this.ui.loadingLabelOriginX, this.ui.loadingLabelOriginY);
    this.loadingLabel.setDepth(depth.registration.text);
    this.loadingLabel.setTintFill(registration.fonts.loadingTint);

    // animated ellipses
    this.time.addEvent({
      loop: true,
      delay: registration.ellipsesDelay,
      callbackScope: this,
      callback: () => {
        this.ellipsesStateIndex += 1;
        if (this.ellipsesStateIndex >= ELLIPSES_STATES.length) {
          this.ellipsesStateIndex = 0;
        }

        this.loadingLabel.text = registration.loadingText
          + ELLIPSES_STATES[this.ellipsesStateIndex];
      },
    });
  }

  checkRegistration() {
    // Keep trying to load user profile until registration is finished; then restart
    this.time.addEvent({
      loop: true,
      delay: registration.reloadTime,
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
