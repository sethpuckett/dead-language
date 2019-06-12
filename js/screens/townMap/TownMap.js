import Phaser from 'phaser';
import { townMap, screens, gameTypes } from '../../config';
import Modal from '../Modal';
import ChoiceModal from '../ChoiceModal';
import townMapUiHelper from '../ui/townMapUiHelper';
import TownMapMapManager from './TownMapMapManager';
import TownMapHelper from './TownMapHelper';
import TownMapLessonInfoManager from './TownMapLessonInfoManager';
import TownMapStageSelectManager from './TownMapStageSelectManager';
import TownMapStageInfoManager from './TownMapStageInfoManager';
import TownMapInstructionsManager from './TownMapInstructionsManager';
import GameProgressManager from '../../data/GameProgressManager';

const LESSON_SELECT = 'lesson-select';
const STAGE_SELECT = 'stage-select';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'TownMap' });
  }

  init() {
    this.mapHelper = new TownMapHelper();
    this.ui = townMapUiHelper(this.sys.game.config);

    this.mapManager = new TownMapMapManager(this);
    this.lessonInfoManager = new TownMapLessonInfoManager(this);
    this.stageSelectManager = new TownMapStageSelectManager(this);
    this.stageInfoManager = new TownMapStageInfoManager(this);
    this.instructionsManager = new TownMapInstructionsManager(this);
    this.progressManager = new GameProgressManager(this.sys.game.db);

    this.selectState = LESSON_SELECT;
  }

  create() {
    this.createMap();
    this.createLessonInfo();
    this.createStageSelect();
    this.createStageInfo();
    this.createInstructions();
    this.setSelectedPosition();

    this.createStartModal();
  }

  createMap() {
    this.mapManager.initialize();
    this.mapManager.setLessonChangedCallback(this.lessonChanged);
    this.mapManager.setLessonSelectedCallback(this.lessonSelected);
    this.mapManager.setCancelCallback(this.lessonSelectCancelled);
  }

  createLessonInfo() {
    this.lessonInfoManager.initialize();
  }

  createStageSelect() {
    this.stageSelectManager.initialize();
    this.stageSelectManager.setStageChangedCallback(this.stageChanged);
    this.stageSelectManager.setStageSelectedCallback(this.stageSelected);
    this.stageSelectManager.setCancelCallback(this.stageSelectCancelled);
  }

  createStageInfo() {
    this.stageInfoManager.initialize();
  }

  createInstructions() {
    this.instructionsManager.initialize();
  }

  setSelectedPosition() {
    const position = this.progressManager.getMapPosition();
    if (position != null) {
      this.mapManager.setLesson(position.lesson);
    } else {
      this.mapManager.resetLesson();
    }

    const lessonId = this.mapManager.getLessonId();
    this.lessonInfoManager.setLesson(lessonId);
    this.stageSelectManager.setLesson(lessonId);

    if (position.stage != null) {
      this.stageSelectManager.setStage(position.stage);
      const number = this.stageSelectManager.getStageNumber();
      this.stageInfoManager.setStage(position.stage, number);
      this.assignControl(STAGE_SELECT);
    } else {
      this.stageSelectManager.resetStage();
      this.assignControl(LESSON_SELECT);
    }
  }

  disableInputHandling() {
    this.stageSelectManager.disableInputHandling();
    this.mapManager.disableInputHandling();
  }

  assignControl(component) {
    this.selectState = component;
    if (component === LESSON_SELECT) {
      this.disableStageSelect();
      this.enableLessonSelect();
    } else if (component === STAGE_SELECT) {
      this.disableLessonSelect();
      this.enableStageSelect();
    }
  }

  disableLessonSelect() {
    this.mapManager.disable();
    this.lessonInfoManager.disable();
  }

  disableStageSelect() {
    this.stageSelectManager.disable();
    this.stageInfoManager.disable();
  }

  enableLessonSelect() {
    this.mapManager.enable();
    this.lessonInfoManager.enable();
  }

  enableStageSelect() {
    this.stageSelectManager.enable();
    this.stageInfoManager.enable();
  }

  assignInputControl(component) {
    this.disableInputHandling();
    if (component === LESSON_SELECT) {
      this.mapManager.enableInputHandling();
    } else if (component === STAGE_SELECT) {
      this.stageSelectManager.enableInputHandling();
    }
  }

  createStartModal() {
    this.disableInputHandling();
    this.modal = new Modal(this, townMap.modals.start);
    this.modal.draw();
    this.modal.enableInputClose();
    this.modal.setCloseCallback(() => {
      this.modal.disableInputHandling();
      this.assignInputControl(this.selectState);
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

  createReviewStageSelectedModal() {
    this.disableInputHandling();
    this.stageModal = new ChoiceModal(
      this,
      townMap.choiceModals.reviewStageSelected.text,
      townMap.choiceModals.reviewStageSelected.choices
    );
    this.stageModal.draw();
    this.stageModal.enableInputHandling();
    this.stageModal.setCloseCallback((index) => {
      this.stageModal.disableInputHandling();
      // TODO: move these index values to config or something
      if (index === 0) { // start game
        this.nextScreen = screens.minigame;
      }
      this.cameras.main.fade(townMap.screenFadeTime, 0, 0, 0, false, this.fadeCallback);
    });
    this.stageModal.setCancelCallback(() => {
      this.stageModal.disableInputHandling();
      this.stageModal.close();
      this.stageSelectManager.enableInputHandling();
    });
  }

  stageChanged(stageId, stageNumber) {
    this.stageInfoManager.createStageInfo(stageId, stageNumber);
  }

  stageSelected(stageId) {
    const stageType = this.progressManager.getStageType(stageId);
    if (stageType !== gameTypes.zombieAssaultReview.id) {
      this.createStageSelectedModal();
    } else {
      const lessonId = this.mapManager.getLessonId();
      if (this.progressManager.isReviewUnlocked(lessonId)) {
        this.createReviewStageSelectedModal();
      } else {
        this.createReviewLockedModal();
      }
    }
  }

  createReviewLockedModal() {
    this.disableInputHandling();
    this.modal = new Modal(this, townMap.modals.reviewLocked);
    this.modal.draw();
    this.modal.enableInputClose();
    this.modal.setCloseCallback(() => {
      this.modal.disableInputHandling();
      this.assignInputControl(STAGE_SELECT);
    });
  }

  stageSelectCancelled() {
    this.assignControl(LESSON_SELECT);
  }

  lessonChanged(lessonId) {
    if (lessonId != null) {
      this.lessonInfoManager.setLesson(lessonId);
      this.stageSelectManager.setLesson(lessonId);
    } else {
      this.lessonInfoManager.clear();
      this.stageSelectManager.clear();
    }
  }

  lessonSelected(lessonId) {
    if (lessonId != null) {
      this.stageSelectManager.setLesson(lessonId);
      this.stageInfoManager.createStageInfo(
        this.stageSelectManager.getStageId(),
        this.stageSelectManager.getStageNumber()
      );
      this.assignControl(STAGE_SELECT);
    }
  }

  lessonSelectCancelled() {
    this.scene.start(screens.titleMenu);
  }

  fadeCallback(_camera, progress) {
    if (progress === 1) {
      const lessonId = this.mapManager.getLessonId();
      const stageId = this.stageSelectManager.getStageId();
      this.progressManager.setMapPosition(lessonId, stageId);
      this.scene.start(this.nextScreen, stageId);
    }
  }
}
