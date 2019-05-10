import { fonts, images, vocabStudy, game } from '../../config';
import vocabStudyUiHelper from '../ui/vocabStudyUiHelper';

const HIDE_LANGUAGE_1 = 1;
const HIDE_LANGUAGE_2 = 2;
const SHOW_ALL = 3;
const TARGET_PRACTICE = 4;
const RETURN_TO_TITLE = 5;

export default class {
  /*
  callbackConfig: {
    hideLanguage1: function
    hideLanguage2: function
    showAll: function
    startTargetPractice: function
    returnToTitle: function
  }
  */
  constructor(scene, callbackConfig) {
    this.scene = scene;
    this.hideLanguage1 = callbackConfig.hideLanguage1;
    this.hideLanguage2 = callbackConfig.hideLanguage2;
    this.showAll = callbackConfig.showAll;
    this.startTargetPractice = callbackConfig.startTargetPractice;
    this.returnToTitle = callbackConfig.returnToTitle;
    this.inputHandled = true;

    this.ui = vocabStudyUiHelper(this.scene.sys.game.config);
    this.selectedOption = RETURN_TO_TITLE;
  }

  createMenu() {
    this.createInput();

    this.menuSprites = this.scene.add.group();

    this.option1 = this.scene.add.sprite(
      this.ui.menuOption1X,
      this.ui.menuOption1Y,
      images.hudMenuBorder,
    );
    this.option1.displayWidth = this.ui.menuOptionWidth;
    this.option1.displayHeight = this.ui.menuOptionHeight;
    this.option1.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);
    this.menuSprites.add(this.option1);

    this.option2 = this.scene.add.sprite(
      this.ui.menuOption2X,
      this.ui.menuOption2Y,
      images.hudMenuBorder,
    );
    this.option2.displayWidth = this.ui.menuOptionWidth;
    this.option2.displayHeight = this.ui.menuOptionHeight;
    this.option2.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);
    this.menuSprites.add(this.option2);

    this.option3 = this.scene.add.sprite(
      this.ui.menuOption3X,
      this.ui.menuOption3Y,
      images.hudMenuBorder,
    );
    this.option3.displayWidth = this.ui.menuOptionWidth;
    this.option3.displayHeight = this.ui.menuOptionHeight;
    this.option3.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);
    this.menuSprites.add(this.option3);

    this.option4 = this.scene.add.sprite(
      this.ui.menuOption4X,
      this.ui.menuOption4Y,
      images.hudMenuBorder
    );
    this.option4.displayWidth = this.ui.menuOptionWidth;
    this.option4.displayHeight = this.ui.menuOptionHeight;
    this.option4.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);
    this.menuSprites.add(this.option4);

    this.option5 = this.scene.add.sprite(
      this.ui.menuOption5X,
      this.ui.menuOption5Y,
      images.hudMenuBorder
    );
    this.option5.displayWidth = this.ui.menuOptionWidth;
    this.option5.displayHeight = this.ui.menuOptionHeight;
    this.option5.setOrigin(this.ui.menuOptionOriginX, this.ui.menuOptionOriginY);
    this.menuSprites.add(this.option5);

    this.option1Text = this.scene.add.bitmapText(
      this.ui.menuOption1TextX,
      this.ui.menuOption1TextY,
      fonts.blueSkyWhite,
      `Hide ${game.language1}`,
      vocabStudy.fonts.menuOptionSize
    );
    this.option1Text.setOrigin(this.ui.menuOptionTextOrigin);
    this.menuSprites.add(this.option1Text);

    this.option2Text = this.scene.add.bitmapText(
      this.ui.menuOption2TextX,
      this.ui.menuOption2TextY,
      fonts.blueSkyWhite,
      `Hide ${game.language2}`,
      vocabStudy.fonts.menuOptionSize
    );
    this.option2Text.setOrigin(this.ui.menuOptionTextOrigin);
    this.menuSprites.add(this.option2Text);

    this.option3Text = this.scene.add.bitmapText(
      this.ui.menuOption3TextX,
      this.ui.menuOption3TextY,
      fonts.blueSkyWhite,
      'Show All',
      vocabStudy.fonts.menuOptionSize
    );
    this.option3Text.setOrigin(this.ui.menuOptionTextOrigin);
    this.menuSprites.add(this.option3Text);

    this.option4Text = this.scene.add.bitmapText(
      this.ui.menuOption4TextX,
      this.ui.menuOption4TextY,
      fonts.blueSkyWhite,
      'Practice',
      vocabStudy.fonts.menuOptionSize
    );
    this.option4Text.setOrigin(this.ui.menuOptionTextOrigin);
    this.menuSprites.add(this.option4Text);

    this.option5Text = this.scene.add.bitmapText(
      this.ui.menuOption5TextX,
      this.ui.menuOption5TextY,
      fonts.blueSkyWhite,
      'Back to Title',
      vocabStudy.fonts.menuOptionSize
    );
    this.option5Text.setOrigin(this.ui.menuOptionTextOrigin);
    this.menuSprites.add(this.option5Text);

    this.updateSelection();
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

  selectOption() {
    if (this.selectedOption === HIDE_LANGUAGE_1) {
      this.hideLanguage1.call(this.scene);
    } else if (this.selectedOption === HIDE_LANGUAGE_2) {
      this.hideLanguage2.call(this.scene);
    } else if (this.selectedOption === SHOW_ALL) {
      this.showAll.call(this.scene);
    } else if (this.selectedOption === RETURN_TO_TITLE) {
      this.returnToTitle.call(this.scene);
    } else if (this.selectedOption === TARGET_PRACTICE) {
      this.startTargetPractice.call(this.scene);
    }
  }

  enableInputHandling() {
    if (!this.inputHandled) {
      this.inputHandled = true;
      this.createInput();
    }
  }

  disableInputHandling() {
    if (this.inputHandled) {
      this.inputHandled = false;
      this.keys = null;
      this.scene.input.keyboard.off('keydown', this.handleKeyDown);
    }
  }

  showMenu() {
    this.menuSprites.getChildren().forEach((s) => { s.visible = true; });
  }

  hideMenu() {
    this.menuSprites.getChildren().forEach((s) => { s.visible = false; });
  }

  // Private

  createInput() {
    this.keys = this.scene.input.keyboard.addKeys(
      'SPACE,ENTER,UP,DOWN,LEFT,RIGHT,TAB'
    );
    this.scene.input.keyboard.on('keydown', this.handleKeyDown, this);
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
}
