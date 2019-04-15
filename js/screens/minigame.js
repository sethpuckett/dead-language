import vocab from '../vocab'
import config from '../config'
import Phaser from 'phaser'

const SPAWN_PADDING_PERCENT = 10
const SPEED_MODIFIER = 500000

// let firestore = firebase.firestore()
// const lessonRef = firestore.collection('lessons').where('name', '==', 'Basic Phrases').get().then((snap) => {
//   snap.forEach(function(doc) {
//     minigame.wordPool = [...doc.data().vocab]
//   })
// });

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Minigame' })
  }

  init() {
    this.wordPool = [...vocab.words]
    this.wordsInUse = []
    this.zombies = []
    this.score = 0
    this.damage = 0
  }

  create() {
    // TODO: text location should be in config
    this.textEntry = this.add.text(10, this.cameras.main.height - 40, '', config.minigame.fonts.entry)
    this.scoreLabel = this.add.text(10, 10, 'Kills:', config.minigame.fonts.label)
    // TODO: calculate X value based on width of score label
    this.scoreValue = this.add.text(125, 10, this.score, config.minigame.fonts.value)
    this.damageLabel = this.add.text(this.cameras.main.width - 175, 10, 'Misses:', config.minigame.fonts.label)
    this.damageValue = this.add.text(this.cameras.main.width - 40, 10, this.damage, config.minigame.fonts.value)
    this.timerLabel = this.add.text(this.cameras.main.width / 2 - 200, 10, 'Time Remaining:', config.minigame.fonts.label)
    this.timerValue = this.add.text(this.cameras.main.width / 2 + 92, 10, '', config.minigame.fonts.value)

    this.gameTimer = this.time.addEvent({
      delay: config.minigame.gameTime * 1000,
      callback: this.gameTimerFinish,
      callbackScope: this
    })

    // TODO: this key stuff is a mess. Move it or clean it up or something
    this.keys = this.input.keyboard.addKeys('SPACE, BACKSPACE, ENTER, A,B,C')
    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === this.keys.BACKSPACE.keyCode && this.textEntry.text.length > 0) {
        this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1)
      } else if (this.isLetter(event.keyCode) || event.keyCode === this.keys.SPACE.keyCode) {
        this.textEntry.text += event.key
      } else if (event.keyCode === this.keys.ENTER.keyCode) {
        this.submitAnswer()
      }
    }, this)

    this.anims.create({
      key: config.animations.zombieWalk,
      frames: this.anims.generateFrameNames(config.images.zombie.key, {
        frames: [0, 1, 0, 2]
      }),
      frameRate: 10,
      repeat: -1
    })

    this.lineGraphics = this.add.graphics({ lineStyle: config.minigame.ui.failLineStyle })
    this.failLine = new Phaser.Geom.Line(
      0,
      this.cameras.main.height - config.minigame.ui.entryHeight,
      this.cameras.main.width,
      this.cameras.main.height - config.minigame.ui.entryHeight
    )
    this.lineGraphics.strokeLineShape(this.failLine)

    // TODO: make configurable way to visualize rect for debugging
    this.playerHitRect = new Phaser.Geom.Rectangle(
      0,
      this.cameras.main.height - config.minigame.ui.entryHeight,
      this.cameras.main.width,
      config.minigame.ui.entryHeight
    )

    // TODO: will need more sophisticated depth management when more layers are added
    this.background = this.add.tileSprite(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height - config.minigame.ui.entryHeight,
      'grass'
    )
    this.background.setOrigin(0, 0)
    this.background.setDepth(-1)

    // TODO: Understand why this is necessary
    this.spawnTimer = null
    this.activateSpawnTimer()
  }

  update(_time, delta) {
    this.zombies.forEach((zombie) => {
      let movement = this.getMovement(zombie.speed, delta)
      zombie.y += movement
      zombie.text.y += movement
    })

    let remaining = config.minigame.gameTime - this.gameTimer.getElapsedSeconds()
    this.timerValue.text = remaining.toFixed(1)

    this.checkZombieAttack()
    this.destroyDeadZombies()
  }

  gameTimerFinish() {
    // this.scene.transition({
    //   target: config.screens.endgame,
    //   duration: 0,
    //   remove: true,
    //   data: { kills: this.score, misses: this.damage }
    // })
    this.scene.start(config.screens.endgame, { kills: this.score, misses: this.damage })
  }

  getMovement(speed, delta) {
    // TODO: calculate this once upfront
    let totalDistance = this.cameras.main.height - config.minigame.ui.entryHeight
    return speed * delta * totalDistance / SPEED_MODIFIER
  }

  checkZombieAttack() {
    this.zombies.forEach((zombie) => {
      if (Phaser.Geom.Intersects.RectangleToRectangle(zombie.getBounds(), this.playerHitRect)) {
        this.changeDamage(1)
        zombie.alive = false
      }
    })
  }

  changeDamage(amount) {
    this.damage += amount
    this.damageValue.text = this.damage
  }

  destroyDeadZombies() {
    this.zombies.filter(z => !z.alive).forEach(z => {
      this.releaseVocabWord(z.text.text)
      z.text.destroy()
      z.destroy()
    })

    this.zombies = this.zombies.filter(z => z.alive)
  }

  activateSpawnTimer() {
    if (this.spawnTimer != null) {
      this.spawnTimer.reset({
        delay: this.getSpawnDelay(),
        callback: this.spawnZombie,
        callbackScope: this,
        repeat: 1
      })
    } else {
      this.spawnTimer = this.time.addEvent({
        delay: this.getSpawnDelay(),
        callback: this.spawnZombie,
        callbackScope: this
      })
    }
  }

  getSpawnLocation() {
    // TODO: calculate this upfront, not every time
    let pad = this.cameras.main.width * SPAWN_PADDING_PERCENT / 100
    return Phaser.Math.RND.between(pad, this.cameras.main.width - pad)
  }

  getSpawnDelay() {
    return config.minigame.baseSpawnRate + Phaser.Math.RND.between(
      -config.minigame.spawnRange, config.minigame.spawnRange
    )
  }

  getFallSpeed() {
    return (config.minigame.baseFallSpeed + Phaser.Math.RND.between(
      -config.minigame.fallRange, config.minigame.fallRange
    ))
  }

  spawnZombie() {
    // TODO: add zombie class to store extra data
    let zombie = this.add.sprite(
      this.getSpawnLocation(),
      -35, // TODO: don't hard code this here. Should be const (based on camera size)
      'zombie',
      0
    )
    zombie.setScale(0.6, 0.6) // TODO: Don't hard code this
    zombie.speed = this.getFallSpeed()
    // TODO: don't hard code position (need to calculate center)
    // TODO: pulling language1 off this is ugly. Move to helper class?
    zombie.text = this.add.text(zombie.x - 25, -10, this.reserveVocabWord().language1, config.minigame.fonts.zombie)
    zombie.alive = true
    zombie.play(config.animations.zombieWalk)
    this.zombies.push(zombie)

    // TODO: Wrap spawning in a higher level process. Starting timer should not be here.
    this.activateSpawnTimer()
  }

  reserveVocabWord() {
    // TODO: error handling for empty pool
    let poolIndex = Phaser.Math.RND.between(0, this.wordPool.length - 1)
    let word = this.wordPool.splice(poolIndex, 1)[0]
    this.wordsInUse.push(word)
    return word
  }

  // TODO: add helper class to manage vocab lists
  releaseVocabWord(text) {
    let index = this.wordsInUse.findIndex((word) => {
      return word.language1 === text
    })
    this.wordPool.push(this.wordsInUse.splice(index, 1)[0])
  }

  submitAnswer() {
    this.wordsInUse.forEach((word) => {
      if (this.textEntry.text === word.language2) {
        this.destroyZombieByWord(word.language1)
        this.score++
        this.scoreValue.text = this.score
      }
    })

    this.textEntry.text = ''
  }

  destroyZombieByWord(word) {
    let zombie = this.zombies.find(z => z.text.text === word)
    zombie.alive = false
  }

  // TODO: move to helper class
  isLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90
  }
}
