import Minigame from './screens/Minigame'
import Boot from './screens/Boot'
import Loading from './screens/Loading'
import TitleMenu from './screens/TitleMenu'
import Phaser from 'phaser'

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  scene: [
    Boot,
    Loading,
    TitleMenu,
    Minigame
  ]
}

let game = new Phaser.Game(config)
