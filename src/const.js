import imagesInTrash from './imagesInTrash.json';
import imagesIsTrashBin from './imagesIsTrashBin.json';
import imagesJSON from './images.json';

export const TRASH_IMAGES = imagesJSON;
export const JUNK_IMAGES = imagesInTrash;
export const IS_BIN_IMAGES = imagesIsTrashBin;

export const IS_TRASH_BIN_PREDICTION = {
  bin: [1, 0],
  nobin: [0, 1],
};

export const TRASH_PREDICTION = {
  papier: [1, 0, 0, 0, 0],
  plasticAlm: [0, 1, 0, 0, 0],
  szklo: [0, 0, 1, 0, 0],
  bio: [0, 0, 0, 1, 0],
  mix: [0, 0, 0, 0, 1],
};

export const STRING_TILES = { road: 0, notRoad: 1, house: 2, truck: 3, junkyard: 4 };
export const NUMBER_TILES = {
  '0': 'road',
  '1': 'notRoad',
  '2': 'house',
  '3': 'truck',
  '4': 'junkyard',
};

export const ROAD_WEIGHT = 4;

export const ACTIONS = { turnLeft: 0, turnRight: 1, move: 2 };

export const JUNKYARD = {
  mix: 0,
  plasticAlm: 0,
  papier: 0,
  szklo: 0,
  bio: 0,
};

export const ROADS_FACTOR = 4; // cannot be smaller than 4 (will freeze brovser)

export const MAX_BIN_SIZE = 4;
export const BIN_TYPES = ['mix', 'plasticAlm', 'papier', 'szklo', 'bio'];
export const PREVERIFICATION_TYPES = ['bin', 'nobin'];

export const DIRECTIONS = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};
