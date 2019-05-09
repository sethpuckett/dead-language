import hudUiHelper from './ui/hudUiHelper';
import { hud, fonts } from '../config';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.ui = hudUiHelper(this.scene.sys.game.config);
  }

  /*
  config: {
    image: string,
    message: string or [string],
    displayTime: int
  }
  */
  setStatus(config) {
    this.clearCurrentStatus();

    if (config.image != null) {
      this.scene.statusImage = this.scene.add.sprite(
        this.ui.statusImageX,
        this.ui.statusImageY,
        config.image
      );
      this.scene.statusImage.displayWidth = this.ui.statusImageWidth;
      this.scene.statusImage.displayHeight = this.ui.statusImageHeight;
      this.scene.statusImage.setOrigin(this.ui.statusImageOriginX, this.ui.statusImageOriginY);
    }

    if (config.message != null) {
      const x = config.image != null ? this.ui.statusMessageX : this.ui.statusMessageNoImageX;
      const y = config.image != null ? this.ui.statusMessageY : this.ui.statusMessageNoImageY;
      const maxWidth = config.image != null
        ? this.ui.statusMessageMaxWidth : this.ui.statusMessageNoImageMaxWidth;

      this.scene.statusText = this.scene.add.bitmapText(
        x, y, fonts.blueSkyWhite, config.message, hud.fonts.statusSize
      );
      if (this.scene.statusText.width > maxWidth) {
        this.scene.statusText.destroy();
        this.scene.statusText = this.scene.add.bitmapText(
          x, y, fonts.blueSkyWhite, config.message, hud.fonts.statusSizeSmall
        );
      }
      this.scene.statusText.setOrigin(this.ui.statusMessageOriginX, this.ui.statusMessageOriginY);
      this.scene.statusText.setCenterAlign();
    }

    if (config.displayTime != null && config.displayTime > 0) {
      this.scene.statusTimer = this.scene.time.addEvent({
        delay: config.displayTime,
        callback: this.clearCurrentStatus,
        callbackScope: this,
      });
    }
  }

  clearCurrentStatus() {
    if (this.scene.statusImage != null) {
      this.scene.statusImage.destroy();
      this.scene.statusImage = null;
    }
    if (this.scene.statusText != null) {
      this.scene.statusText.destroy();
      this.scene.statusText = null;
    }
    if (this.scene.statusTimer != null) {
      this.scene.statusTimer.remove();
      this.scene.statusTimer = null;
    }
  }
}
