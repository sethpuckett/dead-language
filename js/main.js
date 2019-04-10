import minigame from './screens/minigame'
import Phaser from 'phaser'

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  scene: minigame
}

let game = new Phaser.Game(config)
