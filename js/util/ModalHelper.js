/* eslint-disable arrow-body-style */
import { modalText, modalChecks } from '../config';
import GameProgressManager from '../data/GameProgressManager';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.progressManager = new GameProgressManager(this.scene.sys.game.db);
  }

  getModalConfig(modalId) {
    return modalText.find(m => m.id === modalId);
  }

  getModalConfigByConditions(screen, stageId = null, won = false) {
    const potentials = this.getPotentialModals(screen);

    return potentials.find((potential) => {
      return potential.checks.every(c => this.passesCheck(c, stageId, won));
    });
  }

  // Private

  getPotentialModals(screen) {
    const seenModals = this.progressManager.getModalsSeen();
    return modalText.filter(
      m => m.screen === screen
      && (m.repeat || !seenModals.includes(m.id))
    );
  }

  passesCheck(check, stageId, won) {
    if (check.checkType === modalChecks.onStage) {
      return check.checkValue === stageId;
    }

    if (check.checkType === modalChecks.completedStageCount) {
      const completedStages = this.progressManager.getCompletedStages();
      return check.checkValue === completedStages.length;
    }

    if (check.checkType === modalChecks.stageWon) {
      return won;
    }

    if (check.checkType === modalChecks.stageLost) {
      return !won;
    }

    return false;
  }
}
