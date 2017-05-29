import Realm from 'realm';
import CatModel from './components/CatModel';

let repository = new Realm({
  schema: [{
    name: 'Cat',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      breed: 'string',
      name: 'string',
      loggedAt: 'date'
    }
  }]
});
