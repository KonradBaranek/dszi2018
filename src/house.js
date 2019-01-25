import Bin from './bin';
import BinTypeReco from './binTypeReco';
import TrashTypeReco from './trashTypeReco';
export default class House {
  constructor(bins, adress) {
    this.bins = bins;
    this.adress = adress;
    this.binTypeReco = new BinTypeReco();
    this.trashTypeReco = new TrashTypeReco();
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
      const predictTrashType = this.trashTypeReco.predictPhoto(bin.trashPhoto,bin.contentType);

      if (predictBinType && predictTrashType) {
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
