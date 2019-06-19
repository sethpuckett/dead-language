import Phaser from 'phaser';
import { minigameItems } from '../../config';
import { gameConst } from '../../util';

export default class {
  /*
    itemConfig: {
      cashEnabled: bool
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
      const word = this.vocab.getRandomWord();
      if (word != null) {
        itemSpawnConfig.canSpawn = true;
        itemSpawnConfig.word = word;
        itemSpawnConfig.slotNumber = 0; // TODO: randomize
        itemSpawnConfig.item = minigameItems.cash; // TODO: randomize
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
}
