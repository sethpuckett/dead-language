import UserOptionsManager from '../data/UserOptionsManager';

const PLAYING = 'playing';
const STOPPED = 'stopped';
const PAUSED = 'paused';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.optionsManager = new UserOptionsManager(this.scene.sys.game.db);

    this.music = null;
    this.sounds = {};
    this.musicState = STOPPED;
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
      this.musicState = PLAYING;
    }
  }

  stopMusic() {
    this.music.stop();
    this.musicState = STOPPED;
  }

  pauseMusic() {
    this.music.pause();
    this.musicState = PAUSED;
  }

  resumeMusic() {
    if (this.musicState === STOPPED) {
      this.music.play({ loop: true });
    } else if (this.musicState === PAUSED) {
      this.music.resume();
    }
    this.musicState = PLAYING;
  }

  playSound(key) {
    if (this.optionsManager.soundEffectsEnabled()) {
      this.sounds[key].play();
    }
  }
}
