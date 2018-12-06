export default class State {
  constructor(positionX, positionY, direction) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.direction = direction;
  }

  static compare(state1, state2) {
    return (
      state1.positionX === state2.positionX &&
      state1.positionY === state2.positionY &&
      state1.direction === state2.direction
    );
  }
}
