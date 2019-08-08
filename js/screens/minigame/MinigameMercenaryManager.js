import { minigame, images } from '../../config';

export default class {
  constructor(scene) {
    this.scene = scene;
  }

  checkGuess(guess, canAfford) {
    const mercAttempt = this.scene.zombieManager.checkMercenary(guess, canAfford);
    if (mercAttempt) {
      this.setStatus(canAfford);
      if (canAfford) {
        this.scene.cash -= this.scene.currentLevel.mercenaryCost;
        this.scene.hudManager.setCash(this.scene.cash);
      }
    }
    return mercAttempt;
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
