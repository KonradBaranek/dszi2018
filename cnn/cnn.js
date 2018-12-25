const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const LoadData = require('./loadData');

class CNN {
  constructor() {
    this.createConvModel();

    const options = {
      shuffle: true,
      trainSize: 4900,
      testSize: 100,
      batchSize: 100,
    };

    this.data = new LoadData(
      './binImages/output/',
      {
        papier: [1, 0, 0, 0, 0],
        plasticAlm: [0, 1, 0, 0, 0],
        szklo: [0, 0, 1, 0, 0],
        bio: [0, 0, 0, 1, 0],
        mix: [0, 0, 0, 0, 1],
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
        inputShape: [56, 56, 3],
        filters: 16,
        kernelSize: 3,
        activation: 'relu',
      }),
    );
    model.add(
      tf.layers.conv2d({
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

    // #6 fully connected
    model.add(tf.layers.dense({ units: 5, activation: 'softmax' }));

    const optimizer = 'rmsprop';
    model.compile({
      optimizer,
      loss: 'categoricalCrossentropy',
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
    const { features, labels } = await this.data.loadBatchSizeImages('test');

    const predict = this.model.predict(features);
    const evaluate = this.model.evaluate(features, labels);
    labels.print();
    predict.print();

    const testAccPercent = evaluate[1].dataSync()[0] * 100;
    console.log('Trafność: ', testAccPercent.toFixed(1), '%');
  }

  predict() {}

  async saveModel() {
    await this.model.save(`file:///home/devil/Dev/studies/dszi2018/cnn/cnn-model`);
    console.log(`Saved model to path: /home/devil/Dev/studies/dszi2018/cnn/cnn-model`);
  }
}

module.exports = CNN;

const cnn = new CNN();

cnn.train().then(() => {
  cnn.test();
  cnn.saveModel();
});
