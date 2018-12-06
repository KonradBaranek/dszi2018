import AStar from './A-star/aStar';
import State from './A-star/state';
import World from './world/world';
import { drawMap } from './world/drawWorld';

const z = new World(10, 10);
const t = z.addTruck(0, 4);
drawMap(z);

console.log(
  new AStar(
    [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
    new State(1, 1, 1),
    new State(4, 1, 1),
  ).givePath(),
);

setTimeout(() => {
  t.move();
  drawMap(z);
}, 1000);

setTimeout(() => {
  t.turnRight();
  drawMap(z);
}, 1500);

setTimeout(() => {
  t.move();
  drawMap(z);
}, 2000);

setTimeout(() => {
  t.turnRight();
  drawMap(z);
}, 2500);

setTimeout(() => {
  t.move();
  drawMap(z);
}, 3000);

setTimeout(() => {
  t.turnRight();
  drawMap(z);
}, 3500);

setTimeout(() => {
  t.move();
  drawMap(z);
}, 4000);

setTimeout(() => {
  t.turnLeft();
  drawMap(z);
}, 4500);

setTimeout(() => {
  t.move();
  drawMap(z);
}, 5000);

setTimeout(() => {
  t.turnLeft();
  drawMap(z);
}, 5500);

setTimeout(() => {
  t.move();
  drawMap(z);
}, 6000);

setTimeout(() => {
  t.turnLeft();
  drawMap(z);
}, 6500);

setTimeout(() => {
  t.move();
  drawMap(z);
}, 7000);

setTimeout(() => {
  t.turnLeft();
  drawMap(z);
}, 7500);

setTimeout(() => {
  t.move();
  drawMap(z);
}, 8000);

setTimeout(() => {
  t.turnLeft();
  drawMap(z);
}, 8500);

setTimeout(() => {
  t.move();
  drawMap(z);
}, 9000);
