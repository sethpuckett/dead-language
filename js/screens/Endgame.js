import Phaser from 'phaser';
import { fonts, endgame, screens, images } from '../config';
import endgameUiHelper from './ui/endgameUiHelper';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Endgame' });
  }

  init(stats) {
    this.stats = stats;
  }

  create() {
    this.ui = endgameUiHelper(this.sys.game.config);
    this.showBackground();
    this.showStatus();
    this.showKills();

    this.time.addEvent({
      delay: endgame.displayTime,
      callback: this.returnToTitle,
      callbackScope: this,
    });
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

  showStatus() {
    const statusLabel = this.add.bitmapText(
      this.ui.statusLabelX,
      this.ui.statusLabelY,
      fonts.blueSkyWhite,
      this.stats.status,
      endgame.fonts.statsSize
    );
    statusLabel.setOrigin(this.ui.statusLabelOrigin);
  }

  showKills() {
    const killsLabel = this.add.bitmapText(
      this.ui.killLabelX,
      this.ui.killLabelY,
      fonts.blueSkyWhite,
      `Kills: ${this.stats.kills}`,
      endgame.fonts.statsSize
    );
    killsLabel.setOrigin(this.ui.killLabelOrigin);
  }

  returnToTitle() {
    this.scene.start(screens.titleMenu);
  }
}
