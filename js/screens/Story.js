import Phaser from 'phaser';
import { images, depth, story, screens } from '../config';
import storyUiHelper from './ui/storyUiHelper';
import MultiModal from './modal/MultiModal';
import AudioManager from '../audio/AudioManager';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.story });
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

    this.audioManager = new AudioManager(this);

    this.modalConfig = params.modalConfig;
    this.nextScreen = params.nextScreen;
  }

  create() {
    this.ui = storyUiHelper(this.sys.game.config);
    this.createBackground();
    this.createAudio();
    this.createModal();

    this.audioManager.playMusic();
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

  createAudio() {
    this.audioManager.setMusic(story.audio.backgroundMusic);
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
      this.audioManager.stopMusic();
      this.scene.start(this.nextScreen);
    }
  }
}
