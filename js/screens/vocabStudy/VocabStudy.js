import Phaser from 'phaser';
import { images, vocabStudy, screens } from '../../config';
import vocabStudyUiHelper from '../ui/vocabStudyUiHelper';
import HudManager from '../HudManager';
import HudStatusManager from '../HudStatusManager';
import VocabStudyVocabManager from './VocabStudyVocabManager';
import VocabStudyMenuManager from './VocabStudyMenuManager';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'VocabStudy' });
  }

  init() {
    this.ui = vocabStudyUiHelper(this.sys.game.config);
    this.hudManager = new HudManager(this);
    this.statusManager = new HudStatusManager(this);
    this.vocabManager = new VocabStudyVocabManager(this);
    this.menuManager = new VocabStudyMenuManager(this, {
      hideLanguage1() { this.vocabManager.hideLanguage1(); },
      hideLanguage2() { this.vocabManager.hideLanguage2(); },
      showAll() { this.vocabManager.showAll(); },
      returnToTitle() { this.returnToTitle(); },
      startTargetPractice() { this.startTargetPractice(); },
    });
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
    this.crate.setOrigin(this.ui.crateOriginX, this.ui.crateOriginY);
    this.crate.setScale(images.scales.crate);
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

  createStatus() {
    this.statusManager.setStatus({ message: ['Arrows to move', '', 'Space/Enter', 'to choose'] });
  }

  startTargetPractice() {
    this.vocabManager.hideAll();
    this.showBottle();
    this.statusManager.setStatus({ message: ['Take your time', '', 'Don\'t worry', 'about missing'] });
  }

  returnToTitle() {
    this.cameras.main.fade(vocabStudy.screenFadeTime, 0, 0, 0, false, (_c, progress) => {
      if (progress === 1) {
        this.scene.start(screens.titleMenu);
      }
    });
  }

  submitAnswer() {

  }
}
