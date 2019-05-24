import Phaser from 'phaser';
import Minigame from './screens/minigame/Minigame';
import Boot from './screens/Boot';
import Loading from './screens/Loading';
import TitleMenu from './screens/titleMenu/TitleMenu';
import Endgame from './screens/Endgame';
import VocabStudy from './screens/vocabStudy/VocabStudy';
import TownMap from './screens/map/TownMap';
import WebManager from './web/WebManager';

const phaserConfig = {
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
    TownMap,
  ],
};

const web = new WebManager(phaserConfig);
web.initializeFirebase();
web.setupCallbacks();
