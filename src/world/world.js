import CreateWorld from './createWorld';
import House from '../house';
import Junkyard from '../junkyard';
import Road from '../road';
import { STRING_TILES } from '../const';
import Truck from '../truck';
import { runInThisContext } from 'vm';

export default class World {
  constructor(height, width) {
    this.map = new CreateWorld(height, width).createMap();
    this.trucks = [];
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

  loadTrucks(){
    this.trucks.forEach(truck => {
      if(this.map[truck.positionY][truck.positionX+1] && (this.map[truck.positionY][truck.positionX+1] instanceof House || this.map[truck.positionY][truck.positionX+1] instanceof Junkyard)){
        this.map[truck.positionY][truck.positionX+1].giveTrash(truck);
      }
      if(this.map[truck.positionY][truck.positionX-1] && (this.map[truck.positionY][truck.positionX-1] instanceof House || this.map[truck.positionY][truck.positionX-1] instanceof Junkyard)){
        this.map[truck.positionY][truck.positionX-1].giveTrash(truck);
      }
      if(this.map[truck.positionY+1] && (this.map[truck.positionY+1][truck.positionX] instanceof House || this.map[truck.positionY+1][truck.positionX] instanceof Junkyard)){
        this.map[truck.positionY+1][truck.positionX].giveTrash(truck);
      }
      if(this.map[truck.positionY-1] && (this.map[truck.positionY-1][truck.positionX] instanceof House || this.map[truck.positionY-1][truck.positionX] instanceof Junkyard)){
        this.map[truck.positionY-1][truck.positionX].giveTrash(truck);
      }
    })
  }

  addTruck(positionX, positionY) {
    const t = new Truck(positionX, positionY, 100);
    this.trucks.push(t);
    return t;
  }

  findPlaceOnRoad(fromX, fromY, toX, toY) {
    const roadMap = this.getRoadMap();
    for (let y = fromY; y < toY; y++) {
      for (let x = fromX; x < toX; x++) {
        if (roadMap[y][x] === 0) {
          return { x, y };
        }
      }
    }
    return null;
  }

  getObject(positionX, positionY) {
    return this.map[positionY][positionX];
  }

  isDriveable(positionX, positionY) {
    return this.map[positionY][positionX] === STRING_TILES.road;
  }

  getRoadMap() {
    return this.getWholeMap().map(e =>
      e.map(o => (o === STRING_TILES.road ? STRING_TILES.road : STRING_TILES.notRoad)),
    );
  }

  getWholeMap() {
    const newMap = this.map.map(e =>
      e.map(o => {
        if (o instanceof House) {
          return STRING_TILES.house;
        }
        if (o instanceof Junkyard) {
          return STRING_TILES.junkyard;
        }
        if (o instanceof Road) {
          return STRING_TILES.road;
        }
        return o;
      }),
    );
    this.trucks.forEach(t => {
      newMap[t.positionY][t.positionX] = STRING_TILES.truck;
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
