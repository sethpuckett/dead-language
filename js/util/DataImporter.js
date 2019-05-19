import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { database } from '../config';

export default class {
  constructor() {
    firebase.initializeApp(database.firestoreConfig);
    this.db = firebase.firestore();
  }

  addLesson(id, lesson) {
    return this.db.collection('lessons').doc(id).set(lesson).then(() => {
      console.log('Document successfully written!');
    })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}
