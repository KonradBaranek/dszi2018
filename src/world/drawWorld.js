import { NUMBER_TILES, STRING_TILES } from '../const';

import $ from 'jquery';

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

      if (cell === STRING_TILES.road) {
        let value = 0;
        if (
          matrix[rowIndex - 1] &&
          (matrix[rowIndex - 1][columnIndex] === STRING_TILES.road ||
            matrix[rowIndex - 1][columnIndex] === STRING_TILES.truck)
        )
          value += 1;
        if (
          matrix[rowIndex][columnIndex + 1] === STRING_TILES.road ||
          matrix[rowIndex][columnIndex + 1] === STRING_TILES.truck
        )
          value += 10;
        if (
          matrix[rowIndex + 1] &&
          (matrix[rowIndex + 1][columnIndex] === STRING_TILES.road ||
            matrix[rowIndex + 1][columnIndex] === STRING_TILES.truck)
        )
          value += 100;
        if (
          matrix[rowIndex][columnIndex - 1] === STRING_TILES.road ||
          matrix[rowIndex][columnIndex - 1] === STRING_TILES.truck
        )
          value += 1000;
        $('#map').append(
          `<img class=${rowIndex} title='${tooltipText}' src="assets/${
            NUMBER_TILES[cell]
          }-${value}.png"/>`,
        );
      } else if (cell === STRING_TILES.truck) {
        $('#map').append(
          `<img class=${rowIndex} title='${tooltipText}' src="assets/${NUMBER_TILES[cell]}-${
            objectMatrix[rowIndex][columnIndex].direction
          }.png"/>`,
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
