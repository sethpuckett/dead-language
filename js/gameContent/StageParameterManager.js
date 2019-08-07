import Phaser from 'phaser';
import { stageParameters, stageParameterMap, stageWaves } from '../config';

export default class {
  getParameters(stageId) {
    const baseParams = this.getBaseParams(stageId);
    return this.buildParameters(baseParams);
  }

  // Private

  buildParameters(baseParams) {
    const params = { ...baseParams };
    const waveConfig = this.getWaves(params.waveId);
    params.waves = waveConfig.waves;
    return params;
  }

  getBaseParams(stageId) {
    const paramMap = stageParameterMap.find(p => p.stage === stageId);
    if (paramMap == null) {
      throw Error(`No stage parameters available for stageId: ${stageId}`);
    }
    const paramId = this.getRandomParameterId(paramMap.availableParameters);
    const baseParams = stageParameters.find(p => p.id === paramId);
    if (baseParams == null) {
      throw Error(`No stage parameters found with id: ${paramId}`);
    }
    return baseParams;
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
