/* eslint-disable arrow-body-style */
import { modalText, modalChecks } from '../config';

export default {
  getOnStageModalConfig: (stageId) => {
    return modalText.find(c => c.stage === stageId && c.check === modalChecks.onStage);
  },
};
