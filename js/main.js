import Phaser from 'phaser';
import Minigame from './screens/minigame/Minigame';
import Boot from './screens/Boot';
import Loading from './screens/Loading';
import TitleMenu from './screens/titleMenu/TitleMenu';
import Endgame from './screens/Endgame';
import VocabStudy from './screens/VocabStudy';

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
    Endgame,
    VocabStudy,
  ],
};

const game = new Phaser.Game(config);
