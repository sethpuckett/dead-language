import Phaser from 'phaser';
import { gameConst } from '../../util';

export default class {
  /*
    itemConfig: {
      cashAmount: int,
      baseSpawnRate: int,
      spawnRange: int,
      lifeTime: int,
      warnTime: int,
      probabilities: {
        cash: int
        foodTier1: int
      },
    }
  */
  constructor(scene, itemConfig, vocabWordManager, startTime = 0) {
    this.scene = scene;
    this.config = itemConfig;
    this.vocab = vocabWordManager;
    this.nextSpawnTime = startTime + this.getSpawnDelay();

    this.itemSlots = new Array(gameConst.MINIGAME_ITEM_SLOTS).fill(false);
  }

  /*
  return:
  {
    canSpawn: bool
    slotNumber: int
    item: minigameItem
    word: Word
  }
  */
  getItemSpawn(gameTime) {
    const itemSpawnConfig = {
      canSpawn: false,
    };
    if (this.nextSpawnTime <= gameTime) {
      const slotNumber = this.getSlotNumber();
      if (slotNumber >= 0) {
        const word = this.vocab.getRandomWord();
        if (word != null) {
          itemSpawnConfig.canSpawn = true;
          itemSpawnConfig.word = word;
          itemSpawnConfig.slotNumber = slotNumber;
          itemSpawnConfig.lifeTime = this.config.lifeTime;
          itemSpawnConfig.warnTime = this.config.warnTime;
          itemSpawnConfig.itemType = this.getRandomItemType();
        }
      }

      this.nextSpawnTime = gameTime + this.getSpawnDelay();
    }
    return itemSpawnConfig;
  }

  releaseSlot(slotNumber) {
    this.itemSlots[slotNumber] = false;
  }

  // Private

  getSpawnDelay() {
    return (this.config.baseSpawnRate + Phaser.Math.RND.between(
      -this.config.spawnRange, this.config.spawnRange
    )) / 1000;
  }

  getSlotNumber() {
    // return -1 if no slots available
    if (this.itemSlots.every(s => s)) {
      return -1;
    }

    let slotNumber = 0;
    do {
      slotNumber = Phaser.Math.RND.between(0, gameConst.MINIGAME_ITEM_SLOTS - 1);
    } while (this.itemSlots[slotNumber]);
    this.itemSlots[slotNumber] = true;

    return slotNumber;
  }

  getRandomItemType() {
    const num = Phaser.Math.RND.between(1, 100);
    const item = this.config.probabilities.find(c => c.min <= num && c.max >= num);
    return item.itemType;
  }
}
