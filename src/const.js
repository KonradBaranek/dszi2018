export const STRING_TILES = { road: 0, notRoad: 1, house: 2, truck: 3, junkyard: 4 };
export const NUMBER_TILES = {
  '0': 'road',
  '1': 'notRoad',
  '2': 'house',
  '3': 'truck',
  '4': 'junkyard',
};

export const JUNKYARD = [['mix', 2000], ['plastic', 2000], ['paper', 2000], ['metal', 2000]];

export const ROADS_FACTOR = 4; // cannot be smaller than 4 (will freeze brovser)

export const MAX_BIN_SIZE = 4;
export const BIN_TYPES = ['mix', 'plastic', 'paper', 'metal'];

export const DIRECTIONS = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};
