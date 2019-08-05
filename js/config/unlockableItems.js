import weapons from './weapons';
import minigameItems from './minigameItems';
import enemyTypes from './enemyTypes';

export default {
  // Weapons
  shotgun: weapons.shotgun,
  rifle: weapons.rifle,
  rocketLauncher: weapons.rocketLauncher,

  // Items
  cash: minigameItems.cash,
  foodTier1: minigameItems.foodTier1,

  // Enemies
  sprinterZombie: enemyTypes.sprinterZombie,
  bruiserZombie: enemyTypes.bruiserZombie,
  reviewZombie: enemyTypes.reviewZombie,

  // Misc
  mercenary: 'mercenary',
};
