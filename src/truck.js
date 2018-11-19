export default class Truck {
  constructor(positionX, positionY, maxCapacity) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.maxCapacity = maxCapacity;
    this.capacity = 0;
    this.type = 'mix';
  }

  move(right, up) {
    this.positionX += right;
    this.positionY -= up;
  }
}
