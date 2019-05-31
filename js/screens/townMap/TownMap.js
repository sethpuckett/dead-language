import Phaser from 'phaser';
import { townMap, depth, fonts, images, animations } from '../../config';
import HudStatusManager from '../HudStatusManager';
import Modal from '../Modal';
import townMapUiHelper from '../ui/townMapUiHelper';
import animationHelper from '../../util/animationHelper';
import { gameTypeHelper } from '../../util';
import TownMapMapManager from './TownMapMapManager';
import TownMapHelper from './TownMapHelper';
import TownMapLessonInfoManager from './TownMapLessonInfoManager';
import TownMapStageSelectManager from './TownMapStageSelectManager';

const ZOMBIE_IMAGE_SCALE = 2.5;

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TownMap' });
  }

  init() {
    this.mapHelper = new TownMapHelper();
    this.lesson = this.sys.game.db.getLesson('lesson-basic-vocab-01');
    // TODO this should be based on current lesson & selection
    this.stage = this.sys.game.db.getStage('intro-01');
    this.ui = townMapUiHelper(this.sys.game.config);
    this.statusManager = new HudStatusManager(this);

    this.inputHandled = true;

    this.borderGraphics = this.add.graphics();
    this.borderGraphics.fillStyle(townMap.ui.borderColor);
    this.borderGraphics.lineStyle(townMap.ui.borderWidth, townMap.ui.borderColor);
    this.borderGraphics.setDepth(depth.townMap.border);

    this.mapManager = new TownMapMapManager(this, this.borderGraphics);
    this.lessonInfoManager = new TownMapLessonInfoManager(this, this.borderGraphics, this.lesson);
    this.stageSelectManager = new TownMapStageSelectManager(this, this.borderGraphics, this.lesson);
  }

  create() {
    this.createMap();
    this.createLessonInfo();
    this.createStageSelect();
    this.createStageInfo();
    this.createInstructions();
    this.createInput();
    this.createStartModal();
  }

  update() {

  }

  createMap() {
    this.mapManager.drawBorder();
  }

  createLessonInfo() {
    this.lessonInfoManager.drawBorder();
    this.lessonInfoManager.createLessonInfo();
  }

  createStageSelect() {
    this.stageSelectManager.drawBorder();
    this.stageSelectManager.createTitle();
    this.stageSelectManager.createStageIcons();
    this.stageSelectManager.createStageSelector();
  }

  createStageInfo() {
    this.borderGraphics.strokeRect(
      this.ui.stageInfoX, this.ui.stageInfoY, this.ui.stageInfoWidth, this.ui.stageInfoHeight
    );

    this.mapHelper.drawSquares(this.borderGraphics, [
      [this.ui.stageInfoSquareTLX, this.ui.stageInfoSquareTLY],
      [this.ui.stageInfoSquareTRX, this.ui.stageInfoSquareTRY],
      [this.ui.stageInfoSquareBLX, this.ui.stageInfoSquareBLY],
      [this.ui.stageInfoSquareBRX, this.ui.stageInfoSquareBRY],
    ]);

    this.stageInfoTitle = this.add.bitmapText(
      this.ui.stageInfoTitleX,
      this.ui.stageInfoTitleY,
      fonts.blueSkyWhite,
      townMap.gameTypeText,
      townMap.fonts.stageInfoTitleSize
    );
    this.stageInfoTitle.setOrigin(
      this.ui.stageInfoTitleOriginX, this.ui.stageInfoTitleOriginY
    );
    this.stageInfoTitle.setCenterAlign();

    this.stageInfoType = this.add.bitmapText(
      this.ui.stageInfoTypeX,
      this.ui.stageInfoTypeY,
      fonts.blueSkyWhite,
      gameTypeHelper.getName(this.stage.type),
      townMap.fonts.stageInfoTypeSize
    );
    this.stageInfoType.setOrigin(
      this.ui.stageInfoTypeOriginX, this.ui.stageInfoTypeOriginY
    );
    this.stageInfoType.setCenterAlign();
    this.stageInfoType.setTint(townMap.fonts.stageInfoTypeColor);

    this.stageInfoSubtitle = this.add.bitmapText(
      this.ui.stageInfoSubtitleX,
      this.ui.stageInfoSubtitleY,
      fonts.blueSkyWhite,
      gameTypeHelper.getDescription(this.stage.type),
      townMap.fonts.stageInfoSubtitleSize
    );
    this.stageInfoSubtitle.setOrigin(
      this.ui.stageInfoSubtitleOriginX, this.ui.stageInfoSubtitleOriginY
    );
    this.stageInfoSubtitle.setCenterAlign();

    // TODO: move hard coded values to config. Clean all this up
    this.stageInfoZombie1 = this.add.sprite(
      this.ui.stageInfoZombie1X, this.ui.stageInfoZombie1Y, images.grayZombie
    );
    this.stageInfoZombie1.play(
      animationHelper.zombieAnimation(images.grayZombie, animations.zombieWalk),
    );
    this.stageInfoZombie1.setScale(ZOMBIE_IMAGE_SCALE);
    this.stageInfoZombie1.anims.msPerFrame = 200;

    this.stageInfoZombie2 = this.add.sprite(
      this.ui.stageInfoZombie2X, this.ui.stageInfoZombie2Y, images.lightGreenZombie
    );
    this.stageInfoZombie2.play(
      animationHelper.zombieAnimation(images.lightGreenZombie, animations.zombieWalk),
    );
    this.stageInfoZombie2.setScale(ZOMBIE_IMAGE_SCALE);
    this.stageInfoZombie2.anims.msPerFrame = 225;

    this.stageInfoZombie3 = this.add.sprite(
      this.ui.stageInfoZombie3X, this.ui.stageInfoZombie3Y, images.greenZombie
    );
    this.stageInfoZombie3.play(
      animationHelper.zombieAnimation(images.greenZombie, animations.zombieWalk)
    );
    this.stageInfoZombie3.setScale(ZOMBIE_IMAGE_SCALE);
    this.stageInfoZombie3.anims.msPerFrame = 175;
  }

  createInstructions() {
    this.borderGraphics.strokeRect(
      this.ui.instructionsX,
      this.ui.instructionsY,
      this.ui.instructionsWidth,
      this.ui.instructionsHeight
    );

    this.mapHelper.drawSquares(this.borderGraphics, [
      [this.ui.instructionsSquareTLX, this.ui.instructionsSquareTLY],
      [this.ui.instructionsSquareTRX, this.ui.instructionsSquareTRY],
      [this.ui.instructionsSquareBLX, this.ui.instructionsSquareBLY],
      [this.ui.instructionsSquareBRX, this.ui.instructionsSquareBRY],
    ]);

    this.instructionsText = this.add.bitmapText(
      this.ui.instructionsTextX,
      this.ui.instructionsTextY,
      fonts.blueSkyWhite,
      townMap.statusMessages.instructions,
      townMap.fonts.instructionsSize
    );
    this.instructionsText.setOrigin(
      this.ui.instructionsTextOriginX, this.ui.instructionsTextOriginY
    );
    this.instructionsText.setCenterAlign();
  }

  createStartModal() {
    this.disableInputHandling();
    this.modal = new Modal(this, townMap.modals.start);
    this.modal.draw();
    this.modal.enableInputClose();
    this.modal.setCloseCallback(() => {
      this.modal.disableInputHandling();
      this.enableInputHandling();
    });
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
      'SPACE,ENTER,UP,DOWN,LEFT,RIGHT,ESC'
    );
    this.input.keyboard.on('keydown', this.handleKeyDown, this);
  }

  handleKeyDown(e) {
    if (e.keyCode === this.keys.LEFT.keyCode) {
      this.stageSelectManager.decrementSelectedStage();
    } else if (e.keyCode === this.keys.RIGHT.keyCode) {
      this.stageSelectManager.incrementSelectedStage();
    }
  }
}
