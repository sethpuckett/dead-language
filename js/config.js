// TODO: separate user-configurable values
export default {
  minigame: {
    baseFallSpeed: 40,
    fallRange: 15,
    baseSpawnRate: 1500,
    spawnRange: 1000,
    gameTime: 60,
    fonts: {
      entry: { font: '32px Courier', fill: '#ffff00' },
      label: { font: '32px Courier', fill: '#ffff00' },
      value: { font: '32px Courier', fill: '#ff0000' },
      zombie: { font: '16px Courier', fill: '#ffffff' }
    },
    ui: {
      entryHeight: 50,
      failLineStyle: { width: 2, color: 0xaa0000 }
    }
  },
  images: {
    zombie: { key: 'zombie', file: 'assets/images/zombie.png' },
    grass: { key: 'grass', file: 'assets/images/grass.png' },
    loading: { key: 'loading', file: 'assets/images/loading.png' },
    start: { key: 'start', file: 'assets/images/start.png' }
  },
  animations: {
    zombieWalk: 'zombie-walk'
  },
  screens: {
    boot: 'Boot',
    loading: 'Loading',
    titleMenu: 'TitleMenu',
    minigame: 'Minigame',
    endgame: 'Endgame'
  },
  debug: {
    slowLoad: false
  }
}
