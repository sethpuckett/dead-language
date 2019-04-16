import { loading, debug, screens, images } from '../config'
import loadingUiHelper from './ui/loadingUiHelper'
import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Loading' })
  }

  preload() {
    this.showProgressBar()
    this.loadAssets()

    if (debug.slowLoad) {
      this.loadDummyAssets()
    }
  }

  create() {
    this.scene.start(screens.titleMenu)
  }

  showProgressBar() {
    let ui = loadingUiHelper(this.sys.game.config)
    let loadingSprite = this.add.sprite(ui.loadingImageX, ui.loadingImageY, images.loading)
    loadingSprite.setOrigin(ui.loadingImageOrigin, ui.loadingImageOrigin)

    let barBg = this.add.graphics()
    barBg.setPosition(ui.barBackgroundX, ui.barBackgroundY)
    barBg.fillStyle(loading.progressBgColor)
    barBg.fillRect(0, 0, ui.barBackgroundW, ui.barBackgroundH)

    let bar = this.add.graphics()
    bar.setPosition(ui.barX, ui.barY)

    this.load.on('progress', (value) => {
      bar.clear()
      bar.fillStyle(loading.progressFillColor)
      bar.fillRect(0, 0, (ui.barW) * value, ui.barH)
    })
  }

  loadAssets() {
    this.load.image(images.start, images.files.start)
    this.load.image(images.return, images.files.return)
    this.load.image(images.grass, images.files.grass)
    this.load.spritesheet(images.zombie, images.files.zombie, {
      frameWidth: 100,
      frameHeight: 100,
      margin: 0,
      spacing: 0
    })
  }

  loadDummyAssets() {
    for (let i = 0; i < 250; i++) {
      this.load.image('test' + i, images.files.loading)
    }
  }
}
