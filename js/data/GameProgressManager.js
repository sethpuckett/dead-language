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

  isLessonLocked(lessonId) {
    if (!this.db.isUserLoggedIn()) {
      return true;
    }

    if (this.db.userProfileLoaded) {
      const completed = this.db.userProfile.lessonsCompleted;
      const lesson = this.db.getLesson(lessonId);
      // has player completed every required lesson
      return lesson.requirements.some(r => !completed.includes(r));
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  getStageType(stageId) {
    return this.db.getStage(stageId).type;
  }

  isStageUnlocked(stageId) {
    const lesson = this.db.getLessonForStage(stageId);
    for (let i = 0; i < lesson.stages.length; i += 1) {
      const sid = lesson.stages[i];
      if (sid === stageId) {
        return true;
      }

      if (!this.isStageCompleted(sid)) {
        return false;
      }
    }

    return false;
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
