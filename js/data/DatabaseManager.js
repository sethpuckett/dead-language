import * as firebase from 'firebase/app';
import 'firebase/firestore';
import LoginState from './LoginState';

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
      if (callback != null) {
        callback.call(context);
      }
    });
  }

  loadStages(callback, context) {
    this.db.collection('stages').get().then((collection) => {
      this.stages = collection;
      this.stagesLoaded = true;
      if (callback != null) {
        callback.call(context);
      }
    });
  }

  // callback will be called with a LoginState value
  loadUserProfile(callback, context) {
    if (!this.isUserLoggedIn()) {
      if (callback != null) {
        callback.call(context, LoginState.LOGGED_OUT);
      }
      return;
    }

    this.db.collection('users').doc(this.getCurrentUserId()).get().then((profile) => {
      // user is logged in, but does not yet have an entry in the 'users' collection
      if (profile.data() == null) {
        if (callback != null) {
          callback.call(context, LoginState.REGISTERING);
        }
      } else {
        this.userProfile = profile.data();
        this.userProfileLoaded = true;
        if (callback != null) {
          callback.call(context, LoginState.LOGGED_IN);
        }
      }
    });
  }

  getLesson(id) {
    if (this.lessonsLoaded) {
      const lesson = this.lessons.docs.find(d => d.id === id);
      if (lesson != null) {
        const lessonData = lesson.data();
        lessonData.id = lesson.id;
        return lessonData;
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

  getLessonForStage(stageId) {
    if (this.lessonsLoaded && this.stagesLoaded) {
      const lesson = this.lessons.docs.find(doc => doc.data().stages.includes(stageId));
      const lessonData = lesson.data();
      lessonData.id = lesson.id;
      return lessonData;
    }
    throw Error('stages or lessons not loaded. Call loadLessons() and loadStages() first.');
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
