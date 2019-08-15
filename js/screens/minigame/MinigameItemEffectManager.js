import { minigame, minigameItems, weapons } from '../../config';

export default class {
  constructor(scene) {
    this.scene = scene;
  }

  applyItem(itemType) {
    switch (itemType) {
      case minigameItems.cash:
        this.scene.cash += this.scene.stageParameters.items.cashAmount;
        this.scene.hudManager.setCash(this.scene.cash);
        this.scene.statusManager.setStatus({
          message: minigame.statusMessages.cashReceived,
          displayTime: minigame.statusTime,
        });
        break;
      case minigameItems.foodTier1:
        this.scene.changeHealth(this.scene.stageParameters.items.foodTier1HealAmount);
        this.scene.statusManager.setStatus({
          message: minigame.statusMessages.foodTier1Received,
          displayTime: minigame.statusTime,
        });
        break;
      case minigameItems.shotgun:
        this.scene.weapon = weapons.shotgun;
        this.scene.ammo = this.scene.stageParameters.weapons.shotgunAmmo;
        this.scene.maxAmmo = this.scene.stageParameters.weapons.shotgunAmmo;
        this.scene.hudManager.setWeapon(weapons.shotgun, this.scene.ammo);
        break;
      default:
        throw Error('invalid itemType');
    }
  }
}
