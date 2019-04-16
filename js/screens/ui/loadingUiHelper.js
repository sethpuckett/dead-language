import uiHelper from './uiHelper'

export default (config) => {
  let u = uiHelper(config)

  return {
    loadingImageX: u.w_2,
    loadingImageY: u.h_30p,
    loadingImageOrigin: u.center,

    barBackgroundW: u.w_25p + u.padding,
    barBackgroundH: u.w_5p + u.padding,
    get barBackgroundX() { return u.w_2 - this.barBackgroundW / 2 },
    get barBackgroundY() { return u.h_2 - this.barBackgroundH / 2 },

    barW: u.w_25p,
    barH: u.w_5p,
    get barX() { return u.w_2 - this.barW / 2 },
    get barY() { return u.h_2 - this.barH / 2 }
  }
}
