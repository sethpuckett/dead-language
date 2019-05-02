import Phaser from 'phaser';
import { animations, depth, images } from '../../config';
import animationHelper from '../../util/animationHelper';

const ZOMBIE_FRONT_IMAGE_SCALE = 3;
const ZOMBIE_BACK_IMAGE_SCALE = 1.7;
const SPAWN_X = -35;
const SPEED_MODIFIER = 1000000;
const ZOMBIE_IMAGES = [
  images.grayZombie,
  images.greenZombie,
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
      if (z.x > this.scene.sys.game.config.width) {
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
    zombie.setScale(spawnConfig.isFront ? ZOMBIE_FRONT_IMAGE_SCALE : ZOMBIE_BACK_IMAGE_SCALE);
    zombie.setDepth(
      spawnConfig.isFront ? depth.titleMenu.frontZombies : depth.titleMenu.backZombies
    );
    zombie.image = image;
    zombie.speed = spawnConfig.speed;
    zombie.alive = true;
    zombie.play(animationHelper.zombieAnimation(image, animations.zombieWalk));
    this.zombies.push(zombie);
  }

  getMovement(speed, delta) {
    return speed * delta * this.totalDistance / SPEED_MODIFIER;
  }
}
