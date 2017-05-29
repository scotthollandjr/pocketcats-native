import Utils from '../Utils';

class CatModel {
  constructor(breed, name) {
    this.id = Utils.guid();
    this.breed = breed;
    this.name = name;
    this.loggedAt = new Date();
  }
}

module.exports = CatModel;
