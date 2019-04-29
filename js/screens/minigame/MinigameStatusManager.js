import minigameUiHelper from '../ui/minigameUiHelper';
import { minigame, images, fonts } from '../../config';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.ui = minigameUiHelper(this.scene.sys.game.config);
  }

  damageStatus() {
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
      minigame.fonts.statusSize
    );
    this.scene.statusText.setOrigin(this.ui.statusMessageOriginX, this.ui.statusMessageOriginY);
    this.scene.statusText.setCenterAlign();

    this.scene.time.addEvent({
      delay: minigame.statusTime,
      callback: () => {
        this.scene.statusImage.destroy();
        this.scene.statusText.destroy();
      },
      callbackScope: this,
    });
  }
}
