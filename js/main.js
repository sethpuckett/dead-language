import Minigame from './screens/Minigame'
import Phaser from 'phaser'

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: Minigame
}

let game = new Phaser.Game(config)
