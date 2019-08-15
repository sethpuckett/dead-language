import { gameTypes } from '../config';

export default {
  getName: id => gameTypes.names[Object.keys(gameTypes).find(key => gameTypes[key] === id)],
  getDescription: id => gameTypes.descriptions[
    Object.keys(gameTypes).find(key => gameTypes[key] === id)
  ],
};
