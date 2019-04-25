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
const PADDING = minigame.ui.zombieWordBgPadding;

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
        z.wordBgGraphics.clear();
        z.wordBgGraphics.fillRect(
          z.text.x - PADDING,
          z.text.y - PADDING,
          z.text.width + PADDING * 2,
          z.text.height + PADDING * 2
        );
        if (Phaser.Geom.Intersects.RectangleToRectangle(z.getBounds(), this.hitArea)) {
          z.moving = false;
          z.attacking = true;
          z.play(animationHelper.zombieAnimation(z.image, animations.zombieAttack));
        }
      }
    });
  }

  zombieAnimationComplete(animation, _frame, zombie) {
    const attack = animationHelper.zombieAnimation(zombie.image, animations.zombieAttack);
    const death = animationHelper.zombieAnimation(zombie.image, animations.zombieDie);
    if (animation.key === attack) {
      this.applyZombieDamage(zombie);
    } else if (animation.key === death) {
      zombie.alive = false;
    }
  }

  applyZombieDamage(zombie) {
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
      z.wordBgGraphics.destroy();
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
      0, 0,
      fonts.blueSkyWhite, zombie.word.language1,
      minigame.fonts.zombieSize
    );
    zombie.text.x = spawnX - zombie.text.width / 2;
    zombie.text.setDepth(2);
    zombie.alive = true;
    zombie.moving = true;
    zombie.attacking = false;
    zombie.wordBgGraphics = this.scene.add.graphics({ fillStyle: minigame.ui.zombieWordBgStyle });
    zombie.wordBgGraphics.setDepth(1);
    zombie.play(animationHelper.zombieAnimation(image, animations.zombieWalk));
    zombie.on('animationcomplete', this.zombieAnimationComplete, this);
    this.zombies.push(zombie);
  }

  scoreSubmittedAnswer(text) {
    let points = 0;
    this.zombies.forEach((z) => {
      if (text === z.word.language2) {
        this.killShotZombie(z);
        points += 1;
      }
    });
    return points;
  }

  killShotZombie(zombie) {
    zombie.moving = false;
    zombie.play(animationHelper.zombieAnimation(zombie.image, animations.zombieDie));
    const shot = this.scene.add.sprite(zombie.x, zombie.y, images.shotBlast);
    shot.on('animationcomplete', (_a, _f, s) => s.destroy(), this);
    shot.play(animations.shotBlastExplode);
  }

  getMovement(speed, delta) {
    return speed * delta * this.totalDistance / SPEED_MODIFIER;
  }
}
