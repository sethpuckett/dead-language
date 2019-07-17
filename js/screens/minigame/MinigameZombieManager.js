import Phaser from 'phaser';
import { animations, depth, images, minigame, fonts, hud, weapons } from '../../config';
import { animationHelper } from '../../util';
import enemyTypes from '../../config/enemyTypes';

const SPAWN_Y = -35;
const SPLATTER_OFFSET = -5;
const SPEED_MODIFIER = 1000000;
const NORMAL_ZOMBIE_IMAGES = [
  images.zombieNormal1,
  images.zombieNormal2,
  images.zombieNormal3,
  images.zombieNormal4,
  images.zombieNormal5,
  images.zombieNormal6,
];
const SPECIAL_ZOMBIE_IMAGES = [
  images.zombieSpecial1,
  images.zombieSpecial2,
];

export default class {
  constructor(scene) {
    this.scene = scene;

    this.totalDistance = scene.sys.game.config.height - hud.height;
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
        z.setDepth(depth.minigame.zombie + z.y);
        z.text.setDepth(depth.minigame.zombieText + z.text.y - this.scene.ui.padding);
        this.setZombieWordBg(z);
        if (Phaser.Geom.Intersects.RectangleToRectangle(z.getBounds(), this.hitArea)) {
          z.moving = false;
          z.attacking = true;
          z.play(animationHelper.zombieAnimation(z.image, animations.zombieAttack));
        }
      }
    });
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
    let releasedWords = [];
    this.zombies.filter(z => !z.alive).forEach((z) => {
      releasedWords = releasedWords.concat(z.words);
      z.text.destroy();
      z.wordBgGraphics.destroy();
      z.destroy();
    });
    this.zombies = this.zombies.filter(z => z.alive);
    return releasedWords;
  }

  spawnZombie(spawnConfig) {
    const image = this.getZombieImage(spawnConfig.enemyType);
    const zombie = this.scene.add.sprite(spawnConfig.xPosition, SPAWN_Y, image, 0);
    zombie.setDepth(depth.minigame.zombie);
    zombie.setOrigin(this.scene.ui.zombieOriginX, this.scene.ui.zombieOriginY);
    zombie.displayWidth = this.getZombieImageSize(spawnConfig.enemyType);
    zombie.displayHeight = this.getZombieImageSize(spawnConfig.enemyType);
    zombie.image = image;
    zombie.type = spawnConfig.enemyType;
    zombie.speed = spawnConfig.speed;
    zombie.health = this.getZombieHealth(spawnConfig.enemyType);
    zombie.wordBgGraphics = this.scene.add.graphics();
    zombie.wordBgGraphics.fillStyle(minigame.ui.zombieWordBgColor);
    zombie.wordBgGraphics.setDepth(depth.minigame.zombieTextBackground);
    zombie.words = spawnConfig.words;
    zombie.alive = true;
    zombie.moving = true;
    zombie.attacking = false;
    zombie.hits = 0;

    this.setZombieWord(zombie);

    const animation = this.getZombieMoveAnimation(spawnConfig.enemyType);
    zombie.play(animationHelper.zombieAnimation(image, animation));
    zombie.on('animationcomplete', this.zombieAnimationComplete, this);
    this.zombies.push(zombie);
  }

  scoreSubmittedAnswer(text, weapon) {
    const guess = text.toLowerCase().trim();
    let points = 0;

    // stop checking when find a correct answer
    this.zombies.some((z) => {
      const word = this.getCurrentZombieWord(z);
      if (guess === word.language2) {
        this.shootZombie(z, weapon);
        points += 1;
      }
      return points > 0;
    });

    // only check alternatives if no match found in main answer
    if (points === 0) {
      this.zombies.some((z) => {
        const word = this.getCurrentZombieWord(z);
        if (word.alternatives != null && word.alternatives.includes(guess)) {
          this.shootZombie(z, weapon);
          points += 1;
        }
        return points > 0;
      });
    }

    return points;
  }

  checkMercenary(text, killZombie) {
    const guess = text.toLowerCase().trim();
    return this.zombies.some((z) => {
      const word = this.getCurrentZombieWord(z);
      if (guess === word.language1.toLowerCase()) {
        if (killZombie) {
          this.shootZombie(z, weapons.pistol);
        }
        return true;
      }
      return false;
    });
  }

  // Private

  shootZombie(zombie, weapon) {
    const shotImageConfig = this.getShotImageConfig(weapon);
    const shot = this.scene.add.sprite(
      zombie.x, zombie.y - this.getZombieImageSize(zombie.type) / 2, shotImageConfig.image
    );
    shot.setDepth(depth.minigame.shotBlast);
    shot.on('animationcomplete', (_a, _f, s) => s.destroy(), this);
    shot.play(shotImageConfig.animation);

    zombie.moving = false;
    zombie.hits += 1;
    zombie.health -= weapons.damage[weapon];

    if (zombie.health <= 0) {
      this.killShotZombie(zombie);
    } else {
      this.injuryShotZombie(zombie);
    }
  }

  injuryShotZombie(zombie) {
    zombie.play(animationHelper.zombieAnimation(zombie.image, animations.zombieDamage));
    this.setZombieWord(zombie);
  }

  killShotZombie(zombie) {
    zombie.play(animationHelper.zombieAnimation(zombie.image, animations.zombieDie));

    // TODO: don't hard code scale here
    this.scene.add.sprite(
      this.getSplatterLocation(zombie.x),
      zombie.y,
      this.getSplatterImage()
    ).setDepth(depth.minigame.splatter).setScale(2);
  }

  getMovement(speed, delta) {
    return speed * delta * this.totalDistance / SPEED_MODIFIER;
  }

  getSplatterImage() {
    const index = Phaser.Math.RND.between(1, minigame.splatterVarieties);
    return `${images.bloodSplatter}-${index}`;
  }

  getSplatterLocation(x) {
    const base = x + SPLATTER_OFFSET;
    return Phaser.Math.RND.between(base - minigame.splatterRange, base + minigame.splatterRange);
  }

  getZombieImageSize(enemyType) {
    let size = this.scene.ui.zombieWidth;

    if (enemyType === enemyTypes.bruiserZombie) {
      size *= minigame.bruiserZombieSizeModifier;
    }

    return size;
  }

  getZombieHealth(enemyType) {
    if (enemyType === enemyTypes.bruiserZombie) {
      return minigame.bruiserZombieHealth;
    }

    return minigame.normalZombieHealth;
  }

  getZombieImage(enemyType) {
    if (enemyType === enemyTypes.sprinterZombie || enemyType === enemyTypes.bruiserZombie) {
      return Phaser.Math.RND.pick(SPECIAL_ZOMBIE_IMAGES);
    }

    return Phaser.Math.RND.pick(NORMAL_ZOMBIE_IMAGES);
  }

  // returns { image: image, animation: animation }
  getShotImageConfig(weaponType) {
    if (weaponType === weapons.shotgun) {
      return { image: images.shotgunBlast, animation: animations.shotgunBlastExplode };
    }

    return { image: images.shotBlast, animation: animations.shotBlastExplode };
  }

  getZombieMoveAnimation(enemyType) {
    if (enemyType === enemyTypes.sprinterZombie) {
      return animations.zombieRun;
    }

    return animations.zombieWalk;
  }

  zombieAnimationComplete(animation, frame, zombie) {
    const attack = animationHelper.zombieAnimation(zombie.image, animations.zombieAttack);
    const death = animationHelper.zombieAnimation(zombie.image, animations.zombieDie);
    const damage = animationHelper.zombieAnimation(zombie.image, animations.zombieDamage);
    if (animation.key === attack && frame.isLast) {
      this.applyZombieDamage(zombie);
    } else if (animation.key === death) {
      zombie.alive = false;
    } else if (animation.key === damage) {
      zombie.moving = true;
      zombie.play(
        animationHelper.zombieAnimation(zombie.image, this.getZombieMoveAnimation(zombie.type))
      );
    }
  }

  setZombieWord(zombie) {
    if (zombie.text != null) {
      zombie.text.destroy();
    }

    zombie.text = this.scene.add.bitmapText(
      0, zombie.y + this.scene.ui.zombieWordMargin,
      fonts.blueSkyWhite, zombie.words[zombie.hits].language1,
      minigame.fonts.zombieSize
    );
    zombie.text.x = zombie.x - zombie.text.width / 2;
    zombie.text.setDepth(depth.minigame.zombieText + zombie.text.y - this.scene.ui.padding);
    this.setZombieWordBg(zombie);
  }

  setZombieWordBg(zombie) {
    zombie.wordBgGraphics.clear();
    zombie.wordBgGraphics.fillStyle(minigame.ui.zombieWordBgColor);
    zombie.wordBgGraphics.fillRect(
      zombie.text.x - this.scene.ui.padding,
      zombie.text.y - this.scene.ui.padding,
      zombie.text.width + this.scene.ui.padding * 2,
      zombie.text.height + this.scene.ui.padding * 2
    );
    zombie.wordBgGraphics.setDepth(
      depth.minigame.zombieTextBackground + zombie.text.y - this.scene.ui.padding
    );
  }

  getCurrentZombieWord(zombie) {
    return zombie.words[zombie.hits];
  }
}
