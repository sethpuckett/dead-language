import 'firebase/firestore';

const MUSIC = 'music';
const MUSIC_DEFAULT = 'On';
const SOUND_EFFECTS = 'sound-effects';
const SOUND_EFFECTS_DEFAULT = 'On';
const TEXT_SIZE = 'text-size';
const TEXT_SIZE_DEFAULT = 'Normal';
const BLOOD = 'blood';
const BLOOD_DEFAULT = 'Red';
const VALID_KEYS = [MUSIC, SOUND_EFFECTS, TEXT_SIZE, BLOOD];

export default class {
  constructor(db) {
    this.db = db;

    this.defaults = {};
    this.defaults[MUSIC] = MUSIC_DEFAULT;
    this.defaults[SOUND_EFFECTS] = SOUND_EFFECTS_DEFAULT;
    this.defaults[TEXT_SIZE] = TEXT_SIZE_DEFAULT;
    this.defaults[BLOOD] = BLOOD_DEFAULT;
  }

  getOptionValue(key) {
    if (!VALID_KEYS.includes(key)) {
      throw Error(`Invalid option key: ${key}`);
    }
    if (!this.db.isUserLoggedIn()) {
      return false;
    }

    if (this.db.userProfileLoaded) {
      const options = this.db.userProfile.options;
      let value = null;
      if (options != null) {
        value = options[key];
      }
      if (value == null) {
        return this.defaults[key];
      }
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  // options: [{ key: string, value: string }, ...]
  setOptions(options, callback) {
    options.forEach((option) => {
      if (!VALID_KEYS.includes(option.key)) {
        throw Error(`Invalid option key: ${option.key}`);
      }
    });
    VALID_KEYS.forEach((key) => {
      if (options.find(o => o.key === key) == null) {
        throw Error(`Missing option key: ${key}`);
      }
    });

    const updateObject = {
      options: {
        music: options.find(o => o.key === MUSIC).value,
        soundEffects: options.find(o => o.key === SOUND_EFFECTS).value,
        textSize: options.find(o => o.key === TEXT_SIZE).value,
        blood: options.find(o => o.key === BLOOD).value,
      },
    };
    this.updateUserProfile(updateObject, callback);
  }

  // Private

  // callback will be passed true if data saves, false otherwise
  updateUserProfile(updateObject, callback) {
    const user = this.db.getCurrentUserProfile();
    if (user != null) {
      user.update(updateObject).then(() => {
        this.db.loadUserProfile(() => {
          if (callback != null) {
            callback(true);
          }
        }, this);
      });
    } else if (callback != null) {
      callback(false);
    }
  }
}
