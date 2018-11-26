import $ from 'jquery';
import { NUMBER_TILES } from '../const';

export function drawMap(mapObject) {
  $('#map').empty();

  const objectMatrix = mapObject.getAllObjectsOnMap();

  const matrix = mapObject.getWholeMap();
  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      let tooltipText = '';

      if (typeof objectMatrix[rowIndex][columnIndex] === 'object') {
        const obj = objectMatrix[rowIndex][columnIndex];
        tooltipText = `${obj.constructor.name}\n`;

        tooltipText += JSON.stringify(obj)
          .replace(/"|^{|}$/g, '')
          .replace(/{/g, '{\n')
          .replace(/}/g, '\n}\n')
          .replace(/,/g, '\n')
          .replace(/:/g, ': ');
      }

      if (cell === 0) {
        let value = 0;
        if (matrix[rowIndex - 1] && matrix[rowIndex - 1][columnIndex] === 0) value += 1;
        if (matrix[rowIndex][columnIndex + 1] === 0) value += 10;
        if (matrix[rowIndex + 1] && matrix[rowIndex + 1][columnIndex] === 0) value += 100;
        if (matrix[rowIndex][columnIndex - 1] === 0) value += 1000;
        $('#map').append(
          `<img class=${rowIndex} title='${tooltipText}' src="assets/${
            NUMBER_TILES[cell]
          }-${value}.png"/>`,
        );
      } else {
        $('#map').append(
          `<img class=${rowIndex} title='${tooltipText}' src="assets/${NUMBER_TILES[cell]}.png"/>`,
        );
      }
    });
    $(`.${rowIndex}`).wrapAll("<div class='row' />");
  });
}

export function draw() {}
