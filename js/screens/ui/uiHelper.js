import { ui } from '../../config'

export default (config) => {
  let helper = {}

  helper.textPadding = ui.textPadding
  helper.padding = ui.padding
  helper.paddingBig = ui.paddingBig
  helper.w = config.width
  helper.h = config.height

  helper.left = 0
  helper.top = 0
  helper.center = 0.5
  helper.right = 1
  helper.bottom = 1

  helper.w_2 = helper.w / 2
  helper.w_3 = helper.w / 3
  helper.w_4 = helper.w / 4
  helper.w_5 = helper.w / 5
  helper.w_6 = helper.w / 6
  helper.w_7 = helper.w / 7
  helper.w_8 = helper.w / 8
  helper.w_9 = helper.w / 9
  helper.w_10 = helper.w / 10
  helper.w_5p = helper.w * 0.05
  helper.w_10p = helper.w * 0.10
  helper.w_15p = helper.w * 0.15
  helper.w_20p = helper.w * 0.20
  helper.w_25p = helper.w * 0.25
  helper.w_30p = helper.w * 0.30
  helper.w_35p = helper.w * 0.35
  helper.w_40p = helper.w * 0.40
  helper.w_45p = helper.w * 0.45
  helper.w_50p = helper.w * 0.50
  helper.w_55p = helper.w * 0.55
  helper.w_60p = helper.w * 0.60
  helper.w_65p = helper.w * 0.65
  helper.w_70p = helper.w * 0.70
  helper.w_75p = helper.w * 0.75
  helper.w_80p = helper.w * 0.80
  helper.w_85p = helper.w * 0.85
  helper.w_90p = helper.w * 0.90
  helper.w_95p = helper.w * 0.95

  helper.h_2 = helper.h / 2
  helper.h_3 = helper.h / 3
  helper.h_4 = helper.h / 4
  helper.h_5 = helper.h / 5
  helper.h_6 = helper.h / 6
  helper.h_7 = helper.h / 7
  helper.h_8 = helper.h / 8
  helper.h_9 = helper.h / 9
  helper.h_10 = helper.h / 10
  helper.h_5p = helper.h * 0.05
  helper.h_10p = helper.h * 0.10
  helper.h_15p = helper.h * 0.15
  helper.h_20p = helper.h * 0.20
  helper.h_25p = helper.h * 0.25
  helper.h_30p = helper.h * 0.30
  helper.h_35p = helper.h * 0.35
  helper.h_40p = helper.h * 0.40
  helper.h_45p = helper.h * 0.45
  helper.h_50p = helper.h * 0.50
  helper.h_55p = helper.h * 0.55
  helper.h_60p = helper.h * 0.60
  helper.h_65p = helper.h * 0.65
  helper.h_70p = helper.h * 0.70
  helper.h_75p = helper.h * 0.75
  helper.h_80p = helper.h * 0.80
  helper.h_85p = helper.h * 0.85
  helper.h_90p = helper.h * 0.90
  helper.h_95p = helper.h * 0.95

  return helper
}
