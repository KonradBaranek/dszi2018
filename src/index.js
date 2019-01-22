import { ACTIONS } from './const';
import AStar from './A-star/aStar';

import State from './A-star/state';
import World from './world/world';
import { drawMap } from './world/drawWorld';
import RouteFinder from './carAI/routeFinder';

const world = new World(10, 10);
const t = world.addTruck(0, 0);

const routeFinder = new RouteFinder(world, t, 100, 50, 0.15);
const routePoints = routeFinder.simulate();
t.positionX = routePoints[0].position.x;
t.positionY = routePoints[0].position.y;
routePoints.shift();
world.loadTrucks();
if (t) {
  function drive() {
    const point = routePoints.shift();
    if (!point) {
      return;
    }
    console.log('points', routePoints);
    const actions = new AStar(
      world,
      new State(t.positionX, t.positionY, t.direction),
      new State(point.position.x, point.position.y, 1),
    ).givePath();
    const interval = setInterval(() => {
      if (!actions.length) {
        world.loadTrucks();
        drive();
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
  drive();
}
