import Phaser from 'phaser';
import vocab from '../vocab';
import { fonts, images, vocabStudy } from '../config';
import vocabStudyUiHelper from './ui/vocabStudyUiHelper';
import VocabWordManager from '../languageContent/VocabWordManager';
import HudManager from './HudManager';

const BIG_FONT_MAX_LENGTH = 24;
const DOT_COUNT_MODIFIER = 30;

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'VocabStudy' });
  }

  init() {
    this.ui = vocabStudyUiHelper(this.sys.game.config);
    this.vocab = new VocabWordManager(vocab.words);
    this.hudManager = new HudManager(this);
  }

  create() {
    this.hudManager.createHud(vocabStudy.ui.hudConfig);
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.createBackground();
    this.createVocab();
  }

  createBackground() {
    this.background = this.add.tileSprite(
      this.ui.grassX, this.ui.grassY,
      this.ui.grassWidth,
      this.ui.grassHeight,
      images.grass,
    );
    this.background.setOrigin(this.ui.grassOriginX, this.ui.grassOriginY);

    this.crate = this.add.sprite(
      this.ui.crateX,
      this.ui.crateY,
      images.crate
    );
    this.crate.setOrigin(this.ui.crateOriginX, this.ui.crateOriginY);
    this.crate.setScale(images.scales.crate);

    this.bottle = this.add.sprite(
      this.ui.bottleX,
      this.ui.bottleY,
      images.bottle1
    );
    this.bottle.setOrigin(this.ui.bottleOriginX, this.ui.bottleOriginY);
    this.bottle.setScale(images.scales.bottle1);
  }

  createVocab() {
    this.vocab.content.forEach((c, i) => {
      const textLength = c.language1.length + c.language2.length;
      const fontSize = textLength <= BIG_FONT_MAX_LENGTH
        ? vocabStudy.fonts.vocabSize : vocabStudy.fonts.vocabSizeSmall;
      const dotCount = Math.ceil(Math.max(DOT_COUNT_MODIFIER - textLength, 0) / 6);

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

      const l1 = this.add.bitmapText(
        vocab1X,
        this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset),
        fonts.blueSkyWhite,
        c.language1,
        fontSize
      );
      l1.setOrigin(this.ui.vocab1OriginX, this.ui.vocab1OriginY);
      const l2 = this.add.bitmapText(
        vocab2X,
        this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset),
        fonts.blueSkyWhite,
        c.language2,
        fontSize
      );
      l2.setOrigin(this.ui.vocab2OriginX, this.ui.vocab2OriginY);
      const dots = this.add.bitmapText(
        (vocab1X + l1.width + vocab2X - l2.width) / 2,
        this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset),
        fonts.blueSkyWhite,
        ' . '.repeat(dotCount),
        fontSize
      );
      dots.setOrigin(this.ui.dotsOriginX, this.ui.dotsOriginY);
    });
  }

  submitAnswer() {

  }
}
