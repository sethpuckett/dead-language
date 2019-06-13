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
      const lesson = this.db.getLessonForStage(stageId);
      const lessonCompleted = lesson.stages.every(s => s === stageId || this.isStageCompleted(s));
      const updateObject = { stagesCompleted: firebase.firestore.FieldValue.arrayUnion(stageId) };
      if (lessonCompleted) {
        updateObject.lessonsCompleted = firebase.firestore.FieldValue.arrayUnion(lesson.id);
        updateObject.mapState = { lesson: lesson.id, stage: null };
      }
      user.update(updateObject).then(() => {
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

  isLessonCompleted(lessonId) {
    if (!this.db.isUserLoggedIn()) {
      return false;
    }

    if (this.db.userProfileLoaded) {
      const completed = this.db.userProfile.lessonsCompleted;
      return completed != null && completed.includes(lessonId);
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
      if (gameType !== gameTypes.zombieAssaultReview.id) {
        return this.isStageCompleted(sid);
      }
      return true;
    });
  }

  setMapPosition(lessonId, stageId, callback) {
    const user = this.db.getCurrentUserProfile();
    if (user != null) {
      user.update({ mapState: { lesson: lessonId, stage: stageId } }).then(() => {
        this.db.loadUserProfile();
        if (callback != null) {
          callback(true);
        }
      });
    } else if (callback != null) {
      callback(false);
    }
  }

  getMapPosition() {
    if (!this.db.isUserLoggedIn()) {
      return null;
    }

    if (this.db.userProfileLoaded) {
      return this.db.userProfile.mapState;
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }
}
