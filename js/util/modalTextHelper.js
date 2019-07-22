import { modalText } from '../config';

export default {
  getModalConfig: stageId => modalText.find(c => c.stage === stageId),
};
