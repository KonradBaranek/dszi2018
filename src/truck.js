import { DIRECTIONS } from './const';

export default class Truck {
  constructor(positionX, positionY, maxCapacity) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.maxCapacity = maxCapacity;
    this.capacity = 0;
    this.type = 'mix';
    this.direction = DIRECTIONS.up;
  }

  turnLeft() {
    this.direction = (4 + this.direction - 1) % 4;
  }

  turnRight() {
    this.direction = (4 + this.direction + 1) % 4;
  }

  move() {
    switch (this.direction) {
      case DIRECTIONS.up:
        this.positionY -= 1;
        break;
      case DIRECTIONS.down:
        this.positionY += 1;
        break;
      case DIRECTIONS.left:
        this.positionX -= 1;
        break;
      case DIRECTIONS.right:
        this.positionX += 1;
        break;
      default:
        console.log('WRONG DIRECTION: ', this.direction);
        break;
    }
  }
}
