import unlockableItemMap from '../config/unlockableItemMap';

export default class {
  constructor(db) {
    this.db = db;
  }

  isUnlocked(itemType) {
    if (!this.db.isUserLoggedIn()) {
      return false;
    }

    if (this.db.userProfileLoaded) {
      const unlocked = this.db.userProfile.unlockedItems;
      return unlocked != null && unlocked.includes(itemType);
    }
    throw Error('user profile has not been loaded. Call loadUserProfile() first');
  }

  getUnlockedItems() {
    if (!this.db.isUserLoggedIn()) {
      return [];
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
