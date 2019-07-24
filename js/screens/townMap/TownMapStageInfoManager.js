import { fonts, townMap, images, animations, depth, gameTypes } from '../../config';
import TownMapHelper from './TownMapHelper';
import { animationHelper, gameTypeHelper } from '../../util';
import GameProgressManager from '../../data/GameProgressManager';

const ZOMBIE_IMAGE_SCALE = 2.5;

export default class {
  constructor(scene) {
    this.scene = scene;
    this.mapHelper = new TownMapHelper();
    this.progressManager = new GameProgressManager(this.scene.sys.game.db);

    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.setDepth(depth.townMap.border);

    this.stageId = null;
    this.stageNumber = null;
    this.currentStageType = null;
    this.currentStageCleared = null;
  }

  initialize() {
    this.enabled = false;
    this.stageId = null;
    this.stageNumber = null;
    this.currentStageType = null;
    this.drawBorder(false);
    this.clearStageInfo();
  }

  enable() {
    this.enabled = true;
    this.drawBorder(true);
    this.createStageInfo();
  }

  disable() {
    this.enabled = false;
    this.currentStageType = null;
    this.drawBorder(false);
    this.clearStageInfo();
  }

  setStage(stageId, stageNumber = 0) {
    this.stageId = stageId;
    this.stageNumber = stageNumber;
    this.createStageInfo();
  }

  // Private

  drawBorder(enabled) {
    const color = enabled ? townMap.ui.borderColor : townMap.ui.borderDisableColor;
    this.borderGraphics.lineStyle(townMap.ui.borderWidth, color);
    this.borderGraphics.fillStyle(color);

    this.borderGraphics.strokeRect(
      this.scene.ui.stageInfoX,
      this.scene.ui.stageInfoY,
      this.scene.ui.stageInfoWidth,
      this.scene.ui.stageInfoHeight
    );

    this.mapHelper.drawSquares(this.borderGraphics, [
      [this.scene.ui.stageInfoSquareTLX, this.scene.ui.stageInfoSquareTLY],
      [this.scene.ui.stageInfoSquareTRX, this.scene.ui.stageInfoSquareTRY],
      [this.scene.ui.stageInfoSquareBLX, this.scene.ui.stageInfoSquareBLY],
      [this.scene.ui.stageInfoSquareBRX, this.scene.ui.stageInfoSquareBRY],
    ]);
  }

  createStageInfo() {
    if (this.stageId != null) {
      const stage = this.scene.sys.game.db.getStage(this.stageId);
      const cleared = this.progressManager.isStageCompleted(this.stageId);
      const maintainAnimations = this.shouldMaintainAnimations(cleared);

      this.currentStageType = stage.type;
      this.currentStageCleared = cleared;
      this.clearStageInfo(maintainAnimations);

      switch (stage.type) {
        // TODO: handle review
        case gameTypes.zombieAssault.id:
          this.createZombieAssaultStageInfo(maintainAnimations, cleared);
          break;
        case gameTypes.zombieAssaultReview.id:
          this.createZombieAssaultReviewStageInfo(maintainAnimations, cleared);
          break;
        default:
          throw Error(`Invalid stage type '${stage.type}'`);
      }
    } else {
      this.clearStageInfo(false);
    }
  }

  createCommonStageInfo(stageType, cleared) {
    this.stageInfoType = this.scene.add.bitmapText(
      this.scene.ui.stageInfoTypeX,
      this.scene.ui.stageInfoTypeY,
      fonts.blueSkyWhite,
      gameTypeHelper.getName(stageType),
      townMap.fonts.stageInfoTypeSize
    );
    this.stageInfoType.setOrigin(
      this.scene.ui.stageInfoTypeOriginX, this.scene.ui.stageInfoTypeOriginY
    );
    this.stageInfoType.setCenterAlign();
    this.stageInfoType.setTint(townMap.fonts.stageInfoTypeColor);

    const subtitleText = cleared ? townMap.clearedText : gameTypeHelper.getDescription(stageType);
    this.stageInfoSubtitle = this.scene.add.bitmapText(
      this.scene.ui.stageInfoSubtitleX,
      this.scene.ui.stageInfoSubtitleY,
      fonts.blueSkyWhite,
      subtitleText,
      townMap.fonts.stageInfoSubtitleSize
    );
    this.stageInfoSubtitle.setOrigin(
      this.scene.ui.stageInfoSubtitleOriginX, this.scene.ui.stageInfoSubtitleOriginY
    );
    this.stageInfoSubtitle.setCenterAlign();
  }

