import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { database } from '../config';

export default class {
  constructor() {
    firebase.initializeApp(database.firestoreConfig);
    this.db = firebase.firestore();
  }

  getLesson(lessonId, callback) {
    this.db.collection('lessons').doc(lessonId).get().then((doc) => {
      callback(doc.data());
    });
  }
}
