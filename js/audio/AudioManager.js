import UserOptionsManager from '../data/UserOptionsManager';
import { audio } from '../config';

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

  playMusic(override = false) {
    if (this.optionsManager.musicEnabled() || override) {
      if (this.musicState === STOPPED) {
        this.music.play({ loop: true, delay: audio.musicDelay });
      } else if (this.musicState === PAUSED) {
        this.music.resume();
      }
      this.musicState = PLAYING;
    }
  }

  stopMusic() {
    this.music.stop();
    this.musicState = STOPPED;
  }

  pauseMusic() {
    if (this.musicState === PLAYING) {
      this.music.pause();
      this.musicState = PAUSED;
    }
  }

  playSound(key, override = false) {
    if (this.optionsManager.soundEffectsEnabled() || override) {
      this.sounds[key].play();
    }
  }
}
