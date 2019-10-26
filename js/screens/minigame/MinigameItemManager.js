import Phaser from 'phaser';
import { fonts, minigame, minigameItems, images, depth, animations, userOptions } from '../../config';
import { textHelper } from '../../util';
import UserOptionsManager from '../../data/UserOptionsManager';

const FOOD_TIER_1_TYPE_COUNT = 12;

export default class {
  constructor(scene) {
    this.scene = scene;

    this.userOptionsManager = new UserOptionsManager(this.scene.sys.game);

    this.items = [];
    this.destroyedItems = [];
  }

  spawnItem(spawnConfig) {
    const position = this.getSpawnPosition(spawnConfig.slotNumber);
    const imageConfig = this.getItemImageConfig(spawnConfig.itemType);
    const item = this.scene.add.sprite(
      position.x, position.y, imageConfig.image, imageConfig.frame
    );
    item.config = spawnConfig;
    item.itemType = spawnConfig.itemType;
    item.slotNumber = spawnConfig.slotNumber;
    item.word = spawnConfig.word;
    item.lifeTime = spawnConfig.lifeTime;
    item.warnTime = spawnConfig.warnTime;

    item.displayWidth = imageConfig.width;
    item.displayHeight = imageConfig.height;
    item.setOrigin(this.scene.ui.itemOriginX, this.scene.ui.itemOriginY);
    item.setDepth(depth.minigame.item);
    item.text = this.scene.add.bitmapText(
      item.x, item.y + item.height / 2 + this.scene.ui.itemWordBuffer,
      fonts.blueSky, item.word.language1,
      this.getFontSize()
    );
    item.text.setOrigin(this.scene.ui.itemWordOriginX, this.scene.ui.itemWordOriginY);
    item.text.setTintFill(minigame.fonts.itemTint);
    item.text.setDepth(depth.minigame.itemText);
    item.textBgGraphics = this.scene.add.graphics();
    item.textBgGraphics.fillStyle(minigame.ui.itemWordBgColor);
    item.textBgGraphics.setDepth(depth.minigame.itemTextBackground);
    item.textBgGraphics.fillRect(
      item.text.x - item.text.width / 2 - minigame.ui.itemWordBgPadding,
      item.text.y - minigame.ui.itemWordBgPadding,
      item.text.width + minigame.ui.itemWordBgPadding * 2,
      item.text.height + minigame.ui.itemWordBgPadding * 2
    );

    item.killTimer = this.scene.time.addEvent({
      delay: item.lifeTime,
      callback: this.destroyItem,
      args: [item],
      callbackScope: this,
    });

    item.warnTimer = this.scene.time.addEvent({
      delay: item.lifeTime - item.warnTime,
      callback: this.startWarningFlash,
      args: [item],
      callbackScope: this,
    });

    this.items.push(item);
    this.scene.audioManager.playSound(minigame.audio.soundEffects.itemSpawn);
  }

  checkGuess(text) {
    const guess = textHelper.cleanText(text);
    let foundIndex = -1;
    let foundItemConfig = null;

    foundIndex = this.items.findIndex(item => guess === textHelper.cleanText(item.word.language2));

    // only check alternatives if no match found in main answer
    if (foundIndex < 0) {
      foundIndex = this.items.findIndex((i) => {
        const alternatives = i.word.alternatives != null
          ? i.word.alternatives.map(w => textHelper.cleanText(w)) : null;
        return alternatives != null && alternatives.includes(guess);
      });
    }

    if (foundIndex >= 0) {
      foundItemConfig = this.items[foundIndex].config;
      this.destroyItem(this.items[foundIndex]);
      this.showItemPop(foundItemConfig);
    }

    return foundItemConfig;
  }

  clearDestroyedItems() {
    const retVal = this.destroyedItems;
    this.destroyedItems = [];
    return retVal;
  }

  // Private
  showItemPop(itemConfig) {
    const position = this.getSpawnPosition(itemConfig.slotNumber);
    const pop = this.scene.add.sprite(position.x, position.y, images.popWhite);
    pop.setDepth(depth.minigame.itemPop);
    pop.setOrigin(this.scene.ui.itemPopOrigin);
    pop.displayWidth = this.scene.ui.itemPopWidth;
    pop.displayHeight = this.scene.ui.itemPopWidth;
    pop.on('animationcomplete', (_a, _f, s) => s.destroy(), this);
    pop.play(animations.popWhitePop);
  }

  getSpawnPosition(slotNumber) {
    switch (slotNumber) {
      case 0:
        return { x: this.scene.ui.itemLeftX, y: this.scene.ui.itemRow1Y };
      case 1:
        return { x: this.scene.ui.itemLeftX, y: this.scene.ui.itemRow2Y };
      case 2:
        return { x: this.scene.ui.itemLeftX, y: this.scene.ui.itemRow3Y };
      case 3:
        return { x: this.scene.ui.itemLeftX, y: this.scene.ui.itemRow4Y };
      case 4:
        return { x: this.scene.ui.itemRightX, y: this.scene.ui.itemRow1Y };
      case 5:
        return { x: this.scene.ui.itemRightX, y: this.scene.ui.itemRow2Y };
      case 6:
        return { x: this.scene.ui.itemRightX, y: this.scene.ui.itemRow3Y };
      case 7:
        return { x: this.scene.ui.itemRightX, y: this.scene.ui.itemRow4Y };
      default:
        throw Error('invalid slot number');
    }
  }

  // returns { image: image, frame: int, width: int, height: int }
  getItemImageConfig(minigameItem) {
    switch (minigameItem) {
      case minigameItems.cash:
        return {
          image: images.cash,
          frame: 0,
          width: this.scene.ui.itemWidth,
          height: this.scene.ui.itemHeight,
        };
      case minigameItems.foodTier1:
        return {
          image: images.foodTier1,
          frame: Phaser.Math.RND.between(0, FOOD_TIER_1_TYPE_COUNT - 1),
          width: this.scene.ui.itemWidth,
          height: this.scene.ui.itemHeight,
        };
      case minigameItems.shotgun:
        return {
          image: images.shotgun,
          frame: images.frames.shotgunNormal,
          width: this.scene.ui.shotgunWidth,
          height: this.scene.ui.shotgunHeight,
        };
      default:
        throw Error('invalid minigameItem');
    }
  }

  startWarningFlash(item) {
    item.flashTimer = this.scene.time.addEvent({
      delay: minigame.itemFlashDelay,
      callback: (i) => { i.visible = !i.visible; },
      args: [item],
      callbackScope: this,
      repeat: -1,
    });
  }

  destroyItem(item) {
    this.destroyedItems.push(item.config);
    const foundIndex = this.items.findIndex(i => i === item);
    this.items.splice(foundIndex, 1);

    item.text.destroy();
    item.textBgGraphics.destroy();
    item.killTimer.destroy();
    item.warnTimer.destroy();
    if (item.flashTimer != null) {
      item.flashTimer.destroy();
    }
    item.destroy();
  }

  getFontSize() {
    const sizeOption = this.userOptionsManager.getOptionValue(userOptions.textSize);
    return sizeOption === userOptions.values.normal
      ? minigame.fonts.itemSize : minigame.fonts.itemSizeLarge;
  }
}
