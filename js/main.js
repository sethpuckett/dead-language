import minigame from './screens/minigame'
import Phaser from 'phaser'

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: minigame
};

let game = new Phaser.Game(config);
