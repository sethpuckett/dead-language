import UserOptionsManager from '../data/UserOptionsManager';
import { audio } from '../config';
import { util } from '../util';

const INTRO_PLAYING = 'intro-playing';
const INTRO_PAUSED = 'intro-paused';
const PLAYING = 'playing';
const PAUSED = 'paused';
const STOPPED = 'stopped';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.optionsManager = new UserOptionsManager(this.scene.sys.game.db);

    this.musicIntro = null;
    this.music = null;
    this.sounds = {};
    this.musicState = STOPPED;
  }

  setMusicIntro(key, config) {
    if (key === audio.none) {
      return;
    }

    this.musicIntro = this.scene.sound.add(key, config);
  }

  setMusic(key, config) {
    if (key === audio.none) {
      return;
    }

    this.music = this.scene.sound.add(key, config);
  }

  addSound(key, config) {
    if (key === audio.none) {
      return;
    }

    this.sounds[key] = this.scene.sound.add(key, config);
  }

  addAllSounds(keys, configs) {
    const uniqueKeys = util.unique(Object.values(keys));
    uniqueKeys.forEach((key) => {
      const configEntry = configs != null ? configs.find(c => c.key === key) : null;
      const config = configEntry != null ? configEntry.value : null;
      this.addSound(key, config);
    });
  }

  playMusic(override = false) {
    if (this.optionsManager.musicEnabled() || override) {
      if (this.musicState === STOPPED) {
        if (this.musicIntro != null) {
          this.playMusicIntro();
        } else {
          this.playMainMusicLoop();
        }
      } else if (this.musicState === INTRO_PAUSED) {
        this.resumeMusicIntro();
      } else if (this.musicState === PAUSED) {
        this.resumeMainMusicLoop();
      }
    }
  }

  setMusicVolume(volume) {
    if (this.musicIntro != null) {
      this.musicIntro.setVolume(volume);
    }
    this.music.setVolume(volume);
  }

  stopMusic() {
    this.musicState = STOPPED;
    if (this.musicIntro != null) {
      this.musicIntro.stop();
    }
    this.music.stop();
  }

  pauseMusic() {
    if (this.musicState === INTRO_PLAYING) {
      this.pauseMusicIntro();
    } else if (this.musicState === PLAYING) {
      this.pauseMainMusicLoop();
    }
  }

  playSound(key, override = false) {
    if (key === audio.none) {
      return;
    }

    if (this.optionsManager.soundEffectsEnabled() || override) {
      this.sounds[key].play();
    }
  }

  // Private

  playMusicIntro() {
    this.musicIntro.on('complete', () => this.playMainMusicLoop());
    this.musicState = INTRO_PLAYING;
    this.musicIntro.play({ delay: audio.musicDelay });
  }

  resumeMusicIntro() {
    this.musicState = INTRO_PLAYING;
    this.musicIntro.resume();
  }

  pauseMusicIntro() {
    this.musicState = INTRO_PAUSED;
    this.musicIntro.pause();
  }

  playMainMusicLoop() {
    this.musicState = PLAYING;
    const musicDelay = this.musicIntro != null ? 0 : audio.musicDelay;
    this.music.play({ loop: true, delay: musicDelay });
  }

  resumeMainMusicLoop() {
    this.musicState = PLAYING;
    this.music.resume();
  }

  pauseMainMusicLoop() {
    this.musicState = PAUSED;
    this.music.pause();
  }
}
