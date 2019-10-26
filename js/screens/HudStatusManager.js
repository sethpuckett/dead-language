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

    this.scene.hudManager.messageBorder.setFrame(images.frames.hudMessageLight);
    if (config.image != null) {
      let frame = 0;
      if (config.frame != null) {
        frame = config.frame;
      }
      this.statusImage = this.scene.add.sprite(
        this.ui.statusImageX,
        this.ui.statusImageY,
        config.image,
        frame
      );
      this.statusImage.displayWidth = this.ui.statusImageWidth;
      this.statusImage.displayHeight = this.ui.statusImageHeight;
      this.statusImage.setOrigin(this.ui.statusImageOriginX, this.ui.statusImageOriginY);
      this.statusImage.setDepth(depth.hud.ui);
    }

    if (config.message != null) {
      const x = config.image != null ? this.ui.statusMessageX : this.ui.statusMessageNoImageX;
      const y = config.image != null ? this.ui.statusMessageY : this.ui.statusMessageNoImageY;
      const maxWidth = config.image != null
        ? this.ui.statusMessageMaxWidth : this.ui.statusMessageNoImageMaxWidth;

      this.statusText = this.scene.add.bitmapText(
        x, y, fonts.blueSky, config.message, hud.fonts.statusSize
      );
      if (this.statusText.width > maxWidth) {
        this.statusText.destroy();
        this.statusText = this.scene.add.bitmapText(
          x, y, fonts.blueSky, config.message, hud.fonts.statusSizeSmall
        );
      }
      this.statusText.setOrigin(this.ui.statusMessageOriginX, this.ui.statusMessageOriginY);
      this.statusText.setCenterAlign();
      this.statusText.setDepth(depth.hud.ui);
      this.statusText.setTintFill(hud.fonts.statusTint);
    }

    if (config.displayTime != null && config.displayTime > 0) {
      this.statusTimer = this.scene.time.addEvent({
        delay: config.displayTime,
        callback: this.clearCurrentStatus,
        callbackScope: this,
      });
    }
  }

  clearCurrentStatus() {
    this.scene.hudManager.messageBorder.setFrame(images.frames.hudMessageDark);
    if (this.statusImage != null) {
      this.statusImage.destroy();
      this.statusImage = null;
    }
    if (this.statusText != null) {
      this.statusText.destroy();
      this.statusText = null;
    }
    if (this.statusTimer != null) {
      this.statusTimer.remove();
      this.statusTimer = null;
    }
  }
}
