import { fonts, townMap, images, animations, depth, gameTypes } from '../../config';
import TownMapHelper from './TownMapHelper';
import { animationHelper, gameTypeHelper } from '../../util';

const ZOMBIE_IMAGE_SCALE = 2.5;

export default class {
  constructor(scene) {
    this.scene = scene;
    this.mapHelper = new TownMapHelper();

    this.borderGraphics = this.scene.add.graphics();
    this.borderGraphics.setDepth(depth.townMap.border);

    this.stageId = null;
    this.stageNumber = null;
  }

  initialize() {
    this.enabled = false;
    this.stageId = null;
    this.stageNumber = null;
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
    this.clearStageInfo();

    if (this.stageId != null) {
      const stage = this.scene.sys.game.db.getStage(this.stageId);

      switch (stage.type) {
        // TODO: handle review
        case gameTypes.zombieAssault.id:
        case gameTypes.zombieAssaultReview.id:
          this.createZombieAssaultStageInfo(this.stageNumber);
          break;
        default:
          throw Error(`Invalid stage type '${stage.type}'`);
      }
    }
  }

  createCommonStageInfo(stageType) {
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

    this.stageInfoSubtitle = this.scene.add.bitmapText(
      this.scene.ui.stageInfoSubtitleX,
      this.scene.ui.stageInfoSubtitleY,
      fonts.blueSkyWhite,
      gameTypeHelper.getDescription(stageType),
      townMap.fonts.stageInfoSubtitleSize
    );
    this.stageInfoSubtitle.setOrigin(
      this.scene.ui.stageInfoSubtitleOriginX, this.scene.ui.stageInfoSubtitleOriginY
    );
    this.stageInfoSubtitle.setCenterAlign();
  }

  createZombieAssaultStageInfo(stageNumber) {
    this.createCommonStageInfo(gameTypes.zombieAssault.id, stageNumber);

    this.stageInfoSprites = [];
    this.stageInfoZombie1 = this.scene.add.sprite(
      this.scene.ui.stageInfoZombie1X, this.scene.ui.stageInfoZombie1Y, images.grayZombie
    );
    this.stageInfoZombie1.play(
      animationHelper.zombieAnimation(images.grayZombie, animations.zombieWalk),
    );
    this.stageInfoZombie1.setScale(ZOMBIE_IMAGE_SCALE);
    this.stageInfoZombie1.anims.msPerFrame = 200;
    this.stageInfoSprites.push(this.stageInfoZombie1);

    this.stageInfoZombie2 = this.scene.add.sprite(
      this.scene.ui.stageInfoZombie2X, this.scene.ui.stageInfoZombie2Y, images.lightGreenZombie
    );
    this.stageInfoZombie2.play(
      animationHelper.zombieAnimation(images.lightGreenZombie, animations.zombieWalk),
    );
    this.stageInfoZombie2.setScale(ZOMBIE_IMAGE_SCALE);
    this.stageInfoZombie2.anims.msPerFrame = 225;
    this.stageInfoSprites.push(this.stageInfoZombie2);

    this.stageInfoZombie3 = this.scene.add.sprite(
      this.scene.ui.stageInfoZombie3X, this.scene.ui.stageInfoZombie3Y, images.greenZombie
    );
    this.stageInfoZombie3.play(
      animationHelper.zombieAnimation(images.greenZombie, animations.zombieWalk)
    );
    this.stageInfoZombie3.setScale(ZOMBIE_IMAGE_SCALE);
    this.stageInfoZombie3.anims.msPerFrame = 175;
    this.stageInfoSprites.push(this.stageInfoZombie3);
  }

  clearStageInfo() {
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

    if (this.stageInfoSprites != null) {
      this.stageInfoSprites.forEach(s => s.destroy());
      this.stageInfoSprites = null;
    }
  }
}
