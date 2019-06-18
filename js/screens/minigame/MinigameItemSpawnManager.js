import Phaser from 'phaser';
import { minigameItems } from '../../config';
import { gameConst } from '../../util';

export default class {
  /*
    itemConfig: {
      cashEnabled: bool
    }
  */
  constructor(scene, itemConfig, startTime = 0) {
    this.scene = scene;
    this.config = itemConfig;
    this.nextSpawnTime = startTime + this.getSpawnDelay();

    this.itemSlots = new Array(gameConst.MINIGAME_ITEM_SLOTS).fill(false);
  }

  /*
  return:
  {
    canSpawn: bool
    slotNumber: int
    item: minigameItem
  }
  */
  getItemSpawn(gameTime) {
    const itemSpawnConfig = {
      canSpawn: false,
    };
    if (this.nextSpawnTime <= gameTime) {
      itemSpawnConfig.canSpawn = true;
      itemSpawnConfig.slotNumber = 0; // TODO: randomize
      itemSpawnConfig.item = minigameItems.cash; // TODO: randomize

      this.nextSpawnTime = gameTime + this.getSpawnDelay();
    }
    return itemSpawnConfig;
  }

  releasePosition(position) {
    this.itemSlots[position] = false;
  }

  // Private

  getSpawnDelay() {
    return (this.config.baseSpawnRate + Phaser.Math.RND.between(
      -this.config.spawnRange, this.config.spawnRange
    )) / 1000;
  }
}
