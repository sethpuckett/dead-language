import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { gameTypes } from '../config';

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

  getStageType(stageId) {
    return this.db.getStage(stageId).type;
  }

  isReviewUnlocked(lessonId) {
    const lesson = this.db.getLesson(lessonId);
    return lesson.stages.every((sid) => {
      const gameType = this.db.getStage(sid).type;
      if (gameType !== gameTypes.zombieAssaultReview) {
        return this.isStageCompleted(sid);
      }
      return true;
    });
  }
}
