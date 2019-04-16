import { endgame, screens, images } from '../config'
import endgameUiHelper from './ui/endgameUiHelper'
import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Endgame' })
  }

  init(stats) {
    this.stats = stats
  }

  create() {
    let ui = endgameUiHelper(this.sys.game.config)

    this.killsLabel = this.add.text(
      ui.killLabelX,
      ui.killLabelY,
      'Kills:' + this.stats.kills,
      endgame.fonts.stats
    )
    this.killsLabel.setOrigin(ui.killLabelOriginX, ui.killLabelOriginY)

    this.missesLabel = this.add.text(
      ui.missLabelX,
      ui.missLabelY(this.killsLabel),
      'Misses:' + this.stats.misses,
      endgame.fonts.stats
    )
    this.missesLabel.setOrigin(ui.missLabelOriginX, ui.missLabelOriginY)

    this.returnBtn = this.add.sprite(
      ui.returnButtonX,
      ui.returnButtonY(this.missesLabel),
      images.return
    ).setInteractive()
    this.returnBtn.setOrigin(ui.returnButtonOriginX, ui.returnButtonOriginY)

    this.returnBtn.on('pointerdown', this.returnToTitle, this)
  }

  returnToTitle() {
    this.scene.start(screens.titleMenu)
  }
}
