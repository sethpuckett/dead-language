import { fonts, minigame, minigameItems, images, depth } from '../../config';

export default class {
  constructor(scene) {
    this.scene = scene;

    this.items = [];
  }

  spawnItem(spawnConfig) {
    const position = this.getSpawnPosition(spawnConfig.slotNumber);
    const image = this.getItemImage(spawnConfig.item);
    const item = this.scene.add.sprite(position.x, position.y, image);
    item.itemType = spawnConfig.item;
    item.slotNumber = spawnConfig.slotNumber;
    item.word = spawnConfig.word;

    item.displayWidth = this.scene.ui.itemWidth;
    item.displayHeight = this.scene.ui.itemWidth;
    item.setOrigin(this.scene.ui.itemOrigin);
    item.setDepth(depth.minigame.item);
    item.text = this.scene.add.bitmapText(
      item.x, item.y + item.height / 2 + this.scene.ui.itemWordBuffer,
      fonts.blueSkyWhite, item.word.language1,
      minigame.fonts.zombieSize
    );
    item.text.setOrigin(this.scene.ui.itemWordOriginX, this.scene.ui.itemWordOriginY);
    item.text.setTintFill(minigame.fonts.itemColor);
    item.text.setDepth(depth.minigame.itemText);
    // item.text.x = position.x - item.text.width / 2;
    item.wordBgGraphics = this.scene.add.graphics();
    item.wordBgGraphics.fillStyle(minigame.ui.itemWordBgColor);
    item.wordBgGraphics.setDepth(depth.minigame.itemTextBackground);
    item.wordBgGraphics.fillRect(
      item.text.x - item.text.width / 2 - minigame.ui.itemWordBgPadding,
      item.text.y - minigame.ui.itemWordBgPadding,
      item.text.width + minigame.ui.itemWordBgPadding * 2,
      item.text.height + minigame.ui.itemWordBgPadding * 2
    );

    this.items.push(item);
  }

  checkGuess(text) {
    const guess = text.toLowerCase().trim();
    let foundIndex = null;
    let foundItemType = null;

    foundIndex = this.items.findIndex(item => guess === item.word.language2);

    // only check alternatives if no match found in main answer
    if (foundIndex == null) {
      foundIndex = this.items.findIndex(
        i => i.word.alternatives != null && i.word.alternatives.includes(guess)
      );
    }

    if (foundIndex != null) {
      foundItemType = this.items[foundIndex].itemType;
      this.destroyItem(this.items[foundIndex]);
      this.items.splice(foundIndex, 1);
    }

    return foundItemType;
  }

  // Private
  getSpawnPosition(slotNumber) {
    const position = { x: 50, y: 100 };

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

  destroyItem(item) {
    // TODO: implement
  }
}
