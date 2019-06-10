import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default class {
  constructor() {
    this.db = firebase.firestore();

    this.lessonsLoaded = false;
    this.stagesLoaded = false;
    this.userProfileLoaded = false;
  }

  isFullyLoaded() {
    return this.lessonsLoaded
      && this.stagesLoaded
      && (this.userProfileLoaded || !this.isUserLoggedIn());
  }

  loadLessons(callback, context) {
    this.db.collection('lessons').get().then((collection) => {
      this.lessons = collection;
      this.lessonsLoaded = true;
      callback.call(context);
    });
  }

  loadStages(callback, context) {
    this.db.collection('stages').get().then((collection) => {
      this.stages = collection;
      this.stagesLoaded = true;
      callback.call(context);
    });
  }

  loadUserProfile(callback, context) {
    if (!this.isUserLoggedIn()) {
      callback.call(context);
      return;
    }

    this.db.collection('users').doc(this.getCurrentUserId()).get().then((profile) => {
      this.userProfile = profile.data();
      this.userProfileLoaded = true;
      callback.call(context);
    });
  }

  getLesson(id) {
    if (this.lessonsLoaded) {
      const lesson = this.lessons.docs.find(d => d.id === id);
      if (lesson != null) {
        return lesson.data();
      }
      throw Error(`lesson with id ${id} was not found in the database.`);
    }
    throw Error('lessons have not been loaded. Call loadLessons() first');
  }

  getStage(id) {
    if (this.stagesLoaded) {
      const stage = this.stages.docs.find(d => d.id === id);
      if (stage != null) {
        return stage.data();
      }
      throw Error(`stage with id ${id} was not found in the database.`);
    }
    throw Error('stages have not been loaded. Call loadStages() first');
  }

  // callback will be passed true if the data saves, false otherwise
  saveStageCompleted(stageId, callback) {
    const user = this.getCurrentUserProfile();
    if (user != null) {
      user.update(
        { stagesCompleted: firebase.firestore.FieldValue.arrayUnion(stageId) }
      ).then(() => {
        this.loadUserProfile();
        callback(true);
      });
    } else {
      callback(false);
    }
  }

  isStageCompleted(stageId) {
    if (!this.isUserLoggedIn()) {
      return false;
    }

    if (this.userProfileLoaded) {
      const completed = this.userProfile.stagesCompleted;
      return completed != null && completed.includes(stageId);
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  isUserLoggedIn() {
    return this.getCurrentUser() != null;
  }

  // Private

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  getCurrentUserId() {
    const user = this.getCurrentUser();
    return user != null ? user.uid : null;
  }

  getCurrentUserProfile() {
    const userId = this.getCurrentUserId();
    return userId != null ? this.db.collection('users').doc(this.getCurrentUserId()) : null;
  }
}
