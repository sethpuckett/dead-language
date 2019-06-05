import Phaser from 'phaser';
import { townMap, depth, fonts, screens } from '../../config';
import HudStatusManager from '../HudStatusManager';
import Modal from '../Modal';
import ChoiceModal from '../ChoiceModal';
import townMapUiHelper from '../ui/townMapUiHelper';
import TownMapMapManager from './TownMapMapManager';
import TownMapHelper from './TownMapHelper';
import TownMapLessonInfoManager from './TownMapLessonInfoManager';
import TownMapStageSelectManager from './TownMapStageSelectManager';
import TownMapStageInfoManager from './TownMapStageInfoManager';

const LESSON_SELECT = 'lesson-select';
const STAGE_SELECT = 'stage-select';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TownMap' });
  }

  init() {
    this.mapHelper = new TownMapHelper();
    this.lesson = this.sys.game.db.getLesson('lesson-basic-vocab-01');
    this.stage = this.sys.game.db.getStage('intro-01');
    this.ui = townMapUiHelper(this.sys.game.config);
    this.statusManager = new HudStatusManager(this);

    this.borderGraphics = this.add.graphics();
    this.borderGraphics.lineStyle(townMap.ui.borderWidth, townMap.ui.borderColor);
    this.borderGraphics.setDepth(depth.townMap.border);

    this.mapManager = new TownMapMapManager(this, this.borderGraphics);
    this.lessonInfoManager = new TownMapLessonInfoManager(this, this.borderGraphics, this.lesson);
    this.stageSelectManager = new TownMapStageSelectManager(this, this.borderGraphics, this.lesson);
    this.stageInfoManager = new TownMapStageInfoManager(this, this.borderGraphics, this.stage);
  }

  create() {
    this.createMap();
    this.createLessonInfo();
    this.createStageSelect();
    this.createStageInfo();
    this.createInstructions();

    this.mapManager.enableInputHandling();

    this.createStartModal();
  }

  createMap() {
    this.mapManager.drawBorder();
    this.mapManager.createMapGrid();
    this.mapManager.createLessonPins();
    this.mapManager.createLessonSelector();
    this.mapManager.setLessonChangedCallback(this.lessonChanged);
  }

  createLessonInfo() {
    this.lessonInfoManager.drawBorder();

    const lessonId = this.mapManager.getSelectedLessonId();
    if (lessonId != null) {
      const lesson = this.sys.game.db.getLesson(lessonId);
      this.lessonInfoManager.createLessonInfo(lesson);
    }
  }

  createStageSelect() {
    this.stageSelectManager.drawBorder();
    this.stageSelectManager.createTitle();
    this.stageSelectManager.createStageIcons();
    this.stageSelectManager.createStageSelector();
    this.stageSelectManager.setStageSelectedCallback(this.stageSelected);
  }

  createStageInfo() {
    this.stageInfoManager.drawBorder();
    this.stageInfoManager.createStageInfo();
  }

  disableInputHandling() {
    this.stageSelectManager.disableInputHandling();
    this.mapManager.disableInputHandling();
  }

  assignInputControl(component) {
    this.disableInputHandling();
    if (component === LESSON_SELECT) {
      this.mapManager.enableInputHandling();
    } else if (component === STAGE_SELECT) {
      this.stageSelectManager.enableInputHandling();
    }
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
      this.assignInputControl(LESSON_SELECT);
    });
  }

  createStageSelectedModal() {
    this.disableInputHandling();
    this.stageModal = new ChoiceModal(
      this, townMap.choiceModals.stageSelected.text, townMap.choiceModals.stageSelected.choices
    );
    this.stageModal.draw();
    this.stageModal.enableInputHandling();
    this.stageModal.setCloseCallback((index) => {
      this.stageModal.disableInputHandling();
      // TODO: move these index values to config or something
      if (index === 0) { // start game
        this.nextScreen = screens.minigame;
      } else if (index === 1) { // target practice
        this.nextScreen = screens.vocabStudy;
      }
      this.cameras.main.fade(townMap.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
    });
    this.stageModal.setCancelCallback(() => {
      this.stageModal.disableInputHandling();
      this.stageModal.close();
      this.stageSelectManager.enableInputHandling();
    });
  }

  stageSelected(index) {
    this.selectedStageId = this.lesson.stages[index];
    this.createStageSelectedModal();
  }

  lessonChanged(lessonId) {
    if (lessonId != null) {
      const lesson = this.sys.game.db.getLesson(lessonId);
      this.lessonInfoManager.createLessonInfo(lesson);
    } else {
      this.lessonInfoManager.clearLessonInfo();
    }
  }

  fadeCallback(_camera, progress) {
    if (progress === 1) {
      this.scene.start(this.nextScreen, this.selectedStageId);
    }
  }
}
