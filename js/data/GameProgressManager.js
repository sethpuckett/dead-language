import * as firebase from 'firebase/app';
import 'firebase/firestore';
import UnlockableManager from './UnlockableManager';
import GameStatManager from '../gameStats/GameStatManager';
import { gameTypes } from '../config';
import { util } from '../util';

export default class {
  constructor(db) {
    this.db = db;
    this.unlockableManager = new UnlockableManager(db);
    this.statManager = new GameStatManager();
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

  getStats(stageId) {
    if (!this.db.isUserLoggedIn()) {
      return null;
    }

    if (this.db.userProfileLoaded) {
      const allStats = this.db.userProfile.stats;
      if (allStats == null) {
        return null;
      }
      return allStats.find(s => s.stageId === stageId) || null;
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

  isLessonUpcoming(lessonId) {
    if (!this.db.isUserLoggedIn()) {
      return false;
    }

    if (this.db.userProfileLoaded) {
      const lesson = this.db.getLesson(lessonId);
      const lessonLocked = this.isLessonLocked(lessonId);
      if (lessonLocked) {
        return lesson.requirements.some(r => !this.isLessonLocked(r));
      }

      return false;
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

  isWordInProblemVocab(wordEntry) {
    const problemEntry = this.getProblemEntry(wordEntry);
    const allProblemVocab = this.getProblemVocab();
    return allProblemVocab.some(v => v.stage === problemEntry.stage && v.id === problemEntry.id);
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

  getCompletedNonReviewStages() {
    const completedStages = this.getCompletedStages();
    return completedStages.filter(s => this.getStageType(s) !== gameTypes.zombieAssaultReview);
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

  getProblemVocab() {
    if (!this.db.isUserLoggedIn()) {
      return [];
    }

    if (this.db.userProfileLoaded) {
      const problemVocab = this.db.userProfile.problemVocab;
      return problemVocab != null ? problemVocab : [];
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  getVocabWord(stageId, id) {
    const stage = this.db.getStage(stageId);
    return stage.vocab.find(v => v.id === id);
  }

  saveMapPosition(lessonId, stageId, callback) {
    const updateObject = { mapState: { lesson: lessonId, stage: stageId } };
    this.updateUserProfile(updateObject, callback);
  }

  saveStageCompleted(stats, callback) {
    const lesson = this.db.getLessonForStage(stats.stageId);
    const lessonCompleted = lesson.stages.every(
      s => s === stats.stageId || this.isStageCompleted(s)
    );
    const unlockedItems = this.getAllUnlockedItems(stats.stageId);
    const updateObject = {
      stagesCompleted: firebase.firestore.FieldValue.arrayUnion(stats.stageId),
    };
    if (lessonCompleted) {
      updateObject.lessonsCompleted = firebase.firestore.FieldValue.arrayUnion(lesson.id);
      updateObject.mapState = { lesson: lesson.id, stage: null };
    }
    if (unlockedItems.length > 0) {
      updateObject.unlockedItems = firebase.firestore.FieldValue.arrayUnion(...unlockedItems);
    }
    this.updateUserProfile(updateObject, () => {
      this.saveStatsIfBetter(stats, callback);
    });
  }

  saveModalSeen(modalId, callback) {
    const updateObject = { modalsSeen: firebase.firestore.FieldValue.arrayUnion(modalId) };
    this.updateUserProfile(updateObject, callback);
  }

  addProblemVocab(wordEntry, callback) {
    const problemEntry = this.getProblemEntry(wordEntry);
    const updateObject = { problemVocab: firebase.firestore.FieldValue.arrayUnion(problemEntry) };
    this.updateUserProfile(updateObject, callback);
  }

  removeProblemVocab(wordEntry, callback) {
    const problemEntry = this.getProblemEntry(wordEntry);
    const updateObject = { problemVocab: firebase.firestore.FieldValue.arrayRemove(problemEntry) };
    this.updateUserProfile(updateObject, callback);
  }

  saveStatsIfBetter(stats, callback) {
    if (this.areStatsBetter(stats)) {
      const oldStats = this.getStats(stats.stageId);
      if (oldStats != null) {
        this.removeStats(oldStats, () => {
          this.saveNewStats(stats, callback);
        });
      } else {
        this.saveNewStats(stats, callback);
      }
    } else {
      callback(true);
    }
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

  getProblemEntry(wordEntry) {
    return { stage: wordEntry.stage, id: wordEntry.id };
  }

  getAllUnlockedItems(currentStageId = null) {
    const completedStages = this.getCompletedStages();
    let allUnlockedItems = completedStages.reduce((total, current) => {
      const combine = total.concat(this.unlockableManager.getUnlockedItemsForStage(current));
      return util.unique(combine);
    }, []);

    if (currentStageId != null) {
      allUnlockedItems = allUnlockedItems.concat(
        this.unlockableManager.getUnlockedItemsForStage(currentStageId)
      );
    }

    return allUnlockedItems;
  }

  areStatsBetter(newStats) {
    const oldStats = this.getStats(newStats.stageId);
    if (oldStats == null) {
      return true;
    }

    return this.statManager.isNewGradeBetter(newStats.grade, oldStats.grade);
  }

  removeStats(stats, callback) {
    const updateObject = { stats: firebase.firestore.FieldValue.arrayRemove(stats) };
    this.updateUserProfile(updateObject, callback);
  }

  saveNewStats(stats, callback) {
    const updateObject = { stats: firebase.firestore.FieldValue.arrayUnion(stats) };
    this.updateUserProfile(updateObject, callback);
  }
}
