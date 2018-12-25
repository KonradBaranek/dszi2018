const fs = require('fs');

function loadImagesNames(path) {
  return fs.readdirSync(path, (err, files) => files);
}

const papier = loadImagesNames('../public/trash/papier');
const szklo = loadImagesNames('../public/trash/szklo');
const plastikAlm = loadImagesNames('../public/trash/plastikAlm');
const bio = loadImagesNames('../public/trash/bio');
const mix = loadImagesNames('../public/trash/mix');

const obj = {
  papier,
  szklo,
  plastikAlm,
  bio,
  mix,
};

const jsonContent = JSON.stringify(obj);

fs.writeFile('../src/images.json', jsonContent, 'utf8', err => {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }

  return console.log('JSON file has been saved.');
});
