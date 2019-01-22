import Bin from './bin';
import BinTypeReco from './binTypeReco';
export default class House {
  constructor(bins, adress) {
    this.bins = bins;
    this.adress = adress;
    this.binTypeReco = new BinTypeReco();
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

  getCapacity() {
    return this.bins.map(b => b.capacity).reduce((a, b) => a + b, 0);
  }

  giveTrash(t) {
    this.bins.map(bin => {
      const predictBinType = this.binTypeReco.predictPhoto(bin.photo, bin.contentType);

      if (predictBinType) {
        t.capacity[bin.contentType] = t.capacity[bin.contentType]
          ? t.capacity[bin.contentType] + bin.capacity
          : bin.capacity;
        bin.capacity = 0;
        return bin;
      }
      return bin;
    });
  }
}
