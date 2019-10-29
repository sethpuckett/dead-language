import Phaser from 'phaser';
import { images, fonts, screens } from '../config';
import LogInState from '../data/LoginState';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.boot });
  }

  preload() {
    this.startOnLoadComplete = false;

    this.load.bitmapFont(fonts.blueSky, fonts.files.blueSkyPng, fonts.files.blueSkyFnt);
    this.load.bitmapFont(fonts.verdana, fonts.files.verdanaPng, fonts.files.verdanaFnt);

    this.load.image(images.titleScreenBackground, images.files.titleScreenBackground);

    this.sys.game.db.loadUserProfile(this.onProfileLoad, this);
  }

  create() {
    if (this.nextScene != null) {
      this.startNextScene();
    } else {
      this.startOnLoadComplete = true;
    }
  }

  onProfileLoad(loginState) {
    if (loginState === LogInState.REGISTERING) {
      this.nextScene = screens.registration;
    } else {
      this.nextScene = screens.loading;
    }

    if (this.startOnLoadComplete) {
      this.startNextScene();
    }
  }

  startNextScene() {
    this.scene.start(this.nextScene);
  }
}
