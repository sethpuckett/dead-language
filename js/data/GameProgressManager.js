import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default class {
  constructor(db) {
    this.db = db;
  }

  // callback will be passed true if the data saves, false otherwise
  saveStageCompleted(stageId, callback) {
    const user = this.db.getCurrentUserProfile();
    if (user != null) {
      user.update(
        { stagesCompleted: firebase.firestore.FieldValue.arrayUnion(stageId) }
      ).then(() => {
        this.db.loadUserProfile();
        callback(true);
      });
    } else {
      callback(false);
    }
  }

  isStageCompleted(stageId) {
    if (!this.db.isUserLoggedIn()) {
      return false;
    }

    if (this.db.userProfileLoaded) {
      const completed = this.db.userProfile.stagesCompleted;
      return completed != null && completed.includes(stageId);
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  isReviewUnlocked(lessonId) {
    return false;
  }
}
