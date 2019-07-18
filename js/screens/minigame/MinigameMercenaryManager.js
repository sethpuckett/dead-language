import { minigame, images } from '../../config';

export default class {
  constructor(scene) {
    this.scene = scene;
  }

  checkGuess(guess) {
    let mercKill = false;
    const canUseMercenary = this.scene.cash >= this.scene.currentLevel.mercenaryCost;
    const mercenaryAttempt = this.scene.zombieManager.checkMercenary(guess, canUseMercenary);
    if (mercenaryAttempt) {
      this.setStatus(canUseMercenary);
      if (canUseMercenary) {
        mercKill = true;
        this.scene.cash -= this.scene.currentLevel.mercenaryCost;
        this.scene.hudManager.setCash(this.scene.cash);
      }
    }
    return mercKill;
  }

  setStatus(canUse) {
    if (canUse) {
      this.scene.statusManager.setStatus({
        image: images.mercenary,
        frame: images.frames.mercenaryStatusShoot,
        message: minigame.statusMessages.useMercenary,
        displayTime: minigame.statusTime,
      });
    } else {
      this.scene.statusManager.setStatus({
        image: images.mercenary,
        frame: images.frames.mercenaryStatusRefuse,
        message: minigame.statusMessages.mercenaryUnavailable,
        displayTime: minigame.statusTime,
      });
    }
  }
}
