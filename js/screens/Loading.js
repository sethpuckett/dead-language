import config from '../config'
import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Loading' })
  }

  preload() {
    this.showBackground()
    this.showProgressBar()
    this.loadAssets()

    if (config.debug.slowLoad) {
      this.loadDummyAssets()
    }
  }

  create() {
    // this.scene.transition({ target: config.screens.titleMenu, duration: 0, remove: true })
    this.scene.start(config.screens.titleMenu)
  }

  showBackground() {
    this.add.sprite(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - this.sys.game.config.height / 4,
      config.images.loading.key
    )
  }

  showProgressBar() {
    // TODO: Move all these hard coded values to config
    let barBgW = this.sys.game.config.width / 4
    let barBgH = this.sys.game.config.width / 16
    let barBg = this.add.graphics()
    barBg.setPosition(
      this.sys.game.config.width / 2 - barBgW / 2,
      this.sys.game.config.height / 2 - barBgH / 2
    )
    barBg.fillStyle(0x444444, 1)
    barBg.fillRect(0, 0, barBgW, barBgH)

    let bar = this.add.graphics()
    bar.setPosition(
      this.sys.game.config.width / 2 - barBgW / 2 + 5,
      this.sys.game.config.height / 2 - barBgH / 2 + 5
    )

    this.load.on('progress', (value) => {
      bar.clear()
      bar.fillStyle(0x33aa22, 1)
      bar.fillRect(0, 0, (barBgW - 10) * value, barBgH - 10)
    })
  }

  loadAssets() {
    this.load.image(config.images.start.key, config.images.start.file)
    this.load.image(config.images.return.key, config.images.return.file)
    this.load.image(config.images.grass.key, config.images.grass.file)
    this.load.spritesheet(config.images.zombie.key, config.images.zombie.file, {
      frameWidth: 100,
      frameHeight: 100,
      margin: 0,
      spacing: 0
    })
  }

  loadDummyAssets() {
    for (let i = 0; i < 100; i++) {
      this.load.image('test' + i, config.images.loading.file)
    }
  }
}
