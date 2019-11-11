import { util } from '../../util';
import { vocabStudy, fonts } from '../../config';
import VocabWordManager from '../../languageContent/VocabWordManager';
import vocabStudyUiHelper from '../ui/vocabStudyUiHelper';
import UserOptionsManager from '../../data/UserOptionsManager';

const BIG_FONT_MAX_LENGTH = 21;
const DOT_COUNT_MODIFIER_PIXEL = 23;
const DOT_COUNT_MODIFIER_SMOOTH = 23;
const DOT_COUNT_DIVIDER_PIXEL = 3;
const DOT_COUNT_DIVIDER_SMOOTH = 2;


export default class {
  constructor(scene, vocab) {
    this.scene = scene;
    this.vocab = new VocabWordManager(vocab);
    this.ui = vocabStudyUiHelper(this.scene.sys.game.config);
    this.optionsManager = new UserOptionsManager(this.scene.sys.game);
  }

  createVocab() {
    this.language1Group = this.scene.add.group();
    this.language2Group = this.scene.add.group();
    this.dotsGroup = this.scene.add.group();
    this.entries = [];
    const vocabContent = [...this.vocab.content];
    util.shuffleArray(vocabContent);
    vocabContent.forEach((c, i) => {
      const length = c.language1.length + this.vocab.l2WithGender(c).length;
      const fontSize = this.getFontSize(length);
      const dotCount = Math.floor(
        Math.max((this.getDotModifier() - length) / this.getDotDivider(), 0)
      );

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
        this.optionsManager.getSelectedFont(),
        c.language1,
        fontSize
      );
      l1.setOrigin(this.ui.vocab1OriginX, this.ui.vocab1OriginY);
      l1.setTintFill(vocabStudy.fonts.vocabTint);
      const l2 = this.scene.add.bitmapText(
        vocab2X,
        this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset),
        this.optionsManager.getSelectedFont(),
        this.vocab.l2WithGender(c),
        fontSize
      );
      l2.setOrigin(this.ui.vocab2OriginX, this.ui.vocab2OriginY);
      l2.setTintFill(vocabStudy.fonts.vocabTint);
      const dots = this.scene.add.bitmapText(
        (vocab1X + l1.width + vocab2X - l2.width) / 2,
        this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset),
        this.optionsManager.getSelectedFont(),
        ' . '.repeat(dotCount),
        vocabStudy.fonts.dotSize
      );
      dots.setOrigin(this.ui.dotsOriginX, this.ui.dotsOriginY);
      dots.setTintFill(vocabStudy.fonts.vocabTint);

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
        entry.language1.setTintFill(vocabStudy.fonts.practiceWordCorrectTint);
        entry.language1.visible = true;
        entry.language2.setTintFill(vocabStudy.fonts.practiceWordCorrectTint);
        entry.language2.visible = true;
        entry.dots.setTintFill(vocabStudy.fonts.practiceWordCorrectTint);
        entry.dots.visible = true;
        return true;
      }
      return false;
    });
  }

  showEntryWrong(word) {
    this.entries.some((entry) => {
      if (word.id === entry.word.id) {
        entry.language1.setTintFill(vocabStudy.fonts.practiceWordWrongTint);
        entry.language1.visible = true;
        entry.language2.setTintFill(vocabStudy.fonts.practiceWordWrongTint);
        entry.language2.visible = true;
        entry.dots.setTintFill(vocabStudy.fonts.practiceWordWrongTint);
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

  getDotModifier() {
    const font = this.optionsManager.getSelectedFont();
    if (font === fonts.blueSky) {
      return DOT_COUNT_MODIFIER_PIXEL;
    }
    if (font === fonts.verdana) {
      return DOT_COUNT_MODIFIER_SMOOTH;
    }
    throw Error(`Invalid font: ${font}`);
  }

  getDotDivider() {
    const font = this.optionsManager.getSelectedFont();
    if (font === fonts.blueSky) {
      return DOT_COUNT_DIVIDER_PIXEL;
    }
    if (font === fonts.verdana) {
      return DOT_COUNT_DIVIDER_SMOOTH;
    }
    throw Error(`Invalid font: ${font}`);
  }

  getFontSize(textLength) {
    const useBigFont = textLength <= BIG_FONT_MAX_LENGTH;
    if (useBigFont) {
      return vocabStudy.fonts.vocabSize;
    }

    const font = this.optionsManager.getSelectedFont();
    if (font === fonts.blueSky) {
      return vocabStudy.fonts.vocabSizeSmallPixel;
    }
    if (font === fonts.verdana) {
      return vocabStudy.fonts.vocabSizeSmallSmooth;
    }
    throw Error(`Invalid font: ${font}`);
  }
}
