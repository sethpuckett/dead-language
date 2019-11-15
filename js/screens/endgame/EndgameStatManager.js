import { endgame, depth } from '../../config';

const STATS_PER_SIDE = 5;

export default class {
  constructor(scene, params) {
    this.scene = scene;
    this.params = params;
  }

  drawStats() {
    this.drawZombiesKilled(0);
    this.drawHitsTaken(1);
    this.drawCashCollected(2);
  }

  drawZombiesKilled(statIndex) {
    const labelText = endgame.stats.zombieKillLabel;
    const valueText = this.params.zombiesKilled;
    this.drawStat(statIndex, labelText, valueText);
  }

  drawHitsTaken(statIndex) {
    const labelText = endgame.stats.hitsTakenLabel;
    const valueText = this.params.hitsTaken;
    this.drawStat(statIndex, labelText, valueText);
  }

  drawCashCollected(statIndex) {
    const labelText = endgame.stats.cashCollectedLabel;
    const valueText = `$${this.params.cashCollected}`;
    this.drawStat(statIndex, labelText, valueText);
  }

  drawStat(statIndex, labelText, valueText) {
    const isLeft = this.isLeftStat(statIndex);
    const verticalIndex = isLeft ? statIndex : statIndex - STATS_PER_SIDE;
    const labelX = isLeft ? this.scene.ui.leftStatLabelX : this.scene.ui.rightStatLabelX;
    const valueX = isLeft ? this.scene.ui.leftStatValueX : this.scene.ui.rightStatValueX;
    const statY = this.scene.ui.statBaseY + (this.scene.ui.statVerticalPadding * verticalIndex);
    const font = this.scene.optionsManager.getSelectedFont();

    const label = this.scene.add.bitmapText(
      labelX, statY, font, `${labelText}:`, endgame.fonts.statSize
    );
    label.setOrigin(this.scene.ui.statOriginX, this.scene.ui.statOriginY);
    label.setDepth(depth.endgame.text);
    label.setTintFill(endgame.fonts.statTint);

    const value = this.scene.add.bitmapText(
      valueX, statY, font, valueText, endgame.fonts.statSize
    );
    value.setOrigin(this.scene.ui.statOriginX, this.scene.ui.statOriginY);
    value.setDepth(depth.endgame.text);
    value.setTintFill(endgame.fonts.statTint);
  }

  isLeftStat(statIndex) {
    return statIndex < STATS_PER_SIDE;
  }
}
