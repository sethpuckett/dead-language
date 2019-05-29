import { gameTypes } from '../config';

export default {
  getName: id => gameTypes[Object.keys(gameTypes).find(key => gameTypes[key].id === id)].name,
  getDescription: id => gameTypes[
    Object.keys(gameTypes).find(key => gameTypes[key].id === id)
  ].description,
};