  createZombieAssaultStageInfo(animationsMaintained, cleared) {
    this.createCommonStageInfo(gameTypes.zombieAssault.id, cleared);

    this.stageInfoTitle = this.scene.add.bitmapText(
      this.scene.ui.stageInfoTitleX,
      this.scene.ui.stageInfoTitleY,
      fonts.blueSkyWhite,
      `Stage ${this.stageNumber.toString().padStart(2, '0')}`,
      townMap.fonts.stageInfoTitleSize
    );
    this.stageInfoTitle.setOrigin(
      this.scene.ui.stageInfoTitleOriginX, this.scene.ui.stageInfoTitleOriginY
    );
    this.stageInfoTitle.setCenterAlign();

    if (!animationsMaintained) {
      this.stageInfoSprites = [];
      this.stageInfoZombie1 = this.scene.add.sprite(
        this.scene.ui.stageInfoZombie1X, this.scene.ui.stageInfoZombie1Y, images.zombieNormal1
      );
      this.stageInfoZombie1.setScale(ZOMBIE_IMAGE_SCALE);
      this.stageInfoSprites.push(this.stageInfoZombie1);

      this.stageInfoZombie2 = this.scene.add.sprite(
        this.scene.ui.stageInfoZombie2X, this.scene.ui.stageInfoZombie2Y, images.zombieNormal3
      );
      this.stageInfoZombie2.setScale(ZOMBIE_IMAGE_SCALE);
      this.stageInfoSprites.push(this.stageInfoZombie2);

      this.stageInfoZombie3 = this.scene.add.sprite(
        this.scene.ui.stageInfoZombie3X, this.scene.ui.stageInfoZombie3Y, images.zombieNormal5
      );
      this.stageInfoZombie3.setScale(ZOMBIE_IMAGE_SCALE);
      this.stageInfoSprites.push(this.stageInfoZombie3);

      if (cleared) {
        this.stageInfoZombie1.setFrame(images.frames.zombieDead);
        this.stageInfoZombie2.setFrame(images.frames.zombieDead);
        this.stageInfoZombie3.setFrame(images.frames.zombieDead);
      } else {
        // TODO: fix all this copy/paste. Move numbers to config
        this.stageInfoZombie1.play(
          animationHelper.zombieAnimation(images.zombieNormal1, animations.zombieWalk),
        );
        this.stageInfoZombie1.anims.msPerFrame = 200;
        this.stageInfoZombie2.play(
          animationHelper.zombieAnimation(images.zombieNormal3, animations.zombieWalk),
        );
        this.stageInfoZombie2.anims.msPerFrame = 225;
        this.stageInfoZombie3.play(
          animationHelper.zombieAnimation(images.zombieNormal5, animations.zombieWalk)
        );
        this.stageInfoZombie3.anims.msPerFrame = 175;
      }
    }
  }

