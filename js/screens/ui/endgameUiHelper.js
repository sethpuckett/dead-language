import uiHelper from './uiHelper'

export default (config) => {
  let u = uiHelper(config)

  return {
    killLabelX: u.w_2,
    killLabelY: u.h_25p,
    killLabelOriginX: u.center,
    killLabelOriginY: u.top,

    missLabelX: u.w_2,
    missLabelY: (prev) => prev.y + prev.height + u.padding,
    missLabelOriginX: u.center,
    missLabelOriginY: u.top,

    returnButtonX: u.w_2,
    returnButtonY: (prev) => prev.y + prev.height + u.padding,
    returnButtonOriginX: u.center,
    returnButtonOriginY: u.top
  }
}
