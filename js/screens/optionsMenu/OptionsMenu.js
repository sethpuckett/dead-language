import Phaser from 'phaser';
import { screens } from '../../config';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.optionsMenu });
  }

  init() {

  }

  create() {
    this.scene.start(screens.townMap);
  }
}
