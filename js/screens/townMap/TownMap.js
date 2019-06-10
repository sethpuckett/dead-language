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
    this.mapManager.initialize(true);
    this.mapManager.setLessonChangedCallback(this.lessonChanged);
    this.mapManager.setLessonSelectedCallback(this.lessonSelected);
    this.mapManager.setCancelCallback(this.lessonSelectCancelled);
  }

  createLessonInfo() {
    this.lessonInfoManager.initialize(true, this.getSelectedLesson());
  }

  createStageSelect() {
    this.stageSelectManager.initialize(false, this.getSelectedLesson(), 0);
    this.stageSelectManager.setStageChangedCallback(this.stageChanged);
    this.stageSelectManager.setStageSelectedCallback(this.stageSelected);
    this.stageSelectManager.setCancelCallback(this.stageSelectCancelled);
  }

  createStageInfo() {
    this.stageInfoManager.initialize(
      false,
      this.stageSelectManager.getSelectedStageId(),
      this.stageSelectManager.getSelectedStageNumber()
    );
  }

  createInstructions() {
    this.instructionsManager.initialize();
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
    this.selectedStageId = stageId;
    const stageType = this.progressManager.getStageType(stageId);
    if (stageType !== gameTypes.zombieAssaultReview.id) {
      this.createStageSelectedModal();
    } else {
      const lessonId = this.mapManager.getSelectedLessonId();
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
    this.stageSelectManager.disable();
    this.stageInfoManager.disable();
    this.mapManager.enable();
    this.lessonInfoManager.enable();
  }

  lessonChanged(lessonId) {
    if (lessonId != null) {
      const lesson = this.sys.game.db.getLesson(lessonId);
      this.lessonInfoManager.createLessonInfo(lesson);
      this.stageSelectManager.setLesson(lesson);
    } else {
      this.lessonInfoManager.clearLessonInfo();
      this.stageSelectManager.clearAll();
    }
  }

  lessonSelected(lessonId) {
    if (lessonId != null) {
      const lesson = this.sys.game.db.getLesson(lessonId);

      this.mapManager.disable();
      this.lessonInfoManager.disable();

      this.stageSelectManager.setLesson(lesson);
      this.stageSelectManager.enable();
      this.stageInfoManager.enable();
      this.stageInfoManager.createStageInfo(
        this.stageSelectManager.getSelectedStageId(),
        this.stageSelectManager.getSelectedStageNumber()
      );
    }
  }

  lessonSelectCancelled() {
    this.scene.start(screens.titleMenu);
  }

  fadeCallback(_camera, progress) {
    if (progress === 1) {
      this.scene.start(this.nextScreen, this.selectedStageId);
    }
  }

  getSelectedLesson() {
    if (this.mapManager != null) {
      const lessonId = this.mapManager.getSelectedLessonId();
      if (lessonId != null) {
        return this.sys.game.db.getLesson(lessonId);
      }
    }
    return null;
  }
}
