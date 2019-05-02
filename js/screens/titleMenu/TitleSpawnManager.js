import Phaser from 'phaser';
import { titleMenu } from '../../config';
import titleMenuUiHelper from '../ui/titleMenuUiHelper';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.nextSpawnTime = this.getSpawnDelay(0);
    this.prevSpawnRow = 0;

    this.ui = titleMenuUiHelper(this.scene.sys.game.config);
  }

  start() {
    this.scene.spawnTimer.paused = false;
  }

  /*
  return:
  {
    canSpawn: bool
    yPosition: int
    speed: int
  }
  */
  getSpawn(gameTime) {
    const spawnConfig = { canSpawn: false };
    if (gameTime >= this.nextSpawnTime) {
      spawnConfig.canSpawn = true;
      spawnConfig.isFront = Phaser.Math.RND.pick([true, false]);
      spawnConfig.yPosition = this.getSpawnLocation(spawnConfig.isFront);
      spawnConfig.speed = this.getRunSpeed(spawnConfig.isFront);
      this.nextSpawnTime = gameTime + this.getSpawnDelay(gameTime);
    }

    return spawnConfig;
  }

  // Private

  getSpawnLocation(isFront) {
    const row = Phaser.Math.RND.between(0, titleMenu.spawnRows - 1);
    const min = isFront ? this.ui.minFrontSpawnY : this.ui.minBackSpawnY;
    const max = isFront ? this.ui.maxFrontSpawnY : this.ui.maxBackSpawnY;
    return min// past the min
      + (max - min) // available area
      * row / titleMenu.spawnRows; // percentage based on column
  }

  getSpawnDelay() {
    const ms = titleMenu.baseSpawnRate + Phaser.Math.RND.between(
      -titleMenu.spawnRange, titleMenu.spawnRange
    );
    return ms;
  }

  getRunSpeed(isFront) {
    const base = isFront ? titleMenu.baseFrontRunSpeed : titleMenu.baseBackRunSpeed;
    const range = isFront ? titleMenu.frontRunRange : titleMenu.backRunRange;
    return base + Phaser.Math.RND.between(-range, range);
  }
}
