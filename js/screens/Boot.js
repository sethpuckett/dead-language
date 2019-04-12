import config from '../config'
import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    this.load.image(config.images.loading.key, config.images.loading.file)
  }

  create() {
    this.scene.transition({ target: config.screens.loading, duration: 0, remove: true })
  }
}
