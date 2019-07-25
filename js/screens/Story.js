import Phaser from 'phaser';
import { images, depth, story } from '../config';
import storyUiHelper from './ui/storyUiHelper';
import MultiModal from './modal/MultiModal';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Story' });
  }

  /*
    params: {
      modalConfig,
      nextScreen
    }
  */
  init(params) {
    if (params.modalConfig == null || params.nextScreen == null) {
      throw Error('Story screen requires modalConfig and nextScreen init params');
    }

    this.modalConfig = params.modalConfig;
    this.nextScreen = params.nextScreen;
  }

  create() {
    this.ui = storyUiHelper(this.sys.game.config);
    this.createBackground();
    this.createModal();
  }

  createBackground() {
    this.background = this.add.sprite(
      this.ui.backgroundImageX,
      this.ui.backgroundImageY,
      images.storyScreenBackground
    );
    this.background.displayWidth = this.ui.backgroundImageWidth;
    this.background.displayHeight = this.ui.backgroundImageHeight;
    this.background.setOrigin(this.ui.backgroundImageOriginX, this.ui.backgroundImageOriginY);
    this.background.setDepth(depth.story.background);
  }

  createModal() {
    this.modal = new MultiModal(this, this.modalConfig.text, false);
    this.modal.draw();
    this.modal.setCloseCallback(() => {
      this.cameras.main.fade(story.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
    });
  }


  fadeCallback(_camera, progress) {
    if (progress === 1) {
      this.scene.start(this.nextScreen);
    }
  }
}
