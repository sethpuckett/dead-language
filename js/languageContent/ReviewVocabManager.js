import Phaser from 'phaser';
import GameProgressManager from '../data/GameProgressManager';

export default class {
  constructor(db, stageParameters) {
    this.db = db;
    this.stageParameters = stageParameters;
    this.gameProgressManager = new GameProgressManager(db);

    this.reservedWordIds = [];
  }

  getRandomReviewWord() {
    const shouldGetProblem = this.shouldGetProblemVocab();
    let word = null;
    if (shouldGetProblem) {
      word = this.getProblemVocab();
    }

    // if no word was retrieved or the problem word is already in play get a normal review word
    if (word == null || this.reservedWordIds.includes(word.id)) {
      word = this.getReviewVocab();
    }
    // Return null if we happen to get a duplicate; should be rare
    if (this.reservedWordIds.includes(word.id)) {
      return null;
    }

    word.review = true;
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

  // Private

  shouldGetProblemVocab() {
    const percentThreshold = this.stageParameters.enemies.problemVocabPercentage * 100;
    let should = Phaser.Math.RND.between(0, 99) < percentThreshold;
    if (this.gameProgressManager.getProblemVocab().length === 0) {
      should = false;
    }
    return should;
  }

  getProblemVocab() {
    let word = null;
    const problemEntries = this.gameProgressManager.getProblemVocab();
    if (problemEntries.length > 0) {
      const problemEntry = Phaser.Math.RND.pick(problemEntries);
      word = this.gameProgressManager.getVocabWord(problemEntry.stage, problemEntry.id);
    }
    return word;
  }

  getReviewVocab() {
    const completedStages = this.gameProgressManager.getCompletedNonReviewStages();
    if (completedStages == null || completedStages.length === 0) {
      return null;
    }

    const stageId = Phaser.Math.RND.pick(completedStages);
    const stageVocab = this.db.getStage(stageId).vocab;
    return Phaser.Math.RND.pick(stageVocab);
  }
}
