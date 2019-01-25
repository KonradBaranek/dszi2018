export default class Junkyard {
  constructor(capacity, address) {
    this.capacity = capacity;
    this.address = address;
  }

  getCapacity(){
    let returned = 0;
    Object.keys(this.capacity).forEach(k => returned -= 2000);
    return returned;
  }

  giveTrash(t){
    Object.keys(t.capacity).forEach( k =>{
      this.capacity[k] += t.capacity[k];
      t.capacity[k] = 0;
    });
  }
}
