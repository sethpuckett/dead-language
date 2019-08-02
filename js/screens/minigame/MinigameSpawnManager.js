import Phaser from 'phaser';
import { minigame } from '../../config';
import enemyTypes from '../../config/enemyTypes';

export default class {
  constructor(scene, waveConfig, vocabWordManager, startTime = 0) {
    this.scene = scene;
    this.waveConfig = waveConfig;
    this.vocab = vocabWordManager;
    this.currentTime = startTime;
    this.nextSpawnTime = this.getSpawnDelay(startTime);
    this.prevSpawnColumn = 0;

    this.spawnPadding = this.scene.sys.game.config.width * minigame.sidePaddingPercent / 100;
  }

  /*
  return:
  {
    canSpawn: bool
    enemyType: enemyType
    xPosition: int
    speed: int
    words: [Word]
  }
  */
  getSpawn(gameTime) {
    const spawnConfig = { canSpawn: false };
    if (gameTime >= this.nextSpawnTime) {
      const enemyType = this.getRandomEnemyType(gameTime);
      const words = this.vocab.getRandomWords(this.getWordCount(enemyType));
      if (words != null) {
        spawnConfig.canSpawn = true;
        spawnConfig.enemyType = enemyType;
        spawnConfig.xPosition = this.getSpawnLocation();
        spawnConfig.speed = this.getFallSpeed(spawnConfig.enemyType);
        spawnConfig.words = words;
      }
      this.nextSpawnTime = gameTime + this.getSpawnDelay(gameTime);
    }

    return spawnConfig;
  }

  // Private

  getSpawnLocation() {
    let column = this.prevSpawnColumn;
    // don't spawn in same or 2 adjacent columns on either side
    while (Math.abs(column - this.prevSpawnColumn) <= 2) {
      column = Phaser.Math.RND.between(0, minigame.zombieColumns - 1);
    }
    this.prevSpawnColumn = column;
    return this.spawnPadding // past the padding
      + (this.scene.sys.game.config.width - this.spawnPadding * 2) // available area
      * column / minigame.zombieColumns; // percentage based on column
  }

  getSpawnDelay(gameTime) {
    let delay = 0;
    const wave = this.getCurrentWave(gameTime);
    if (wave != null) {
      let percentToMax = 1;
      let easedPercent = 1;
      if (gameTime < wave.maxStart) {
        percentToMax = (gameTime - wave.start) / (wave.maxStart - wave.start);
        easedPercent = Phaser.Math.Easing.Cubic.InOut(percentToMax);
      } else if (gameTime > wave.maxEnd) {
        percentToMax = (gameTime - wave.maxEnd) / (wave.end - wave.maxEnd);
        easedPercent = 1 - Phaser.Math.Easing.Cubic.InOut(percentToMax);
      }
      const delaySeconds = wave.baseSpawnRate * (1 - easedPercent);
      const ms = delaySeconds + wave.baseSpawnRate + Phaser.Math.RND.between(
        -wave.spawnRange, wave.spawnRange
      );
      delay = ms / 1000;
    } else {
      const nextWave = this.getNextWave(gameTime);
      if (nextWave != null) {
        delay = nextWave.start - gameTime;
      } else {
        delay = 99999;
      }
    }
    return delay;
  }

  getCurrentWave(gameTime) {
    return this.waveConfig.find(el => el.start <= gameTime && el.end > gameTime);
  }

  getNextWave(gameTime) {
    return this.waveConfig.find(el => el.start > gameTime);
  }

  getFallSpeed(enemyType) {
    let speed = this.scene.currentLevel.baseFallSpeed + Phaser.Math.RND.between(
      -this.scene.currentLevel.fallRange, this.scene.currentLevel.fallRange
    );

    if (enemyType === enemyTypes.sprinterZombie) {
      speed *= minigame.sprinterZombieSpeedModifier;
    } else if (enemyType === enemyTypes.bruiserZombie) {
      speed *= minigame.bruiserZombieSpeedModifier;
    }

    return speed;
  }

  getWordCount(enemyType) {
    if (enemyType === enemyTypes.bruiserZombie) {
      return minigame.bruiserZombieHealth;
    }

    return minigame.normalZombieHealth;
  }

  getRandomEnemyType(gameTime) {
    const wave = this.getCurrentWave(gameTime);
    const num = Phaser.Math.RND.between(1, 100);
    const enemy = wave.probabilities.find(c => c.min <= num && c.max >= num);
    // TODO: this will error if wave probability times aren't set correctly
    //       and there are no enemies.
    return enemy.enemyType;
  }
}
