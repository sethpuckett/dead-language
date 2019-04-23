import Phaser from 'phaser';
import { endgame, screens, images } from '../config';
import endgameUiHelper from './ui/endgameUiHelper';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Endgame' });
  }

  init(stats) {
    this.stats = stats;
  }

  create() {
    const ui = endgameUiHelper(this.sys.game.config);

    this.killsLabel = this.add.text(
      ui.killLabelX,
      ui.killLabelY,
      `Kills:${this.stats.kills}`,
      endgame.fonts.stats
    );
    this.killsLabel.setOrigin(ui.killLabelOriginX, ui.killLabelOriginY);

    this.returnBtn = this.add.sprite(
      ui.returnButtonX,
      ui.returnButtonY(this.killsLabel),
      images.return
    ).setInteractive();
    this.returnBtn.setOrigin(ui.returnButtonOriginX, ui.returnButtonOriginY);

    this.returnBtn.on('pointerdown', this.returnToTitle, this);
  }

  returnToTitle() {
    this.scene.start(screens.titleMenu);
  }
}
