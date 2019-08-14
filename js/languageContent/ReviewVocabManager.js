import Phaser from 'phaser';
import GameProgressManager from '../data/GameProgressManager';

export default class {
  constructor(db) {
    this.db = db;
    this.gameProgressManager = new GameProgressManager(db);

    this.reservedWordIds = [];
  }

  getRandomReviewWord() {
    const completedStages = this.gameProgressManager.getCompletedNonReviewStages();
    if (completedStages == null || completedStages.length === 0) {
      return null;
    }

    const stageId = Phaser.Math.RND.pick(completedStages);
    const stageVocab = this.db.getStage(stageId).vocab;
    const word = Phaser.Math.RND.pick(stageVocab);
    word.review = true;

    // Return null if we happen to get a duplicate; should be rare
    if (this.reservedWordIds.includes(word.id)) {
      return null;
    }

    this.reservedWordIds.push(word.id);
    return word;
  }

  releaseWord(word) {
    if (word == null) {
      return;
    }

    if (word.missed) {
      this.addProblemWord(word);
    } else {
      this.removeProblemWord(word);
    }

    const index = this.reservedWordIds.findIndex(r => r === word.id);
    if (index > -1) {
      this.reservedWordIds.splice(index, 1);
    }
  }

  addProblemWord(word) {
    if (!this.gameProgressManager.isWordInProblemVocab(word)) {
      this.gameProgressManager.addProblemVocab(word);
    }
  }

  removeProblemWord(word) {
    if (this.gameProgressManager.isWordInProblemVocab(word)) {
      this.gameProgressManager.removeProblemVocab(word);
    }
  }
}
