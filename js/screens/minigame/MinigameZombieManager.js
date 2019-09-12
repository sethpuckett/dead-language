import Phaser from 'phaser';
import { animations, depth, images, minigame, fonts, hud, weapons, userOptions } from '../../config';
import { animationHelper, textHelper } from '../../util';
import enemyTypes from '../../config/enemyTypes';
import UserOptionsManager from '../../data/UserOptionsManager';

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
const REVIEW_ZOMBIE_IMAGES = [
  images.zombieReview1,
  images.zombieReview2,
];

export default class {
  constructor(scene, stageParameters) {
    this.scene = scene;
    this.stageParameters = stageParameters;

    this.userOptionsManager = new UserOptionsManager(this.scene.sys.game);

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
    this.scene.audioManager.playSound(minigame.audio.soundEffects.zombieAttack);
    this.damage += this.stageParameters.enemies.attackDamage;
    zombie.alive = false;
    zombie.words[zombie.hits].missed = true;
    if (this.stageParameters.enemies.showAnswerOnAttack) {
      zombie.answer = zombie.words[zombie.hits].language2;
      zombie.showAnswer = true;
    }
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
      if (z.showAnswer) {
        z.visible = false;
        this.showZombieAnswerWord(z);
      } else {
        z.wordBgGraphics.destroy();
        z.destroy();
      }
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
    zombie.showAnswer = false;
    zombie.hits = 0;

    this.setZombieWord(zombie);

    const animation = this.getZombieMoveAnimation(spawnConfig.enemyType);
    zombie.play(animationHelper.zombieAnimation(image, animation));
    zombie.on('animationcomplete', this.zombieAnimationComplete, this);
    this.zombies.push(zombie);
    this.playZombieSpawnSound(spawnConfig.enemyType);
  }

  playZombieSpawnSound(enemyType) {
    switch (enemyType) {
      case enemyTypes.normalZombie:
      case enemyTypes.reviewZombie:
        this.scene.audioManager.playSound(minigame.audio.soundEffects.normalZombieSpawn);
        break;
      case enemyTypes.sprinterZombie:
      case enemyTypes.bruiserZombie:
        this.scene.audioManager.playSound(minigame.audio.soundEffects.specialZombieSpawn);
        break;
      default:
        break;
    }
  }

  checkGuess(text, weapon) {
    const guess = textHelper.cleanText(text);
    let isCorrect = false;

    // stop checking when find a correct answer
    this.zombies.some((z) => {
      const word = this.getCurrentZombieWord(z);
      if (guess === textHelper.cleanText(word.language2)) {
        z.words[z.hits].missed = false;
        this.shootZombie(z, weapon);
        isCorrect = true;
      }
      return isCorrect;
    });

    // only check alternatives if no match found in main answer
    if (!isCorrect) {
      this.zombies.some((z) => {
        const word = this.getCurrentZombieWord(z);
        const alternatives = word.alternatives != null
          ? word.alternatives.map(w => textHelper.cleanText(w)) : null;
        if (alternatives != null && alternatives.includes(guess)) {
          z.words[z.hits].missed = false;
          this.shootZombie(z, weapon);
          isCorrect = true;
        }
        return isCorrect;
      });
    }

    return isCorrect;
  }

  checkMercenary(text, killZombie) {
    const guess = textHelper.cleanText(text);
    return this.zombies.some((z) => {
      const word = this.getCurrentZombieWord(z);
      if (guess === textHelper.cleanText(word.language1)) {
        if (killZombie) {
          z.words[z.hits].missed = true;
          if (this.stageParameters.enemies.showAnswerOnMerc) {
            z.answer = word.language2;
            z.showAnswer = true;
          }
          this.shootZombie(z, weapons.pistol);
        }
        return true;
      }
      return false;
    });
  }

