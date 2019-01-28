const fs = require('fs');

function loadImagesNames(path) {
  return fs.readdirSync(path, (err, files) => files);
}

const mix = loadImagesNames('../public/isTrashBin/mix');

const obj = {
  mix,
};

const jsonContent = JSON.stringify(obj);

fs.writeFile('../src/imagesIsTrashBin.json', jsonContent, 'utf8', err => {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }

  return console.log('JSON file has been saved.');
});
