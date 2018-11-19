import House from './house';
import Junkyard from './junkyard';
import Road from './road';
import Truck from './truck';

export default class World {
  constructor(height, width) {
    this.map = new Array(height).fill(0).map(() => new Array(width).fill(new Road()));
    this.trucks = [];
    this.TILES = { road: 0, notRoad: 1, house: 2, truck: 3, dump: 4 };
  }

  placeOnMap(object, positionX, positionY) {
    if (
      positionY < this.map.length &&
      positionX < this.map[positionY].length &&
      positionX >= 0 &&
      positionY >= 0
    ) {
      this.map[positionY][positionX] = object;
      return object;
    }
    return null;
  }

  addHouse(positionX, positionY) {
    this.placeOnMap(
      new House(
        { frontPhoto: null, contentPhoto: null, type: 'mix', capacity: 2 },
        { posX: positionX, posY: positionY },
      ),
      positionX,
      positionY,
    );
  }

  addTruck(positionX, positionY) {
    const t = new Truck(positionX, positionY, 100);
    this.trucks.push(t);
    return t;
  }

  addJunkyard(positionX, positionY, dumpType = ['mix', 2000]) {
    this.placeOnMap(new Junkyard(...dumpType), positionX, positionY);
  }

  getObject(positionX, positionY) {
    return this.map[positionY][positionX];
  }

  isDriveable(positionX, positionY) {
    return this.map[positionY][positionX] === this.TILES.road;
  }

  getRoadMap() {
    return this.map.map(e => e.map(o => (o === this.TILES.road ? 0 : 1)));
  }

  // zwraca wszystkie instancje na mapie w formie tablicy intow

  getWholeMap() {
    const newMap = this.map.map(e =>
      e.map(o => {
        if (o instanceof House) {
          return this.TILES.house;
        }
        if (o instanceof Junkyard) {
          return this.TILES.dump;
        }
        if (o instanceof Road) {
          return this.TILES.road;
        }
        return o;
      }),
    );
    this.trucks.forEach(t => {
      newMap[t.positionY][t.positionX] = this.TILES.truck;
    });
    return newMap;
  }

  getMap() {
    return this.map;
  }

  getAllObjectsOnMap() {
    const newMap = this.map.map(arr => arr.slice());

    this.trucks.forEach(t => {
      newMap[t.positionY][t.positionX] = t;
    });

    return newMap;
  }
}
