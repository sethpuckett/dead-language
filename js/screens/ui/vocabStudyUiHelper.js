import uiHelper from './uiHelper';
import minigameUiHelper from './minigameUiHelper';
import { minigame } from '../../config';

export default (config) => {
  const u = uiHelper(config);
  const mgui = minigameUiHelper(config);

  return {
    hudHeight: minigame.ui.hudHeight,
    hudBufferHeight: minigame.ui.hudBufferHeight,
    messageBorderX: mgui.messageBorderX,
    messageBorderY: mgui.messageBorderY,
    messageBorderWidth: mgui.messageBorderWidth,
    messageBorderHeight: mgui.messageBorderHeight,
    messageBorderOriginX: mgui.messageBorderOriginX,
    messageBorderOriginY: mgui.messageBorderOriginY,

    textEntryAreaX: mgui.textEntryAreaX,
    textEntryAreaY: mgui.textEntryAreaY,
    textEntryAreaWidth: mgui.textEntryAreaWidth,
    textEntryAreaHeight: mgui.textEntryAreaHeight,

    textEntryX: mgui.textEntryX,
    textEntryY: mgui.textEntryY,
    textEntryWidth: mgui.textEntryWidth,
    textEntryHeight: mgui.textEntryHeight,
    textEntryOriginX: mgui.textEntryOriginX,
    textEntryOriginY: mgui.textEntryOriginY,

    brickX: 0,
    brickY: mgui.brickY,
    brickWidth: mgui.brickWidth,
    brickHeight: mgui.brickHeight,

    statusImageX: mgui.statusImageX,
    statusImageY: mgui.statusImageY,
    statusImageWidth: mgui.statusImageWidth,
    statusImageHeight: mgui.statusImageHeight,
    statusImageOriginX: mgui.statusImageOriginX,
    statusImageOriginY: mgui.statusImageOriginY,
    statusMessageX: mgui.statusMessageX,
    statusMessageY: mgui.statusMessageY,
    statusMessageWidth: mgui.statusMessageWidth,
    statusMessageHeight: mgui.statusMessageHeight,
    statusMessageOriginX: mgui.statusMessageOriginX,
    statusMessageOriginY: mgui.statusMessageOriginY,

    vocabLeft1X: u.padding,
    vocabLeft2X: u.w_33p - u.padding,
    vocabRight1X: u.w_66p + u.padding,
    vocabRight2X: u.w - u.padding,
    vocab1OriginX: u.left,
    vocab1OriginY: u.top,
    vocab2OriginX: u.right,
    vocab2OriginY: u.top,
    vocabY: u.padding,
    get vocabVerticalPadding() { return (u.h - this.hudHeight - this.hudBufferHeight) / 10; },
    dotsOriginX: u.center,
    dotsOriginY: u.top,

    grassX: u.w_33p + u.padding,
    grassY: 0,
    grassWidth: u.w_33p - (u.padding * 2),
    get grassHeight() { return (u.h - this.hudHeight - this.hudBufferHeight); },
    grassOriginX: u.left,
    grassOriginY: u.top,
  };
};
