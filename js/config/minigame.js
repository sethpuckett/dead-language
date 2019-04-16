export default {
  waves: [
    {
      baseSpawnRate: 1500,
      spawnRange: 250,
      start: 0,
      maxStart: 20,
      maxEnd: 40,
      end: 60
    },
    {
      baseSpawnRate: 1250,
      spawnRange: 200,
      start: 60,
      maxStart: 80,
      maxEnd: 100,
      end: 120
    },
    {
      baseSpawnRate: 1000,
      spawnRange: 150,
      start: 120,
      maxStart: 140,
      maxEnd: 160,
      end: 180
    }
  ],
  baseFallSpeed: 25,
  fallRange: 7,
  gameTime: 180,
  fonts: {
    entry: { font: '32px Courier', fill: '#ffff00' },
    label: { font: '32px Courier', fill: '#ffff00' },
    value: { font: '32px Courier', fill: '#ff0000' },
    zombie: { font: '16px Courier', fill: '#ffffff' }
  },
  ui: {
    entryHeight: 60,
    failLineStyle: { width: 2, color: 0xaa0000 }
  }
}
