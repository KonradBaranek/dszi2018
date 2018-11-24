import $ from 'jquery';

const TILES = { '0': 'road', '1': 'notRoad', '2': 'house', '3': 'truck', '4': 'dump' };

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
            TILES[cell]
          }-${value}.png"/>`,
        );
      } else {
        $('#map').append(
          `<img class=${rowIndex} title='${tooltipText}' src="assets/${TILES[cell]}.png"/>`,
        );
      }
    });
    $(`.${rowIndex}`).wrapAll("<div class='row' />");
  });
}

export function draw() {}
