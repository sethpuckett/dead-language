export default class {
  drawSquares(graphics, width, squareCoords) {
    squareCoords.forEach((s) => {
      graphics.fillRect(s[0], s[1], width, width);
    });
  }
}
