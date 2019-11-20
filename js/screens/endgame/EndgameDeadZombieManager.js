import Phaser from 'phaser';
import { depth, images, endgame } from '../../config';
import endgameUiHelper from '../ui/endgameUiHelper';

const ZOMBIE_IMAGES = [
  images.zombieNormal1,
  images.zombieNormal2,
  images.zombieNormal3,
  images.zombieNormal4,
  images.zombieNormal5,
  images.zombieNormal6,
];

export default class {
  constructor(scene) {
    this.scene = scene;
    this.ui = endgameUiHelper(this.scene.sys.game.config);

    this.totalDistance = this.scene.sys.game.config.width;
    this.zombies = [];
  }

  spawnZombies() {
    const columns = [];
    for (let i = 0; i < endgame.deadZombieColumns; i += 1) {
      columns.push(i);
    }
    Phaser.Math.RND.shuffle(columns);
    for (let i = 0; i < endgame.deadZombieCount; i += 1) {
      const image = Phaser.Math.RND.pick(ZOMBIE_IMAGES);
      const locConfig = this.getSpawnLocation(columns[i]);
      const zombie = this.scene.add.sprite(locConfig.xPosition, locConfig.yPosition, image, 0);
      if (locConfig.isFront) {
        zombie.displayWidth = this.scene.ui.zombieFrontWidth;
        zombie.displayHeight = this.scene.ui.zombieFrontWidth;
      } else {
        zombie.displayWidth = this.scene.ui.zombieBackWidth;
        zombie.displayHeight = this.scene.ui.zombieBackWidth;
      }
      const bDepth = locConfig.isFront ? depth.endgame.frontZombies : depth.endgame.backZombies;
      zombie.setDepth(bDepth + locConfig.row);
      zombie.setFrame(images.frames.zombieDead);
      zombie.image = image;
      this.zombies.push(zombie);
    }
  }

  getSpawnLocation(column) {
    const isFront = Phaser.Math.RND.pick([true, false]);
    const row = Phaser.Math.RND.between(0, endgame.deadZombieRows - 1);
    const min = isFront ? this.ui.minFrontDeadY : this.ui.minBackDeadY;
    const max = isFront ? this.ui.maxFrontDeadY : this.ui.maxBackDeadY;
    const xPosition = this.getSpawnX(column);
    const yPosition = min // past the min
      + (max - min) // available area
      * row / endgame.deadZombieRows; // percentage based on column

    return { isFront, row, xPosition, yPosition };
  }

  getSpawnX(column) {
    const width = this.totalDistance - (this.ui.deadZombieBuffer * 2);
    return this.ui.deadZombieBuffer + (width * (column / (endgame.deadZombieColumns - 1)));
  }
}
