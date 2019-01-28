const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
//require('@tensorflow/tfjs-node-gpu');

const LoadData = require('./loadData');

class CNN {
  constructor() {
    this.createConvModel();

    const options = {
      shuffle: true,
      trainSize: 5800,
      testSize: 100,
      batchSize: 100,
    };

    this.data = new LoadData(
      './binImages/output/',
      {
        bin: [1, 0],
        nobin: [0, 1],
      },
      options,
    );

    this.loopTrains = options.trainSize / options.batchSize;
  }

  createConvModel() {
    const model = tf.sequential();

    // #1
    model.add(
      tf.layers.conv2d({
        inputShape: [200, 200, 3],
        filters: 16,
        kernelSize: 3,
        activation: 'relu',
      }),
    );
    model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));

    // #2
    model.add(
      tf.layers.conv2d({
        filters: 32,
        kernelSize: 3,
        activation: 'relu',
      }),
    );
    model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));

    // #3
    model.add(
      tf.layers.conv2d({
        filters: 64,
        kernelSize: 3,
        activation: 'relu',
      }),
    );
    model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));

    // #4
    model.add(tf.layers.flatten());
    model.add(tf.layers.dropout({ rate: 0.25 }));
    // #5
    model.add(tf.layers.dense({ units: 512, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: 2, activation: 'sigmoid' }));

    // alg for optimization
    const optimizer = 'rmsprop';
    model.compile({
      optimizer,
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    });

    this.model = model;
  }

  async train() {
    console.log('Training model...');

    for (let i = 0; i < this.loopTrains; i += 1) {
      await this.data.loadBatchSizeImages().then(async ({ features, labels }) => {
        console.log(`Percent: ${(((i + 1) / this.loopTrains) * 100).toFixed(2)}%`);
        await this.model.fit(features, labels, {
          epochs: 8,
          validationSplit: 0.05,
        });
      });
    }
  }

  async test() {
    console.log('Testing...');
    const { features, labels } = await this.data.loadBatchSizeImages('test').catch((error) => console.log(error));

    const predict = this.model.predict(features);
    const evaluate = this.model.evaluate(features, labels);
    labels.print();
    predict.print();

    const testAccPercent = evaluate[1].dataSync()[0] * 100;
    console.log('Trafność: ', testAccPercent.toFixed(1), '%');
  }

  predict() {}

  async saveModel() {
    await this.model.save(`file:///home/pc/workspace/DSZI/dszi2018/recognizeTrashBinCnn/cnn-model`);
    console.log(`Saved model to given path`);
  }
}

module.exports = CNN;

const cnn = new CNN();

cnn.train().then(() => {
  cnn.test();
  cnn.saveModel();
});
