import { endgame, screens, images } from '../config'
import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Endgame' })
  }

  init(stats) {
    this.stats = stats
  }

  create() {
    // TODO: move positions to config
    // TODO: center labels
    this.killsLabel = this.add.text(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - this.sys.game.config.height / 4,
      'Kills: ' + this.stats.kills,
      endgame.fonts.stats
    )

    this.missesLabel = this.add.text(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - this.sys.game.config.height / 4 + this.sys.game.config.height / 8,
      'Misses: ' + this.stats.misses,
      endgame.fonts.stats
    )

    this.returnBtn = this.add.sprite(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 + this.sys.game.config.height / 8,
      images.return
    ).setInteractive()

    this.returnBtn.on('pointerdown', this.returnToTitle, this)
  }

  returnToTitle() {
    this.scene.start(screens.titleMenu)
  }
}
