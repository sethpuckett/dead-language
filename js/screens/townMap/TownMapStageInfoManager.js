import { fonts, townMap, images, animations } from '../../config';
import TownMapHelper from './TownMapHelper';
import { animationHelper, gameTypeHelper } from '../../util';

const ZOMBIE_IMAGE_SCALE = 2.5;

export default class {
  constructor(scene, borderGraphics, stage) {
    this.scene = scene;
    this.borderGraphics = borderGraphics;
    this.stage = stage;
    this.mapHelper = new TownMapHelper();
  }

  drawBorder() {
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
    this.stageInfoTitle = this.scene.add.bitmapText(
      this.scene.ui.stageInfoTitleX,
      this.scene.ui.stageInfoTitleY,
      fonts.blueSkyWhite,
      townMap.gameTypeText,
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
      gameTypeHelper.getName(this.stage.type),
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
      gameTypeHelper.getDescription(this.stage.type),
      townMap.fonts.stageInfoSubtitleSize
    );
    this.stageInfoSubtitle.setOrigin(
      this.scene.ui.stageInfoSubtitleOriginX, this.scene.ui.stageInfoSubtitleOriginY
    );
    this.stageInfoSubtitle.setCenterAlign();

    this.stageInfoZombie1 = this.scene.add.sprite(
      this.scene.ui.stageInfoZombie1X, this.scene.ui.stageInfoZombie1Y, images.grayZombie
    );
    this.stageInfoZombie1.play(
      animationHelper.zombieAnimation(images.grayZombie, animations.zombieWalk),
    );
    this.stageInfoZombie1.setScale(ZOMBIE_IMAGE_SCALE);
    this.stageInfoZombie1.anims.msPerFrame = 200;

    this.stageInfoZombie2 = this.scene.add.sprite(
      this.scene.ui.stageInfoZombie2X, this.scene.ui.stageInfoZombie2Y, images.lightGreenZombie
    );
    this.stageInfoZombie2.play(
      animationHelper.zombieAnimation(images.lightGreenZombie, animations.zombieWalk),
    );
    this.stageInfoZombie2.setScale(ZOMBIE_IMAGE_SCALE);
    this.stageInfoZombie2.anims.msPerFrame = 225;

    this.stageInfoZombie3 = this.scene.add.sprite(
      this.scene.ui.stageInfoZombie3X, this.scene.ui.stageInfoZombie3Y, images.greenZombie
    );
    this.stageInfoZombie3.play(
      animationHelper.zombieAnimation(images.greenZombie, animations.zombieWalk)
    );
    this.stageInfoZombie3.setScale(ZOMBIE_IMAGE_SCALE);
    this.stageInfoZombie3.anims.msPerFrame = 175;
  }
}
