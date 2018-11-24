import { JUNKYARD, STRING_TILES } from '../const';

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

    this.map = this.map.map((row, indexHeight) =>
      row.map(
        (cell, indexWidth) =>
          cell === 1 && this.isThisNextToRoad([indexHeight, indexWidth])
            ? new House(
                { frontPhoto: null, contentPhoto: null, type: 'mix', capacity: 2 },
                { posX: indexWidth, posY: indexHeight },
              )
            : cell,
      ),
    );

    return this.map;
  }

  placeJunkYards() {
    for (let i = 0; i < 4; i += 1) {
      const positionHeight = Math.floor(Math.random() * this.size.height);
      const positionWidth = Math.floor(Math.random() * this.size.width);
      const junkyards = JUNKYARD;
      if (this.isThisNextToRoad([positionHeight, positionWidth])) {
        this.map[positionHeight][positionWidth] = new Junkyard(...junkyards.pop());
      } else {
        i -= 1;
      }
    }
  }

  placeRoads() {
    let arrayOfNumbers = [];
    for (let i = 0; i < this.size.height / 4; i += 1) {
      const position = Math.floor(Math.random() * this.size.height);
      const isFine = arrayOfNumbers.every(cell => Math.abs(cell - position) > 2);
      if (isFine) {
        arrayOfNumbers.push(position);
        this.map[position] = new Array(this.size.width).fill(new Road());
      } else {
        i -= 1;
      }
    }
    arrayOfNumbers = [];
    for (let i = 0; i < this.size.width / 4; i += 1) {
      const position = Math.floor(Math.random() * this.size.width);
      const isFine = arrayOfNumbers.every(cell => Math.abs(cell - position) > 2);
      if (isFine) {
        arrayOfNumbers.push(position);
        this.map.map(cell => (cell[position] = new Road())); // eslint-disable-line
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
