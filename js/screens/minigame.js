let minigame = new Phaser.Scene('Minigame');

minigame.init = function() {
  // TODO: Put these in config somewhere
  this.baseFallSpeed = 25
  this.fallRange = 10
  this.baseSpawnRate = 1500
  this.spawnRange = 1000

  this.wordPool = [...vocab.words]
  this.wordsInUse = []
  this.zombies = []
}

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

  this.activateSpawnTimer();
}

minigame.update = function() {

  // TODO: is there a reason to use the Phaser Call loop here?
  this.zombies.forEach(function(zombie) {
    zombie.y += zombie.speed
    zombie.text.y += zombie.speed
  })
}

minigame.activateSpawnTimer = function() {
  if (this.spawnTimer != null) {
    this.spawnTimer.reset({ delay: this.getSpawnDelay() , callback: this.spawnZombie, callbackScope: this, repeat: 1 });
  } else {
    this.spawnTimer = this.time.addEvent({ delay: this.getSpawnDelay(), callback: this.spawnZombie, callbackScope: this });
  }
}

minigame.getSpawnLocation = function() {
  // TODO: don't hard code padding
  return Phaser.Math.RND.between(25, this.cameras.main.width - 25)
}

minigame.getSpawnDelay = function() {
  return this.baseSpawnRate + Phaser.Math.RND.between(-this.spawnRange, this.spawnRange)
}

minigame.getFallSpeed = function() {
  // TODO : don't hard code this equation here
  return (this.baseFallSpeed + Phaser.Math.RND.between(-this.fallRange, this.fallRange)) / 40
}

minigame.spawnZombie = function() {
  // TODO: add zombie class to store extra data
  let zombie = this.add.sprite(
    this.getSpawnLocation(),
    -35, // TODO: don't hard code this here. Should be in config or init
    'zombie'
  )
  zombie.setScale(.6, .6) // TODO: Don't hard code this
  zombie.speed = this.getFallSpeed()
  // TODO: put font in config
  // TODO: don't hard code position (need to calculate center)
  // TODO: pulling language1 off this is ugly. Move to helper class?
  zombie.text = this.add.text(zombie.x - 15, -10, this.reserveVocabWord().language1, { font: '16px Courier' })

  this.zombies.push(zombie)
  this.activateSpawnTimer()
}

minigame.reserveVocabWord = function() {
  // TODO: error handling for empty pool
  let poolIndex = Phaser.Math.RND.between(0, this.wordPool.length - 1)
  word = this.wordPool.splice(poolIndex, 1)[0]
  this.wordsInUse.push(word)
  return word
}

minigame.releaseVocabWord = function(text) {
  let index = this.wordsInUse.findIndex(function(word) {
    return word.language1 === text
  })
  this.wordPool.push(this.wordsInUse.splice(index, 1)[0])
}

minigame.submitAnswer = function() {
  let mg = this
  this.wordsInUse.forEach(function(word) {
    if (mg.textEntry.text === word.language2) {
      mg.destroyZombieByWord(word.language1)
      mg.releaseVocabWord(word.language1)
    }
  })

  this.textEntry.text = ''
}

minigame.destroyZombieByWord = function(word) {
  index = this.zombies.findIndex(function(zombie) {
    return zombie.text.text === word
  })
  this.zombies[index].text.destroy()
  this.zombies[index].destroy()
  this.zombies.splice(index, 1)
}

// TODO: move to helper class
function isLetter(keyCode) {
  return keyCode >= 65 && keyCode <= 90;
}