  destroyAllZombies() {
    let releasedWords = [];
    this.zombies.forEach((z) => {
      releasedWords = releasedWords.concat(z.words);
      z.text.destroy();
      z.wordBgGraphics.destroy();
      z.destroy();
    });
    this.zombies = [];
    return releasedWords;
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

    this.playShootZombieSound(weapon);

    if (zombie.health <= 0) {
      this.killShotZombie(zombie);
    } else {
      this.injuryShotZombie(zombie);
    }
  }

  playShootZombieSound(weapon) {
    switch (weapon) {
      case weapons.pistol:
        this.scene.audioManager.playSound(minigame.audio.soundEffects.pistolHit);
        break;
      case weapons.shotgun:
        this.scene.audioManager.playSound(minigame.audio.soundEffects.shotgunHit);
        break;
      default:
        break;
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
      size *= minigame.bigZombieSizeModifier;
    }

    return size;
  }

  getZombieHealth(enemyType) {
    if (enemyType === enemyTypes.bruiserZombie) {
      return this.stageParameters.enemies.bruiserZombieHealth;
    }
    if (enemyType === enemyTypes.sprinterZombie) {
      return this.stageParameters.enemies.sprinterZombieHealth;
    }

    return this.stageParameters.enemies.normalZombieHealth;
  }

  getZombieImage(enemyType) {
    if (enemyType === enemyTypes.sprinterZombie || enemyType === enemyTypes.bruiserZombie) {
      return Phaser.Math.RND.pick(SPECIAL_ZOMBIE_IMAGES);
    }
    if (enemyType === enemyTypes.reviewZombie) {
      return Phaser.Math.RND.pick(REVIEW_ZOMBIE_IMAGES);
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

  showZombieAnswerWord(zombie) {
    zombie.text.destroy();
    zombie.text = this.scene.add.bitmapText(
      0, zombie.y + this.scene.ui.zombieWordMargin,
      fonts.blueSkyWhite, zombie.answer,
      this.getFontSize()
    );
    zombie.text.x = zombie.x - zombie.text.width / 2;
    zombie.text.setDepth(depth.minigame.zombieText + zombie.text.y - this.scene.ui.padding);
    zombie.text.setTintFill(minigame.fonts.zombieTint);
    this.setZombieWordBg(zombie);
    this.setZombieAnswerTimers(zombie);
  }

  setZombieAnswerTimers(zombie) {
    zombie.answerFlashOn = false;
    zombie.answerFlashTimer = this.scene.time.addEvent({
      delay: minigame.answerFlashDelay,
      callback: (z) => {
        z.answerFlashOn = !z.answerFlashOn;
        if (z.answerFlashOn) {
          z.text.setTintFill(minigame.fonts.zombieAnswerFlashTint);
        } else {
          z.text.setTintFill(minigame.fonts.zombieTint);
        }
      },
      args: [zombie],
      callbackScope: this,
      repeat: -1,
    });

    zombie.answerDisplayTimer = this.scene.time.addEvent({
      delay: minigame.answerDisplayTime,
      callback: (z) => {
        z.answerFlashTimer.destroy();
        z.text.destroy();
        z.wordBgGraphics.destroy();
        z.destroy();
      },
      args: [zombie],
      callbackScope: this,
      repeat: 0,
    });
  }

  setZombieWord(zombie) {
    if (zombie.text != null) {
      zombie.text.destroy();
    }

    zombie.text = this.scene.add.bitmapText(
      0, zombie.y + this.scene.ui.zombieWordMargin,
      fonts.blueSkyWhite, zombie.words[zombie.hits].language1,
      this.getFontSize()
    );
    zombie.text.x = zombie.x - zombie.text.width / 2;
    zombie.text.setDepth(depth.minigame.zombieText + zombie.text.y - this.scene.ui.padding);
    zombie.text.setTintFill(minigame.fonts.zombieTint);
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

  getFontSize() {
    const sizeOption = this.userOptionsManager.getOptionValue(userOptions.textSize);
    return sizeOption === userOptions.values.normal
      ? minigame.fonts.zombieSize : minigame.fonts.zombieSizeLarge;
  }
}
