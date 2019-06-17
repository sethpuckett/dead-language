import { images, weapons } from '../config';

export default {
  getImageFrame: (weapon) => {
    switch (weapon) {
      case weapons.pistol:
        return images.frames.weaponPistol;
      case weapons.shotgun:
        return images.frames.weaponShotgun;
      case weapons.rifle:
        return images.frames.weaponRifle;
      case weapons.rocketLauncher:
        return images.frames.weaponRocketLauncher;
      default:
        throw Error('Invalid weapon value');
    }
  },
};
