let minigame = new Phaser.Scene('Minigame');

minigame.init = function() { }

minigame.preload = function() {
  this.load.image('zombie', 'assets/images/zombie.png');
}

minigame.create = function() {
  this.textEntry = this.add.text(10, this.cameras.main.height - 50, '', { font: '32px Courier', fill: '#ffff00' });
  this.keys = this.input.keyboard.addKeys('SPACE, BACKSPACE, ENTER, A,B,C')

  this.input.keyboard.on('keydown', function (event) {
    if (event.keyCode === this.keys.BACKSPACE.keyCode  && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1);
    } else if (isLetter(event.keyCode) || event.keyCode === this.keys.SPACE.keyCode) {
      this.textEntry.text += event.key;
    } else if (event.keyCode === this.keys.ENTER.keyCode) {
      this.submitAnswer();
    }
  }, this);

  this.zombie = this.add.sprite(100, 0, 'zombie')
  this.zombie.setScale(.6, .6)
  this.zombieSpeed = .2

  this.zombieText = this.add.text(90, 30, vocab.words[0].language1, { font: '16px Courier' })
}

minigame.update = function() {
  this.zombie.y += this.zombieSpeed
  this.zombieText.y += this.zombieSpeed
}

function isLetter(keyCode) {
  return keyCode >= 65 && keyCode <= 90;
}

minigame.submitAnswer = function() {
  if (this.textEntry.text === vocab.words[0].language2) {
    this.zombie.destroy()
    this.zombieText.destroy()
  }
  this.textEntry.text = ''
}