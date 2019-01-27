const fs = require('fs');

function loadImagesNames(path) {
  return fs.readdirSync(path, (err, files) => files);
}

const papier = loadImagesNames('../public/insideBin/papier');
const szklo = loadImagesNames('../public/insideBin/szklo');
const plasticAlm = loadImagesNames('../public/insideBin/plastikAlm');
const bio = loadImagesNames('../public/insideBin/bio');
const mix = loadImagesNames('../public/insideBin/mix');

const obj = {
  papier,
  szklo,
  plasticAlm,
  bio,
  mix,
};

const jsonContent = JSON.stringify(obj);

fs.writeFile('../src/imagesInTrash.json', jsonContent, 'utf8', err => {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }

  return console.log('JSON file has been saved.');
});
