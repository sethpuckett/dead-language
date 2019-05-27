import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default class {
  constructor() {
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
      const lesson = this.lessons.docs.find(d => d.id === id);
      if (lesson != null) {
        return lesson.data();
      }
      throw Error(`lesson with id ${id} was not found in the database.`);
    }
    throw Error('lessons have not been loaded. Call loadLessons() first');
  }
}
