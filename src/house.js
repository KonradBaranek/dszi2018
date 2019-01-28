import Bin from './bin';
import BinTypeReco from './binTypeReco';
import TrashTypeReco from './trashTypeReco';
import IsBinReco from './isBinReco';

export default class House {
  constructor(preBinVerification, bins, adress) {
    this.preBinVerification = preBinVerification;
    this.bins = bins;
    this.adress = adress;
    this.binTypeReco = new BinTypeReco();
    this.trashTypeReco = new TrashTypeReco();
    this.isBinReco = new IsBinReco();
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
    this.t = t;
    this.isBinReco.predictPhoto(this.preBinVerification, "bin", this);
  }

  giveTrashProcess() {
    var t = this.t;
    this.bins.map(bin => {
      const predictBinType = this.binTypeReco.predictPhoto(bin.photo, bin.contentType);
      const predictTrashType = this.trashTypeReco.predictPhoto(bin.trashPhoto, bin.contentType);

      if (predictBinType && predictTrashType && predictIsBin) {
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
