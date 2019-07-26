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

  getModalConfigByConditions(screen, stageId) {
    const potentials = this.getPotentialModals(screen);

    let modalConfig = this.getOnStageModalConfig(potentials, stageId);
    if (modalConfig != null) {
      return modalConfig;
    }

    const completedStages = this.progressManager.getCompletedStages();
    modalConfig = this.getCompletedStageCountModalConfig(potentials, completedStages.length);
    if (modalConfig != null) {
      return modalConfig;
    }

    return null;
  }

  // Private

  getPotentialModals(screen) {
    const seenModals = this.progressManager.getModalsSeen();
    return modalText.filter(
      m => m.screen === screen
      && (m.repeat || !seenModals.includes(m.id))
    );
  }

  getOnStageModalConfig(potentials, stageId) {
    return potentials.find(
      m => m.check === modalChecks.onStage
      && m.checkValue === stageId
    );
  }

  getCompletedStageCountModalConfig(potentials, completedStageCount) {
    return potentials.find(
      m => m.check === modalChecks.completedStageCount
      && completedStageCount >= m.checkValue
    );
  }
}
