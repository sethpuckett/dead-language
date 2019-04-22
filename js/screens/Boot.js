import Phaser from 'phaser';
import { images, screens } from '../config';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.load.image(images.loading, images.files.loading);
  }

  create() {
    this.scene.start(screens.loading);
  }
}
