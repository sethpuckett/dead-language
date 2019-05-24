import Phaser from 'phaser';
import { townMap } from '../../config';
import HudStatusManager from '../HudStatusManager';
import HudManager from '../HudManager';
import Modal from '../Modal';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TownMap' });
  }

  init() {
    this.statusManager = new HudStatusManager(this);
    this.hudManager = new HudManager(this);
  }

  create() {
    this.hudManager.createHud({ ...townMap.ui.hudConfig });
    this.createStartModal();
  }

  update() {

  }

  createStartModal() {
    // TODO: disable map input handling
    this.modal = new Modal(this, townMap.modals.start);
    this.modal.draw();
    this.modal.enableInputClose();
    this.modal.setCloseCallback(() => {
      this.modal.disableInputHandling();
      // TODO: enable map input handling
    });
  }
}
