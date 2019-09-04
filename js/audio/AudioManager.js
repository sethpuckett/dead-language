import UserOptionsManager from '../data/UserOptionsManager';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.optionsManager = new UserOptionsManager(this.scene.sys.game.db);

    this.music = null;
    this.sounds = {};
  }

  setMusic(key) {
    this.music = this.scene.sound.add(key);
  }

  addSound(key) {
    this.sounds[key] = this.scene.sound.add(key);
  }

  playMusic() {
    if (this.optionsManager.musicEnabled()) {
      this.music.play({ loop: true });
    }
  }

  stopMusic() {
    this.music.stop();
  }

  playSound(key) {
    if (this.optionsManager.soundEffectsEnabled()) {
      this.sounds[key].play();
    }
  }
}
