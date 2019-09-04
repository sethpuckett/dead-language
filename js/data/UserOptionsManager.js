import 'firebase/firestore';
import { userOptions } from '../config';

const VALID_KEYS = [
  userOptions.music, userOptions.soundEffects, userOptions.textSize, userOptions.blood,
];

export default class {
  constructor(db) {
    this.db = db;
  }

  musicEnabled() {
    return this.getOptionValue(userOptions.music) === userOptions.values.on;
  }

  soundEffectsEnabled() {
    return this.getOptionValue(userOptions.soundEffects) === userOptions.values.on;
  }

  getOptionValue(key) {
    if (!VALID_KEYS.includes(key)) {
      throw Error(`Invalid option key: ${key}`);
    }

    let value = userOptions.defaults[key];

    if (this.db.isUserLoggedIn() && this.db.userProfileLoaded) {
      const options = this.db.userProfile.options;
      if (options != null) {
        value = options[key];
      }
    }

    return value;
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
        music: options.find(o => o.key === userOptions.music).value,
        soundEffects: options.find(o => o.key === userOptions.soundEffects).value,
        textSize: options.find(o => o.key === userOptions.textSize).value,
        blood: options.find(o => o.key === userOptions.blood).value,
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
