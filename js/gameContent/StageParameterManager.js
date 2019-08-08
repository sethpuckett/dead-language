import Phaser from 'phaser';
import { stageParameters, stageParameterMap, stageWaves } from '../config';

const BASE = 'base';

export default class {
  getParameters(stageId) {
    const stageParams = this.getStageParams(stageId);
    return this.buildParameters(stageParams);
  }

  // Private

  buildParameters(stageParams) {
    const baseParams = stageParameters.find(p => p.id === BASE);
    const params = { ...baseParams, ...stageParams };
    const waveConfig = this.getWaves(params.waveId);
    params.waves = waveConfig.waves;
    return params;
  }

  getStageParams(stageId) {
    const paramMap = stageParameterMap.find(p => p.stage === stageId);
    if (paramMap == null) {
      throw Error(`No stage parameters available for stageId: ${stageId}`);
    }
    const paramId = this.getRandomParameterId(paramMap.availableParameters);
    const stageParams = stageParameters.find(p => p.id === paramId);
    if (stageParams == null) {
      throw Error(`No stage parameters found with id: ${paramId}`);
    }
    return stageParams;
  }

  getWaves(waveId) {
    const waves = stageWaves.find(w => w.id === waveId);
    if (waves == null) {
      throw Error(`Invalid waveId: ${waveId}`);
    }
    return waves;
  }

  getRandomParameterId(availableParameters) {
    return Phaser.Math.RND.pick(availableParameters);
  }
}
