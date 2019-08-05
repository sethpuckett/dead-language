import Phaser from 'phaser';
import { townMap, screens, gameTypes } from '../../config';
import MultiModal from '../modal/MultiModal';
import ChoiceModal from '../modal/ChoiceModal';
import townMapUiHelper from '../ui/townMapUiHelper';
import TownMapMapManager from './TownMapMapManager';
import TownMapHelper from './TownMapHelper';
import TownMapLessonInfoManager from './TownMapLessonInfoManager';
import TownMapStageSelectManager from './TownMapStageSelectManager';
import TownMapStageInfoManager from './TownMapStageInfoManager';
import TownMapInstructionsManager from './TownMapInstructionsManager';
import GameProgressManager from '../../data/GameProgressManager';
import ModalChecker from '../modal/ModalChecker';
import ModalHelper from '../modal/ModalHelper';

const LESSON_SELECT = 'lesson-select';
const STAGE_SELECT = 'stage-select';
const STAGE_SELECT_INTRO = 'stage-select-intro';
const FIRST_STAGE_GAME_LOCKED = 'first-stage-game-locked';
const STAGE_LOCKED = 'stage-locked';
const LESSON_LOCKED = 'lesson-locked';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: screens.townMap });
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
    this.modalChecker = new ModalChecker(this);
    this.modalHelper = new ModalHelper(this);

    this.selectState = LESSON_SELECT;
  }

  create() {
    this.createMap();
    this.createLessonInfo();
    this.createStageSelect();
    this.createStageInfo();
    this.createInstructions();
    this.setSelectedPosition();
    this.checkStartModal();
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
      return;
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

  checkStartModal() {
    this.modalChecker.setBeforeStartCallback(() => {
      this.disableInputHandling();
    });

    this.modalChecker.setCompletedCallback(() => {
      this.assignControl(this.selectState);
    });

    this.modalChecker.checkModal();
  }

  createStageSelectedModal(cleared) {
    this.disableInputHandling();
    const text = cleared ? townMap.choiceModals.clearedStageSelected.text
      : townMap.choiceModals.stageSelected.text;
    this.stageModal = new ChoiceModal(this, text, townMap.choiceModals.stageSelected.choices);
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

      // force target practice first time
      // TODO: don't hard code modal id
      if (this.nextScreen === screens.minigame
          && !this.progressManager.isModalSeen('vocab-study-intro')) {
        this.createFirstLessonStartLockedModal();
        return;
      }

      this.cameras.main.fade(
        townMap.screenFadeTime, 0, 0, 0, false, this.stageSelectedFadeCallback
      );
    });
    this.stageModal.setCancelCallback(() => {
      this.stageModal.disableInputHandling();
      this.stageModal.close();
      this.stageSelectManager.enableInputHandling();
    });
  }

  createReviewStageSelectedModal(cleared) {
    this.disableInputHandling();
    const text = cleared ? townMap.choiceModals.clearedReviewStageSelected.text
      : townMap.choiceModals.reviewStageSelected.text;
    this.stageModal = new ChoiceModal(this, text, townMap.choiceModals.reviewStageSelected.choices);
    this.stageModal.draw();
    this.stageModal.enableInputHandling();
    this.stageModal.setCloseCallback((index) => {
      this.stageModal.disableInputHandling();
      // TODO: move these index values to config or something
      if (index === 0) { // start game
        this.nextScreen = screens.minigame;
      }
      this.cameras.main.fade(
        townMap.screenFadeTime, 0, 0, 0, false, this.stageSelectedFadeCallback
      );
    });
    this.stageModal.setCancelCallback(() => {
      this.stageModal.disableInputHandling();
      this.stageModal.close();
      this.stageSelectManager.enableInputHandling();
    });
  }

  stageChanged(stageId, stageNumber) {
    this.stageInfoManager.setStage(stageId, stageNumber);
  }

  stageSelected(stageId) {
    const stageType = this.progressManager.getStageType(stageId);
    const cleared = this.progressManager.isStageCompleted(stageId);
    const unlocked = this.progressManager.isStageUnlocked(stageId);

    if (stageType !== gameTypes.zombieAssaultReview.id) {
      if (unlocked) {
        this.createStageSelectedModal(cleared);
      } else {
        this.createStageLockedModal();
      }
    } else if (unlocked) {
      this.createReviewStageSelectedModal(cleared);
    } else {
      this.createStageLockedModal();
    }
  }

  createStageLockedModal() {
    this.disableInputHandling();
    const config = this.modalHelper.getModalConfig(STAGE_LOCKED);
    this.stageLockedModal = new MultiModal(this, config.text);
    this.stageLockedModal.draw();
    this.stageLockedModal.setCloseCallback(() => {
      this.assignControl(STAGE_SELECT);
    });
  }

  createLessonLockedModal() {
    this.disableInputHandling();
    const config = this.modalHelper.getModalConfig(LESSON_LOCKED);
    this.lessonLockedModal = new MultiModal(this, config.text);
    this.lessonLockedModal.draw();
    this.lessonLockedModal.setCloseCallback(() => {
      this.assignControl(LESSON_SELECT);
    });
  }

  createFirstLessonSelectedModal() {
    this.disableInputHandling();
    const config = this.modalHelper.getModalConfig(STAGE_SELECT_INTRO);
    this.firstLessonModal = new MultiModal(this, config.text);
    this.firstLessonModal.draw();
    this.firstLessonModal.setCloseCallback(() => {
      this.assignControl(STAGE_SELECT);
    });
  }

  createFirstLessonStartLockedModal() {
    this.disableInputHandling();
    const config = this.modalHelper.getModalConfig(FIRST_STAGE_GAME_LOCKED);
    this.startLockedModal = new MultiModal(this, config.text);
    this.startLockedModal.draw();
    this.startLockedModal.setCloseCallback(() => {
      this.createStageSelectedModal(false);
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
      const locked = this.progressManager.isLessonLocked(lessonId);
      if (!locked) {
        this.stageSelectManager.setLesson(lessonId);
        this.stageInfoManager.setStage(
          this.stageSelectManager.getStageId(),
          this.stageSelectManager.getStageNumber()
        );
        if (this.progressManager.isNewGame()) {
          this.createFirstLessonSelectedModal();
        } else {
          this.assignControl(STAGE_SELECT);
        }
      } else {
        this.createLessonLockedModal();
      }
    }
  }

  lessonSelectCancelled() {
    this.scene.start(screens.titleMenu);
  }

  stageSelectedFadeCallback(_camera, progress) {
    if (progress === 1) {
      const lessonId = this.mapManager.getLessonId();
      const stageId = this.stageSelectManager.getStageId();
      this.progressManager.saveMapPosition(lessonId, stageId);
      this.scene.start(this.nextScreen, stageId);
    }
  }
}
