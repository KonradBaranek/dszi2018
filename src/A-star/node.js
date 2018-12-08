import State from './state';

export default class Node {
  constructor(state, parent, action, cost) {
    this.state = state;
    this.parent = parent;
    this.action = action;
    this.cost = cost;
  }

  // nie porwnywać cost
  static compare(node1, node2) {
    return State.compare(node1.state, node2.state);
  }
}
