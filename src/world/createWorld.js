import {
  BIN_TYPES,
  JUNKYARD,
  JUNK_IMAGES,
  MAX_BIN_SIZE,
  ROADS_FACTOR,
  ROAD_WEIGHT,
  STRING_TILES,
  TRASH_IMAGES,
} from '../const';

import Bin from '../bin';
import House from '../house';
import Junkyard from '../junkyard';
import Road from '../road';

export default class CreateWorld {
  constructor(height, width) {
    this.size = { height, width };
    this.map = new Array(height).fill(0).map(() => new Array(width).fill(STRING_TILES.notRoad));
    this.trucks = [];
  }

  createMap() {
    this.placeRoads();

    this.placeJunkYards();

    this.placeHouses();

    return this.map;
  }

  bins() {
    const bins = [];
    const mixFoto = TRASH_IMAGES.mix[Math.floor(Math.random() * TRASH_IMAGES.mix.length)];
    const mixFotoTrash = JUNK_IMAGES.mix[Math.floor(Math.random() * JUNK_IMAGES.mix.length)];

    bins.push(
      new Bin(BIN_TYPES[0], `trash/mix/${mixFoto}`,`insideBin/mix/${mixFotoTrash}` ,Math.floor(Math.random() * MAX_BIN_SIZE) + 1),
    );

    const types = [...BIN_TYPES];
    types.shift();

    types.forEach(type => {
      if (Math.random() < 0.4) {
        const foto = TRASH_IMAGES[type][Math.floor(Math.random() * TRASH_IMAGES[type].length)];
        const trashPhoto = JUNK_IMAGES[type][Math.floor(Math.random() * JUNK_IMAGES[type].length)];
        console.log(foto);
        console.log(trashPhoto);
        bins.push(
          new Bin(type, `trash/${type}/${foto}`, `insideBin/${type}/${trashPhoto}`,Math.floor(Math.random() * MAX_BIN_SIZE) + 1),
        );
      }
    });

    return bins;
  }

  house(indexWidth, indexHeight) {
    return new House(this.bins(), {
      posX: indexWidth,
      posY: indexHeight,
    });
  }

  placeHouses() {
    this.map = this.map.map((row, indexHeight) =>
      row.map(
        (cell, indexWidth) =>
          cell === 1 && Math.random() < 0.3 && this.isThisNextToRoad([indexHeight, indexWidth])
            ? this.house(indexWidth, indexHeight)
            : cell,
      ),
    );
  }

  placeJunkYards() {
    for (let i = 0; i < 1; i += 1) {
      const positionHeight = Math.floor(Math.random() * this.size.height);
      const positionWidth = Math.floor(Math.random() * this.size.width);
      if (this.isThisNextToRoad([positionHeight, positionWidth])) {
        this.map[positionHeight][positionWidth] = new Junkyard(JUNKYARD,{posY: positionHeight, posX: positionWidth});
      } else {
        i -= 1;
      }
    }
  }

  placeRoads() {
    let arrayOfNumbers = [];
    for (let i = 0; i < this.size.height / ROADS_FACTOR; i += 1) {
      const position = Math.floor(Math.random() * this.size.height);
      const isFine = arrayOfNumbers.every(cell => Math.abs(cell - position) > 2);
      if (isFine) {
        arrayOfNumbers.push(position);
        this.map[position] = new Array(this.size.width).fill(
          new Road(Math.floor(Math.random() * ROAD_WEIGHT)),
        );
      } else {
        i -= 1;
      }
    }
    arrayOfNumbers = [];
    for (let i = 0; i < this.size.width / ROADS_FACTOR; i += 1) {
      const position = Math.floor(Math.random() * this.size.width);
      const isFine = arrayOfNumbers.every(cell => Math.abs(cell - position) > 2);
      if (isFine) {
        arrayOfNumbers.push(position);
        this.map.map(cell => (cell[position] = new Road(Math.floor(Math.random() * ROAD_WEIGHT)))); // eslint-disable-line
      } else {
        i -= 1;
      }
    }
  }

  isThisNextToRoad(position) {
    if (this.map[position[0]][position[1]] instanceof Road) {
      return false;
    }
    if (
      this.map[position[0]][position[1] - 1] &&
      this.map[position[0]][position[1] - 1] instanceof Road
    ) {
      return true;
    }
    if (
      this.map[position[0]][position[1] + 1] &&
      this.map[position[0]][position[1] + 1] instanceof Road
    ) {
      return true;
    }
    if (this.map[position[0] - 1] && this.map[position[0] - 1][position[1]] instanceof Road) {
      return true;
    }
    if (this.map[position[0] + 1] && this.map[position[0] + 1][position[1]] instanceof Road) {
      return true;
    }
    return false;
  }
}
