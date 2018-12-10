import { ACTIONS, DIRECTIONS } from '../const';

export default class Action {
  constructor(firstState, secondState) {
    this.steps = [
      {
        dir1: DIRECTIONS.up,
        dir2: DIRECTIONS.right,
        then: [ACTIONS.turnRight, ACTIONS.move],
      },
      {
        dir1: DIRECTIONS.up,
        dir2: DIRECTIONS.down,
        then: [ACTIONS.turnRight, ACTIONS.turnRight, ACTIONS.move],
      },
      {
        dir1: DIRECTIONS.up,
        dir2: DIRECTIONS.left,
        then: [ACTIONS.turnLeft, ACTIONS.move],
      },
      {
        dir1: DIRECTIONS.right,
        dir2: DIRECTIONS.down,
        then: [ACTIONS.turnRight, ACTIONS.move],
      },
      {
        dir1: DIRECTIONS.right,
        dir2: DIRECTIONS.left,
        then: [ACTIONS.turnLeft, ACTIONS.turnLeft, ACTIONS.move],
      },
      {
        dir1: DIRECTIONS.down,
        dir2: DIRECTIONS.left,
        then: [ACTIONS.turnRight, ACTIONS.move],
      },
    ];
    if (firstState.direction === secondState.direction) {
      this.actions = [ACTIONS.move];
    } else {
      this.actions = this.getActions(firstState.direction, secondState.direction);
    }
  }

  getActions(dir1, dir2) {
    const step = this.steps.find(e => e.dir1 === dir1 && e.dir2 === dir2);
    return (
      (step || false).then ||
      this.reverseActions(this.steps.find(e => e.dir2 === dir1 && e.dir1 === dir2).then)
    );
  }

  getCost() {
    return this.actions.length;
  }

  reverseActions(actions) {
    return actions.map(e => {
      if (e === ACTIONS.turnLeft) {
        return ACTIONS.turnRight;
      }
      if (e === ACTIONS.turnRight) {
        return ACTIONS.turnLeft;
      }
      return e;
    });
  }

  static compare(action1, action2) {
    console.log('action', action1, action2);
    if (!action1 || !action2) {
      return false;
    }
    return action1.actions.every((a, i) => a === action2.actions[i]);
  }
}
