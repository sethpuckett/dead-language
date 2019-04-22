import Phaser from 'phaser';
import { animations, images, minigame } from '../../config';
import animationHelper from '../../util/animationHelper'

const ZOMBIE_IMAGE_SCALE = 2.5;
const SPAWN_Y = -35;
const SPEED_MODIFIER = 1000000;
const ZOMBIE_IMAGES = [
  images.grayZombie,
  images.redZombie,
  images.greenZombie,
  images.lightGreenZombie
];

export default class {
  constructor(scene, vocabWordManager) {
    this.scene = scene;
    this.vocab = vocabWordManager;

    this.totalDistance = scene.sys.game.config.height - minigame.ui.entryHeight;
    this.zombies = [];
  }

  setHitArea(hitArea) {
    this.hitArea = hitArea;
  }

  moveZombies(delta) {
    this.zombies.forEach((z) => {
      const distance = this.getMovement(z.speed, delta);
      z.y += distance;
      z.text.y += distance;
    });
  }

  checkZombieAttack() {
    let damage = 0;
    this.zombies.forEach((z) => {
      if (Phaser.Geom.Intersects.RectangleToRectangle(z.getBounds(), this.hitArea)) {
        damage += 1;
        z.alive = false;
      }
    });
    return damage;
  }

  destroyDeadZombies() {
    this.zombies.filter(z => !z.alive).forEach((z) => {
      this.vocab.releaseWord(z.word);
      z.text.destroy();
      z.destroy();
    });

    this.zombies = this.zombies.filter(z => z.alive);
  }

  spawnZombie(spawnX, speed) {
    const image = Phaser.Math.RND.pick(ZOMBIE_IMAGES)
    const zombie = this.scene.add.sprite(spawnX, SPAWN_Y, image, 0);
    zombie.setScale(ZOMBIE_IMAGE_SCALE);
    zombie.speed = speed;
    zombie.word = this.vocab.getRandomWord();
    zombie.text = this.scene.add.text(
      zombie.x - 25,
      10, zombie.word.language1,
      minigame.fonts.zombie
    );
    zombie.alive = true;
    zombie.play(animationHelper.zombieAnimation(image, animations.zombieWalk));
    this.zombies.push(zombie);
  }

  checkSubmittedAnswer(text) {
    let points = 0;
    this.zombies.forEach((z) => {
      if (text === z.word.language2) {
        z.alive = false;
        points += 1;
      }
    });
    return points;
  }

  // private

  getMovement(speed, delta) {
    return speed * delta * this.totalDistance / SPEED_MODIFIER;
  }
}
