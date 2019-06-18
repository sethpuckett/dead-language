import { minigameItems, images } from '../../config';

export default class {
  constructor(scene) {
    this.scene = scene;

    this.items = [];
  }

  spawnItem(spawnConfig) {
    const position = this.getSpawnPosition(spawnConfig.slotNumber);
    const image = this.getItemImage(spawnConfig.item);
    const item = this.scene.add.sprite(position.x, position.y, image);
    item.setScale(1.5); // TODO: don't hard code this
    this.items.push(item);
  }

  // Private
  getSpawnPosition(slotNumber) {
    const position = { x: 20, y: 20 };

    return position;
  }

  getItemImage(minigameItem) {
    switch (minigameItem) {
      case minigameItems.cash:
        return images.cash; // TODO: add cash image
      default:
        throw Error('invalid minigameItem');
    }
  }
}
