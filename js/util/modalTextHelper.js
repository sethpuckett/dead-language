/* eslint-disable arrow-body-style */
import { modalText, modalChecks } from '../config';

export default {
  getModalConfig: modalId => modalText.find(m => m.id === modalId),

  getOnStageModalConfig: (stageId, seenModals) => {
    return modalText.find(
      c => c.stage === stageId
      && c.check === modalChecks.onStage
      && (c.repeat || !seenModals.includes(c.id))
    );
  },
};
