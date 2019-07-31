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
    const potentialModals = this.getPotentialModals(screen);

    let modal = potentialModals.find((potential) => {
      return potential.checks.every(c => this.passesCheck(c, stageId, won, false));
    });

    // if no potentials match, check for default modal
    if (modal == null) {
      modal = potentialModals.find((potential) => {
        return potential.checks.every(c => this.passesCheck(c, stageId, won, true));
      });
    }

    return modal;
  }

  // Private

  getPotentialModals(screen) {
    const seenModals = this.progressManager.getModalsSeen();
    return modalText.filter(
      m => m.screen === screen
      && (m.repeat || !seenModals.includes(m.id))
    );
  }

  passesCheck(check, stageId, won, includeDefault) {
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

    if (check.checkType === modalChecks.stageCompleted) {
      const completedStages = this.progressManager.getCompletedStages();
      return completedStages.includes(check.checkValue);
    }

    if (check.checkType === modalChecks.lessonCompleted) {
      const completedLessons = this.progressManager.getCompletedLessons();
      return completedLessons.includes(check.checkValue);
    }

    if (check.checkType === modalChecks.gameType) {
      if (stageId == null) {
        return false;
      }

      const stageType = this.progressManager.getStageType(stageId);
      return stageType === check.checkValue;
    }

    if (check.checkType === modalChecks.default) {
      return includeDefault;
    }

    throw Error(`Unsupported check type: ${check.checkType}`);
  }

  getDefaultModal(screen) {
    return modalText.find(
      m => m.screen === screen && m.checks.some(c => c.checkType === modalChecks.default)
    );
  }
}
