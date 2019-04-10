import vocab from '../vocab'
import Phaser from 'phaser'

let minigame = new Phaser.Scene('Minigame')

// let firestore = firebase.firestore()
// const lessonRef = firestore.collection('lessons').where('name', '==', 'Basic Phrases').get().then((snap) => {
//   snap.forEach(function(doc) {
//     minigame.wordPool = [...doc.data().vocab]
//   })
// });

minigame.init = () => {
  // TODO: Put these in config somewhere
  this.baseFallSpeed = 25
  this.fallRange = 10
  this.baseSpawnRate = 1500
  this.spawnRange = 1000

  this.wordPool = [...vocab.words]
  this.wordsInUse = []
  this.zombies = []
  this.score = 0
  this.damage = 0
}

minigame.preload = () => {
  this.load.image('zombie', 'assets/images/zombie.png')
  this.load.image('grass', 'assets/images/grass.png')
}

minigame.create = () => {
  // TODO: fonts and text location should be in config
  this.textEntry = this.add.text(10, this.cameras.main.height - 40, '', { font: '32px Courier', fill: '#ffff00' })
  this.scoreLabel = this.add.text(10, 10, 'Kills:', { font: '32px Courier', fill: '#ffff00' })
  // TODO: calculate X value based on width of score label
  this.scoreValue = this.add.text(125, 10, this.score, { font: '32px Courier', fill: '#ff0000' })
  this.damageLabel = this.add.text(this.cameras.main.width - 175, 10, 'Misses:', { font: '32px Courier', fill: '#ffff00' })
  this.damageValue = this.add.text(this.cameras.main.width - 40, 10, this.damage, { font: '32px Courier', fill: '#ff0000' })
  this.timerLabel = this.add.text(this.cameras.main.width / 2 - 150, 10, 'Time Remaining:', { font: '24px Courier', fill: '#ffff00' })
  this.timerValue = this.add.text(this.cameras.main.width / 2 + 68, 10, '', { font: '24px Courier', fill: '#ff0000' })

  // TODO: delay should be config
  this.gameTimer = this.time.addEvent({ delay: 60000, callback: this.gameTimerFinish, callbackScope: this })

  this.keys = this.input.keyboard.addKeys('SPACE, BACKSPACE, ENTER, A,B,C')
  this.input.keyboard.on('keydown', function (event) {
    if (event.keyCode === this.keys.BACKSPACE.keyCode && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1)
    } else if (isLetter(event.keyCode) || event.keyCode === this.keys.SPACE.keyCode) {
      this.textEntry.text += event.key
    } else if (event.keyCode === this.keys.ENTER.keyCode) {
      this.submitAnswer()
    }
  }, this)

  // TODO: move positions, colors, etc to config
  this.lineGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0xaa0000 } })
  this.failLine = new Phaser.Geom.Line(0, this.cameras.main.height - 50, this.cameras.main.width, this.cameras.main.height - 50)
  this.lineGraphics.strokeLineShape(this.failLine)

  // TODO: position should be in config
  // TODO: make configurable way to visual rect for debugging
  this.playerHitRect = new Phaser.Geom.Rectangle(0, this.cameras.main.height - 50, this.cameras.main.width, 10)

  this.background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height - 50, 'grass')
  this.background.setOrigin(0, 0)
  this.background.setDepth(-1)

  this.activateSpawnTimer()
}

minigame.update = () => {
  // TODO: is there a reason to use the Phaser Call loop here?
  this.zombies.forEach((zombie) => {
    zombie.y += zombie.speed
    zombie.text.y += zombie.speed
  })

  // TODO: time should be based on config values
  let remaining = 60 - this.gameTimer.getElapsedSeconds()
  this.timerValue.text = remaining.toFixed(1)

  this.checkZombieAttack()
}

minigame.checkZombieAttack = () => {
  let mg = this
  this.zombies.forEach((zombie) => {
    if (Phaser.Geom.Intersects.RectangleToRectangle(zombie.getBounds(), mg.playerHitRect)) {
      mg.damage++
      mg.damageValue.text = mg.damage
      mg.releaseVocabWord(zombie.text.text)
      zombie.text.destroy()
      zombie.destroy()
      zombie.hit = true
    }
  })

  this.zombies = this.zombies.filter((zombie) => {
    return !zombie.hit
  })
}

minigame.activateSpawnTimer = () => {
  if (this.spawnTimer != null) {
    this.spawnTimer.reset({ delay: this.getSpawnDelay(), callback: this.spawnZombie, callbackScope: this, repeat: 1 })
  } else {
    this.spawnTimer = this.time.addEvent({ delay: this.getSpawnDelay(), callback: this.spawnZombie, callbackScope: this })
  }
}

minigame.getSpawnLocation = () => {
  // TODO: don't hard code padding
  return Phaser.Math.RND.between(25, this.cameras.main.width - 25)
}

minigame.getSpawnDelay = () => {
  return this.baseSpawnRate + Phaser.Math.RND.between(-this.spawnRange, this.spawnRange)
}

minigame.getFallSpeed = () => {
  // TODO : don't hard code this equation here
  return (this.baseFallSpeed + Phaser.Math.RND.between(-this.fallRange, this.fallRange)) / 40
}

minigame.spawnZombie = () => {
  // TODO: add zombie class to store extra data
  let zombie = this.add.sprite(
    this.getSpawnLocation(),
    -35, // TODO: don't hard code this here. Should be in config or init
    'zombie'
  )
  zombie.setScale(0.6, 0.6) // TODO: Don't hard code this
  zombie.speed = this.getFallSpeed()
  // TODO: put font in config
  // TODO: don't hard code position (need to calculate center)
  // TODO: pulling language1 off this is ugly. Move to helper class?
  zombie.text = this.add.text(zombie.x - 15, -10, this.reserveVocabWord().language1, { font: '16px Courier' })

  this.zombies.push(zombie)
  this.activateSpawnTimer()
}

minigame.reserveVocabWord = () => {
  // TODO: error handling for empty pool
  let poolIndex = Phaser.Math.RND.between(0, this.wordPool.length - 1)
  let word = this.wordPool.splice(poolIndex, 1)[0]
  this.wordsInUse.push(word)
  return word
}

minigame.releaseVocabWord = (text) => {
  let index = this.wordsInUse.findIndex((word) => {
    return word.language1 === text
  })
  this.wordPool.push(this.wordsInUse.splice(index, 1)[0])
}

minigame.submitAnswer = () => {
  let mg = this
  this.wordsInUse.forEach((word) => {
    if (mg.textEntry.text === word.language2) {
      mg.destroyZombieByWord(word.language1)
      mg.releaseVocabWord(word.language1)
      mg.score++
      mg.scoreValue.text = mg.score
    }
  })

  this.textEntry.text = ''
}

minigame.destroyZombieByWord = (word) => {
  let index = this.zombies.findIndex((zombie) => {
    return zombie.text.text === word
  })
  this.zombies[index].text.destroy()
  this.zombies[index].destroy()
  this.zombies.splice(index, 1)
}

minigame.gameTimerFinish = () => {

}

// TODO: move to helper class
function isLetter(keyCode) {
  return keyCode >= 65 && keyCode <= 90
}

export default minigame
