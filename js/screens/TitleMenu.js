import { images, screens } from '../config'
import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleMenu' })
  }

  create() {
    this.startBtn = this.add.sprite(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      images.start
    ).setInteractive()

    this.startBtn.on('pointerdown', this.startGame, this)
  }

  startGame() {
    // this.scene.transition({ target: config.screens.minigame, duration: 0, remove: true })
    this.scene.start(screens.minigame)
  }
}
