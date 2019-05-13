import Phaser from 'phaser';
import { images, vocabStudy, screens, fonts, depth, animations } from '../../config';
import vocabStudyUiHelper from '../ui/vocabStudyUiHelper';
import HudManager from '../HudManager';
import HudStatusManager from '../HudStatusManager';
import VocabStudyVocabManager from './VocabStudyVocabManager';
import VocabStudyMenuManager from './VocabStudyMenuManager';
import VocabWordManager from '../../languageContent/VocabWordManager';
import VocabStudyTargetPracticeManager from './VocabStudyTargetPracticeManager';
import vocab from '../../vocab';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'VocabStudy' });
  }

  init() {
    this.ui = vocabStudyUiHelper(this.sys.game.config);
    this.hudManager = new HudManager(this);
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.statusManager = new HudStatusManager(this);
    this.vocabManager = new VocabStudyVocabManager(this);
    this.vocabWordManager = new VocabWordManager(vocab.words);
    this.menuManager = new VocabStudyMenuManager(this, {
      hideLanguage1() { this.vocabManager.hideLanguage1(); },
      hideLanguage2() { this.vocabManager.hideLanguage2(); },
      showAll() { this.vocabManager.showAll(); },
      returnToTitle() { this.returnToTitle(); },
      startTargetPractice() { this.startTargetPractice(); },
    });
    this.targetPracticeManager = new VocabStudyTargetPracticeManager(this);
    this.inPracticeMode = false;
  }

  create() {
    this.hudManager.createHud(vocabStudy.ui.hudConfig);
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.vocabManager.createVocab();
    this.menuManager.createMenu();
    this.createBackground();
    this.createStatus();
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
    this.crate.displayWidth = this.ui.crateWidth;
    this.crate.displayHeight = this.ui.crateHeight;
    this.crate.setOrigin(this.ui.crateOriginX, this.ui.crateOriginY);
    this.crate.setScale(images.scales.crate);
  }

  createStatus() {
    this.statusManager.setStatus({ message: ['Arrows to move', '', 'Space/Enter', 'to choose'] });
  }

  startTargetPractice() {
    this.inPracticeMode = true;
    this.vocabManager.clearAllTint();
    this.vocabManager.hideAll();
    this.menuManager.disableInputHandling();
    this.menuManager.hideMenu();
    this.hudManager.showTextInput();
    this.hudManager.enableInputHandling();
    this.enableInputHandling();
    this.showBottle();
    this.statusManager.setStatus({ message: ['Take your time', '', 'Don\'t worry', 'about missing'] });

    this.showPracticeWord();
  }

  endTargetPractice() {
    this.inPracticeMode = false;
    this.clearPracticeWord();
    this.vocabWordManager.resetContent();
    this.vocabManager.showAll();
    this.menuManager.enableInputHandling();
    this.menuManager.showMenu();
    this.hudManager.hideTextInput();
    this.hudManager.disableInputHandling();
    this.disableInputHandling();
    this.hideBottle();
  }

  clearPracticeWord() {
    this.practiceWord = null;
    if (this.practiceWordText != null) {
      this.practiceWordText.destroy();
      this.practiceWordText = null;
    }
    if (this.practiceWordBg != null) {
      this.practiceWordBg.destroy();
      this.practiceWordBg = null;
    }
  }

  showPracticeWord() {
    this.clearPracticeWord();
    this.practiceWord = this.vocabWordManager.getRandomWord();
    if (this.practiceWord == null) {
      this.endTargetPractice();
      return;
    }
    this.practiceWordText = this.add.bitmapText(
      this.ui.practiceVocabX,
      this.ui.practiceVocabY,
      fonts.blueSkyWhite,
      this.practiceWord.language1,
      vocabStudy.fonts.practiceWordSize
    );
    this.practiceWordText.setOrigin(this.ui.practiceVocabOriginX, this.ui.practiceVocabOriginY);
    this.practiceWordText.setDepth(depth.vocabStudy.word);
    this.practiceWordBg = this.add.graphics({ fillStyle: vocabStudy.ui.practiceWordBgStyle });
    this.practiceWordBg.setDepth(depth.vocabStudy.wordBackground);
    this.practiceWordBg.fillRect(
      this.practiceWordText.x
        - (this.practiceWordText.width / 2) - vocabStudy.ui.practiceWordBgPadding,
      this.practiceWordText.y - vocabStudy.ui.practiceWordBgPadding,
      this.practiceWordText.width + vocabStudy.ui.practiceWordBgPadding * 2,
      this.practiceWordText.height + vocabStudy.ui.practiceWordBgPadding * 2
    );
  }

  showBottle() {
    this.bottle = this.add.sprite(
      this.ui.bottleX,
      this.ui.bottleY,
      images.bottle1
    );
    this.bottle.setOrigin(this.ui.bottleOriginX, this.ui.bottleOriginY);
    this.bottle.setScale(images.scales.bottle1);
  }

  hideBottle() {
    if (this.bottle != null) {
      this.bottle.destroy();
      this.bottle = null;
    }
  }

  showBottleExplode() {
    this.explodingBottle = this.add.sprite(
      this.ui.bottleX,
      this.ui.bottleY,
      images.bottle1Explode
    );
    this.explodingBottle.setOrigin(this.ui.bottleOriginX, this.ui.bottleOriginY);
    this.explodingBottle.setScale(images.scales.bottle1);
    this.explodingBottle.play(animations.bottle1Explode);
    this.explodingBottle.on('animationcomplete', (_a, _f, s) => {
      this.time.addEvent({ // TODO: don't nest this in animation complete
        delay: 300, // TODO: don't hardcode this
        callback: () => {
          this.showPracticeWord();
          this.showBottle();
          s.destroy();
        },
        callbackScope: this,
      });
    }, this);

    const shot = this.add.sprite(this.explodingBottle.x, this.explodingBottle.y, images.shotBlastBottleExplode);
    shot.setDepth(depth.vocabStudy.shotBlastBottleExplode);
    shot.setOrigin(0.5, 1);
    shot.on('animationcomplete', (_a, _f, s) => s.destroy(), this);
    shot.play(animations.shotBlastBottleExplode);
  }

  returnToTitle() {
    this.cameras.main.fade(vocabStudy.screenFadeTime, 0, 0, 0, false, (_c, progress) => {
      if (progress === 1) {
        this.scene.start(screens.titleMenu);
      }
    });
  }

  submitAnswer() {
    // TODO: status message should line up with new question in timing
    const correct = this.isGuessCorrect();
    if (correct) {
      this.vocabManager.showEntryCorrect(this.practiceWord);
      this.statusManager.setStatus({
        message: vocabStudy.statusMessages.hit,
        displayTime: vocabStudy.statusTime,
      });
      this.clearPracticeWord();
      this.hideBottle();
      this.showBottleExplode();
    } else {
      this.vocabManager.showEntryWrong(this.practiceWord);
      this.statusManager.setStatus({
        message: vocabStudy.statusMessages.miss,
        displayTime: vocabStudy.statusTime,
      });
      this.clearPracticeWord();
      this.time.addEvent({
        delay: 1000, // TODO: Don't hardcode
        callback: () => {
          this.showPracticeWord();
        },
        callbackScope: this,
      });
    }
    this.hudManager.clearTextEntry();
  }

  isGuessCorrect() {
    const guess = this.hudManager.getTextEntry().toLowerCase().trim();
    return (guess === this.practiceWord.language2
      || (this.practiceWord.alternatives != null
      && this.practiceWord.alternatives.includes(guess)));
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
      this.input.keyboard.off('keydown', this.handleKeyDown);
    }
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys(
      'ESC'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.ESC.keyCode && this.inPracticeMode) {
      this.endTargetPractice();
    }
  }
}
