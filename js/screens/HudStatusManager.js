/* eslint-disable prefer-destructuring */
import hudUiHelper from './ui/hudUiHelper';
import { hud, fonts, images, depth } from '../config';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.ui = hudUiHelper(this.scene.sys.game.config);
  }

  /*
  config: {
    image: string,
    frame: int (default: 0)
    message: string or [string],
    displayTime: int
  }
  */
  setStatus(config) {
    this.clearCurrentStatus();

    this.scene.messageBorder.setFrame(images.frames.hudMessageLight);
    if (config.image != null) {
      let frame = 0;
      if (config.frame != null) {
        frame = config.frame;
      }
      this.scene.statusImage = this.scene.add.sprite(
        this.ui.statusImageX,
        this.ui.statusImageY,
        config.image,
        frame
      );
      this.scene.statusImage.displayWidth = this.ui.statusImageWidth;
      this.scene.statusImage.displayHeight = this.ui.statusImageHeight;
      this.scene.statusImage.setOrigin(this.ui.statusImageOriginX, this.ui.statusImageOriginY);
      this.scene.statusImage.setDepth(depth.hud.ui);
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
      this.scene.statusText.setDepth(depth.hud.ui);
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
    // TODO: messageBorder is defined in HudManager. using it here is messy
    this.scene.messageBorder.setFrame(images.frames.hudMessageDark);
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
