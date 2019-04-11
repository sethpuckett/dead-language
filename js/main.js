import Minigame from './screens/Minigame'
import Phaser from 'phaser'

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  scene: Minigame
}

let game = new Phaser.Game(config)
