import Phaser from 'phaser';
import { animations, depth, images } from '../../config';
import { animationHelper } from '../../util';

const SPAWN_X = -200;
const SPEED_MODIFIER = 1000000;
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

    this.totalDistance = this.scene.sys.game.config.width;
    this.zombies = [];
  }

  moveZombies(delta) {
    this.zombies.forEach((z) => {
      const distance = this.getMovement(z.speed, delta);
      z.x += distance;
      if (z.x - z.width > this.scene.sys.game.config.width) {
        z.alive = false;
      }
    });
  }

  destroyDeadZombies() {
    this.zombies.filter(z => !z.alive).forEach((z) => {
      z.destroy();
    });
    this.zombies = this.zombies.filter(z => z.alive);
  }

  spawnZombie(spawnConfig) {
    const image = Phaser.Math.RND.pick(ZOMBIE_IMAGES);
    const zombie = this.scene.add.sprite(SPAWN_X, spawnConfig.yPosition, image, 0);
    if (spawnConfig.isFront) {
      zombie.displayWidth = this.scene.ui.zombieFrontWidth;
      zombie.displayHeight = this.scene.ui.zombieFrontWidth;
    } else {
      zombie.displayWidth = this.scene.ui.zombieBackWidth;
      zombie.displayHeight = this.scene.ui.zombieBackWidth;
    }
    const bDepth = spawnConfig.isFront ? depth.endgame.frontZombies : depth.endgame.backZombies;
    zombie.setDepth(bDepth + spawnConfig.row);
    zombie.image = image;
    zombie.speed = spawnConfig.speed;
    zombie.alive = true;
    zombie.play(animationHelper.zombieAnimation(image, animations.zombieRun));
    this.zombies.push(zombie);
  }

  getMovement(speed, delta) {
    return speed * delta * this.totalDistance / SPEED_MODIFIER;
  }
}
