import { util } from '../../util';
import vocab from '../../vocab';
import { vocabStudy, fonts } from '../../config';
import VocabWordManager from '../../languageContent/VocabWordManager';
import vocabStudyUiHelper from '../ui/vocabStudyUiHelper';

const BIG_FONT_MAX_LENGTH = 24;
const DOT_COUNT_MODIFIER = 27;

export default class {
  constructor(scene) {
    this.scene = scene;
    this.vocab = new VocabWordManager(vocab.words); // TODO: words should be passed in to constructor
    this.ui = vocabStudyUiHelper(this.scene.sys.game.config);
  }

  createVocab() {
    this.language1Group = this.scene.add.group();
    this.language2Group = this.scene.add.group();
    this.dotsGroup = this.scene.add.group();
    this.entries = [];
    const vocabContent = [...this.vocab.content];
    util.shuffleArray(vocabContent);
    vocabContent.forEach((c, i) => {
      const textLength = c.language1.length + this.vocab.l2WithGender(c).length;
      const fontSize = textLength <= BIG_FONT_MAX_LENGTH
        ? vocabStudy.fonts.vocabSize : vocabStudy.fonts.vocabSizeSmall;
      const dotCount = Math.ceil(Math.max(DOT_COUNT_MODIFIER - textLength, 0) / 5);

      let vocab1X = 0;
      let vocab2X = 0;
      let yOffset = 0;

      if (i < 10) {
        vocab1X = this.ui.vocabLeft1X;
        vocab2X = this.ui.vocabLeft2X;
        yOffset = i;
      } else {
        vocab1X = this.ui.vocabRight1X;
        vocab2X = this.ui.vocabRight2X;
        yOffset = i - 10;
      }

      const l1 = this.scene.add.bitmapText(
        vocab1X,
        this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset),
        fonts.blueSkyWhite,
        c.language1,
        fontSize
      );
      l1.setOrigin(this.ui.vocab1OriginX, this.ui.vocab1OriginY);
      const l2 = this.scene.add.bitmapText(
        vocab2X,
        this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset),
        fonts.blueSkyWhite,
        this.vocab.l2WithGender(c),
        fontSize
      );
      l2.setOrigin(this.ui.vocab2OriginX, this.ui.vocab2OriginY);
      const dots = this.scene.add.bitmapText(
        (vocab1X + l1.width + vocab2X - l2.width) / 2,
        this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset),
        fonts.blueSkyWhite,
        ' . '.repeat(dotCount),
        vocabStudy.fonts.dotSize
      );
      dots.setOrigin(this.ui.dotsOriginX, this.ui.dotsOriginY);

      const entry = {
        word: c,
        language1: l1,
        language2: l2,
        dots,
      };

      this.language1Group.add(l1);
      this.language2Group.add(l2);
      this.dotsGroup.add(dots);
      this.entries.push(entry);
    });
  }

  clearAllTint() {
    this.entries.forEach((e) => {
      e.language1.clearTint();
      e.language2.clearTint();
      e.dots.clearTint();
    });
  }

  showEntryCorrect(word) {
    this.entries.some((entry) => {
      if (word.id === entry.word.id) {
        entry.language1.setTint(vocabStudy.fonts.practiceWordCorrectFill);
        entry.language1.visible = true;
        entry.language2.setTint(vocabStudy.fonts.practiceWordCorrectFill);
        entry.language2.visible = true;
        entry.dots.setTint(vocabStudy.fonts.practiceWordCorrectFill);
        entry.dots.visible = true;
        return true;
      }
      return false;
    });
  }

  showEntryWrong(word) {
    this.entries.some((entry) => {
      if (word.id === entry.word.id) {
        entry.language1.setTint(vocabStudy.fonts.practiceWordWrongFill);
        entry.language1.visible = true;
        entry.language2.setTint(vocabStudy.fonts.practiceWordWrongFill);
        entry.language2.visible = true;
        entry.dots.setTint(vocabStudy.fonts.practiceWordWrongFill);
        entry.dots.visible = true;
        return true;
      }
      return false;
    });
  }

  hideLanguage1() {
    this.language1Group.getChildren().forEach((t) => { t.visible = false; });
    this.dotsGroup.getChildren().forEach((t) => { t.visible = false; });
    this.language2Group.getChildren().forEach((t) => { t.visible = true; });
  }

  hideLanguage2() {
    this.language1Group.getChildren().forEach((t) => { t.visible = true; });
    this.dotsGroup.getChildren().forEach((t) => { t.visible = false; });
    this.language2Group.getChildren().forEach((t) => { t.visible = false; });
  }

  showAll() {
    this.language1Group.getChildren().forEach((t) => { t.visible = true; });
    this.dotsGroup.getChildren().forEach((t) => { t.visible = true; });
    this.language2Group.getChildren().forEach((t) => { t.visible = true; });
  }

  hideAll() {
    this.language1Group.getChildren().forEach((t) => { t.visible = false; });
    this.dotsGroup.getChildren().forEach((t) => { t.visible = false; });
    this.language2Group.getChildren().forEach((t) => { t.visible = false; });
  }
}
