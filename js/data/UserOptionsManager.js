import 'firebase/firestore';
import { userOptions, fonts } from '../config';

const VALID_KEYS = [
  userOptions.music,
  userOptions.soundEffects,
  userOptions.font,
  userOptions.textSize,
  userOptions.blood,
];

export default class {
  constructor(game) {
    this.game = game;
    this.db = game.db;
  }

  musicEnabled() {
    return this.getOptionValue(userOptions.music) === userOptions.values.on;
  }

  soundEffectsEnabled() {
    return this.getOptionValue(userOptions.soundEffects) === userOptions.values.on;
  }

  getSelectedFont() {
    const selectedFontOption = this.getOptionValue(userOptions.font);
    if (selectedFontOption === userOptions.values.pixel) {
      return fonts.blueSky;
    }
    if (selectedFontOption === userOptions.values.smooth) {
      return fonts.verdana;
    }

    throw Error(`Invalid selected font option: ${selectedFontOption}`);
  }

  getSelectedFontScaleModifier() {
    const selectedFontOption = this.getOptionValue(userOptions.font);
    if (selectedFontOption === userOptions.values.pixel) {
      return userOptions.fontScales.pixel;
    }
    if (selectedFontOption === userOptions.values.smooth) {
      return userOptions.fontScales.smooth;
    }

    throw Error(`Invalid selected font option: ${selectedFontOption}`);
  }

  getOptionValue(key) {
    if (!VALID_KEYS.includes(key)) {
      throw Error(`Invalid option key: ${key}`);
    }

    let value = userOptions.defaults[key];
    let options = null;

    if (this.db.isUserLoggedIn() && this.db.userProfileLoaded) {
      options = this.db.userProfile.options;
    } else {
      options = this.getLocalUserOptions();
    }

    if (options != null && options[key] != null) {
      value = options[key];
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

    if (this.db.isUserLoggedIn() && this.db.userProfileLoaded) {
      this.savePersistedUserOptions(options, callback);
    } else {
      this.saveLocalUserOptions(options, callback);
    }
  }

  // Private

  getLocalUserOptions() {
    if (this.game.localUserOptions == null) {
      this.createLocalUserOptions();
    }

    return this.game.localUserOptions;
  }

  createLocalUserOptions() {
    this.game.localUserOptions = {
      music: userOptions.defaults[userOptions.music],
      soundEffects: userOptions.defaults[userOptions.soundEffects],
      font: userOptions.defaults[userOptions.font],
      textSize: userOptions.defaults[userOptions.textSize],
      blood: userOptions.defaults[userOptions.blood],
    };
  }

  saveLocalUserOptions(options, callback) {
    this.game.localUserOptions = {
      music: options.find(o => o.key === userOptions.music).value,
      soundEffects: options.find(o => o.key === userOptions.soundEffects).value,
      font: options.find(o => o.key === userOptions.font).value,
      textSize: options.find(o => o.key === userOptions.textSize).value,
      blood: options.find(o => o.key === userOptions.blood).value,
    };

    callback();
  }

  savePersistedUserOptions(options, callback) {
    const updateObject = {
      options: {
        music: options.find(o => o.key === userOptions.music).value,
        soundEffects: options.find(o => o.key === userOptions.soundEffects).value,
        font: options.find(o => o.key === userOptions.font).value,
        textSize: options.find(o => o.key === userOptions.textSize).value,
        blood: options.find(o => o.key === userOptions.blood).value,
      },
    };
    this.updateUserProfile(updateObject, callback);
  }

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
