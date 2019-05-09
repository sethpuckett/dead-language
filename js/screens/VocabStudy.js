import Phaser from 'phaser';
import vocab from '../vocab';
import { fonts, images, vocabStudy, game, screens, hud } from '../config';
import vocabStudyUiHelper from './ui/vocabStudyUiHelper';
import VocabWordManager from '../languageContent/VocabWordManager';
import HudManager from './HudManager';
import { util } from '../util';

const BIG_FONT_MAX_LENGTH = 24;
const DOT_COUNT_MODIFIER = 33;

const HIDE_LANGUAGE_1 = 1;
const HIDE_LANGUAGE_2 = 2;
const SHOW_ALL = 3;
const TARGET_PRACTICE = 4;
const RETURN_TO_TITLE = 5;

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'VocabStudy' });
  }

  init() {
    this.ui = vocabStudyUiHelper(this.sys.game.config);
    this.vocab = new VocabWordManager(vocab.words);
    this.hudManager = new HudManager(this);
    this.selectedOption = RETURN_TO_TITLE;
  }

  create() {
    this.hudManager.createHud(vocabStudy.ui.hudConfig);
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.createBackground();
    this.createVocab();
    this.createUi();
    this.createInput();
    this.createStatus();
    this.updateSelection();
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
    this.language1Group = this.add.group();
    this.language2Group = this.add.group();
    this.dotsGroup = this.add.group();
    const vocabContent = [...this.vocab.content];
    util.shuffleArray(vocabContent);
    vocabContent.forEach((c, i) => {
      const textLength = c.language1.length + c.language2.length;
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
        vocabStudy.fonts.dotSize
      );
      dots.setOrigin(this.ui.dotsOriginX, this.ui.dotsOriginY);

      this.language1Group.add(l1);
      this.language2Group.add(l2);
      this.dotsGroup.add(dots);
    });
  }

  createUi() {
    this.option1 = this.add.sprite(
      this.ui.menuOption1X,
      this.ui.menuOption1Y,
      images.hudMenuBorder,
    );
    this.option1.displayWidth = this.ui.menuOptionWidth;
    this.option1.displayHeight = this.ui.menuOptionHeight;
    this.option1.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);

    this.option2 = this.add.sprite(
      this.ui.menuOption2X,
      this.ui.menuOption2Y,
      images.hudMenuBorder,
    );
    this.option2.displayWidth = this.ui.menuOptionWidth;
    this.option2.displayHeight = this.ui.menuOptionHeight;
    this.option2.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);

    this.option3 = this.add.sprite(
      this.ui.menuOption3X,
      this.ui.menuOption3Y,
      images.hudMenuBorder,
    );
    this.option3.displayWidth = this.ui.menuOptionWidth;
    this.option3.displayHeight = this.ui.menuOptionHeight;
    this.option3.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);

    this.option4 = this.add.sprite(
      this.ui.menuOption4X,
      this.ui.menuOption4Y,
      images.hudMenuBorder
    );
    this.option4.displayWidth = this.ui.menuOptionWidth;
    this.option4.displayHeight = this.ui.menuOptionHeight;
    this.option4.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);

    this.option5 = this.add.sprite(
      this.ui.menuOption5X,
      this.ui.menuOption5Y,
      images.hudMenuBorder
    );
    this.option5.displayWidth = this.ui.menuOptionWidth;
    this.option5.displayHeight = this.ui.menuOptionHeight;
    this.option5.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);

    this.option1Text = this.add.bitmapText(
      this.ui.menuOption1TextX,
      this.ui.menuOption1TextY,
      fonts.blueSkyWhite,
      `Hide ${game.language1}`,
      vocabStudy.fonts.menuOptionSize
    );
    this.option1Text.setOrigin(this.ui.menuOptionTextOrigin);

    this.option2Text = this.add.bitmapText(
      this.ui.menuOption2TextX,
      this.ui.menuOption2TextY,
      fonts.blueSkyWhite,
      `Hide ${game.language2}`,
      vocabStudy.fonts.menuOptionSize
    );
    this.option2Text.setOrigin(this.ui.menuOptionTextOrigin);

    this.option3Text = this.add.bitmapText(
      this.ui.menuOption3TextX,
      this.ui.menuOption3TextY,
      fonts.blueSkyWhite,
      'Show All',
      vocabStudy.fonts.menuOptionSize
    );
    this.option3Text.setOrigin(this.ui.menuOptionTextOrigin);

    this.option4Text = this.add.bitmapText(
      this.ui.menuOption4TextX,
      this.ui.menuOption4TextY,
      fonts.blueSkyWhite,
      'Practice',
      vocabStudy.fonts.menuOptionSize
    );
    this.option4Text.setOrigin(this.ui.menuOptionTextOrigin);

    this.option5Text = this.add.bitmapText(
      this.ui.menuOption5TextX,
      this.ui.menuOption5TextY,
      fonts.blueSkyWhite,
      'Back to Title',
      vocabStudy.fonts.menuOptionSize
    );
    this.option5Text.setOrigin(this.ui.menuOptionTextOrigin);
  }

  createStatus() {
    this.statusText = this.add.bitmapText(
      this.ui.statusMessageX,
      this.ui.statusMessageY,
      fonts.blueSkyWhite,
      ['Arrows to move', 'Space/Enter to choose'],
      hud.fonts.statusSizeSmall
    );
    this.statusText.setOrigin(this.ui.statusMessageOriginX, this.ui.statusMessageOriginY);
    this.statusText.setCenterAlign();
  }

  updateSelection() {
    this.option1.setFrame(images.frames.hudMenuDark);
    this.option2.setFrame(images.frames.hudMenuDark);
    this.option3.setFrame(images.frames.hudMenuDark);
    this.option4.setFrame(images.frames.hudMenuDark);
    this.option5.setFrame(images.frames.hudMenuDark);

    if (this.selectedOption === HIDE_LANGUAGE_1) {
      this.option1.setFrame(images.frames.hudMenuLight);
    } else if (this.selectedOption === HIDE_LANGUAGE_2) {
      this.option2.setFrame(images.frames.hudMenuLight);
    } else if (this.selectedOption === SHOW_ALL) {
      this.option3.setFrame(images.frames.hudMenuLight);
    } else if (this.selectedOption === TARGET_PRACTICE) {
      this.option4.setFrame(images.frames.hudMenuLight);
    } else if (this.selectedOption === RETURN_TO_TITLE) {
      this.option5.setFrame(images.frames.hudMenuLight);
    }
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys(
      'SPACE,ENTER,UP,DOWN,LEFT,RIGHT,TAB'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.UP.keyCode
        && (this.selectedOption === 4 || this.selectedOption === 5)) {
      this.selectedOption -= 3;
    } else if (e.keyCode === this.keys.DOWN.keyCode
        && (this.selectedOption === 1 || this.selectedOption === 2)) {
      this.selectedOption += 3;
    } else if (e.keyCode === this.keys.LEFT.keyCode
        && (this.selectedOption === 2 || this.selectedOption === 3 || this.selectedOption === 5)) {
      this.selectedOption -= 1;
    } else if (e.keyCode === this.keys.RIGHT.keyCode
        && (this.selectedOption === 1 || this.selectedOption === 2 || this.selectedOption === 4)) {
      this.selectedOption += 1;
    } else if (e.keyCode === this.keys.SPACE.keyCode || e.keyCode === this.keys.ENTER.keyCode) {
      this.selectOption();
      return;
    }

    this.updateSelection();
  }

  selectOption() {
    if (this.selectedOption === HIDE_LANGUAGE_1) {
      this.hideLanguage1();
    } else if (this.selectedOption === HIDE_LANGUAGE_2) {
      this.hideLanguage2();
    } else if (this.selectedOption === SHOW_ALL) {
      this.showAll();
    } else if (this.selectedOption === RETURN_TO_TITLE) {
      this.cameras.main.fade(vocabStudy.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
    }
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

  fadeCallback(_camera, progress) {
    if (progress === 1) {
      this.scene.start(screens.titleMenu);
    }
  }

  submitAnswer() {

  }
}
