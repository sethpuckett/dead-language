import Phaser from 'phaser';
import { endgame } from '../../config';
import endgameUiHelper from '../ui/endgameUiHelper';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.nextSpawnTime = this.getSpawnDelay(0);
    this.prevSpawnRow = 0;

    this.ui = endgameUiHelper(this.scene.sys.game.config);
  }

  /*
  return:
  {
    canSpawn: bool
    row: int
    yPosition: int
    speed: int
  }
  */
  getSpawn(gameTime) {
    const spawnConfig = { canSpawn: false };
    if (gameTime >= this.nextSpawnTime) {
      spawnConfig.canSpawn = true;
      spawnConfig.isFront = Phaser.Math.RND.pick([true, false]);
      const loc = this.getSpawnLocation(spawnConfig.isFront);
      spawnConfig.row = loc.row;
      spawnConfig.yPosition = loc.yPosition;
      spawnConfig.speed = this.getRunSpeed(spawnConfig.isFront);
      this.nextSpawnTime = gameTime + this.getSpawnDelay(gameTime);
    }

    return spawnConfig;
  }

  // Private

  getSpawnLocation(isFront) {
    const row = Phaser.Math.RND.between(0, endgame.spawnRows - 1);
    const min = isFront ? this.ui.minFrontSpawnY : this.ui.minBackSpawnY;
    const max = isFront ? this.ui.maxFrontSpawnY : this.ui.maxBackSpawnY;
    const yPosition = min // past the min
      + (max - min) // available area
      * row / endgame.spawnRows; // percentage based on column

    return { row, yPosition };
  }

  getSpawnDelay() {
    const ms = endgame.baseSpawnRate + Phaser.Math.RND.between(
      -endgame.spawnRange, endgame.spawnRange
    );
    return ms;
  }

  getRunSpeed(isFront) {
    const base = isFront ? endgame.baseFrontRunSpeed : endgame.baseBackRunSpeed;
    const range = isFront ? endgame.frontRunRange : endgame.backRunRange;
    return base + Phaser.Math.RND.between(-range, range);
  }
}
