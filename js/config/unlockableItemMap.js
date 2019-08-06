import unlockableItems from './unlockableItems';
import lessons from './lessons';

// TODO: move this to db
export default [
  {
    item: unlockableItems.sprinterZombie,
    stage: lessons.basicVocab.stage1,
  },
  {
    item: unlockableItems.foodTier1,
    stage: lessons.basicVocab.stage2,
  },
  {
    item: unlockableItems.cash,
    stage: lessons.basicVocab.stage3,
  },
  {
    item: unlockableItems.mercenary,
    stage: lessons.basicVocab.stage3,
  },
  // TODO: enable when review zombies are implemented
  // {
  //   item: unlockableItems.reviewZombie,
  //   stage: lessons.basicVocab.review,
  // },
  {
    item: unlockableItems.bruiserZombie,
    stage: lessons.nouns1.stage1,
  },
  {
    item: unlockableItems.bruiserZombie,
    stage: lessons.numbers1.stage1,
  },
  {
    item: unlockableItems.shotgun,
    stage: lessons.nouns1.stage2,
  },
  {
    item: unlockableItems.shotgun,
    stage: lessons.numbers1.stage2,
  },
];
