import Phaser from 'phaser';
import { animations, images, minigame, fonts } from '../../config';
import animationHelper from '../../util/animationHelper';

const ZOMBIE_IMAGE_SCALE = 2.5;
const SPAWN_Y = -35;
const SPEED_MODIFIER = 1000000;
const ZOMBIE_IMAGES = [
  images.grayZombie,
  images.redZombie,
  images.greenZombie,
  images.lightGreenZombie,
];

export default class {
  constructor(scene, vocabWordManager) {
    this.scene = scene;
    this.vocab = vocabWordManager;

    this.totalDistance = scene.sys.game.config.height - minigame.ui.hudHeight;
    this.zombies = [];
    this.damage = 0;
  }

  setHitArea(hitArea) {
    this.hitArea = hitArea;
  }

  moveZombies(delta) {
    this.zombies.forEach((z) => {
      if (z.moving) {
        const distance = this.getMovement(z.speed, delta);
        z.y += distance;
        z.text.y += distance;

        if (Phaser.Geom.Intersects.RectangleToRectangle(z.getBounds(), this.hitArea)) {
          z.moving = false;
          z.attacking = true;
          z.play(animationHelper.zombieAnimation(z.image, animations.zombieAttack));
          z.on('animationcomplete', this.applyZombieDamage, this);
        }
      }
    });
  }

  applyZombieDamage(_animation, _frame, zombie) {
    this.damage += 1;
    zombie.alive = false;
  }

  checkZombieAttack() {
    const currentDamage = this.damage;
    this.damage = 0;
    return -currentDamage;
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
    const image = Phaser.Math.RND.pick(ZOMBIE_IMAGES);
    const zombie = this.scene.add.sprite(spawnX, SPAWN_Y, image, 0);
    zombie.setScale(ZOMBIE_IMAGE_SCALE);
    zombie.image = image;
    zombie.speed = speed;
    zombie.word = this.vocab.getRandomWord();
    zombie.text = this.scene.add.bitmapText(
      zombie.x - 25, 10,
      fonts.blueSkyWhite, zombie.word.language1,
      minigame.fonts.zombieSize
    );
    zombie.alive = true;
    zombie.moving = true;
    zombie.attacking = false;
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

  getMovement(speed, delta) {
    return speed * delta * this.totalDistance / SPEED_MODIFIER;
  }
}
