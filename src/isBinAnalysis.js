import { DIRECTIONS } from './const';

export default class isBinAnalysis {

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

  contentType(url, contentType) {

    var verify;

    if (contentType) {
      var verify = url.split(".")[0];
    }

    if (verify === "bin")
      return contentType;
    else if(verify === "nobin") {
      return verify;
    } else if (verify[0] === "a" || verify[0] === "e") {
      return verify;
    } else {
      return contentType;
    }

  }
}
