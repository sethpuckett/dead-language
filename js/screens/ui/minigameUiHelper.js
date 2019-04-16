import uiHelper from './uiHelper'
import { minigame } from '../../config'

export default (config) => {
  let u = uiHelper(config)

  return {
    killLabelX: u.padding,
    killLabelY: u.padding,
    killValueX: (label) => label.width + u.padding,
    killValueY: u.padding,
    killOriginX: u.left,
    killOriginY: u.top,

    timerLabelX: u.w_2 - u.w_5p,
    timerLabelY: u.padding,
    timerLabelOriginX: u.center,
    timerLabelOriginY: u.top,
    timerValueX: (label) => u.w_2 - u.w_5p + label.width / 2,
    timerValueY: u.padding,
    timerValueOriginX: u.left,
    timerValueOriginY: u.top,

    missLabelX: u.w_80p,
    missLabelY: u.padding,
    missValueX: (label) => u.w_80p + label.width,
    missValueY: u.padding,
    missOriginX: u.left,
    missOriginY: u.top,

    textEntryX: u.padding,
    textEntryY: u.h - minigame.ui.entryHeight / 2,
    textEntryOriginX: u.left,
    textEntryOriginY: u.center
  }
}
