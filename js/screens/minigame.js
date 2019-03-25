let minigame = new Phaser.Scene('Minigame');

minigame.init = function() { }

minigame.preload = function() { }

minigame.create = function() {
  this.textEntry = this.add.text(10, this.cameras.main.height - 50, '', { font: '32px Courier', fill: '#ffff00' });
  this.keys = this.input.keyboard.addKeys('SPACE, BACKSPACE, ENTER, A,B,C')

  this.input.keyboard.on('keydown', function (event) {
    if (event.keyCode === this.keys.BACKSPACE.keyCode  && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1);
    } else if (isLetter(event.keyCode) || event.keyCode === this.keys.SPACE.keyCode) {
      this.textEntry.text += event.key;
    } else if (event.keyCode === this.keys.ENTER.keyCode) {
      submitAnswer();
      this.textEntry.text = '';
    }
  }, this);
}

minigame.update = function() { }

function isLetter(keyCode) {
  return keyCode >= 65 && keyCode <= 90;
}

function submitAnswer() {
  // TODO: compare this.textEntry.text against onscreen values
}