import Phaser from 'phaser';
import vocab from '../vocab';
import { depth, fonts, minigame, images, vocabStudy } from '../config';
import vocabStudyUiHelper from './ui/vocabStudyUiHelper';
import VocabWordManager from '../languageContent/VocabWordManager';
import keyboardHelper from '../util/keyboardHelper';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'VocabStudy' });
  }

  init() {
    this.ui = vocabStudyUiHelper(this.sys.game.config);
    this.vocab = new VocabWordManager(vocab.words);
  }

  create() {
    this.createHud();
    this.drawVocab();
  }

  drawVocab() {
    this.vocab.content.forEach((c, i) => {
      const textLength = c.language1.length + c.language2.length;
      const fontSize = textLength <= 24 ? vocabStudy.fonts.vocabSize : vocabStudy.fonts.vocabSizeSmall;
      const dotCount = Math.ceil(Math.max(30 - textLength, 0) / 6);

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
        vocab1X, this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset), fonts.blueSkyWhite, c.language1, fontSize
      );
      l1.setOrigin(this.ui.vocab1OriginX, this.ui.vocab1OriginY);
      const l2 = this.add.bitmapText(
        vocab2X, this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset), fonts.blueSkyWhite, c.language2, fontSize
      );
      l2.setOrigin(this.ui.vocab2OriginX, this.ui.vocab2OriginY);
      const dots = this.add.bitmapText(
        (vocab1X + l1.width + vocab2X - l2.width) / 2, this.ui.vocabY + (this.ui.vocabVerticalPadding * yOffset), fonts.blueSkyWhite, ' . '.repeat(dotCount), fontSize
      );
      dots.setOrigin(this.ui.dotsOriginX, this.ui.dotsOriginY);
    });
  }

  createHud() {
    this.createInput();

    this.brick = this.add.tileSprite(
      this.ui.brickX, this.ui.brickY,
      this.ui.brickWidth, this.ui.brickHeight,
      images.brick,
    );
    this.brick.setOrigin(0, 0);
    this.brick.setDepth(depth.minigame.wall);

    this.hudHeight = this.ui.hudHeight;
    this.hudBufferHeight = this.ui.hudBufferHeight;

    this.messageBorder = this.add.sprite(
      this.ui.messageBorderX,
      this.ui.messageBorderY,
      images.hudMessageBorder
    );
    this.messageBorder.displayWidth = this.ui.messageBorderWidth;
    this.messageBorder.displayHeight = this.ui.messageBorderHeight;
    this.messageBorder.setOrigin(this.ui.messageBorderOriginX, this.ui.messageBorderOriginY);
    this.messageBorder.setDepth(depth.minigame.hud);

    this.textEntryGraphics = this.add.graphics({
      fillStyle: vocabStudy.ui.textEntryStyle,
    });
    this.textEntryArea = new Phaser.Geom.Rectangle(
      this.ui.textEntryAreaX, this.ui.textEntryAreaY, this.ui.textEntryAreaWidth, this.ui.textEntryAreaHeight
    );
    this.textEntryGraphics.fillRectShape(this.textEntryArea);
    this.textEntryGraphics.setDepth(depth.minigame.hud);
    this.textEntry = this.add.bitmapText(
      this.ui.textEntryX, this.ui.textEntryY, fonts.blueSkyWhite, '', minigame.fonts.textEntrySize
    );
    this.textEntry.setOrigin(this.ui.textEntryOriginX, this.ui.textEntryOriginY);
    this.textEntry.setDepth(depth.minigame.entryText);

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

  createInput() {
    this.keys = this.input.keyboard.addKeys(
      'SPACE,BACKSPACE, ENTER, A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.BACKSPACE.keyCode && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(
        0, this.textEntry.text.length - 1
      );
    } else if ((keyboardHelper.isLetter(e.keyCode)
                || e.keyCode === this.keys.SPACE.keyCode)
                && this.textEntry.text.length < minigame.maxTextEntry) {
      this.textEntry.text += e.key;
    } else if (e.keyCode === this.keys.ENTER.keyCode) {
      this.submitCallback();
    }
  }
}
