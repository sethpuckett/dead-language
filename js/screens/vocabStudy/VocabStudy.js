import Phaser from 'phaser';
import { images, vocabStudy, screens, depth, animations, userOptions } from '../../config';
import { textHelper, util } from '../../util';
import vocabStudyUiHelper from '../ui/vocabStudyUiHelper';
import HudManager from '../HudManager';
import HudStatusManager from '../HudStatusManager';
import VocabStudyVocabManager from './VocabStudyVocabManager';
import VocabStudyMenuManager from './VocabStudyMenuManager';
import VocabWordManager from '../../languageContent/VocabWordManager';
import Modal from '../modal/Modal';
import ModalChecker from '../modal/ModalChecker';
import AudioManager from '../../audio/AudioManager';
import UserOptionsManager from '../../data/UserOptionsManager';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.vocabStudy });
  }

  init(stageId) {
    this.stageId = stageId;
    this.ui = vocabStudyUiHelper(this.sys.game.config);
    this.hudManager = new HudManager(this);
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.statusManager = new HudStatusManager(this);
    this.vocabManager = new VocabStudyVocabManager(this, this.sys.game.db.getStage(stageId).vocab);
    this.vocabWordManager = new VocabWordManager(this.sys.game.db.getStage(stageId).vocab);
    this.ModalChecker = new ModalChecker(this);
    this.audioManager = new AudioManager(this);
    this.optionsManager = new UserOptionsManager(this.sys.game);
    this.menuManager = new VocabStudyMenuManager(this, {
      hideLanguage1() { this.vocabManager.hideLanguage1(); },
      hideLanguage2() { this.vocabManager.hideLanguage2(); },
      showAll() { this.vocabManager.showAll(); },
      returnToMap() { this.returnToMap(); },
      startTargetPractice() { this.createPracticeModal(); },
      startGame() { this.startGame(); },
    });
    this.inPracticeMode = false;
  }

  create() {
    this.hudManager.createHud(vocabStudy.ui.hudConfig);
    this.hudManager.setSubmitCallback(this.submitAnswer);
    this.vocabManager.createVocab();
    this.menuManager.createMenu();
    this.createBackground();
    this.createStatus();
    this.createAudio();
    this.checkStartModal();

    this.audioManager.playMusic();
  }

  checkStartModal() {
    this.ModalChecker.setBeforeStartCallback(() => {
      this.menuManager.disableInputHandling();
    });

    this.ModalChecker.setCompletedCallback(() => {
      this.menuManager.enableInputHandling();
    });

    this.ModalChecker.checkModal();
  }

  createAudio() {
    this.audioManager.setMusic(vocabStudy.audio.music.backgroundMusic);

    const sounds = util.unique(Object.values(vocabStudy.audio.soundEffects));
    sounds.forEach(s => this.audioManager.addSound(s));
  }

  createPracticeModal() {
    this.menuManager.disableInputHandling();
    this.practiceModal = new Modal(this, vocabStudy.modals.practice);
    this.practiceModal.draw();
    this.practiceModal.enableInputClose();
    this.practiceModal.setCloseCallback(() => {
      this.practiceModal.disableInputHandling();
      this.menuManager.enableInputHandling();
      this.audioManager.playSound(vocabStudy.audio.soundEffects.practiceModalClear);
      this.startTargetPractice();
    });
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
    this.statusManager.setStatus({ message: vocabStudy.statusMessages.start });
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
    this.statusManager.setStatus({ message: vocabStudy.statusMessages.practice });

    this.showPracticeWord();
  }

  startGame() {
    this.cameras.main.fade(vocabStudy.screenFadeTime, 0, 0, 0, false, (_c, progress) => {
      this.audioManager.setMusicVolume(1 - progress);
      if (progress === 1) {
        this.audioManager.stopMusic();
        this.scene.start(screens.minigame, this.stageId);
      }
    });
  }

  endTargetPractice() {
    this.inPracticeMode = false;
    this.clearPracticeWord();
    this.time.removeAllEvents();
    this.vocabWordManager.resetContent();
    this.vocabManager.showAll();
    this.menuManager.enableInputHandling();
    this.menuManager.showMenu();
    this.hudManager.hideTextInput();
    this.hudManager.disableInputHandling();
    this.disableInputHandling();
    this.hideBottle();
    this.audioManager.playSound(vocabStudy.audio.soundEffects.quitPractice);
    this.statusManager.setStatus({ message: vocabStudy.statusMessages.start });
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
    this.showBottle();
    this.practiceWordText = this.add.bitmapText(
      this.ui.practiceVocabX,
      this.ui.practiceVocabY,
      this.optionsManager.getSelectedFont(),
      this.practiceWord.language1,
      this.getFontSize(),
    );
    this.practiceWordText.setOrigin(this.ui.practiceVocabOriginX, this.ui.practiceVocabOriginY);
    this.practiceWordText.setDepth(depth.vocabStudy.word);
    this.practiceWordText.setTintFill(vocabStudy.fonts.practiceWordTint);
    this.practiceWordBg = this.add.graphics();
    this.practiceWordBg.fillStyle(vocabStudy.ui.practiceWordBgColor);
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
    this.hideBottle();
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
    if (this.explodingBottle != null) {
      this.explodingBottle.destroy();
      this.explodingBottle = null;
    }
  }

  showBottleExplode() {
    this.hideBottle();
    this.explodingBottle = this.add.sprite(
      this.ui.bottleX,
      this.ui.bottleY,
      images.bottle1Explode
    );
    this.explodingBottle.setOrigin(this.ui.bottleOriginX, this.ui.bottleOriginY);
    this.explodingBottle.setScale(images.scales.bottle1);
    this.explodingBottle.play(animations.bottle1Explode);

    const shot = this.add.sprite(
      this.explodingBottle.x,
      this.explodingBottle.y,
      images.shotBlastBottleExplode
    );
    shot.setDepth(depth.vocabStudy.shotBlastBottleExplode);
    shot.setOrigin(this.ui.shotBlastBottleOriginX, this.ui.shotBlastBottleOriginY);
    shot.on('animationcomplete', (_a, _f, s) => s.destroy(), this);
    shot.play(animations.shotBlastBottleExplode);
  }

  showMissedShot() {
    const left = Phaser.Math.RND.pick([true, false]);
    let x = 0;
    let y = 0;
    if (left) {
      x = Phaser.Math.RND.between(this.ui.missBlastLeftMinX, this.ui.missBlastLeftMaxX);
      y = Phaser.Math.RND.between(this.ui.missBlastLeftMinY, this.ui.missBlastLeftMaxY);
    } else {
      x = Phaser.Math.RND.between(this.ui.missBlastRightMinX, this.ui.missBlastRightMaxX);
      y = Phaser.Math.RND.between(this.ui.missBlastRightMinY, this.ui.missBlastRightMaxY);
    }
    const missedShot = this.add.sprite(x, y, images.shotBlastDirt);
    missedShot.setDepth(depth.vocabStudy.shotBlast);
    missedShot.setOrigin(this.ui.missBlastOrigin);
    missedShot.on('animationcomplete', (_a, _f, s) => s.destroy(), this);
    missedShot.play(animations.shotBlastDirtExplode);

    // TODO: handle depth
    this.add.sprite(x, y, images.dirtPile).setScale(images.scales.dirtPile);
  }

  returnToMap() {
    this.menuManager.disableInputHandling();
    this.cameras.main.fade(vocabStudy.screenFadeTime, 0, 0, 0, false, (_c, progress) => {
      this.audioManager.setMusicVolume(1 - progress);
      if (progress === 1) {
        this.audioManager.stopMusic();
        this.scene.start(screens.townMap);
      }
    });
  }

  submitAnswer() {
    if (this.practiceWord == null) {
      return;
    }
    const correct = this.isGuessCorrect();
    if (correct) {
      this.vocabManager.showEntryCorrect(this.practiceWord);
      this.statusManager.setStatus({
        message: vocabStudy.statusMessages.hit,
        displayTime: vocabStudy.practiceWordBuffer,
      });
      this.audioManager.playSound(vocabStudy.audio.soundEffects.guessCorrect);
      this.showBottleExplode();
    } else {
      this.vocabManager.showEntryWrong(this.practiceWord);
      this.statusManager.setStatus({
        message: vocabStudy.statusMessages.miss,
        displayTime: vocabStudy.practiceWordBuffer,
      });
      this.audioManager.playSound(vocabStudy.audio.soundEffects.guessWrong);
      this.showMissedShot();
    }

    this.hudManager.clearTextEntry();
    this.clearPracticeWord();
    this.time.addEvent({
      delay: vocabStudy.practiceWordBuffer,
      callback: () => this.showPracticeWord(),
      callbackScope: this,
    });
  }

  isGuessCorrect() {
    const guess = textHelper.cleanText(this.hudManager.getTextEntry());
    const alternatives = this.practiceWord.alternatives != null
      ? this.practiceWord.alternatives.map(w => textHelper.cleanText(w)) : null;
    return (guess === textHelper.cleanText(this.practiceWord.language2)
      || (alternatives != null && alternatives.includes(guess)));
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

  getFontSize() {
    const sizeOption = this.optionsManager.getOptionValue(userOptions.textSize);
    return sizeOption === userOptions.values.normal
      ? vocabStudy.fonts.practiceWordSize : vocabStudy.fonts.practiceWordSizeLarge;
  }
}
