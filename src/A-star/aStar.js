import { DIRECTIONS, STRING_TILES } from '../const';
import Action from './action';
import Node from './node';
import State from './state';

export default class AStar {
  constructor(map, startState, goalState) {
    this.map = map;
    this.startState = startState;
    this.goalState = goalState;
    this.fringe = [];
    this.explored = [];
    console.log('A-star', this);
  }

  givePath() {
    this.fringe.push(new Node(this.startState, null, null));
    while (true) {
      if (!this.fringe.length) {
        return null;
      }
      const elem = this.fringe.shift();

      if (this.goalTest(elem.state)) {
        return this.getActionsFromParents(elem);
      }
      this.fringe.splice(this.fringe.indexOf(elem), 1);
      this.explored.push(elem);

      this.succ(elem.state).forEach(state => {
        const x = new Node(state, elem, new Action(elem.state, state));
        x.cost = this.f(x, this.goalState);
        const elemFrin = this.fringe.findIndex(e => Node.compare(e, x));
        const elemExpl = this.explored.findIndex(e => Node.compare(e, x));
        if (elemFrin === -1 && elemExpl === -1) {
          this.fringe.push(x);
          this.fringe.sort((a, b) => a.cost - b.cost);
        } else if (elemFrin !== -1 && elemFrin.cost > x.cost) {
          this.fringe = this.fringe.splice(elemFrin, 1, x);
          this.fringe.sort((a, b) => a.cost - b.cost);
        }
      });
    }
  }

  succ(state) {
    const give = direction => {
      switch (direction) {
        case DIRECTIONS.up:
          return (this.map[state.positionY - 1] || false)[state.positionX] === STRING_TILES.road
            ? new State(state.positionX, state.positionY - 1, DIRECTIONS.up)
            : null;
        case DIRECTIONS.down:
          return (this.map[state.positionY + 1] || false)[state.positionX] === STRING_TILES.road
            ? new State(state.positionX, state.positionY + 1, DIRECTIONS.down)
            : null;
        case DIRECTIONS.left:
          return (this.map[state.positionY] || false)[state.positionX - 1] === STRING_TILES.road
            ? new State(state.positionX - 1, state.positionY, DIRECTIONS.left)
            : null;
        case DIRECTIONS.right:
          return (this.map[state.positionY] || false)[state.positionX + 1] === STRING_TILES.road
            ? new State(state.positionX + 1, state.positionY, DIRECTIONS.right)
            : null;
        default:
          return null;
      }
    };
    return [
      give(DIRECTIONS.up),
      give(DIRECTIONS.down),
      give(DIRECTIONS.left),
      give(DIRECTIONS.right),
    ].filter(e => e !== null);
  }

  goalTest(state) {
    return (
      state.positionX === this.goalState.positionX && state.positionY === this.goalState.positionY
    );
  }

  f(x, goal) {
    return this.manhattanDistance(x.state, goal) + x.action.getCost();
  }

  manhattanDistance(state1, state2) {
    return (
      Math.abs(state1.positionX - state2.positionX) + Math.abs(state1.positionY - state2.positionY)
    );
  }

  getPathFromParents(node) {
    let x = node;
    const list = [];
    while (true) {
      if (!x.parent) {
        list.push(x.state);
        return list.reverse();
      }
      list.push(x.state);
      x = x.parent;
    }
  }

  getActionsFromParents(node) {
    let x = node;
    const list = [];
    while (true) {
      if (!x.parent) {
        list.push((x.action || false).actions);
        return list
          .reverse()
          .flat()
          .filter(e => e !== undefined);
      }
      list.push((x.action || false).actions);
      x = x.parent;
    }
  }
}
