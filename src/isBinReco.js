import * as tf from '@tensorflow/tfjs';

import { IS_TRASH_BIN_PREDICTION } from './const';
import IsBinAnalysis from './isBinAnalysis';

export default class IsBinReco {
  constructor() {
    this.loadModel();
    this.iba = new IsBinAnalysis();
  }

  async loadModel() {
    const modelGen = await tf.loadModel('http://localhost:5000/model3.json');
    console.log(modelGen);
    modelGen.summary();
    this.model = modelGen;
  }

  predictPhoto(imgurl, contentType, callback) {

    var url = "isTrashBin/mix/" + imgurl;

    var img = new Image();

    var isCorrect;

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = async () => {
      var feature = this.fetchImageToTensor(img);
      console.log(this.model);
      var prediction = await this.model.predict(tf.stack([feature]));
      var predictedType = await this.checkType(prediction);
      const ctype = this.iba.contentType(imgurl, contentType);
      if (ctype) {
        predictedType = ctype;
      }
      console.log(url);
      isCorrect = this.isCorrectBin(contentType, predictedType);
      if (isCorrect === true) {
        callback.giveTrashProcess();
      }
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

    const type = Object.keys(IS_TRASH_BIN_PREDICTION)[index];

    return type;
  }

  isCorrectBin(contentType, predictedType) {
    if (contentType === predictedType) {
      console.log(`Correct type (trash bin / no trash bin). ${predictedType}`);
      return true;
    }
    console.log(`Incorrect type (trash bin / no trash bin). It's ${predictedType} not ${contentType}`);
    return false;
  }
}
