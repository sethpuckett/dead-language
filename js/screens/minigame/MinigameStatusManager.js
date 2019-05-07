import hudUiHelper from '../ui/hudUiHelper';
import { hud, minigame, images, fonts } from '../../config';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.ui = hudUiHelper(this.scene.sys.game.config);
  }

  damageStatus() {
    this.clearCurrentStatus();

    this.scene.statusImage = this.scene.add.sprite(
      this.ui.statusImageX,
      this.ui.statusImageY,
      images.zombieFace
    );
    this.scene.statusImage.displayWidth = this.ui.statusImageWidth;
    this.scene.statusImage.displayHeight = this.ui.statusImageHeight;
    this.scene.statusImage.setOrigin(this.ui.statusImageOriginX, this.ui.statusImageOriginY);
    this.scene.statusText = this.scene.add.bitmapText(
      this.ui.statusMessageX,
      this.ui.statusMessageY,
      fonts.blueSkyWhite,
      minigame.statusMessages.damage,
      hud.fonts.statusSize
    );
    this.scene.statusText.setOrigin(this.ui.statusMessageOriginX, this.ui.statusMessageOriginY);
    this.scene.statusText.setCenterAlign();

    this.scene.statusTimer = this.scene.time.addEvent({
      delay: minigame.statusTime,
      callback: () => {
        this.scene.statusImage.destroy();
        this.scene.statusText.destroy();
      },
      callbackScope: this,
    });
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
