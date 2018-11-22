import World from './world';
import { drawMap } from './map';

const z = new World(10, 10);

const mapLog = () => {
  console.clear();
  console.log(z.getMap());
};

z.addHouse(5, 1);
z.addHouse(5, 2);
z.addHouse(5, 3);
z.addHouse(5, 4);
z.addHouse(5, 5);
z.addHouse(5, 6);
z.addHouse(5, 7);
z.addHouse(5, 8);
z.addHouse(5, 9);

z.addHouse(3, 1);
z.addHouse(3, 2);
z.addHouse(3, 3);
z.addHouse(3, 4);
z.addHouse(3, 5);
z.addHouse(3, 6);
z.addHouse(3, 7);
z.addHouse(3, 8);
z.addHouse(3, 0);

z.addHouse(0, 5);
z.addHouse(0, 6);
z.addHouse(0, 7);
z.addHouse(0, 8);

for (let i = 0; i < z.getMap().length; i += 1) {
  z.placeOnMap(z.TILES.notRoad, i, Math.floor(Math.random() * 9) + 1);
}

z.addJunkyard(0, 0);
z.addJunkyard(0, 1, ['metal', 500]);
z.addJunkyard(0, 2, ['paper', 2000]);
z.addJunkyard(0, 3, ['plastic', 1000]);

const t = z.addTruck(0, 4);

drawMap(z);

console.log(z.getMap());
