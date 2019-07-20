import Modal from './Modal';

export default class {
  constructor(scene, textContent) {
    this.scene = scene;
    this.textContent = textContent;

    this.modalCount = this.textContent.length;
    this.modalIndex = 0;
  }

  draw() {
    this.modal = new Modal(this.scene, this.textContent[this.modalIndex]);
    this.modal.draw();
    this.modal.enableInputClose();
    this.modal.setCloseCallback((keyCode) => {
      this.modal.disableInputHandling();
      if (this.modalIndex < this.modalCount - 1) {
        this.modalIndex += 1;
        this.draw();
      } else {
        this.closeCallback(keyCode);
      }
    }, this);
  }

  setCloseCallback(callback) {
    this.closeCallback = callback.bind(this.scene);
  }
}
