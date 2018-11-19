import $ from 'jquery';

const TILES = { '0': 'road', '1': 'notRoad', '2': 'house', '3': 'truck', '4': 'dump' };

export function drawMap(mapObject) {
  $('#map').empty();

  const objectMatrix = mapObject.getAllObjectsOnMap();

  const matrix = mapObject.getWholeMap();
  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      let tooltipText = '';

      if (typeof objectMatrix[rowIndex][cellIndex] === 'object') {
        const obj = objectMatrix[rowIndex][cellIndex];
        tooltipText = `${obj.constructor.name}\n`;

        tooltipText += JSON.stringify(obj)
          .replace(/"|^{|}$/g, '')
          .replace(/{/g, '{\n')
          .replace(/}/g, '\n}\n')
          .replace(/,/g, '\n')
          .replace(/:/g, ': ');
      }

      $('#map').append(
        `<img class=${rowIndex} title='${tooltipText}' src="assets/${TILES[cell]}.png"/>`,
      );
    });
    $(`.${rowIndex}`).wrapAll("<div class='row' />");
  });
}

export function draw() {}
