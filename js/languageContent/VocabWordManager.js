import Phaser from 'phaser';

export default class {
  constructor(content) {
    this.content = content;

    this.availableContent = [...this.content];
    this.returnedContent = [];
    this.reservedContent = [];
  }

  getRandomWord() {
    if (this.availableContent.length === 0) {
      if (this.returnedContent.length === 0) {
        // No content left; everything is reserved
        return null;
      }
      // No available content left; repopulate with returned content
      this.refreshContent();
    }

    const poolIndex = Phaser.Math.RND.between(0, this.availableContent.length - 1);
    const word = this.availableContent.splice(poolIndex, 1)[0];
    this.reservedContent.push(word);
    return word;
  }

  releaseWord(word) {
    const index = this.reservedContent.findIndex(r => r.id === word.id);
    this.returnedContent.push(this.reservedContent.splice(index, 1)[0]);
  }

  // word with gender in parenthesis
  l2WithGender(word) {
    if (word.gender != null) {
      return `${word.language2}(${word.gender})`;
    }
    return word.language2;
  }

  // Private

  // Move returned content to available content
  refreshContent() {
    this.availableContent = this.availableContent.concat(this.returnedContent);
    this.availableContent.sort((w1, w2) => w1.id - w2.id);
    this.returnedContent = [];
  }
}
