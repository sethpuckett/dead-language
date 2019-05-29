import Phaser from 'phaser';
import { townMap, depth, fonts, images, animations } from '../../config';
import HudStatusManager from '../HudStatusManager';
import Modal from '../Modal';
import townMapUiHelper from '../ui/townMapUiHelper';
import animationHelper from '../../util/animationHelper';
import { gameTypeHelper } from '../../util';

const ZOMBIE_IMAGE_SCALE = 2.5;

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TownMap' });
  }

  init() {
    this.lesson = this.sys.game.db.getLesson('lesson-basic-vocab-01');
    // TODO this should be based on current lesson & selection
    this.stage = this.sys.game.db.getStage('intro-01');
    this.ui = townMapUiHelper(this.sys.game.config);
    this.statusManager = new HudStatusManager(this);

    this.borderGraphics = this.add.graphics();
    this.borderGraphics.fillStyle(townMap.ui.borderColor);
    this.borderGraphics.lineStyle(townMap.ui.borderWidth, townMap.ui.borderColor);
    this.borderGraphics.setDepth(depth.townMap.border);
  }

  create() {
    this.createMap();
    this.createLessonInfo();
    this.createStageSelect();
    this.createStageInfo();
    this.createInstructions();
    this.createStartModal();
  }

  update() {

  }

  createMap() {
    this.borderGraphics.strokeRect(this.ui.mapX, this.ui.mapY, this.ui.mapWidth, this.ui.mapHeight);

    this.drawSquares([
      [this.ui.mapSquareTLX, this.ui.mapSquareTLY], [this.ui.mapSquareTRX, this.ui.mapSquareTRY],
      [this.ui.mapSquareBLX, this.ui.mapSquareBLY], [this.ui.mapSquareBRX, this.ui.mapSquareBRY],
    ]);

    this.mapText = this.add.bitmapText(
      this.ui.mapX + this.ui.mapWidth / 2,
      this.ui.mapY + this.ui.mapHeight / 2,
      fonts.blueSkyWhite,
      'TODO: ADD MAP',
      18
    );
    this.mapText.setOrigin(0.5);
  }

  createLessonInfo() {
    this.borderGraphics.strokeRect(
      this.ui.lessonInfoX, this.ui.lessonInfoY, this.ui.lessonInfoWidth, this.ui.lessonInfoHeight
    );

    this.drawSquares([
      [this.ui.lessonInfoSquareTLX, this.ui.lessonInfoSquareTLY],
      [this.ui.lessonInfoSquareTRX, this.ui.lessonInfoSquareTRY],
      [this.ui.lessonInfoSquareBLX, this.ui.lessonInfoSquareBLY],
      [this.ui.lessonInfoSquareBRX, this.ui.lessonInfoSquareBRY],
    ]);

    this.lessonInfoTitle = this.add.bitmapText(
      this.ui.lessonInfoTitleX,
      this.ui.lessonInfoTitleY,
      fonts.blueSkyWhite,
      this.lesson.name,
      townMap.fonts.lessonInfoTitleSize
    );
    this.lessonInfoTitle.setOrigin(
      this.ui.lessonInfoTitleOriginX, this.ui.lessonInfoTitleOriginY
    );
    this.lessonInfoTitle.setCenterAlign();
    this.lessonInfoTitle.setTint(townMap.fonts.lessonInfoTitleColor);

    this.lessonInfoText = this.add.bitmapText(
      this.ui.lessonInfoTextX,
      this.ui.lessonInfoTextY,
      fonts.blueSkyWhite,
      this.lesson.info,
      townMap.fonts.lessonInfoTextSize
    );
    this.lessonInfoText.setOrigin(
      this.ui.lessonInfoTextOriginX, this.ui.lessonInfoTextOriginY
    );
  }

  createStageSelect() {
    this.borderGraphics.strokeRect(
      this.ui.stageX, this.ui.stageY, this.ui.stageWidth, this.ui.stageHeight
    );

    this.drawSquares([
      [this.ui.stageSquareTLX, this.ui.stageSquareTLY],
      [this.ui.stageSquareTRX, this.ui.stageSquareTRY],
      [this.ui.stageSquareBLX, this.ui.stageSquareBLY],
      [this.ui.stageSquareBRX, this.ui.stageSquareBRY],
    ]);

    this.stageTitle = this.add.bitmapText(
      this.ui.stageTitleX,
      this.ui.stageTitleY,
      fonts.blueSkyWhite,
      'Choose a stage',
      townMap.fonts.stageTitleSize
    );
    this.stageTitle.setOrigin(
      this.ui.stageTitleOriginX, this.ui.stageTitleOriginY
    );
    this.stageTitle.setCenterAlign();

    // evenly space stage dots in stage select section
    this.stageDots = [];
    const stageCount = this.lesson.stages.length;
    const totalDotWidth = stageCount * this.ui.stageDotWidth + this.ui.stageReviewDotWidth;
    const baseX = this.ui.stageX + this.ui.stageWidth / 2 - totalDotWidth / 2;
    this.lesson.stages.forEach((stage, index) => {
      const percentX = index / (this.lesson.stages.length + 1);
      const dot = this.add.sprite(
        baseX + totalDotWidth * percentX, this.ui.stageDotY, images.yellowBubble
      );
      // TODO: set this based on completion status of stage
      dot.setFrame(images.frames.yellowBubbleEmpty);
      dot.setOrigin(this.ui.stageDotOriginX, this.ui.stageDotOriginY);
      dot.displayWidth = this.ui.stageDotWidth;
      dot.displayHeight = this.ui.stageDotWidth;
    });

    // draw review stage dot
    const reviewPercentX = stageCount / (stageCount + 1);
    const dot = this.add.sprite(
      baseX + totalDotWidth * reviewPercentX, this.ui.stageDotY, images.yellowBubble
    );

    // TODO: set this based on completion status of stage
    dot.setFrame(images.frames.yellowBubbleEmpty);
    dot.setOrigin(this.ui.stageDotOriginX, this.ui.stageDotOriginY);
    dot.displayWidth = this.ui.stageReviewDotWidth;
    dot.displayHeight = this.ui.stageReviewDotWidth;

    // // TODO: Put these in an array.
    // //       Don't hard code positions
    // //       Add a way to determine if the stage has been completed
    // this.stage1Bubble = this.add.sprite(
    //   510, 90, images.yellowBubble
    // );
    // this.stage1Bubble.setFrame(images.frames.yellowBubbleFull);
    // this.stage1Bubble.setScale(2.75);

    // this.stage2Bubble = this.add.sprite(
    //   555, 90, images.yellowBubble
    // );
    // this.stage2Bubble.setFrame(images.frames.yellowBubbleFull);
    // this.stage2Bubble.setScale(2.75);

    // this.stage3Bubble = this.add.sprite(
    //   600, 90, images.yellowBubble
    // );
    // this.stage3Bubble.setFrame(images.frames.yellowBubbleEmpty);
    // this.stage3Bubble.setScale(2.75);

    // this.stage4Bubble = this.add.sprite(
    //   645, 90, images.yellowBubble
    // );
    // this.stage4Bubble.setFrame(images.frames.yellowBubbleEmpty);
    // this.stage4Bubble.setScale(2.75);

    // this.stage5Bubble = this.add.sprite(
    //   690, 90, images.yellowBubble
    // );
    // this.stage5Bubble.setFrame(images.frames.yellowBubbleEmpty);
    // this.stage5Bubble.setScale(2.75);

    // this.stage6Bubble = this.add.sprite(
    //   745, 90, images.yellowBubble
    // );
    // this.stage6Bubble.setFrame(images.frames.yellowBubbleEmpty);
    // this.stage6Bubble.setScale(4);

    // this.stageSelector = this.add.sprite(
    //   600, 90, images.hudItemBorder
    // );
    // this.stageSelector.setFrame(images.frames.hudItemLight);
    // this.stageSelector.setScale(2.4);
  }

  createStageInfo() {
    this.borderGraphics.strokeRect(
      this.ui.stageInfoX, this.ui.stageInfoY, this.ui.stageInfoWidth, this.ui.stageInfoHeight
    );

    this.drawSquares([
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

    this.drawSquares([
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
    // TODO: disable map input handling
    this.modal = new Modal(this, townMap.modals.start);
    this.modal.draw();
    this.modal.enableInputClose();
    this.modal.setCloseCallback(() => {
      this.modal.disableInputHandling();
      // TODO: enable map input handling
    });
  }

  drawSquares(squareCoords) {
    squareCoords.forEach((s) => {
      this.borderGraphics.fillRect(s[0], s[1], townMap.ui.squareWidth, townMap.ui.squareWidth);
    });
  }
}
