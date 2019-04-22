import Phaser from 'phaser';
import { images, screens } from '../config';
import titleMenuUiHelper from './ui/titleMenuUiHelper';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleMenu' });
  }

  create() {
    const ui = titleMenuUiHelper(this.sys.game.config);

    this.startBtn = this.add.sprite(
      ui.startButtonX, ui.startButtonY, images.start
    ).setInteractive();
    this.startBtn.setOrigin(ui.startButtonOrigin, ui.startButtonOrigin);
    this.startBtn.on('pointerdown', this.startGame, this);
  }

  startGame() {
    this.scene.start(screens.minigame);
  }
}
