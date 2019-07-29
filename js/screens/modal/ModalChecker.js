import ModalHelper from '../../util/ModalHelper';
import MultiModal from './MultiModal';
import GameProgressManager from '../../data/GameProgressManager';

export default class {
  constructor(scene, stageId = null, won = false) {
    this.scene = scene;
    this.stageId = stageId;
    this.won = won;
    this.completedCallback = null;

    this.modalHelper = new ModalHelper(this.scene);
    this.progressManager = new GameProgressManager(this.scene.sys.game.db);
  }

  setBeforeStartCallback(callback, context = this.scene) {
    this.beforeStartCallback = callback.bind(context);
  }

  setCompletedCallback(callback, context = this.scene) {
    this.completedCallback = callback.bind(context);
  }

  checkModal() {
    const startModalConfig = this.getStartModal();
    if (startModalConfig != null) {
      this.createStartModal(startModalConfig);
    } else {
      this.complete();
    }
  }

  // Private

  getStartModal() {
    return this.modalHelper.getModalConfigByConditions(
      this.scene.scene.key, this.stageId, this.won
    );
  }

  createStartModal(modalConfig) {
    this.beforeStart();

    this.startModalConfig = modalConfig;
    this.startModal = new MultiModal(this.scene, modalConfig.text);
    this.startModal.draw();
    this.startModal.setCloseCallback(() => {
      this.progressManager.saveModalSeen(this.startModalConfig.id);
      this.complete();
    });
  }

  beforeStart() {
    if (this.beforeStartCallback != null) {
      this.beforeStartCallback();
    }
  }

  complete() {
    if (this.completedCallback != null) {
      this.completedCallback();
    }
  }
}
