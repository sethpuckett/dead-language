import vocab from '../vocab'
import { minigame, animations, images, screens } from '../config'
import minigameUiHelper from './ui/minigameUiHelper'
import Phaser from 'phaser'

const SPAWN_PADDING_PERCENT = 10
const SPEED_MODIFIER = 1000000

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

    this.totalDistance = this.sys.game.config.height - minigame.ui.entryHeight
    this.spawnPadding = this.sys.game.config.width * SPAWN_PADDING_PERCENT / 100
  }

  create() {
    this.createBackground()
    this.createUi()
    this.createAnimations()
    this.createCollisions()
    this.createInput()
    this.createTimers()

    this.startGame()
  }

  update(_time, delta) {
    this.zombies.forEach((zombie) => {
      let movement = this.getMovement(zombie.speed, delta)
      zombie.y += movement
      zombie.text.y += movement
    })

    let remaining = minigame.gameTime - this.gameTimer.getElapsedSeconds()
    this.timerValue.text = remaining.toFixed(1)

    this.checkZombieAttack()
    this.destroyDeadZombies()
  }

  createUi() {
    let ui = minigameUiHelper(this.sys.game.config)

    // Text Entry
    this.textEntry = this.add.text(ui.textEntryX, ui.textEntryY, '', minigame.fonts.entry)
    this.textEntry.setOrigin(ui.textEntryOriginX, ui.textEntryOriginY)

    // Kills
    this.killLabel = this.add.text(ui.killLabelX, ui.killLabelY, 'Kills:', minigame.fonts.label)
    this.killLabel.setOrigin(ui.killOriginX, ui.killOriginY)
    this.killValue = this.add.text(ui.killValueX(this.killLabel), ui.killValueY, this.score, minigame.fonts.value)
    this.killValue.setOrigin(ui.killOriginX, ui.killOriginY)

    // Misses
    this.missLabel = this.add.text(ui.missLabelX, ui.missLabelY, 'Misses:', minigame.fonts.label)
    this.missLabel.setOrigin(ui.missOriginX, ui.missOriginY)
    this.missValue = this.add.text(ui.missValueX(this.missLabel), ui.missValueY, this.damage, minigame.fonts.value)
    this.missValue.setOrigin(ui.missOriginX, ui.missOriginY)

    // Timer
    this.timerLabel = this.add.text(ui.timerLabelX, ui.timerLabelY, 'Time Remaining:', minigame.fonts.label)
    this.timerLabel.setOrigin(ui.timerLabelOriginX, ui.timerLabelOriginY)
    this.timerValue = this.add.text(ui.timerValueX(this.timerLabel), ui.timerValueY, '', minigame.fonts.value)
    this.timerValue.setOrigin(ui.timerValueOriginX, ui.timerValueOriginY)

    // Fail Line
    this.lineGraphics = this.add.graphics({ lineStyle: minigame.ui.failLineStyle })
    this.failLine = new Phaser.Geom.Line(
      0,
      this.cameras.main.height - minigame.ui.entryHeight,
      this.cameras.main.width,
      this.cameras.main.height - minigame.ui.entryHeight
    )
    this.lineGraphics.strokeLineShape(this.failLine)
  }

  createBackground() {
    this.background = this.add.tileSprite(
      0, 0,
      this.sys.game.config.width,
      this.sys.game.config.height - minigame.ui.entryHeight,
      'grass'
    )
    this.background.setOrigin(0, 0)
    this.background.setDepth(-1)
  }

  createAnimations() {
    this.anims.create({
      key: animations.zombieWalk,
      frames: this.anims.generateFrameNames(images.zombie, { frames: [0, 1, 0, 2] }),
      frameRate: 10,
      repeat: -1
    })
  }

  createCollisions() {
    this.playerHitRect = new Phaser.Geom.Rectangle(
      0,
      this.cameras.main.height - minigame.ui.entryHeight,
      this.cameras.main.width,
      minigame.ui.entryHeight
    )
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys(
      'SPACE,BACKSPACE, ENTER, A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
    )
    this.input.keyboard.on('keydown', this.handleKeyDown, this)
  }

  createTimers() {
    this.gameTimer = this.time.addEvent({
      delay: minigame.gameTime * 1000,
      callback: this.gameTimerFinish,
      callbackScope: this,
      paused: true
    })

    this.spawnTimer = this.time.addEvent({
      delay: this.getSpawnDelay(),
      callback: this.spawnZombie,
      callbackScope: this,
      paused: true
    })
  }

  startGame() {
    this.gameTimer.paused = false
    this.spawnTimer.paused = false
  }

  handleKeyDown(event) {
    if (event.keyCode === this.keys.BACKSPACE.keyCode && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1)
    } else if (this.isLetter(event.keyCode) || event.keyCode === this.keys.SPACE.keyCode) {
      this.textEntry.text += event.key
    } else if (event.keyCode === this.keys.ENTER.keyCode) {
      this.submitAnswer()
    }
  }

  gameTimerFinish() {
    this.scene.start(screens.endgame, { kills: this.score, misses: this.damage })
  }

  getMovement(speed, delta) {
    return speed * delta * this.totalDistance / SPEED_MODIFIER
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
    this.missValue.text = this.damage
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
    this.spawnTimer.reset({
      delay: this.getSpawnDelay(),
      callback: this.spawnZombie,
      callbackScope: this,
      repeat: 1
    })
  }

  getSpawnLocation() {
    return Phaser.Math.RND.between(this.spawnPadding, this.cameras.main.width - this.spawnPadding)
  }

  getSpawnDelay() {
    let wave = this.getCurrentWave()
    let percentToMax = 1
    let easedPercent = 1
    let curTime = this.gameTimer.getElapsedSeconds()
    if (curTime < wave.maxStart) {
      percentToMax = (curTime - wave.start) / (wave.maxStart - wave.start)
      easedPercent = Phaser.Math.Easing.Cubic.InOut(percentToMax)
    } else if (curTime > wave.maxEnd) {
      percentToMax = (curTime - wave.maxEnd) / (wave.end - wave.maxEnd)
      easedPercent = 1 - Phaser.Math.Easing.Cubic.InOut(percentToMax)
    }

    let delay = 1000 * (1 - easedPercent)

    return delay + wave.baseSpawnRate + Phaser.Math.RND.between(
      -wave.spawnRange, wave.spawnRange
    )
  }

  getCurrentWave() {
    let waves = minigame.waves
    let curTime = this.gameTimer.getElapsedSeconds()
    return waves.find(el => el.start <= curTime && el.end > curTime)
  }

  getFallSpeed() {
    return (minigame.baseFallSpeed + Phaser.Math.RND.between(
      -minigame.fallRange, minigame.fallRange
    ))
  }

  spawnZombie() {
    let zombie = this.add.sprite(
      this.getSpawnLocation(),
      -35, // TODO: don't hard code this here. Should be const (based on camera size)
      'zombie',
      0
    )
    zombie.setScale(0.6, 0.6) // TODO: Don't hard code this
    zombie.speed = this.getFallSpeed()
    zombie.text = this.add.text(zombie.x - 25, -10, this.reserveVocabWord().language1, minigame.fonts.zombie)
    zombie.alive = true
    zombie.play(animations.zombieWalk)
    this.zombies.push(zombie)

    // TODO: Wrap spawning in a higher level process. Starting timer should not be here.
    this.activateSpawnTimer()
  }

  reserveVocabWord() {
    let poolIndex = Phaser.Math.RND.between(0, this.wordPool.length - 1)
    let word = this.wordPool.splice(poolIndex, 1)[0]
    this.wordsInUse.push(word)
    return word
  }

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
        this.killValue.text = this.score
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
