import Bin from './bin';

export default class House {
  constructor(bins, adress) {
    this.bins = bins;
    this.adress = adress;
  }

  addBin(data) {
    this.bins.push(new Bin(...data));
  }

  getBins() {
    return this.bins;
  }

  setBins(bins) {
    this.bins = bins;
  }
}
