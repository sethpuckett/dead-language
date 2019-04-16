import { images, screens } from '../config'
import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    this.load.image(images.loading, images.files.loading)
  }

  create() {
    this.scene.start(screens.loading)
  }
}
