import { images } from '../../config';
import vocabStudyUiHelper from '../ui/vocabStudyUiHelper';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.ui = vocabStudyUiHelper(this.scene.sys.game.config);
  }
}
