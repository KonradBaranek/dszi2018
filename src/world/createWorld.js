import House from '../house';
import Junkyard from '../junkyard';
import Road from '../road';
import { STRING_TILES } from '../enum';
import Truck from '../truck';

export default class CreateWorld {
  constructor(height, width) {
    this.size = { height, width };
    this.map = new Array(height).fill(0).map(() => new Array(width).fill(STRING_TILES.notRoad));
    this.trucks = [];
  }

  createMap() {
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
        this.map.map(cell => (cell[position] = new Road()));
      } else {
        i -= 1;
      }
    }

    return this.map;
  }

  // eslint-disable-next-line
  isThereAnyNearNumber(array, newNumber) {}

  isThisInXTileFromRoadWidth(position, range) {
    if (this.map[0][position] instanceof Road) {
      return true;
    }

    for (let i = 1; i <= range; i += 1) {
      if (this.map[0][position - i] && this.map[0][position - i] instanceof Road) {
        return true;
      }
      if (this.map[0][position + i] && this.map[0][position + i] instanceof Road) {
        return true;
      }
    }
    return false;
  }

  isThisInXTileFromRoadHeight(position, range) {
    if (this.map[position][0] instanceof Road) {
      return true;
    }

    for (let i = 1; i <= range; i += 1) {
      if (this.map[position - i] && this.map[position - i][0] instanceof Road) {
        return true;
      }
      if (this.map[position + i] && this.map[position + i][0] instanceof Road) {
        return true;
      }
    }
    return false;
  }
}
