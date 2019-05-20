import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { database } from '../config';

export default class {
  constructor() {
    firebase.initializeApp(database.firestoreConfig);
    this.db = firebase.firestore();

    this.lessonsLoaded = false;
  }

  loadLessons(callback, context) {
    this.db.collection('lessons').get().then((collection) => {
      this.lessons = collection;
      this.lessonsLoaded = true;
      callback.call(context);
    });
  }

  getLesson(id) {
    if (this.lessonsLoaded) {
      return this.lessons.docs.find(d => d.id === id).data();
    }
    throw Error('lessons have not been loaded. Call loadLessons() first');
  }
}
