import * as tf from '@tensorflow/tfjs';

import { TRASH_PREDICTION } from './const';

export default class TrashTypeReco {
  constructor() {
    this.loadModel();
  }

  async loadModel() {
    const modelGen = await tf.loadModel('http://localhost:5000/model2.json');
    modelGen.summary();
    this.model = modelGen;
  }

  predictPhoto(url, contentType) {
    const img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = async () => {
      const feature = this.fetchImageToTensor(img);
      const prediction = await this.model.predict(tf.stack([feature]));
      const predictedType = await this.checkType(prediction);
      this.isCorrectBin(contentType, predictedType);
    };

    img.src = url;
  }

  fetchImageToTensor(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    const feature = tf.fromPixels(canvas);
    return feature;
  }

  async checkType(prediction) {
    let temp = 0;
    let index = -1;
    await prediction.data().then(data => {
      data.forEach((cell, idx) => {
        if (cell > temp) {
          temp = cell;
          index = idx;
        }
      });
    });

    const type = Object.keys(TRASH_PREDICTION)[index];

    return type;
  }

  isCorrectBin(contentType, predictedType) {
    if (contentType === predictedType) {
      console.log(`Correct type of trash. ${predictedType}`);
      return true;
    }
    console.log(`Incorrect type of trash. It's ${predictedType} not ${contentType}`);
    return false;
  }
}
