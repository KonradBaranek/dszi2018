import { ACTIONS } from './const';
import AStar from './A-star/aStar';
import BinTypeReco from './binTypeReco';
import State from './A-star/state';
import World from './world/world';
import { drawMap } from './world/drawWorld';

const world = new World(10, 10);
const startPos = world.findPlaceOnRoad(0, 0, 5, 5);
const goalPos = world.findPlaceOnRoad(5, 5, 10, 10);
const t = world.addTruck(startPos.x, startPos.y);
drawMap(world);
if (t) {
  const actions = new AStar(
    world,
    new State(t.positionX, t.positionY, 0),
    new State(goalPos.x, goalPos.y, 1),
  ).givePath();
  const interval = setInterval(() => {
    if (!actions.length) {
      clearInterval(interval);
    } else {
      switch (actions.shift()) {
        case ACTIONS.turnLeft:
          t.turnLeft();
          break;
        case ACTIONS.turnRight:
          t.turnRight();
          break;
        case ACTIONS.move:
          t.move();
          break;
        default:
          break;
      }
    }
    drawMap(world);
  }, 1000);
}

const binTypeReco = new BinTypeReco();

setTimeout(() => {
  binTypeReco.predictPhoto('./trash/bio/papier.jpg', 'papier');
}, 1000);