  createZombieAssaultReviewStageInfo(animationsMaintained, cleared) {
    this.createCommonStageInfo(gameTypes.zombieAssaultReview.id, cleared);

    this.stageInfoTitle = this.scene.add.bitmapText(
      this.scene.ui.stageInfoTitleX,
      this.scene.ui.stageInfoTitleY,
      fonts.blueSkyWhite,
      'Lesson Review',
      townMap.fonts.stageInfoTitleSize
    );
    this.stageInfoTitle.setOrigin(
      this.scene.ui.stageInfoTitleOriginX, this.scene.ui.stageInfoTitleOriginY
    );
    this.stageInfoTitle.setCenterAlign();

    if (!animationsMaintained) {
      this.stageInfoSprites = [];
      this.stageInfoZombie1 = this.scene.add.sprite(
        this.scene.ui.stageInfoReviewZombie1X,
        this.scene.ui.stageInfoReviewZombie1Y,
        images.zombieNormal1
      );
      this.stageInfoZombie1.setScale(ZOMBIE_IMAGE_SCALE);
      this.stageInfoSprites.push(this.stageInfoZombie1);

      this.stageInfoZombie2 = this.scene.add.sprite(
        this.scene.ui.stageInfoReviewZombie2X,
        this.scene.ui.stageInfoReviewZombie2Y,
        images.zombieSpecial1
      );
      this.stageInfoZombie2.setScale(ZOMBIE_IMAGE_SCALE);
      this.stageInfoSprites.push(this.stageInfoZombie2);

      this.stageInfoZombie3 = this.scene.add.sprite(
        this.scene.ui.stageInfoReviewZombie3X,
        this.scene.ui.stageInfoReviewZombie3Y,
        images.zombieNormal3
      );
      this.stageInfoZombie3.setScale(ZOMBIE_IMAGE_SCALE);
      this.stageInfoSprites.push(this.stageInfoZombie3);

      this.stageInfoZombie4 = this.scene.add.sprite(
        this.scene.ui.stageInfoReviewZombie4X,
        this.scene.ui.stageInfoReviewZombie4Y,
        images.zombieNormal5
      );
      this.stageInfoZombie4.setScale(ZOMBIE_IMAGE_SCALE);
      this.stageInfoSprites.push(this.stageInfoZombie4);

      this.stageInfoZombie5 = this.scene.add.sprite(
        this.scene.ui.stageInfoReviewZombie5X,
        this.scene.ui.stageInfoReviewZombie5Y,
        images.zombieSpecial2
      );
      this.stageInfoZombie5.setScale(ZOMBIE_IMAGE_SCALE);
      this.stageInfoSprites.push(this.stageInfoZombie5);

      if (cleared) {
        this.stageInfoZombie1.setFrame(images.frames.zombieDead);
        this.stageInfoZombie2.setFrame(images.frames.zombieDead);
        this.stageInfoZombie3.setFrame(images.frames.zombieDead);
        this.stageInfoZombie4.setFrame(images.frames.zombieDead);
        this.stageInfoZombie5.setFrame(images.frames.zombieDead);
      } else {
        // TODO: fix all this copy/paste. Move numbers to config
        this.stageInfoZombie1.play(
          animationHelper.zombieAnimation(images.zombieNormal1, animations.zombieRun),
        );
        this.stageInfoZombie1.anims.msPerFrame = 100;
        this.stageInfoZombie2.play(
          animationHelper.zombieAnimation(images.zombieSpecial1, animations.zombieRun),
        );
        this.stageInfoZombie2.anims.msPerFrame = 112;
        this.stageInfoZombie3.play(
          animationHelper.zombieAnimation(images.zombieNormal3, animations.zombieRun)
        );
        this.stageInfoZombie3.anims.msPerFrame = 88;
        this.stageInfoZombie4.play(
          animationHelper.zombieAnimation(images.zombieNormal5, animations.zombieRun)
        );
        this.stageInfoZombie4.anims.msPerFrame = 120;
        this.stageInfoZombie5.play(
          animationHelper.zombieAnimation(images.zombieSpecial2, animations.zombieRun)
        );
        this.stageInfoZombie5.anims.msPerFrame = 90;
      }
    }
  }

  clearStageInfo(maintainAnimations) {
    if (this.stageInfoTitle != null) {
      this.stageInfoTitle.destroy();
      this.stageInfoTitle = null;
    }

    if (this.stageInfoType != null) {
      this.stageInfoType.destroy();
      this.stageInfoType = null;
    }

    if (this.stageInfoSubtitle != null) {
      this.stageInfoSubtitle.destroy();
      this.stageInfoSubtitle = null;
    }

    if (!maintainAnimations) {
      if (this.stageInfoSprites != null) {
        this.stageInfoSprites.forEach(s => s.destroy());
        this.stageInfoSprites = null;
      }
    }
  }

  shouldMaintainAnimations(cleared) {
    if (this.currentStageType == null) {
      return false;
    }
    const stage = this.scene.sys.game.db.getStage(this.stageId);
    return stage.type === this.currentStageType && cleared === this.currentStageCleared;
  }
}
