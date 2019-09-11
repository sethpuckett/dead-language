import unlockableItemMap from '../config/unlockableItemMap';
import { unlockableItems } from '../config';

// TODO: Move this to db
const GLOBAL_UNLOCKED_ITEMS = [unlockableItems.normalZombie];
const DEMO_UNLOCKED_ITEMS = [unlockableItems.sprinterZombie, unlockableItems.foodTier1];

export default class {
  constructor(db) {
    this.db = db;
  }

  isUnlocked(itemType) {
    if (!this.db.isUserLoggedIn()) {
      return GLOBAL_UNLOCKED_ITEMS.includes(itemType)
        || DEMO_UNLOCKED_ITEMS.includes(itemType);
    }

    if (this.db.userProfileLoaded) {
      const userUnlocked = this.db.userProfile.unlockedItems;
      return GLOBAL_UNLOCKED_ITEMS.includes(itemType)
        || (userUnlocked != null && userUnlocked.includes(itemType));
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  getUnlockedItems() {
    if (!this.db.isUserLoggedIn()) {
      return GLOBAL_UNLOCKED_ITEMS.concat(DEMO_UNLOCKED_ITEMS);
    }

    if (this.db.userProfileLoaded) {
      const unlocked = this.db.userProfile.unlockedItems;
      return unlocked != null ? unlocked : [];
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  getUnlockedItemsForStage(stageId) {
    const itemConfigs = unlockableItemMap.filter(i => i.stage === stageId);
    return itemConfigs.map(c => c.item);
  }
}
