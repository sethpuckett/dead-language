import { townMap } from '../../config';

export default class {
  drawSquares(graphics, squareCoords) {
    squareCoords.forEach((s) => {
      graphics.fillRect(s[0], s[1], townMap.ui.squareWidth, townMap.ui.squareWidth);
    });
  }
}
