// add prety console-logs
// add numebrs (how many least, how many used already)

require('@tensorflow/tfjs-node');

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const tf = require('@tensorflow/tfjs');
const shuffleSeed = require('shuffle-seed');

class LoadData {
  constructor(path, labels, options) {
    this.path = path;
    this.options = {
      shuffle: true,
      batchSize: 10,
      trainSize: 100,
      splitTest: true,
      testSize: 10,
      ...options,
    };

    this.labels = labels;

    this.loadImagesNames();
  }

  loadImagesNames() {
    let data = fs.readdirSync(this.path, (err, files) => files);

    const extentionsRegExp = RegExp(/\.(jpg|png|jpeg)$/);

    data = data.filter(el => extentionsRegExp.test(el));

    if (this.options.shuffle) {
      data = shuffleSeed.shuffle(data, 'phrase');
    }

    this.trainData = data.splice(0, this.options.trainSize);

    if (this.options.splitTest) {
      this.testData = data.splice(0, this.options.testSize);
    }
  }

  async loadLabelAndFeature(type) {
    let singleImage;

    if (type === 'test') {
      if (this.testData.length === 0) return false;
      singleImage = this.testData.shift();
    } else {
      if (this.trainData.length === 0) return false;
      singleImage = this.trainData.shift();
    }

    const label = /[^.]*/.exec(singleImage)[0];
    console.log(singleImage);

    const image = await loadImage(`${this.path}/${singleImage}`);

    const newCanvas = createCanvas(image.width, image.height);
    const ctx = newCanvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const feature = tf.fromPixels(newCanvas);

    return { label, feature };
  }

  async loadBatchSizeImages(type = 'train') {
    const labels = [];
    const features = [];

    for (let i = 0; i < this.options.batchSize; i += 1) {
      const { label, feature } = await this.loadLabelAndFeature(type);
      labels.push(this.labels[label]);
      features.push(feature);
    }

    console.log('--------------------');

    return { labels: tf.tensor(labels), features: tf.stack(features) };
  }
}

module.exports = LoadData;
