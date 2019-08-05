import * as firebase from 'firebase/app';
import 'firebase/firestore';
import UnlockableManager from './UnlockableManager';

export default class {
  constructor(db) {
    this.db = db;
    this.unlockableManager = new UnlockableManager(db);
  }

  isNewGame() {
    if (!this.db.isUserLoggedIn()) {
      return true;
    }

    if (this.db.userProfileLoaded) {
      const completed = this.db.userProfile.stagesCompleted;
      return completed == null || completed.length === 0;
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
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
      return lesson.requirements.some(r => completed == null || !completed.includes(r));
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  isModalSeen(modalId) {
    if (!this.db.isUserLoggedIn()) {
      return false;
    }

    if (this.db.userProfileLoaded) {
      const seen = this.db.userProfile.modalsSeen;
      return seen != null && seen.includes(modalId);
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  getStageType(stageId) {
    return this.db.getStage(stageId).type;
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

  getModalsSeen() {
    if (!this.db.isUserLoggedIn()) {
      return [];
    }

    if (this.db.userProfileLoaded) {
      const modals = this.db.userProfile.modalsSeen;
      return modals != null ? modals : [];
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  getCompletedStages() {
    if (!this.db.isUserLoggedIn()) {
      return [];
    }

    if (this.db.userProfileLoaded) {
      const stages = this.db.userProfile.stagesCompleted;
      return stages != null ? stages : [];
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  getCompletedLessons() {
    if (!this.db.isUserLoggedIn()) {
      return [];
    }

    if (this.db.userProfileLoaded) {
      const lessons = this.db.userProfile.lessonsCompleted;
      return lessons != null ? lessons : [];
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  saveMapPosition(lessonId, stageId, callback) {
    const updateObject = { mapState: { lesson: lessonId, stage: stageId } };
    this.updateUserProfile(updateObject, callback);
  }

  saveStageCompleted(stageId, callback) {
    const lesson = this.db.getLessonForStage(stageId);
    const lessonCompleted = lesson.stages.every(s => s === stageId || this.isStageCompleted(s));
    const unlockedItems = this.unlockableManager.getUnlockedItemsForStage(stageId);
    const updateObject = { stagesCompleted: firebase.firestore.FieldValue.arrayUnion(stageId) };
    if (lessonCompleted) {
      updateObject.lessonsCompleted = firebase.firestore.FieldValue.arrayUnion(lesson.id);
      updateObject.mapState = { lesson: lesson.id, stage: null };
    }
    if (unlockedItems.length > 0) {
      updateObject.unlockedItems = firebase.firestore.FieldValue.arrayUnion(...unlockedItems);
    }
    this.updateUserProfile(updateObject, callback);
  }

  saveModalSeen(modalId, callback) {
    const updateObject = { modalsSeen: firebase.firestore.FieldValue.arrayUnion(modalId) };
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
