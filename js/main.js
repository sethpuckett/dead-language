import Phaser from 'phaser';
import Minigame from './screens/minigame/Minigame';
import Boot from './screens/Boot';
import Loading from './screens/Loading';
import TitleMenu from './screens/TitleMenu';
import Endgame from './screens/Endgame';

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 800,
  height: 600,
  pixelArt: true,
  scene: [
    Boot,
    Loading,
    TitleMenu,
    Minigame,
    Endgame
  ]
};

const game = new Phaser.Game(config);
